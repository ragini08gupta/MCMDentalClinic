import HeroSection from '../components/HeroSection';
import AnimatedSection from '../components/AnimatedSection';
import StaggerCards, { StaggerCard } from '../components/StaggerCards';
import { Link } from 'react-router-dom';

const services = [
  { title: 'Teeth Whitening', desc: 'Professional laser whitening for a brighter smile'},
  { title: 'Dental Implants', desc: 'Permanent natural-looking tooth replacement' },
  { title: 'Braces & Aligners', desc: 'Clear aligners and traditional braces' },
  { title: 'Root Canal', desc: 'Painless modern root canal treatment' },
  { title: 'Dental Cleaning', desc: 'Thorough cleaning and plaque removal' },
  { title: 'Cosmetic Dentistry', desc: 'Veneers, bonding, and smile makeovers' },
];

const reviews = [
  { text: "It's the first clinic where I actually felt relaxed during treatment.", name: "Manoj." },
  { text: "You feel their kindness from the moment you walk in.", name: "Ranjan Mahajan" },
  { text: "For the first time, I felt completely at ease during my appointment.", name: "Shweta Rajput" },
];

const beforeAfter = [
  { label: 'Teeth Whitening', before: '/gallery/whitening-before.jpg', after: '/gallery/whitening-after.jpg' },
  { label: 'Braces', before: '/gallery/braces-before.jpg', after: '/gallery/braces-after.jpg' },
  { label: 'Implants', before: '/gallery/implant-before.jpg', after: '/gallery/implant-after.jpg' },
  { label: 'Veneers', before: '/gallery/veneer-before.jpg', after: '/gallery/veneer-after.jpg' },
];

export default function Home() {
  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", color: '#1a1a2e' }}>

      

      {/* Hero */}
      <HeroSection />

      {/* About strip */}
      <AnimatedSection>
        <section style={{
          padding: '5rem 3rem',
          background: '#eaf6fd',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4rem',
          flexWrap: 'wrap',
        }}>
          <div style={{ maxWidth: '500px' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 700, marginBottom: '1rem', lineHeight: 1.3 }}>
              Trusted Dental Care<br />
              <span style={{ color: '#5BB4E5' }}>Since 2002</span>
            </h2>
            <p style={{ color: '#555', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              At MCM Dental, we believe your dental visit should feel calm, professional, and personal.
              We combine advanced technology with genuine care — so every smile feels confident.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {['Comfort-first approach', 'Certified dentists', 'Modern digital equipment'].map(item => (
                <li key={item} style={{ color: '#444', fontSize: '0.95rem' }}>
                  <span style={{ color: '#5BB4E5', marginRight: '0.5rem' }}>—</span>{item}
                </li>
              ))}
            </ul>
          </div>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem',
          }}>
            {[1,2,3,4].map(i => (
              <div key={i} style={{
                width: '180px', height: '180px',
                background: '#c8e9f7',
                borderRadius: '16px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#5BB4E5', fontSize: '0.85rem', fontWeight: 500,
              }}>Add photo {i}</div>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* Services */}
      <section style={{ padding: '6rem 3rem', background: '#fff' }}>
        <AnimatedSection>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ color: '#5BB4E5', fontWeight: 600, letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: '0.5rem' }}>WHAT WE OFFER</p>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 700 }}>Our Main Services</h2>
            <p style={{ color: '#666', marginTop: '0.75rem' }}>Comprehensive dental care for every stage of your smile.</p>
          </div>
        </AnimatedSection>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <StaggerCards>
            {services.map((s) => (
              <StaggerCard key={s.title}>
                <div style={{
                  background: '#f5fbff',
                  borderRadius: '16px',
                  padding: '2rem',
                  border: '1px solid #d0eaf8',
                  textAlign: 'center',
                  height: '100%',
                }}>
                  <h3 style={{ marginBottom: '0.5rem', color: '#1a1a2e' }}>{s.title}</h3>
                  <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              </StaggerCard>
            ))}
          </StaggerCards>
        </div>
      </section>

      {/* Before & After */}
      <AnimatedSection delay={0.1}>
        <section style={{ padding: '6rem 3rem', background: '#eaf6fd' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ color: '#5BB4E5', fontWeight: 600, letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: '0.5rem' }}>RESULTS</p>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 700 }}>Before & After</h2>
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
                    <div style={{
                      height: '180px', background: '#c8e9f7',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.75rem', color: '#5BB4E5',
                    }}>
                      {/* Replace with: <img src={item.before} style={{width:'100%',height:'180px',objectFit:'cover'}} /> */}
                      Before
                    </div>
                    <span style={{
                      position: 'absolute', bottom: '8px', left: '8px',
                      background: 'rgba(0,0,0,0.5)', color: '#fff',
                      fontSize: '0.7rem', padding: '2px 8px', borderRadius: '4px',
                    }}>Before</span>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <div style={{
                      height: '180px', background: '#5BB4E5',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.75rem', color: '#fff',
                    }}>
                      {/* Replace with: <img src={item.after} style={{width:'100%',height:'180px',objectFit:'cover'}} /> */}
                      After
                    </div>
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
        <section style={{ padding: '6rem 3rem', background: '#fff' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ color: '#5BB4E5', fontWeight: 600, letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: '0.5rem' }}>TESTIMONIALS</p>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 700 }}>What Our Patients Say</h2>
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
          padding: '5rem 3rem',
          background: '#5BB4E5',
          textAlign: 'center',
          color: '#fff',
        }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>Ready for your next visit?</h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '2rem' }}>
            Book your appointment online — it's quick, easy, and takes less than a minute.
          </p>
          <Link to="/book" style={{
            padding: '1rem 3rem',
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
        padding: '4rem 3rem 2rem',
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
            {['+91 98765 43210', 'mcmdental@gmail.com', 'Shimla, Himachal Pradesh', 'Mon–Sat: 9:00 AM – 7:00 PM'].map(item => (
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
          © 2025 MCM Dental Clinic. All rights reserved.
        </p>
      </footer>

    </div>
  );
}