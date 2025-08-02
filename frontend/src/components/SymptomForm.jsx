import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";

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

      console.log("Submitting symptoms:", symptoms);
      console.log("Current user:", user);

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
      console.log("Got auth token");

      console.log("Making API request with symptoms:", symptoms.split(',').map(s => s.trim()));
      
      const res = await axios.post(
        "http://localhost:5000/api/health/analyze",
        { symptoms: symptoms.split(',').map(s => s.trim()) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API response received:", res.data);
      setResult(res.data);
      
      // Show success message
      alert("✅ Analysis completed successfully!");
    } catch (err) {
      console.error("Error details:", err.response?.data || err.message);
      const errorMessage = err.response?.data?.message || err.message || "Something went wrong. Try again!";
      alert(`😥 ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={formRef} className="container mt-5">
      <h3 className="text-center mb-4">🤖 AI Health Symptom Checker</h3>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <div className="mb-3">
          <label htmlFor="symptoms" className="form-label fw-bold">
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
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">🌐 Language</label>
          <select
            className="form-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="en">🇺🇸 English</option>
            <option value="bn">🇧🇩 বাংলা</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success w-100" disabled={loading}>
          {loading ? "Analyzing..." : "🩺 Analyze Symptoms"}
        </button>
      </form>
    </div>
  );
};

export default SymptomForm;
