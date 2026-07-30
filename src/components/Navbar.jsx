import { Link } from "react-router-dom";
import "../index.css";

export default function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <Link to="/" className="logo-wrap">
        <div className="logo-mark">H</div>
        <div>
          <div className="logo">HEXA</div>
          <div className="logo-sub">Trading</div>
        </div>
      </Link>

      <ul className="nav-links">
        {!user && (
          <>
            <li><Link to="/">Home</Link></li>

            <li className="dropdown">
              <span className="dropdown-title">Platforms ▾</span>
              <div className="dropdown-menu">
                <Link to="/platforms#desktop">Desktop</Link>
                <Link to="/platforms#mobile">Mobile</Link>
              </div>
            </li>

            <li className="dropdown">
              <span className="dropdown-title">Trading ▾</span>
              <div className="dropdown-menu">
                <Link to="/trading#fees">Fees</Link>
                <Link to="/trading#ipo">IPO</Link>
                <Link to="/trading#market-data">Market Data</Link>
              </div>
            </li>

            <li className="dropdown">
              <span className="dropdown-title">Funding ▾</span>
              <div className="dropdown-menu">
                <Link to="/funding#deposit">Deposit</Link>
                <Link to="/register">Register</Link>
              </div>
            </li>

            <li><Link to="/about">About</Link></li>
          </>
        )}
      </ul>

      <div className="actions">
        {user ? (
          <>
            <Link to="/dashboard" className="btn">Dashboard</Link>
            <Link to="/profile" className="login">Profile</Link>
            <button type="button" onClick={onLogout} className="login">Logout</button>
          </>
        ) : (
          <>
            <Link to="/register" className="btn">Open Account</Link>
            <Link to="/login" className="login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}