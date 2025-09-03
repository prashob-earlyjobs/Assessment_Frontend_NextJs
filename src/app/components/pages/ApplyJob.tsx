import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { ArrowRight, Users, Building, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ApplyJobs = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen relative">
      {/* Hero Section with full background image */}
      <div className="relative w-full h-screen max-h-[900px]">
        <Image
          src="/images/LandingImage.jpg"
          alt="Landing"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Orange overlay with 30% opacity */}
        <div className="absolute inset-0 bg-orange-400 opacity-30"></div>
        {/* Content over image */}
        <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight text-center">
            Launch Your
            <span className="bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent"> Career Early</span>
          </h1>
          <p className="text-xl text-white max-w-3xl mx-auto mb-10 leading-relaxed text-center">
            Discover entry-level opportunities and internships from top companies. Start your professional journey with EarlyJobs today.
          </p>
          <Button
            size="lg"
            onClick={() => router.push("/jobs")}
            className="px-10 py-3 text-lg font-semibold text-white bg-orange-500 hover:bg-orange-600 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Explore Jobs <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Stats Section below image */}
      <div className="w-full flex justify-center bg-white py-0 relative z-20" style={{ marginTop: "-60px" }}>
        <div className="max-w-2xl w-full bg-white/90 rounded-3xl p-8 shadow-2xl backdrop-blur-md">
          <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-3">
            <div className="group">
              <h3 className="text-3xl font-extrabold text-orange-600 transition-transform duration-300 group-hover:scale-105">1.5K+</h3>
              <p className="text-gray-700 text-base">Job Seekers Empowered</p>
            </div>
            <div className="group">
              <h3 className="text-3xl font-extrabold text-orange-600 transition-transform duration-300 group-hover:scale-105">60+</h3>
              <p className="text-gray-700 text-base">Partner Companies</p>
            </div>
            <div className="group">
              <h3 className="text-3xl font-extrabold text-orange-600 transition-transform duration-300 group-hover:scale-105">90%</h3>
              <p className="text-gray-700 text-base">Job Match Accuracy</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 relative z-30">
        <section className="my-24">
          <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <Card className="p-8 text-center bg-white/95 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-500/20 transition-colors duration-300">
                <span className="text-2xl font-bold text-orange-500 group-hover:text-orange-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-orange-600">Create Profile</h3>
              <p className="text-gray-600 leading-relaxed">Build your student profile with academic achievements, skills, and career interests.</p>
            </Card>
            <Card className="p-8 text-center bg-white/95 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-500/20 transition-colors duration-300">
                <span className="text-2xl font-bold text-orange-500 group-hover:text-orange-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-orange-600">Explore Opportunities</h3>
              <p className="text-gray-600 leading-relaxed">Browse internships, graduate programs, and entry-level positions perfect for beginners.</p>
            </Card>
            <Card className="p-8 text-center bg-white/95 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-500/20 transition-colors duration-300">
                <span className="text-2xl font-bold text-orange-500 group-hover:text-orange-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-orange-600">Land Your First Job</h3>
              <p className="text-gray-600 leading-relaxed">Get mentorship support and connect with recruiters looking for fresh talent.</p>
            </Card>
          </div>
        </section>

        {/* Features Section */}
        <div className="mt-24 bg-gradient-to-r from-orange-500 to-purple-600 rounded-3xl p-12 shadow-2xl relative overflow-hidden mb-10 ">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-8 text-center tracking-tight">
            Why Choose <span className="text-yellow-300">EarlyJobs</span>?
          </h2>
          <p className="text-lg text-white/90 mb-12 text-center max-w-3xl mx-auto">
            Transform your job search with cutting-edge AI tools designed to empower your career journey.
          </p>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-8">
              <div className="flex items-start space-x-4 animate-fadeIn" style={{ animationDelay: "0.2s" }}>
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mt-1 shadow-md">
                  <span className="text-orange-500 text-xl font-bold">✓</span>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white">AI-Powered Career Guidance</h4>
                  <p className="text-white/80">Personalized job recommendations and career advice based on your unique skills and goals.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 animate-fadeIn" style={{ animationDelay: "0.4s" }}>
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mt-1 shadow-md">
                  <span className="text-orange-500 text-xl font-bold">✓</span>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white">Smart Resume Optimization</h4>
                  <p className="text-white/80">AI-driven resume tailoring to match job descriptions and boost your application success.</p>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="flex items-start space-x-4 animate-fadeIn" style={{ animationDelay: "0.6s" }}>
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mt-1 shadow-md">
                  <span className="text-orange-500 text-xl font-bold">✓</span>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white">Efficient Job Applications</h4>
                  <p className="text-white/80">Apply to multiple jobs effortlessly, streamlining your job search process.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 animate-fadeIn" style={{ animationDelay: "0.8s" }}>
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mt-1 shadow-md">
                  <span className="text-orange-500 text-xl font-bold">✓</span>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white">Verified Skills Portfolio</h4>
                  <p className="text-white/80">Earn trusted skill badges through assessments to stand out to employers.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 text-center">
            <Button
              onClick={() => router.push("/login")}
              size="lg"
              className="bg-white text-orange-600 hover:bg-gray-100 rounded-full px-10 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
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