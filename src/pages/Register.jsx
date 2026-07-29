import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { apiFetch } from '../lib/api';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ label: 'Enter Password', color: '#94a3b8', score: 0, hint: 'Use 8+ characters with a mix of letters, numbers, and symbols.' });
  const navigate = useNavigate();

  const getPasswordStrength = (value) => {
    if (!value) {
      return { label: 'Enter Password', color: '#94a3b8', score: 0, hint: 'Use 8+ characters with a mix of letters, numbers, and symbols.' };
    }

    const checks = [
      value.length >= 8,
      /[A-Z]/.test(value),
      /[a-z]/.test(value),
      /[0-9]/.test(value),
      /[^A-Za-z0-9]/.test(value)
    ];

    const score = checks.filter(Boolean).length;

    if (score <= 2) {
      return { label: 'Weak', color: '#f87171', score: 25, hint: 'Add more length and variety to strengthen it.' };
    }

    if (score <= 4) {
      return { label: 'Fair', color: '#f59e0b', score: 65, hint: 'A stronger mix of letters and symbols would help.' };
    }

    return { label: 'Strong', color: '#4ade80', score: 100, hint: 'Great password strength for your account.' };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await apiFetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccess('Registration successful! Redirecting to login...');
        // Wait 1.5 seconds so the user sees the success message, then redirect to /login
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Cannot connect to backend server. Make sure node server.js is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem', background: 'linear-gradient(135deg, #020617 0%, #0f172a 100%)' }}>
      <div style={{ width: '100%', maxWidth: '460px', background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '22px', padding: '2rem', boxShadow: '0 20px 45px rgba(2, 6, 23, 0.35)' }}>
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', color: '#00d2ff', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '999px', background: '#4ade80', display: 'inline-block' }} />
            HEXA TRADING
          </div>
          <h2 style={{ color: '#fff', margin: '0 0 0.35rem', fontSize: '1.9rem' }}>Create an Account</h2>
          <p style={{ color: '#94a3b8', margin: 0, lineHeight: 1.6 }}>Open a new account and start trading in minutes.</p>
        </div>

        {error && <div style={{ padding: '0.8rem 0.9rem', borderRadius: '10px', background: 'rgba(248, 113, 113, 0.12)', border: '1px solid rgba(248, 113, 113, 0.25)', color: '#f87171', marginBottom: '1rem' }}>{error}</div>}
        {success && <div style={{ padding: '0.8rem 0.9rem', borderRadius: '10px', background: 'rgba(74, 222, 128, 0.12)', border: '1px solid rgba(74, 222, 128, 0.25)', color: '#4ade80', marginBottom: '1rem' }}>{success}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: '1px solid #334155', backgroundColor: '#111827', color: '#fff', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: '1px solid #334155', backgroundColor: '#111827', color: '#fff', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordStrength(getPasswordStrength(e.target.value));
                }}
                required
                style={{ width: '100%', padding: '0.8rem 3rem 0.8rem 0.9rem', borderRadius: '10px', border: '1px solid #334155', backgroundColor: '#111827', color: '#fff', boxSizing: 'border-box' }}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '0.6rem', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <div style={{ marginTop: '0.45rem' }}>
              <div style={{ height: '6px', borderRadius: '999px', background: '#1e293b', overflow: 'hidden' }}>
                <div style={{ width: `${passwordStrength.score}%`, height: '100%', background: passwordStrength.color, transition: 'width 0.2s ease' }} />
              </div>
              <div style={{ marginTop: '0.35rem', fontSize: '0.8rem', color: passwordStrength.color, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                <span style={{ fontWeight: '700' }}>Strength: {passwordStrength.label}</span>
                <span style={{ color: '#94a3b8' }}>{passwordStrength.hint}</span>
              </div>
            </div>
          </div>

          <button type="submit" disabled={loading} style={{ padding: '0.9rem', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #00d2ff, #4ade80)', color: '#04111d', fontWeight: '700', cursor: 'pointer' }}>
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <p style={{ fontSize: '0.92rem', color: '#94a3b8', marginTop: '1rem', textAlign: 'center' }}>
          Already have an account? <Link to="/login" style={{ color: '#00d2ff' }}>Log in here</Link>
        </p>
      </div>
    </div>
  );
}