"use client"
import React, { useState } from 'react';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What makes EarlyJobs Bangalore different from other recruitment partners?",
      answer: "We focus on Bengaluru's dynamic tech and startup ecosystem. Our local employer network, campus partnerships across the city, and data-driven candidate matching help students and employers connect faster and with higher quality."
    },
    {
      question: "Is there any fee for students or colleges in Bangalore?",
      answer: "No — services for job seekers and college students are free. Colleges and employers engage our paid services for placement drives, hiring campaigns, and campus programs."
    },
    {
      question: "How quickly can Bangalore candidates get placed?",
      answer: "Typical timelines vary by role, but many entry-level and internship placements are completed within 2–4 weeks. Timelines depend on job requirements, volume of open roles, and employer interview schedules."
    },
    {
      question: "Do you provide interview and resume support tailored for Bengaluru employers?",
      answer: "Yes. We offer resume optimization, mock interviews, and role-specific coaching geared toward product companies, startups, and enterprise recruiters in Bengaluru to improve candidate readiness."
    },
    {
      question: "What types of roles do you help place in Bangalore?",
      answer: "We place students and early-career professionals across software engineering, QA, product support, data roles, design, sales, and operations — both internships and full-time entry-level positions with local employers."
    },
    {
      question: "Can college representatives coordinate campus drives in Bengaluru through EarlyJobs?",
      answer: "Absolutely. We organize on-campus and virtual drives, shortlisting, scheduling interviews, and providing coordination support to make campus placements smooth and efficient."
    },
    {
      question: "Will my job search remain confidential?",
      answer: "Yes. We maintain strict confidentiality for all candidates. Your profile and applications are only shared with employers you approve or that match your preferences and permissions."
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
            Get answers to common questions about our Bangalore services
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