"use client"
import { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  return (
    <nav
      className="hidden md:block bg-gradient-to-r from-orange-400 to-orange-600 shadow-md transition-all duration-300 z-30"
    >
      <div className="flex items-center justify-end space-x-6 p-3">
        <Button
          onClick={() => router.push("/browse-candidates")}
          className="bg-white bg-opacity-20 text-white text-lg font-semibold hover:bg-white hover:text-orange-600 rounded-xl px-4 py-2 transition-all duration-300"
          aria-label="Browse Candidates"
        >
          Browse Candidates
        </Button>
        <Button
          onClick={() => router.push("/college-partnerships")}
          className="bg-white bg-opacity-20 text-white text-lg font-semibold hover:bg-white hover:text-orange-600 rounded-xl px-4 py-2 transition-all duration-300"
          aria-label="Colleges"
        >
          Colleges
        </Button>
        <Button
          onClick={() => router.push("/talent-pool")}
          className="bg-white bg-opacity-20 text-white text-lg font-semibold hover:bg-white hover:text-orange-600 rounded-xl px-4 py-2 transition-all duration-300"
          aria-label="Talent Pool"
        >
          Talent Pool
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;