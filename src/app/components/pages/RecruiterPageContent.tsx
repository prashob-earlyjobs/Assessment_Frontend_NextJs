"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Menu, X, LogIn } from "lucide-react";
import Recruiter from "../pages/Recruiter";
import Navbar from "../pages/navbar";
import Footer from "../pages/footer";
import { toast } from "sonner";

const RecruiterPageContent = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleMobileMenuItemClick = (path) => {
    router.push(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <Navbar />
      <header className="bg-white shadow-md border-b border-orange-100 sticky top-0 z-50">
        <div className="px-8 lg:pl-26 py-3">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img
                src="/images/logo.png"
                onClick={() => router.push("/")}
                alt="EarlyJobs.ai"
                className="h-14 lg:h-14 cursor-pointer"
              />
            </div>
            <nav className="hidden md:flex space-x-8 items-center">
              <div>
                <a
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 font-semibold mr-3"
                  href="https://portal.earlyjobs.ai/"
                  aria-label="Login"
                >
                  Login
                </a>
                <Button
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 font-semibold"
                  onClick={() => router.push("/apply-as-a-recruiter")}
                  aria-label="Apply as Recruiter"
                >
                  Apply as Recruiter
                </Button>
              </div>
            </nav>
            <div className="md:hidden flex items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 hover:text-orange-600 focus:outline-none p-3"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </Button>
            </div>
          </div>
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white/95 backdrop-blur-sm shadow-lg z-50 px-4 py-4 border-b border-orange-100">
              <div className="flex flex-col space-y-2">
                <Button
                  variant="ghost"
                  className="w-full text-left justify-start text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl py-3 px-4 transition-all duration-300"
                  onClick={() => handleMobileMenuItemClick("/browse-candidates")}
                >
                  Browse Candidates
                </Button>
                <Button
                  variant="ghost"
                  className="w-full text-left justify-start text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl py-3 px-4 transition-all duration-300"
                  onClick={() => handleMobileMenuItemClick("/college-partnerships")}
                >
                  Colleges
                </Button>
                <Button
                  variant="ghost"
                  className="w-full text-left justify-start text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl py-3 px-4 transition-all duration-300"
                  onClick={() => handleMobileMenuItemClick("/recruiter")}
                >
                  Recruiter
                </Button>
                <Button
                  variant="ghost"
                  className="w-full text-left justify-start text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl py-3 px-4 transition-all duration-300"
                  onClick={() => handleMobileMenuItemClick("/talent-pool")}
                >
                  Talent Pool
                </Button>
                <a href="https://portal.earlyjobs.ai/">
                  <Button
                    className="w-full text-left justify-start bg-orange-600 hover:bg-orange-700 text-white rounded-xl py-3 px-4 shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Login"
                  >
                    <LogIn className="h-5 w-5 mr-2" />
                    Login
                  </Button>
                </a>
              </div>
            </div>
          )}
        </div>
      </header>
      <Recruiter />
      <Footer />
    </>
  );
};

export default RecruiterPageContent;