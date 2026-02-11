"use client";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "../../ui/button";
import { Menu, X, User, LogOut, Settings } from "lucide-react";
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
    { label: "Home", path: "/" },
    { label: "Jobs", path: "/jobs" },
    { label: "About Us", path: "/about-us" },
    { label: "Contact Us", path: "/contact-us" },
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

  // Dynamic classes based on background contrast
  const navClasses = isLightBackground
    ? "fixed top-0 left-0 right-0 z-50 w-full bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/70 border-b border-gray-200/50 text-gray-900"
    : "fixed top-0 left-0 right-0 z-50 w-full bg-black/20 backdrop-blur-md supports-[backdrop-filter]:bg-black/10 border-b border-white/10 text-white";

  return (
    <nav ref={navRef} className={navClasses}>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-20">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Page Title (when scrolled) and Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Page Title - appears when scrolled */}
            {showPageTitle && pageTitle && (
              <h2 className={`text-base md:text-lg font-bold transition-all duration-300 ease-in-out mr-2 ${
                isLightBackground ? 'text-gray-900' : 'text-white'
              }`}>
                {pageTitle}
              </h2>
            )}
            {showPageTitle && pageTitle && <div className={`h-6 w-px ${isLightBackground ? 'bg-gray-300' : 'bg-white/30'}`} />}
            <div className="flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => router.push(link.path)}
                className={`text-base font-medium transition-colors duration-200 ${
                  isLightBackground
                    ? `hover:text-gray-900 ${
                        isActive(link.path)
                          ? "text-gray-900"
                          : "text-gray-600"
                      }`
                    : `hover:text-white ${
                        isActive(link.path)
                          ? "text-white"
                          : "text-gray-400"
                      }`
                }`}
              >
                {link.label}
              </button>
            ))}
            </div>
          </div>

          {/* Hamburger Menu Button (Mobile) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 transition-colors ${
              isLightBackground
                ? "text-gray-900 hover:text-gray-700"
                : "text-white hover:text-gray-200"
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Right side - Login and Register */}
          {userLoggedIn !== "true" && (
          <div className="flex items-center space-x-4 sm:space-x-6">
            <button
              onClick={() => router.push("/login")}
              className={`text-sm sm:text-base font-medium transition-colors duration-200 ${
                isLightBackground
                  ? "text-gray-900 hover:text-gray-700"
                  : "text-white hover:text-gray-200"
              }`}
            >
              Login
            </button>
            <Button
              onClick={() => router.push("/signup")}
              className="bg-[#F08504] hover:bg-orange-600 text-white font-medium px-4 sm:px-6 py-2 rounded-lg transition-colors duration-200 text-sm sm:text-base"
            >
              Register
            </Button>
          </div>
          )}

          {userLoggedIn === "true" && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 font-semibold ${
                    isLightBackground
                      ? "bg-gray-200 hover:bg-gray-300 text-gray-700"
                      : "bg-white/20 hover:bg-white/30 text-white"
                  }`}
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
                <DropdownMenuItem
                  onClick={() => router.push("/settings")}
                  className="cursor-pointer text-gray-700 hover:bg-gray-100 focus:bg-gray-100"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
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
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={`md:hidden border-t backdrop-blur-md ${
            isLightBackground
              ? "border-gray-200/50 bg-white/95"
              : "border-white/10 bg-black/95"
          }`}>
            <div className="flex flex-col py-4 space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  className={`text-left px-4 py-2 text-base font-medium transition-colors duration-200 ${
                    isLightBackground
                      ? `${
                          isActive(link.path)
                            ? "text-gray-900 bg-gray-100"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        }`
                      : `${
                          isActive(link.path)
                            ? "text-white bg-white/10"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavbarV2;