import { Briefcase, GraduationCap, Users, UserCheck } from "lucide-react";

const Experience = () => {
  return (
    <div className="relative flex justify-center items-center w-full min-h-[24rem] sm:min-h-[28rem] lg:min-h-[32rem] bg-gradient-to-br from-gray-50 to-gray-200 rounded-3xl overflow-hidden py-8 px-6 sm:px-8 lg:px-10 shadow-2xl">
      {/* Main content */}
      <div className="relative z-20 w-full max-w-5xl mx-auto flex flex-col justify-center items-center text-center gap-6">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-500 animate-fade-in">
          Over 1 Year of Impact
        </h1>
        <p className="mt-3 text-base sm:text-lg lg:text-xl text-gray-600 max-w-sm sm:max-w-lg lg:max-w-3xl leading-relaxed">
          <span className="text-orange-500 font-semibold">EarlyJobs.ai</span> is an ecosystem empowering millions of jobseekers with transformative career opportunities.
        </p>
      </div>

      {/* Floating badges */}
      <div className="absolute top-6 right-6 sm:top-8 sm:right-8 bg-white rounded-2xl p-4 sm:p-5 shadow-xl animate-float z-30">
        <div className="relative flex items-center gap-3 px-10 sm:px-14 py-8 sm:py-10">
          <Briefcase className="absolute top-3 right-3 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-green-500" />
          <span className="absolute top-5 left-3 text-xl sm:text-2xl font-semibold text-gray-800">
            100+<br />
            <span className="border-l-4 border-green-500 pl-3 text-base sm:text-lg font-bold text-gray-600">Companies</span>
          </span>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 bg-white rounded-2xl p-4 sm:p-5 shadow-xl animate-float z-30" style={{ animationDelay: "0.3s" }}>
        <div className="relative flex items-center gap-3 px-10 sm:px-14 py-8 sm:py-10">
          <GraduationCap className="absolute top-3 right-3 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-orange-500" />
          <span className="absolute top-5 left-3 text-xl sm:text-2xl font-semibold text-gray-800">
            100+<br />
            <span className="border-l-4 border-orange-500 pl-3 text-base sm:text-lg font-bold text-gray-600">Internships</span>
          </span>
        </div>
      </div>

      <div className="absolute top-1/3 left-6  sm:left-8 bg-white rounded-2xl p-4 sm:p-5 shadow-xl animate-float z-30 hidden sm:flex" style={{ animationDelay: "0.6s" }}>
        <div className="relative flex items-center gap-3 px-10 sm:px-14 py-8 sm:py-10">
          <Users className="absolute top-3 right-3 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-purple-500" />
          <span className="absolute top-5 left-3 text-xl sm:text-2xl font-semibold text-gray-800">
            1500+<br />
            <span className="border-l-4 border-purple-500 pl-3 text-base sm:text-lg font-bold text-gray-600">Candidates</span>
          </span>
        </div>
      </div>

      <div className="absolute bottom-1/3 right-6 sm:right-8 bg-white rounded-2xl p-4 sm:p-5 shadow-xl animate-float z-30" style={{ animationDelay: "0.9s" }}>
        <div className="relative flex items-center gap-3 px-10 sm:px-14 py-8 sm:py-10">
          <UserCheck className="absolute top-3 left-3 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-blue-500" />
          <span className="absolute top-5 right-3 text-xl sm:text-2xl font-semibold text-gray-800 text-right">
            200+<br />
            <span className="border-r-4 border-blue-500 pr-3 text-base sm:text-lg font-bold text-gray-600">Freelancers</span>
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
      `}</style>
    </div>
  );
};

export default Experience;