import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { ArrowRight, Users, Building, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

const ApplyJobs = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 transition-colors duration-300 ">
            Launch Your
            <span className="bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent"> Career Early</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed transition-colors duration-300 hover:text-gray-700">
            Discover entry-level opportunities and internships from top companies. 
            Start your professional journey with EarlyJobs today.
          </p>
        </div>

        {/* Main CTA Card */}
        <div className="flex justify-center mb-20">
          <Card className="px-8 py-12 max-w-lg w-full text-center bg-white  transition-all duration-300 transform ">
            <Users className="w-12 h-12 mx-auto text-orange-500 mb-4 transition-colors duration-300 " />
            <h2 className="text-xl font-bold text-gray-900 mb-3 transition-colors duration-300 ">
              Start Your Career Journey
            </h2>
            <Button 
              size="lg" 
              onClick={() => {router.push("/jobs")}}
              className="px-8 py-2 text-base font-semibold text-white bg-orange-500 hover:bg-orange-600 rounded-md transition-colors duration-300"
            >
              View Jobs
              <ArrowRight className="ml-2 w-4 h-4 transition-colors duration-300 group-hover:text-white" />
            </Button>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-gray-50 rounded-3xl p-8 shadow-md mb-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <h3 className="text-3xl font-bold text-orange-600">1.5K+</h3>
                <p className="text-gray-600">Job Seekers Empowered</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-orange-600">60+</h3>
                <p className="text-gray-600">Partner Companies</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-orange-600">90%</h3>
                <p className="text-gray-600">Job Match Accuracy</p>
              </div>
            </div>
          </div>

        {/* How It Works Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 transition-colors duration-300 hover:text-orange-500">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <Card className="p-8 text-center bg-white hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:translate-y-1 group">
              <div className="w-14 h-14 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors duration-300 group-hover:bg-orange-600/20">
                <span className="text-xl font-bold text-orange-500 transition-colors duration-300 group-hover:text-white">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 transition-colors duration-300 group-hover:text-white">Create Profile</h3>
              <p className="text-base text-gray-600 leading-relaxed transition-colors duration-300 group-hover:text-white">Build your student profile with academic achievements, skills, and career interests</p>
            </Card>
            
            <Card className="p-8 text-center bg-white hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:translate-y-1 group">
              <div className="w-14 h-14 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors duration-300 group-hover:bg-orange-600/20">
                <span className="text-xl font-bold text-orange-500 transition-colors duration-300 group-hover:text-white">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 transition-colors duration-300 group-hover:text-white">Explore Opportunities</h3>
              <p className="text-base text-gray-600 leading-relaxed transition-colors duration-300 group-hover:text-white">Browse internships, graduate programs, and entry-level positions perfect for beginners</p>
            </Card>
            
            <Card className="p-8 text-center bg-white hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:translate-y-1 group">
              <div className="w-14 h-14 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors duration-300 group-hover:bg-orange-600/20">
                <span className="text-xl font-bold text-orange-500 transition-colors duration-300 group-hover:text-white">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 transition-colors duration-300 group-hover:text-white">Land Your First Job</h3>
              <p className="text-base text-gray-600 leading-relaxed transition-colors duration-300 group-hover:text-white">Get mentorship support and connect with recruiters looking for fresh talent</p>
            </Card>
          </div>
        </section>

        {/* Features Section */}
       <div className="mt-20 bg-gradient-to-r from-orange-500 to-purple-600 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-8 text-center tracking-tight">
              Why Choose <span className="text-yellow-300">EarlyJobs</span>?
            </h2>
            <p className="text-lg text-white/90 mb-12 text-center max-w-3xl mx-auto">
              Transform your job search with cutting-edge AI tools designed to
              empower your career journey.
            </p>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="space-y-6">
                <div
                  className="flex items-start space-x-4 animate-fadeIn"
                  style={{ animationDelay: "0.2s" }}
                >
                  <div className="w-8 h-7  p-2 bg-white rounded-full flex items-center justify-center mt-1 shadow-md ">
                    <span className="text-orange-500 text-lg font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white">
                      AI-Powered Career Guidance
                    </h4>
                    <p className="text-white/80 text-base">
                      Personalized job recommendations and career advice based
                      on your unique skills and goals.
                    </p>
                  </div>
                </div>
                <div
                  className="flex items-start space-x-4 animate-fadeIn"
                  style={{ animationDelay: "0.4s" }}
                >
                  <div className="w-8 h-7  p-2 bg-white rounded-full flex items-center justify-center mt-1 shadow-md">
                    <span className="text-orange-500 text-lg font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white">
                      Smart Resume Optimization
                    </h4>
                    <p className="text-white/80 text-base">
                      AI-driven resume tailoring to match job descriptions and
                      boost your application success.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div
                  className="flex items-start space-x-4 animate-fadeIn"
                  style={{ animationDelay: "0.6s" }}
                >
                  <div className="w-8 h-7  p-2 bg-white rounded-full flex items-center justify-center mt-1 shadow-md">
                    <span className="text-orange-500 text-lg font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white">
                      Efficient Job Applications
                    </h4>
                    <p className="text-white/80 text-base">
                      Apply to multiple jobs effortlessly, streamlining your job
                      search process.
                    </p>
                  </div>
                </div>
                <div
                  className="flex items-start space-x-4 animate-fadeIn"
                  style={{ animationDelay: "0.8s" }}
                >
                  <div className="w-8 h-7  p-2 bg-white rounded-full flex items-center justify-center mt-1 shadow-md">
                    <span className="text-orange-500 text-lg font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white">
                      Verified Skills Portfolio
                    </h4>
                    <p className="text-white/80 text-base">
                      Earn trusted skill badges through assessments to stand out
                      to employers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 text-center">
              <Button
                onClick={() => router.push("/login")}
                size="lg"
                className="bg-white text-orange-600 hover:bg-gray-100 rounded-2xl px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
      </main>
    </div>
  );
};

export default ApplyJobs;