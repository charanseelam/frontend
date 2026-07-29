import React, { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 🔹 DIRECT RENDER BACKEND URL (Prevents 404 Vercel redirect errors)
  const BACKEND_URL = 'https://trading-g4tl.onrender.com';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/login`, {
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

      console.log('Login successful:', data);
      
      // Save token/user data if returned by your backend
      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      alert('Logged in successfully!');
      // Navigate to dashboard/home page here (e.g., navigate('/dashboard'))

    } catch (err) {
      console.error('Login error:', err);
      // Handles network failure or server sleep cold starts
      if (err.message.includes('Failed to fetch')) {
        setError('Unable to reach the backend server. Render may be waking up, please try again in 30 seconds.');
      } else {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <span className="subtitle">• HEXA TRADING</span>
        <h2>Welcome Back</h2>
        <p className="description">
          Sign in to access your trading account and manage your positions.
        </p>

        {error && <div className="error-box">{error}</div>}

        <button type="button" className="demo-btn">
          Use Demo Account
        </button>

        <form onSubmit={handleSubmit}>
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
            <a href="#forgot" className="forgot-link">Forgot Password?</a>
          </div>

          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className="footer-text">
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
}