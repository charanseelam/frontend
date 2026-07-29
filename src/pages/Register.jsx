import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiFetch } from '../lib/api';
import './Auth.css';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await apiFetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed.');
      }

      setSuccess('Registration complete. Redirecting to login...');
      setTimeout(() => navigate('/login'), 1800);
    } catch (err) {
      console.error('Registration error:', err);
      if (err.message.includes('Failed to fetch')) {
        setError('Unable to reach the backend server. Please try again in a moment.');
      } else {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-panel">
          <span className="auth-badge">HEXA TRADING</span>
          <h2>Create an account</h2>
          <p>Register to begin trading and monitoring your portfolio with confidence.</p>

          <div className="auth-panel-features">
            <div className="auth-panel-feature">
              <strong>Intuitive onboarding</strong>
              <span>Fast setup and streamlined account creation.</span>
            </div>
            <div className="auth-panel-feature">
              <strong>Transparent pricing</strong>
              <span>See your trading terms clearly before you start.</span>
            </div>
            <div className="auth-panel-feature">
              <strong>24/7 support</strong>
              <span>Professional help whenever you need it.</span>
            </div>
          </div>
        </div>

        <div className="auth-form-card">
          <div className="auth-header">
            <span>Register</span>
            <h2>Create your HEXA account</h2>
            <p>Sign up and get access to market insights, portfolio tools, and secure login.</p>
          </div>

          {error && <div className="error-box">{error}</div>}
          {success && <div className="success-box">{success}</div>}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="john_doe"
                required
              />
            </div>

            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <div className="input-group">
              <label>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? 'Creating account...' : 'Register'}
            </button>
          </form>

          <p className="footer-text">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
