"use client";

import { FaStar, FaQuoteRight } from "react-icons/fa";
import Image from "next/image";
import { PRIMARY_COLOR } from "../../../../constants/theme";

interface Testimonial {
  id: string;
  headline: string;
  content: string;
  name: string;
  title: string;
  avatar: string;
}

const TestimonialsV2 = () => {
  const testimonials: Testimonial[] = [
    {
      id: "1",
      headline: "Amazing services",
      content:
        "Metus faucibus sed turpis lectus feugiat tincidunt. Rhoncus sed tristique in dolor. Mus etiam et vestibulum venenatis",
      name: "Marco Kihn",
      title: "Happy Client",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: "2",
      headline: "Everything simple",
      content:
        "Mus etiam et vestibulum venenatis viverra ut. Elit morbi bibendum ullamcorper augue faucibus",
      name: "Kristin Hester",
      title: "Happy Client",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b9e8c002?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: "3",
      headline: "Awesome, thank you!",
      content:
        "Rhoncus sed tristique in dolor. Mus etiam et vestibulum venenatis viverra ut. Elit morbi bibendum ullamcorper augue faucibus. Nulla et tempor montes",
      name: "Zion Cisneros",
      title: "Happy Client",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
  ];

  return (
    <div 
      className="w-full py-12" 
      style={{ 
        backgroundColor: `rgba(240, 133, 4, 0.05)` // PRIMARY_COLOR with 5% opacity
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-3">
            Testimonials from Our Customers
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-3xl mx-auto">
            At eu lobortis pretium tincidunt amet lacus ut aenean aliquet.
            Blandit a massa elementum id scel...
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-200 relative"
            >
              {/* Quote Icon - Bottom Right */}
              <div className="absolute bottom-4 right-4">
                <FaQuoteRight className="text-4xl text-orange-500 opacity-20" />
              </div>

              {/* Star Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className="w-5 h-5 text-yellow-400"
                  />
                ))}
              </div>

              {/* Headline */}
              <h3 className="text-lg font-bold text-black mb-3">
                {testimonial.headline}
              </h3>

              {/* Content */}
              <p className="text-sm text-gray-600 mb-6 pr-8">
                {testimonial.content}
              </p>

              {/* Client Info */}
              <div className="flex items-center gap-3 mt-auto">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-black">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-gray-500">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsV2;
