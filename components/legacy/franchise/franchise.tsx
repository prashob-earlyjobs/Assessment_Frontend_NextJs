"use client";
import React from 'react';
import Header from '../components/pages/header';
import Footer from '../components/pages/footer';
import Hero from "../Franchise/Hero";
import ProblemSolution from "../Franchise/ProblemSolution";
import WhyFranchise from "../Franchise/WhyFranchise";
import EarningModel from "../Franchise/EarningModel";
import SetupRequirements from "../Franchise/SetupRequirements";
import FranchiseRoadmap from "../Franchise/FranchiseRoadmap";
import Navbar from '../components/pages/navbar';

import LimitedOffer from "../Franchise/LimitedOffer";
import FAQ from "../Franchise/FAQ";


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