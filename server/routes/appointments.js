const { google } = require('googleapis');
const Appointment = require('../models/Appointment');

const auth = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);
auth.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
const calendar = google.calendar({ version: 'v3', auth });

router.post('/', async (req, res) => {
  const { patientName, email, phone, service, date, duration = 60 } = req.body;
  const start = new Date(date);
  const end = new Date(start.getTime() + duration * 60000);

  // 1. Check MongoDB for overlap
  const conflict = await Appointment.findOne({
    date: { $lt: end },
    $expr: {
      $gt: [{ $add: ['$date', { $multiply: ['$duration', 60000] }] }, start]
    }
  });
  if (conflict) return res.status(409).json({ error: 'Time slot already booked' });

  // 2. Check Google Calendar for overlap
  const gcalEvents = await calendar.events.list({
    calendarId: process.env.GOOGLE_CALENDAR_ID,
    timeMin: start.toISOString(),
    timeMax: end.toISOString(),
    singleEvents: true,
  });
  if (gcalEvents.data.items.length > 0)
    return res.status(409).json({ error: 'Dentist unavailable at that time' });

  // 3. Save to MongoDB
  const appt = await Appointment.create({ patientName, email, phone, service, date: start, duration });

  // 4. Create Google Calendar event
  const event = await calendar.events.insert({
    calendarId: process.env.GOOGLE_CALENDAR_ID,
    resource: {
      summary: `Appointment: ${patientName} — ${service}`,
      description: `Email: ${email}\nPhone: ${phone}`,
      start: { dateTime: start.toISOString() },
      end: { dateTime: end.toISOString() },
    }
  });

  appt.googleEventId = event.data.id;
  await appt.save();
  res.status(201).json(appt);
});