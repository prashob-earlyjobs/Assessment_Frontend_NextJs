"use client"
import Recruiter from "../components/pages/Recruiter"
import Navbar from "../components/pages/navbar"
import Footer from "../components/pages/footer"
import { Button } from "../components/ui/button";
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useUser } from "../context";
import { userLogout } from "../components/services/servicesapis";
import { Menu, X, LogIn, LogOut } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import { toast } from "sonner";

const RecruiterPage= () =>{
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
     const { userCredentials, setUserCredentials } = useUser();
    const router= useRouter();
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
    setIsMobileMenuOpen(false);
  };

  const handleMobileMenuItemClick = (path) => {
    router.push(path);
    setIsMobileMenuOpen(false);
  };

  const getInitials = (name) => {
    return name
      ?.split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2) || "NA";
  };
    return (
        <>
        <Navbar/>
          <header className="bg-white shadow-md border-b border-orange-100 sticky top-0 z-50">
        <div className="px-10 lg:pl-26 py-3 ">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img
                src="/images/logo.png"
                onClick={() => router.push("/")}
                alt="EarlyJobs.ai"
                className="h-12 lg:h-14 cursor-pointer"
              />
            </div>
            <nav className="hidden md:flex space-x-8 items-center">
              {userCredentials ? (
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    className="text-red-600 hover:bg-red-50 rounded-xl py-2 px-4 transition-all duration-300"
                    onClick={handleLogout}
                    aria-label="Logout"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                  </Button>
                  <div
                    className="flex items-center space-x-3 cursor-pointer"
                    onClick={handleProfileClick}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && handleProfileClick()}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={userCredentials.avatar} />
                      <AvatarFallback className="bg-gradient-to-r from-orange-500 to-purple-600 text-white">
                        {getInitials(userCredentials?.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-gray-900">{userCredentials.name}</span>
                  </div>
                </div>
              ) : (
                <Button
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-full transition-colors duration-200 font-semibold"
                  onClick={() => router.push("/signup")}
                  aria-label="Sign Up"
                >
                  Sign Up
                </Button>
              )}
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
                {userCredentials && (
                  <div
                    className="flex items-center space-x-3 cursor-pointer px-4 py-3"
                    onClick={handleProfileClick}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && handleProfileClick()}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={userCredentials.avatar} />
                      <AvatarFallback className="bg-gradient-to-r from-orange-500 to-purple-600 text-white">
                        {getInitials(userCredentials?.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{userCredentials.name}</p>
                      <p className="text-xs text-gray-500">
                        {userCredentials.profile?.preferredJobRole || "No role specified"}
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
                {userCredentials ? (
                  <Button
                    variant="ghost"
                    className="w-full text-left justify-start text-red-600 hover:bg-red-50 rounded-xl py-3 px-4 transition-all duration-300"
                    onClick={handleLogout}
                    aria-label="Logout"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Logout
                  </Button>
                ) : (
                  <Button
                    className="w-full text-left justify-start bg-orange-600 hover:bg-orange-700 text-white rounded-xl py-3 px-4 shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => {
                      router.push("/signup");
                      setIsMobileMenuOpen(false);
                    }}
                    aria-label="Sign Up"
                  >
                    <LogIn className="h-5 w-5 mr-2" />
                    Sign Up
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>
        <Recruiter/>
        <Footer/>
        </>
    )
}
export default RecruiterPage;