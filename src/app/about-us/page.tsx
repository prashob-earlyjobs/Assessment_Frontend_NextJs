"use client"
import React, { useEffect } from 'react'
import { FaLinkedin } from "react-icons/fa";
import { metaConstants } from '../utils/metaConstants';
import Header from '../components/pages/header';
import Footer from '../components/pages/footer';

const AboutUs = () => {

    const culturalFit = [
        {
            heading1: 'Deep understanding of organizational culture:',
            para1: 'We work closely with our clients to gain a comprehensive understanding of their organizational culture. By having in-depth discussions, conducting site visits, and studying their values, mission, and work environment, we develop a clear picture of the organization’s culture.',
            img: '/about_us_imgs/img1.png',
            heading2: 'Cultural assessments and psychometric evaluations:',
            para2: 'In certain cases, we may conduct cultural assessments and psychometric evaluations to gain a deeper understanding of candidates’ personality traits, work styles, and values. This information can be compared to the organization’s cultural framework to evaluate potential alignment.', 
        },
        {
            img: '/about_us_imgs/img2.png',
            heading2: 'Position profiling and alignment:',
            para2: 'We create detailed position profiles that not only outline the required skills and qualifications but also highlight the cultural attributes that are important for success in the role. This helps us in sourcing candidates who not only possess the necessary qualifications but also align well with the organization’s cultural values.', 
        },
        {
            heading1: 'Behavioral and situational interviews:',
            para1: 'During the candidate assessment phase, we conduct behavioral and situational interviews. These interviews include questions that assess how candidates have demonstrated behaviors that align with the organization’s culture in their previous roles. By analyzing their past behavior and responses, we can gauge their potential cultural fit.',
            img: '/about_us_imgs/img3.png',
            heading2: 'Company immersion and site visits:',
            para2: 'For final-stage candidates, we may organize company immersion sessions or site visits, where they have the opportunity to experience the organization’s culture firsthand. This interaction allows candidates to assess if the organization’s culture aligns with their own values and vice versa.', 
        },
    ]

    useEffect(() => {
        window.scrollTo(0, 0)
        document.title = metaConstants.about.title

        const metaDescription = document.querySelector('meta[name="description"]');
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        const metaSubject = document.querySelector('meta[name="subject"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', metaConstants.about.description);
        }
        if (metaKeywords) {
            metaKeywords.setAttribute('content', metaConstants.about.keywords);
        }
        if (metaSubject) {
            metaSubject.setAttribute('content', metaConstants.about.description);
        }

        return () => {
            document.title = metaConstants.title
            if (metaDescription) {
                metaDescription.setAttribute('content', metaConstants.description);
            }
            if (metaKeywords) {
                metaKeywords.setAttribute('content', metaConstants.keywords);
            }
            if (metaSubject) {
                metaSubject.setAttribute('content', metaConstants.description);
            }
        };
    }, [])

    return (
        <div className="min-h-screen bg-white">
          <Header />
            <div className="relative bg-[#EB6A4D]  text-white py-2 md:py-4">
                <h1 className="text-lg md:text-xl font-bold text-center">About Us</h1>
                
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-12">
                    <h3 className="text-2xl md:text-3xl font-semibold text-orange-800 mb-4">Empowering Recruitment</h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        EarlyJobs is an innovative platform designed to provide freelance and aspiring recruiters the flexibility to work from anywhere, leveraging the benefits of remote work.
                    </p>
                </div>

                <div className="mb-12">
                    <h3 className="text-2xl md:text-3xl font-semibold text-orange-800 mb-4">Who We Serve</h3>
                    <ol className="list-decimal list-inside space-y-4 text-lg text-gray-700">
                        <li>Individuals seeking remote work as recruiters can find ample scope to work from the comfort of their homes.</li>
                        <li>Aspiring professionals eager to gain hands-on experience in recruitment can explore internship options tailored to their career aspirations on EarlyJobs.</li>
                        <li>Recruiters employed in companies can leverage their spare time by tapping into freelance opportunities on this platform.</li>
                        <li>This platform offers opportunities to college/university for in-campus Internship in recruitment.</li>
                        <li>It also provides franchise opportunities to people who want to begin/set up their recruitment agency in any part of India.</li>
                    </ol>
                </div>

                {/* <div className="mb-12">
                    <h3 className="text-2xl md:text-3xl font-semibold text-orange-800 mb-4">Cultural Fit Between Candidates and Organizations</h3>
                    <hr className="border-t-2 border-orange-500 w-16 mb-6" />
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {culturalFit.map((item, index) => (
                            <div key={index} className="bg-orange-50 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                                {item.heading1 && <h3 className="text-xl font-semibold text-orange-800 mb-2">{item.heading1}</h3>}
                                {item.para1 && <p className="text-gray-700 mb-4">{item.para1}</p>}
                                <img src={item.img} alt="Cultural Fit" className="w-full h-48 object-cover rounded-md mb-4" />
                                <h3 className="text-xl font-semibold text-orange-800 mb-2">{item.heading2}</h3>
                                <p className="text-gray-700">{item.para2}</p>
                            </div>
                        ))}
                    </div>
                </div> */}

                <div className="mb-12">
                    <h3 className="text-2xl md:text-3xl font-semibold text-orange-800 mb-4">The Story Behind EarlyJobs</h3>
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="flex-1">
                            <ul className="list-disc list-inside space-y-4 text-lg text-gray-700">
                                <li>For years, <span className="font-semibold text-orange-800">Mr. Ravi</span> had been a prominent figure in the recruitment industry, running his agency with dedication and precision. Yet, amidst the hustle and bustle of corporate corridors, he couldn't shake off the persistent thought of those left behind – the countless youths scattered across the country, yearning for opportunities in the field of recruitment.</li>
                                <li>Their voices echoed in his mind as he pondered over the glaring gap between talent and opportunity. Mr. Ravi couldn't ignore the wave of students clamoring for internships as well as the potential recruiters yearning for remote work opportunities.</li>
                                <li>Fueled by empathy and driven by a sense of responsibility, Mr. Ravi embarked on a journey of innovation. He envisioned a solution that would not only bridge the chasm between aspiration and achievement but would also redefine the very essence of recruitment itself. Thus, <span className="font-semibold text-orange-800">EarlyJobs was conceived – a portal where dreams intersected with possibilities.</span></li>
                                <li>The platform became a beacon of hope for experienced recruiters as well as countless youths across the nation, offering them the chance to step into the world of recruitment irrespective of their geographical location.</li>
                                <li>In short, EarlyJobs is <span className="font-semibold text-orange-700">revolutionizing recruitment with flexible remote work solutions and nurturing the next generation through internships.</span></li>
                                <li>At EarlyJobs we empower women recruiters as well as aspiring recruiters to utilise their versatility and work from home regardless of the geographical boundaries. <span className="font-semibold text-orange-700">EarlyJobs has a track record of an impressive clientele and is already creating ripples in the Indian job sector.</span> <span className="font-semibold text-orange-800">EarlyJobs isn't just a portal – it's a testament to the power of empathy, innovation, and the relentless pursuit of a better tomorrow.</span></li>
                            </ul>
                        </div>
                        <div className="flex-none text-center">
                            <img src="/images/founder-image.jpg" alt="EarlyJobs Founder Ravi" className="w-68 h-68 rounded-full mx-auto mb-4 object-cover border-4 border-orange-300" />
                            <p className="text-lg font-semibold text-orange-800">Mr. Ravi Prakash Kumar</p>
                            <p className="text-gray-700">Founder, EarlyJobs</p>
                            <a href="https://www.linkedin.com/in/raviprakashkumar/" target="_blank" rel="noreferrer" className="inline-block mt-2 text-orange-600 hover:text-orange-800">
                                <FaLinkedin className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mb-12">
                    <h3 className="text-2xl md:text-3xl font-semibold text-orange-800 mb-4">Mission</h3>
                    <ul className="list-disc list-inside space-y-4 text-lg text-gray-700">
                        <li>The mission of EarlyJobs is to empower individuals and organizations by providing a dynamic platform that bridges the gap between talent and opportunity. We aim to revolutionize the way recruitment is approached, offering flexibility for recruiters, fostering a culture of remote work, and nurturing the next generation of talent through internships.</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-2xl md:text-3xl font-semibold text-orange-800 mb-4">Vision</h3>
                    <ul className="list-disc list-inside space-y-4 text-lg text-gray-700">
                        <li>Our vision at EarlyJobs is to be the foremost global platform, seamlessly connecting talent with opportunities. We envision a future where recruitment is agile, remote work is prevalent, and talent development is prioritized. Through innovation and inclusivity, we aspire to redefine the dynamics of the professional world.</li>
                    </ul>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default AboutUs