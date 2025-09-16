"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { useRouter, usePathname } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname(); // Use usePathname to get the current path

  return (
    <nav className="hidden md:block bg-gradient-to-r from-orange-400 to-orange-600 shadow-md transition-all duration-300 z-30">
      <div className="flex items-center justify-end space-x-6 p-3">
        <Button
          onClick={() => router.push("/browse-candidates")}
          className={`bg-white bg-opacity-20 text-white text-lg font-semibold hover:bg-white hover:text-orange-600 rounded-xl px-4 py-2 transition-all duration-300 ${
            pathname === "/browse-candidates" ? "border-b-4 border-white rounded-sm" : ""
          }`}
          aria-label="Browse Candidates"
        >
          Browse Candidates
        </Button>
        <Button
          onClick={() => router.push("/college-partnerships")}
          className={`bg-white bg-opacity-20 text-white text-lg font-semibold hover:bg-white hover:text-orange-600 rounded-xl px-4 py-2 transition-all duration-300 ${
            pathname === "/college-partnerships" ? "border-b-4 border-white rounded-sm" : ""
          }`}
          aria-label="Colleges"
        >
          Colleges
        </Button>
        <Button
          onClick={() => router.push("/recruiter")}
          className={`bg-white bg-opacity-20 text-white text-lg font-semibold hover:bg-white hover:text-orange-600 rounded-xl px-4 py-2 transition-all duration-300 ${
            pathname === "/recruiter" ? "border-b-4 border-white rounded-sm" : ""
          }`}
          aria-label="Talent Pool"
        >
          Recruiter
        </Button>
        <Button
          onClick={() => router.push("/talent-pool")}
          className={`bg-white bg-opacity-20 text-white text-lg font-semibold hover:bg-white hover:text-orange-600 rounded-xl px-4 py-2 transition-all duration-300 ${
            pathname === "/talent-pool" ? "border-b-4 border-white rounded-sm" : ""
          }`}
          aria-label="Talent Pool"
        >
          Talent Pool
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;