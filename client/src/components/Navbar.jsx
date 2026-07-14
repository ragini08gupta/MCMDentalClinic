import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [hovered, setHovered] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Our Services', path: '/services' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Book Appointment', path: '/book' },
  ];

  if (user && (user.role === 'staff' || user.role === 'admin')) {
    navLinks.push({ name: 'Dashboard', path: '/dashboard' });
  }

  const linkStyle = (name) => ({
    textDecoration: 'none',
    color: hovered === name ? '#000000' : 'rgba(0,0,0,0.65)',
    fontWeight: 500,
    fontSize: '0.95rem',
    textShadow: 'none',
    opacity: hovered === name ? 1 : 0.85,
    transform: hovered === name ? 'translateY(-1px)' : 'translateY(0)',
    transition: 'color 0.2s, opacity 0.2s, transform 0.2s',
    display: 'inline-block',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
  });

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

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
            style={linkStyle(link.name)}
          >
            {link.name}
          </Link>
        ))}

        {user ? (
          <button
            onMouseEnter={() => setHovered('Log Out')}
            onMouseLeave={() => setHovered(null)}
            onClick={handleLogout}
            style={linkStyle('Log Out')}
          >
            Log Out
          </button>
        ) : (
          <Link
            to="/login"
            onMouseEnter={() => setHovered('Sign In')}
            onMouseLeave={() => setHovered(null)}
            style={linkStyle('Sign In')}
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
