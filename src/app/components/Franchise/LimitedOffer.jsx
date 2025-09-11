// import React from "react";
// import { AlarmClock, Check, ArrowRight } from "lucide-react";
// import "./LimitedOffer.css";

// const LimitedOffer = () => {
//   const scrollToContact = () => {
//     const contactSection = document.getElementById("contact");
//     if (contactSection) {
//       contactSection.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   return (
//     <section className="limited-offer">
//       <div className="container">
//         <div className="offer-container">
//           <div className="light-overlay"></div>

//           <div className="offer-content">
//             <div className="offer-layout">
//               <div className="offer-info">
//                 <div className="offer-header">
//                   <AlarmClock className="w-6 h-6" />
//                   <h3 className="offer-title">
//                     Launch Offer for Franchise India Expo Visitors 🎉
//                   </h3>
//                 </div>

//                 <p className="offer-subtitle">Only for first 10 sign-ups:</p>

//                 <div className="benefits-list">
//                   <div className="benefit-item">
//                     <div className="check-icon-container">
//                       <Check className="check-icon" />
//                     </div>
//                     <p>50% risk sharing (₹1L deposit instead of ₹2L)</p>
//                   </div>

//                   <div className="benefit-item">
//                     <div className="check-icon-container">
//                       <Check className="check-icon" />
//                     </div>
//                     <p>Marketing & branding support from HQ</p>
//                   </div>

//                   <div className="benefit-item">
//                     <div className="check-icon-container">
//                       <Check className="check-icon" />
//                     </div>
//                     <p>Dedicated success manager for 6 months</p>
//                   </div>

//                   <div className="benefit-item">
//                     <div className="check-icon-container">
//                       <Check className="check-icon" />
//                     </div>
//                     <p>Free access to CRM + hiring leads</p>
//                   </div>
//                 </div>

//                 <p className="offer-deadline">
//                   Act fast — Offer valid till June 20, 2025 ⏳
//                 </p>
//               </div>

//               <div className="offer-cta">
//                 <button onClick={scrollToContact} className="offer-button">
//                   Apply for Franchise Now
//                   <ArrowRight className="arrow-icon" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default LimitedOffer;

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
                    Launch Offer for Franchise India Expo Visitors 🎉
                  </h3>
                </div>

               
                <div className="benefits-list">
                  {[
                    "Marketing & branding support from HQ",
                    "Dedicated success manager for 6 months",
                    "₹1 lakh + GST for the first 20 franchises",
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
                  Act fast — Offer valid till August 31, 2025 ⏳
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
