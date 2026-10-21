import React from "react";
import "./EarningModel.css";

const EarningModel = () => {
  return (
    <section id="earnings" className="earnings-section">
      <div className="earnings-container">
        <h2 className="earnings-heading">Commercial terms</h2>

        <div className="earnings-grid">
          <div className="earnings-card">
            <h3 className="earnings-card-title">Agreed in the franchise agreement</h3>

            <div className="earnings-item-container">
              <div className="earnings-item">
                <div>
                  <p className="earnings-item-label">Fixed Hiring (per hire)</p>
                  <p className="earnings-item-sublabel">
                    Standard industry placement
                  </p>
                </div>
                <span className="earnings-item-value">Subject to agreement</span>
              </div>

              <div className="earnings-item">
                <div>
                  <p className="earnings-item-label">% of CTC Hiring</p>
                  <p className="earnings-item-sublabel">
                    Premium placement model
                  </p>
                </div>
                <span className="earnings-item-value">Subject to agreement</span>
              </div>

              <div className="earnings-item">
                <div>
                  <p className="earnings-item-label">New Company Onboarding</p>
                  <p className="earnings-item-sublabel">
                    For bringing new clients
                  </p>
                </div>
                <span className="earnings-item-value">Subject to agreement</span>
              </div>

              {/* <div className="earnings-item">
                <div>
                  <p className="earnings-item-label">Candidate Assessment</p>
                  <p className="earnings-item-sublabel">Pre-hiring testing</p>
                </div>
                <span className="earnings-item-value">70% (net)</span>
              </div> */}
            </div>
          </div>

          <div>
            <div className="earnings-dark-card">
              <div className="earnings-dark-header">
                <h3 className="earnings-dark-title">
                  Income is not guaranteed
                </h3>
                <span className="earnings-dark-value">Varies</span>
              </div>

              <p className="earnings-dark-subtitle">
                Results depend on the business, location, effort, and market conditions
              </p>

              <div className="earnings-feature-list">
                <div className="earnings-feature-item">
                  <div className="earnings-feature-icon-wrapper">
                    <span className="earnings-feature-icon">✓</span>
                  </div>
                  <span>Placement volume is not guaranteed</span>
                </div>
                <div className="earnings-feature-item">
                  <div className="earnings-feature-icon-wrapper">
                    <span className="earnings-feature-icon">✓</span>
                  </div>
                  <span>Activity depends on available mandates</span>
                </div>
                <div className="earnings-feature-item">
                  <div className="earnings-feature-icon-wrapper">
                    <span className="earnings-feature-icon">✓</span>
                  </div>
                  <span>Client relationships are not guaranteed</span>
                </div>
              </div>
            </div>

            <div className="earnings-gradient-card">
              <h3 className="earnings-gradient-title">
                Payback period is not guaranteed
              </h3>
              <p>EarlyJobs does not promise a return on investment</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EarningModel;
