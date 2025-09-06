import { Briefcase, GraduationCap, Users, UserCheck } from "lucide-react";

const Experience = () => {
  return (
    <div className="relative flex justify-center items-center w-full min-h-[20rem] sm:min-h-[24rem] lg:min-h-[28rem] bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl overflow-hidden py-6 px-4 sm:px-6 lg:px-8 shadow-xl">
      {/* Main content */}
      <div className="relative z-20 w-full max-w-4xl mx-auto flex flex-col justify-center items-center text-center gap-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-500 animate-fade-in">
          Over 1 Year of Impact
        </h1>
        <p className="mt-2 text-sm sm:text-base lg:text-lg text-gray-600 max-w-xs sm:max-w-md lg:max-w-2xl leading-relaxed">
          <span className="text-orange-500 font-semibold">EarlyJobs.ai</span> is an ecosystem empowering millions of jobseekers with transformative career opportunities.
        </p>
      </div>

      {/* Floating badges */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-white rounded-xl p-2 sm:p-3 shadow-lg animate-float z-30">
        <div className="relative flex items-center gap-2 px-8 sm:px-12 py-6 sm:py-8">
          <Briefcase className="absolute top-2 right-2 w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-green-500" />
          <span className="absolute top-4 left-2 text-lg sm:text-xl font-semibold text-gray-800">
            100+<br />
            <span className="border-l-4 border-green-500 pl-2 text-sm sm:text-base font-bold text-gray-600">Companies</span>
          </span>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-white rounded-xl p-2 sm:p-3 shadow-lg animate-float z-30" style={{ animationDelay: "0.3s" }}>
        <div className="relative flex items-center gap-2 px-8 sm:px-12 py-6 sm:py-8">
          <GraduationCap className="absolute top-2 right-2 w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-orange-500" />
          <span className="absolute top-4 left-2 text-lg sm:text-xl font-semibold text-gray-800">
            100+<br />
            <span className="border-l-4 border-orange-500 pl-2 text-sm sm:text-base font-bold text-gray-600">Internships</span>
          </span>
        </div>
      </div>

      <div className="absolute top-1/4 left-4 sm:left-6 bg-white rounded-xl p-2 sm:p-3 shadow-lg animate-float z-30 hidden sm:flex" style={{ animationDelay: "0.6s" }}>
        <div className="relative flex items-center gap-2 px-8 sm:px-12 py-6 sm:py-8">
          <Users className="absolute top-2 right-2 w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-purple-500" />
          <span className="absolute top-4 left-2 text-lg sm:text-xl font-semibold text-gray-800">
            1500+<br />
            <span className="border-l-4 border-purple-500 pl-2 text-sm sm:text-base font-bold text-gray-600">Candidates Placed</span>
          </span>
        </div>
      </div>

      <div className="absolute bottom-1/4 right-4 sm:right-6 bg-white rounded-xl p-2 sm:p-3 shadow-lg animate-float z-30" style={{ animationDelay: "0.9s" }}>
        <div className="relative flex items-center gap-2 px-8 sm:px-12 py-6 sm:py-8">
          <UserCheck className="absolute top-2 left-2 w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-blue-500" />
          <span className="absolute top-4 right-2 text-lg sm:text-xl font-semibold text-gray-800 text-right">
            200+<br />
            <span className="border-r-4 border-blue-500 pr-2 text-sm sm:text-base font-bold text-gray-600">Freelancers</span>
          </span>
        </div>
      </div>

      {/* Background decorative element */}
      <div className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <circle cx="50" cy="50" r="45" fill="url(#gradient)" />
          <defs>
            <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" style={{ stopColor: "#f97316", stopOpacity: 0.4 }} />
              <stop offset="100%" style={{ stopColor: "#3b82f6", stopOpacity: 0 }} />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Tailwind animation keyframes */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
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