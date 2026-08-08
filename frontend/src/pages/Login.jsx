import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import { LogIn, UserPlus, Mail, Lock, Activity, AlertCircle, Sparkles } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate("/dashboard");
    } catch (err) {
      console.error("Auth error:", err);
      let message = "অথেন্টিকেশন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।";
      if (err.code === "auth/user-not-found") {
        message = "এই ইমেইলে কোন একাউন্ট পাওয়া যায়নি। সাইন আপ করুন।";
      } else if (err.code === "auth/wrong-password") {
        message = "ভুল পাসওয়ার্ড। আবার চেষ্টা করুন।";
      } else if (err.code === "auth/email-already-in-use") {
        message = "এই ইমেইল ইতিমধ্যে ব্যবহৃত হচ্ছে। সাইন ইন করুন।";
      } else if (err.code === "auth/weak-password") {
        message = "পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে।";
      } else if (err.code === "auth/invalid-email") {
        message = "সঠিক ইমেইল ঠিকানা দিন।";
      } else if (err.message) {
        message = err.message;
      }
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setErrorMsg("");
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (err) {
      console.error("Google auth error:", err);
      setErrorMsg("গুগল দিয়ে লগইন ব্যর্থ হয়েছে: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 font-display d-flex align-items-center justify-content-center p-3 p-md-4 bg-dark text-white">
      
      <div className="glass-panel p-4 p-md-5 box-glow border-0 w-100" style={{ maxWidth: '440px' }}>
        
        {/* Header Logo */}
        <div className="text-center mb-4">
          <div 
            className="d-inline-flex align-items-center justify-content-center rounded-circle box-glow mb-3"
            style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #10b981, #059669)', color: '#022c22' }}
          >
            <Activity size={28} strokeWidth={2.5} />
          </div>
          <h3 className="fw-bold text-white mb-1 font-display">
            {isSignUp ? "একাউন্ট তৈরি করুন" : "স্বাস্থ্যসাথীতে স্বাগতম"}
          </h3>
          <p className="text-muted small mb-0 font-display">
            {isSignUp ? "আপনার স্বাস্থ্য সচেতনতার নতুন যাত্রা শুরু করুন" : "আপনার একাউন্টে প্রবেশ করতে লগইন করুন"}
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="alert border-0 rounded-xl mb-4 d-flex align-items-center gap-2" style={{ backgroundColor: 'rgba(244, 63, 94, 0.15)', color: '#f43f5e' }}>
            <AlertCircle size={18} className="flex-shrink-0" />
            <span className="small font-display">{errorMsg}</span>
          </div>
        )}

        {/* Tab Switcher */}
        <div className="d-flex p-1 rounded-xl mb-4" style={{ backgroundColor: 'rgba(9, 16, 14, 0.6)', border: '1px solid var(--color-rule)' }}>
          <button
            type="button"
            className={`btn flex-fill py-2 font-display rounded-lg border-0 transition-all ${!isSignUp ? 'text-emerald-400 font-semibold' : 'text-muted'}`}
            style={{ 
              backgroundColor: !isSignUp ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
              color: !isSignUp ? '#34d399' : 'var(--color-ink-muted)',
              fontSize: '0.88rem'
            }}
            onClick={() => { setIsSignUp(false); setErrorMsg(""); }}
          >
            <LogIn size={15} className="me-1" /> সাইন ইন
          </button>
          <button
            type="button"
            className={`btn flex-fill py-2 font-display rounded-lg border-0 transition-all ${isSignUp ? 'text-emerald-400 font-semibold' : 'text-muted'}`}
            style={{ 
              backgroundColor: isSignUp ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
              color: isSignUp ? '#34d399' : 'var(--color-ink-muted)',
              fontSize: '0.88rem'
            }}
            onClick={() => { setIsSignUp(true); setErrorMsg(""); }}
          >
            <UserPlus size={15} className="me-1" /> সাইন আপ
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleEmailAuth}>
          <div className="mb-3">
            <label className="form-label text-light small font-display fw-medium mb-1">
              📧 ইমেইল ঠিকানা (Email)
            </label>
            <div className="position-relative">
              <input
                type="email"
                placeholder="name@example.com"
                className="form-control-dark w-100 ps-5"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
              <Mail size={18} className="position-absolute text-muted" style={{ left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label text-light small font-display fw-medium mb-1">
              🔒 পাসওয়ার্ড (Password)
            </label>
            <div className="position-relative">
              <input
                type="password"
                placeholder="••••••••"
                className="form-control-dark w-100 ps-5"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              <Lock size={18} className="position-absolute text-muted" style={{ left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
            {isSignUp && (
              <small className="text-muted mt-1 d-block" style={{ fontSize: '0.75rem' }}>
                পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে
              </small>
            )}
          </div>

          <button
            type="submit"
            className="btn-emerald w-100 py-3 font-display rounded-xl box-glow fs-6 mb-3"
            disabled={loading}
          >
            {loading ? (
              <div className="d-flex align-items-center justify-content-center gap-2">
                <span className="spinner-border spinner-border-sm" role="status"></span>
                <span>প্রসেসিং হচ্ছে...</span>
              </div>
            ) : (
              <div className="d-flex align-items-center justify-content-center gap-2">
                {isSignUp ? <UserPlus size={18} /> : <LogIn size={18} />}
                <span>{isSignUp ? "অ্যাকাউন্ট তৈরি করুন" : "সাইন ইন করুন"}</span>
              </div>
            )}
          </button>
        </form>

        <div className="position-relative my-4 text-center">
          <hr style={{ borderColor: 'var(--color-rule)' }} />
          <span className="position-absolute top-50 start-50 translate-middle px-3 text-muted small" style={{ backgroundColor: 'var(--color-paper-surface)', fontSize: '0.78rem' }}>
            অথবা
          </span>
        </div>

        {/* Google OAuth Button */}
        <button
          type="button"
          onClick={handleGoogle}
          disabled={loading}
          className="btn-glass w-100 py-25 rounded-xl font-display text-center gap-2 border-0"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.06)' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          <span className="small text-white">Google দিয়ে কন্টিনিউ করুন</span>
        </button>

      </div>

    </div>
  );
}
