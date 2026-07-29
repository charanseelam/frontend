import { Link } from 'react-router-dom';
import './PageStyles.css';

export default function Markets({ user }) {
  const marketRows = [
    { symbol: 'EUR/USD', price: '1.0864', change: '+0.42%', volume: '18.2B' },
    { symbol: 'GBP/USD', price: '1.2671', change: '+0.18%', volume: '12.7B' },
    { symbol: 'USD/JPY', price: '155.24', change: '-0.09%', volume: '9.4B' },
    { symbol: 'Gold', price: '$1,935', change: '+1.12%', volume: '7.1M' }
  ];

  return (
    <div className="page-shell">
      <div className="page-container">
        <div className="page-header-card">
          <div className="page-header">
            <div className="page-header-title">
              <div className="page-subtitle">Markets</div>
              <h2 className="page-heading">Live Market Overview</h2>
              <p className="page-description">Track prices and volatility for {user?.username || 'your account'} across major instruments.</p>
            </div>
            <div className="page-header-actions">
              <Link to="/dashboard" className="page-cta-link">Open Dashboard</Link>
            </div>
          </div>
        </div>

        <div className="stat-grid">
          {[
            { label: 'US Dollar Index', value: '104.18', change: '+0.16%' },
            { label: 'Nasdaq', value: '17,840', change: '+0.74%' },
            { label: 'S&P 500', value: '5,610', change: '+0.54%' }
          ].map((item) => (
            <div key={item.label} className="mini-card">
              <div className="mini-card-label">{item.label}</div>
              <div className="mini-card-value">{item.value}</div>
              <div className="mini-card-change">{item.change}</div>
            </div>
          ))}
        </div>

        <div className="data-card">
          <table className="data-table">
            <thead>
              <tr>
                <th>Instrument</th>
                <th>Price</th>
                <th>Change</th>
                <th>Volume</th>
              </tr>
            </thead>
            <tbody>
              {marketRows.map((row) => (
                <tr key={row.symbol}>
                  <td style={{ fontWeight: 700 }}>{row.symbol}</td>
                  <td>{row.price}</td>
                  <td style={{ color: row.change.startsWith('+') ? '#4ade80' : '#f87171', fontWeight: 700 }}>{row.change}</td>
                  <td style={{ color: '#94a3b8' }}>{row.volume}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
