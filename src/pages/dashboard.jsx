import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../lib/api';

const chartData = [20, 35, 28, 42, 38, 54, 50, 66, 78, 74, 88, 92];

export default function Dashboard({ user, onLogout }) {
  const navigate = useNavigate();
  const [rates, setRates] = useState([]);
  const [theme, setTheme] = useState('dark');
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 900 : false);
  const [tradeModal, setTradeModal] = useState({ open: false, type: 'Buy' });
  const [tradeAmount, setTradeAmount] = useState('1000');
  const [orderMessage, setOrderMessage] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [portfolio, setPortfolio] = useState([
    { symbol: 'EUR/USD', side: 'Long', size: '1.25 lots', entry: '1.0820', pnl: '+$240.00' },
    { symbol: 'Gold', side: 'Long', size: '0.50 lots', entry: '$1,935', pnl: '+$85.00' },
    { symbol: 'NASDAQ', side: 'Short', size: '2 contracts', entry: '17,840', pnl: '-$120.00' }
  ]);
  const [orders, setOrders] = useState([
    { id: 1, pair: 'EUR/USD', type: 'Buy', amount: '$1,000', status: 'Filled' },
    { id: 2, pair: 'GBP/USD', type: 'Sell', amount: '$750', status: 'Pending' }
  ]);
  const [notifications] = useState([
    { id: 1, title: 'Price Alert', text: 'EUR/USD reached your target level.' },
    { id: 2, title: 'Market Update', text: 'US CPI data is due in 30 minutes.' }
  ]);
  const [ticker] = useState([
    { symbol: 'EUR/USD', value: '1.0864', change: '+0.42%' },
    { symbol: 'GBP/USD', value: '1.2671', change: '+0.18%' },
    { symbol: 'USD/JPY', value: '155.24', change: '-0.09%' }
  ]);
  const [news] = useState([
    { id: 1, title: 'Fed comments support risk sentiment', time: '5 min ago' },
    { id: 2, title: 'Oil climbs as supply concerns intensify', time: '18 min ago' }
  ]);

  useEffect(() => {
    apiFetch('/rates')
      .then((res) => res.json())
      .then((data) => setRates(data))
      .catch((err) => console.error('Failed to load database rates:', err));
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const summaryCards = [
    { label: 'Account Balance', value: '$10,000.00', sub: 'USD', tone: '#4ade80' },
    { label: 'Open Positions', value: '6', sub: '3 active trades', tone: '#00d2ff' },
    { label: 'Risk Exposure', value: '12.4%', sub: 'Moderate', tone: '#f59e0b' }
  ];

  const watchlist = [
    { symbol: 'EUR/USD', price: '1.0860', change: '+0.42%' },
    { symbol: 'GBP/USD', price: '1.2671', change: '+0.18%' },
    { symbol: 'USD/JPY', price: '155.24', change: '-0.09%' }
  ];

  const chartPoints = chartData.map((value, index) => `${index * 20 + 10},${140 - value}`).join(' ');

  const isDark = theme === 'dark';
  const shellStyle = {
    background: isDark ? 'linear-gradient(135deg, #060816 0%, #0f172a 100%)' : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    color: isDark ? '#f8fafc' : '#0f172a',
    minHeight: '80vh',
    padding: isMobile ? '0.75rem' : '1.25rem',
    position: 'relative'
  };

  const textMuted = isDark ? '#94a3b8' : '#475569';
  const cardBackground = isDark ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.95)';
  const borderColor = isDark ? 'rgba(148, 163, 184, 0.18)' : 'rgba(15, 23, 42, 0.08)';
  const headerText = isDark ? '#fff' : '#0f172a';

  const summaryGridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '1rem',
    marginBottom: '1.2rem'
  };

  const dualColumnStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '1.4fr 0.9fr',
    gap: '1rem',
    marginBottom: '1rem'
  };

  const twoColumnCardsStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
    gap: '1rem',
    marginTop: '1rem'
  };

  return (
    <div style={shellStyle}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <aside style={{ display: isMobile ? (sidebarOpen ? 'block' : 'none') : 'block', width: isMobile ? '100%' : '230px', background: isDark ? 'rgba(2, 6, 23, 0.8)' : 'rgba(255, 255, 255, 0.9)', borderRadius: '18px', border: `1px solid ${borderColor}`, padding: '1rem', boxShadow: '0 10px 30px rgba(2, 6, 23, 0.12)', position: isMobile ? 'relative' : 'static', zIndex: isMobile ? 10 : 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#00d2ff' }}>HEXA</div>
            {isMobile && (
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.9rem', padding: 0 }}
              >
                Close
              </button>
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {[
              { label: 'Dashboard', key: 'dashboard' },
              { label: 'Markets', key: 'markets' },
              { label: 'Portfolio', key: 'portfolio' },
              { label: 'Settings', key: 'settings' }
            ].map((item) => {
              const active = activeTab === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.key);
                    setSidebarOpen(false);
                  }}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '0.7rem 0.8rem',
                    borderRadius: '10px',
                    background: active ? (isDark ? 'rgba(0,210,255,0.16)' : 'rgba(0,210,255,0.12)') : 'transparent',
                    color: active ? '#00d2ff' : textMuted,
                    fontWeight: active ? '700' : '500',
                    border: 'none',
                    textDecoration: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          <div style={{ marginTop: '1.2rem', padding: '0.8rem', borderRadius: '12px', background: isDark ? 'rgba(74,222,128,0.12)' : 'rgba(74,222,128,0.12)', border: `1px solid ${borderColor}` }}>
            <div style={{ fontSize: '0.8rem', color: textMuted }}>Trading Plan</div>
            <div style={{ color: headerText, fontWeight: '700', marginTop: '0.25rem' }}>Risk: Moderate</div>
          </div>
        </aside>

        <div style={{ flex: 1, display: activeTab === 'dashboard' ? 'block' : 'none' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem', flexDirection: isMobile ? 'column' : 'row' }}>
            <div>
              <p style={{ color: '#00d2ff', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.8rem', margin: 0 }}>HEXA TRADING</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <h1 style={{ margin: '0.3rem 0', fontSize: '2rem', color: headerText }}>Welcome back, {user?.username || 'Trader'}</h1>
                {user?.isDemo && (
                  <span style={{ padding: '0.35rem 0.75rem', borderRadius: '999px', background: '#075985', color: '#bfdbfe', fontSize: '0.85rem', fontWeight: '700' }}>Demo Account</span>
                )}
              </div>
              <p style={{ margin: 0, color: textMuted }}>{user?.isDemo ? 'You are using a trial demo account.' : user?.email ? user.email : 'Your account is ready for live trading.'}</p>
            </div>
            <div style={{ display: 'flex', gap: '0.7rem', alignItems: 'center', flexWrap: 'wrap' }}>
              {isMobile && (
                <button
                  onClick={() => setSidebarOpen((open) => !open)}
                  style={{ padding: '0.7rem 1rem', background: 'rgba(0,210,255,0.12)', border: `1px solid ${borderColor}`, color: '#00d2ff', borderRadius: '999px', cursor: 'pointer', fontWeight: '600' }}
                >
                  Menu
                </button>
              )}
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                style={{ padding: '0.7rem 1rem', background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.06)', border: `1px solid ${borderColor}`, color: headerText, borderRadius: '999px', cursor: 'pointer', fontWeight: '600' }}
              >
                {isDark ? '☀️ Light' : '🌙 Dark'}
              </button>
              <button
                onClick={onLogout}
                style={{ padding: '0.7rem 1.2rem', background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', borderRadius: '999px', cursor: 'pointer', fontWeight: '600' }}
              >
                Logout
              </button>
            </div>
          </div>

          <div style={{ padding: '0.75rem 1rem', borderRadius: '999px', background: isDark ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255,255,255,0.95)', border: `1px solid ${borderColor}`, marginBottom: '1rem', display: 'flex', overflowX: 'auto', gap: '1rem', alignItems: 'center', flexWrap: 'nowrap' }}>
          {ticker.map((item) => (
            <div key={item.symbol} style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', whiteSpace: 'nowrap' }}>
              <span style={{ color: textMuted, fontSize: '0.8rem' }}>{item.symbol}</span>
              <span style={{ color: headerText, fontWeight: '700' }}>{item.value}</span>
              <span style={{ color: item.change.startsWith('+') ? '#4ade80' : '#f87171', fontSize: '0.8rem' }}>{item.change}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <div style={{ padding: '0.75rem 1rem', borderRadius: '999px', background: isDark ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255,255,255,0.95)', border: `1px solid ${borderColor}`, color: '#00d2ff', fontWeight: '700' }}>Balance: $10,000.00</div>
          <div style={{ padding: '0.75rem 1rem', borderRadius: '999px', background: isDark ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255,255,255,0.95)', border: `1px solid ${borderColor}`, color: '#4ade80', fontWeight: '700' }}>Equity: $11,240.00</div>
          <div style={{ padding: '0.75rem 1rem', borderRadius: '999px', background: isDark ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255,255,255,0.95)', border: `1px solid ${borderColor}`, color: '#f59e0b', fontWeight: '700' }}>Margin: 12.4%</div>
        </div>

        <div style={summaryGridStyle}>
            {summaryCards.map((card, index) => (
              <div key={index} style={{ ...cardStyle, background: cardBackground, border: `1px solid ${borderColor}` }}>
                <div style={{ color: textMuted, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>{card.label}</div>
                <div style={{ color: card.tone, fontSize: '1.5rem', fontWeight: '700', marginTop: '0.45rem' }}>{card.value}</div>
                <div style={{ color: isDark ? '#cbd5e1' : '#475569', fontSize: '0.95rem', marginTop: '0.25rem' }}>{card.sub}</div>
              </div>
            ))}
          </div>

          <div style={dualColumnStyle}>
          <div style={{ ...cardStyle, background: cardBackground, border: `1px solid ${borderColor}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ margin: 0, color: '#00d2ff' }}>Trading Terminal</h3>
                <p style={{ margin: '0.25rem 0 0', color: '#94a3b8', fontSize: '0.9rem' }}>Live chart, order flow, and execution box</p>
              </div>
              <div style={{ color: '#4ade80', fontSize: '0.9rem' }}>● Live</div>
            </div>

            <div style={{ background: 'linear-gradient(180deg, rgba(2,132,199,0.16), rgba(2,132,199,0.02))', borderRadius: '12px', padding: '1rem', border: '1px solid rgba(148,163,184,0.15)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.7rem' }}>
                <div>
                  <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>EUR/USD</div>
                  <div style={{ color: '#fff', fontSize: '1.3rem', fontWeight: '700' }}>1.0864</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#4ade80', fontWeight: '700' }}>+0.42%</div>
                  <div style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>Today</div>
                </div>
              </div>

              <svg viewBox="0 0 230 150" width="100%" height="180" style={{ display: 'block' }}>
                <line x1="0" y1="130" x2="230" y2="130" stroke="#334155" strokeWidth="1" />
                <line x1="0" y1="90" x2="230" y2="90" stroke="#334155" strokeWidth="1" />
                <line x1="0" y1="50" x2="230" y2="50" stroke="#334155" strokeWidth="1" />
                <polyline fill="none" stroke="#00d2ff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" points={chartPoints} />
                <circle cx="160" cy="70" r="6" fill="#4ade80" />
              </svg>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', alignItems: 'flex-end', height: '60px' }}>
                {[28, 40, 35, 44, 39, 55, 50].map((height, idx) => (
                  <div key={idx} style={{ flex: 1, height: `${height}px`, borderRadius: '4px 4px 0 0', background: idx % 2 === 0 ? '#4ade80' : '#00d2ff' }} />
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.75rem', color: '#94a3b8', fontSize: '0.85rem' }}>
                <span>Open 1.0812</span>
                <span>High 1.0891</span>
                <span>Low 1.0808</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
              <button style={actionButtonPrimary} onClick={() => setTradeModal({ open: true, type: 'Buy' })}>Buy</button>
              <button style={actionButtonSecondary} onClick={() => setTradeModal({ open: true, type: 'Sell' })}>Sell</button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ ...cardStyle, background: cardBackground, border: `1px solid ${borderColor}` }}>
              <h3 style={{ margin: '0 0 0.7rem', color: '#00d2ff' }}>Trade Panel</h3>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.7rem' }}>
                <button style={{ ...actionButtonPrimary, flex: 1, padding: '0.5rem 0.8rem' }} onClick={() => setTradeModal({ open: true, type: 'Buy' })}>Long</button>
                <button style={{ ...actionButtonSecondary, flex: 1, padding: '0.5rem 0.8rem' }} onClick={() => setTradeModal({ open: true, type: 'Sell' })}>Short</button>
              </div>
              <label style={{ display: 'block', color: textMuted, fontSize: '0.8rem', marginBottom: '0.3rem' }}>Entry Price</label>
              <input value="1.0864" style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', border: `1px solid ${borderColor}`, background: isDark ? '#111827' : '#f8fafc', color: isDark ? '#fff' : '#0f172a', marginBottom: '0.6rem' }} />
              <label style={{ display: 'block', color: textMuted, fontSize: '0.8rem', marginBottom: '0.3rem' }}>Quantity</label>
              <input value="1.00" style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', border: `1px solid ${borderColor}`, background: isDark ? '#111827' : '#f8fafc', color: isDark ? '#fff' : '#0f172a', marginBottom: '0.6rem' }} />
              <label style={{ display: 'block', color: textMuted, fontSize: '0.8rem', marginBottom: '0.3rem' }}>Leverage</label>
              <select style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', border: `1px solid ${borderColor}`, background: isDark ? '#111827' : '#f8fafc', color: isDark ? '#fff' : '#0f172a', marginBottom: '0.6rem' }}>
                <option>1:100</option>
                <option selected>1:500</option>
                <option>1:1000</option>
              </select>
              <label style={{ display: 'block', color: textMuted, fontSize: '0.8rem', marginBottom: '0.3rem' }}>Take Profit</label>
              <input value="1.0900" style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', border: `1px solid ${borderColor}`, background: isDark ? '#111827' : '#f8fafc', color: isDark ? '#fff' : '#0f172a', marginBottom: '0.6rem' }} />
              <label style={{ display: 'block', color: textMuted, fontSize: '0.8rem', marginBottom: '0.3rem' }}>Stop Loss</label>
              <input value="1.0820" style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', border: `1px solid ${borderColor}`, background: isDark ? '#111827' : '#f8fafc', color: isDark ? '#fff' : '#0f172a' }} />
            </div>
            <div style={{ ...cardStyle, background: cardBackground, border: `1px solid ${borderColor}` }}>
              <h3 style={{ margin: '0 0 0.7rem', color: '#00d2ff' }}>Order Book</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', color: textMuted, fontSize: '0.8rem' }}>
                <span>Bid</span>
                <span>Ask</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.45rem 0', color: '#fff', fontWeight: '600' }}>
                <span>1.0858</span>
                <span>1.0869</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.45rem 0', color: '#fff', fontWeight: '600' }}>
                <span>1.0855</span>
                <span>1.0872</span>
              </div>
          </div>

          <div style={{ ...cardStyle, background: cardBackground, border: `1px solid ${borderColor}` }}>
              <h3 style={{ margin: '0 0 0.7rem', color: '#00d2ff' }}>Watchlist</h3>
              {watchlist.map((item) => (
                <div key={item.symbol} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0', borderBottom: '1px solid #1e293b' }}>
                  <div>
                    <div style={{ color: '#fff', fontWeight: '600' }}>{item.symbol}</div>
                    <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{item.price}</div>
                  </div>
                  <div style={{ color: item.change.startsWith('+') ? '#4ade80' : '#f87171', fontWeight: '600' }}>{item.change}</div>
                </div>
              ))}
            </div>

            <div style={{ ...cardStyle, background: cardBackground, border: `1px solid ${borderColor}` }}>
              <h3 style={{ margin: '0 0 0.7rem', color: '#00d2ff' }}>Open Positions</h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.92rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #334155', color: textMuted }}>
                      <th style={{ padding: '0.45rem 0', textAlign: 'left' }}>Symbol</th>
                      <th style={{ padding: '0.45rem 0', textAlign: 'left' }}>Size</th>
                      <th style={{ padding: '0.45rem 0', textAlign: 'left' }}>Entry</th>
                      <th style={{ padding: '0.45rem 0', textAlign: 'right' }}>P/L</th>
                    </tr>
                  </thead>
                  <tbody>
                    {portfolio.map((position) => (
                      <tr key={`${position.symbol}-${position.side}`} style={{ borderBottom: '1px solid #1e293b' }}>
                        <td style={{ padding: '0.55rem 0', color: '#fff', fontWeight: '600' }}>
                          {position.symbol}
                          <div style={{ color: textMuted, fontSize: '0.78rem', fontWeight: '500' }}>{position.side}</div>
                        </td>
                        <td style={{ padding: '0.55rem 0', color: '#cbd5e1' }}>{position.size}</td>
                        <td style={{ padding: '0.55rem 0', color: '#cbd5e1' }}>{position.entry}</td>
                        <td style={{ padding: '0.55rem 0', textAlign: 'right', color: position.pnl.startsWith('+') ? '#4ade80' : '#f87171', fontWeight: '700' }}>{position.pnl}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

          <div style={{ ...cardStyle, background: cardBackground, border: `1px solid ${borderColor}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
            <h3 style={{ margin: 0, color: '#00d2ff' }}>Live Forex Market</h3>
            <span style={{ color: textMuted, fontSize: '0.9rem' }}>Updated in real time</span>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #334155', color: '#64748b' }}>
                <th style={{ padding: '0.7rem 0', fontWeight: '600' }}>Pair</th>
                <th style={{ padding: '0.7rem 0', fontWeight: '600' }}>Rate</th>
                <th style={{ padding: '0.7rem 0', textAlign: 'right', fontWeight: '600' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {rates.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #1e293b' }}>
                  <td style={{ padding: '0.8rem 0', fontWeight: '700' }}>{item.currency_pair}</td>
                  <td style={{ padding: '0.8rem 0', color: '#4ade80', fontWeight: '700' }}>{Number(item.rate).toFixed(4)}</td>
                  <td style={{ padding: '0.8rem 0', textAlign: 'right' }}>
                    <button style={{ padding: '0.45rem 0.9rem', backgroundColor: '#00d2ff', border: 'none', borderRadius: '999px', color: '#07111d', fontWeight: '700', cursor: 'pointer' }} onClick={() => setTradeModal({ open: true, type: 'Buy' })}>Trade</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
          <div style={{ ...cardStyle, background: cardBackground, border: `1px solid ${borderColor}` }}>
            <h3 style={{ margin: '0 0 0.8rem', color: '#00d2ff' }}>Order History</h3>
            {orders.map((order) => (
              <div key={order.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0', borderBottom: '1px solid #1e293b' }}>
                <div>
                  <div style={{ color: '#fff', fontWeight: '600' }}>{order.pair}</div>
                  <div style={{ color: textMuted, fontSize: '0.85rem' }}>{order.type} • {order.amount}</div>
                </div>
                <div style={{ color: order.status === 'Filled' ? '#4ade80' : '#f59e0b', fontWeight: '600' }}>{order.status}</div>
              </div>
            ))}
          </div>

          <div style={{ ...cardStyle, background: cardBackground, border: `1px solid ${borderColor}` }}>
            <h3 style={{ margin: '0 0 0.8rem', color: '#00d2ff' }}>Profit & Loss</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0' }}>
              <span style={{ color: textMuted }}>Daily P&L</span>
              <span style={{ color: '#4ade80', fontWeight: '700' }}>+$325.00</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0' }}>
              <span style={{ color: textMuted }}>Weekly P&L</span>
              <span style={{ color: '#4ade80', fontWeight: '700' }}>+$1,240.00</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0' }}>
              <span style={{ color: textMuted }}>Total Equity</span>
              <span style={{ color: '#00d2ff', fontWeight: '700' }}>$11,240.00</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
          <div style={{ ...cardStyle, background: cardBackground, border: `1px solid ${borderColor}` }}>
            <h3 style={{ margin: '0 0 0.8rem', color: '#00d2ff' }}>Notifications</h3>
            {notifications.map((item) => (
              <div key={item.id} style={{ padding: '0.7rem 0', borderBottom: '1px solid #1e293b' }}>
                <div style={{ color: '#fff', fontWeight: '600' }}>{item.title}</div>
                <div style={{ color: textMuted, fontSize: '0.85rem', marginTop: '0.2rem' }}>{item.text}</div>
              </div>
            ))}
          </div>

          <div style={{ ...cardStyle, background: cardBackground, border: `1px solid ${borderColor}` }}>
            <h3 style={{ margin: '0 0 0.8rem', color: '#00d2ff' }}>Market News</h3>
            {news.map((item) => (
              <div key={item.id} style={{ padding: '0.7rem 0', borderBottom: '1px solid #1e293b' }}>
                <div style={{ color: '#fff', fontWeight: '600' }}>{item.title}</div>
                <div style={{ color: textMuted, fontSize: '0.85rem', marginTop: '0.2rem' }}>{item.time}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ ...cardStyle, background: cardBackground, border: `1px solid ${borderColor}`, marginTop: '1rem' }}>
          <h3 style={{ margin: '0 0 0.8rem', color: '#00d2ff' }}>Risk Management</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.9rem' }}>
            <div style={{ padding: '0.8rem', borderRadius: '12px', background: isDark ? 'rgba(2, 132, 199, 0.12)' : 'rgba(2, 132, 199, 0.08)' }}>
              <div style={{ color: textMuted, fontSize: '0.8rem', textTransform: 'uppercase' }}>Leverage</div>
              <div style={{ color: '#00d2ff', fontWeight: '700', fontSize: '1.1rem', marginTop: '0.2rem' }}>1:500</div>
            </div>
            <div style={{ padding: '0.8rem', borderRadius: '12px', background: isDark ? 'rgba(248, 113, 113, 0.12)' : 'rgba(248, 113, 113, 0.08)' }}>
              <div style={{ color: textMuted, fontSize: '0.8rem', textTransform: 'uppercase' }}>Stop Loss</div>
              <div style={{ color: '#f87171', fontWeight: '700', fontSize: '1.1rem', marginTop: '0.2rem' }}>1.0800</div>
            </div>
            <div style={{ padding: '0.8rem', borderRadius: '12px', background: isDark ? 'rgba(74, 222, 128, 0.12)' : 'rgba(74, 222, 128, 0.08)' }}>
              <div style={{ color: textMuted, fontSize: '0.8rem', textTransform: 'uppercase' }}>Exposure</div>
              <div style={{ color: '#4ade80', fontWeight: '700', fontSize: '1.1rem', marginTop: '0.2rem' }}>12.4%</div>
            </div>
          </div>
        </div>
        </div>

        <div style={{ display: activeTab === 'markets' ? 'block' : 'none', padding: '1rem 0' }}>
          <div style={{ ...cardStyle, background: cardBackground, border: `1px solid ${borderColor}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ margin: 0, color: '#00d2ff' }}>Market Overview</h3>
                <p style={{ margin: '0.5rem 0 0', color: textMuted }}>Live market prices for your trading instruments.</p>
              </div>
              <button type="button" onClick={() => setActiveTab('dashboard')} style={{ background: 'transparent', border: '1px solid #00d2ff', color: '#00d2ff', padding: '0.5rem 0.9rem', borderRadius: '999px', cursor: 'pointer' }}>Dashboard</button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #334155', color: textMuted }}>
                  <th style={{ padding: '0.75rem 0', textAlign: 'left' }}>Instrument</th>
                  <th style={{ padding: '0.75rem 0', textAlign: 'left' }}>Price</th>
                  <th style={{ padding: '0.75rem 0', textAlign: 'left' }}>Change</th>
                </tr>
              </thead>
              <tbody>
                {ticker.map((item) => (
                  <tr key={item.symbol} style={{ borderBottom: '1px solid #1e293b' }}>
                    <td style={{ padding: '0.75rem 0', color: '#fff', fontWeight: '600' }}>{item.symbol}</td>
                    <td style={{ padding: '0.75rem 0', color: '#cbd5e1' }}>{item.value}</td>
                    <td style={{ padding: '0.75rem 0', color: item.change.startsWith('+') ? '#4ade80' : '#f87171', fontWeight: '700' }}>{item.change}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ display: activeTab === 'portfolio' ? 'block' : 'none', padding: '1rem 0' }}>
          <div style={{ ...cardStyle, background: cardBackground, border: `1px solid ${borderColor}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ margin: 0, color: '#00d2ff' }}>Portfolio</h3>
                <p style={{ margin: '0.5rem 0 0', color: textMuted }}>Your current positions and account summary.</p>
              </div>
              <button type="button" onClick={() => setActiveTab('dashboard')} style={{ background: 'transparent', border: '1px solid #00d2ff', color: '#00d2ff', padding: '0.5rem 0.9rem', borderRadius: '999px', cursor: 'pointer' }}>Dashboard</button>
            </div>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {portfolio.map((position) => (
                <div key={position.symbol} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.85rem', borderRadius: '12px', background: isDark ? '#020617' : '#f8fafc', border: `1px solid ${borderColor}` }}>
                  <div>
                    <div style={{ color: '#fff', fontWeight: '700' }}>{position.symbol}</div>
                    <div style={{ color: textMuted, fontSize: '0.85rem' }}>{position.side}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: '#cbd5e1', marginBottom: '0.35rem' }}>{position.size}</div>
                    <div style={{ color: position.pnl.startsWith('+') ? '#4ade80' : '#f87171', fontWeight: '700' }}>{position.pnl}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: activeTab === 'settings' ? 'block' : 'none', padding: '1rem 0' }}>
          <div style={{ ...cardStyle, background: cardBackground, border: `1px solid ${borderColor}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ margin: 0, color: '#00d2ff' }}>Settings</h3>
                <p style={{ margin: '0.5rem 0 0', color: textMuted }}>Manage your preferences and account security.</p>
              </div>
              <button type="button" onClick={() => setActiveTab('dashboard')} style={{ background: 'transparent', border: '1px solid #00d2ff', color: '#00d2ff', padding: '0.5rem 0.9rem', borderRadius: '999px', cursor: 'pointer' }}>Dashboard</button>
            </div>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div style={{ padding: '1rem', borderRadius: '16px', background: isDark ? '#020617' : '#f8fafc', border: `1px solid ${borderColor}` }}>
                <div style={{ fontWeight: '700', color: '#fff', marginBottom: '0.5rem' }}>Update Password</div>
                <div style={{ color: textMuted, marginBottom: '0.75rem' }}>Change your password and improve account security.</div>
                <button type="button" onClick={() => navigate('/update-password')} style={{ padding: '0.75rem 1rem', borderRadius: '999px', background: '#4ade80', border: 'none', color: '#052e16', fontWeight: '700', cursor: 'pointer' }}>Update Password</button>
              </div>
              <div style={{ padding: '1rem', borderRadius: '16px', background: isDark ? '#020617' : '#f8fafc', border: `1px solid ${borderColor}` }}>
                <div style={{ fontWeight: '700', color: '#fff', marginBottom: '0.5rem' }}>Notifications</div>
                <div style={{ color: textMuted }}>Notifications, alerts and email preferences will be available here.</div>
              </div>
            </div>
          </div>
        </div>

        {orderMessage && (
          <div style={{ marginTop: '1rem', padding: '0.8rem 1rem', borderRadius: '12px', background: isDark ? 'rgba(74,222,128,0.12)' : 'rgba(74,222,128,0.16)', color: isDark ? '#4ade80' : '#166534', border: `1px solid ${isDark ? 'rgba(74,222,128,0.25)' : 'rgba(74,222,128,0.3)'}` }}>
            {orderMessage}
          </div>
        )}

        {tradeModal.open && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(2, 6, 23, 0.72)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '1rem' }}>
            <div style={{ width: '100%', maxWidth: '420px', background: isDark ? '#0f172a' : '#ffffff', borderRadius: '16px', padding: '1.2rem', border: `1px solid ${borderColor}`, boxShadow: '0 20px 50px rgba(0,0,0,0.25)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0, color: isDark ? '#00d2ff' : '#0284c7' }}>{tradeModal.type} EUR/USD</h3>
                <button onClick={() => setTradeModal({ open: false, type: 'Buy' })} style={{ background: 'transparent', border: 'none', color: textMuted, fontSize: '1.2rem', cursor: 'pointer' }}>×</button>
              </div>

              <label style={{ display: 'block', marginBottom: '0.3rem', color: textMuted, fontWeight: '600' }}>Amount (USD)</label>
              <input
                type="number"
                value={tradeAmount}
                onChange={(e) => setTradeAmount(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: `1px solid ${borderColor}`, marginBottom: '0.9rem', background: isDark ? '#111827' : '#f8fafc', color: isDark ? '#fff' : '#0f172a' }}
              />

              <div style={{ display: 'flex', gap: '0.7rem' }}>
                <button style={{ ...actionButtonPrimary, flex: 1 }} onClick={() => {
                  const amount = Number(tradeAmount || 0);
                  const action = tradeModal.type.toLowerCase();
                  const newPosition = {
                    symbol: 'EUR/USD',
                    side: tradeModal.type,
                    size: `${(amount / 1000).toFixed(2)} lots`,
                    entry: '1.0864',
                    pnl: action === 'buy' ? `+$${(amount * 0.08).toFixed(2)}` : `-$${(amount * 0.05).toFixed(2)}`
                  };
                  setPortfolio([newPosition, ...portfolio]);
                  setOrderMessage(`${tradeModal.type} order placed for $${amount.toLocaleString()} USD.`);
                  setTradeModal({ open: false, type: 'Buy' });
                }}>Confirm {tradeModal.type}</button>
                <button style={{ ...actionButtonSecondary, flex: 1 }} onClick={() => setTradeModal({ open: false, type: 'Buy' })}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const cardStyle = {
  padding: '1.2rem',
  borderRadius: '16px',
  boxShadow: '0 10px 30px rgba(2, 6, 23, 0.12)'
};

const actionButtonPrimary = {
  padding: '0.6rem 1rem',
  border: 'none',
  borderRadius: '999px',
  background: '#4ade80',
  color: '#052e16',
  fontWeight: '700',
  cursor: 'pointer',
  flex: 1
};

const actionButtonSecondary = {
  padding: '0.6rem 1rem',
  border: '1px solid #ef4444',
  borderRadius: '999px',
  background: 'transparent',
  color: '#fca5a5',
  fontWeight: '700',
  cursor: 'pointer',
  flex: 1
};