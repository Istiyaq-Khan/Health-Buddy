import React from 'react';
import { 
  Activity, 
  Sparkles, 
  Target, 
  Cpu, 
  Award, 
  Heart, 
  CheckCircle2, 
  Code2, 
  Server, 
  ShieldCheck, 
  Bot 
} from 'lucide-react';

const About = () => {
  return (
    <div className="min-vh-100 font-display bg-dark text-white py-5">
      <div className="container px-3 px-md-4">
        
        {/* Header Section */}
        <div className="text-center mb-5 max-w-2xl mx-auto">
          <div 
            className="d-inline-flex align-items-center justify-content-center rounded-circle box-glow mb-3"
            style={{ width: '56px', height: '56px', background: 'linear-gradient(135deg, #10b981, #059669)', color: '#022c22' }}
          >
            <Activity size={32} strokeWidth={2.5} />
          </div>
          <h1 className="display-4 fw-extrabold text-white mb-2 tracking-tight">
            স্বাস্থ্যসাথী <span className="text-gradient-emerald">AI Project</span>
          </h1>
          <p className="lead text-muted mx-auto font-display" style={{ maxWidth: '600px' }}>
            আপনার হাতের মুঠোয় স্মার্ট স্বাস্থ্য সহকারী 🤖💊
          </p>
        </div>

        {/* Info Grid */}
        <div className="row g-4 max-w-5xl mx-auto">
          
          {/* Features Showcase */}
          <div className="col-12 col-md-6">
            <div className="glass-card p-4 h-100 border-0 box-glow" style={{ backgroundColor: 'rgba(22, 36, 32, 0.85)' }}>
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
                  <Sparkles size={24} />
                </div>
                <div>
                  <h4 className="fw-bold text-white mb-0">🌟 আমাদের ফিচারসমূহ</h4>
                  <small className="text-muted">প্রধান সুবিধাসমূহ</small>
                </div>
              </div>

              <ul className="list-unstyled d-flex flex-column gap-3 mb-0">
                {[
                  { title: "🔍 লক্ষণ সিলেকশন:", desc: "বাটনে ক্লিক করে সহজে লক্ষণ বেছে নেওয়ার ব্যবস্থা।" },
                  { title: "🤖 রোগ অনুমান:", desc: "Gemini AI দিয়ে সেকেন্ডে সম্ভাব্য রোগ বিশ্লেষণ।" },
                  { title: "💊 ঔষধ ও ভিটামিন:", desc: "দরকারি ভিটামিন, প্রাথমিক ওষুধ বা ঘরোয়া টিপস।" },
                  { title: "📅 ডাক্তারের এলার্ট:", desc: "গুরুতর লক্ষণে বিশেষজ্ঞ ডাক্তার দেখানোর নোটিফিকেশন।" },
                  { title: "📊 হেলথ হিস্টোরি:", desc: "সকল রিপোর্ট ফায়ারবেসে নিরাপদভাবে সংরক্ষিত।" },
                  { title: "🌐 বাংলা + EN সাপোর্ট:", desc: "সহজ ও সাবলীল দ্বিভাষিক ইউজার ইন্টারফেস।" }
                ].map((item, i) => (
                  <li key={i} className="d-flex align-items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0 mt-1" style={{ color: '#10b981' }} />
                    <div>
                      <strong className="text-white small">{item.title} </strong>
                      <span className="text-muted small">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Goal & Tech Stack */}
          <div className="col-12 col-md-6 d-flex flex-column gap-4">
            
            {/* Project Goal */}
            <div className="glass-card p-4 border-0" style={{ backgroundColor: 'rgba(22, 36, 32, 0.85)' }}>
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(6, 182, 212, 0.15)', color: '#06b6d4' }}>
                  <Target size={24} />
                </div>
                <div>
                  <h5 className="fw-bold text-white mb-0">🎯 প্রজেক্টের লক্ষ্য</h5>
                  <small className="text-muted">Mission & Vision</small>
                </div>
              </div>
              <p className="text-light leading-relaxed mb-0 small">
                স্কুলের শিক্ষার্থী বা প্রত্যন্ত অঞ্চলের যে কেউ যেন সহজেই যেকোনো শারীরিক উপসর্গ দেখা দিলে তাৎক্ষণিক প্রাথমিক ধারণা পেতে পারে।
              </p>
            </div>

            {/* Tech Stack */}
            <div className="glass-card p-4 border-0" style={{ backgroundColor: 'rgba(22, 36, 32, 0.85)' }}>
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>
                  <Cpu size={24} />
                </div>
                <div>
                  <h5 className="fw-bold text-white mb-0">🚀 ব্যবহৃত টেকনোলজি (Tech Stack)</h5>
                  <small className="text-muted">Architecture</small>
                </div>
              </div>

              <div className="row g-2">
                <div className="col-6">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.04)' }}>
                    <div className="d-flex align-items-center gap-1 text-emerald-400 small fw-bold" style={{ color: '#34d399' }}>
                      <Code2 size={14} /> Frontend:
                    </div>
                    <span className="small text-muted">React, Vite, Bootstrap, Lucide</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.04)' }}>
                    <div className="d-flex align-items-center gap-1 text-cyan small fw-bold" style={{ color: '#06b6d4' }}>
                      <Server size={14} /> Backend:
                    </div>
                    <span className="small text-muted">Node.js, Express.js, MongoDB</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.04)' }}>
                    <div className="d-flex align-items-center gap-1 text-warning small fw-bold" style={{ color: '#f59e0b' }}>
                      <ShieldCheck size={14} /> Auth:
                    </div>
                    <span className="small text-muted">Firebase Authentication</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.04)' }}>
                    <div className="d-flex align-items-center gap-1 text-danger small fw-bold" style={{ color: '#f43f5e' }}>
                      <Bot size={14} /> AI Model:
                    </div>
                    <span className="small text-muted">Google Gemini Pro API</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Credits & Developer Banner */}
          <div className="col-12">
            <div className="glass-panel p-4 p-md-5 box-glow text-center border-0" style={{ backgroundColor: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <div className="d-inline-flex p-3 rounded-circle mb-3" style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#10b981' }}>
                <Award size={32} />
              </div>
              <h4 className="fw-bold text-white mb-2">📌 আইসিটি অলিম্পিয়াড ২০২৫ প্রজেক্ট</h4>
              <p className="text-light mb-1 font-display">
                🏫 <b>প্রতিষ্ঠান:</b> Scholarshome, Majortila, Sylhet
              </p>
              <p className="text-emerald-400 mb-0 font-display fw-semibold" style={{ color: '#34d399' }}>
                🧑‍💻 <b>ডেভেলপার:</b> Istiyaq Khan Razin এবং Team Xenon ❤️
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default About;
