const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  patientName: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, required: true, trim: true },
  service: { type: String, required: true },
  date: { type: Date, required: true },
  duration: { type: Number, default: 60 }, // minutes
  notes: { type: String, trim: true },

  // Links the booking to a logged-in patient account, if the person booking
  // was authenticated. Optional so walk-in / non-account bookings still work.
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },

  status: {
    type: String,
    enum: ['confirmed', 'cancelled', 'completed'],
    default: 'confirmed',
  },
  googleEventId: String,
}, { timestamps: true });

module.exports = mongoose.model('Appointment', schema);
