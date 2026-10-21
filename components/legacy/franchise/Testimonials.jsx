
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import './Testimonials.css';

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      quote: "Earnings are not guaranteed. Results depend on the business, location, effort, and market conditions.",
      name: "EarlyJobs",
      location: "Programme terms",
      avatar: "https://via.placeholder.com/100x100"
    },
    {
      quote: "Training and support are described in the applicable franchise agreement. Acceptance is not guaranteed.",
      name: "EarlyJobs",
      location: "Programme terms",
      avatar: "https://via.placeholder.com/100x100"
    },
    {
      quote: "EarlyJobs does not promise a specific income, placement volume, or payback period.",
      name: "EarlyJobs",
      location: "Programme terms",
      avatar: "https://via.placeholder.com/100x100"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="testimonials-container">
        <h2 className="testimonials-heading">Before you apply</h2>
        
        <div className="testimonials-slider">
          <div className="testimonials-card">
            <div className="testimonials-card-gradient"></div>
            
            <div className="testimonials-content">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className={`testimonials-slide ${
                    currentSlide === index ? 'active' : 'inactive'
                  }`}
                >
                  <div className="testimonials-layout">
                    <div className="testimonials-avatar-container">
                      <div className="testimonials-avatar">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name} 
                        />
                      </div>
                      
                      <div className="testimonials-stars">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="testimonials-star" />
                        ))}
                      </div>
                    </div>
                    
                    <div className="testimonials-quote-container">
                      <blockquote className="testimonials-quote">
                        "{testimonial.quote}"
                      </blockquote>
                      
                      <div className="testimonials-author">
                        <p className="testimonials-name">{testimonial.name}</p>
                        <p className="testimonials-location">Franchise Owner, {testimonial.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="testimonials-controls">
              <button
                onClick={prevSlide}
                className="testimonials-button testimonials-prev-button"
              >
                <ArrowLeft className="testimonials-button-icon" />
                Previous
              </button>
              
              <div className="testimonials-indicators">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`testimonials-indicator ${
                      currentSlide === index ? 'active' : ''
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextSlide}
                className="testimonials-button testimonials-next-button"
              >
                Next
                <ArrowRight className="testimonials-button-icon" />
              </button>
            </div>
          </div>
          
          <div className="testimonials-cta">
            <button className="btn-outline">
              Watch Video Testimonials
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
