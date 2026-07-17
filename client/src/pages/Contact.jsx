import { useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';

/* ─── SVG Icons (no emojis) ─── */
const IconPin = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const IconPhone = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.69 3.29 2 2 0 0 1 3.64 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.63a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const IconClock = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const IconCalendar = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const IconCheck = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

/* ─── Footer ─── */
function Footer() {
  const [hovLink, setHovLink] = useState(null);
  return (
    <footer style={{ background: '#1a1a2e', color: '#fff', padding: 'clamp(2.5rem, 8vw, 4rem) clamp(1.25rem, 5vw, 3rem) 2rem' }}>
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
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', lineHeight: 1.8 }}>
            Gentle care.<br />Confident smiles.
          </p>
        </div>
        <div>
          <p style={{ fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '1.2rem' }}>Navigation</p>
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
          <p style={{ fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '1.2rem' }}>Get in touch</p>
          {['Dr. Mukul Kumar', '+91 94180 84508', 'Kuthiala Building, Main Market Kasumpti, Shimla – 171009', 'Mon–Sat: 9:00 AM – 1 PM & 2–6 PM', 'Sunday: Closed'].map(item => (
            <p key={item} style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{item}</p>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <Link to="/contact" style={{
            padding: '0.8rem 2rem', background: '#5BB4E5', color: '#fff',
            borderRadius: '6px', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem',
          }}>Book Appointment</Link>
        </div>
      </div>
      <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.25)', fontSize: '0.82rem', marginTop: '2rem' }}>
        © 2002 MCM Dental Clinic. All rights reserved.
      </p>
    </footer>
  );
}

/* ─── Info Card ─── */
function InfoCard({ Icon, title, lines, href }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? '#0077b6' : '#fff',
        border: `1.5px solid ${hov ? '#0077b6' : '#d0eaf8'}`,
        borderRadius: '12px',
        padding: '2rem 1.8rem',
        boxShadow: hov ? '0 12px 32px rgba(0,119,182,0.18)' : '0 2px 12px rgba(0,119,182,0.07)',
        cursor: 'default',
        transition: 'all 0.25s ease',
        transform: hov ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      <div style={{
        width: '48px', height: '48px', borderRadius: '10px',
        background: hov ? 'rgba(255,255,255,0.15)' : '#eaf6fd',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: hov ? '#fff' : '#0077b6',
        marginBottom: '1.2rem',
        transition: 'all 0.25s',
      }}>
        <Icon />
      </div>
      <p style={{ fontWeight: 700, color: hov ? '#fff' : '#0077b6', fontSize: '0.95rem', marginBottom: '0.6rem', transition: 'color 0.25s' }}>
        {title}
      </p>
      {href
        ? <a href={href} style={{ color: hov ? 'rgba(255,255,255,0.9)' : '#0077b6', fontSize: '0.9rem', textDecoration: 'none', fontWeight: 600, transition: 'color 0.25s' }}>{lines[0]}</a>
        : lines.map(l => <p key={l} style={{ color: hov ? 'rgba(255,255,255,0.8)' : '#555', fontSize: '0.9rem', lineHeight: 1.7, transition: 'color 0.25s' }}>{l}</p>)
      }
    </div>
  );
}

/* ─── Days ─── */
const DAYS = [
  { day: 'Mon', open: true }, { day: 'Tue', open: true }, { day: 'Wed', open: true },
  { day: 'Thu', open: true }, { day: 'Fri', open: true }, { day: 'Sat', open: true },
  { day: 'Sun', open: false },
];

export default function Contact() {
  const todayIdx = new Date().getDay();
  const adjustedToday = todayIdx === 0 ? 6 : todayIdx - 1;

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", color: '#1a1a2e', background: '#fff' }}>

      <style>{`
        .why-item { transition: all 0.22s ease; }
        .why-item:hover { background: #eaf6fd !important; border-color: #5BB4E5 !important; transform: translateX(6px); }
        .schedule-day { transition: all 0.2s ease; }
        .schedule-day:hover { transform: translateY(-3px); box-shadow: 0 6px 16px rgba(0,119,182,0.15); }
        .submit-btn { transition: all 0.2s ease; }
        .submit-btn:hover { background: #0077b6 !important; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(0,119,182,0.3); }
        .cta-btn-white { transition: all 0.2s ease; }
        .cta-btn-white:hover { background: #eaf6fd !important; color: #0077b6 !important; }
      `}</style>

      {/* ── HERO ── */}
      <section style={{
        position: 'relative', height: '100vh',
        backgroundImage: 'url(/images/contact-hero.jpg)',
        backgroundSize: 'cover', backgroundPosition: 'center',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '0 clamp(1.25rem, 5vw, 2rem)',
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
`, 
          }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <AnimatedSection>
            <p style={{ color: '#fafbfc', fontWeight: 600, letterSpacing: '0.15em', fontSize: '0.8rem', marginBottom: '0.8rem', textTransform: 'uppercase' }}>
              Get In Touch
            </p>
            <h1 style={{ color: '#fff', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.1 }}>
              Contact Us
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto', lineHeight: 1.75 }}>
              Whether you're booking your first visit or have a quick question our team is here to help.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── 4 INFO CARDS ── */}
      <AnimatedSection>
        <section style={{ padding: 'clamp(2.5rem, 7vw, 4.5rem) clamp(1.25rem, 5vw, 2rem)', background: '#f0f9ff' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            gap: '1.5rem',
            maxWidth: '1100px',
            margin: '0 auto',
          }}>
            <InfoCard Icon={IconPin}      title="Address"         lines={['Kuthiala Building', 'Main Market, Kasumpti', 'Shimla – 171009, HP']} />
            <InfoCard Icon={IconPhone}    title="Phone"           lines={['+91 94180 84508']} href="tel:+919418084508" />
            <InfoCard Icon={IconClock}    title="Morning Hours"   lines={['9:00 AM – 1:00 PM', 'Mon – Saturday', 'Sunday: Closed']} />
            <InfoCard Icon={IconCalendar} title="Afternoon Hours" lines={['2:00 PM – 6:00 PM', 'Mon – Saturday', 'Sunday: Closed']} />
          </div>
        </section>
      </AnimatedSection>

      {/* ── FORM + LEFT PANEL ── */}
      <AnimatedSection>
        <section style={{ padding: 'clamp(3.5rem, 8vw, 6rem) clamp(1.25rem, 5vw, 2rem)', background: '#fff' }}>
          <div style={{
            maxWidth: '1100px', margin: '0 auto',
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'clamp(2.5rem, 6vw, 5rem)', alignItems: 'start',
          }}>

            {/* ── Left ── */}
            <div>
              <p style={{ color: '#5BB4E5', fontWeight: 600, letterSpacing: '0.12em', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                Reach Out
              </p>
              <h2 style={{ fontSize: 'clamp(1.9rem, 3vw, 2.6rem)', fontWeight: 800, color: '#0077b6', lineHeight: 1.2, marginBottom: '1.1rem' }}>
                Your smile starts<br />with a conversation.
              </h2>
              <p style={{ color: '#5a6e80', lineHeight: 1.85, marginBottom: '2.5rem', fontSize: '0.97rem' }}>
                Book your appointment online in seconds. Walk-ins are also welcome during clinic hours.
              </p>

              {/* Why choose us */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2.8rem' }}>
                {[
                  'Painless procedures & gentle care',
                  'Modern sterilized equipment',
                  'Transparent, affordable pricing',
                  'Same-day emergency appointments',
                ].map(item => (
                  <div key={item} className="why-item" style={{
                    display: 'flex', alignItems: 'center', gap: '0.85rem',
                    padding: '0.75rem 1rem',
                    border: '1px solid #d0eaf8',
                    borderRadius: '8px',
                    background: '#f5fbff',
                    cursor: 'default',
                  }}>
                    <div style={{
                      width: '28px', height: '28px', borderRadius: '50%',
                      background: '#0077b6',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', flexShrink: 0,
                    }}>
                      <IconCheck />
                    </div>
                    <span style={{ fontSize: '0.9rem', fontWeight: 500, color: '#1a1a2e' }}>{item}</span>
                  </div>
                ))}
              </div>

              {/* Weekly schedule */}
              <p style={{ fontWeight: 700, color: '#0077b6', fontSize: '0.9rem', marginBottom: '1rem', letterSpacing: '0.04em' }}>
                WEEKLY SCHEDULE
              </p>
              <div style={{ display: 'flex', gap: '0.45rem' }}>
                {DAYS.map((d, i) => (
                  <div key={d.day} className="schedule-day" style={{
                    flex: 1,
                    padding: '0.75rem 0',
                    borderRadius: '8px',
                    background: i === adjustedToday ? '#0077b6' : d.open ? '#eaf6fd' : '#fff4f4',
                    border: `1px solid ${i === adjustedToday ? '#0077b6' : d.open ? '#d0eaf8' : '#ffd0d0'}`,
                    textAlign: 'center',
                    position: 'relative',
                    cursor: 'default',
                  }}>
                    {i === adjustedToday && (
                      <div style={{
                        position: 'absolute', top: '-9px', left: '50%', transform: 'translateX(-50%)',
                        background: '#5BB4E5', color: '#fff',
                        fontSize: '0.5rem', fontWeight: 800, padding: '2px 6px',
                        borderRadius: '20px', whiteSpace: 'nowrap', letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                      }}>Today</div>
                    )}
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: i === adjustedToday ? '#fff' : d.open ? '#0077b6' : '#e55' }}>
                      {d.day}
                    </div>
                  </div>
                ))}
              </div>

              {/* Direct call strip */}
              <a href="tel:+919418084508" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginTop: '2rem',
                padding: '1.1rem 1.4rem',
                background: '#eaf6fd',
                border: '1.5px solid #b8dcf5',
                borderRadius: '10px',
                textDecoration: 'none',
                transition: 'all 0.22s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = '#0077b6'; e.currentTarget.style.borderColor = '#0077b6'; e.currentTarget.querySelectorAll('span').forEach(s => s.style.color = '#fff'); }}
                onMouseLeave={e => { e.currentTarget.style.background = '#eaf6fd'; e.currentTarget.style.borderColor = '#b8dcf5'; e.currentTarget.querySelectorAll('span').forEach(s => { s.style.color = s.dataset.col; }); }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ color: '#0077b6' }}><IconPhone /></div>
                  <div>
                    <span data-col="#0077b6" style={{ display: 'block', fontWeight: 700, fontSize: '0.82rem', color: '#0077b6', transition: 'color 0.22s' }}>Call us directly</span>
                    <span data-col="#0077b6" style={{ display: 'block', fontWeight: 800, fontSize: '1rem', color: '#0077b6', transition: 'color 0.22s' }}>+91 94180 84508</span>
                  </div>
                </div>
                <span data-col="#0077b6" style={{ color: '#0077b6', transition: 'color 0.22s' }}><IconArrow /></span>
              </a>
            </div>

            {/* ── Right — Book CTA ── */}
            <div style={{
              background: '#f5fbff',
              borderRadius: '16px',
              padding: 'clamp(2rem, 6vw, 2.8rem)',
              border: '1px solid #d0eaf8',
              boxShadow: '0 4px 24px rgba(0,119,182,0.09)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              justifyContent: 'center',
              minHeight: '360px',
            }}>
              <div style={{
                width: '72px', height: '72px', borderRadius: '50%',
                background: '#0077b6', color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1.5rem',
              }}><IconCheck /></div>

              <h3 style={{ fontWeight: 800, color: '#0077b6', fontSize: '1.4rem', marginBottom: '0.6rem' }}>
                Ready to book?
              </h3>
              <p style={{ color: '#5a6e80', lineHeight: 1.75, marginBottom: '2rem', fontSize: '0.95rem', maxWidth: '340px' }}>
                Skip the back-and-forth, pick a service, date, and time slot online in under a minute.
              </p>

              <Link to="/book" className="submit-btn" style={{
                background: '#0077b6', color: '#fff', border: 'none',
                borderRadius: '8px', padding: '1rem 2.25rem',
                fontWeight: 700, fontSize: '1rem', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                textDecoration: 'none',
              }}>
                Book an Appointment <IconArrow />
              </Link>

              <p style={{ color: '#bbb', fontSize: '0.75rem', marginTop: '1.25rem' }}>
                Prefer to call instead? Use the number on the left.
              </p>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ── VISIT US / MAP ── */}
      <AnimatedSection>
        <section style={{ padding: 'clamp(3rem, 8vw, 5rem) clamp(1.25rem, 5vw, 2rem)', background: '#eaf6fd' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <p style={{ color: '#5BB4E5', fontWeight: 600, letterSpacing: '0.12em', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Location
              </p>
              <h2 style={{ fontSize: 'clamp(1.6rem, 5vw, 2.2rem)', fontWeight: 800, color: '#0077b6', marginBottom: '0.5rem' }}>
                Visit Us in Person
              </h2>
              <p style={{ color: '#5a6e80', fontSize: '0.97rem' }}>
                Kuthiala Building, Main Market, Kasumpti, Shimla – 171009
              </p>
            </div>

            {/* 3 detail strips */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
              {[
                { Icon: IconPin,      label: 'Address',  val: 'Kuthiala Building, Main Market, Kasumpti, Shimla' },
                { Icon: IconPhone,    label: 'Phone',    val: '+91 94180 84508', href: 'tel:+919418084508' },
                { Icon: IconClock,    label: 'Hours',    val: 'Mon–Sat  9–1 AM & 2–6 PM · Sunday Closed' },
              ].map(item => (
                <div key={item.label} style={{
                  background: '#fff', border: '1px solid #d0eaf8', borderRadius: '10px',
                  padding: '1.2rem 1.4rem', display: 'flex', gap: '1rem', alignItems: 'center',
                }}>
                  <div style={{ color: '#0077b6', flexShrink: 0 }}><item.Icon /></div>
                  <div>
                    <p style={{ fontWeight: 700, color: '#0077b6', fontSize: '0.82rem', marginBottom: '0.2rem' }}>{item.label}</p>
                    {item.href
                      ? <a href={item.href} style={{ color: '#0077b6', fontWeight: 600, textDecoration: 'none', fontSize: '0.9rem' }}>{item.val}</a>
                      : <p style={{ color: '#555', fontSize: '0.88rem', lineHeight: 1.5 }}>{item.val}</p>
                    }
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderRadius: '14px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,119,182,0.13)', border: '1px solid #d0eaf8' }}>
              <iframe
                title="MCM Dental Clinic"
                src="https://maps.google.com/maps?q=31.0779787,77.1830037&z=17&output=embed"
                width="100%" height="440"
                style={{ border: 0, display: 'block' }}
                allowFullScreen="" loading="lazy"
              />
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ── CTA ── */}
      <AnimatedSection>
        <section style={{ padding: 'clamp(3rem, 8vw, 5rem) clamp(1.25rem, 5vw, 3rem)', background: '#5BB4E5', textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 600, letterSpacing: '0.12em', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.7rem' }}>
            Ready?
          </p>
          <h2 style={{ color: '#fff', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, marginBottom: '0.9rem', lineHeight: 1.2 }}>
            Ready for your next visit?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.88)', fontSize: '1rem', marginBottom: '2.2rem', maxWidth: '440px', margin: '0 auto 2.2rem', lineHeight: 1.75 }}>
            Book your appointment online. It's quick, easy, and takes less than a minute.
          </p>
          <a href="tel:+919418084508" className="cta-btn-white" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
            padding: '1rem 2.8rem', background: '#fff', color: '#0077b6',
            borderRadius: '6px', textDecoration: 'none', fontWeight: 700, fontSize: '1rem',
          }}>
            <IconPhone /> Call Us Now
          </a>
        </section>
      </AnimatedSection>

      <Footer />
    </div>
  );
}
