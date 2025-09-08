"use client";
import { useState, useEffect, useCallback, Suspense } from "react";
import { Button } from "../app/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "../app/components/ui/toggle-group";
import { Briefcase, ClipboardCheck, FileText } from "lucide-react";
import ApplyJobs from "./components/pages/ApplyJob";
import Assessments from "./components/pages/AssessmentsDup";
import AIResume from "./components/pages/ResumePage";
import Footer from "./components/pages/footer";
import { useRouter, useSearchParams } from "next/navigation";

const Index = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSection = searchParams.get("section") || "apply";
  const [activeSection, setActiveSection] = useState(initialSection);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  // Debounced scroll handler
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > 50) {
      setIsNavbarVisible(false);
    } else {
      setIsNavbarVisible(true);
    }
  }, []);

  // Handle scroll and initial position
  useEffect(() => {
    setIsNavbarVisible(window.scrollY <= 50);
    let timeout;
    const debouncedScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(handleScroll, 100);
    };
    window.addEventListener("scroll", debouncedScroll);
    return () => {
      window.removeEventListener("scroll", debouncedScroll);
      clearTimeout(timeout);
    };
  }, [handleScroll]);

  // Sync activeSection with URL
  useEffect(() => {
    const sectionFromUrl = searchParams.get("section") || "apply";
    if (sectionFromUrl !== activeSection) {
      setActiveSection(sectionFromUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    if (searchParams.get("section") !== activeSection) {
      router.push(`?section=${activeSection}`, { scroll: false });
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSection, router]);

  const renderActiveSection = () => {
    switch (activeSection) {
      case "apply":
        return <ApplyJobs />;
      case "assessments":
        return <Assessments />;
      case "resume":
        return <AIResume />;
      default:
        return <ApplyJobs />;
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className="min-h-screen bg-white">
     
      <nav
        className={`bg-gradient-to-br from-orange-400 to-pink-600 shadow-sm transition-transform duration-300 z-30`} // Added z-30
        aria-hidden={!isNavbarVisible}
      >
        <div className="flex items-center justify-end space-x-4 p-2 lg:px-12">
          <Button
            onClick={() => router.push("/candidates")}
            className="bg-transparent text-white text-xl font-bold hover:text-orange-600 hover:bg-orange-50 rounded-2xl px-6 py-2 transition-all duration-300"
            aria-label="Browse Candidates"
          >
            Browse Candidates
          </Button>
          <Button
            onClick={() => router.push("/colleges")}
            className="bg-transparent text-white text-xl font-bold hover:text-orange-600 hover:bg-orange-50 rounded-2xl px-6 py-2 transition-all duration-300"
            aria-label="Colleges"
          >
            Colleges
          </Button>
          <Button
            onClick={() => router.push("/talent-pool")}
            className="bg-transparent text-white text-xl font-bold hover:text-orange-600 hover:bg-orange-50 rounded-2xl px-6 py-2 transition-all duration-300"
            aria-label="Talent Pool"
          >
            Talent Pool
          </Button>
        </div>
      </nav>

      {/* Header with Toggle in Navbar */}
      <header className="flex items-center justify-between px-4 py-4 lg:px-12 bg-white/80 backdrop-blur-sm sticky top-0 z-40 shadow-sm">
        <div className="flex items-center space-x-2">
          <img
            src="/images/logo.png"
            alt="EarlyJobs Logo"
            className="h-14 lg:h-16 w-auto"
          />
        </div>

        {/* Toggle Section in Navbar */}
        <div className="hidden md:flex items-center">
          <ToggleGroup
            type="single"
            value={activeSection}
            onValueChange={(value) => {
              console.log("Toggle value changed:", value);
              value && setActiveSection(value);
            }}
            className="bg-orange-50 p-1 rounded-2xl border border-orange-100 pointer-events-auto"
            aria-label="Section navigation"
          >
            <ToggleGroupItem
              value="apply"
              className="flex items-center gap-2 px-6 py-3 rounded-xl data-[state=on]:bg-orange-500 data-[state=on]:text-white data-[state=on]:shadow-lg text-gray-600 hover:text-orange-600 transition-all duration-300"
              aria-label="Apply Jobs"
            >
              <Briefcase className="h-4 w-4" />
              Apply Jobs
            </ToggleGroupItem>
            <ToggleGroupItem
              value="assessments"
              className="flex items-center gap-2 px-6 py-3 rounded-xl data-[state=on]:bg-orange-500 data-[state=on]:text-white data-[state=on]:shadow-lg text-gray-600 hover:text-orange-600 transition-all duration-300"
              aria-label="Assessments"
            >
              <ClipboardCheck className="h-4 w-4" />
              Assessments
            </ToggleGroupItem>
            <ToggleGroupItem
              value="resume"
              className="flex items-center gap-2 px-6 py-3 rounded-xl data-[state=on]:bg-orange-500 data-[state=on]:text-white data-[state=on]:shadow-lg text-gray-600 hover:text-orange-600 transition-all duration-300"
              aria-label="Resume"
            >
              <FileText className="h-4 w-4" />
              Resume
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            onClick={() => router.push("/login")}
            className="bg-orange-700 hover:bg-orange-600 text-white rounded-2xl px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300"
            aria-label="Sign Up"
          >
            Sign Up
          </Button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden sticky top-0 z-50 px-4 pt-2 bg-white"> {/* Changed to sticky */}
          <ToggleGroup
            type="single"
            value={activeSection}
            onValueChange={(value) => {
              console.log("Mobile toggle value changed:", value);
              value && setActiveSection(value);
            }}
            className="bg-white/90 backdrop-blur-sm p-1 rounded-2xl border border-orange-100 shadow-lg w-full pointer-events-auto"
            aria-label="Mobile section navigation"
          >
            <ToggleGroupItem
              value="apply"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl data-[state=on]:bg-orange-500 data-[state=on]:text-white text-gray-600 transition-all duration-300"
              aria-label="Apply Jobs"
            >
              <Briefcase className="h-4 w-4" />
              Jobs
            </ToggleGroupItem>
            <ToggleGroupItem
              value="assessments"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl data-[state=on]:bg-orange-500 data-[state=on]:text-white text-gray-600 transition-all duration-300"
              aria-label="Assessments"
            >
              <ClipboardCheck className="h-4 w-4" />
              Tests
            </ToggleGroupItem>
            <ToggleGroupItem
              value="resume"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl data-[state=on]:bg-orange-500 data-[state=on]:text-white text-gray-600 transition-all duration-300"
              aria-label="Resume"
            >
              <FileText className="h-4 w-4" />
              Resume
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <div className="animate-in fade-in duration-300 px-0">
          {renderActiveSection()}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
    </Suspense>
  );
};

export default Index;