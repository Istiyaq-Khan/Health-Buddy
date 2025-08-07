import React, { useRef } from "react";

const colors = {
  background: "#6c757d",
  primaryGreen: "#19b55d",
  secondaryGreen: "#25b02f",
  cardBg: "#121212",
  textPrimary: "#FFFFFF",
  textSecondary: "#B0B0B0",
  highlight: "#64DD17",
  error: "#FF5252",
  warning: "#FFD600",
};

const ResultCard = ({ result }) => {
  const cardRef = useRef();

  return (
    <div
      className="container mt-4"
      ref={cardRef}
      style={{ backgroundColor: colors.background, minHeight: "50vh" }}
    >
      <div
        className="card shadow-sm"
        style={{
          backgroundColor: colors.cardBg,
          border: `1.5px solid ${colors.primaryGreen}`,
          color: colors.textPrimary,
        }}
      >
        <div
          className="card-header fw-bold"
          style={{ backgroundColor: colors.primaryGreen, color: colors.primaryGreen }}
        >
          📋 Analysis Result
        </div>
        <div className="card-body">
          {result ? (
            <div>
              {/* Handle raw JSON text if it's not parsed properly */}
              {typeof result === "string" && (
                <div className="mb-3">
                  <h6
                    className="fw-bold"
                    style={{ color: colors.primaryGreen }}
                  >
                    📋 Analysis Result:
                  </h6>
                  <div
                    style={{
                      backgroundColor: "#1e1e1e",
                      padding: "12px",
                      borderRadius: "6px",
                      fontSize: "14px",
                      whiteSpace: "pre-wrap",
                      color: colors.textSecondary,
                    }}
                  >
                    <pre className="mb-0">{result}</pre>
                  </div>
                </div>
              )}

              {/* Handle structured JSON object */}
              {typeof result === "object" && result !== null && (
                <>
                  {result.diseases && result.diseases.length > 0 && (
                    <div className="mb-3">
                      <h6
                        className="fw-bold"
                        style={{ color: colors.error }}
                      >
                        🦠 Possible Diseases:
                      </h6>
                      <ul className="list-unstyled">
                        {result.diseases.map((disease, index) => (
                          <li key={index} style={{ color: colors.error }}>
                            • {disease}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {result.vitamins && result.vitamins.length > 0 && (
                    <div className="mb-3">
                      <h6
                        className="fw-bold"
                        style={{ color: colors.highlight }}
                      >
                        💊 Recommended Vitamins:
                      </h6>
                      <ul className="list-unstyled">
                        {result.vitamins.map((vitamin, index) => (
                          <li key={index} style={{ color: colors.highlight }}>
                            • {vitamin}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {result.medicines && result.medicines.length > 0 && (
                    <div className="mb-3">
                      <h6
                        className="fw-bold"
                        style={{ color: colors.primaryGreen }}
                      >
                        💊 OTC Medicines:
                      </h6>
                      <ul className="list-unstyled">
                        {result.medicines.map((medicine, index) => (
                          <li key={index} style={{ color: colors.primaryGreen }}>
                            • {medicine}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {result.tips && (
                    <div className="mb-3">
                      <h6
                        className="fw-bold"
                        style={{ color: colors.secondaryGreen }}
                      >
                        🏠 Home Tips:
                      </h6>
                      <p style={{ color: colors.secondaryGreen }}>
                        {result.tips}
                      </p>
                    </div>
                  )}

                  {result.advisedoctor && (
                    <div className="mb-3">
                      <h6
                        className="fw-bold"
                        style={{ color: colors.secondaryGreen }}
                      >
                        🧑‍⚕️ Some numbers of doctors:
                      </h6>
                      <p style={{ color: colors.secondaryGreen }}>
                        {result.advisedoctor}
                      </p>
                    </div>
                  )}

                  {result.doctorAlert && (
                    <div
                      className="alert"
                      role="alert"
                      style={{
                        backgroundColor: colors.warning,
                        color: colors.background,
                        fontWeight: "600",
                      }}
                    >
                      ⚠️ Doctor Alert: It's recommended to see a doctor for proper diagnosis.
                    </div>
                  )}
                </>
              )}
            </div>
          ) : (
            <p style={{ color: colors.textSecondary }}>No result found 😶</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
