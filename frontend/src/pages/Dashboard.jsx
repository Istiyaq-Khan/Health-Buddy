import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { auth } from "../firebase/firebaseConfig";
import { API_BASE_URL } from "../config";

export default function Dashboard() {
  const [history, setHistory] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user) return;

      try {
        const token = await user.getIdToken();
        const res = await axios.get(
          `${API_BASE_URL}/api/health/history`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setHistory(res.data);
      } catch (err) {
        alert(`❌ ইতিহাস লোড হয়নি: ${err.response?.data?.message || err.message}`);
      }
    };

    if (user) fetchHistory();
  }, [user]);

  if (loading) {
    return (
      <div className="container text-center mt-5 text-white">
        <div className="spinner-border text-success" role="status"></div>
        <p className="mt-2">লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container text-center mt-5 text-white">
        <h2 className="text-danger">🔐 লগইন প্রয়োজন</h2>
        <p>ড্যাশবোর্ডে ঢুকতে হলে লগইন করতে হবে।</p>
        <Link to="/login" className="btn btn-success">লগইন করো</Link>
      </div>
    );
  }

  return (
    <div className="container py-4 bg-dark text-white min-vh-100">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-success">📊 তোমার পুরোনো বিশ্লেষণ</h2>
        <button
          className="btn btn-outline-light btn-sm"
          onClick={async () => {
            try {
              const token = await user.getIdToken();
              const res = await axios.get(
                `${API_BASE_URL}/api/health/history`,
                { headers: { Authorization: `Bearer ${token}` } }
              );
              setHistory(res.data);
              alert("✅ ইতিহাস রিফ্রেশড!");
            } catch (err) {
              alert("❌ রিফ্রেশ করতে সমস্যা হয়েছে!");
            }
          }}
        >
          🔄 রিফ্রেশ
        </button>
      </div>

      {history.length === 0 ? (
        <div className="card text-center shadow-sm p-4 border-0 bg-secondary text-white">
          <h5 className="mb-2">🤔 কোন এনালাইসিস নেই!</h5>
          <p>চলো, প্রথম এনালাইসিস করে ফেলি এখনই।</p>
          <Link to="/analyze" className="btn btn-success mt-2">🔍 এনালাইসিস শুরু করো</Link>
        </div>
      ) : (
        history.map((h, i) => {
          let parsed = h.result;
          try {
            if (typeof h.result === "string") {
              parsed = JSON.parse(
                h.result.replace(/```json\s*|\s*```/g, "")
              );
            }
          } catch (err) {}

          return (
            <div key={i} className="card mb-3 border-success shadow-sm bg-secondary text-white">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="text-success mb-0">📄 এনালাইসিস #{history.length - i}</h5>
                  <small className="text-light">{new Date(h.timestamp || h.createdAt).toLocaleString()}</small>
                </div>

                <p className="mb-2"><strong>🩺 লক্ষণ:</strong> {Array.isArray(h.symptoms) ? h.symptoms.join(", ") : h.symptoms}</p>

                {typeof parsed === "object" && parsed !== null ? (
                  <div className="mt-3">
                    {parsed.diseases && (
                      <div className="mb-2">
                        <strong className="text-danger">🦠 সম্ভাব্য রোগ:</strong>
                        <ul className="ms-3 mb-0 small">
                          {parsed.diseases.map((d, j) => (
                            <li key={j}>• {d}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {parsed.vitamins && (
                      <div className="mb-2">
                        <strong className="text-success">💊 ভিটামিন:</strong>
                        <ul className="ms-3 mb-0 small">
                          {parsed.vitamins.map((v, j) => (
                            <li key={j}>• {v}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {parsed.medicines && (
                      <div className="mb-2">
                        <strong className="text-primary">💊 ঔষধ:</strong>
                        <ul className="ms-3 mb-0 small">
                          {parsed.medicines.map((m, j) => (
                            <li key={j}>• {m}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {parsed.tips && (
                      <div className="mb-2">
                        <strong className="text-info">🏠 পরামর্শ:</strong>
                        <p className="ms-3 small">{parsed.tips}</p>
                      </div>
                    )}
                    {parsed.advisedoctor && (
                      <div className="mb-2">
                        <strong className="text-info">🧑‍⚕️ কিছু ডাক্তারের ফোন নম্বর:</strong>
                        <p className="ms-3 small">{parsed.advisedoctor}</p>
                      </div>
                    )}
                    {parsed.doctorAlert && (
                      <div className="alert alert-warning py-1 px-2">
                        ⚠️ গুরুতর অবস্থায় ডাক্তারের পরামর্শ নিন!
                      </div>
                    )}
                  </div>
                ) : (
                  <pre className="bg-dark p-2 rounded small text-white border border-secondary">{parsed}</pre>
                )}
              </div>
            </div>
          );
        })
      )}

      <div className="text-center mt-5">
        <h4 className="mb-3">🔍 আবার লক্ষণ চেক করতে চাও?</h4>
        <Link to="/analyze" className="btn btn-success btn-lg shadow">চলো এনালাইসিসে</Link>
      </div>
    </div>
  );
}
