import { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  return (
     <nav
            className={`bg-gradient-to-br from-orange-400 to-pink-600 shadow-sm transition-transform duration-300 z-30`}
          
          >
            <div className="flex items-center justify-end space-x-4 p-2 lg:px-12">
              <Button
                onClick={() => router.push("/browse-candidates")}
                className="bg-transparent text-white text-xl font-bold hover:text-orange-600 hover:bg-orange-50 rounded-2xl px-6 py-2 transition-all duration-300"
                aria-label="Browse Candidates"
              >
                Browse Candidates
              </Button>
              <Button
                onClick={() => router.push("/college-partnerships")}
                className="bg-transparent text-white text-xl font-bold hover:text-orange-600 hover:bg-orange-50 rounded-2xl px-6 py-2 transition-all duration-300"
                aria-label="Colleges"
              >
                Colleges
              </Button>
              <Button
                onClick={() => router.push("/talent-pool")}
                className="bg-transparent text-white text-xl font-bold hover:text-orange-600 hover:bg-orange-50 rounded-2xl px-6 py-2 transition-all duration-300"
                aria-label="Talent Pool"
              >
                Talent Pool
              </Button>
            </div>
          </nav> 
  );
};

export default Navbar;
