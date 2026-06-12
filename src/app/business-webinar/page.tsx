"use client";
import { useState, useRef } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { toast } from "sonner";
import { CalendarDays, Clock, Monitor, Gift, Users, TrendingUp, Brain, DollarSign, CheckCircle, Star, MapPin } from "lucide-react";
import Header from "../components/pages/header";
import Footer from "../components/pages/footer";
import emailjs from '@emailjs/browser';

const Index = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    city: "",
    category: ""
  });

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.mobile || !formData.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      // Send email to admin only
      await emailjs.send(
        'service_ovaxj17',
        'template_hxxuywh',
        {
          user_name: formData.name,
          user_email: formData.email,
          user_mobile: formData.mobile,
          user_city: formData.city,
          user_category: formData.category
        },
        'Qz7wBRaW9bttj7rra' 
      );

      // Success message
      toast.success("Registration Successful!", {
        description: "Your registration details have been sent to the admin."
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        mobile: "",
        city: "",
        category: ""
      });
    } catch (error) {
      toast.error("Error", {
        description: "Failed to send registration details. Please try again."
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const categories = [
    "Aspiring Entrepreneur",
    "Small Business Owner",
    "Training / Coaching Institute Owner",
    "Working Professional (Exploring Business)",
    "Investor / Business Enthusiast",
    "Student / Fresher (Interested in Entrepreneurship)"
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <Header />
      <section className="relative min-h-[90vh] bg-gradient-to-r from-orange-500 to-orange-600 text-white overflow-hidden px-4 lg:py-10">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center ">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-3xl lg:text-6xl font-bold leading-tight">
                  Build Your Business,
                  <span className="block text-white/90">Unlock New Opportunities</span>
                </h1>
                <p className="text-xl lg:text-2xl text-white/80 font-medium">
                  Free Webinar Series for Entrepreneurs & Business Aspirants – powered by EarlyJobs
                </p>
              </div>
              
              <div className="flex flex-wrap gap-6 text-lg">
                <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                  <CalendarDays className="w-5 h-5" />
                  <span>December 15, 2024</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                  <Clock className="w-5 h-5" />
                  <span>7:00 PM IST</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                  <Monitor className="w-5 h-5" />
                  <span>Live on Zoom</span>
                </div>
              </div>

              <Button 
                size="lg" 
                className="bg-white text-orange-500 hover:bg-white/90 text-xl px-8 py-4 h-auto font-bold shadow-lg"
                onClick={scrollToForm}
              >
                Reserve My Free Seat
              </Button>
            </div>
            
            <div className="relative order-first lg:order-last">
              <img 
                src="/images/course1.jpg" 
                alt="Business professionals collaborating in a modern workspace" 
                className="rounded-lg shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Attend Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">Why Attend This Webinar?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get exclusive insights and practical strategies to accelerate your business growth
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "High-Growth Niches for 2025",
                description: "Discover untapped markets and emerging opportunities in the recruitment industry"
              },
              {
                icon: Brain,
                title: "AI-Powered Business Growth",
                description: "Learn how to leverage artificial intelligence to scale your small business efficiently"
              },
              {
                icon: DollarSign,
                title: "EarlyJobs Franchise ROI",
                description: "Get detailed ROI analysis and FAQs about our franchise opportunity"
              },
              {
                icon: Users,
                title: "Real Success Stories",
                description: "Hear from actual entrepreneurs who built successful businesses with EarlyJobs"
              }
            ].map((item, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white/50 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About EarlyJobs */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge className="bg-orange-500 text-white text-lg px-4 py-2">About EarlyJobs</Badge>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-800">
                  India's First Tech-Enabled Recruitment Franchise Network
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  We're revolutionizing the recruitment industry with technology-driven solutions, 
                  empowering entrepreneurs across India to build successful businesses while solving 
                  the unemployment crisis.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                {[
                  { number: "20+", label: "Active Districts" },
                  { number: "1,500+", label: "Successful Placements" },
                  { number: "60+", label: "Corporate Partners" },
                  { number: "1M", label: "Students by 2027" }
                ].map((stat, index) => (
                  <div key={index} className="text-center p-6 bg-gray-100 rounded-lg">
                    <div className="text-3xl font-bold text-orange-500 mb-2">{stat.number}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-8">
              <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-none shadow-lg shadow-orange-200">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                  <p className="text-lg leading-relaxed opacity-90">
                    "To empower 1 million students with career opportunities by 2027, 
                    creating a network of successful entrepreneurs who drive India's economic growth."
                  </p>
                </CardContent>
              </Card>
              
              <div className="space-y-4">
                {[
                  "Technology-driven recruitment solutions",
                  "Comprehensive training and support",
                  "Proven business model with strong ROI",
                  "Growing network of successful partners"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-orange-500 flex-shrink-0" />
                    <span className="text-gray-800 text-lg">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Freebies Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Gift className="w-8 h-8 text-orange-500" />
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-800">Exclusive Freebies for Attendees</h2>
            </div>
            <p className="text-xl text-gray-600">
              Join the webinar and get these valuable resources absolutely free
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "📚",
                title: "Business Builder Guide",
                description: "Complete roadmap to start your recruitment business"
              },
              {
                icon: "🚀",
                title: "ROI Analysis Deck",
                description: "Detailed financial projections and growth metrics"
              },
              {
                icon: "🤖",
                title: "AI Tools Kit",
                description: "Curated list of AI tools to automate your business"
              },
              {
                icon: "🎤",
                title: "Live Q&A Session",
                description: "Direct access to founders and successful partners"
              }
            ].map((item, index) => (
              <Card key={index} className="text-center border-orange-200 shadow-lg shadow-orange-100 hover:shadow-xl hover:shadow-orange-200 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Speakers Section */}
    

      {/* Registration Form */}
      <section id="register" className="py-20 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">Secure Your Free Seat Now</h2>
              <p className="text-xl opacity-90">
                Limited seats available. Register now to get instant access to joining details.
              </p>
            </div>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 shadow-lg">
              <CardContent className="p-8">
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-white text-lg mb-2 block">Full Name *</Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="bg-white/20 border-white/30 text-white placeholder:text-white/70 text-lg py-3"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-white text-lg mb-2 block">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="bg-white/20 border-white/30 text-white placeholder:text-white/70 text-lg py-3"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="mobile" className="text-white text-lg mb-2 block">WhatsApp Number *</Label>
                      <Input
                        id="mobile"
                        type="tel"
                        value={formData.mobile}
                        onChange={(e) => handleInputChange("mobile", e.target.value)}
                        className="bg-white/20 border-white/30 text-white placeholder:text-white/70 text-lg py-3"
                        placeholder="+91 XXXXX XXXXX"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="city" className="text-white text-lg mb-2 block">City</Label>
                      <Input
                        id="city"
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        className="bg-white/20 border-white/30 text-white placeholder:text-white/70 text-lg py-3"
                        placeholder="Your city"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="category" className="text-white text-lg mb-2 block">I am a... *</Label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => handleInputChange("category", e.target.value)}
                      className="w-full bg-white/20 border-white/30 text-gray-700 text-lg py-3 px-4 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all duration-300 hover:bg-orange-50 hover:border-orange-400"
                      required
                    >
                      <option value="" disabled className="text-gray-500">Select a category</option>
                      {categories.map((category, index) => (
                        <option key={index} value={category} className="text-gray-700 bg-white hover:bg-orange-100">{category}</option>
                      ))}
                    </select>
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-white text-orange-500 hover:bg-white/90 text-xl py-4 h-auto font-bold shadow-lg"
                  >
                    Yes, Save My Spot!
                  </Button>
                  
                 
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-20 bg-white text-orange-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-6xl font-bold mb-8">
            Your Business Journey Starts Here.
            <span className="block text-black/90">Don't Miss Out.</span>
          </h2>
          <p className="text-xl lg:text-2xl mb-12 opacity-90 max-w-3xl mx-auto text-gray-800">
            Join hundreds of entrepreneurs who are building successful businesses with EarlyJobs. 
            Register now for this exclusive webinar and take the first step towards financial freedom.
          </p>
          
          <div className="space-y-6">
            <Button 
              size="lg" 
              className="bg-white text-orange-500 hover:bg-white/90 text-2xl px-12 py-6 h-auto font-bold shadow-lg shadow-orange-200"
              onClick={scrollToForm}
            >
              Register Free Now
            </Button>
            
            <div className="flex flex-wrap justify-center gap-8 text-lg opacity-90">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6" />
                <span>100% Free</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6" />
                <span>Live Q&A</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6" />
                <span>Exclusive Resources</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6" />
                <span>Limited Seats</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Index;