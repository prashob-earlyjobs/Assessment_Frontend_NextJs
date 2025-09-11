import { Briefcase, GraduationCap, Users, UserCheck } from "lucide-react";

const Experience = () => {
  return (
    <div className="relative flex justify-center items-center w-full min-h-[24rem] sm:min-h-[28rem] lg:min-h-[32rem] bg-gradient-to-br from-gray-50 to-gray-200 rounded-3xl overflow-hidden py-6 px-4 sm:px-6 lg:px-10 shadow-2xl">
      {/* Main content */}
      <div className="relative z-20 w-full max-w-5xl mx-auto flex flex-col justify-center items-center text-center gap-4 sm:gap-6">
        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-500 animate-fade-in">
          Over 1 Year of Impact
        </h1>
        <p className="mt-2 sm:mt-3 text-sm sm:text-lg lg:text-xl text-gray-600 max-w-xs sm:max-w-lg lg:max-w-3xl leading-relaxed">
          <span className="text-orange-500 font-semibold">EarlyJobs.ai</span> is an ecosystem empowering millions of jobseekers with transformative career opportunities.
        </p>
      </div>

      {/* Floating badges */}
      <div className="absolute top-1/6 right-1/12  bg-white rounded-2xl w-[10rem] h-[8rem] p-3 sm:p-4 shadow-lg z-30 transform transition-all duration-300 hover:scale-105">
        <div className="relative flex items-center gap-2 sm:gap-3 px-6 sm:px-10 py-6 sm:py-8">
          <Briefcase className="absolute top-2 sm:top-3 right-2 sm:right-3 w-4 sm:w-6 h-4 sm:h-6 lg:w-8 lg:h-8 text-green-500" />
          <span className="absolute top-3 sm:top-5 left-3 text-base sm:text-xl font-semibold text-gray-800">
            100+<br />
            <span className="border-l-4 border-green-500 pl-2 sm:pl-3 text-sm sm:text-lg font-bold text-gray-600">Companies</span>
          </span>
        </div>
      </div>

      <div className="absolute bottom-1/6  left-1/12 bg-white rounded-2xl w-[10rem] h-[8rem] p-3 sm:p-4 shadow-lg z-30 transform transition-all duration-300 hover:scale-105">
        <div className="relative flex items-center gap-2 sm:gap-3 px-6 sm:px-10 py-6 sm:py-8">
          <GraduationCap className="absolute top-2 sm:top-3 right-2 sm:right-3 w-4 sm:w-6 h-4 sm:h-6 lg:w-8 lg:h-8 text-orange-500" />
          <span className="absolute top-3 sm:top-5 left-3 text-base sm:text-xl font-semibold text-gray-800">
            100+<br />
            <span className="border-l-4 border-orange-500 pl-2 sm:pl-3 text-sm sm:text-lg font-bold text-gray-600">Internships</span>
          </span>
        </div>
      </div>

      <div className="absolute top-1/6 left-1/8 bg-white rounded-2xl w-[10rem] h-[8rem] sm:p-4 shadow-lg z-30 transform transition-all duration-300 hover:scale-105">
        <div className="relative flex items-center gap-2 sm:gap-3 px-6 sm:px-10 py-6 sm:py-8">
          <Users className="absolute top-0 sm:top-0 right-2 sm:right-3 w-4 sm:w-6 h-4 sm:h-6 lg:w-8 lg:h-8 text-purple-500" />
          <span className="absolute top-2 sm:top-2 left-2 text-base sm:text-xl font-semibold text-gray-800">
            1700+<br />
            <p className="border-l-4 border-purple-500 pl-2 sm:pl-3 text-sm sm:text-lg font-bold text-gray-600">Candidates Placed</p>
          </span>
        </div>
      </div>

      <div className="absolute bottom-1/6 right-1/8  bg-white rounded-2xl w-[10rem] h-[6rem] p-3 sm:p-4 shadow-lg z-30 transform transition-all duration-300 hover:scale-105">
        <div className="relative flex items-center gap-2 sm:gap-3 px-6 sm:px-10 py-6 sm:py-8">
          <UserCheck className="absolute top-0 sm:top-0 left-2 sm:left-3 w-4 sm:w-6 h-4 sm:h-6 lg:w-8 lg:h-8 text-blue-500" />
          <span className="absolute top-0 sm:top-0 right-2 text-base sm:text-xl font-semibold text-gray-800 text-right">
            275+<br />
            <span className="border-r-4 border-blue-500 pr-2 sm:pr-3 text-sm sm:text-lg font-bold text-gray-600">Freelancers</span>
          </span>
        </div>
      </div>

      {/* Background decorative element */}
      <div className="absolute inset-0 w-full h-full opacity-15 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <circle cx="50" cy="50" r="45" fill="url(#gradient)" />
          <defs>
            <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" style={{ stopColor: "#f97316", stopOpacity: 0.5 }} />
              <stop offset="100%" style={{ stopColor: "#3b82f6", stopOpacity: 0 }} />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Tailwind animation keyframes */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        /* Responsive adjustments */
        @media (max-width: 640px) {
          .absolute {
            position: static;
            margin: 1rem 0;
            width: 100%;
            max-width: 100%;
          }
          h1 {
            font-size: 1.5rem;
          }
          p {
            font-size: 0.875rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Experience;