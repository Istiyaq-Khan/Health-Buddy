import React, { useEffect, useRef } from "react";

const ResultCard = ({ result }) => {
  const cardRef = useRef();


  return (
    <div className="container mt-4" ref={cardRef}>
      <div className="card border-info shadow-sm">
        <div className="card-header bg-info text-white fw-bold">
          📋 Analysis Result
        </div>
        <div className="card-body">
          {result ? (
            <div>
              {/* Handle raw JSON text if it's not parsed properly */}
              {typeof result === 'string' && (
                <div className="mb-3">
                  <h6 className="text-info fw-bold">📋 Analysis Result:</h6>
                  <div className="bg-light p-3 rounded">
                    <pre className="mb-0" style={{ whiteSpace: 'pre-wrap', fontSize: '14px' }}>
                      {result}
                    </pre>
                  </div>
                </div>
              )}
              
              {/* Handle structured JSON object */}
              {typeof result === 'object' && result !== null && (
                <>
                  {result.diseases && result.diseases.length > 0 && (
                    <div className="mb-3">
                      <h6 className="text-danger fw-bold">🦠 Possible Diseases:</h6>
                      <ul className="list-unstyled">
                        {result.diseases.map((disease, index) => (
                          <li key={index} className="text-danger">• {disease}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {result.vitamins && result.vitamins.length > 0 && (
                    <div className="mb-3">
                      <h6 className="text-success fw-bold">💊 Recommended Vitamins:</h6>
                      <ul className="list-unstyled">
                        {result.vitamins.map((vitamin, index) => (
                          <li key={index} className="text-success">• {vitamin}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {result.medicines && result.medicines.length > 0 && (
                    <div className="mb-3">
                      <h6 className="text-primary fw-bold">💊 OTC Medicines:</h6>
                      <ul className="list-unstyled">
                        {result.medicines.map((medicine, index) => (
                          <li key={index} className="text-primary">• {medicine}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {result.tips && (
                    <div className="mb-3">
                      <h6 className="text-info fw-bold">🏠 Home Tips:</h6>
                      <p className="text-info">{result.tips}</p>
                    </div>
                  )}
                  
                  {result.doctorAlert && (
                    <div className="alert alert-warning" role="alert">
                      <strong>⚠️ Doctor Alert:</strong> It's recommended to see a doctor for proper diagnosis.
                    </div>
                  )}
                </>
              )}
            </div>
          ) : (
            <p>No result found 😶</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
