"use client";
import React from 'react';
import Header from '../components/pages/header';
import Footer from '../components/pages/footer';
import Hero from "../components/Franchise/Hero";
import ProblemSolution from "../components/Franchise/ProblemSolution";
import WhyFranchise from "../components/Franchise/WhyFranchise";
import EarningModel from "../components/Franchise/EarningModel";
import SetupRequirements from "../components/Franchise/SetupRequirements";
import FranchiseRoadmap from "../components/Franchise/FranchiseRoadmap";
import Navbar from '../components/pages/navbar';

import LimitedOffer from "../components/Franchise/LimitedOffer";
import FAQ from "../components/Franchise/FAQ";


const Franchise = () => {
  
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
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