import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { auth } from "../firebase/firebaseConfig";
import { API_BASE_URL } from "../config";
import { 
  BarChart3, 
  RefreshCw, 
  Plus, 
  Activity, 
  Calendar, 
  Pill, 
  Stethoscope, 
  AlertTriangle, 
  ShieldAlert,
  Search,
  Sparkles,
  FileText
} from "lucide-react";

export default function Dashboard() {
  const [history, setHistory] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const fetchHistory = async () => {
    if (!user) return;
    setRefreshing(true);
    try {
      const token = await user.getIdToken();
      const res = await axios.get(
        `${API_BASE_URL}/api/health/history`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setHistory(res.data || []);
    } catch (err) {
      console.error("History fetch error:", err);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (user) fetchHistory();
  }, [user]);

  if (loading) {
    return (
      <div className="min-vh-100 font-display d-flex flex-column align-items-center justify-content-center bg-dark text-white p-4">
        <div className="spinner-border text-emerald" style={{ color: '#10b981' }} role="status"></div>
        <p className="mt-3 text-muted">ড্যাশবোর্ড লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container py-5 text-center font-display">
        <div className="glass-panel p-5 mx-auto box-glow" style={{ maxWidth: '420px' }}>
          <BarChart3 size={48} className="text-emerald-400 mb-3" style={{ color: '#10b981' }} />
          <h4 className="fw-bold text-white mb-2">লগইন প্রয়োজন</h4>
          <p className="text-muted small mb-4">আপনার স্বাস্থ্য হিস্টোরি দেখতে একাউন্টে লগইন করুন।</p>
          <Link to="/login" className="btn-emerald text-decoration-none">লগইন করুন</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 font-display bg-dark text-white py-5">
      <div className="container px-3 px-md-4">
        
        {/* Header Title & Actions */}
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4 pb-3 border-bottom" style={{ borderColor: 'var(--color-rule)' }}>
          <div>
            <h2 className="display-6 fw-bold text-white mb-1 d-flex align-items-center gap-2">
              <BarChart3 className="text-emerald-400" style={{ color: '#10b981' }} />
              স্বাস্থ্য ড্যাশবোর্ড (Health Records)
            </h2>
            <p className="text-muted small mb-0">
              আপনার পূর্ববর্তী সকল লক্ষণ এনালাইসিস ও ডায়াগনস্টিক রিপোর্ট
            </p>
          </div>

          <div className="d-flex align-items-center gap-2">
            <button
              onClick={fetchHistory}
              disabled={refreshing}
              className="btn btn-glass btn-sm rounded-pill font-display d-flex align-items-center gap-2"
            >
              <RefreshCw size={15} className={refreshing ? 'animate-spin' : ''} />
              <span>{refreshing ? 'রিফ্রেশ হচ্ছে...' : 'রিফ্রেশ'}</span>
            </button>

            <Link to="/analyze" className="btn-emerald btn-sm rounded-pill text-decoration-none d-flex align-items-center gap-2">
              <Plus size={16} />
              <span>নতুন এনালাইসিস</span>
            </Link>
          </div>
        </div>

        {/* Stats Summary Cards */}
        <div className="row g-3 mb-5">
          <div className="col-12 col-sm-6 col-md-4">
            <div className="glass-card p-4 border-0">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="small text-muted">মোট হেলথ চেক</span>
                <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
                  <FileText size={20} />
                </div>
              </div>
              <div className="fs-2 fw-extrabold text-white">{history.length} টি</div>
              <small className="text-emerald-400" style={{ color: '#34d399', fontSize: '0.78rem' }}>ক্লাউডে সংরক্ষিত রিপোর্ট</small>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-4">
            <div className="glass-card p-4 border-0">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="small text-muted">সর্বশেষ চেক</span>
                <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(6, 182, 212, 0.15)', color: '#06b6d4' }}>
                  <Calendar size={20} />
                </div>
              </div>
              <div className="fs-5 fw-bold text-white text-truncate">
                {history.length > 0 ? new Date(history[0].timestamp || history[0].createdAt).toLocaleDateString() : '—'}
              </div>
              <small className="text-muted" style={{ fontSize: '0.78rem' }}>তাং আপডেট</small>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-4">
            <div className="glass-card p-4 border-0">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="small text-muted">এআই মডেল স্ট্যাটাস</span>
                <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
                  <Sparkles size={20} />
                </div>
              </div>
              <div className="fs-5 fw-bold text-emerald-400" style={{ color: '#34d399' }}>সক্রিয় (Active)</div>
              <small className="text-muted" style={{ fontSize: '0.78rem' }}>Google Gemini Pro API</small>
            </div>
          </div>
        </div>

        {/* History Reports Feed */}
        {history.length === 0 ? (
          <div className="glass-panel p-5 text-center box-glow my-4 mx-auto" style={{ maxWidth: '520px' }}>
            <Activity size={48} className="text-emerald-400 mb-3 opacity-50" style={{ color: '#10b981' }} />
            <h4 className="fw-bold text-white mb-2">কোন পূর্ববর্তী এনালাইসিস নেই</h4>
            <p className="text-muted small mb-4">আপনার প্রথম স্বাস্থ্য এনালাইসিস সম্পন্ন করতে নিচের বাটনে ক্লিক করুন।</p>
            <Link to="/analyze" className="btn-emerald text-decoration-none">
              <Search size={18} />
              <span>এনালাইসিস শুরু করুন</span>
            </Link>
          </div>
        ) : (
          <div className="d-flex flex-column gap-4">
            {history.map((h, i) => {
              let parsed = h.result;
              try {
                if (typeof h.result === "string") {
                  parsed = JSON.parse(h.result.replace(/```json\s*|\s*```/g, ""));
                }
              } catch (err) {}

              return (
                <div key={i} className="glass-card p-4 border-0 position-relative box-glow" style={{ backgroundColor: 'rgba(22, 36, 32, 0.85)' }}>
                  
                  {/* Card Top */}
                  <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 pb-3 mb-3 border-bottom" style={{ borderColor: 'var(--color-rule)' }}>
                    <div className="d-flex align-items-center gap-2">
                      <span className="badge-emerald font-mono">Report #{history.length - i}</span>
                      <span className="text-muted small">
                        📅 {new Date(h.timestamp || h.createdAt).toLocaleString()}
                      </span>
                    </div>
                    {parsed && parsed.doctorAlert && (
                      <span className="badge-danger">
                        <AlertTriangle size={13} /> ডাক্তার পরামর্শ সুপারিশকৃত
                      </span>
                    )}
                  </div>

                  {/* Symptoms Listed */}
                  <div className="mb-3">
                    <span className="small text-muted font-mono text-uppercase">উপসর্গ/লক্ষণ (Symptoms):</span>
                    <div className="d-flex flex-wrap gap-2 mt-1">
                      {Array.isArray(h.symptoms) ? h.symptoms.map((s, idx) => (
                        <span key={idx} className="btn-glass btn-sm border-0 py-1 px-3" style={{ fontSize: '0.82rem' }}>
                          🩺 {s}
                        </span>
                      )) : (
                        <span className="text-light fw-medium">{h.symptoms}</span>
                      )}
                    </div>
                  </div>

                  {/* Parsed Result Breakdown */}
                  {typeof parsed === "object" && parsed !== null ? (
                    <div className="row g-3 mt-2">
                      {parsed.diseases && (
                        <div className="col-12 col-md-6">
                          <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(244, 63, 94, 0.08)', border: '1px solid rgba(244, 63, 94, 0.2)' }}>
                            <strong className="text-danger small d-block mb-1">🦠 সম্ভাব্য রোগ:</strong>
                            <ul className="mb-0 ps-3 small text-light">
                              {parsed.diseases.map((d, j) => <li key={j}>{d}</li>)}
                            </ul>
                          </div>
                        </div>
                      )}

                      {parsed.medicines && (
                        <div className="col-12 col-md-6">
                          <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                            <strong className="text-emerald-400 small d-block mb-1" style={{ color: '#34d399' }}>💊 প্রাথমিক ঔষধ:</strong>
                            <ul className="mb-0 ps-3 small text-light">
                              {parsed.medicines.map((m, j) => <li key={j}>{m}</li>)}
                            </ul>
                          </div>
                        </div>
                      )}

                      {parsed.tips && (
                        <div className="col-12">
                          <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--color-rule)' }}>
                            <strong className="text-muted small d-block mb-1">🏠 ঘরোয়া পরামর্শ:</strong>
                            <p className="mb-0 small text-light">{parsed.tips}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <pre className="p-3 rounded-xl small text-light font-mono mb-0" style={{ backgroundColor: 'rgba(9, 16, 14, 0.8)', border: '1px solid var(--color-rule)', whiteSpace: 'pre-wrap' }}>
                      {parsed}
                    </pre>
                  )}

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
