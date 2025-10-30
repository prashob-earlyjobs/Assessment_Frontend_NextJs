"use client"
import Header from '../../components/pages/header';
import Footer from '../../components/pages/footer';
import { Badge } from '../../components/ui/badge';
import { Users, Building2, Trophy } from 'lucide-react';
import HeroSection from '../../components/bangalore-urban/HeroSection'
import BenefitsSection from '../../components/bangalore-urban/BenefitsSection';
import HowItWorksSection from '../../components/bangalore-urban/HowItWorksSection';
import LeadCaptureForm from '../../components/bangalore-urban/LeadCaptureForm';

import FAQSection from '../../components/bangalore-urban/FAQSection';
import Navbar from '@/app/components/pages/navbar';

const UrbanFranchise = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <Navbar />
      <Header />
      <HeroSection />

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
              About EarlyJobs Bangalore Urban
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              India's Hybrid AI + Human Recruiter Platform
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              EarlyJobs is revolutionizing recruitment with cutting-edge AI technology combined with human expertise, 
              delivering exceptional placement results across India.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Proven Track Record</h3>
                <p className="text-gray-600">Strong placement success across multiple industries</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Local Support</h3>
                <p className="text-gray-600">Dedicated Bangalore Urban team with walk-in facilities</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Industry Connect</h3>
                <p className="text-gray-600">Strong network with leading employers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <BenefitsSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Lead Capture Form */}
      <LeadCaptureForm />

      {/* Events Section */}
      {/* <EventsSection /> */}

      {/* FAQ Section */}
      <FAQSection />
      <Footer />
    </div>
  );
};

export default UrbanFranchise;