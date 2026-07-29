import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiFetch } from '../lib/api';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  const getStrength = (value) => {
    if (value.length >= 12 && /[A-Z]/.test(value) && /[0-9]/.test(value) && /[^A-Za-z0-9]/.test(value)) return 'Strong';
    if (value.length >= 8) return 'Fair';
    return 'Weak';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      const res = await apiFetch('/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSent(true);
        setMessage(data.message || 'Password updated successfully. You can now sign in with your new password.');
        setTimeout(() => navigate('/login'), 1800);
      } else {
        setError(data.message || 'Unable to reset password.');
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
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', color: '#00d2ff', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '999px', background: '#4ade80', display: 'inline-block' }} />
          HEXA TRADING
        </div>
        <h2 style={{ color: '#fff', marginBottom: '0.4rem', fontSize: '1.9rem' }}>Reset Password</h2>
        <p style={{ color: '#94a3b8', marginBottom: '1.25rem', lineHeight: 1.6 }}>Enter your email and choose a new password for your account.</p>

        {error && <p style={{ color: '#f87171', marginBottom: '1rem' }}>{error}</p>}
        {message && (
          <div style={{ padding: '0.8rem 0.9rem', borderRadius: '10px', background: 'rgba(74, 222, 128, 0.12)', border: '1px solid rgba(74, 222, 128, 0.25)', color: '#4ade80', marginBottom: '1rem' }}>
            <div style={{ fontWeight: '700', marginBottom: '0.2rem' }}>{sent ? 'Recovery complete' : 'Password reset request received'}</div>
            <div style={{ fontSize: '0.9rem' }}>{message}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
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
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>New Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setPasswordStrength(getStrength(e.target.value));
                }}
                required
                style={{ width: '100%', padding: '0.8rem 2.8rem 0.8rem 0.8rem', borderRadius: '10px', border: '1px solid #334155', backgroundColor: '#111827', color: '#fff', boxSizing: 'border-box' }}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '0.6rem', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {newPassword && (
              <div style={{ marginTop: '0.35rem', fontSize: '0.8rem', color: passwordStrength === 'Strong' ? '#4ade80' : passwordStrength === 'Fair' ? '#f59e0b' : '#f87171' }}>
                Strength: {passwordStrength}
              </div>
            )}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>Confirm Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                style={{ width: '100%', padding: '0.8rem 2.8rem 0.8rem 0.8rem', borderRadius: '10px', border: '1px solid #334155', backgroundColor: '#111827', color: '#fff', boxSizing: 'border-box' }}
              />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ position: 'absolute', right: '0.6rem', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                {showConfirmPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} style={{ padding: '0.9rem', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #00d2ff, #4ade80)', color: '#04111d', fontWeight: '700', cursor: 'pointer' }}>
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>

        <p style={{ marginTop: '1rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.92rem' }}>
          Remembered your password? <Link to="/login" style={{ color: '#00d2ff' }}>Back to login</Link>
        </p>
      </div>
    </div>
  );
}
