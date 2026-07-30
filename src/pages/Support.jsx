import { Link } from 'react-router-dom';

export default function Support({ user }) {
  const topics = [
    { title: 'Account Verification', description: 'Speed up onboarding and complete identity checks.' },
    { title: 'Deposit Issues', description: 'Resolve funding delays and payment method questions.' },
    { title: 'Platform Help', description: 'Get help with charting, order execution, and alerts.' },
    { title: 'Risk Management', description: 'Learn how to control exposure and protect capital.' }
  ];

  return (
    <div style={{ minHeight: '80vh', padding: '2rem 1rem 3rem', background: 'linear-gradient(135deg, #020617 0%, #0f172a 100%)' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gap: '1rem' }}>
        <div style={{ background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '20px', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <div>
              <div style={{ color: '#00d2ff', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>Support</div>
              <h2 style={{ color: '#fff', margin: '0 0 0.35rem', fontSize: '1.8rem' }}>How can we help?</h2>
              <p style={{ color: '#94a3b8', margin: 0 }}>Reach our support team for {user?.username || 'your account'} and get assistance fast.</p>
            </div>
            <Link to="/profile" style={{ padding: '0.75rem 1rem', borderRadius: '999px', background: 'rgba(0,210,255,0.12)', color: '#7dd3fc', textDecoration: 'none', fontWeight: '700' }}>Back to Profile</Link>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {topics.map((topic) => (
            <div key={topic.title} style={{ background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '18px', padding: '1.2rem' }}>
              <h3 style={{ color: '#fff', marginTop: 0 }}>{topic.title}</h3>
              <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>{topic.description}</p>
              <button type="button" onClick={() => window.location.href = 'mailto:support@hexa-trading.com'} style={{ padding: '0.75rem 0.95rem', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #00d2ff, #4ade80)', color: '#04111d', fontWeight: '700', cursor: 'pointer' }}>Contact Us</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
