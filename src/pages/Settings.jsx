import { Link } from 'react-router-dom';
import { useState } from 'react';
import './PageStyles.css';

export default function Settings({ user }) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [riskAlerts, setRiskAlerts] = useState(true);

  return (
    <div className="page-shell">
      <div className="page-container">
        <div className="page-header-card">
          <div className="page-header">
            <div className="page-header-title">
              <div className="page-subtitle">Settings</div>
              <h2 className="page-heading">Account Preferences</h2>
              <p className="page-description">Tune your trading workspace and notifications for {user?.username || 'your account'}.</p>
            </div>
            <div className="page-header-actions">
              <Link to="/profile" className="page-cta-link">Back to Profile</Link>
            </div>
          </div>
        </div>

        <div className="settings-grid">
          <div className="settings-card">
            <h3>Workspace</h3>
            <div className="settings-toggle-list">
              {[
                { label: 'Enable notifications', value: notifications, onChange: () => setNotifications(!notifications) },
                { label: 'Dark mode', value: darkMode, onChange: () => setDarkMode(!darkMode) },
                { label: 'Risk alerts', value: riskAlerts, onChange: () => setRiskAlerts(!riskAlerts) }
              ].map((item) => (
                <label key={item.label} className="settings-toggle">
                  <span>{item.label}</span>
                  <input type="checkbox" checked={item.value} onChange={item.onChange} />
                </label>
              ))}
            </div>
          </div>

          <div className="settings-card">
            <h3>Security</h3>
            <p className="settings-description">Protect your account with a strong password and active session monitoring.</p>
            <Link to="/update-password" className="button-primary" style={{ display: 'inline-flex', justifyContent: 'center', textDecoration: 'none' }}>
              Update Password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
