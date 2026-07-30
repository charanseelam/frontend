import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiFetch } from '../lib/api';
import './Auth.css';

const demoCredentials = {
  email: 'demo@hexa.com',
  password: 'demo1234'
};

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleDemoLogin = () => {
    setEmail(demoCredentials.email);
    setPassword(demoCredentials.password);
    setError('');
    setInfo('Demo credentials filled. Click Sign In to continue.');
  };

  const handleDirectDemoLogin = () => {
    const demoUser = {
      id: 0,
      username: 'Demo Trader',
      email: demoCredentials.email,
      isDemo: true
    };

    if (onLogin) {
      onLogin(demoUser, false);
    }

    navigate('/dashboard');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setInfo('');
    setIsLoading(true);

    try {
      const response = await apiFetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed. Please check your credentials.');
      }

      if (onLogin) {
        onLogin(data.user, rememberMe);
      }

      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
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
          <h2>Welcome Back</h2>
          <p>Sign in to access your trading account and manage your positions.</p>

          <div className="auth-panel-features">
            <div className="auth-panel-feature">
              <strong>Fast access</strong>
              <span>Quick login and instant market updates.</span>
            </div>
            <div className="auth-panel-feature">
              <strong>Secure trading</strong>
              <span>Encrypted credentials and safe portfolio management.</span>
            </div>
            <div className="auth-panel-feature">
              <strong>Real-time insights</strong>
              <span>Connect to your dashboard with one click.</span>
            </div>
          </div>
        </div>

        <div className="auth-form-card">
          <div className="auth-header">
            <span>Sign In</span>
            <h2>Access your account</h2>
            <p>Enter your credentials to continue to HEXA Trading.</p>
          </div>

          {error && <div className="error-box">{error}</div>}
          {info && <div className="success-box">{info}</div>}

          <button type="button" className="demo-btn" onClick={handleDirectDemoLogin} style={{ background: '#0ea5e9', marginBottom: '1rem' }}>
            Login With Demo Account
          </button>

          <form className="auth-form" onSubmit={handleSubmit}>
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
              <div className="password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="show-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>
              <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>
            </div>

            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <p className="footer-text">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}