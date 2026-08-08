import React, { useState } from 'react';
import SymptomForm from '../components/SymptomForm';
import ResultCard from '../components/ResultCard';
import { Search, Sparkles } from 'lucide-react';

const Analyze = () => {
  const [result, setResult] = useState(null);

  return (
    <div className="min-vh-100 font-display bg-dark text-white py-5">
      <div className="container px-3 px-md-4">
        
        {/* Header Title */}
        <div className="text-center mb-5 max-w-2xl mx-auto">
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-3 glass-card border-0">
            <Sparkles size={16} className="text-emerald-400" style={{ color: '#10b981' }} />
            <span className="small text-light font-display">AI-Powered Symptom Checker</span>
          </div>
          <h2 className="display-5 fw-bold text-white mb-2 font-display">
            🔍 লক্ষণ বিশ্লেষণ ও স্বাস্থ‍্য তথ্য
          </h2>
          <p className="text-muted leading-relaxed font-display mx-auto" style={{ maxWidth: '580px' }}>
            আপনার শারীরিক উপসর্গগুলো লিখুন। আমাদের স্মার্ট এআই ইঞ্জিন তাৎক্ষণিকভাবে রোগের সম্ভাবনা, প্রয়োজনীয় ঔষধ ও পরামর্শ প্রদান করবে।
          </p>
        </div>

        {/* Workbench Section */}
        <div className="row justify-content-center">
          <div className="col-12 col-lg-9 col-xl-8">
            
            {/* Input Form Card */}
            <div className="glass-panel p-4 p-md-5 box-glow mb-4">
              <SymptomForm setResult={setResult} />
            </div>

            {/* Results Display Card */}
            {result && (
              <div className="glass-panel p-4 p-md-5 box-glow border-0">
                <h4 className="fw-bold text-white text-center mb-4 font-display d-flex align-items-center justify-content-center gap-2">
                  <Sparkles className="text-emerald-400" style={{ color: '#10b981' }} />
                  📋 আপনার বিশ্লেষণের ফলাফল
                </h4>
                <ResultCard result={result} />
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default Analyze;
