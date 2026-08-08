import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';
import { 
  Activity, 
  Home, 
  BarChart3, 
  Search, 
  Stethoscope, 
  MapPin, 
  Info, 
  LogOut, 
  User, 
  LogIn, 
  Menu, 
  X,
  Sparkles
} from 'lucide-react';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'হোম', icon: Home },
    ...(user ? [
      { path: '/dashboard', label: 'ড্যাশবোর্ড', icon: BarChart3 },
      { path: '/analyze', label: 'লক্ষণ চেক', icon: Search },
      { path: '/talk-with-doctor', label: 'AI ডাক্তার', icon: Stethoscope },
      { path: '/near-hospitals', label: 'হাসপাতাল', icon: MapPin },
      { path: '/about', label: 'সম্পর্কে', icon: Info }
    ] : [])
  ];

  return (
    <header className="sticky-top border-bottom" style={{ 
      backgroundColor: 'rgba(9, 16, 14, 0.85)', 
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderColor: 'var(--color-rule)',
      zIndex: 1050
    }}>
      <div className="container-fluid px-3 px-lg-5">
        <div className="d-flex align-items-center justify-content-between py-2" style={{ minHeight: '64px' }}>
          
          {/* Logo */}
          <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none me-4">
            <div className="d-flex align-items-center justify-content-center rounded-circle box-glow" style={{
              width: '38px',
              height: '38px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: '#022c22'
            }}>
              <Activity size={22} strokeWidth={2.5} />
            </div>
            <div className="d-flex flex-column">
              <span className="fw-bold fs-5 tracking-tight text-white font-display d-flex align-items-center gap-1 mb-0">
                স্বাস্থ্যসাথী <Sparkles size={14} className="text-emerald-400" style={{ color: '#34d399' }} />
              </span>
              <span style={{ fontSize: '0.68rem', color: 'var(--color-ink-muted)', marginTop: '-2px' }}>
                AI Health Buddy
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="d-none d-lg-flex align-items-center gap-1 me-auto">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`d-flex align-items-center gap-2 px-3 py-2 rounded-pill text-decoration-none font-display transition-all ${
                    active 
                      ? 'bg-emerald-500-10 text-emerald-400 fw-semibold' 
                      : 'text-light opacity-75 opacity-100-hover'
                  }`}
                  style={{
                    backgroundColor: active ? 'rgba(16, 185, 129, 0.12)' : 'transparent',
                    color: active ? '#34d399' : 'var(--color-ink)',
                    fontSize: '0.92rem',
                    border: active ? '1px solid rgba(16, 185, 129, 0.25)' : '1px solid transparent'
                  }}
                >
                  <Icon size={17} style={{ color: active ? '#34d399' : 'var(--color-ink-muted)' }} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Area (User Profile / Login Button) */}
          <div className="d-flex align-items-center gap-3">
            {loading ? (
              <div className="spinner-border spinner-border-sm text-emerald" style={{ color: '#10b981' }} role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : user ? (
              <div className="position-relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="btn d-flex align-items-center gap-2 p-1 pe-3 rounded-pill glass-card text-white text-decoration-none border-0"
                  style={{ backgroundColor: 'rgba(22, 36, 32, 0.8)', border: '1px solid var(--color-rule)' }}
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="rounded-circle border"
                      style={{ width: '34px', height: '34px', objectFit: 'cover', borderColor: '#10b981' }}
                    />
                  ) : (
                    <div 
                      className="rounded-circle d-flex align-items-center justify-content-center text-dark fw-bold"
                      style={{ width: '34px', height: '34px', background: 'linear-gradient(135deg, #34d399, #10b981)' }}
                    >
                      {user.email ? user.email[0].toUpperCase() : 'U'}
                    </div>
                  )}
                  <span className="d-none d-sm-inline font-display text-truncate" style={{ maxWidth: '120px', fontSize: '0.88rem' }}>
                    {user.displayName || user.email.split('@')[0]}
                  </span>
                </button>

                {/* Dropdown menu */}
                {dropdownOpen && (
                  <div 
                    className="position-absolute end-0 mt-2 p-2 rounded-xl shadow-lg border animate__animated animate__fadeIn"
                    style={{
                      width: '240px',
                      backgroundColor: 'var(--color-paper-surface)',
                      borderColor: 'var(--color-rule-strong)',
                      backdropFilter: 'blur(20px)',
                      zIndex: 1100
                    }}
                  >
                    <div className="p-2 border-bottom mb-2" style={{ borderColor: 'var(--color-rule)' }}>
                      <p className="fw-semibold text-white mb-0 font-display text-truncate" style={{ fontSize: '0.9rem' }}>
                        {user.displayName || 'User Profile'}
                      </p>
                      <small className="text-truncate d-block" style={{ color: 'var(--color-ink-muted)', fontSize: '0.78rem' }}>
                        {user.email}
                      </small>
                    </div>
                    
                    <button
                      onClick={handleLogout}
                      className="w-100 btn d-flex align-items-center gap-2 px-3 py-2 rounded-lg text-danger font-display border-0"
                      style={{ backgroundColor: 'rgba(244, 63, 94, 0.1)', fontSize: '0.88rem' }}
                    >
                      <LogOut size={16} />
                      <span>লগআউট করুন</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="btn-emerald text-decoration-none">
                <LogIn size={17} />
                <span>লগইন / রেজিস্টার</span>
              </Link>
            )}

            {/* Mobile Menu Toggler */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn text-white p-2 d-lg-none border-0"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div 
            className="d-lg-none py-3 border-top animate__animated animate__fadeIn"
            style={{ borderColor: 'var(--color-rule)' }}
          >
            <div className="d-flex flex-column gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="d-flex align-items-center gap-3 px-3 py-25 rounded-xl text-decoration-none font-display"
                    style={{
                      backgroundColor: active ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
                      color: active ? '#34d399' : 'var(--color-ink)',
                      borderLeft: active ? '3px solid #10b981' : '3px solid transparent'
                    }}
                  >
                    <Icon size={20} style={{ color: active ? '#34d399' : 'var(--color-ink-muted)' }} />
                    <span className="fs-6">{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </header>
  );
};

export default Navbar;