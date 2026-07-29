import { Link } from 'react-router-dom';
import './PageStyles.css';

export default function Portfolio({ user }) {
  const positions = [
    { symbol: 'EUR/USD', side: 'Long', size: '1.25 lots', entry: '1.0820', pnl: '+$240.00' },
    { symbol: 'Gold', side: 'Long', size: '0.50 lots', entry: '$1,935', pnl: '+$85.00' },
    { symbol: 'NASDAQ', side: 'Short', size: '2 contracts', entry: '17,840', pnl: '-$120.00' }
  ];

  return (
    <div className="page-shell">
      <div className="page-container">
        <div className="page-header-card">
          <div className="page-header">
            <div className="page-header-title">
              <div className="page-subtitle">Portfolio</div>
              <h2 className="page-heading">Open Positions</h2>
              <p className="page-description">Review your current allocations and performance for {user?.username || 'your account'}.</p>
            </div>
            <div className="page-header-actions">
              <Link to="/dashboard" className="page-cta-link">Go to Dashboard</Link>
            </div>
          </div>
        </div>

        <div className="stat-grid">
          <div className="mini-card">
            <div className="mini-card-label">Total Equity</div>
            <div className="mini-card-value">$11,240.00</div>
          </div>
          <div className="mini-card">
            <div className="mini-card-label">Daily P/L</div>
            <div className="mini-card-value" style={{ color: '#4ade80' }}>$325.00</div>
          </div>
        </div>

        <div className="data-card">
          <table className="data-table">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Side</th>
                <th>Size</th>
                <th>Entry</th>
                <th>P/L</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((position) => (
                <tr key={position.symbol}>
                  <td style={{ fontWeight: 700 }}>{position.symbol}</td>
                  <td>{position.side}</td>
                  <td>{position.size}</td>
                  <td>{position.entry}</td>
                  <td style={{ color: position.pnl.startsWith('+') ? '#4ade80' : '#f87171', fontWeight: 700 }}>{position.pnl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
