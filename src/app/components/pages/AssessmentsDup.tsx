import { useRouter } from "next/navigation";


const Assessments = () => {
    const router = useRouter();
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
     
      {/* Hero Section */}
      <section className="relative bg-orange-500 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Discover Your
              <span className="block text-orange-100">Career Potential</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed">
              Take comprehensive assessments designed to unlock your strengths and guide your professional journey with EarlyJobs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="/assessments"
                className="inline-flex items-center px-8 py-4 bg-white text-orange-600 font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
              >
                Start Your Assessment
                <svg 
                  className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              
              <button className="inline-flex items-center px-8 py-4 text-white border-2 border-white/30 rounded-lg hover:bg-white/20 hover:border-white/50 backdrop-blur-sm transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose EarlyJobs Assessments?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our advanced assessment platform helps you make informed career decisions with confidence.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Comprehensive Analysis",
                description: "Get detailed insights into your skills, personality, and career preferences through scientifically-backed assessments.",
                icon: "📊"
              },
              {
                title: "Personalized Results",
                description: "Receive tailored recommendations and career paths based on your unique profile and assessment results.",
                icon: "🎯"
              },
              {
                title: "Industry Insights",
                description: "Discover emerging opportunities and understand market demands in your field of interest.",
                icon: "🌟"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2 p-8 text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Discover Your Path?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Join thousands of professionals who have found their ideal career through our assessments.
          </p>
          <a 
            href="/assessments"
            className="inline-flex items-center px-8 py-4 bg-white text-orange-600 font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
          >
            Get Started Today
            <svg 
              className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </section>

      {/* Footer */}
     
    </div>
  );
};

export default Assessments;