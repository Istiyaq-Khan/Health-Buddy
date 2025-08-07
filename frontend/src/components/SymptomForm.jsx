import React, { useState, useRef } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";

const colors = {
  background: "#6c757d",
  primaryGreen: "#00C853",
  secondaryGreen: "#1B5E20",
  cardBg: "#121212",
  textPrimary: "#FFFFFF",
  textSecondary: "#B0B0B0",
  highlight: "#64DD17",
  error: "#FF5252",
  warning: "#FFD600",
};

const SymptomForm = ({ setResult }) => {
  const [symptoms, setSymptoms] = useState("");
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(false);
  const formRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        alert("Please log in first!");
        setLoading(false);
        return;
      }

      if (!symptoms.trim()) {
        alert("Please enter your symptoms!");
        setLoading(false);
        return;
      }

      const token = await user.getIdToken();

      const res = await axios.post(
        "https://health-buddy-backend-gigy.onrender.com/api/health/analyze",
        { symptoms: symptoms.split(",").map((s) => s.trim()) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResult(res.data);
      alert("✅ Analysis completed successfully!");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Something went wrong. Try again!";
      alert(`😥 ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={formRef}
      className="container mt-5"
      style={{ backgroundColor: colors.background, minHeight: "50vh", paddingBottom: "2rem" }}
    >
      <h3
        className="text-center mb-4"
        style={{ color: colors.primaryGreen, fontWeight: "700" }}
      >
        🤖 AI Health Symptom Checker
      </h3>

      <form
        onSubmit={handleSubmit}
        className="card p-4 shadow-sm"
        style={{
          backgroundColor: colors.cardBg,
          border: `1.5px solid ${colors.primaryGreen}`,
          color: colors.textPrimary,
        }}
      >
        <div className="mb-3">
          <label
            htmlFor="symptoms"
            className="form-label fw-bold"
            style={{ color: colors.highlight }}
          >
            ✍️ Enter your symptoms (লক্ষণ লিখুন)
          </label>
          <textarea
            id="symptoms"
            className="form-control"
            rows="4"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="e.g. headache, fever, sore throat (separate with commas)"
            required
            style={{
              backgroundColor: "#1e1e1e",
              color: colors.textPrimary,
              borderColor: colors.primaryGreen,
            }}
          ></textarea>
        </div>

        <div className="mb-3">
          <label
            className="form-label fw-bold"
            style={{ color: colors.highlight }}
          >
            🌐 Language
          </label>
          <select
            className="form-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{
              backgroundColor: "#1e1e1e",
              color: colors.textPrimary,
              borderColor: colors.primaryGreen,
            }}
          >
            <option value="en">🇺🇸 English</option>
            <option value="bn">🇧🇩 বাংলা</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn w-100"
          disabled={loading}
          style={{
            backgroundColor: loading ? colors.secondaryGreen : colors.primaryGreen,
            color: colors.background,
            fontWeight: "700",
            border: "none",
          }}
        >
          {loading ? "Analyzing..." : "🩺 Analyze Symptoms"}
        </button>
      </form>
    </div>
  );
};

export default SymptomForm;
