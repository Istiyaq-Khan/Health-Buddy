import React, { useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { API_BASE_URL } from "../config";
import { Stethoscope, Globe, Sparkles, AlertCircle, CheckCircle2 } from "lucide-react";

const QUICK_SYMPTOMS = [
  { label: "🌡️ জ্বর (Fever)", value: "fever" },
  { label: "🤕 মাথাব্যথা (Headache)", value: "headache" },
  { label: "😷 কাশি (Cough)", value: "cough" },
  { label: "🤢 বমি বমি ভাব (Nausea)", value: "nausea" },
  { label: "😴 ক্লান্তি (Fatigue)", value: "fatigue" },
  { label: "🥶 ঠাণ্ডা লাগা (Cold)", value: "cold" },
  { label: "🦵 মাংসপেশিতে ব্যথা (Muscle Pain)", value: "muscle pain" },
  { label: "🫁 শ্বাসকষ্ট (Shortness of Breath)", value: "shortness of breath" },
];

const SymptomForm = ({ setResult }) => {
  const [symptoms, setSymptoms] = useState("");
  const [language, setLanguage] = useState("bn");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleAddSymptom = (val) => {
    if (!symptoms) {
      setSymptoms(val);
    } else {
      const parts = symptoms.split(",").map(s => s.trim()).filter(Boolean);
      if (!parts.includes(val)) {
        setSymptoms([...parts, val].join(", "));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!symptoms.trim()) {
      setErrorMsg("অনুগ্রহ করে আপনার লক্ষণগুলি লিখুন বা নিচের বাটন থেকে নির্বাচন করুন।");
      return;
    }

    setLoading(true);

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        setErrorMsg("বিশ্লেষণ করতে প্রথমে লগইন করুন।");
        setLoading(false);
        return;
      }

      const token = await user.getIdToken();

      const res = await axios.post(
        `${API_BASE_URL}/api/health/analyze`,
        { symptoms: symptoms.split(",").map((s) => s.trim()).filter(Boolean) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResult(res.data);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "সার্ভার এরর। আবার চেষ্টা করুন।";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-100">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h3 className="fw-bold font-display text-white mb-1 d-flex align-items-center gap-2">
            <Stethoscope className="text-emerald-400" style={{ color: '#10b981' }} size={24} />
            লক্ষণ ইনপুট ফর্ম
          </h3>
          <p className="text-muted small mb-0 font-display">
            আপনার অনুভূত শারীরিক সমস্যাগুলি কমা (,) দিয়ে পৃথক করে লিখুন
          </p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <Globe size={16} className="text-muted" />
          <select
            className="form-select-dark form-select-sm font-display rounded-pill px-3 py-1"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{ fontSize: '0.82rem' }}
          >
            <option value="bn">🇧🇩 বাংলা</option>
            <option value="en">🇺🇸 English</option>
          </select>
        </div>
      </div>

      {errorMsg && (
        <div className="alert border-0 rounded-xl mb-4 d-flex align-items-center gap-2" style={{ backgroundColor: 'rgba(244, 63, 94, 0.15)', color: '#f43f5e' }}>
          <AlertCircle size={18} className="flex-shrink-0" />
          <span className="small font-display">{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Quick Symptom Chips */}
        <div className="mb-3">
          <label className="form-label text-light small font-display fw-semibold mb-2">
            ⚡ দ্রুত সিলেক্ট করুন (Quick Symptoms):
          </label>
          <div className="d-flex flex-wrap gap-2">
            {QUICK_SYMPTOMS.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleAddSymptom(chip.value)}
                className="btn btn-sm btn-glass rounded-pill border-0 font-display text-white"
                style={{
                  backgroundColor: 'rgba(22, 36, 32, 0.9)',
                  border: '1px solid var(--color-rule)',
                  fontSize: '0.8rem',
                  padding: '0.3rem 0.75rem'
                }}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        {/* Symptoms Textarea */}
        <div className="mb-4">
          <label htmlFor="symptoms-input" className="form-label text-light font-display fw-semibold mb-2">
            ✍️ বিস্তারিত লক্ষণ লিখুন:
          </label>
          <textarea
            id="symptoms-input"
            className="form-control-dark font-display w-100"
            rows="4"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="উদাহরণ: ৩ দিন ধরে তীব্র মাথাব্যথা, হালকা জ্বর, শরীর দুর্বল..."
            disabled={loading}
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-emerald w-100 py-3 font-display text-center rounded-xl fs-6 box-glow"
        >
          {loading ? (
            <div className="d-flex align-items-center justify-content-center gap-2">
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              <span>AI বিশ্লেষণ করছে...</span>
            </div>
          ) : (
            <div className="d-flex align-items-center justify-content-center gap-2">
              <Sparkles size={18} />
              <span>লক্ষণ বিশ্লেষণ শুরু করুন</span>
            </div>
          )}
        </button>
      </form>
    </div>
  );
};

export default SymptomForm;
