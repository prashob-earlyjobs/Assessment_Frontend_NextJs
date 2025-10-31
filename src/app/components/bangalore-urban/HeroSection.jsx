import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { MapPin } from 'lucide-react';
import './HeroSection.css';

const HeroSection = () => {
   const scrollToLeadForm = () => {
    document.getElementById('lead-capture')?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <section className="chandigarh-hero-section h-screen">
      <div className="chandigarh-hero-background"></div>
      <div className="chandigarh-hero-container">
        <div className="chandigarh-hero-grid">
          <div className="chandigarh-hero-content">
            <div className="chandigarh-hero-text">
              <Badge className="chandigarh-hero-badge">
                <MapPin className="chandigarh-hero-badge-icon" />
                Bangalore Urban Franchise
              </Badge>
              <h1 className="chandigarh-hero-title">
                Empowering Bengaluru's{' '}
                <span className="chandigarh-hero-title-highlight">
                  Tech & Campus Talent
                </span>{' '}
                with Top Employers
              </h1>
              <p className="chandigarh-hero-subtitle">
                Internships, placements, and hiring solutions for Bengaluru students, colleges, and startups — connecting local talent with leading city employers.
              </p>
            </div>

            <div className="chandigarh-hero-actions">
              <Button 
                size="lg" 
                className="chandigarh-hero-cta-button"
                onClick={scrollToLeadForm}
              >              
                Get Started in Bengaluru Today
              </Button>
            </div>
            
            <div className="chandigarh-hero-stats">
              <div className="chandigarh-stat-item">
                <div className="chandigarh-stat-number">1K+</div>
                <div className="chandigarh-stat-label">Students Placed</div>
              </div>
              <div className="chandigarh-stat-item">
                <div className="chandigarh-stat-number">200+</div>
                <div className="chandigarh-stat-label">Partner Companies</div>
              </div>
              <div className="chandigarh-stat-item">
                <div className="chandigarh-stat-number">50+</div>
                <div className="chandigarh-stat-label">College Partners</div>
              </div>
            </div>
          </div>

    
          <div className="chandigarh-hero-image">
            <div className="chandigarh-hero-image-container">
              <img src="https://i.ibb.co/Gvg9yJ2R/Connecting-teams-pana.png" alt="Bengaluru talent and hiring" /> 
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;