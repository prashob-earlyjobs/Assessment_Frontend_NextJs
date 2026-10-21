
import React from 'react';
import { Briefcase, Brain, DollarSign, TrendingUp, Users } from 'lucide-react';
import './WhyFranchise.css';

const WhyFranchise = () => {
  const franchiseReasons = [
    {
      icon: <Briefcase className="reason-icon" />,
      title: "Recruitment network",
      description: "Explore the EarlyJobs recruiter network and hiring requirements"
    },
    {
      icon: <Brain className="reason-icon" />,
      title: "No HR Experience Needed",
      description: "We train you on hiring, operations & sales"
    },
    {
      icon: <DollarSign className="reason-icon" />,
      title: "Investment terms",
      description: "Fees and setup requirements are confirmed in the franchise agreement"
    },
    {
      icon: <TrendingUp className="reason-icon" />,
      title: "Commercial terms",
      description: "Income is not guaranteed and depends on the applicable agreement"
    },
    {
      icon: <Users className="reason-icon" />,
      title: "Community Impact",
      description: "Empower job seekers & drive hiring locally"
    }
  ];

  return (
    <section id="whyFranchise" className="section why-franchise">
      <div className="container">
        <h2 className="section-heading">Why Franchise with EarlyJobs?</h2>

        <div className="reasons-grid">
          {franchiseReasons.map((reason, index) => (
            <div 
              key={index} 
              className="reason-card"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div>{reason.icon}</div>
              <h3 className="reason-title">{reason.title}</h3>
              <p className="reason-description">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyFranchise;
