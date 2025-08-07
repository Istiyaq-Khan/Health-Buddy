import { Link } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';
import { useState, useEffect } from 'react';
import './Home.css'; // Animations stay

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsub();
  }, []);

  return (
    <div className="container-fluid min-vh-100 bg-dark text-light d-flex flex-column justify-content-center align-items-center p-4 overflow-hidden">
      {/* Header */}
      <div className="text-center animated-header">
        <h1 className="display-4 fw-bold mb-3 font-bangla glow" style={{ color: '#00ff9f' }}>
          স্বাস্থ্যসাথী 🩺
        </h1>
        <p className="lead mb-4 font-bangla text-light">
          স্মার্ট হেলথ চেকিং অ্যাপ — নিজের লক্ষণ জানাও, পরামর্শ পাও!
        </p>

        {/* Auth Buttons */}
        {user ? (
          <div className="d-flex gap-3 justify-content-center">
            <Link to="/analyze" className="btn px-4 py-2 shadow-sm" style={{ backgroundColor: '#00ff9f', color: '#000' }}>
              🔍 লক্ষণ বিশ্লেষণ
            </Link>
            <Link to="/dashboard" className="btn btn-outline-light btn-lg px-4 py-2 shadow-sm">
              📊 হেলথ হিস্টোরি
            </Link>
          </div>
        ) : (
          <div className="d-flex gap-3 justify-content-center">
            <Link to="/login" className="btn px-4 py-2 shadow-sm" style={{ backgroundColor: '#00ff9f', color: '#000' }}>
              🔐 লগইন করো
            </Link>
            <Link to="/login" className="btn btn-outline-light btn-lg px-4 py-2 shadow-sm">
              📝 সাইন আপ
            </Link>
          </div>
        )}
      </div>

      {/* Features */}
      <div className="row mt-5 w-100">
        {[
          {
            icon: '🤖',
            title: 'AI স্বাস্থ্য বিশ্লেষণ',
            desc: 'Google Gemini API দিয়ে তোমার লক্ষণ অনুযায়ী সম্ভাব্য রোগ জানো।',
          },
          {
            icon: '📊',
            title: 'হিস্টোরি ট্র্যাক',
            desc: 'আগের সব হেলথ চেকআপ একসাথে ট্র্যাক করো সহজেই।',
          },
          {
            icon: '🔒',
            title: 'নিরাপদ লগইন',
            desc: 'Firebase দিয়ে সুরক্ষিত অ্যাকসেস — কারো তথ্য চুরি নাই!',
          },
          {
            icon: '📷',
            title: 'লাইভ ডাক্তার',
            desc: 'আপনার সমস্যা সমাধানের জন্য লাইভ এআই ডাক্তারের সাথে কথা বলুন।',
          },
          {
            icon: '🏥',
            title: 'আশেপাশের হাসপাতাল',
            desc: 'আপনার আশেপাশের ১৫ কিলোমিটারের মধ্যে কোন কোন হাসপাতাল আছে তা দেখাবে।',
          },
        ].map((item, idx) => (
          <div className="col-md-4 text-center mb-4 animated-card" key={idx}>
            <div className="card border-0 shadow h-100 bg-secondary text-white">
              <div className="card-body">
                <h3 className="font-bangla" style={{ color: '#00ff9f' }}>
                  {item.icon} {item.title}
                </h3>
                <p className="font-bangla">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Benefits Section */}
      <section className="p-5 mt-5 rounded shadow" style={{ backgroundColor: '#00ff9f', color: '#000' }}>
        <div className="container">
          <h2 className="text-center mb-4 fw-bold">🇧🇩 স্বাস্থ্যসাথী কিভাবে উপকারে আসবে?</h2>
          <ul className="fs-5">
            <li className="mb-2">📱 গ্রামে থাকলেও মোবাইলে হেলথ চেক সম্ভব</li>
            <li className="mb-2">🤖 লক্ষণ অনুযায়ী সম্ভাব্য রোগ জানার সুবিধা</li>
            <li className="mb-2">💊 ভিটামিন ও ঘরোয়া উপায় সাজেশন</li>
            <li className="mb-2">🔐 সুরক্ষিত ইউজার ডেটা ও হিস্টোরি ট্র্যাকিং</li>
            <li className="mb-2">🌐 বাংলা ও ইংরেজি ভাষায় সাপোর্ট</li>
            <li className="mb-2">🧑‍⚕️ গুরুতর হলে ডাক্তারের পরামর্শ এলার্ট</li>
          </ul>
        </div>
      </section>

      {/* Footer Note */}
      <div className="text-center mt-5 font-bangla text-muted">
        <p>📱 মোবাইল + 💻 পিসি ইউজারদের জন্য একদম ফ্রেন্ডলি ডিজাইন</p>
        <p>🌿 "স্বাস্থ্যসাথী" তোমার হেলথকে করবে স্মার্ট, ফাস্ট, আর নিজের কন্ট্রোলে!</p>
      </div>
      <footer>
        <p className="text-light">© 2025 স্বাস্থ্যসাথী | তৈরি করেছে team xenon 💚</p>
      </footer>
    </div>
  );
}
