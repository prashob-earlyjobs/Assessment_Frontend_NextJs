import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Mail, Phone, MapPin, Globe, Linkedin, Instagram, Building2, Users, Briefcase, TrendingUp, HelpCircle } from 'lucide-react';

const ConnectWithUs: React.FC = () => {
  const contactCategories = [
    {
      title: 'Partnerships & Colleges',
      email: 'prajwal@earlyjobs.in',
      icon: Building2,
      description: 'For college partnerships and collaborations'
    },
    {
      title: 'Recruitment & Hiring Solutions',
      email: 'shashank@earlyjobs.in',
      icon: Briefcase,
      description: 'For companies looking to hire at scale'
    },
    {
      title: 'Franchise & Growth Programs',
      email: 'franchise@earlyjobs.in',
      icon: TrendingUp,
      description: 'Explore franchise opportunities and growth partnerships'
    },
    {
      title: 'General Enquiries & Support',
      email: 'info@earlyjobs.ai',
      icon: HelpCircle,
      description: 'General questions and support requests'
    }
  ];

  const socialLinks = [
    {
      name: 'Website',
      url: 'https://www.earlyjobs.ai',
      icon: Globe
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/earlyjobs-official',
      icon: Linkedin
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/earlyjobs.ai/',
      icon: Instagram
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50">
      {/* Logo Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-center">
            <img
              src="/images/logo.png"
              alt="EarlyJobs Logo"
              className="h-16 sm:h-20 w-auto"
            />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Let's Build the Future of Hiring Together
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Whether you are a college leader, a recruiter, an investor, a company hiring at scale or an entrepreneur exploring partnerships, our team would love to connect with you.
            </p>
            <p className="text-lg sm:text-xl text-white/80 mt-4 max-w-2xl mx-auto italic">
              We believe meaningful conversations lead to meaningful impact.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Contact Categories Section */}
        <div className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-4">
            Reach the EarlyJobs Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {contactCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-orange-300">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-orange-100 rounded-lg">
                        <Icon className="h-6 w-6 text-orange-600" />
                      </div>
                      <CardTitle className="text-xl font-semibold text-gray-900">
                        {category.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    <a
                      href={`mailto:${category.email}`}
                      className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium transition-colors group"
                    >
                      <Mail className="h-5 w-5" />
                      <span className="group-hover:underline">{category.email}</span>
                    </a>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Phone Section */}
          <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-orange-300">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Phone className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="text-2xl font-semibold text-gray-900">
                  Talk to Us
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <a
                href="tel:+918217527926"
                className="text-2xl font-bold text-orange-600 hover:text-orange-700 transition-colors block mb-2"
              >
                +91 8217527926
              </a>
              <p className="text-gray-600">
                Available throughout BTS for meetings, demos and collaborations.
              </p>
            </CardContent>
          </Card>

          {/* Address Section */}
          <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-orange-300">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <MapPin className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="text-2xl font-semibold text-gray-900">
                  Visit Us
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 font-medium mb-2">EarlyJobs Office</p>
              <p className="text-gray-600 leading-relaxed">
                53, HustleHub, 5th Cross Rd, near Sony World Signal, 4th Block, Koramangala, Bengaluru, Karnataka 560034
              </p>
              <a
                href="https://maps.google.com/?q=53+HustleHub+5th+Cross+Rd+near+Sony+World+Signal+4th+Block+Koramangala+Bengaluru+Karnataka+560034"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-600 hover:text-orange-700 font-medium mt-3 inline-flex items-center gap-1 transition-colors"
              >
                <MapPin className="h-4 w-4" />
                <span className="hover:underline">View on Map</span>
              </a>
            </CardContent>
          </Card>
        </div>

        {/* Social Media Section */}
        <div className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-8">
            Connect with Us Online
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-6 py-4 bg-white border-2 border-gray-200 rounded-xl hover:border-orange-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                    <Icon className="h-5 w-5 text-orange-600" />
                  </div>
                  <span className="text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                    {social.name}
                  </span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-8 sm:p-12 text-center text-white">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">
            Ready to Transform Your Hiring Process?
          </h3>
          <p className="text-lg sm:text-xl mb-6 opacity-90">
            Get in touch with us today and discover how EarlyJobs can help you find the right talent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:info@earlyjobs.ai"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-orange-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              <Mail className="h-5 w-5" />
              Send us an Email
            </a>
            <a
              href="tel:+918217527926"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 transition-colors border-2 border-white/30"
            >
              <Phone className="h-5 w-5" />
              Call Us Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectWithUs;

