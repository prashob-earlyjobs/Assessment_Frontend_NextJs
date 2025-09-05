"use client"
import { useState, useEffect } from "react";
import { Button } from "../app/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "../app/components/ui/toggle-group";
import { Briefcase, ClipboardCheck, FileText } from "lucide-react";
import ApplyJobs from "./components/pages/ApplyJob";
import Assessments from "./components/pages/AssessmentsDup";
import AIResume from "./components/pages/ResumePage";
import Footer from "./components/pages/footer";
import {useRouter} from "next/navigation";

const Index = () => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("apply");
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSection]);

  const renderActiveSection = () => {
    switch (activeSection) {
      case "apply":
        return <ApplyJobs />;
      case "assessments":
        return <Assessments />;
      case "resume":
        return <AIResume/>;
      default:
        return <ApplyJobs />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Toggle in Navbar */}
      <header className="flex items-center justify-between p-[1rem] lg:px-12 bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="flex items-center space-x-2">
          <img
            src="/images/logo.png"
            alt="EarlyJobs Logo"
            className="h-20 w-auto"
          />
          {/* <span className="text-xl font-bold text-gray-900">EarlyJobs</span> */}
        </div>

        {/* Toggle Section in Navbar */}
        <div className="hidden md:flex items-center">
          <ToggleGroup 
            type="single" 
            value={activeSection} 
            onValueChange={(value) => value && setActiveSection(value)}
            className="bg-orange-50 p-1 rounded-2xl border border-orange-100"
          >
            <ToggleGroupItem 
              value="apply" 
              className="flex items-center gap-2 px-6 py-3 rounded-xl data-[state=on]:bg-orange-500 data-[state=on]:text-white data-[state=on]:shadow-lg text-gray-600 hover:text-orange-600 transition-all duration-300"
            >
              <Briefcase className="h-4 w-4" />
              Apply Jobs
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="assessments"
              className="flex items-center gap-2 px-6 py-3 rounded-xl data-[state=on]:bg-orange-500 data-[state=on]:text-white data-[state=on]:shadow-lg text-gray-600 hover:text-orange-600 transition-all duration-300"
            >
              <ClipboardCheck className="h-4 w-4" />
              Assessments
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="resume"
              className="flex items-center gap-2 px-6 py-3 rounded-xl data-[state=on]:bg-orange-500 data-[state=on]:text-white data-[state=on]:shadow-lg text-gray-600 hover:text-orange-600 transition-all duration-300"
            >
              <FileText className="h-4 w-4" />
              Resume
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="flex items-center space-x-4">
         

          
          <Button
            onClick={() => router.push("/login")}
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-2xl px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Get Started
          </Button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden fixed top-[120px] left-0 right-0 z-50 px-4">
          <ToggleGroup 
            type="single" 
            value={activeSection} 
            onValueChange={(value) => value && setActiveSection(value)}
            className="bg-white/90 backdrop-blur-sm p-1 rounded-2xl border border-orange-100 shadow-lg w-full"
          >
            <ToggleGroupItem 
              value="apply" 
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl data-[state=on]:bg-orange-500 data-[state=on]:text-white text-gray-600 transition-all duration-300"
            >
              <Briefcase className="h-4 w-4" />
              Jobs
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="assessments"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl data-[state=on]:bg-orange-500 data-[state=on]:text-white text-gray-600 transition-all duration-300"
            >
              <ClipboardCheck className="h-4 w-4" />
              Tests
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="resume"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl data-[state=on]:bg-orange-500 data-[state=on]:text-white text-gray-600 transition-all duration-300"
            >
              <FileText className="h-4 w-4" />
              Resume
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </header>

      {/* Main Content */}
      <main >
        {/* Dynamic Content Based on Active Section */}
        <div className="animate-in fade-in duration-300">
          {renderActiveSection()}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;