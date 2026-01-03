import { Heart, Target, Rocket, Users, Sparkles } from "lucide-react";

const Experience = () => {
  return (
    <div className="relative flex justify-center items-center w-full min-h-[24rem] sm:min-h-[28rem] lg:min-h-[36rem] bg-gradient-to-br from-gray-50 to-gray-200 rounded-3xl overflow-hidden py-8 px-4 sm:px-6 lg:px-10 shadow-2xl">
      {/* Main content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col justify-center items-center text-center gap-6 sm:gap-8">
        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-500 animate-fade-in">
          Our Story
        </h1>
        
        <div className="space-y-4 sm:space-y-6 max-w-4xl">
          <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
            Across India, countless women recruiters and aspiring recruiters face a silent struggle, opportunities often fade after college, marriage, or career breaks, leaving talent underutilized. <span className="text-orange-500 font-semibold">EarlyJobs.ai</span> was born to change this. By creating India's largest freelance recruiter network, the platform offers women the flexibility to work from home, earn, and build meaningful careers on their own terms. Today, women form the backbone of EarlyJobs, proving that the right ecosystem can unlock immense potential.
          </p>
          
          <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
            As the platform grew, another challenge emerged: connecting with talent in Tier 2 and Tier 3 cities. EarlyJobs responded by introducing a district-level franchise model, enabling local entrepreneurs to run recruitment operations within their own communities. This not only ensures that companies across India gain access to diverse, skilled talent, but also empowers local professionals to generate employment in their regions. Together, these initiatives are reshaping the hiring landscape, making recruitment more inclusive, accessible, and impactful.
          </p>
          
          <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed font-medium">
            <span className="text-orange-500 font-semibold">EarlyJobs.ai</span> is more than a tool, it is a stepping stone for success. It ensures that students and job seekers are truly ready to excel, turning uncertainty into confidence. Through this initiative, EarlyJobs continues its mission of empowerment. Together, we are enabling careers and creating meaningful opportunities across India.
          </p>
        </div>

        {/* Story milestones */}
        {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-6 sm:mt-8 w-full max-w-4xl">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-5 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-red-500 mx-auto mb-2" />
            <p className="text-xs sm:text-sm font-semibold text-gray-800">Mission-Driven</p>
            <p className="text-[0.65rem] sm:text-xs text-gray-600 mt-1">Empowering Careers</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-5 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <Target className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500 mx-auto mb-2" />
            <p className="text-xs sm:text-sm font-semibold text-gray-800">Verified Jobs</p>
            <p className="text-[0.65rem] sm:text-xs text-gray-600 mt-1">Trust & Quality</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-5 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <Rocket className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 mx-auto mb-2" />
            <p className="text-xs sm:text-sm font-semibold text-gray-800">AI-Powered</p>
            <p className="text-[0.65rem] sm:text-xs text-gray-600 mt-1">Smart Matching</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-5 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <Users className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500 mx-auto mb-2" />
            <p className="text-xs sm:text-sm font-semibold text-gray-800">Human Touch</p>
            <p className="text-[0.65rem] sm:text-xs text-gray-600 mt-1">Personal Support</p>
          </div>
        </div> */}
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
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

      {/* Floating sparkles for visual interest */}
      <div className="absolute top-8 right-8 opacity-20 pointer-events-none">
        <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 text-orange-400 animate-pulse" />
      </div>
      <div className="absolute bottom-8 left-8 opacity-20 pointer-events-none">
        <Sparkles className="w-10 h-10 sm:w-14 sm:h-14 text-blue-400 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Tailwind animation keyframes and responsive styles */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        /* Mobile adjustments */
        @media (max-width: 640px) {
          h1 {
            font-size: 1.75rem;
          }
          p {
            font-size: 0.875rem;
            line-height: 1.6;
          }
        }
        /* Tablet adjustments */
        @media (min-width: 640px) and (max-width: 1024px) {
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