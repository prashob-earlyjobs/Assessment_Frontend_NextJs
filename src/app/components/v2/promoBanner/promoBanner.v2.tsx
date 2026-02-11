"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const PromoBannerV2 = () => {
  const router = useRouter();

  return (
    <section className="w-full bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 md:space-y-16">
        {/* First Section: Good Life Begins */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
          <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden">
            <Image
              src="/v2/images/hero-bg.png"
              alt="Good Company"
              fill
              className="object-cover rounded-2xl"
              priority={false}
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
              Good Life Begins With A Good Company
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">
              Ultricies purus dolor viverra mi laoreet at cursus justo. Ultrices purus diam egestas amet faucibus tempor blandit. Elit velit mauris aliquam est diam. Leo sagittis consectetur diam morbi erat aenean. Vulputate praesent congue faucibus in euismod feugiat euismod volutpat. Adipiscing risus amet phasellus imperdiet eget vel pulvinar. Risus in felis faucibus sit. Scelerisque consequat iaculis mauris amet vel felis id tincidunt nunc.
            </p>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">   
          <div className="flex flex-col items-start">
            <p className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">12k+</p>
            <p className="text-lg font-semibold text-gray-800 mb-3">Clients worldwide</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              At eu lobortis pretium tincidunt amet lacus ut aenean aliquet. Blandit a massa elementum
            </p>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">20k+</p>
            <p className="text-lg font-semibold text-gray-800 mb-3">Active resume</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              At eu lobortis pretium tincidunt amet lacus ut aenean aliquet. Blandit a massa elementum
            </p>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">18k+</p>
            <p className="text-lg font-semibold text-gray-800 mb-3">Companies</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              At eu lobortis pretium tincidunt amet lacus ut aenean aliquet. Blandit a massa elementum
            </p>
          </div>
        </div>

        {/* Dark Banner Section */}
        <div className="relative overflow-hidden rounded-2xl bg-black shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left side - Text content */}
            <div className="text-white p-8 sm:p-10 md:p-12 lg:p-16 flex flex-col justify-center">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                Create A Better Future For Yourself
              </h3>
              <p className="text-sm sm:text-base text-gray-300 mb-8 max-w-lg">
                Metus faucibus sed turpis lectus feugiat tincidunt. Rhoncus sed tristique in dolor. Mus etiam et vestibulum venenatis viverra ut. Elit morbi bibendum ullamcorper augue faucibus.
              </p>
              <button
                onClick={() => router.push("/jobs")}
                className="inline-flex items-center justify-center rounded-lg bg-[#F08504] px-6 py-3 text-base font-semibold text-white hover:bg-orange-600 transition-colors w-fit"
              >
                Search Job
              </button>
            </div>

            {/* Right side - People image */}
            <div className="relative h-64 md:h-auto min-h-[300px]">
              <Image
                src="/v2/images/hero-bg.png"
                alt="People working together"
                fill
                priority={false}
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBannerV2;

