const express = require('express');
const Appointment = require('../models/Appointment');
const { requireAuth, requireRole, attachUserIfPresent } = require('../middleware/auth');
const googleCalendar = require('../utils/googleCalendar');

const router = express.Router();

const VALID_SERVICES = [
  'General Checkup', 'Tooth Removal', 'RCT (Root Canal)',
  'Teeth Cleaning & Polishing', 'Veneers & Laminates', 'Crowns & Bridges',
  'Dentures', 'Braces / Orthodontics', 'Dental Implants',
  'Cosmetic Dentistry', 'Emergency Care', 'Other',
];

function isOwnerOrStaff(user, appointment) {
  if (user.role === 'staff' || user.role === 'admin') return true;
  return appointment.patient && appointment.patient.toString() === user._id.toString();
}

// POST /api/appointments — public booking form.
// If the caller happens to be logged in as a patient, the booking is linked
// to their account so it shows up under "my appointments".
router.post('/', attachUserIfPresent, async (req, res) => {
  try {
    const { patientName, email, phone, service, date, duration = 60 } = req.body;

    if (!patientName || !email || !phone || !service || !date) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Block Sunday bookings — clinic is closed.
    const appointmentDate = new Date(date);
    if (appointmentDate.getDay() === 0) {
      return res.status(400).json({ error: 'We are closed on Sundays. Please choose another day.' });
    }

    if (!VALID_SERVICES.includes(service)) {
      return res.status(400).json({ error: 'Unknown service selected' });
    }

    const start = new Date(date);
    if (Number.isNaN(start.getTime())) {
      return res.status(400).json({ error: 'Invalid date/time' });
    }
    if (start.getTime() < Date.now()) {
      return res.status(400).json({ error: 'Cannot book a time in the past' });
    }

    const safeDuration = Number(duration) > 0 ? Number(duration) : 60;
    const end = new Date(start.getTime() + safeDuration * 60000);

    // 1. Check MongoDB for an overlapping, still-active booking.
    const conflict = await Appointment.findOne({
      status: 'confirmed',
      date: { $lt: end },
      $expr: {
        $gt: [{ $add: ['$date', { $multiply: ['$duration', 60000] }] }, start],
      },
    });
    if (conflict) return res.status(409).json({ error: 'That time slot is already booked' });

    // 2. Check the dentist's live Google Calendar too, in case something was
    //    added there directly (e.g. a manual/offline booking).
    if (await googleCalendar.hasConflict(start, end)) {
      return res.status(409).json({ error: 'Dentist unavailable at that time' });
    }

    // 3. Save the appointment.
    const appt = await Appointment.create({
      patientName,
      email,
      phone,
      service,
      date: start,
      duration: safeDuration,
      notes: req.body.notes,
      patient: req.user ? req.user._id : null,
    });

    // 4. Push it to the dentist's Google Calendar.
    const googleEventId = await googleCalendar.createEvent({
      patientName, service, email, phone, start, end,
    });
    appt.googleEventId = googleEventId;
    await appt.save();

    res.status(201).json(appt);
  } catch (err) {
    console.error('Failed to create appointment:', err);
    res.status(500).json({ error: 'Could not create the appointment' });
  }
});

// GET /api/appointments — staff/admin only: full appointment list.
router.get('/', requireAuth, requireRole('staff', 'admin'), async (req, res) => {
  const appointments = await Appointment.find().sort({ date: 1 });
  res.json(appointments);
});

// GET /api/appointments/mine — the logged-in patient's own bookings.
router.get('/mine', requireAuth, async (req, res) => {
  const appointments = await Appointment.find({ patient: req.user._id }).sort({ date: 1 });
  res.json(appointments);
});

// GET /api/appointments/:id — staff/admin, or the patient who owns it.
router.get('/:id', requireAuth, async (req, res) => {
  const appt = await Appointment.findById(req.params.id);
  if (!appt) return res.status(404).json({ error: 'Appointment not found' });
  if (!isOwnerOrStaff(req.user, appt)) {
    return res.status(403).json({ error: 'Not authorized' });
  }
  res.json(appt);
});

// PATCH /api/appointments/:id/cancel — staff/admin, or the owning patient.
router.patch('/:id/cancel', requireAuth, async (req, res) => {
  const appt = await Appointment.findById(req.params.id);
  if (!appt) return res.status(404).json({ error: 'Appointment not found' });
  if (!isOwnerOrStaff(req.user, appt)) {
    return res.status(403).json({ error: 'Not authorized' });
  }
  if (appt.status === 'cancelled') {
    return res.status(400).json({ error: 'Appointment is already cancelled' });
  }

  appt.status = 'cancelled';
  await appt.save();
  await googleCalendar.deleteEvent(appt.googleEventId); // keep the calendar in sync

  res.json(appt);
});

// PATCH /api/appointments/:id/status — staff/admin only, e.g. mark completed.
router.patch('/:id/status', requireAuth, requireRole('staff', 'admin'), async (req, res) => {
  const { status } = req.body;
  if (!['confirmed', 'completed', 'cancelled'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  const appt = await Appointment.findById(req.params.id);
  if (!appt) return res.status(404).json({ error: 'Appointment not found' });

  if (status === 'cancelled' && appt.status !== 'cancelled') {
    await googleCalendar.deleteEvent(appt.googleEventId);
  }
  appt.status = status;
  await appt.save();
  res.json(appt);
});

module.exports = router;