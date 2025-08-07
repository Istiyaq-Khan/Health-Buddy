import React, { useState } from 'react';
import SymptomForm from '../components/SymptomForm';
import ResultCard from '../components/ResultCard';

const Analyze = () => {
  const [result, setResult] = useState(null);

  return (
    <div className="container-fluid min-vh-100 d-flex flex-column justify-content-center align-items-center bg-dark text-light px-3 py-5">
      <div className="text-center mb-5 animate__animated animate__fadeInDown">
        <h2 className="display-5 fw-bold text-success mb-2" style={{ fontFamily: 'Poppins' }}>
          🔍 লক্ষণ বিশ্লেষণ করুন
        </h2>
        <p className="lead text-light" style={{ fontFamily: 'Poppins' }}>
          আপনার লক্ষণগুলো লিখুন এবং AI আপনাকে দিবে সম্ভাব্য রোগের ধারণা ও পরামর্শ
        </p>
      </div>

      <div className="row justify-content-center w-100">
        <div className="col-md-10 col-lg-8">
          <div className="card bg-secondary border-0 shadow-sm p-4 animate__animated animate__fadeInUp text-light">
            <SymptomForm setResult={setResult} />
          </div>

          {result && (
            <div className="card bg-secondary border-0 shadow-sm p-4 mt-4 animate__animated animate__zoomIn text-light">
              <h4 className="text-success text-center mb-3 fw-semibold" style={{ fontFamily: 'Poppins' }}>
                📋 বিশ্লেষণের ফলাফল
              </h4>
              <ResultCard result={result} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analyze;
