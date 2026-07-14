const { google } = require('googleapis');

const auth = new google.auth.JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: (process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
  scopes: ['https://www.googleapis.com/auth/calendar'],
});

const calendar = google.calendar({ version: 'v3', auth });
const calendarId = process.env.GOOGLE_CALENDAR_ID;

// Returns true if the dentist's calendar already has an event overlapping
// [start, end).
async function hasConflict(start, end) {
  const { data } = await calendar.events.list({
    calendarId,
    timeMin: start.toISOString(),
    timeMax: end.toISOString(),
    singleEvents: true,
  });
  return data.items.length > 0;
}

async function createEvent({ patientName, service, email, phone, start, end }) {
  const { data } = await calendar.events.insert({
    calendarId,
    requestBody: {
      summary: `Appointment: ${patientName} — ${service}`,
      description: `Email: ${email}\nPhone: ${phone}`,
      start: { dateTime: start.toISOString() },
      end: { dateTime: end.toISOString() },
    },
  });
  return data.id;
}

async function deleteEvent(eventId) {
  if (!eventId) return;
  try {
    await calendar.events.delete({ calendarId, eventId });
  } catch (err) {
    // If the event was already removed from the calendar manually, Google
    // returns 404/410 — that's fine, there's nothing left to clean up.
    if (err.code !== 404 && err.code !== 410) throw err;
  }
}

module.exports = { hasConflict, createEvent, deleteEvent };
