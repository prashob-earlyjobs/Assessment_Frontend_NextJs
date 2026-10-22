import React, { useState } from "react";
import { AlarmClock, Check, ArrowRight } from "lucide-react";
import "./LimitedOffer.css";
import RequestForm from "./FranchiseRequestForm"; 
import { PopupModal } from "./Hero";

const LimitedOffer = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleApplyClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <section className="limited-offer">
      <div className="container">
        <div className="offer-container">
          <div className="light-overlay"></div>

          <div className="offer-content">
            <div className="offer-layout">
              <div className="offer-info">
                <div className="offer-header">
                  <AlarmClock className="w-6 h-6" />
                  <h3 className="offer-title">
                    Franchise enquiries
                  </h3>
                </div>

               
                <div className="benefits-list">
                  {[
                    "Marketing and branding support is discussed during onboarding.",
                    "Support arrangements are set out in the franchise agreement.",
                    "Investment terms are confirmed before any agreement is signed.",
                  ].map((benefit, idx) => (
                    <div className="benefit-item" key={idx}>
                      <div className="check-icon-container">
                        <Check className="check-icon" />
                      </div>
                      <p>{benefit}</p>
                    </div>
                  ))}
                </div>

                <p className="offer-deadline">
                  Contact the EarlyJobs team for current commercial terms.
                </p>
              </div>

              <div className="offer-cta">
                <button onClick={handleApplyClick} className="offer-button">
                  Apply for Franchise Now
                  <ArrowRight className="arrow-icon" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      <PopupModal
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        title="Apply for EarlyJobs Franchise"
      >
        <RequestForm isFranchise={true} />
      </PopupModal>
    </section>
  );
};

export default LimitedOffer;
