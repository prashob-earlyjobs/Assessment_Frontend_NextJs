import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const features = [
  {
    title: 'Comprehensive Interview Coverage',
    description: 'Extensive practice sessions covering technical, behavioral, and situational questions to prepare you for any interview scenario.',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-9h2v6h-2zm0-4h2v2h-2z"/>
      </svg>
    ),
  },
  {
    title: 'Boost Confidence & Reduce Anxiety',
    description: 'Structured practice to build self-assurance, helping you stay calm and perform at your best during interviews.',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z"/>
      </svg>
    ),
  },
  {
    title: 'Bias-Free Technical Assessment',
    description: 'Objective evaluations powered by AI to ensure fair and accurate assessment of your technical skills.',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zM10 4h4v2h-4V4zm10 15H4V8h16v11z"/>
      </svg>
    ),
  },
  {
    title: 'Identifies Weak Areas',
    description: 'Pinpoints areas for improvement with detailed analytics to help you focus your practice effectively.',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L1 21h22L12 2zm0 3.24L19.76 19H4.24L12 5.24zm-1 5.76h2v6h-2v-6zm0 8h2v2h-2v-2z"/>
      </svg>
    ),
  },
  {
    title: 'AI Feedback After Practice',
    description: 'Receive actionable, AI-driven feedback post-practice to refine your skills and boost performance.',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2a10 10 0 00-10 10c0 4.41 2.87 8.14 6.84 9.49l1.16-1.74C7.69 18.69 6 15.87 6 12.5a6.5 6.5 0 0113 0c0 3.37-1.69 6.19-4.01 7.25l1.16 1.74A10 10 0 0012 2z"/>
      </svg>
    ),
  },
  
  {
    title: 'Specialized for Fresher & Experienced',
    description: 'Tailored assessments for both freshers and seasoned professionals to meet diverse career needs.',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2a10 10 0 00-10 10c0 5.52 4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-11h2v6h-2zm0-4h2v2h-2z"/>
      </svg>
    ),
  },
  {
    title: 'AI Precision',
    description: 'Leverage cutting-edge AI to deliver precise evaluations and personalized career recommendations.',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"/>
      </svg>
    ),
  },
];

// Custom arrow components
const PrevArrow = ({ onClick, ...rest }) => {
  return (
    <button
      onClick={onClick}
      className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors z-10"
    >
      <ChevronLeft className="w-6 h-6 text-white" />
    </button>
  );
};

const NextArrow = ({ onClick, ...rest }) => {
  return (
    <button
      onClick={onClick}
      className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors z-10"
    >
      <ChevronRight className="w-6 h-6 text-white" />
    </button>
  );
};

const FeaturesCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false, // Hide arrows on mobile for better space usage
        },
      },
    ],
  };

  return (
    <section className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            Features From Our Assessments
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
            Discover why job seekers choose{' '}
            <span className="font-semibold text-orange-600">EarlyJobs.ai</span> for
            their professional development
          </p>
        </div>
        <Slider {...settings}>
          {features.map((feature, index) => (
            <div key={index} className="px-2">
              <div
                className="bg-white mb-4 sm:mb-6 text-center p-3 sm:p-4 border-2 border-gray-100 rounded-lg group flex flex-col h-56  transition-all duration-300 hover:bg-orange-500 hover:text-white"
              >
                <div className="pt-2 sm:pt-3 flex flex-col items-center flex-grow overflow-hidden">
                  <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-orange-100 rounded-full mb-2 sm:mb-3 text-orange-600 group-hover:bg-white group-hover:text-orange-500 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-1 sm:mb-2 group-hover:text-white transition-colors line-clamp-2">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 group-hover:text-white transition-colors line-clamp-3 sm:line-clamp-4">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default FeaturesCarousel;