"use client"
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Badge } from "../../components/ui/badge";
import { Users, Briefcase, Laptop, MapPin, Phone, Mail, Calendar, ArrowRight, Loader2, CheckCircle, Star, Building2 } from "lucide-react";
import { useEffect, useState } from "react";
import emailjs from '@emailjs/browser';
import { toast } from "sonner";
import FAQSection from "../../components/Mohali/faq";
import HeroSection from "../../components/Mohali/HeroSection";
import { Shield, Clock, Award } from 'lucide-react';
import Header from "../../components/pages/header";
import Footer from "../../components/pages/footer";
import Navbar from "../../components/pages/navbar";
const Index = () => {
  const seoData = {
    title: "EarlyJobs Mohali - Leading Job Placement & Career Development Center",
    description: "Premier recruitment agency in Mohali offering IT, biotech & manufacturing job placements. Get personalized career guidance, skill development & direct industry connections. 500+ successful placements.",
    keywords: [
      "job placement Mohali",
      "IT jobs Mohali",
      "biotech jobs Punjab",
      "manufacturing jobs Mohali",
      "career guidance Mohali",
      "recruitment agency Punjab",
      "placement services tricity",
      "fresher jobs Mohali",
      "skill development Punjab",
      "campus placement partner",
      "job consultancy Mohali",
      "IT recruitment Mohali",
      "career development center",
      "employment agency Punjab",
      "industrial jobs Mohali"
    ].join(", "),
    url: "https://earlyjobs.in/mohali",
    imageUrl: "https://earlyjobs.in/mohali/og-image.jpg"
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    role: "",
    description: ""
  });
  const [phoneError, setPhoneError] = useState('');
  const [loading, setLoading] = useState(false);

  const features = [
    {
      icon: Shield,
      title: "Local Expertise",
      description: "Deep understanding of Mohali's job market and business landscape"
    },
    {
      icon: Clock,
      title: "Quick Response",
      description: "24-48 hours response time for all inquiries"
    },
    {
      icon: Award,
      title: "Proven Success",
      description: "95% placement rate with verified local employers"
    }
  ];

  const validatePhone = (phone) => {
    const cleanPhone = phone.replace(/[^\d+]/g, '').replace('+91', '');
    const phoneRegex = /^\+?\d{10,15}$/;
    
    if (!phone) {
      return 'Phone number is required';
    }
    
    if (!phoneRegex.test(cleanPhone)) {
      return 'Enter a valid phone number with 10-digits';
    }
    
    return '';
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhoneChange = (value) => {
    const raw = value.replace(/\D/g, "");
    let formatted = "+91 ";
    
    if (raw.length > 2) {
      const number = raw.slice(2);
      if (number.length <= 4) {
        formatted += number;
      } else {
        formatted += number.slice(0, 4) + " " + number.slice(4, 10);
      }
    }
    
    handleInputChange('mobile', formatted);
    const error = validatePhone(formatted);
    setPhoneError(error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const sendToUser = emailjs.send(
      process.env.REACT_APP_FRANCHISE_HYD_MOH_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_FRANCHISE_HYD_MOH_EMAILJS_TEMPLATE_ID,
      {
        from_name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        role: formData.role,
        branch: "Mohali"
      },
      process.env.REACT_APP_FRANCHISE_HYD_MOH_EMAILJS_ACCOUNT_KEY
    );

    const sendToTeam = emailjs.send(
      process.env.REACT_APP_FRANCHISE_HYD_MOH_EMAILJS_SERVICE_ID_2,
      process.env.REACT_APP_FRANCHISE_HYD_MOH_EMAILJS_TEMPLATE_ID_2,
      {
        from_name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        role: formData.role,
        Branch: "Mohali",
        message: formData.description,
        tomail: "mohali@earlyjobs.in"
      },
      process.env.REACT_APP_FRANCHISE_HYD_MOH_EMAILJS_ACCOUNT_KEY_2
    );

    Promise.all([sendToUser, sendToTeam])
      .then(() => {
        toast.success('Form Submitted Successfully!');
        setFormData({ name: '', email: '', mobile: '', role: '', description: '' });
        setLoading(false);
      })
      .catch((error) => {
        toast.error('Submission Failed');
        setLoading(false);
        console.error('EmailJS Error:', error);
      });
  };

  return (
    <>
    <Navbar />
    <Header/>
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16 flex flex-col gap-4 md:gap-6">
            <Badge className="border-orange-500 text-orange-500 bg-transparent px-4 py-1 rounded-full text-sm font-medium mx-auto">About EarlyJobs Mohali</Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              AI-Powered, <span className="text-orange-500">Human-Backed</span> Recruitment
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              EarlyJobs is an innovative recruitment platform that supports the industrial and educational strengths of Mohali, including IT, biotech, and manufacturing sectors. Our local franchise provides personalized support and deep understanding of the regional job market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {[
              { icon: Building2, title: "Local Expertise", desc: "Deep understanding of Mohali's business ecosystem" },
              { icon: Users, title: "Community Focus", desc: "Supporting local talent and businesses" },
              { icon: CheckCircle, title: "Proven Results", desc: "500+ successful placements this year" }
            ].map((item, i) => (
              <Card key={i} className="text-center p-6 bg-gradient-to-b from-background to-muted/20 shadow-lg hover:shadow-xl transition-shadow">
                <item.icon className="w-12 h-12 mx-auto mb-4 text-orange-500" />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 md:py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Benefits for <span className="text-orange-500">Everyone</span>
            </h2>
            <p className="text-lg text-muted-foreground mt-4">Tailored solutions for students, colleges, and employers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <Card className="shadow-xl">
              <CardHeader className="text-center p-8 bg-gradient-to-br from-orange-500 to-orange-400 text-primary-foreground">
                <Users className="w-16 h-16 mx-auto mb-4" />
                <CardTitle className="text-2xl">For Students</CardTitle>
                <CardDescription className="opacity-80">Start Your Career in Mohali</CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <ul className="space-y-4">
                  {[
                    "Apply for verified internships and job roles in Mohali",
                    "Resume review and career guidance",
                    "Weekly job alerts and walk-in interview updates",
                    "Free skill development workshops"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-xl">
              <CardHeader className="text-center p-8 bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground">
                <Laptop className="w-16 h-16 mx-auto mb-4" />
                <CardTitle className="text-2xl">For Colleges</CardTitle>
                <CardDescription className="opacity-80">Enhance placement outcomes</CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <ul className="space-y-4">
                  {[
                    "Drive campus hiring through EarlyJobs platform",
                    "Track student placements and progress",
                    "Partner on local skill-development initiatives",
                    "Access to employer network"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-xl">
              <CardHeader className="text-center p-8 bg-gradient-to-br from-orange-500/80 to-secondary text-primary-foreground">
                <Briefcase className="w-16 h-16 mx-auto mb-4" />
                <CardTitle className="text-2xl">For Employers</CardTitle>
                <CardDescription className="opacity-80">Find the right talent fast</CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <ul className="space-y-4">
                  {[
                    "Hire locally for roles in IT, logistics, biotech, sales",
                    "Screened candidate pool from across Mohali",
                    "Fast turnaround and zero subscription cost",
                    "Dedicated account management"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              How It <span className="text-orange-500">Works</span>
            </h2>
            <p className="text-lg text-muted-foreground mt-4">Simple, fast, and effective</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: "1", title: "Register", desc: "Register on the EarlyJobs Mohali portal with your details", color: "bg-orange-500" },
              { num: "2", title: "Upload", desc: "Upload your job requirements or resume to our platform", color: "bg-orange-500" },
              { num: "3", title: "Get Matched", desc: "Get matched, interviewed, and placed through our AI-powered platform", color: "bg-orange-500" }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-4 relative">
                <div className={`w-16 h-16 md:w-20 md:h-20 ${step.color} text-white rounded-full flex items-center justify-center text-2xl md:text-3xl font-bold shadow-lg`}>
                  {step.num}
                </div>
                <h3 className="text-xl md:text-2xl font-semibold">{step.title}</h3>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{step.desc}</p>
                {i < 2 && (
                  <ArrowRight className="hidden md:block absolute top-8 right-[-2rem] w-6 h-6 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Capture Form */}
      <section id="lead-capture" className="bg-[#B03B0F] py-12 md:py-20 px-4 min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 flex-wrap">
          {/* Left Info Section */}
          <div className="flex-1 max-w-[400px] md:max-w-[56%] p-8 rounded-xl text-white animate-fadeIn hover:-translate-y-1 transition-transform">
            <h3 className="text-2xl font-bold text-orange-500 mb-6">Why Choose EarlyJobs Mohali?</h3>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="p-2 bg-orange-500/20 rounded-full">
                    <feature.icon className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">{feature.title}</h4>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <h4 className="text-xl font-semibold mb-4">Get in Touch</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  <span>+91 9056283266, +91-172-4561836</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  <a href="mailto:mohali@earlyjobs.in" className="text-orange-500 hover:underline">mohali@earlyjobs.in</a>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>5.2 Cabin, 5th floor, E 260 BA, Phase 8B Industrial Area Mohali, Sector-74A, Pin-160055</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Section */}
          <div className="flex-1 max-w-[500px] bg-white p-8 rounded-xl shadow-lg text-gray-900">
            <h2 className="text-2xl font-semibold mb-2">Get Started Today</h2>
            <p className="text-gray-600 mb-6">Join thousands of successful candidates and employers</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name *</label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="p-3 text-base border border-gray-300 rounded-lg focus:border-blue-600 focus:ring focus:ring-blue-100"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number *</label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 XXXX XXXXXX"
                  value={formData.mobile}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  required
                  className="p-3 text-base border border-gray-300 rounded-lg focus:border-blue-600 focus:ring focus:ring-blue-100"
                  aria-invalid={!!phoneError}
                  aria-describedby={phoneError ? "phone-error" : undefined}
                />
                {phoneError && (
                  <p id="phone-error" className="text-red-500 text-xs">{phoneError}</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address *</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="p-3 text-base border border-gray-300 rounded-lg focus:border-blue-600 focus:ring focus:ring-blue-100"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="description" className="text-sm font-medium text-gray-700">Description *</label>
                <Input
                  id="description"
                  placeholder="Tell us about your goals or requirements"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  className="p-3 text-base border border-gray-300 rounded-lg focus:border-blue-600 focus:ring focus:ring-blue-100"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="role" className="text-sm font-medium text-gray-700">I am a *</label>
                <Select onValueChange={(value) => setFormData({ ...formData, role: value })}>
                  <SelectTrigger className="p-3 text-base border border-gray-300 rounded-lg focus:border-blue-600 focus:ring focus:ring-blue-100">
                    <SelectValue placeholder="Student / Job Seeker" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Student / Job Seeker">Student / Job Seeker</SelectItem>
                    <SelectItem value="employer">Employer</SelectItem>
                    <SelectItem value="College / Placements">College / Placements</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="city" className="text-sm font-medium text-gray-700">City</label>
                <Input
                  id="city"
                  value="Mohali"
                  disabled
                  className="p-3 text-base border border-gray-300 rounded-lg bg-gray-100"
                />
              </div>
              <Button type="submit" className="p-3 text-base font-semibold text-white bg-orange-500 hover:bg-orange-600 rounded-lg shadow-lg flex items-center justify-center gap-2">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Join EarlyJobs Mohali'}
              </Button>
              <p className="text-xs text-gray-500 mt-2">
                By submitting this form, you agree to our
                <a href="/terms-and-conditions" className="text-orange-500 hover:underline"> Terms of Service </a>
                and
                <a href="/privacy-policy" className="text-orange-500 hover:underline"> Privacy Policy</a>
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Events Section */}
      {/* <section className="py-12 md:py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Upcoming <span className="text-orange-500">Events & Updates</span>
            </h2>
            <p className="text-lg text-muted-foreground mt-4">Stay connected with the latest opportunities</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              { badge: "Job Drive", title: "Mohali IT Job Fair 2024", desc: "Join us for the biggest IT job fair in Mohali with 50+ companies hiring.", status: "Coming Soon", icon: Briefcase },
              { badge: "Partnership", title: "College Tie-up Program", desc: "Expanding our network with local engineering and management colleges.", status: "Ongoing", icon: Building2 },
              { badge: "Skill Session", title: "Resume Building Workshop", desc: "Free workshop on creating industry-ready resumes for freshers.", status: "Every Saturday", icon: Calendar }
            ].map((event, i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2 py-1 text-xs font-medium text-orange-500 bg-orange-100 border border-orange-200 rounded">{event.badge}</span>
                    <event.icon className="w-6 h-6 text-orange-500" />
                  </div>
                  <h3 className="text-xl font-medium">{event.title}</h3>
                </div>
                <div className="p-4">
                  <p className="text-muted-foreground mb-4 leading-relaxed">{event.desc}</p>
                  <span className="px-3 py-1 text-xs text-orange-500 border border-orange-500 rounded">{event.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* FAQ Section */}
      <FAQSection />
    </div>
    <Footer />
    </>
  );
};

export default Index;