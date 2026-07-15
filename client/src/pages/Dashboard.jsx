import { useEffect, useState } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';

const STATUS_COLORS = {
  confirmed: { bg: '#eaf6fd', color: '#0077b6' },
  completed: { bg: '#e9f9ee', color: '#1e8e3e' },
  cancelled: { bg: '#fdecec', color: '#c0392b' },
};

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadAppointments = async () => {
    try {
      const { data } = await api.get('/api/appointments');
      setAppointments(data);
    } catch {
      setError('Could not load appointments');
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async () => {
    if (user.role !== 'admin') return;
    try {
      const { data } = await api.get('/api/users');
      setUsers(data);
    } catch {
      // Non-critical for this view; silently skip if it fails.
    }
  };

  useEffect(() => {
  if (!user) return;
  loadAppointments();
  loadUsers();
}, [user]); // eslint-disable-line

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/api/appointments/${id}/status`, { status });
      loadAppointments();
    } catch {
      setError('Could not update that appointment');
    }
  };

  const updateRole = async (id, role) => {
    try {
      await api.patch(`/api/users/${id}/role`, { role });
      loadUsers();
    } catch {
      setError('Could not update that user');
    }
  };

  const cardStyle = { background: '#fff', border: '1px solid #d0eaf8', borderRadius: '12px', padding: '1.2rem 1.5rem', marginBottom: '0.8rem' };

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", minHeight: '100vh', background: '#f0f9ff', padding: '6rem 2rem 4rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ color: '#0077b6', fontWeight: 800 }}>Clinic Dashboard</h1>
            <p style={{ color: '#888', fontSize: '0.9rem' }}>Signed in as {user.name} ({user.role})</p>
          </div>
          <button onClick={logout} style={{ background: '#fff', border: '1.5px solid #d0eaf8', color: '#0077b6', borderRadius: '8px', padding: '0.6rem 1.2rem', fontWeight: 700, cursor: 'pointer' }}>
            Log Out
          </button>
        </div>

        {error && <p style={{ background: '#fdecec', color: '#c0392b', padding: '0.7rem 1rem', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '1rem' }}>{error}</p>}

        <h2 style={{ color: '#0077b6', fontSize: '1.2rem', marginBottom: '1rem' }}>Appointments</h2>
        {loading ? (
          <p style={{ color: '#888' }}>Loading...</p>
        ) : appointments.length === 0 ? (
          <p style={{ color: '#888' }}>No appointments yet.</p>
        ) : (
          appointments.map((a) => (
            <div key={a._id} style={cardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <p style={{ fontWeight: 700, color: '#1a1a2e' }}>{a.patientName} — {a.service}</p>
                  <p style={{ color: '#666', fontSize: '0.85rem' }}>{new Date(a.date).toLocaleString()} · {a.email} · {a.phone}</p>
                  {a.notes && <p style={{ color: '#888', fontSize: '0.82rem', marginTop: '0.3rem' }}>Notes: {a.notes}</p>}
                </div>
                <span style={{ background: STATUS_COLORS[a.status].bg, color: STATUS_COLORS[a.status].color, padding: '0.3rem 0.8rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'capitalize' }}>
                  {a.status}
                </span>
              </div>
              {a.status === 'confirmed' && (
                <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.9rem' }}>
                  <button onClick={() => updateStatus(a._id, 'completed')} style={{ background: '#0077b6', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.5rem 1rem', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}>
                    Mark Completed
                  </button>
                  <button onClick={() => updateStatus(a._id, 'cancelled')} style={{ background: '#fff', color: '#c0392b', border: '1.5px solid #f5c6c6', borderRadius: '6px', padding: '0.5rem 1rem', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}>
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))
        )}

        {user.role === 'admin' && (
          <>
            <h2 style={{ color: '#0077b6', fontSize: '1.2rem', margin: '2rem 0 1rem' }}>Users</h2>
            {users.map((u) => (
              <div key={u._id} style={{ ...cardStyle, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontWeight: 700, color: '#1a1a2e' }}>{u.name}</p>
                  <p style={{ color: '#666', fontSize: '0.85rem' }}>{u.email}</p>
                </div>
                <select value={u.role} onChange={(e) => updateRole(u._id, e.target.value)}
                  style={{ padding: '0.5rem 0.8rem', borderRadius: '6px', border: '1.5px solid #d0eaf8', fontSize: '0.85rem' }}>
                  <option value="patient">Patient</option>
                  <option value="staff">Staff</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
