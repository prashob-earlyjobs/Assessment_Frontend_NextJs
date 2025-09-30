import { Briefcase, GraduationCap, Users, UserCheck } from "lucide-react";

const Experience = () => {
  return (
    <div className="relative flex justify-center items-center w-full min-h-[24rem] sm:min-h-[28rem] lg:min-h-[32rem] bg-gradient-to-br from-gray-50 to-gray-200 rounded-3xl overflow-hidden py-6 px-4 sm:px-6 lg:px-10 shadow-2xl ">
      {/* Main content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col justify-center items-center text-center gap-4 sm:gap-6">
        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-500 animate-fade-in">
          Over 1 Year of Impact
        </h1>
        <p className="mt-2 sm:mt-3 text-sm sm:text-lg lg:text-xl text-gray-600 max-w-xs sm:max-w-lg lg:max-w-3xl leading-relaxed">
          <span className="text-orange-500 font-semibold">EarlyJobs.ai</span> has already empowered millions of jobseekers with assessments, resumes, and verified job opportunities.
        </p>
      </div>

      {/* Floating badges */}
      <div className="absolute top-4 right-4 bg-white rounded-2xl w-[10rem] h-[8rem] p-3 sm:p-4 shadow-lg z-15 transform transition-all duration-300 hover:scale-105 tablet:w-[7rem] tablet:h-[5rem] tablet:p-2">
        <div className="relative flex items-center gap-2 sm:gap-3 px-6 sm:px-10 py-6 sm:py-8 tablet:px-3 tablet:py-3">
          <Briefcase className="absolute top-2 sm:top-3 right-2 sm:right-3 w-4 sm:w-6 h-4 sm:h-6 lg:w-8 lg:h-8 text-green-500 tablet:w-4 tablet:h-4" />
          <span className="absolute top-3 sm:top-5 left-3 text-base sm:text-xl font-semibold text-gray-800 tablet:text-xs tablet:top-2 tablet:left-2">
            100+<br />
            <span className="border-l-4 border-green-500 pl-2 sm:pl-3 text-sm sm:text-lg font-bold text-gray-600 tablet:text-[0.65rem] tablet:pl-1">Companies</span>
          </span>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 bg-white rounded-2xl w-[10rem] h-[8rem] p-3 sm:p-4 shadow-lg z-15 transform transition-all duration-300 hover:scale-105 tablet:w-[7rem] tablet:h-[5rem] tablet:p-2">
        <div className="relative flex items-center gap-2 sm:gap-3 px-6 sm:px-10 py-6 sm:py-8 tablet:px-3 tablet:py-3">
          <GraduationCap className="absolute top-2 sm:top-3 right-2 sm:right-3 w-4 sm:w-6 h-4 sm:h-6 lg:w-8 lg:h-8 text-orange-500 tablet:w-4 tablet:h-4" />
          <span className="absolute top-3 sm:top-5 left-3 text-base sm:text-xl font-semibold text-gray-800 tablet:text-xs tablet:top-2 tablet:left-2">
            100+<br />
            <span className="border-l-4 border-orange-500 pl-2 sm:pl-3 text-sm sm:text-lg font-bold text-gray-600 tablet:text-[0.65rem] tablet:pl-1">Internships</span>
          </span>
        </div>
      </div>

      <div className="absolute top-16 left-4 bg-white rounded-2xl w-[10rem] h-[8rem] sm:p-4 shadow-lg z-15 transform transition-all duration-300 hover:scale-105 tablet:w-[7rem] tablet:h-[5rem] tablet:p-2">
        <div className="relative flex items-center gap-2 sm:gap-3 px-6 sm:px-10 py-6 sm:py-8 tablet:px-3 tablet:py-3">
          <Users className="absolute top-0 sm:top-0 right-2 sm:right-3 w-4 sm:w-6 h-4 sm:h-6 lg:w-8 lg:h-8 text-purple-500 tablet:w-4 tablet:h-4" />
          <span className="absolute top-2 sm:top-2 left-2 text-base sm:text-xl font-semibold text-gray-800 tablet:text-xs tablet:top-1 tablet:left-1">
            1700+<br />
            <p className="border-l-4 border-purple-500 pl-2 sm:pl-3 text-sm sm:text-lg font-bold text-gray-600 tablet:text-[0.65rem] tablet:pl-1">Candidates Placed</p>
          </span>
        </div>
      </div>

      <div className="absolute bottom-16 right-4 bg-white rounded-2xl w-[10rem] h-[6rem] p-3 sm:p-4 shadow-lg z-15 transform transition-all duration-300 hover:scale-105 tablet:w-[7rem] tablet:h-[4rem] tablet:p-2">
        <div className="relative flex items-center gap-2 sm:gap-3 px-6 sm:px-10 py-6 sm:py-8 tablet:px-3 tablet:py-3">
          <UserCheck className="absolute top-0 sm:top-0 left-2 sm:left-3 w-4 sm:w-6 h-4 sm:h-6 lg:w-8 lg:h-8 text-blue-500 tablet:w-4 tablet:h-4" />
          <span className="absolute top-0 sm:top-0 right-2 text-base sm:text-xl font-semibold text-gray-800 text-right tablet:text-xs tablet:right-1">
            275+<br />
            <span className="border-r-4 border-blue-500 pr-2 sm:pr-3 text-sm sm:text-lg font-bold text-gray-600 tablet:text-[0.65rem] tablet:pr-1">Freelancers</span>
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

      {/* Tailwind animation keyframes and responsive styles */}
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
        /* Mobile adjustments */
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
        /* Tablet adjustments */
        @media (min-width: 640px) and (max-width: 1024px) {
          .tablet\\:w-\\[7rem\\] {
            width: 7rem;
          }
          .tablet\\:h-\\[5rem\\] {
            height: 5rem;
          }
          .tablet\\:h-\\[4rem\\] {
            height: 4rem;
          }
          .tablet\\:p-2 {
            padding: 0.5rem;
          }
          .tablet\\:px-3 {
            padding-left: 0.75rem;
            padding-right: 0.75rem;
          }
          .tablet\\:py-3 {
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
          }
          .tablet\\:w-4 {
            width: 1rem;
          }
          .tablet\\:h-4 {
            height: 1rem;
          }
          .tablet\\:text-xs {
            font-size: 0.75rem;
          }
          .tablet\\:text-\\[0\\.65rem\\] {
            font-size: 0.65rem;
          }
          .tablet\\:top-2 {
            top: 0.5rem;
          }
          .tablet\\:left-2 {
            left: 0.5rem;
          }
          .tablet\\:right-1 {
            right: 0.25rem;
          }
          .tablet\\:left-1 {
            left: 0.25rem;
          }
          .tablet\\:top-1 {
            top: 0.25rem;
          }
          .tablet\\:pl-1 {
            padding-left: 0.25rem;
          }
          .tablet\\:pr-1 {
            padding-right: 0.25rem;
          }
          /* Ensure main content is prominent */
          .text-3xl {
            font-size: 2rem;
          }
          .max-w-lg {
            max-width: 32rem;
          }
          .text-lg {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Experience;