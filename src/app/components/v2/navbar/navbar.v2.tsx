"use client";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { Button } from "../../ui/button";
import { Menu, X, User, LogOut, Briefcase, Users, Sparkles, Zap, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { useUser } from "@/app/context";
import { userLogout } from "../../services/servicesapis";
import Cookies from "js-cookie";
import axiosInstance from "../../services/apiinterseptor";

const NavbarV2 = ({ pageTitle, showPageTitle }: { pageTitle?: string; showPageTitle?: boolean } = {}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLightBackground, setIsLightBackground] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState("");
  const navRef = useRef<HTMLElement>(null);
  const { userCredentials, setUserCredentials } = useUser();

  useLayoutEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken || userCredentials) {
      setUserLoggedIn("true");
    } else {
      setUserLoggedIn("false");
    }
  }, [pathname, userCredentials]);

  const handleLogout = async () => {
    try {
      await userLogout();
      // Clear all auth data
      Cookies.remove("accessToken");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userCredentials");
      axiosInstance.defaults.headers.Authorization = "";
      setUserCredentials(null);
      setUserLoggedIn("false");
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
      // Still clear local data even if API call fails
      Cookies.remove("accessToken");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userCredentials");
      axiosInstance.defaults.headers.Authorization = "";
      setUserCredentials(null);
      setUserLoggedIn("false");
      router.push("/");
    }
  };

  const navLinks = [
    { label: "Jobs", path: "/jobs" },
    { label: "Resume", path: "/resume" },
    { label: "Talent Pool", path: "/talent-pool" },
    { label: "AI Interview", path: "/interview-buddy", highlight: true },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  const handleLinkClick = (path: string) => {
    router.push(path);
    setIsMobileMenuOpen(false);
  };

  // Function to get the RGB value from a color string
  const getRGB = (color: string): number[] => {
    // Handle rgb/rgba format: "rgb(255, 255, 255)" or "rgba(255, 255, 255, 0.5)"
    const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (rgbMatch) {
      return [parseInt(rgbMatch[1]), parseInt(rgbMatch[2]), parseInt(rgbMatch[3])];
    }

    // Handle hex format: "#ffffff" or "#fff"
    if (color.startsWith('#')) {
      const hex = color.slice(1);
      const r = parseInt(hex.length === 3 ? hex[0] + hex[0] : hex.slice(0, 2), 16);
      const g = parseInt(hex.length === 3 ? hex[1] + hex[1] : hex.slice(2, 4), 16);
      const b = parseInt(hex.length === 3 ? hex[2] + hex[2] : hex.slice(4, 6), 16);
      return [r, g, b];
    }

    // Fallback to white
    return [255, 255, 255];
  };

  // Function to calculate relative luminance
  const getLuminance = (rgb: number[]): number => {
    const [r, g, b] = rgb.map(val => {
      val = val / 255;
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  // Function to detect if background is light or dark
  const detectBackgroundContrast = () => {
    // Guard against SSR - only run on client side
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    if (!navRef.current) return;

    // Special handling for home page at top - hero section has dark background
    if (pathname === '/') {
      // Check if hero section exists and is visible
      const heroSection = document.querySelector('[class*="hero"], [class*="Hero"]');
      if (heroSection) {
        const heroRect = heroSection.getBoundingClientRect();
        // If we're within the hero section height (typically 100vh), use dark navbar
        if (window.scrollY < heroRect.height + 100) {
          setIsLightBackground(false);
          return;
        }
      }
    }

    const navRect = navRef.current.getBoundingClientRect();
    const sampleY = navRect.bottom + 5; // Sample just below navbar
    const sampleX = window.innerWidth / 2; // Sample at center

    const elementBelow = document.elementFromPoint(sampleX, sampleY);
    if (!elementBelow) return;

    // Check if we're sampling the hero section (has dark overlay)
    const heroElement = elementBelow.closest('[class*="hero"], [class*="Hero"]');
    if (heroElement) {
      const heroStyle = window.getComputedStyle(heroElement);
      const heroBg = heroStyle.backgroundColor;

      // Check if hero has dark background or overlay
      if (heroBg !== 'rgba(0, 0, 0, 0)' && heroBg !== 'transparent') {
        const heroRgb = getRGB(heroBg);
        const heroLuminance = getLuminance(heroRgb);
        if (heroLuminance <= 0.5) {
          setIsLightBackground(false);
          return;
        }
      } else {
        // Hero with image/overlay - check for dark overlay patterns
        const hasDarkOverlay = heroElement.querySelector('[class*="black"], [class*="bg-black"], [style*="black"]');
        if (hasDarkOverlay) {
          setIsLightBackground(false);
          return;
        }
      }
    }

    const computedStyle = window.getComputedStyle(elementBelow);
    let bgColor = computedStyle.backgroundColor;

    // If background is transparent, traverse up the DOM tree
    if (bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') {
      let parent = elementBelow.parentElement;
      let depth = 0;
      while (parent && depth < 5 && (bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent')) {
        const parentStyle = window.getComputedStyle(parent);
        bgColor = parentStyle.backgroundColor;
        parent = parent.parentElement;
        depth++;
      }
    }

    // Fallback to white if still transparent
    if (bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') {
      bgColor = 'rgb(255, 255, 255)';
    }

    const rgb = getRGB(bgColor);
    const luminance = getLuminance(rgb);

    // If luminance > 0.5, background is light (use dark text)
    // If luminance <= 0.5, background is dark (use light text)
    setIsLightBackground(luminance > 0.5);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen && navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    // Guard against SSR - only run on client side
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    // Initial detection
    const timer = setTimeout(detectBackgroundContrast, 100);

    // Detect on scroll
    const handleScroll = () => {
      detectBackgroundContrast();
    };

    // Detect on resize
    const handleResize = () => {
      detectBackgroundContrast();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    window.addEventListener('load', detectBackgroundContrast);

    // Use MutationObserver to detect DOM changes
    const observer = new MutationObserver(detectBackgroundContrast);
    if (document.body) {
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class'],
      });
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', detectBackgroundContrast);
      observer.disconnect();
    };
  }, [pathname]);

  // Close mobile hamburger menu when user scrolls (mobile only)
  useEffect(() => {
    const handleScrollCloseMenu = () => {
      if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    };
    window.addEventListener("scroll", handleScrollCloseMenu, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollCloseMenu);
  }, [isMobileMenuOpen]);

  // Dynamic classes based on background contrast - Always use light background for better logo visibility
  const navClasses = "fixed top-4 left-4 right-4 z-50 mx-auto max-w-8xl bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/90 border border-gray-200/50 rounded-2xl shadow-lg text-gray-900";

  return (
    <>
    <style jsx global>{`
      @keyframes peek {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        25% { transform: translateY(-4px) rotate(-8deg); }
        50% { transform: translateY(-2px) rotate(4deg); }
        75% { transform: translateY(-5px) rotate(-4deg); }
      }
    `}</style>
    <nav ref={navRef} className={navClasses}>
      <div className="px-4 sm:px-6 lg:px-20 xl:px-28">
        <div className="flex items-center justify-between h-20">
          {/* Left side - Logo, Page Title (when scrolled) and Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Logo */}
            <button
              onClick={() => router.push("/")}
              className="flex items-center mr-4"
            >
              <Image
                src="/v2/logo/logo (1).png"
                alt="EarlyJobs"
                width={240}
                height={80}
                className="object-contain h-16 w-auto"
                priority
              />
            </button>
            <div className="flex items-center space-x-8">
              {navLinks.map((link) =>
                link.highlight ? (
                  <div key={link.path} className="relative group mr-3 sm:mr-4 pb-2 -mb-2">
                    <button
                      onClick={() => router.push("/interview-buddy")}
                      className={`relative inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-3 py-1.5 text-xs sm:text-sm font-semibold text-white shadow-md transition-colors duration-300 hover:from-orange-400 hover:to-amber-300 ${
                        isActive("/interview-buddy") || isActive("/huntlo")
                          ? "ring-2 ring-[rgba(181,160,255,0.6)]"
                          : ""
                      }`}
                    >
                      <span className="hidden sm:inline-flex absolute -top-2 right-3 rounded-full bg-white px-1.5 py-0.5 text-[9px] font-semibold text-orange-600 shadow border border-orange-200">
                        New
                      </span>
                      <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                      <span className="inline">AI Agents</span>
                      <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                    </button>

                    <div className="absolute left-0 top-full h-2 w-52" />
                    <div className="absolute left-0 top-full w-52 rounded-xl border border-orange-100 bg-white shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50">
                      <button
                        onClick={() => router.push("/interview-buddy")}
                        className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-orange-50 rounded-t-xl"
                      >
                        AI Interview Buddy
                      </button>
                      <button
                        onClick={() => router.push("/huntlo")}
                        className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-orange-50 rounded-b-xl"
                      >
                        Huntlo
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    key={link.path}
                    onClick={() => router.push(link.path)}
                    className={`text-base font-medium transition-colors duration-200 hover:text-gray-900 ${
                      isActive(link.path) ? "text-gray-900" : "text-gray-600"
                    }`}
                  >
                    {link.label}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Mobile Logo */}
          <div className="md:hidden flex items-center pr-2">
            <button
              onClick={() => router.push("/")}
              className="flex items-center"
            >
              <Image
                src="/v2/logo/logo (1).png"
                alt="EarlyJobs"
                width={180}
                height={60}
                className="object-contain h-12 w-auto"
                priority
              />
            </button>
          </div>

          {/* Right side - Browse Candidates, Login/User and Hamburger Menu */}
          <div className="flex items-center space-x-4 sm:space-x-5 md:space-x-6">
            <Button
              onClick={() => router.push("/browse-interviewed-candidates")}
              className={`hidden md:flex bg-[#ea6a4e] hover:bg-[#c95a42] text-white font-medium px-4 sm:px-6 py-2 rounded-lg transition-colors duration-200 text-sm sm:text-base ${isActive("/browse-interviewed-candidates") ? "ring-2 ring-[#ea6a4e]/50" : ""}`}
            >
              <span className="inline lg:hidden">Candidates</span>
              <span className="hidden lg:inline">Browse Candidates</span>
            </Button>

            {/* Login and User Dropdown - Moved here to be left of Menu */}
            {userLoggedIn !== "true" && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="text-sm sm:text-base font-medium transition-colors duration-200 text-gray-900 hover:text-gray-700 px-2">
                    Login
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" sideOffset={8} className="w-64 p-2 bg-white border border-gray-200 shadow-lg mt-2">
                  <DropdownMenuItem
                    onClick={() => router.push("/login?mode=candidate")}
                    className="flex items-start gap-3 p-3 cursor-pointer hover:bg-[#ea6a4e]/10 rounded-lg bg-white"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#ea6a4e]/10 flex-shrink-0">
                      <Users className="h-5 w-5 text-[#ea6a4e]" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-900">Login as Candidate</span>
                      <span className="text-xs text-gray-500">Find jobs and take assessments</span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => router.push("/login?mode=recruiter")}
                    className="flex items-start gap-3 p-3 cursor-pointer hover:bg-[#ea6a4e]/10 rounded-lg bg-white"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#ea6a4e]/10 flex-shrink-0">
                      <Briefcase className="h-5 w-5 text-[#ea6a4e]" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-900">Login as Recruiter</span>
                      <span className="text-xs text-gray-500">Post jobs and find candidates</span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {userLoggedIn === "true" && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 font-semibold bg-gray-200 hover:bg-gray-300 text-gray-700 mx-1"
                    aria-label="User menu"
                  >
                    <span className="text-sm uppercase">
                      {userCredentials?.name?.charAt(0) || "U"}
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 bg-white border border-gray-200 shadow-lg"
                >
                  <DropdownMenuLabel className="px-3 py-2">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none text-gray-900">
                        {userCredentials?.name || "User"}
                      </p>
                      <p className="text-xs leading-none text-gray-500">
                        {userCredentials?.email || ""}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-200" />
                  <DropdownMenuItem
                    onClick={() => router.push("/dashboard")}
                    className="cursor-pointer text-gray-700 hover:bg-gray-100 focus:bg-gray-100"
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => router.push("/profile")}
                    className="cursor-pointer text-gray-700 hover:bg-gray-100 focus:bg-gray-100"
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>My Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-200" />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-red-600 hover:bg-red-50 focus:bg-red-50 focus:text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Mobile Menu Toggle - Always at the far right end */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 transition-colors text-gray-900 hover:text-gray-700 ml-1"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t backdrop-blur-md border-gray-200/50 bg-white/95">
            <div className="flex flex-col py-4 space-y-3">
              {navLinks.map((link) =>
                link.highlight ? (
                  <button
                    key={link.path}
                    onClick={() => handleLinkClick(link.path)}
                    className={`text-left px-4 py-2 text-base font-medium transition-colors duration-200 inline-flex items-center gap-2 ${
                      isActive(link.path)
                        ? "text-orange-600 bg-orange-50"
                        : "text-orange-500 hover:text-orange-600 hover:bg-orange-50"
                    }`}
                  >
                    <Sparkles className="h-4 w-4" />
                    {link.label}
                  </button>
                ) : (
                  <button
                    key={link.path}
                    onClick={() => handleLinkClick(link.path)}
                    className={`text-left px-4 py-2 text-base font-medium transition-colors duration-200 ${
                      isActive(link.path)
                        ? "text-gray-900 bg-gray-100"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    {link.label}
                  </button>
                )
              )}
              <button
                onClick={() => handleLinkClick("/browse-interviewed-candidates")}
                className={`text-left px-4 py-2 text-base font-medium transition-colors duration-200 ${isActive("/browse-interviewed-candidates")
                  ? "text-gray-900 bg-gray-100"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
              >
                Browse Candidates
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
    </>
  );
};

export default NavbarV2;