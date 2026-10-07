"use client";
import React from 'react';
import Header from '../components/pages/header';
import Footer from '../components/pages/footer';
import Hero from "./Hero";
import ProblemSolution from "./ProblemSolution";
import WhyFranchise from "./WhyFranchise";
import EarningModel from "./EarningModel";
import SetupRequirements from "./SetupRequirements";
import FranchiseRoadmap from "./FranchiseRoadmap";
import Navbar from "../components/pages/navbar";

import LimitedOffer from "./LimitedOffer";
import FAQ from "./FAQ";


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