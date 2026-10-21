
import React from 'react';
import { Users, DollarSign, Building, Briefcase } from 'lucide-react';
import './ProblemSolution.css';

const ProblemSolution = () => {
  return (
    <section className="section problem-section" id="problem">
      <div className="container">
        <h2 className="section-heading">Explore a recruitment franchise</h2>
        
        <div className="problem-description">
          <p className="problem-text">
            EarlyJobs offers a recruitment franchise for people who want to explore running a local recruitment business. Investment, support, and commercial terms are confirmed in the applicable franchise agreement. Outcomes vary and are not guaranteed.
          </p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <DollarSign className="stat-icon" />
            <h3 className="stat-number">266+</h3>
            <p className="stat-label">Companies</p>
          </div>
          
          <div className="stat-card" style={{ animationDelay: "100ms" }}>
            <Building className="stat-icon" />
            <h3 className="stat-number">5,500+</h3>
            <p className="stat-label">Joinings</p>
          </div>
          
          <div className="stat-card" style={{ animationDelay: "200ms" }}>
            <Users className="stat-icon" />
            <h3 className="stat-number">3,449+</h3>
            <p className="stat-label">Recruiters</p>
          </div>
          
          <div className="stat-card" style={{ animationDelay: "300ms" }}>
            <Briefcase className="stat-icon" />
            <h3 className="stat-number">72,000+</h3>
            <p className="stat-label">Interviews</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
