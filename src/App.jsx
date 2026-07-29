import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import "./App.css";

import Home from "./pages/home";
import Platforms from "./pages/Platforms";
import Trading from "./pages/trading";
import Funding from "./pages/Funding";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Markets from "./pages/Markets";
import Portfolio from "./pages/Portfolio";
import Wallet from "./pages/Wallet";
import History from "./pages/History";
import Support from "./pages/Support";
import Notifications from "./pages/Notifications";
import Footer from "./pages/footer";

function App() {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('hexa-user');
      if (storedUser) {
        return { ...JSON.parse(storedUser), __persist: true };
      }

      const sessionUser = sessionStorage.getItem('hexa-user-session');
      if (sessionUser) {
        return { ...JSON.parse(sessionUser), __persist: false };
      }
    } catch {
      return null;
    }

    return null;
  });

  useEffect(() => {
    if (!user) {
      localStorage.removeItem('hexa-user');
      sessionStorage.removeItem('hexa-user-session');
      return;
    }

    const { __persist, ...userPayload } = user;

    if (__persist) {
      localStorage.setItem('hexa-user', JSON.stringify(userPayload));
      sessionStorage.removeItem('hexa-user-session');
    } else {
      sessionStorage.setItem('hexa-user-session', JSON.stringify(userPayload));
      localStorage.removeItem('hexa-user');
    }
  }, [user]);

  const handleLogin = (userData, rememberMe = false) => {
    setUser({ ...userData, __persist: rememberMe });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <BrowserRouter>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Home user={user} />} />
        <Route path="/platforms" element={user ? <Navigate to="/dashboard" /> : <Platforms />} />
        <Route path="/trading" element={user ? <Navigate to="/dashboard" /> : <Trading />} />
        <Route path="/funding" element={user ? <Navigate to="/dashboard" /> : <Funding />} />
        <Route path="/about" element={user ? <Navigate to="/dashboard" /> : <About />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
        <Route path="/forgot-password" element={user ? <Navigate to="/dashboard" /> : <ForgotPassword />} />
        <Route path="/dashboard" element={user ? <Dashboard user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="/profile" element={user ? <Profile user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="/settings" element={user ? <Settings user={user} /> : <Navigate to="/login" />} />
        <Route path="/update-password" element={user ? <UpdatePassword user={user} /> : <Navigate to="/login" />} />
        <Route path="/markets" element={user ? <Markets user={user} /> : <Navigate to="/login" />} />
        <Route path="/portfolio" element={user ? <Portfolio user={user} /> : <Navigate to="/login" />} />
        <Route path="/wallet" element={user ? <Wallet user={user} /> : <Navigate to="/login" />} />
        <Route path="/history" element={user ? <History user={user} /> : <Navigate to="/login" />} />
        <Route path="/support" element={user ? <Support user={user} /> : <Navigate to="/login" />} />
        <Route path="/notifications" element={user ? <Notifications user={user} /> : <Navigate to="/login" />} />
        <Route path="/footer" element={<Footer />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;