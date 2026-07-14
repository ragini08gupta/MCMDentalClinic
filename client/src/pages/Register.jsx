import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await register(form.name, form.email, form.password);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.response?.data?.error || 'Could not create account');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f9ff', padding: '2rem' }}>
      <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '2.5rem', borderRadius: '16px', border: '1px solid #d0eaf8', width: '100%', maxWidth: '380px', boxShadow: '0 4px 24px rgba(0,119,182,0.08)' }}>
        <h2 style={{ color: '#0077b6', fontWeight: 800, marginBottom: '0.3rem' }}>Create Account</h2>
        <p style={{ color: '#888', fontSize: '0.88rem', marginBottom: '1.5rem' }}>Track your appointments and cancel anytime.</p>

        {error && (
          <p style={{ background: '#fdecec', color: '#c0392b', padding: '0.7rem 1rem', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '1rem' }}>
            {error}
          </p>
        )}

        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#0077b6', marginBottom: '0.4rem' }}>Full Name</label>
        <input name="name" required value={form.name} onChange={handleChange}
          style={{ width: '100%', padding: '0.8rem 1rem', border: '1.5px solid #d0eaf8', borderRadius: '8px', marginBottom: '1.1rem', fontSize: '0.95rem' }} />

        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#0077b6', marginBottom: '0.4rem' }}>Email</label>
        <input name="email" type="email" required value={form.email} onChange={handleChange}
          style={{ width: '100%', padding: '0.8rem 1rem', border: '1.5px solid #d0eaf8', borderRadius: '8px', marginBottom: '1.1rem', fontSize: '0.95rem' }} />

        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#0077b6', marginBottom: '0.4rem' }}>Password</label>
        <input name="password" type="password" required minLength={8} value={form.password} onChange={handleChange}
          style={{ width: '100%', padding: '0.8rem 1rem', border: '1.5px solid #d0eaf8', borderRadius: '8px', marginBottom: '0.4rem', fontSize: '0.95rem' }} />
        <p style={{ fontSize: '0.75rem', color: '#aaa', marginBottom: '1.5rem' }}>At least 8 characters.</p>

        <button type="submit" disabled={submitting} style={{ width: '100%', background: '#0077b6', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.9rem', fontWeight: 700, fontSize: '0.95rem', cursor: submitting ? 'default' : 'pointer', opacity: submitting ? 0.7 : 1 }}>
          {submitting ? 'Creating account...' : 'Create Account'}
        </button>

        <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#888', marginTop: '1.2rem' }}>
          Already have an account? <Link to="/login" style={{ color: '#0077b6', fontWeight: 700 }}>Sign in</Link>
        </p>
      </form>
    </div>
  );
}
