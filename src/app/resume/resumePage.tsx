"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "../components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "../components/ui/toggle-group";
import { Briefcase, ClipboardCheck, FileText, LogOut, LogIn, Menu, X } from "lucide-react";
import AIResume from "../components/pages/ResumePage";
import Footer from "../components/pages/footer";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "../context";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";
import { toast } from "sonner";
import { userLogout } from "../components/services/servicesapis";
import Navbar from "../components/pages/navbar";
import Head from "next/head";

const ResumePage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const activeSection = pathname === "/" ? "apply" : pathname.slice(1) || "apply";
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { userCredentials, setUserCredentials } = useUser();

  // Debounced scroll handler
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    setIsNavbarVisible(currentScrollY <= 50);
  }, []);

  // Handle scroll
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

  // Fallback to ensure metadata is updated client-side
  useEffect(() => {
    document.title = "EarlyJobs - AI Resume Builder Tool";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Build a professional resume easily with AI, tailored for Indian students & freshers to stand out in job applications."
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = "Build a professional resume easily with AI, tailored for Indian students & freshers to stand out in job applications.";
      document.head.appendChild(meta);
    }
  }, []);

  const handleToggleChange = (value: string) => {
    if (value) {
      const route = value === "assessments" ? "/skill-assessments" : value === "apply" ? "/" : `/${value}`;
      router.push(route);
    }
  };

  const handleProfileClick = () => {
    router.push("/profile");
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      const response = await userLogout();
      if (!response.success) {
        throw new Error("Logout failed");
      }
      toast.success("Logged out successfully!");
      setUserCredentials(null);
      router.push("/login");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  const handleMobileMenuItemClick = (route: string) => {
    router.push(route);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      
      <div className="min-h-screen bg-white">
        <Navbar />
        <header className="flex items-center justify-between px-4 py-3 lg:px-12 bg-white/80 backdrop-blur-sm md:sticky md:top-0 z-40 shadow-sm">
          <div className="flex items-center space-x-2">
            <img
              src="/images/logo.png"
              alt="EarlyJobs Logo"
              className="h-14 lg:h-16 w-auto cursor-pointer"
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
                className="flex items-center gap-2 px-4 py-2 lg:px-6 lg:py-3 rounded-xl data-[state=on]:bg-orange-500 data-[state=on]:text-white data-[state=on]:shadow-lg text-gray-600 hover:text-orange-600 transition-all duration-300"
                aria-label="Apply Jobs"
              >
                <Briefcase className="h-4 w-4" />
                Apply Jobs
              </ToggleGroupItem>
              <ToggleGroupItem
                value="assessments"
                className="flex items-center gap-2 px-4 py-2 lg:px-6 lg:py-3 rounded-xl data-[state=on]:bg-orange-500 data-[state=on]:text-white data-[state=on]:shadow-lg text-gray-600 hover:text-orange-600 transition-all duration-300"
                aria-label="Assessments"
              >
                <ClipboardCheck className="h-4 w-4" />
                Assessments
              </ToggleGroupItem>
              <ToggleGroupItem
                value="resume"
                className="flex items-center gap-2 px-4 py-2 lg:px-6 lg:py-3 rounded-xl data-[state=on]:bg-orange-500 data-[state=on]:text-white data-[state=on]:shadow-lg text-gray-600 hover:text-orange-600 transition-all duration-300"
                aria-label="Resume"
              >
                <FileText className="h-4 w-4" />
                Resume
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden rounded-2xl p-3 hover:bg-orange-50 hover:text-orange-600 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

            {userCredentials !== null ? (
              <div className="hidden md:flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowLogoutDialog(true)}
                  className="rounded-2xl p-3 hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                </Button>

                <div
                  className="flex items-center space-x-3 cursor-pointer"
                  onClick={handleProfileClick}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={userCredentials.avatar} />
                    <AvatarFallback className="bg-gradient-to-r from-orange-500 to-purple-600 text-white">
                      {userCredentials?.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")
                        ?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block">
                    <p className="text-sm font-medium text-gray-900">
                      {userCredentials.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {userCredentials.profile?.preferredJobRole}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <Button
                onClick={() => router.push("/login")}
                className="hidden md:block bg-orange-700 hover:bg-orange-600 text-white rounded-2xl px-4 py-2 lg:px-6 lg:py-2 shadow-lg hover:shadow-xl transition-all duration-300 w-full md:w-auto"
                aria-label="Login"
              >
                <LogIn className="h-5 w-5 mr-2 inline" />
                Login
              </Button>
            )}
          </div>
        </header>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-sm shadow-lg z-50 px-4 py-4 border-b border-orange-100">
            <div className="flex flex-col space-y-2">
              {userCredentials !== null && (
                <div
                  className="flex items-center space-x-3 cursor-pointer px-4 py-3"
                  onClick={handleProfileClick}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={userCredentials.avatar} />
                    <AvatarFallback className="bg-gradient-to-r from-orange-500 to-purple-600 text-white">
                      {userCredentials?.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")
                        ?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {userCredentials.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {userCredentials.profile?.preferredJobRole}
                    </p>
                  </div>
                </div>
              )}
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
              {userCredentials !== null ? (
                <Button
                  variant="ghost"
                  className="w-full text-left justify-start text-red-600 hover:bg-red-50 rounded-xl py-3 px-4 transition-all duration-300"
                  onClick={() => {
                    setShowLogoutDialog(true);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </Button>
              ) : (
                <Button
                  className="w-full text-left justify-start bg-orange-700 hover:bg-orange-600 text-white rounded-xl py-3 px-4 shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => {
                    router.push("/login");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <LogIn className="h-5 w-5 mr-2" />
                  Login
                </Button>
              )}
            </div>
          </div>
        )}

        <div className="md:hidden sticky top-0 z-50 px-4 pt-2 bg-background">
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

        <main>
          <div className="animate-in fade-in duration-300">
            <AIResume />
          </div>
        </main>

        <Footer />

        <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
          <AlertDialogContent className="rounded-3xl">
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to logout? You will need to sign in again to
                access your account.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="rounded-2xl">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleLogout}
                className="rounded-2xl bg-red-600 hover:bg-red-700"
              >
                Logout
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
};

export default ResumePage;