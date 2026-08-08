import React from "react";
import { 
  AlertTriangle, 
  Activity, 
  Pill, 
  Heart, 
  Stethoscope, 
  ShieldAlert, 
  CheckCircle2, 
  Info,
  Sparkles
} from "lucide-react";

const ResultCard = ({ result }) => {
  if (!result) {
    return (
      <div className="text-center py-5 text-muted font-display">
        <Info size={32} className="mb-2 text-emerald-400 opacity-50" />
        <p className="mb-0">কোন ফলাফল পাওয়ার জন্য লক্ষণ সাবমিট করুন।</p>
      </div>
    );
  }

  // Parse if result is a JSON string
  let parsed = result;
  if (typeof result === "string") {
    try {
      parsed = JSON.parse(result.replace(/```json\s*|\s*```/g, ""));
    } catch (e) {
      parsed = result;
    }
  }

  return (
    <div className="w-100 font-display animate__animated animate__fadeIn">
      {/* Header Banner */}
      <div className="d-flex align-items-center justify-content-between p-3 mb-4 rounded-xl" style={{ 
        backgroundColor: 'rgba(16, 185, 129, 0.12)', 
        border: '1px solid rgba(16, 185, 129, 0.3)' 
      }}>
        <div className="d-flex align-items-center gap-2">
          <Sparkles className="text-emerald-400" size={20} style={{ color: '#10b981' }} />
          <span className="fw-semibold text-white">AI মেডিকেল ডায়াগনস্টিক রিপোর্ট</span>
        </div>
        <span className="badge-emerald">
          <CheckCircle2 size={13} /> ভেরিফায়েড এআই মডেল
        </span>
      </div>

      {/* Emergency Doctor Alert Banner if triggered */}
      {parsed.doctorAlert && (
        <div className="alert border-0 rounded-xl p-3 mb-4 d-flex align-items-start gap-3 box-glow" style={{
          backgroundColor: 'rgba(244, 63, 94, 0.15)',
          borderLeft: '4px solid #f43f5e',
          color: '#f87171'
        }}>
          <ShieldAlert size={24} className="flex-shrink-0 mt-1 text-danger" />
          <div>
            <h6 className="fw-bold mb-1 text-danger">⚠️ জরুরি সতর্কতা (Medical Alert)</h6>
            <p className="small mb-0 opacity-90">
              আপনার লক্ষণগুলো কিছু গুরুতর স্বাস্থ্য ঝুঁকির ইঙ্গিত দেয়। দেরি না করে অতিসত্বর একজন বিশেষজ্ঞ ডাক্তারের পরামর্শ নিন বা নিকটস্থ হাসপাতালে যোগাযোগ করুন।
            </p>
          </div>
        </div>
      )}

      {/* Structured Sections */}
      {typeof parsed === "object" && parsed !== null ? (
        <div className="row g-3">
          
          {/* Diseases Card */}
          {parsed.diseases && parsed.diseases.length > 0 && (
            <div className="col-12 col-md-6">
              <div className="glass-card p-4 h-100 border-0" style={{ backgroundColor: 'rgba(22, 36, 32, 0.7)', border: '1px solid var(--color-rule)' }}>
                <div className="d-flex align-items-center gap-2 mb-3">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(244, 63, 94, 0.15)', color: '#f43f5e' }}>
                    <Activity size={20} />
                  </div>
                  <h6 className="fw-bold text-white mb-0">🦠 সম্ভাব্য রোগ (Possible Conditions)</h6>
                </div>
                <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
                  {parsed.diseases.map((d, i) => (
                    <li key={i} className="d-flex align-items-center gap-2 p-2 rounded-lg" style={{ backgroundColor: 'rgba(244, 63, 94, 0.08)' }}>
                      <span className="badge-danger">• Risk</span>
                      <span className="text-light fw-medium">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Medicines Card */}
          {parsed.medicines && parsed.medicines.length > 0 && (
            <div className="col-12 col-md-6">
              <div className="glass-card p-4 h-100 border-0" style={{ backgroundColor: 'rgba(22, 36, 32, 0.7)', border: '1px solid var(--color-rule)' }}>
                <div className="d-flex align-items-center gap-2 mb-3">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
                    <Pill size={20} />
                  </div>
                  <h6 className="fw-bold text-white mb-0">💊 প্রাথমিক ঔষধ (OTC Medicines)</h6>
                </div>
                <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
                  {parsed.medicines.map((m, i) => (
                    <li key={i} className="d-flex align-items-center gap-2 p-2 rounded-lg" style={{ backgroundColor: 'rgba(16, 185, 129, 0.08)' }}>
                      <span className="badge-emerald">OTC</span>
                      <span className="text-light fw-medium">{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Vitamins Card */}
          {parsed.vitamins && parsed.vitamins.length > 0 && (
            <div className="col-12 col-md-6">
              <div className="glass-card p-4 h-100 border-0" style={{ backgroundColor: 'rgba(22, 36, 32, 0.7)', border: '1px solid var(--color-rule)' }}>
                <div className="d-flex align-items-center gap-2 mb-3">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(6, 182, 212, 0.15)', color: '#06b6d4' }}>
                    <Heart size={20} />
                  </div>
                  <h6 className="fw-bold text-white mb-0">🧪 প্রয়োজনীয় ভিটামিন ও নিউট্রিশন</h6>
                </div>
                <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
                  {parsed.vitamins.map((v, i) => (
                    <li key={i} className="d-flex align-items-center gap-2 p-2 rounded-lg" style={{ backgroundColor: 'rgba(6, 182, 212, 0.08)' }}>
                      <span className="badge-cyan">Nutrient</span>
                      <span className="text-light fw-medium">{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Advice / Doctor Specialty */}
          {parsed.advisedoctor && (
            <div className="col-12 col-md-6">
              <div className="glass-card p-4 h-100 border-0" style={{ backgroundColor: 'rgba(22, 36, 32, 0.7)', border: '1px solid var(--color-rule)' }}>
                <div className="d-flex align-items-center gap-2 mb-3">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>
                    <Stethoscope size={20} />
                  </div>
                  <h6 className="fw-bold text-white mb-0">👨‍⚕️ যে বিশেষজ্ঞ ডাক্তার দেখানো উচিত</h6>
                </div>
                <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(245, 158, 11, 0.08)', color: '#fcd34d' }}>
                  <p className="mb-0 small leading-relaxed">{parsed.advisedoctor}</p>
                </div>
              </div>
            </div>
          )}

          {/* Home Care Tips */}
          {parsed.tips && (
            <div className="col-12">
              <div className="glass-card p-4 border-0" style={{ backgroundColor: 'rgba(22, 36, 32, 0.7)', border: '1px solid var(--color-rule)' }}>
                <div className="d-flex align-items-center gap-2 mb-3">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
                    <CheckCircle2 size={20} />
                  </div>
                  <h6 className="fw-bold text-white mb-0">🏠 ঘরোয়া পরামর্শ ও যত্ন (Care Guidelines)</h6>
                </div>
                <p className="text-light leading-relaxed mb-0 p-3 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}>
                  {parsed.tips}
                </p>
              </div>
            </div>
          )}

        </div>
      ) : (
        /* Fallback for Unstructured Text Response */
        <div className="glass-card p-4 border-0">
          <pre className="text-light font-mono mb-0" style={{ whiteSpace: 'pre-wrap', fontSize: '0.9rem' }}>
            {parsed}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ResultCard;
