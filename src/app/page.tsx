"use client";

import { useState, useEffect, useCallback } from "react";
import Footer from "./components/pages/footer";
import NavbarV2 from "./components/v2/navbar/navbar.v2";
import HeroV2 from "./components/v2/heroSection/hero.v2";
import RecentJobsV2 from "./components/v2/recentJobs/recentJobs.v2";
import BrowseCategoryV2 from "./components/v2/browseCategory/browseCategory.v2";
import PromoBannerV2 from "./components/v2/promoBanner/promoBanner.v2";
import TestimonialsV2 from "./components/v2/testimonials/testimonials.v2";
import NewsBlogV2 from "./components/v2/newsBlog/newsBlog.v2";
import axiosInstance from "./components/services/apiinterseptor";

const Index = () => {
  const [dashboard, setDashboard] = useState(false);

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        const response = await axiosInstance.get("/dashboard");
        setDashboard(response.data.data);
        console.log("dashboard data", response.data.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    getDashboardData();
   
  }, []);




  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white scroll-smooth">
      {/* <Navbar /> */}
      <NavbarV2/>
      <HeroV2 data={dashboard}/>
      <RecentJobsV2 data={dashboard}/> 
      <BrowseCategoryV2 />
      <PromoBannerV2 />
      <TestimonialsV2 />
      <NewsBlogV2 />

      <Footer />

    
    </div>
  );
};

export default Index;