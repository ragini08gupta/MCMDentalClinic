import HeroSection from '../components/HeroSection';
import AnimatedSection from '../components/AnimatedSection';
import StaggerCards, { StaggerCard } from '../components/StaggerCards';
import { Link } from 'react-router-dom';

const services = [
  { title: 'Extractions', desc: 'Safe and gentle tooth extractions for damaged, decayed or impacted teeth.'},
  { title: 'Dental Implants', desc: 'Permanent natural-looking tooth replacement' },
  { title: 'Braces & Aligners', desc: 'Clear aligners and traditional braces' },
  { title: 'Root Canal', desc: 'Painless modern root canal treatment' },
  { title: 'Dental Cleaning', desc: 'Thorough cleaning and plaque removal' },
  { title: 'Filling', desc: 'Durable tooth-colored fillings to repair cavities and protect your teeth.' },
  { title: 'Crowns & Bridges', desc: 'Durable replacement of teeth to protect and complete your smile' },
  { title: 'Dentures', desc: 'Custom-made dentures that restore your smile, comfort, and confidence.' },
];

const reviews = [
  { text: "I lost two front teeth in an accident. Life became very difficult since then as I had to cover me face. Then I was told about permanent replacement of teeth and smile designing. Today nobody can tell false from original teeth. Thank you doctor so much.", name: "Subodh Gupta." },
  { text: "I had a dark spot in my tooth which was always pointed out to me when I smiled. This caused me to avoid smiling. But the doctor fixed my tooth with a composite restoration and now even I don't remember which tooth it was.", name: "Ranjan" },
  { text: "There was some gap between my two front teeth which did not look nice. The doctor told me about the various treatment options and I chose the one which required only 2 days. Now my smile is great. Thanks.", name: "Manoj Kumar" },
];

const beforeAfter = [
  { label: 'Filling', before: '/images/filling-before.jpeg', after: '/images/filling-after.jpeg' },
  { label: 'Crowns', before: '/images/crown-before.jpeg', after: '/images/crown-after.jpeg' },
  { label: 'Implants', before: '/images/implant-before.jpeg', after: '/images/implant-after.jpeg' },
  { label: 'Braces', before: '/images/braces-before.jpg', after: '/images/braces-after.jpg' },
];

export default function Home() {
  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", color: '#1a1a2e' }}>

      <style>{`
        .service-card {
          transition: background 0.25s ease, transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .service-card:hover {
          background: #5BB4E5 !important;
          border-color: #4a9fd1 !important;
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(91, 180, 229, 0.35);
        }
        .service-card:hover .service-card-title,
        .service-card:hover .service-card-desc {
          color: #fff !important;
        }
        @media (max-width: 860px) {
          .home-first-section { padding-top: calc(70px + clamp(3rem, 8vw, 5rem)) !important; }
        }
      `}</style>

      {/* Hero */}
      <HeroSection />

      {/* About strip */}
      <AnimatedSection>
        <section className="home-first-section" style={{
          padding: 'clamp(3rem, 8vw, 5rem) clamp(1.25rem, 5vw, 3rem)',
          background: '#eaf6fd',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'clamp(2rem, 5vw, 4rem)',
          flexWrap: 'wrap',
        }}>
          <div style={{ maxWidth: '500px' }}>
            <h2 style={{ fontSize: 'clamp(1.7rem, 5vw, 2.2rem)', fontWeight: 700, marginBottom: '1rem', lineHeight: 1.3 }}>
              MCM Dental Clinic<br />
              <span style={{ color: '#5BB4E5' }}>Trusted Dental Care<br /> Since 2002</span>
            </h2>
            <p style={{ color: '#555', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              At MCM Dental Clinic, we provide complete dental care from toothache relief and painless root canal treatments to braces, professional teeth cleaning, dentures and more. With advanced technology and a gentle approach, we ensure comfortable, pain-free treatment for every patient.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {['Toothache, RCT & emergency care', 'Braces, cleaning & dentures', 'Gentle, pain-free treatment'].map(item => (
                <li key={item} style={{ color: '#444', fontSize: '0.95rem' }}>
                  <span style={{ color: '#5BB4E5', marginRight: '0.5rem' }}>—</span>{item}
                </li>
              ))}
            </ul>
          </div>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(2, minmax(120px, 180px))', gap: '1rem',
            width: '100%', maxWidth: '380px', justifyContent: 'center',
          }}>
            {['/images/photo1.jpeg', '/images/photo2.jpeg', '/images/photo3.jpeg', '/images/photo4.jpeg'].map((src, i) => (
            <img key={i} src={src} alt={`Clinic photo ${i + 1}`} style={{
            width: '100%', aspectRatio: '1 / 1',
            borderRadius: '16px',
            objectFit: 'cover',
            }} />
          ))}
          </div>
        </section>
      </AnimatedSection>

      {/* Services */}
      <section style={{ padding: 'clamp(3.5rem, 8vw, 6rem) clamp(1.25rem, 5vw, 3rem)', background: '#fff' }}>
        <AnimatedSection>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ color: '#5BB4E5', fontWeight: 600, letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: '0.5rem' }}>WHAT WE OFFER</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 6vw, 2.5rem)', fontWeight: 700 }}>Our Main Services</h2>
            <p style={{ color: '#666', marginTop: '0.75rem' }}>Comprehensive dental care for every stage of your smile.</p>
          </div>
        </AnimatedSection>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <StaggerCards>
            {services.map((s) => (
              <StaggerCard key={s.title}>
                <div className="service-card" style={{
                  background: '#f5fbff',
                  borderRadius: '16px',
                  padding: '2rem',
                  border: '1px solid #d0eaf8',
                  textAlign: 'center',
                  height: '100%',
                  cursor: 'pointer',
                }}>
                  <h3 className="service-card-title" style={{ marginBottom: '0.5rem', color: '#1a1a2e', transition: 'color 0.25s ease' }}>{s.title}</h3>
                  <p className="service-card-desc" style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.6, transition: 'color 0.25s ease' }}>{s.desc}</p>
                </div>
              </StaggerCard>
            ))}
          </StaggerCards>
        </div>
      </section>

      {/* Before & After */}
      <AnimatedSection delay={0.1}>
        <section style={{ padding: 'clamp(3.5rem, 8vw, 6rem) clamp(1.25rem, 5vw, 3rem)', background: '#eaf6fd' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ color: '#5BB4E5', fontWeight: 600, letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: '0.5rem' }}>RESULTS</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 6vw, 2.5rem)', fontWeight: 700 }}>Before & After</h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
            maxWidth: '1100px',
            margin: '0 auto',
          }}>
            {beforeAfter.map((item) => (
              <div key={item.label} style={{ borderRadius: '16px', overflow: 'hidden', background: '#fff', border: '1px solid #d0eaf8' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                  <div style={{ position: 'relative' }}>
                    <img src={item.before} alt={`${item.label} before`} style={{
                      width: '100%', height: '180px', objectFit: 'cover', display: 'block',
                    }} />
                    <span style={{
                      position: 'absolute', bottom: '8px', left: '8px',
                      background: 'rgba(0,0,0,0.5)', color: '#fff',
                      fontSize: '0.7rem', padding: '2px 8px', borderRadius: '4px',
                    }}>Before</span>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <img src={item.after} alt={`${item.label} after`} style={{
                      width: '100%', height: '180px', objectFit: 'cover', display: 'block',
                    }} />
                    <span style={{
                      position: 'absolute', bottom: '8px', right: '8px',
                      background: 'rgba(91,180,229,0.8)', color: '#fff',
                      fontSize: '0.7rem', padding: '2px 8px', borderRadius: '4px',
                    }}>After</span>
                  </div>
                </div>
                <div style={{ padding: '1rem', textAlign: 'center', fontWeight: 600, fontSize: '0.9rem' }}>{item.label}</div>
              </div>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* Reviews */}
      <AnimatedSection delay={0.1}>
        <section style={{ padding: 'clamp(3.5rem, 8vw, 6rem) clamp(1.25rem, 5vw, 3rem)', background: '#fff' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ color: '#5BB4E5', fontWeight: 600, letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: '0.5rem' }}>TESTIMONIALS</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 6vw, 2.5rem)', fontWeight: 700 }}>What Our Patients Say</h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            maxWidth: '1000px',
            margin: '0 auto',
          }}>
            {reviews.map((r) => (
              <div key={r.name} style={{
                background: '#eaf6fd',
                borderRadius: '16px',
                padding: '2rem',
                border: '1px solid #d0eaf8',
              }}>
                <p style={{ fontStyle: 'italic', color: '#333', lineHeight: 1.7, marginBottom: '1rem' }}>"{r.text}"</p>
                <p style={{ color: '#5BB4E5', fontWeight: 600, fontSize: '0.9rem' }}>— {r.name}</p>
              </div>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* CTA Banner */}
      <AnimatedSection delay={0.1}>
        <section style={{
          padding: 'clamp(3rem, 8vw, 5rem) clamp(1.25rem, 5vw, 3rem)',
          background: '#5BB4E5',
          textAlign: 'center',
          color: '#fff',
        }}>
          <h2 style={{ fontSize: 'clamp(1.7rem, 6vw, 2.5rem)', fontWeight: 700, marginBottom: '1rem' }}>Ready for your next visit?</h2>
          <p style={{ fontSize: '1.05rem', opacity: 0.9, marginBottom: '2rem' }}>
            Book your appointment online. It's quick, easy, and takes less than a minute.
          </p>
          <Link to="/book" style={{
            padding: 'clamp(0.85rem, 3vw, 1rem) clamp(1.75rem, 6vw, 3rem)',
            background: '#fff',
            color: '#5BB4E5',
            borderRadius: '50px',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: '1rem',
          }}>Book Appointment</Link>
        </section>
      </AnimatedSection>

      {/* Footer */}
      <footer style={{
        background: '#1a1a2e',
        color: '#fff',
        padding: 'clamp(2.5rem, 8vw, 4rem) clamp(1.25rem, 5vw, 3rem) 2rem',
      }}>
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
            {['Home', 'About Us', 'Our Services', 'Contact Us'].map(item => (
              <a key={item} href="#" style={{ display: 'block', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{item}</a>
            ))}
          </div>
          <div>
            <p style={{ fontWeight: 600, marginBottom: '1rem' }}>Get in touch</p>
            {['Dr. Mukul Kumar', '+91 94180 84508', 'Kuthiala Building Kasumpti Market Shimla, Himachal Pradesh', 'Mon–Sat: 9:00 AM – 6:00 PM'].map(item => (
              <p key={item} style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{item}</p>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <Link to="/book" style={{
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

    </div>
  );
}
