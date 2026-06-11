const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  patientName: String,
  email: String,
  phone: String,
  service: String,
  date: Date,
  duration: { type: Number, default: 60 }, // minutes
  status: { type: String, default: 'confirmed' },
  googleEventId: String,
}, { timestamps: true });
module.exports = mongoose.model('Appointment', schema);