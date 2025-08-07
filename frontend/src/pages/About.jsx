import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container bg-dark text-light">
      <h1 className="glow-title text-success">স্বাস্থ্যসাথী</h1>
      <p className="tagline text-secondary">তোমার নিজের হাতে ছোট্ট হেলথ অ্যাসিস্টেন্ট 🤖💊</p>

      <section className="section-box bg-secondary bg-opacity-10 p-3 rounded">
        <h2 className="text-success">🌟 আমাদের ফিচার লিস্ট:</h2>
        <ul>
          <li>🔍 <b>লক্ষণ সিলেকশন:</b> বাটনে ক্লিক করে সহজে লক্ষণ বেছে নাও।</li>
          <li>🤖 <b>রোগ অনুমান:</b> AI দিয়ে চেক করে দেখাবে সম্ভাব্য রোগ।</li>
          <li>💊 <b>ঔষধ ও ভিটামিন সাজেশন:</b> দরকারি ভিটামিন, ঔষধ বা ঘরোয়া টিপস।</li>
          <li>📅 <b>ডাক্তারের এলার্ট:</b> গুরুতর হলে জানাবে — “তুমি দয়া করে একজন ডাক্তারের সঙ্গে যোগাযোগ করো।”</li>
          <li>📊 <b>হেলথ হিস্টোরি:</b> আগের সব রিপোর্ট থাকবে সেভ।</li>
          <li>🌐 <b>বাংলা + ইংরেজি সাপোর্ট:</b> দুই ভাষায় ইউজার ফ্রেন্ডলি!</li>
        </ul>
      </section>

      <section className="section-box bg-secondary bg-opacity-10 p-3 rounded">
        <h2 className="text-success">🎯 প্রজেক্টের লক্ষ্য:</h2>
        <p>স্কুলের ছাত্রছাত্রী বা যে কেউ যেন সহজেই নিজের লক্ষণ থেকে প্রাথমিক ধারণা পেতে পারে, সরাসরি দৌড়ে না গিয়ে।</p>
      </section>

      <section className="section-box bg-secondary bg-opacity-10 p-3 rounded">
        <h2 className="text-success">🚀 Tech Stack:</h2>
        <p><b>Frontend:</b> React, Bootstrap</p>
        <p><b>Backend:</b> Express.js, MongoDB</p>
        <p><b>Auth:</b> Firebase Authentication</p>
        <p><b>AI:</b> Google Gemini Pro API</p>
      </section>

      <section className="section-box bg-secondary bg-opacity-10 p-3 rounded">
        <h2 className="text-success">📚 তৈরি করা হয়েছে:</h2>
        <p>📌 <b>প্রজেক্ট:</b> আইসিটি অলিম্পিয়াড ২০২৫</p>
        <p>🏫 <b>স্কুল:</b> Scholarshome, Majortila, Sylhet</p>
        <p>🧑‍💻 <b>ডেভেলপার:</b> Istiyaq Khan Razin এবং তার টিম ❤️</p>
      </section>

      <section className="section-box bg-dark border border-success p-3 rounded">
        <h2 className="text-success">🌱 এই অ্যাপ কীভাবে সাহায্য করবে?</h2>
        <p>
          ✅ অসুস্থ লাগলে ইউজার অ্যাপটিতে লক্ষণ লিখলেই AI বুঝে নেবে সম্ভাব্য রোগ।<br />
          ✅ দেবে দরকারি ভিটামিন ও চিকিৎসা টিপস।<br />
          ✅ গুরুতর হলে বলবে, "ডাক্তার দেখাও প্লিজ!" <br />
          ✅ সময় বাঁচবে, পকেটও বাঁচবে!💸<br />
          ✅ নিজের হেলথ হিস্টোরি ট্র্যাক করা যাবে।🔥
        </p>
      </section>

      <footer className="text-center text-secondary mt-4">
        <p>© 2025 স্বাস্থ্যসাথী | তৈরি করেছে team xenon 💚</p>
      </footer>
    </div>
  );
};

export default About;
