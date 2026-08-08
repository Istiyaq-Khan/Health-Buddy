import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';
import { Activity, Lock } from 'lucide-react';

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-dark text-white p-4">
        <div className="glass-panel p-5 text-center d-flex flex-column align-items-center gap-3 box-glow" style={{ maxWidth: '360px' }}>
          <div className="p-3 rounded-circle" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
            <Activity size={36} className="animate-spin" />
          </div>
          <p className="font-display mb-0 text-muted" style={{ fontSize: '0.95rem' }}>
            অ্যাসেস ভেরিফাই করা হচ্ছে...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
