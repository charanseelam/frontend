import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiFetch } from '../lib/api';
import './Auth.css';

export default function UpdatePassword({ user }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const email = user?.email || '';

  useEffect(() => {
    setPasswordStrength(getStrength(newPassword));
  }, [newPassword]);

  const getStrength = (value) => {
    if (value.length >= 12 && /[A-Z]/.test(value) && /[0-9]/.test(value) && /[^A-Za-z0-9]/.test(value)) {
      return 'Strong';
    }
    if (value.length >= 8) {
      return 'Fair';
    }
    return 'Weak';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!email) {
      setError('Unable to identify your account. Please sign in again.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await apiFetch('/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Unable to update password.');
      }

      setSuccess('Password updated successfully. Redirecting to profile...');
      setTimeout(() => navigate('/profile'), 1800);
    } catch (err) {
      console.error('Update password error:', err);
      setError(err.message.includes('Failed to fetch') ? 'Unable to reach the backend server.' : err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-panel">
          <span className="auth-badge">HEXA SECURITY</span>
          <h2>Change your password</h2>
          <p>Update your password on a secure page and keep your account protected with a strong credential.</p>

          <div className="auth-panel-features">
            <div className="auth-panel-feature">
              <strong>Secure lock</strong>
              <span>Update your password with an encrypted request.</span>
            </div>
            <div className="auth-panel-feature">
              <strong>Fast recovery</strong>
              <span>Redirected back to your profile after the update.</span>
            </div>
            <div className="auth-panel-feature">
              <strong>Account safety</strong>
              <span>Reinforce your trading account with a stronger password.</span>
            </div>
          </div>
        </div>

        <div className="auth-form-card">
          <div className="auth-header">
            <span>Update Password</span>
            <h2>Change your account password</h2>
            <p>Choose a strong new password and keep your account secure for trading.</p>
          </div>

          {error && <div className="error-box">{error}</div>}
          {success && <div className="success-box">{success}</div>}

          <form className="auth-form" onSubmit={handleSubmit}>
            {email && (
              <div className="input-group">
                <label>Email Address</label>
                <input type="email" value={email} readOnly />
              </div>
            )}

            <div className="input-group password-wrapper">
              <label>New Password</label>
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="show-btn"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            {newPassword && (
              <div style={{ color: passwordStrength === 'Strong' ? '#4ade80' : passwordStrength === 'Fair' ? '#f59e0b' : '#f87171', fontSize: '0.95rem' }}>
                Strength: {passwordStrength}
              </div>
            )}

            <div className="input-group password-wrapper">
              <label>Confirm New Password</label>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="show-btn"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? 'Updating password...' : 'Save new password'}
            </button>
          </form>

          <p className="footer-text">
            Want to go back? <Link to="/profile">Return to profile</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
