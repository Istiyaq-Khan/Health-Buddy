import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';

const colors = {
  background: '#0B0F0E',
  primaryGreen: '#00C853',
  secondaryGreen: '#1B5E20',
  cardBg: '#121212',
  textPrimary: '#FFFFFF',
  textSecondary: '#B0B0B0',
  highlight: '#64DD17',
  error: '#FF5252',
  warning: '#FFD600',
};

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
      <div style={{
        backgroundColor: colors.background,
        color: colors.primaryGreen,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'sans-serif',
        gap: '1rem',
      }}>
        <div
          style={{
            border: `4px solid ${colors.highlight}`,
            borderTop: `4px solid transparent`,
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            animation: 'spin 1s linear infinite',
          }}
          aria-label="Loading spinner"
        ></div>
        <p style={{ fontSize: '1.2rem', color: colors.textSecondary }}>
          Checking authentication...
        </p>

        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
        `}</style>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{
        backgroundColor: colors.background,
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem',
        fontFamily: 'sans-serif',
      }}>
        <div style={{
          backgroundColor: colors.cardBg,
          border: `2px solid ${colors.warning}`,
          borderRadius: '8px',
          maxWidth: '400px',
          width: '100%',
          color: colors.textPrimary,
          boxShadow: `0 0 10px ${colors.secondaryGreen}`,
        }}>
          <div style={{
            backgroundColor: colors.warning,
            color: colors.background,
            padding: '1rem',
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
          }}>
            <h4 style={{ margin: 0 }}>🔒 Authentication Required</h4>
          </div>
          <div style={{ padding: '1.5rem', textAlign: 'center' }}>
            <p style={{ color: colors.textSecondary, marginBottom: '1.5rem' }}>
              You need to be logged in to access this page.
            </p>
            {/* This will redirect automatically */}
            <Navigate to="/login" replace />
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
