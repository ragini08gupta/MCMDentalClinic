import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [hovered, setHovered] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 860 : false
  );
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 860);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

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

  const linkStyle = (name, mobile) => ({
    textDecoration: 'none',
    color: mobile ? '#1a1a2e' : (hovered === name ? '#000000' : 'rgba(0,0,0,0.65)'),
    fontWeight: 500,
    fontSize: mobile ? '1.05rem' : '0.95rem',
    textShadow: 'none',
    opacity: mobile ? 1 : (hovered === name ? 1 : 0.85),
    transform: !mobile && hovered === name ? 'translateY(-1px)' : 'translateY(0)',
    transition: 'color 0.2s, opacity 0.2s, transform 0.2s',
    display: mobile ? 'block' : 'inline-block',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    width: mobile ? '100%' : 'auto',
    textAlign: mobile ? 'left' : 'inherit',
    padding: mobile ? '0.9rem 0' : 0,
    borderBottom: mobile ? '1px solid rgba(0,0,0,0.08)' : 'none',
  });

  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
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
      background: isMobile && menuOpen ? '#ffffff' : 'transparent',
      boxShadow: isMobile && menuOpen ? '0 2px 10px rgba(0,0,0,0.08)' : 'none',
      display: 'flex',
      alignItems: 'center',
      padding: '0 1.25rem 0 1.5rem',
      justifyContent: 'space-between',
    }}>
      {isMobile && (
        <span style={{
          fontWeight: 700,
          fontSize: '1.1rem',
          color: menuOpen ? '#1a1a2e' : '#040000',
          letterSpacing: '0.02em',
        }}>
          MCM Dental
        </span>
      )}

      {isMobile ? (
        <button
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            width: '40px',
            height: '40px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px',
            zIndex: 1001,
          }}
        >
          <span style={{
            display: 'block', width: '24px', height: '2px',
            background: menuOpen ? '#1a1a2e' : '#000000',
            transition: 'transform 0.25s ease',
            transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none',
          }} />
          <span style={{
            display: 'block', width: '24px', height: '2px',
            background: menuOpen ? '#1a1a2e' : '#060000',
            opacity: menuOpen ? 0 : 1,
            transition: 'opacity 0.2s ease',
          }} />
          <span style={{
            display: 'block', width: '24px', height: '2px',
            background: menuOpen ? '#1a1a2e' : 'rgb(0, 0, 0)',
            transition: 'transform 0.25s ease',
            transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
          }} />
        </button>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginLeft: 'auto' }}>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onMouseEnter={() => setHovered(link.name)}
              onMouseLeave={() => setHovered(null)}
              style={linkStyle(link.name, false)}
            >
              {link.name}
            </Link>
          ))}

          {user ? (
            <button
              onMouseEnter={() => setHovered('Log Out')}
              onMouseLeave={() => setHovered(null)}
              onClick={handleLogout}
              style={linkStyle('Log Out', false)}
            >
              Log Out
            </button>
          ) : (
            <Link
              to="/login"
              onMouseEnter={() => setHovered('Sign In')}
              onMouseLeave={() => setHovered(null)}
              style={linkStyle('Sign In', false)}
            >
              Sign In
            </Link>
          )}
        </div>
      )}

      {isMobile && menuOpen && (
        <div style={{
          position: 'fixed',
          top: '70px',
          left: 0,
          right: 0,
          background: '#fff',
          boxShadow: '0 8px 16px rgba(0,0,0,0.08)',
          padding: '0.5rem 1.5rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: 'calc(100vh - 70px)',
          overflowY: 'auto',
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              style={linkStyle(link.name, true)}
            >
              {link.name}
            </Link>
          ))}

          {user ? (
            <button onClick={handleLogout} style={linkStyle('Log Out', true)}>
              Log Out
            </button>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)} style={linkStyle('Sign In', true)}>
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
