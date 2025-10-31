import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Users, Building2, GraduationCap, CheckCircle, Star, Briefcase } from 'lucide-react';

import './BenefitsSection.css';

const BenefitsSection = () => {
  const benefits = [
    {
      icon: Users,
      title: "For Students",
      items: [
        "Verified internships across Bengaluru (Whitefield, Electronic City, Koramangala)",
        "Entry-level roles at startups and product companies",
        "Resume & interview prep tailored for Bangalore employers",
        "Walk-in interview support with local recruiters",
        "Skill workshops led by industry practitioners"
      ],
      color: "blue"
    },
    {
      icon: GraduationCap,
      title: "For Colleges",
      items: [
        "Dedicated placement support for Bengaluru campuses",
        "Campus recruitment drives with local tech firms",
        "Placement officer CRM and employer matchmaking",
        "Co-branded industry-academia events in Bangalore",
        "Partnerships with Bangalore training providers"
      ],
      color: "green"
    },
    {
      icon: Building2,
      title: "For Employers",
      items: [
        "Access to pre-screened candidates from Bangalore colleges",
        "Cost-effective hiring & campus connect solutions",
        "Local talent pipeline focused on product & startup hiring",
        "Flexible packages for early-stage startups and enterprises",
        "Support for organizing on-campus and virtual drives"
      ],
      color: "purple"
    }
  ];

  return (
    <section className="chandigarh-section">
      <div className="chandigarh-container">
        <div className="chandigarh-header">
          <Badge className="chandigarh-badge">
            <Star className="chandigarh-badge-icon" />
            Why Choose Us
          </Badge>
          <h2 className="chandigarh-title">
            Tailored Solutions for Bangalore Urban Stakeholders
          </h2>
          <p className="chandigarh-subtitle">
            Whether you're a student in Bengaluru seeking opportunities, a college looking for placement support,
            or an employer hiring locally, we connect Bangalore talent with the right employers and programs.
          </p>
        </div>

        <div className="chandigarh-grid">
          {benefits.map((benefit, index) => (
            <Card key={index} className={`chandigarh-card chandigarh-card-${benefit.color}`} style={{padding:"10px"}}>
              <CardHeader className="chandigarh-card-header">
                <div className={`chandigarh-icon chandigarh-icon-${benefit.color}`}>
                  <benefit.icon className="chandigarh-icon-svg" />
                </div>
                <CardTitle className="chandigarh-card-title">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent className="chandigarh-card-content">
                <ul className="chandigarh-list">
                  {benefit.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="chandigarh-item">
                      <CheckCircle className="chandigarh-check-icon" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;