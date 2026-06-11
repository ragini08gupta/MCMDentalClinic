import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const location = useLocation();
  const [hovered, setHovered] = useState(null);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Our Services', path: '/services' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      height: '70px',
      background: 'none',
      backgroundColor: 'transparent',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',   // ← pushes everything to the right
      padding: '0 2.5rem',
    }}>

      {/* Nav Links — right side only */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
      }}>
        {navLinks.map((link) => (
  <Link
    key={link.name}
    to={link.path}
    onMouseEnter={() => setHovered(link.name)}
    onMouseLeave={() => setHovered(null)}
    style={{
      textDecoration: 'none',
      color: 'rgba(255,255,255,0.85)',
      fontWeight: 500,
      fontSize: '0.95rem',
      borderBottom: hovered === link.name
        ? '2px solid #1a3a5c'
        : '2px solid transparent',
      paddingBottom: '2px',
      textShadow: '0 1px 6px rgba(0,0,0,0.5)',
      transition: 'border-color 0.2s',
    }}
  >
    {link.name}
  </Link>
))}

        <Link
          to="/book"
          onMouseEnter={() => setHovered('book')}
          onMouseLeave={() => setHovered(null)}
          style={{
            textDecoration: 'none',
            background: hovered === 'book'
  ? 'rgba(255,255,255,0.15)'
  : 'transparent',
            color: '#ffffff',
            padding: '0.55rem 1.4rem',
            borderRadius: '50px',
            fontWeight: 700,
            fontSize: '0.9rem',
            border: '1.5px solid rgba(255,255,255,0.6)',
            whiteSpace: 'nowrap',
            textShadow: '0 1px 3px rgba(0,0,0,0.3)',
            transition: 'all 0.2s',
          }}
        >
          Book Appointment
        </Link>
      </div>

    </nav>
  );
}