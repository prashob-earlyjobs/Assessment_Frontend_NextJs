"use client";
import Head from 'next/head';
import { Button } from "./components/ui/button";
import {
  ArrowRight,
  Users,
  Award,
  Briefcase,
  FileText,
  Brain,
  Send,
  MapPin,
} from "lucide-react";
import { useRouter } from "next/navigation";
import ToggleSection from './components/pages/ToggleSection';
import Footer from './components/pages/footer';

const Index = () => {
  const navigate = useRouter();

  return (
    <>
      <Head>
        <title>
          EarlyJobs Assessment Platform | Smart Career Assessments & Job
          Matching
        </title>
        <meta
          name="description"
          content="Discover your career potential with EarlyJobs' AI-powered skill assessments, resume builder, career guidance, and bulk job applications. Streamline your job search today!"
        />
        <meta
          name="keywords"
          content="job search, skill assessments, AI resume, career guidance, job applications, EarlyJobs"
        />
        
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between p-[1rem] lg:px-12 bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
          <div className="flex items-center space-x-2">
            <img
              src="/images/logo.png"
              alt="EarlyJobs Logo"
              className="h-20 w-auto"
            />
            {/* <span className="text-xl font-bold text-gray-900">EarlyJobs</span> */}
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="/assessments"
              className="text-gray-600 hover:text-orange-600 transition"
            >
              Assessments
            </a>

            {/* <a href="#testimonials" className="text-gray-600 hover:text-orange-600 transition">Testimonials</a> */}
            <Button
              onClick={() => navigate.push("/login")}
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-2xl px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Started
            </Button>
          </div>
        </header>

        {/* Hero Section */}
        
        <ToggleSection />
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Index;
