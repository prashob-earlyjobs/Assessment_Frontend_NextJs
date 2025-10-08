"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "../app/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "../app/components/ui/toggle-group";
import { Briefcase, ClipboardCheck, FileText, LogOut, LogIn, Menu, X } from "lucide-react";
import Footer from "./components/pages/footer";
import { useRouter, usePathname } from "next/navigation";
import ApplyJobs from "./components/pages/ApplyJob";
import Navbar from "./components/pages/navbar";
import { useUser } from "./context";
import { Avatar, AvatarFallback, AvatarImage } from "../app/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../app/components/ui/alert-dialog";
import { toast } from "sonner";
import { userLogout } from "../app/components/services/servicesapis";

const Index = () => {
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
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white">
      <Navbar />
      
      {/* Main Navigation Header */}
      <header className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-16 xl:px-24 bg-white/90 backdrop-blur-md sticky top-0 z-40 shadow-sm border-b border-gray-100/50">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <img
            src="/images/logo.png"
            alt="EarlyJobs Logo"
            className="h-12 sm:h-14 lg:h-16 w-auto cursor-pointer transition-transform hover:scale-105"
            onClick={() => router.push('/')}
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
          <ToggleGroup
            type="single"
            value={activeSection}
            onValueChange={handleToggleChange}
            className="bg-gradient-to-r from-orange-50 to-orange-100/50 p-1.5 rounded-full border border-orange-200/30 shadow-sm"
            aria-label="Section navigation"
          >
            <ToggleGroupItem
              value="apply"
              className="flex items-center gap-2 px-4 py-2.5 lg:px-6 lg:py-3 rounded-full data-[state=on]:bg-gradient-to-r data-[state=on]:from-orange-500 data-[state=on]:to-orange-600 data-[state=on]:text-white data-[state=on]:shadow-md text-gray-700 hover:text-orange-600 transition-all duration-300 font-medium"
              aria-label="Apply Jobs"
            >
              <Briefcase className="h-4 w-4" />
              Apply Jobs
            </ToggleGroupItem>
            <ToggleGroupItem
              value="assessments"
              className="flex items-center gap-2 px-4 py-2.5 lg:px-6 lg:py-3 rounded-full data-[state=on]:bg-gradient-to-r data-[state=on]:from-orange-500 data-[state=on]:to-orange-600 data-[state=on]:text-white data-[state=on]:shadow-md text-gray-700 hover:text-orange-600 transition-all duration-300 font-medium"
              aria-label="Assessments"
            >
              <ClipboardCheck className="h-4 w-4" />
              Assessments
            </ToggleGroupItem>
            <ToggleGroupItem
              value="resume"
              className="flex items-center gap-2 px-4 py-2.5 lg:px-6 lg:py-3 rounded-full data-[state=on]:bg-gradient-to-r data-[state=on]:from-orange-500 data-[state=on]:to-orange-600 data-[state=on]:text-white data-[state=on]:shadow-md text-gray-700 hover:text-orange-600 transition-all duration-300 font-medium"
              aria-label="Resume"
            >
              <FileText className="h-4 w-4" />
              Resume
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* User Actions Section */}
        <div className="flex items-center gap-3 lg:gap-4">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden rounded-full p-2.5 hover:bg-orange-50 hover:text-orange-600 transition-all duration-200"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {userCredentials !== null ? (
            <div className="hidden md:flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowLogoutDialog(true)}
                className="rounded-full p-2.5 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
              >
                <LogOut className="h-5 w-5" />
              </Button>

              <div
                className="flex items-center gap-3 cursor-pointer p-1.5 pr-3 rounded-full hover:bg-gray-50 transition-all duration-200"
                onClick={handleProfileClick}
              >
                <Avatar className="h-9 w-9 ring-2 ring-orange-100">
                  <AvatarImage src={userCredentials.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-orange-500 to-orange-600 text-white font-semibold">
                    {userCredentials?.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      ?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-semibold text-gray-900 leading-tight">
                    {userCredentials.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {userCredentials.profile?.preferredJobRole || 'Job Seeker'}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="hidden md:flex items-center">
              <Button
                onClick={() => router.push("/login")}
                className="flex bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white rounded-full px-5 py-2.5 lg:px-7 shadow-md hover:shadow-lg transition-all duration-300 font-medium"
                aria-label="Login"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm shadow-lg z-50 px-4 py-4 border-b border-orange-100 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-2">
            {userCredentials !== null && (
              <div
                className="flex items-center gap-3 cursor-pointer px-3 py-3 rounded-xl hover:bg-orange-50 transition-colors"
                onClick={handleProfileClick}
              >
                <Avatar className="h-10 w-10 ring-2 ring-orange-100">
                  <AvatarImage src={userCredentials.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-orange-500 to-orange-600 text-white font-semibold">
                    {userCredentials?.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      ?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-900">
                    {userCredentials.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {userCredentials.profile?.preferredJobRole || 'Job Seeker'}
                  </p>
                </div>
              </div>
            )}
            <Button
              variant="ghost"
              className="w-full text-left justify-start text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl py-3 px-4 transition-all duration-200 font-medium"
              onClick={() => handleMobileMenuItemClick("/browse-candidates")}
            >
              <Briefcase className="h-4 w-4 mr-3 text-orange-500" />
              Browse Candidates
            </Button>
            <Button
              variant="ghost"
              className="w-full text-left justify-start text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl py-3 px-4 transition-all duration-200 font-medium"
              onClick={() => handleMobileMenuItemClick("/college-partnerships")}
            >
              <ClipboardCheck className="h-4 w-4 mr-3 text-orange-500" />
              Colleges
            </Button>
             <Button
              variant="ghost"
              className="w-full text-left justify-start text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl py-3 px-4 transition-all duration-200 font-medium"
              onClick={() => handleMobileMenuItemClick("/recruiter")}
            >
              <FileText className="h-4 w-4 mr-3 text-orange-500" />
              Recruiter
            </Button>
            <Button
              variant="ghost"
              className="w-full text-left justify-start text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl py-3 px-4 transition-all duration-200 font-medium"
              onClick={() => handleMobileMenuItemClick("/talent-pool")}
            >
              <Menu className="h-4 w-4 mr-3 text-orange-500" />
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

      {/* Mobile Sticky Navigation */}
      <div className="md:hidden sticky top-0 z-30 px-4 pt-3 pb-2 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <ToggleGroup
          type="single"
          value={activeSection}
          onValueChange={handleToggleChange}
          className="bg-gradient-to-r from-orange-50 to-orange-100/50 p-1 rounded-full border border-orange-200/30 shadow-sm w-full"
          aria-label="Mobile section navigation"
        >
          <ToggleGroupItem
            value="apply"
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full data-[state=on]:bg-gradient-to-r data-[state=on]:from-orange-500 data-[state=on]:to-orange-600 data-[state=on]:text-white data-[state=on]:shadow-md text-gray-700 transition-all duration-300 font-medium text-sm"
            aria-label="Apply Jobs"
          >
            <Briefcase className="h-4 w-4" />
            Jobs
          </ToggleGroupItem>
          <ToggleGroupItem
            value="assessments"
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full data-[state=on]:bg-gradient-to-r data-[state=on]:from-orange-500 data-[state=on]:to-orange-600 data-[state=on]:text-white data-[state=on]:shadow-md text-gray-700 transition-all duration-300 font-medium text-sm"
            aria-label="Assessments"
          >
            <ClipboardCheck className="h-4 w-4" />
            Tests
          </ToggleGroupItem>
          <ToggleGroupItem
            value="resume"
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full data-[state=on]:bg-gradient-to-r data-[state=on]:from-orange-500 data-[state=on]:to-orange-600 data-[state=on]:text-white data-[state=on]:shadow-md text-gray-700 transition-all duration-300 font-medium text-sm"
            aria-label="Resume"
          >
            <FileText className="h-4 w-4" />
            Resume
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* Main Content */}
      <main className="relative">
        <div className="animate-in fade-in duration-500">
          <ApplyJobs />
        </div>
      </main>

      <Footer />

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent className="rounded-3xl border-orange-100 shadow-xl">
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
  );
};

export default Index;