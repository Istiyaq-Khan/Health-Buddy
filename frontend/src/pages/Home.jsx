import { Link } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';
import { useState, useEffect } from 'react';
import './Home.css'; // Custom CSS with animations

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="container-fluid min-vh-100 bg-light d-flex flex-column justify-content-center align-items-center p-4 overflow-hidden">
      {/* Header */}
      <div className="text-center animated-header">
        <h1 className="display-4 fw-bold text-success mb-3 font-bangla glow">স্বাস্থ্যসাথী 🩺</h1>
        <p className="lead mb-4 font-bangla">স্মার্ট হেলথ চেকিং অ্যাপ — নিজের লক্ষণ জানাও, পরামর্শ পাও!</p>

        {/* Auth Buttons */}
        {user ? (
          <div className="d-flex gap-3 justify-content-center">
            <Link to="/analyze" className="btn btn-success btn-lg px-4 py-2 shadow-sm">
              🔍 লক্ষণ বিশ্লেষণ
            </Link>
            <Link to="/dashboard" className="btn btn-outline-success btn-lg px-4 py-2 shadow-sm">
              📊 হেলথ হিস্টোরি
            </Link>
          </div>
        ) : (
          <div className="d-flex gap-3 justify-content-center">
            <Link to="/login" className="btn btn-success btn-lg px-4 py-2 shadow-sm">
              🔐 লগইন করো
            </Link>
            <Link to="/login" className="btn btn-outline-success btn-lg px-4 py-2 shadow-sm">
              📝 সাইন আপ
            </Link>
          </div>
        )}
      </div>

      {/* Features */}
      <div className="row mt-5 w-100">
        <div className="col-md-4 text-center mb-4 animated-card">
          <div className="card border-0 shadow h-100 bg-white">
            <div className="card-body">
              <h3 className="text-success font-bangla">🤖 AI স্বাস্থ্য বিশ্লেষণ</h3>
              <p className="font-bangla">Google Gemini API দিয়ে তোমার লক্ষণ অনুযায়ী সম্ভাব্য রোগ জানো।</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 text-center mb-4 animated-card delay-2">
          <div className="card border-0 shadow h-100 bg-white">
            <div className="card-body">
              <h3 className="text-success font-bangla">📊 হিস্টোরি ট্র্যাক</h3>
              <p className="font-bangla">আগের সব হেলথ চেকআপ একসাথে ট্র্যাক করো সহজেই।</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 text-center mb-4 animated-card delay-4">
          <div className="card border-0 shadow h-100 bg-white">
            <div className="card-body">
              <h3 className="text-success font-bangla">🔒 নিরাপদ লগইন</h3>
              <p className="font-bangla">Firebase দিয়ে সুরক্ষিত অ্যাকসেস — কারো তথ্য চুরি নাই!</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 text-center mb-4 animated-card delay-4">
          <div className="card border-0 shadow h-100 bg-white">
            <div className="card-body">
              <h3 className="text-success font-bangla">📷 লাইভ ডাক্তার</h3>
              <p className="font-bangla">আপনার সমস্যা সমাধানের জন্য লাইভ এআই ডাক্তারের সাথে কথা বলুন।</p>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-success text-white p-5 mt-5 rounded shadow">
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

      {/* Footer note */}
      <div className="text-center mt-5 font-bangla text-muted">
        <p>📱 মোবাইল + 💻 পিসি ইউজারদের জন্য একদম ফ্রেন্ডলি ডিজাইন</p>
        <p>🌿 "স্বাস্থ্যসাথী" তোমার হেলথকে করবে স্মার্ট, ফাস্ট, আর নিজের কন্ট্রোলে!</p>
      </div>
      <footer>
        <p>© 2025 স্বাস্থ্যসাথী | তৈরি করেছে Razin & his Team 💚</p>
      </footer>
    </div>
  );
}
