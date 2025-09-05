import { Button } from "../ui/button";
import { MapPin, Building, GraduationCap, Lightbulb, Users, Tag, FileText, BarChart2, Rocket } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Footer = () => {
  const router = useRouter();
  const locations = [
    "Jobs in Bengaluru", "Jobs in Mumbai", "Jobs in Delhi", 
    "Jobs in Hyderabad", "Jobs in Chennai",
  ];

  const jobCategories = [
    "Software Development", "Data Science", "Digital Marketing", "Design", 
    "Sales", "Finance", "HR", "Operations", "Content Writing", "Customer Support"
  ];

  const franchiseLocations = [
    "Bengaluru Franchise", "Mumbai Franchise", "Delhi Franchise", "Pune Franchise",
    "Hyderabad Franchise", "Chennai Franchise"
  ];

  const collegePartners = [
    "IIT Partnerships", "Engineering Colleges", "Business Schools", "Arts & Science Colleges",
    "Polytechnic Institutes", "Vocational Training"
  ];

  const companyPartners = [
    "Startups", "Tech Giants", "Consulting Firms", "Financial Services",
    "E-commerce", "Healthcare", "Manufacturing", "Education"
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-2 py-12">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          <div>
            <a href="https://earlyjobs.in/franchise" className="flex items-center mb-4">
              <MapPin className="w-6 h-6 text-orange-500 mr-2" />
              <h3 className="text-xl font-semibold">Franchise Locations</h3>
            </a>
            <div className="flex items-center mb-4">
              <GraduationCap className="w-6 h-6 text-orange-500 mr-2" />
              <h3 className="text-xl font-semibold">College Tie-ups</h3>
            </div>
            <div className="flex items-center mb-4">
              <Building className="w-6 h-6 text-orange-500 mr-2" />
              <h3 className="text-xl font-semibold">Company Tie-ups</h3>
            </div>
          </div>

          <div>
            <div className="flex items-center mb-6">
              <Lightbulb className="w-6 h-6 text-orange-500 mr-2" />
              <h3 className="text-xl font-semibold text-white">Tools</h3>
            </div>
            <div className="space-y-4">
              <a
                href="/airesume"
                className="flex items-center text-gray-300 hover:text-orange-500 transition-all duration-300 mb-2"
              >
                <FileText className="w-5 h-5 mr-2" />
                AI Resume Builder
              </a>
              <a
                href="/assessments"
                className="flex items-center text-gray-300 hover:text-orange-500 transition-all duration-300 mb-2"
              >
                <BarChart2 className="w-5 h-5 mr-2" />
                Assessments
              </a>
              <button
                type="button"
                className="flex items-center text-gray-300 hover:text-orange-500 transition-all duration-300 mb-2 bg-transparent p-0"
                onClick={() => toast.info("We're working on Auto-Apply! This feature will be updated soon.")}
                style={{ outline: "none", border: "none" }}
              >
                <Rocket className="w-5 h-5 mr-2" />
                Auto-Apply
              </button>
              <a
                href="#"
                className="flex items-center text-gray-300 hover:text-orange-500 transition-all duration-300 mb-2"
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                Suggest a Feature
              </a>
              <a
                href="#"
                className="flex items-center text-gray-300 hover:text-orange-500 transition-all duration-300 mb-2"
              >
                <Users className="w-4 h-4 mr-2" />
                Refer a Job Seeker
              </a>
            </div>
          </div>
          <div>
            <div className="flex items-center mb-4">
              <Tag className="w-6 h-6 text-orange-500 mr-2" />
              <h3 className="text-xl font-semibold">Job Categories</h3>
            </div>
            <ul className="space-y-2">
              {jobCategories.slice(0, 5).map((category) => (
                <li key={category}>
                  <a href="#" className="text-gray-300 hover:text-orange-500 transition-all duration-300">
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="flex items-center mb-6">
              <MapPin className="w-6 h-6 text-orange-500 mr-2" />
              <h3 className="text-xl font-semibold">Job Locations</h3>
            </div>
            <ul className="space-y-2">
              {locations.map((location) => (
                <li key={location}>
                  <a href="#" className="text-gray-300 hover:text-orange-500 transition-all duration-300">
                    {location}
                  </a>
                </li>
              ))}
            </ul>
            <Button variant="outline" className="mt-4 bg-orange-500 text-white hover:bg-orange-700 border-0">
              View All Cities
            </Button>
          </div>
        </div>
<div className="mt-8">
  {/* Available in section */}
  <div className="text-orange-600 text-lg font-semibold">
    <span className="font-bold text-xl block sm:inline">We are available in:</span>
    <div className="flex flex-wrap gap-3 mt-2 sm:mt-0">
      <a
        href="https://earlyjobs.in/franchise/mohali"
        className="hover:text-orange-300 transition-all duration-300"
      >
        Mohali
      </a>
      <a
        href="https://earlyjobs.in/franchise/chandigarh"
        className="hover:text-orange-300 transition-all duration-300"
      >
        Chandigarh
      </a>
      <a
        href="https://earlyjobs.in/franchise/hyderabad"
        className="hover:text-orange-300 transition-all duration-300"
      >
        Hyderabad
      </a>
      <a
        href="https://earlyjobs.in/franchise/chennai"
        className="hover:text-orange-300 transition-all duration-300"
      >
        Chennai
      </a>
    </div>
  </div>

  {/* Expanding in section */}
  <div className="text-white text-sm mt-4">
    <span className="font-bold block sm:inline">We will be expanding in:</span>
    <div className="flex flex-wrap gap-3 mt-2 sm:mt-0">
      {[
        "Rampur",
        "Coimbatore",
        "Ghaziabad",
        "Lucknow",
        "Bangalore Urban",
        "Faridabad",
        "Bhopal",
        "Patna",
        "Bijapur",
        "Sonipat",
        "Ramnagar",
        "Gulbarga",
        "Ananthapur",
        "Mangalore",
      ].map((city) => (
        <a
          key={city}
          href="/"
          onClick={(e) => e.preventDefault()} // prevents unwanted navigation
          className="hover:text-orange-500 transition-all duration-300"
        >
          {city}
        </a>
      ))}
    </div>
  </div>
</div>


        <div className="border-t border-gray-700 mt-12 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <img
              src="/images/logo.png"
              onClick={() => router.push("/")}
              alt="EarlyJobs Logo"
              className="h-[3rem] w-auto cursor-pointer"
            />
            <div className="hidden md:block">
              <p className="text-gray-400 text-sm">
                © 2024-25 EarlyJobs.ai. All rights reserved.
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="flex space-x-6">
                <a href="#" className="text-gray-300 hover:text-orange-500 transition-all duration-300">Privacy Policy</a>
                <a href="#" className="text-gray-300 hover:text-orange-500 transition-all duration-300">Terms of Service</a>
                <a href="#" className="text-gray-300 hover:text-orange-500 transition-all duration-300">Contact Us</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;