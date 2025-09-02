import Header from "./header";

const Story = () => {
  return (
    <>
      <Header />
      <main className="w-full min-h-screen bg-gradient-to-b from-orange-50 to-white">
        <section className="max-w-5xl mx-auto px-4 py-10 md:py-16">
          <div className="mb-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">Our Story</h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-orange-500 mb-6">
              EarlyJobs: From Women's Empowerment to Nationwide Hiring
            </h2>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 md:p-10 mb-10">
            <p className="text-lg md:text-xl text-gray-700 mb-4">
              Across India, countless women recruiters and aspiring recruiters face a silent struggle, opportunities often fade after college, marriage, or career breaks, leaving talent underutilized. EarlyJobs was born to change this. By creating India's largest freelance recruiter network, the platform offers women the flexibility to work from home, earn, and build meaningful careers on their own terms. Today, women form the backbone of EarlyJobs, proving that the right ecosystem can unlock immense potential.
            </p>
            <p className="text-lg md:text-xl text-gray-700 mb-4">
              As the platform grew, another challenge emerged: connecting with talent in Tier 2 and Tier 3 cities. EarlyJobs responded by introducing a district-level franchise model, enabling local entrepreneurs to run recruitment operations within their own communities. This not only ensures that companies across India gain access to diverse, skilled talent, but also empowers local professionals to generate employment in their regions. Together, these initiatives are reshaping the hiring landscape, making recruitment more inclusive, accessible, and impactful.
            </p>
            <div className="flex flex-col items-center my-8">
              <img
                src="/images/logo.png"
                alt="EarlyJobs Logo"
                className="h-16 w-auto mb-2"
              />
              <p className="text-orange-600 font-semibold mb-1">Empowering Recruiters to Work Remotely</p>
              <a
                href="https://www.earlyjobs.ai"
                className="text-orange-500 underline font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.earlyjobs.ai
              </a>
            </div>
          </div>
          <hr className="border-0 h-2 bg-orange-200 rounded-full mb-10" />
          <div className="mb-10 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-orange-500 mb-6">
              EarlyJobs.ai: Preparing Job-Seekers to Succeed
            </h2>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 md:p-10 mb-10">
            <p className="text-lg md:text-xl text-gray-700 mb-4">
              In the world of hiring, confidence alone is not enough. Many students and job seekers believe they are skilled and prepared, yet when they step into interviews, they face rejection for the very skills they thought they had mastered. Often, this happens because they have never tested their abilities in a real-world scenario or understood the patterns of interview questions in their domain.
            </p>
            <p className="text-lg md:text-xl text-gray-700 mb-4">
              Identifying the void, we created EarlyJobs.ai, an AI-powered skills assessment platform designed to bridge the preparation gap. Here, candidates can evaluate their skills before a real interview. Each assessment provides a detailed report, showing what they excel at and what areas need improvement. This allows candidates to prepare effectively, gain confidence, and walk into interviews knowing exactly where they stand.
            </p>
            <p className="text-lg md:text-xl text-gray-700 mb-4">
              EarlyJobs.ai is more than a tool, it is a stepping stone for success. It ensures that students and job seekers are truly ready to excel, turning uncertainty into confidence. Through this initiative, EarlyJobs continues its mission of empowerment. Together, we are enabling careers and creating meaningful opportunities across India.
            </p>
            <div className="flex flex-col items-center my-8">
              <img
                src="/images/logo.png"
                alt="EarlyJobs Logo"
                className="h-16 w-auto"
              />
            </div>
          </div>
          <hr className="border-0 h-2 bg-orange-200 rounded-full mb-10" />
        </section>
      </main>
    </>
  );
};

export default Story;