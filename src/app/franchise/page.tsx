"use client"
import React, { useEffect } from 'react';
import Header from '../components/pages/header';
import Footer from '../components/pages/footer';
import Hero from "../components/Franchise/Hero";
import ProblemSolution from "../components/Franchise/ProblemSolution";
import WhyFranchise from "../components/Franchise/WhyFranchise";
import EarningModel from "../components/Franchise/EarningModel";
import SetupRequirements from "../components/Franchise/SetupRequirements";
import FranchiseRoadmap from "../components/Franchise/FranchiseRoadmap";

import LimitedOffer from "../components/Franchise/LimitedOffer";
import FAQ from "../components/Franchise/FAQ";

const Franchise = () => {
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <ProblemSolution />
      <WhyFranchise />
      <EarningModel />
      <SetupRequirements />
      <FranchiseRoadmap />
      <LimitedOffer />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Franchise;