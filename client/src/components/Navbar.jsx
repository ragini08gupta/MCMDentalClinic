import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const [hovered, setHovered] = useState(null);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Our Services', path: '/services' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Book Appointment', path: '/book' },
  ];

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      height: '70px',
      background: 'transparent',
      display: 'flex',
      alignItems: 'center',
      padding: '0 2.5rem',
      justifyContent: 'flex-end',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            onMouseEnter={() => setHovered(link.name)}
            onMouseLeave={() => setHovered(null)}
            style={{
              textDecoration: 'none',
              color: hovered === link.name ? '#000000' : 'rgba(0,0,0,0.65)',
              fontWeight: 500,
              fontSize: '0.95rem',
              textShadow: 'none',
              opacity: hovered === link.name ? 1 : 0.85,
              transform: hovered === link.name ? 'translateY(-1px)' : 'translateY(0)',
              transition: 'color 0.2s, opacity 0.2s, transform 0.2s',
              display: 'inline-block',
            }}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}