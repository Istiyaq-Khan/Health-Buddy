import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
      alert('✅ Successfully logged out!');
    } catch (error) {
      console.error('Logout error:', error);
      alert('❌ Logout failed. Please try again.');
    }
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  if (loading) {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container">
          <span className="navbar-brand">🩺 Health Buddy</span>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          🩺 স্বাস্থ্যসাথী
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/')}`} to="/">
                🏠 Home
              </Link>
            </li>
            {user && (
              <>
                <li className="nav-item">
                  <Link className={`nav-link ${isActive('/dashboard')}`} to="/dashboard">
                    📊 Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${isActive('/analyze')}`} to="/analyze">
                    🔍 Analyze Symptoms
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${isActive('/talk-with-doctor')}`} to="/talk-with-doctor">
                    👨‍⚕️ Talk with Doctor
                  </Link>
                </li>
                <li>
                  <Link className={`nav-link ${isActive('/near-hospitals')}`} to="/near-hospitals">
                    ♦️ Near Hospitals
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${isActive('/about')}`} to="/about">
                    👨‍💻 About Project
                  </Link>
                </li>
              </>
            )}
          </ul>

          <ul className="navbar-nav">
            {user ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle d-flex align-items-center"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <div className="d-flex align-items-center">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="Profile"
                        className="rounded-circle me-2"
                        style={{ width: '32px', height: '32px' }}
                      />
                    ) : (
                      <div className="bg-light rounded-circle d-flex align-items-center justify-content-center me-2"
                           style={{ width: '32px', height: '32px' }}>
                        <span className="text-dark fw-bold">
                          {user.email ? user.email[0].toUpperCase() : 'U'}
                        </span>
                      </div>
                    )}
                    <span className="d-none d-md-inline">
                      {user.displayName || user.email}
                    </span>
                  </div>
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <div className="dropdown-item-text">
                      <strong>Profile</strong>
                      <br />
                      <small className="text-muted">
                        {user.displayName || 'No name set'}
                      </small>
                      <br />
                      <small className="text-muted">{user.email}</small>
                    </div>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                      🚪 Logout
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  🔐 Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 