import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';
import { 
  Activity, 
  Sparkles, 
  Search, 
  BarChart3, 
  ShieldCheck, 
  Stethoscope, 
  MapPin, 
  ChevronRight, 
  HeartPulse, 
  CheckCircle2, 
  Zap, 
  Lock, 
  Users
} from 'lucide-react';

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsub();
  }, []);

  const features = [
    {
      icon: Sparkles,
      title: 'AI লক্ষণ বিশ্লেষণ',
      desc: 'Google Gemini Pro AI দ্বারা পরিচালিত। লক্ষণ দিলে কয়েক সেকেন্ডে সম্ভাব্য রোগের ধারণা ও পরামর্শ পাওয়া যায়।'
    },
    {
      icon: Stethoscope,
      title: 'লাইভ AI ডাক্তার চ্যাট',
      desc: 'চিকিৎসা সংক্রান্ত যেকোনো প্রশ্ন বা পরামর্শের জন্য ২৪/৭ এআই ডাক্তারের সাথে বাংলা বা ইংরেজিতে চ্যাট করুন।'
    },
    {
      icon: MapPin,
      title: 'আশেপাশের হাসপাতাল',
      desc: 'আপনার জিও-লোকেশন অনুযায়ী ১৫ কিলোমিটার ব্যাসার্ধের সকল হাসপাতাল ও হেলথ সেন্টার খুঁজুন।'
    },
    {
      icon: BarChart3,
      title: 'স্মার্ট হিস্টোরি ট্র্যাক',
      desc: 'আপনার সকল পূর্ববর্তী লক্ষণ ও স্বাস্থ্য রিপোর্টের হিসাব সুরক্ষিতভাবে ক্লাউডে সংরক্ষিত থাকবে।'
    },
    {
      icon: ShieldCheck,
      title: 'সুরক্ষিত ফায়ারবেস অথ',
      desc: 'আপনার ব্যক্তিগত ও স্বাস্থ্য বিষয়ক সকল ডেটা এনক্রিপ্টেড এবং সম্পূর্ণ নিরাপদ।'
    }
  ];

  const benefits = [
    { icon: Zap, title: "তাৎক্ষণিক স্বাস্থ্য পরামর্শ", desc: "কোন দীর্ঘ সিরিয়াল ছাড়া সেকেন্ডের মধ্যে লক্ষণ এনালাইসিস।" },
    { icon: HeartPulse, title: "ভিটামিন ও ঘরোয়া টিপস", desc: "জরুরি প্রাথমিক চিকিৎসা এবং সঠিক পুষ্টি উপাদানের তথ্য।" },
    { icon: Users, title: "সকলের জন্য সহজ ও ফ্রি", desc: "প্রান্তিক অঞ্চল থেকে শহর—যে কেউ সহজে ব্যবহার করতে পারবে।" },
    { icon: Lock, title: "নিরাপদ ও ব্যক্তিগত", desc: "আপনার অনুমতি ব্যতীত কারো সাথে স্বাস্থ্য তথ্য শেয়ার করা হয় না।" }
  ];

  return (
    <div className="font-display bg-dark min-vh-100 text-white overflow-hidden">
      
      {/* Hero Section */}
      <section className="position-relative py-5 py-lg-6" style={{
        background: 'radial-gradient(circle at 50% 20%, rgba(16, 185, 129, 0.15) 0%, rgba(9, 16, 14, 1) 70%)'
      }}>
        <div className="container py-4 text-center position-relative" style={{ zIndex: 2 }}>
          
          {/* Badge Pill */}
          <div className="d-inline-flex align-items-center gap-2 px-3 py-15 rounded-pill mb-4 glass-card border-0 animate__animated animate__fadeInDown">
            <span className="badge-emerald">NEW 2025</span>
            <span className="small text-light">স্মার্ট AI হেলথ অ্যাসিস্টেন্ট অ্যাপ</span>
            <ChevronRight size={14} className="text-emerald-400" style={{ color: '#10b981' }} />
          </div>

          {/* Main Hero Headline */}
          <h1 className="display-3 fw-extrabold mb-3 tracking-tight text-white animate__animated animate__fadeInUp">
            আপনার স্বাস্থ্যের বিশ্বস্ত সাথী <br />
            <span className="text-gradient-emerald glow-emerald">স্বাস্থ্যসাথী</span>
          </h1>

          <p className="lead mx-auto mb-4 font-display text-light" style={{ maxWidth: '680px', fontSize: '1.15rem', lineHeight: '1.7', opacity: 0.95 }}>
            লক্ষণ দেখেই সম্ভাব্য রোগের ধারণা, প্রয়োজনীয় ভিটামিন, প্রাথমিক ঔষধ এবং ডাক্তারের পরামর্শ পান এক ক্লিকেই। আধুনিক কৃত্রিম বুদ্ধিমত্তা চালিত হেলথ কেয়ার।
          </p>

          {/* Action Buttons */}
          <div className="d-flex flex-wrap justify-content-center gap-3 mb-5 animate__animated animate__fadeInUp">
            {user ? (
              <>
                <Link to="/analyze" className="btn-emerald py-3 px-4 font-display fs-6 box-glow text-decoration-none">
                  <Search size={20} />
                  <span>লক্ষণ বিশ্লেষণ করুন</span>
                </Link>
                <Link to="/dashboard" className="btn-glass py-3 px-4 font-display fs-6 text-decoration-none">
                  <BarChart3 size={20} />
                  <span>হেলথ হিস্টোরি দেখুন</span>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-emerald py-3 px-4 font-display fs-6 box-glow text-decoration-none">
                  <Activity size={20} />
                  <span>এখনই শুরু করুন</span>
                </Link>
                <Link to="/login" className="btn-glass py-3 px-4 font-display fs-6 text-decoration-none">
                  <span>সাইন ইন / অ্যাকাউন্ট খুলুন</span>
                </Link>
              </>
            )}
          </div>

          {/* Mini Stats Banner */}
          <div className="row g-3 justify-content-center max-w-4xl mx-auto mt-4">
            <div className="col-6 col-md-3">
              <div className="glass-panel p-3 text-center">
                <div className="fw-bold fs-4 text-emerald-400" style={{ color: '#34d399' }}>২৪/৭</div>
                <div className="small text-muted">AI স্বাস্থ্য সেবা</div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="glass-panel p-3 text-center">
                <div className="fw-bold fs-4 text-emerald-400" style={{ color: '#34d399' }}>১০০%</div>
                <div className="small text-muted">সুরক্ষিত ও গোপনীয়</div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="glass-panel p-3 text-center">
                <div className="fw-bold fs-4 text-emerald-400" style={{ color: '#34d399' }}>১৫+ কিমি</div>
                <div className="small text-muted">হাসপাতাল ট্র্যাকার</div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="glass-panel p-3 text-center">
                <div className="fw-bold fs-4 text-emerald-400" style={{ color: '#34d399' }}>বাংলা + EN</div>
                <div className="small text-muted">দ্বিভাষিক সাপোর্ট</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Main Features Grid */}
      <section className="py-5 bg-dark">
        <div className="container py-4">
          <div className="text-center mb-5">
            <h2 className="display-6 fw-bold text-white mb-2">
              কেন <span className="text-gradient-emerald">স্বাস্থ্যসাথী</span> সেরা?
            </h2>
            <p className="text-muted font-display mx-auto" style={{ maxWidth: '560px' }}>
              আমাদের অ্যাপে থাকা আধুনিক ফিচারগুলো আপনার স্বাস্থ্য সুরক্ষায় রাখবে প্রধান ভূমিকা
            </p>
          </div>

          <div className="row g-4 justify-content-center">
            {features.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div className="col-12 col-md-6 col-lg-4" key={idx}>
                  <div className="glass-card p-4 h-100 d-flex flex-column justify-content-between">
                    <div>
                      <div className="p-3 rounded-xl d-inline-block mb-3 box-glow" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
                        <Icon size={26} />
                      </div>
                      <h5 className="fw-bold text-white mb-2 font-display">{item.title}</h5>
                      <p className="text-muted small leading-relaxed font-display mb-0">{item.desc}</p>
                    </div>
                    <div className="mt-4 pt-3 border-top d-flex align-items-center justify-content-between" style={{ borderColor: 'var(--color-rule)' }}>
                      <span className="small text-emerald-400 font-semibold" style={{ color: '#34d399' }}>এক্সপ্লোর করুন</span>
                      <ChevronRight size={16} className="text-emerald-400" style={{ color: '#34d399' }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Showcase Section */}
      <section className="py-5" style={{ backgroundColor: 'var(--color-paper-surface)' }}>
        <div className="container py-4">
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-6">
              <div className="pe-lg-4">
                <span className="badge-emerald mb-3">স্বাস্থ্য সচেতনতা</span>
                <h2 className="display-5 fw-bold text-white mb-4 leading-snug">
                  ডিজিটাল যুগে আপনার <br />
                  <span className="text-gradient-emerald">ব্যক্তিগত স্বাস্থ্য সহকারী</span>
                </h2>
                <p className="text-muted lead mb-4 font-display" style={{ fontSize: '1.05rem' }}>
                  গ্রামে বা শহরে, দিনে বা রাতে—যেকোনো সময় যেকোনো শারীরিক সমস্যা বুঝতে বিশেষজ্ঞ প্রযুক্তির সাহায্য নিন।
                </p>

                <div className="row g-3">
                  {benefits.map((b, i) => {
                    const BIcon = b.icon;
                    return (
                      <div className="col-12 col-sm-6" key={i}>
                        <div className="d-flex align-items-start gap-3 p-3 rounded-xl glass-card border-0" style={{ backgroundColor: 'rgba(9, 16, 14, 0.6)' }}>
                          <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
                            <BIcon size={20} />
                          </div>
                          <div>
                            <h6 className="fw-bold text-white mb-1 small">{b.title}</h6>
                            <p className="text-muted mb-0" style={{ fontSize: '0.78rem' }}>{b.desc}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-6">
              <div className="glass-panel p-4 p-md-5 box-glow border-0" style={{ backgroundColor: 'rgba(22, 36, 32, 0.85)' }}>
                <h4 className="fw-bold text-white mb-4 d-flex align-items-center gap-2">
                  <HeartPulse className="text-emerald-400" style={{ color: '#10b981' }} />
                  স্বাস্থ্যসাথী কিভাবে উপকারে আসবে?
                </h4>
                <ul className="list-unstyled d-flex flex-column gap-3 mb-0 font-display">
                  {[
                    "📱 যেকোনো স্মার্টফোন বা পিসি থেকেই সরাসরি অ্যাক্সেসযোগ্য",
                    "🤖 লক্ষণ অনুযায়ী কয়েক সেকেন্ডে সম্ভাব্য রোগের আইডিয়া",
                    "💊 ভিটামিন, প্রাথমিক ওষুধ এবং স্বাস্থ্য সচেতনতা টিপস",
                    "🏥 আশেপাশের ১৫ কিমির মধ্যে সকল ক্লিনিক ও হাসপাতাল ট্র্যাকিং",
                    "🧑‍⚕️ জটিল লক্ষণ দেখা দিলে সরাসরি ডাক্তার দেখানোর সতর্কতা",
                    "🔒 ক্লাউডে সম্পূর্ণ সুরক্ষিত হেলথ রেকর্ড সংরক্ষণের সুবিধা"
                  ].map((text, idx) => (
                    <li key={idx} className="d-flex align-items-center gap-3 text-light">
                      <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0" style={{ color: '#10b981' }} />
                      <span style={{ fontSize: '0.95rem' }}>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 border-top text-center" style={{ backgroundColor: 'var(--color-paper)', borderColor: 'var(--color-rule)' }}>
        <div className="container">
          <p className="text-muted small mb-1">
            © 2025-2026 স্বাস্থ্যসাথী (Health Buddy) | তৈরি করেছে <span className="text-emerald-400 fw-semibold" style={{ color: '#34d399' }}>Team Xenon</span> 💚
          </p>
          <small className="text-muted opacity-75" style={{ fontSize: '0.75rem' }}>
            ICT Olympiad 2025 Project • Scholarshome, Majortila, Sylhet
          </small>
        </div>
      </footer>

    </div>
  );
}
