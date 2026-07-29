import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../index.css';
import { apiFetch } from '../lib/api';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await apiFetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        onLogin?.(data.user, rememberMe);
        navigate('/dashboard');
      } else {
        setError(data.message || 'Login failed.');
      }
    } catch (err) {
      setError('Unable to reach the backend server.');
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
          <h2 style={{ color: '#fff', margin: '0 0 0.35rem', fontSize: '1.9rem' }}>Welcome Back</h2>
          <p style={{ color: '#94a3b8', margin: 0, lineHeight: 1.6 }}>Sign in to access your trading account and manage your positions.</p>
        </div>

        {error && <div style={{ padding: '0.8rem 0.9rem', borderRadius: '10px', background: 'rgba(248, 113, 113, 0.12)', border: '1px solid rgba(248, 113, 113, 0.25)', color: '#f87171', marginBottom: '1rem' }}>{error}</div>}

        <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => {
              setEmail('john@example.com');
              setPassword('password123');
              setError('');
            }}
            style={{ flex: 1, minWidth: '140px', padding: '0.7rem 0.8rem', borderRadius: '10px', border: '1px solid rgba(74, 222, 128, 0.25)', background: 'rgba(74, 222, 128, 0.12)', color: '#4ade80', fontWeight: '700', cursor: 'pointer' }}
          >
            Use Demo Account
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
          <div>
            <label htmlFor="email" style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="name@gmail.com"
              autoComplete="off"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '0.8rem 0.9rem', borderRadius: '10px', border: '1px solid #334155', backgroundColor: '#111827', color: '#fff', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label htmlFor="password" style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="********"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '0.8rem 3rem 0.8rem 0.9rem', borderRadius: '10px', border: '1px solid #334155', backgroundColor: '#111827', color: '#fff', boxSizing: 'border-box' }}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '0.6rem', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#cbd5e1', fontSize: '0.9rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                style={{ accentColor: '#00d2ff' }}
              />
              Remember me
            </label>
            <Link to="/forgot-password" style={{ color: '#00d2ff', fontSize: '0.9rem', textDecoration: 'none' }}>Forgot Password?</Link>
          </div>

          <button type="submit" disabled={loading} style={{ padding: '0.9rem', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #00d2ff, #4ade80)', color: '#04111d', fontWeight: '700', cursor: 'pointer' }}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div style={{ marginTop: '1rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.92rem' }}>
          Don't have an account? <Link to="/register" style={{ color: '#00d2ff' }}>Register here</Link>
        </div>
      </div>
    </div>
  );
}