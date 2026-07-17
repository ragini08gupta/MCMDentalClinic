import { useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';

const services = [
  {
    title: 'Preventive Care',
    tag: 'FOUNDATION OF HEALTH',
    description: 'Routine check-ups, professional cleaning, and early diagnostics, the cornerstones of lasting dental health. Our gentle approach ensures comfort at each visit.',
    items: ['Comprehensive dental examination', 'Teeth cleaning and polishing', 'Digital X-rays with printed copies', 'Demonstration of proper brushing method and flossing'],
    img: '/images/preventive-care.jpeg',
    side: 'left',
  },
  {
    title: 'Cosmetic Dentistry',
    tag: 'SMILE TRANSFORMATION',
    description: 'A brighter, more confident smile starts here. Expert cosmetic treatments with natural looking results..',
    items: ['Tooth coloured fillings', 'Front teeth gap correction', 'Smile correction', 'Aesthetic crowns'],
    img: '/images/cosmetic.jpg',
    side: 'right',
  },
  {
    title: 'Orthodontics',
    tag: 'STRENGTH & FUNCTION',
    description: 'We use modern orthodontic solutions, including invisible aligners, to align your teeth comfortably and discreetly.',
    items: ['Metal Braces', 'Ceramic Braces', 'Lingual Braces', 'Aligners'],
    img: '/images/crowns.jpg',
    side: 'left',
  },
  {
    title: 'Dentures & Prosthetics',
    tag: 'COMPLETE SMILE',
    description: 'Regain full comfort eating, speaking, and smiling with high-quality imported and precision-fitted denture solutions.',
    items: ['Imported Teeth Set', 'Flexible Denture', 'Cast Partial Denture', 'Long Span Bridge'],
    img: '/images/dentures.jpg',
    side: 'right',
  },
  {
    title: 'Surgical & Periodontal',
    tag: 'ADVANCED TREATMENT',
    description: 'From painless extractions to advanced gum procedures — performed with precision instruments and modern techniques for faster healing.',
    items: ['Painfree Removal of Tooth', 'Flap Surgery', 'Surgical Extraction', 'Curettage'],
    img: '/images/surgery.jpeg',
    side: 'left',
  },
  {
    title: "Children's Dentistry",
    tag: 'GENTLE & FRIENDLY',
    description: 'A warm, calm space designed for young patients. We build trust early and set children up for a lifetime of healthy smiles.',
    items: ['Special Treatment for Children', 'First-time Check-ups', 'Preventive Kids Care', 'Fluoride Treatments'],
    img: '/images/children.jpg',
    side: 'right',
  },
];

const allServices = [
  'Painfree Removal of Tooth', 'Imported Teeth Set', 'Flexible Denture',
  'Cast Partial Denture', 'Composite Fillings', 'Veneers',
  'Diastema Closure', 'Restoration of Fractured Tooth', 'Digital X-Rays',
  'Orthodontist on Call', 'Oral Prophylaxis', 'Flap Surgery',
  'RCT', 'Complete Denture', 'Ceramic Crowns',
  'Composite Splinting', 'Bridge & Aligners', 'Special Treatment for Children',
];

function Footer() {
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
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: 1.7 }}>Gentle care. Confident smiles.</p>
        </div>
        <div>
          <p style={{ fontWeight: 600, marginBottom: '1rem' }}>Navigation</p>
          {[
            { label: 'Home', path: '/' },
            { label: 'About Us', path: '/about' },
            { label: 'Our Services', path: '/services' },
            { label: 'Contact Us', path: '/contact' },
          ].map(item => (
            <Link key={item.label} to={item.path} style={{ display: 'block', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              {item.label}
            </Link>
          ))}
        </div>
        <div>
          <p style={{ fontWeight: 600, marginBottom: '1rem' }}>Get in touch</p>
          {[
            'Dr. Mukul Kumar',
            '+91 94180 84508',
            'Kuthiala Building, Main Market Kasumpti, Shimla – 171009',
            'Mon–Sat: 9:00 AM – 1 PM & 2–6 PM',
            'Sunday: Closed',
          ].map(item => (
            <p key={item} style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{item}</p>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <Link to="/contact" style={{
            padding: '0.75rem 2rem',
            background: '#5BB4E5',
            color: '#fff',
            borderRadius: '50px',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '0.95rem',
            whiteSpace: 'nowrap',
          }}>Book Appointment</Link>
        </div>
      </div>
      <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem', marginTop: '2rem' }}>
        © 2002 MCM Dental Clinic. All rights reserved.
      </p>
    </footer>
  );
}

export default function Services() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", color: '#1a1a2e', background: '#fff' }}>

      {/* ── HERO ── */}
      <section style={{
        position: 'relative',
        height: '100vh',
        backgroundImage: 'url(/images/services-hero.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '0 clamp(1.25rem, 5vw, 2rem)',
      }}>
        <div style={{ position: 'absolute', inset: 0, 
          background: `
  linear-gradient(
    to bottom,
    rgb(222 227 231 / 15%) 0%,
    rgb(81 84 86 / 35%) 40%,
    rgb(54 60 65 / 60%) 70%,
    rgb(25 50 71 / 85%) 100%
  )
`,
           }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <AnimatedSection>
            <p style={{ color: '#5BB4E5', fontWeight: 600, letterSpacing: '0.12em', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
              WHAT WE OFFER
            </p>
            <h1 style={{ color: '#fff', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.1 }}>
              Our Services
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 'clamp(0.95rem, 3vw, 1.1rem)', maxWidth: '520px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
              All services under one roof in the heart of Kasumpti, Shimla.
            </p>
            <Link to="/contact" style={{
              padding: '0.85rem 2.2rem',
              background: '#5BB4E5',
              color: '#fff',
              borderRadius: '50px',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '0.95rem',
            }}>
              Book Appointment
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ── SERVICE SECTIONS ── */}
      {services.map((svc, i) => (
        <AnimatedSection key={svc.title} delay={0.05}>
          <section style={{
            padding: 'clamp(3.5rem, 8vw, 6rem) clamp(1.25rem, 5vw, 2rem)',
            background: i % 2 === 0 ? '#fff' : '#eaf6fd',
          }}>
            <div style={{
              maxWidth: '1100px',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'clamp(2rem, 5vw, 4rem)',
              alignItems: 'center',
              direction: svc.side === 'right' ? 'rtl' : 'ltr',
            }}>
              {/* Image */}
              <div style={{ direction: 'ltr' }}>
                <img
                  src={svc.img}
                  alt={svc.title}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                  style={{ width: '100%', height: '380px', objectFit: 'cover', borderRadius: '16px', boxShadow: '0 8px 30px rgba(0,119,182,0.12)', display: 'block' }}
                />
                <div style={{
                  display: 'none',
                  width: '100%', height: '380px',
                  background: '#c8e9f7',
                  borderRadius: '16px',
                  alignItems: 'center', justifyContent: 'center',
                  color: '#5BB4E5', fontSize: '0.9rem', fontWeight: 500,
                }}>
                  Add photo — {svc.title}
                </div>
              </div>

              {/* Content */}
              <div style={{ direction: 'ltr' }}>
                <p style={{ color: '#5BB4E5', fontWeight: 600, letterSpacing: '0.1em', fontSize: '0.8rem', marginBottom: '0.6rem' }}>
                  {svc.tag}
                </p>
                <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 800, color: '#0077b6', lineHeight: 1.2, marginBottom: '1.2rem' }}>
                  {svc.title}
                </h2>
                <p style={{ color: '#555', lineHeight: 1.8, fontSize: '1rem', marginBottom: '2rem' }}>
                  {svc.description}
                </p>

                {/* Service item cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem', marginBottom: '2rem' }}>
                  {svc.items.map((item) => (
                    <div
                      key={item}
                      onMouseEnter={() => setHoveredCard(item)}
                      onMouseLeave={() => setHoveredCard(null)}
                      style={{
                        background: hoveredCard === item ? '#0077b6' : '#f5fbff',
                        border: `1px solid ${hoveredCard === item ? '#0077b6' : '#d0eaf8'}`,
                        borderRadius: '10px',
                        padding: '0.85rem 1.1rem',
                        cursor: 'default',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <span style={{
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        color: hoveredCard === item ? '#fff' : '#1a1a2e',
                        display: 'block',
                        transition: 'color 0.2s',
                      }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <Link to="/contact" style={{
                  display: 'inline-block',
                  padding: '0.85rem 2rem',
                  background: '#0077b6',
                  color: '#fff',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                }}>
                  Book for This Service
                </Link>
              </div>
            </div>
          </section>
        </AnimatedSection>
      ))}

      {/* ── ALL SERVICES GRID ── */}
      <AnimatedSection>
        <section style={{ padding: 'clamp(3.5rem, 8vw, 6rem) clamp(1.25rem, 5vw, 2rem)', background: '#e0f4ff' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <p style={{ color: '#5BB4E5', fontWeight: 600, letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                OUR SERVICES
              </p>
              <h2 style={{ fontSize: 'clamp(1.8rem, 6vw, 2.5rem)', fontWeight: 700, color: '#023e8a', marginBottom: '0.75rem' }}>
                All Facilities Available
              </h2>
              <p style={{ color: '#555', fontSize: '1rem', maxWidth: '500px', margin: '0 auto' }}>
                From routine checkups to advanced treatments, we provide everything you need for a healthy, confident smile.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '1rem',
            }}>
              {allServices.map((item, idx) => (
                <div
                  key={item}
                  onMouseEnter={() => setHoveredCard('fac-' + idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    background: hoveredCard === 'fac-' + idx ? '#0077b6' : '#fff',
                    border: `1px solid ${hoveredCard === 'fac-' + idx ? '#0077b6' : '#d0eaf8'}`,
                    borderRadius: '12px',
                    padding: '1.1rem 1.3rem',
                    transition: 'all 0.2s ease',
                    cursor: 'default',
                    boxShadow: '0 2px 8px rgba(0,119,182,0.06)',
                  }}
                >
                  <span style={{
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: hoveredCard === 'fac-' + idx ? '#fff' : '#1a1a2e',
                    transition: 'color 0.2s',
                  }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ── CTA BANNER ── */}
      <AnimatedSection>
        <section style={{ padding: 'clamp(3rem, 8vw, 5rem) clamp(1.25rem, 5vw, 3rem)', background: '#5BB4E5', textAlign: 'center', color: '#fff' }}>
          <h2 style={{ fontSize: 'clamp(1.7rem, 6vw, 2.5rem)', fontWeight: 700, marginBottom: '1rem' }}>Ready for your next visit?</h2>
          <p style={{ fontSize: '1.05rem', opacity: 0.92, marginBottom: '2rem', maxWidth: '480px', margin: '0 auto 2rem' }}>
            Book your appointment online. It's quick, easy, and takes less than a minute.
          </p>
          <Link to="/contact" style={{
            padding: 'clamp(0.85rem, 3vw, 1rem) clamp(1.75rem, 6vw, 3rem)',
            background: '#fff',
            color: '#0077b6',
            borderRadius: '50px',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: '1rem',
          }}>Book Appointment</Link>
        </section>
      </AnimatedSection>

      <Footer />
    </div>
  );
}
