import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';

export default function About() {
  return (
    <div style={{ background: '#fff' }}>

      {/* 1. Hero Banner with image */}
<section style={{
  position: 'relative',
  height: '100vh',
  backgroundImage: 'url(/images/about-hero.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  padding: '0 2rem',
}}>
  {/* Dark overlay so text stays readable over the image */}
  <div style={{
    position: 'absolute',
    inset: 0,
    //background: 'rgba(0, 60, 110, 0.55)',
    background: `
  linear-gradient(
    to bottom,
    rgb(222 227 231 / 15%) 0%,
    rgb(81 84 86 / 35%) 40%,
    rgb(54 60 65 / 60%) 70%,
    rgb(9 87 153 / 85%) 100%
  )
`,
    
  }} />

  {/* Text sits above the overlay */}
  <div style={{ position: 'relative', zIndex: 1 }}>
    <AnimatedSection>
      <h1 style={{
        color: '#fff',
        fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
        fontWeight: 800,
        marginBottom: '1.5rem',
        lineHeight: 1.1,
      }}>
        About MCM Dental
      </h1>
      <p style={{
        color: 'rgba(255,255,255,0.9)',
        fontSize: '1.2rem',
        maxWidth: '600px',
        margin: '0 auto',
      }}>
        At MCM Dental, we believe that visiting a dentist should
        feel calm, personal, and stress-free.
      </p>
    </AnimatedSection>
  </div>
</section>

      {/* 2. Care Beyond Treatment */}
      <section style={{
        padding: '6rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '4rem',
        alignItems: 'center',
      }}>
        <AnimatedSection>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            color: '#0077b6',
            lineHeight: 1.2,
            marginBottom: '1.5rem',
          }}>
            Care beyond<br />every treatment
          </h2>
          <p style={{ color: '#555', fontSize: '1rem', lineHeight: 1.8, marginBottom: '1rem' }}>
            We see every smile as a story and every patient as a person,
            not a procedure. Our approach is built on trust, comfort, and
            transparent communication.
          </p>
          <p style={{ color: '#555', fontSize: '1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
            From the first consultation to follow-up visits, our goal is to
            make your experience as comfortable as possible.
          </p>
          <Link to="/services" style={{
            display: 'inline-block',
            padding: '0.85rem 2rem',
            background: '#0077b6',
            color: '#fff',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '1rem',
          }}>
            Our Services
          </Link>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <img
            src="/images/clinic-waiting.jpeg"
            alt="MCM Dental clinic waiting area"
            onError={(e) => {
              e.target.style.background = 'linear-gradient(135deg, #e0f0ff, #b3d9f7)';
              e.target.style.height = '400px';
              e.target.style.borderRadius = '16px';
              e.target.src = '';
            }}
            style={{
              width: '100%',
              height: '420px',
              objectFit: 'cover',
              borderRadius: '16px',
              boxShadow: '0 20px 60px rgba(0,119,182,0.15)',
            }}
          />
        </AnimatedSection>
      </section>

      {/* 3. Stats Bar */}
      <AnimatedSection>
        <section style={{
          background: '#e0f4ff',
          padding: '3rem 2rem',
        }}>
          <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem',
            textAlign: 'center',
          }}>
            {[
              { number: '5,000+', label: 'Happy Patients' },
              { number: 'Since 2002', label: 'Trusted Experience' },
              { number: '100%', label: 'Certified Professionals' },
            ].map((stat) => (
              <div key={stat.label}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: 800,
                  color: '#0077b6',
                  marginBottom: '0.5rem',
                }}>
                  {stat.number}
                </div>
                <div style={{ color: '#555', fontSize: '0.95rem' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* 4. Modern Dentistry Section */}
      <section style={{
        padding: '6rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '4rem',
        alignItems: 'center',
      }}>
        <AnimatedSection delay={0.1}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <img
              src="/images/dentist-working.jpeg"
              alt="Dentist at work"
              onError={(e) => {
                e.target.style.background = '#cce8f7';
                e.target.style.height = '250px';
                e.target.style.borderRadius = '12px';
                e.target.src = '';
              }}
              style={{
                width: '100%',
                height: '260px',
                objectFit: 'cover',
                borderRadius: '12px',
                boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
              }}
            />
            <img
              src="/images/teeth-closeup.jpg"
              alt="Healthy teeth"
              onError={(e) => {
                e.target.style.background = '#b3d9f7';
                e.target.style.height = '200px';
                e.target.style.borderRadius = '12px';
                e.target.src = '';
              }}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '12px',
                boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
              }}
            />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            fontWeight: 800,
            color: '#0077b6',
            lineHeight: 1.2,
            marginBottom: '1.5rem',
          }}>
            Modern dentistry,<br />timeless care
          </h2>
          <p style={{ color: '#555', lineHeight: 1.8, marginBottom: '1.5rem' }}>
            With over 20 years of combined experience, our team provides a full
            range of dental treatments — from preventive check-ups to advanced
            implantology. We combine digital precision with pain-free comfort.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {['5,000+ happy patients', 'Certified professionals', 'Digital X-rays & 3D scans'].map((item) => (
              <div key={item} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                color: '#333',
                fontSize: '1rem',
              }}>
                <span style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: '#0077b6',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  flexShrink: 0,
                }}>✓</span>
                {item}
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* 5. Meet The Team */}
      <section style={{
        padding: '6rem 2rem',
        background: '#e0f4ff',
        textAlign: 'center',
      }}>
        <AnimatedSection>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            color: '#023e8a',
            marginBottom: '0.5rem',
          }}>
            Meet The Team
          </h2>
          <p style={{ color: '#0077b6', fontSize: '1.1rem', marginBottom: '3rem' }}>
            Behind Every Smile
          </p>
        </AnimatedSection>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          maxWidth: '1100px',
          margin: '0 auto',
        }}>
          {[
            { name: 'On call', role: 'Orthodontist', img: '/images/doctor2.jpg' },
            { name: 'Dr. Mukul Kumar', role: 'Lead Dentist & Founder', img: '/images/doctor1.jpeg' },
            { name: 'On call', role: 'Oral Surgeon', img: '/images/doctor3.jpg' },
          ].map((doc, i) => (
            <AnimatedSection key={doc.name} delay={i * 0.15}>
              <div style={{
                borderRadius: '16px',
                overflow: 'hidden',
                background: '#fff',
                boxShadow: '0 8px 30px rgba(0,119,182,0.1)',
              }}>
                <img
                  src={doc.img}
                  alt={doc.name}
                  onError={(e) => {
                    e.target.style.background = 'linear-gradient(135deg, #0077b6, #023e8a)';
                    e.target.style.display = 'block';
                    e.target.src = '';
                  }}
                  style={{
                    width: '100%',
                    height: '300px',
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                />
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ color: '#023e8a', fontWeight: 700, marginBottom: '0.3rem' }}>
                    {doc.name}
                  </h3>
                  <p style={{ color: '#0077b6', fontSize: '0.9rem' }}>{doc.role}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* 6. Book CTA Banner */}
      <AnimatedSection>
        <section style={{
          position: 'relative',
          padding: '6rem 2rem',
          background: 'linear-gradient(135deg, #023e8a 0%, #0077b6 100%)',
          textAlign: 'center',
          overflow: 'hidden',
        }}>
          <h2 style={{
            color: '#fff',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            marginBottom: '1rem',
          }}>
            Ready for your next visit?
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.85)',
            fontSize: '1.1rem',
            marginBottom: '2.5rem',
            maxWidth: '500px',
            margin: '0 auto 2.5rem',
          }}>
            Book your appointment online — it's quick, easy, and takes less than a minute.
          </p>
          <Link to="/book" style={{
            display: 'inline-block',
            padding: '1rem 2.5rem',
            background: '#fff',
            color: '#0077b6',
            borderRadius: '50px',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: '1rem',
          }}>
            Book Appointment
          </Link>
        </section>
      </AnimatedSection>

      {/* Visit Us / Contact / Map */}
<AnimatedSection>
  <section style={{
    padding: '5rem 2rem',
    background: '#f0f9ff',
    textAlign: 'center',
  }}>
    <h2 style={{
      fontSize: '2rem',
      fontWeight: 800,
      color: '#023e8a',
      marginBottom: '0.5rem',
    }}>
      Visit us in person
    </h2>

    <div style={{
      display: 'flex',
      justifyContent: 'center',
      gap: '4rem',
      flexWrap: 'wrap',
      margin: '2rem auto',
      maxWidth: '800px',
    }}>
      {/* Address */}
      <div>
        <p style={{ fontWeight: 700, color: '#023e8a', marginBottom: '0.3rem' }}>Address</p>
        <p style={{ color: '#555' }}>Shimla, Himachal Pradesh, India</p>
      </div>
      {/* Phone */}
      <div>
        <p style={{ fontWeight: 700, color: '#023e8a', marginBottom: '0.3rem' }}>Phone</p>
        <a href="tel:+919876543210" style={{ color: '#0077b6', textDecoration: 'none' }}>
          +91 98765 43210
        </a>
      </div>
      {/* Email */}
      <div>
        <p style={{ fontWeight: 700, color: '#023e8a', marginBottom: '0.3rem' }}>Email</p>
        <a href="mailto:mcmdental@gmail.com" style={{ color: '#0077b6', textDecoration: 'none' }}>
          mcmdental@gmail.com
        </a>
      </div>
      {/* Hours */}
      <div>
        <p style={{ fontWeight: 700, color: '#023e8a', marginBottom: '0.3rem' }}>Hours</p>
        <p style={{ color: '#555' }}>Mon–Sat: 9:00 AM – 7:00 PM</p>
        <p style={{ color: '#555' }}>Sunday: Closed</p>
      </div>
    </div>

    {/* Google Map — your actual clinic */}
    <div style={{
      borderRadius: '16px',
      overflow: 'hidden',
      maxWidth: '900px',
      margin: '0 auto',
      boxShadow: '0 8px 30px rgba(0,119,182,0.15)',
    }}>
      <iframe
        title="MCM Dental Location"
        src="https://maps.google.com/maps?q=31.0779787,77.1830037&z=17&output=embed"
        width="100%"
        height="420"
        style={{ border: 0, display: 'block' }}
        allowFullScreen=""
        loading="lazy"
      />
    </div>
  </section>
</AnimatedSection>

    </div>
  );
}