
import React from 'react';
import { Users, DollarSign, Building, Briefcase } from 'lucide-react';
import './ProblemSolution.css';

const ProblemSolution = ({ stats }) => {
  const cards = [
    { icon: DollarSign, value: stats?.companies, label: "Companies" },
    { icon: Building, value: stats?.joinings, label: "Joinings" },
    { icon: Users, value: stats?.recruiters, label: "Recruiters" },
    { icon: Briefcase, value: stats?.interviews, label: "Interviews" },
  ].filter((card) => card.value);

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
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div key={card.label} className="stat-card" style={{ animationDelay: `${index * 100}ms` }}>
                <Icon className="stat-icon" />
                <h3 className="stat-number">{card.value}</h3>
                <p className="stat-label">{card.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
