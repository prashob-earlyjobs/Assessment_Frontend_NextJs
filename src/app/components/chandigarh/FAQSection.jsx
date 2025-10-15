"use client"
import React, { useState } from 'react';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What makes EarlyJobs Chandigarh different from other recruitment agencies?",
      answer: "We specialize in Chandigarh's key industries - textile, diamond, and manufacturing. Our local expertise, AI-powered matching system, and 95% success rate set us apart. We provide end-to-end career support, not just job placement."
    },
    {
      question: "Is there any fee for job seekers?",
      answer: "No, our services are completely free for job seekers. We are paid by employers when we successfully place candidates. You get access to premium career services at no cost."
    },
    {
      question: "How long does the placement process typically take?",
      answer: "Our streamlined process typically takes 7-14 days from registration to job offer. However, this can vary based on your experience level, industry requirements, and specific job preferences."
    },
    {
      question: "Do you help with interview preparation?",
      answer: "Absolutely! We provide comprehensive interview coaching, including mock interviews, industry-specific guidance, resume optimization, and salary negotiation tips to ensure you're fully prepared."
    },
    {
      question: "What types of positions do you fill?",
      answer: "We cover all levels from entry-level to senior management across textile, diamond, manufacturing, IT, finance, sales, and other key sectors in Chandigarh. Both permanent and contract positions are available."
    },
    {
      question: "Can I register if I'm currently employed?",
      answer: "Yes, we maintain strict confidentiality for all candidates. Many of our successful placements are working professionals looking for better opportunities. Your current employer will never know about your job search."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white mb-[71px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Get answers to common questions about our recruitment process
          </p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border border-orange-200 rounded-lg bg-white shadow-sm transition-all duration-300 ${
                openIndex === index ? 'bg-orange-50' : ''
              }`}
            >
              <div
                className="flex justify-between items-center p-6 cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                <span className="text-2xl text-orange-600 font-bold">
                  {openIndex === index ? '−' : '+'}
                </span>
              </div>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;