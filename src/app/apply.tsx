"use client";
import { useState, useEffect, useCallback } from "react";
import { Button } from "../app/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "../app/components/ui/toggle-group";
import { Briefcase, ClipboardCheck, FileText } from "lucide-react";
import ApplyJobs from "./components/pages/ApplyJob";
import Footer from "./components/pages/footer";
import { useRouter, usePathname } from "next/navigation";

const ApplyPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const activeSection = pathname === "/" ? "apply" : pathname.slice(1) || "apply";
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    setIsNavbarVisible(currentScrollY <= 50);
  }, []);

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

  const handleToggleChange = (value: string) => {
  if (value) {
  const route = value === "assessments" ? "/skill-assessments" : value === "apply" ? "/" : `/${value}`;
  router.push(route);
}
  };

  return (
    <div className="min-h-screen bg-white">
      {/* <nav
        className={`bg-gradient-to-br from-orange-400 to-pink-600 shadow-sm transition-transform duration-300 z-30`}
        aria-hidden={!isNavbarVisible}
      >
        <div className="flex items-center justify-end space-x-4 p-2 lg:px-12">
          <Button
            onClick={() => router.push("/browse-candidates")}
            className="bg-transparent text-white text-xl font-bold hover:text-orange-600 hover:bg-orange-50 rounded-2xl px-6 py-2 transition-all duration-300"
            aria-label="Browse Candidates"
          >
            Browse Candidates
          </Button>
          <Button
            className="bg-transparent text-white text-xl font-bold hover:text-orange-600 hover:bg-orange-50 rounded-2xl px-6 py-2 transition-all duration-300"
            aria-label="Colleges"
          >
            Colleges
          </Button>
          <Button
            className="bg-transparent text-white text-xl font-bold hover:text-orange-600 hover:bg-orange-50 rounded-2xl px-6 py-2 transition-all duration-300"
            aria-label="Talent Pool"
          >
            Talent Pool
          </Button>
        </div>
      </nav> */}

      <header className="flex items-center justify-between px-4 py-4 lg:px-12 bg-white/80 backdrop-blur-sm sticky top-0 z-40 shadow-sm">
        <div className="flex items-center space-x-2">
          <img
            src="/images/logo.png"
            alt="EarlyJobs Logo"
            className="h-14 lg:h-16 w-auto"
          />
        </div>

        <div className="hidden md:flex items-center">
          <ToggleGroup
            type="single"
            value={activeSection}
            onValueChange={handleToggleChange}
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

        <div className="md:hidden sticky top-0 z-50 px-4 pt-2 bg-white">
          <ToggleGroup
            type="single"
            value={activeSection}
            onValueChange={handleToggleChange}
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

      <main>
        <div className="animate-in fade-in duration-300 px-0">
          <ApplyJobs />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ApplyPage;