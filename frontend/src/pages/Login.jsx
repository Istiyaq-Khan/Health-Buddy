import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("✅ Account created successfully!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate("/dashboard");
    } catch (err) {
      console.error("Auth error:", err);
      let errorMessage = "Authentication failed";
      if (err.code === "auth/user-not-found") {
        errorMessage = "Account not found. Please sign up first.";
      } else if (err.code === "auth/wrong-password") {
        errorMessage = "Incorrect password.";
      } else if (err.code === "auth/email-already-in-use") {
        errorMessage = "Email already in use. Please sign in instead.";
      } else if (err.code === "auth/weak-password") {
        errorMessage = "Password should be at least 6 characters.";
      } else if (err.code === "auth/invalid-email") {
        errorMessage = "Please enter a valid email address.";
      } else {
        errorMessage = err.message;
      }
      alert(`❌ ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (err) {
      console.error("Google auth error:", err);
      alert("❌ Google login failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center p-4"
      style={{ minHeight: "100vh", backgroundColor: "#0B0F0E" }}
    >
      <div className="card shadow-lg border border-success" style={{ backgroundColor: "#121212", color: "#FFFFFF", maxWidth: "450px", width: "100%" }}>
        <div className="card-header text-center border-bottom border-success">
          <h3 className="mb-0 text-success">
            {isSignUp ? "📝 Sign Up" : "🔐 Login"}
          </h3>
          <p className="mb-0 text-muted">স্বাস্থ্যসাথী</p>
        </div>
        <div className="card-body">
          <form onSubmit={handleEmailAuth} className="mt-3">
            <div className="mb-3">
              <label className="form-label text-success">📧 Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="form-control bg-dark text-white border-success"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="mb-3">
              <label className="form-label text-success">🔒 Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="form-control bg-dark text-white border-success"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              {isSignUp && (
                <small className="text-muted">
                  Password should be at least 6 characters
                </small>
              )}
            </div>
            <button 
              type="submit" 
              className="btn btn-success w-100 mb-3"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  {isSignUp ? "Creating Account..." : "Signing In..."}
                </>
              ) : (
                isSignUp ? "📝 Create Account" : "🔐 Sign In"
              )}
            </button>
          </form>
          
          <div className="text-center mb-3">
            <button
              type="button"
              className="btn btn-link text-success"
              onClick={() => setIsSignUp(!isSignUp)}
              disabled={loading}
            >
              {isSignUp 
                ? "Already have an account? Sign In" 
                : "Don't have an account? Sign Up"
              }
            </button>
          </div>
          
          <hr className="border-success" />
          
          <button 
            onClick={handleGoogle} 
            className="btn btn-outline-success w-100"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Processing...
              </>
            ) : (
              "🌐 Continue with Google"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
