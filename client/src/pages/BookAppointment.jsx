import { useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import api from '../api';

// Combines the separate date ("2026-07-15") and time ("2:30 PM") fields from
// the form into a single Date the backend can work with.
function combineDateAndTime(dateStr, timeStr) {
  const [time, meridiem] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  if (meridiem === 'PM' && hours !== 12) hours += 12;
  if (meridiem === 'AM' && hours === 12) hours = 0;

  const combined = new Date(dateStr);
  combined.setHours(hours, minutes, 0, 0);
  return combined;
}

// Returns true if the given yyyy-mm-dd string falls on a Sunday.
function isSunday(dateStr) {
  if (!dateStr) return false;
  return new Date(dateStr).getDay() === 0;
}

const IconPhone = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.69 3.29 2 2 0 0 1 3.64 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.63a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const IconPin = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const IconClock = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const IconCheck = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

function Footer() {
  const [hovLink, setHovLink] = useState(null);
  return (
    <footer style={{ background: '#1a1a2e', color: '#fff', padding: '4rem 3rem 2rem' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '3rem',
        maxWidth: '1100px',
        margin: '0 auto',
        paddingBottom: '3rem',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: '1.3rem', color: '#5BB4E5', marginBottom: '1rem' }}>MCM Dental</div>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', lineHeight: 1.8 }}>Gentle care.<br />Confident smiles.</p>
        </div>
        <div>
          <p style={{ fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '1.2rem' }}>Navigation</p>
          {[{ label: 'Home', path: '/' }, { label: 'About Us', path: '/about' }, { label: 'Our Services', path: '/services' }, { label: 'Contact Us', path: '/contact' }].map(item => (
            <Link key={item.label} to={item.path}
              onMouseEnter={() => setHovLink(item.label)}
              onMouseLeave={() => setHovLink(null)}
              style={{ display: 'block', color: hovLink === item.label ? '#5BB4E5' : 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: '0.9rem', marginBottom: '0.6rem', transition: 'color 0.2s' }}>
              {item.label}
            </Link>
          ))}
        </div>
        <div>
          <p style={{ fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '1.2rem' }}>Get in touch</p>
          {['+91 94180 84508', 'Kuthiala Building, Main Market', 'Kasumpti, Shimla – 171009', 'Mon–Sat: 9:00 AM – 1 PM & 2–6 PM', 'Sunday: Closed'].map(item => (
            <p key={item} style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{item}</p>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <Link to="/book" style={{ padding: '0.8rem 2rem', background: '#5BB4E5', color: '#fff', borderRadius: '6px', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>
            Book Appointment
          </Link>
        </div>
      </div>
      <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.25)', fontSize: '0.82rem', marginTop: '2rem' }}>
        © 2025 MCM Dental Clinic. All rights reserved.
      </p>
    </footer>
  );
}

const SERVICES = [
  'General Checkup', 'Tooth Removal', 'RCT (Root Canal)',
  'Teeth Cleaning & Polishing', 'Veneers & Laminates', 'Crowns & Bridges',
  'Dentures', 'Braces / Orthodontics', 'Dental Implants',
  'Cosmetic Dentistry', 'Emergency Care', 'Other',
];

const TIMES = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
  '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
];

export default function BookAppointment() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', date: '', time: '', notes: '' });
  const [submitted, setSubmitted] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [hovTime, setHovTime] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    if (!form.date || !form.time) {
      setError('Please select both a date and a time.');
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/api/appointments', {
        patientName: form.name,
        email: form.email,
        phone: form.phone,
        service: form.service,
        date: combineDateAndTime(form.date, form.time).toISOString(),
        notes: form.notes,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Could not book that appointment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const filled = Object.values(form).filter(Boolean).length;
  const total = Object.keys(form).length;

  const inputStyle = name => ({
    width: '100%',
    padding: '0.9rem 1rem',
    border: `1.5px solid ${activeField === name ? '#0077b6' : '#d0eaf8'}`,
    borderRadius: '8px',
    fontSize: '0.95rem',
    background: activeField === name ? '#f0f9ff' : '#fff',
    color: '#1a1a2e',
    outline: 'none',
    fontFamily: "'Segoe UI', sans-serif",
    transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s',
    boxShadow: activeField === name ? '0 0 0 3px rgba(0,119,182,0.1)' : 'none',
  });

  const labelStyle = {
    display: 'block',
    fontSize: '0.78rem',
    fontWeight: 700,
    color: '#0077b6',
    marginBottom: '0.45rem',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", color: '#1a1a2e', background: '#fff' }}>
      <style>{`
        .submit-btn:hover { background: #0077b6 !important; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(0,119,182,0.3) !important; }
        .submit-btn { transition: all 0.2s ease; }
        .info-strip:hover { border-color: #5BB4E5 !important; background: #eaf6fd !important; }
        .info-strip { transition: all 0.2s ease; }
      `}</style>

      {/* ── HERO ── */}
      <section style={{
        position: 'relative', height: '100vh',
        backgroundImage: 'url(/images/booking-hero.jpg)',
        backgroundSize: 'cover', backgroundPosition: 'center',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '0 2rem',
      }}>
        <div style={{ position: 'absolute', inset: 0, 
          background: `
  linear-gradient(
    to bottom,
    rgb(222 227 231 / 15%) 0%,
    rgb(81 84 86 / 35%) 40%,
    rgb(54 60 65 / 60%) 70%,
    rgb(67 71 74 / 85%) 100%
  )
`,  }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <AnimatedSection>
            <p style={{ color: 'rgb(252, 252, 253)', fontWeight: 600, letterSpacing: '0.15em', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Schedule a Visit
            </p> 
            <h1 style={{ color: 'rgb(250, 251, 251)', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '0.9rem' }}>
              Book an Appointment
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '1rem', maxWidth: '480px', margin: '0 auto', lineHeight: 1.75 }}>
              Fill in your details to book a slot. Takes less than a minute.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <AnimatedSection>
        <section style={{ padding: '5rem 2rem', background: '#f0f9ff' }}>
          <div style={{
            maxWidth: '1100px', margin: '0 auto',
            display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '4rem', alignItems: 'start',
          }}>

            {/* ── Left panel ── */}
            <div style={{ position: 'sticky', top: '90px' }}>
              <p style={{ color: '#5BB4E5', fontWeight: 600, letterSpacing: '0.12em', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Clinic Details
              </p>
              <h2 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#0077b6', lineHeight: 1.2, marginBottom: '2rem' }}>
                MCM Dental Clinic
              </h2>

              {/* Info strips */}
              {[
                { Icon: IconPin,   label: 'Address', val: 'Kuthiala Building, Main Market\nKasumpti, Shimla – 171009' },
                { Icon: IconPhone, label: 'Phone',   val: '+91 94180 84508', href: 'tel:+919418084508' },
                { Icon: IconClock, label: 'Hours',   val: 'Mon–Sat: 9:00 AM – 1:00 PM\nMon–Sat: 2:00 PM – 6:00 PM\nSunday: Closed' },
              ].map(item => (
                <div key={item.label} className="info-strip" style={{
                  display: 'flex', gap: '1rem', alignItems: 'flex-start',
                  padding: '1.1rem 1.2rem',
                  border: '1px solid #d0eaf8',
                  borderRadius: '10px',
                  background: '#fff',
                  marginBottom: '0.75rem',
                  cursor: 'default',
                }}>
                  <div style={{ color: '#0077b6', marginTop: '1px', flexShrink: 0 }}><item.Icon /></div>
                  <div>
                    <p style={{ fontWeight: 700, color: '#0077b6', fontSize: '0.8rem', marginBottom: '0.25rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{item.label}</p>
                    {item.href
                      ? <a href={item.href} style={{ color: '#0077b6', fontWeight: 700, textDecoration: 'none', fontSize: '0.95rem' }}>{item.val}</a>
                      : <p style={{ color: '#555', fontSize: '0.9rem', lineHeight: 1.7, whiteSpace: 'pre-line' }}>{item.val}</p>
                    }
                  </div>
                </div>
              ))}

              {/* What to expect */}
              <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#fff', border: '1px solid #d0eaf8', borderRadius: '12px' }}>
                <p style={{ fontWeight: 700, color: '#0077b6', fontSize: '0.88rem', marginBottom: '1rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  What to Expect
                </p>
                {[
                  "Incase slot not available walk ins are welcome",
                  'Bring any previous dental records',
                  'Arrive 5 minutes early',
                  'All treatments explained before starting',
                ].map(item => (
                  <div key={item} style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-start', marginBottom: '0.7rem' }}>
                    <div style={{
                      width: '22px', height: '22px', borderRadius: '50%',
                      background: '#eaf6fd', border: '1.5px solid #5BB4E5',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#0077b6', flexShrink: 0, marginTop: '1px',
                    }}>
                      <IconCheck />
                    </div>
                    <span style={{ fontSize: '0.88rem', color: '#444', lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right — Form ── */}
            <div style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '2.8rem',
              border: '1px solid #d0eaf8',
              boxShadow: '0 4px 24px rgba(0,119,182,0.08)',
            }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                  <div style={{
                    width: '72px', height: '72px', borderRadius: '50%',
                    background: '#0077b6', color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                  }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0077b6', marginBottom: '0.6rem' }}>
                    Appointment Requested!
                  </h3>
                  <p style={{ color: '#555', lineHeight: 1.75, marginBottom: '0.4rem' }}>
                    Thank you, <strong>{form.name}</strong>! Appointment is <strong>{form.phone}</strong> received. Incase of any questions contact us.
                  </p>
                  {form.date && form.time && (
                    <p style={{ color: '#0077b6', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.4rem' }}>
                      Requested: {form.date} at {form.time}
                    </p>
                  )}
                  {form.service && (
                    <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '2rem' }}>
                      Service: {form.service}
                    </p>
                  )}
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', service: '', date: '', time: '', notes: '' }); }}
                    className="submit-btn"
                    style={{ background: '#0077b6', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.85rem 2rem', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem' }}
                  >
                    Book Another
                  </button>
                </div>
              ) : (
                <>
                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontWeight: 800, color: '#0077b6', fontSize: '1.4rem', marginBottom: '0.3rem' }}>
                      Book Your Appointment
                    </h3>
                    <p style={{ color: '#888', fontSize: '0.87rem' }}>
                      Fill in the details below to book your slot.
                    </p>

                    {/* Progress bar */}
                    <div style={{ display: 'flex', gap: '0.35rem', marginTop: '1.2rem', alignItems: 'center' }}>
                      {Object.keys(form).map(f => (
                        <div key={f} style={{
                          height: '3px', flex: 1, borderRadius: '3px',
                          background: form[f] ? '#0077b6' : '#d0eaf8',
                          transition: 'background 0.3s',
                        }} />
                      ))}
                      <span style={{ fontSize: '0.72rem', color: '#888', marginLeft: '0.4rem', whiteSpace: 'nowrap' }}>
                        {filled}/{total}
                      </span>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>

                    {/* Name + Phone */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label style={labelStyle}>Full Name *</label>
                        <input name="name" value={form.name} onChange={handleChange}
                          onFocus={() => setActiveField('name')} onBlur={() => setActiveField(null)}
                          placeholder="Rahul Sharma" required style={inputStyle('name')} />
                      </div>
                      <div>
                        <label style={labelStyle}>Phone *</label>
                        <input name="phone" value={form.phone} onChange={handleChange}
                          onFocus={() => setActiveField('phone')} onBlur={() => setActiveField(null)}
                          placeholder="94180 84508" required style={inputStyle('phone')} />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label style={labelStyle}>Email *</label>
                      <input type="email" name="email" value={form.email} onChange={handleChange}
                        onFocus={() => setActiveField('email')} onBlur={() => setActiveField(null)}
                        placeholder="[email protected]" required style={inputStyle('email')} />
                    </div>

                    {/* Service */}
                    <div>
                      <label style={labelStyle}>Service Required *</label>
                      <select name="service" value={form.service} onChange={handleChange}
                        onFocus={() => setActiveField('service')} onBlur={() => setActiveField(null)}
                        required style={{ ...inputStyle('service'), cursor: 'pointer' }}>
                        <option value="">Select a service...</option>
                        {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>

                    {/* Date */}
                    <div>
                      <label style={labelStyle}>Preferred Date</label>
                      <input type="date" name="date" value={form.date}
                      onChange={e => {
                        const picked = e.target.value;
                          if (isSunday(picked)) {
                          setError('We are closed on Sundays. Please choose another day.');
                        setForm(f => ({ ...f, date: '' }));
                        return;
                        }
                      setError('');
                      setForm(f => ({ ...f, date: picked }));
                      }}
                      onFocus={() => setActiveField('date')} onBlur={() => setActiveField(null)}
                      min={new Date().toISOString().split('T')[0]}
                      style={inputStyle('date')} />
                    </div>

                    {/* Time slots */}
                    <div>
                      <label style={labelStyle}>Preferred Time</label>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                        {TIMES.map(t => (
                          <button
                            key={t} type="button"
                            onMouseEnter={() => setHovTime(t)}
                            onMouseLeave={() => setHovTime(null)}
                            onClick={() => setForm(f => ({ ...f, time: t }))}
                            style={{
                              padding: '0.5rem 0.25rem',
                              borderRadius: '7px',
                              border: `1.5px solid ${form.time === t ? '#0077b6' : hovTime === t ? '#5BB4E5' : '#d0eaf8'}`,
                              background: form.time === t ? '#0077b6' : hovTime === t ? '#eaf6fd' : '#fff',
                              color: form.time === t ? '#fff' : '#1a1a2e',
                              fontSize: '0.78rem',
                              fontWeight: form.time === t ? 700 : 500,
                              cursor: 'pointer',
                              transition: 'all 0.18s',
                              fontFamily: "'Segoe UI', sans-serif",
                            }}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                      {form.time && (
                        <p style={{ color: '#0077b6', fontSize: '0.8rem', marginTop: '0.5rem', fontWeight: 600 }}>
                          Selected: {form.time}
                        </p>
                      )}
                    </div>

                    {/* Notes */}
                    <div>
                      <label style={labelStyle}>Additional Notes</label>
                      <textarea name="notes" value={form.notes} onChange={handleChange}
                        onFocus={() => setActiveField('notes')} onBlur={() => setActiveField(null)}
                        placeholder="Any specific concern, pain, or preference..."
                        rows={3} style={{ ...inputStyle('notes'), resize: 'none' }} />
                    </div>

                    {error && (
                      <p style={{ background: '#fdecec', color: '#c0392b', padding: '0.7rem 1rem', borderRadius: '8px', fontSize: '0.85rem' }}>
                        {error}
                      </p>
                    )}

                    <button type="submit" className="submit-btn" disabled={submitting} style={{
                      background: '#0077b6', color: '#fff',
                      border: 'none', borderRadius: '8px',
                      padding: '1rem 2rem', fontWeight: 700,
                      fontSize: '1rem', cursor: submitting ? 'default' : 'pointer',
                      opacity: submitting ? 0.7 : 1,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                    }}>
                      {submitting ? 'Booking...' : <>Confirm Appointment <IconArrow /></>}
                    </button>

                    <p style={{ color: '#bbb', fontSize: '0.75rem', textAlign: 'center' }}>
                      
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ── CTA ── */}
      <AnimatedSection>
        <section style={{ padding: '4.5rem 3rem', background: '#5BB4E5', textAlign: 'center' }}>
          <h2 style={{ color: '#fff', fontSize: '2rem', fontWeight: 800, marginBottom: '0.7rem' }}>
            Prefer to call instead?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.88)', fontSize: '1rem', marginBottom: '1.8rem' }}>
            Our team is available Mon–Sat, 9 AM – 1 PM & 2 – 6 PM.
          </p>
          <a href="tel:+919418084508" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
            padding: '0.9rem 2.5rem', background: '#fff', color: '#0077b6',
            borderRadius: '6px', textDecoration: 'none', fontWeight: 700, fontSize: '1rem',
          }}>
            <IconPhone /> +91 94180 84508
          </a>
        </section>
      </AnimatedSection>

      <Footer />
    </div>
  );
}
