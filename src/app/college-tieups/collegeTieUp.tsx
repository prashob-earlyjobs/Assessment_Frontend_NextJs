"use client";
import React, { useState, useEffect } from "react";
import Header from "../components/pages/header";
import Footer from "../components/pages/footer";

interface College {
  id: string;
  name: string;
  logo_url: string | null;
  location: string;
  spoc_name: string;
  spoc_email: string;
  spoc_phone: string;
  created_at: string;
  updated_at: string;
}

interface ApiResponse {
  colleges: College[];
  count: number;
}

// Placeholder image for colleges without logos
const placeholderImage = "/homepage_imgs/6190696.png";

const CollegeTieUp: React.FC = () => {
  const [colleges, setColleges] = useState<College[]>([]);
  // const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL_2_0}/colleges/tie-ups`;

  useEffect(() => {
    // Mock data for colleges
    const mockColleges: College[] = [
      {
        id: "1",
        name: "Newton School of Technology",
        logo_url: "/images/3.png",
        location: "Delhi, India",
        spoc_name: "John Doe",
        spoc_email: "john.doe@newtonschool.co",
        spoc_phone: "+91-9876543210",
        created_at: "2023-01-15T10:00:00Z",
        updated_at: "2023-06-20T12:00:00Z",
      },
      {
        id: "2",
        name: "NxtWave Institute of Technology | NIAT",
        logo_url: "/images/4.png",
        location: "Hyderabad, Telangana",
        spoc_name: "Jane Smith",
        spoc_email: "jane.smith@niat.edu",
        spoc_phone: "+91-8765432109",
        created_at: "2022-11-10T09:00:00Z",
        updated_at: "2023-07-15T11:00:00Z",
      },
      {
        id: "3",
        name: "LAMRIN Punjab",
        logo_url: "/images/5.png",
        location: "Jalandhar, Punjab",
        spoc_name: "Amit Kumar",
        spoc_email: "amit.kumar@lamrin.edu",
        spoc_phone: "+91-7654321098",
        created_at: "2023-03-22T08:00:00Z",
        updated_at: "2023-08-10T10:00:00Z",
      },
      {
        id: "4",
        name: "Kurukshetra University",
        logo_url: "/images/6.png",
        location: "Kurukshetra, Haryana",
        spoc_name: "Priya Sharma",
        spoc_email: "priya.sharma@kuk.ac.in",
        spoc_phone: "+91-6543210987",
        created_at: "2022-09-05T07:00:00Z",
        updated_at: "2023-09-01T09:00:00Z",
      },
      {
        id: "5",
        name: "AVN Institute of Engineering & Technology | AVNIET",
        logo_url: "/images/7.png",
        location: "Visakhapatnam, Andhra Pradesh",
        spoc_name: "Anil Kumar",
        spoc_email: "anil.kumar@avniet.ac.in",
        spoc_phone: "+91-9876543210",
        created_at: "2022-09-05T07:00:00Z",
        updated_at: "2023-09-01T09:00:00Z",
      },
      {
        id: "6",
        name: "Yenepoya University",
        logo_url: "/images/8.png",
        location: "Mangaluru, Karnataka",
        spoc_name: "Ravi Singh",
        spoc_email: "ravi.singh@cuchd.in",
        spoc_phone: "+91-9876543210",
        created_at: "2022-09-05T07:00:00Z",
        updated_at: "2023-09-01T09:00:00Z",
      },
      {
        id: "7",
        name: "PCTE Ludhiana",
        logo_url: "/images/9.png",
        location: "Ludhiana, Punjab",
        spoc_name: "Ravi Singh",
        spoc_email: "ravi.singh@cuchd.in",
        spoc_phone: "+91-9876543210",
        created_at: "2022-09-05T07:00:00Z",
        updated_at: "2023-09-01T09:00:00Z",
      },
      {
        id: "8",
        name: "SkillSpeed Technologies",
        logo_url: "/images/1.png",
        location: "Bengaluru, Karnataka",
        spoc_name: "Ravi Singh",
        spoc_email: "ravi.singh@cuchd.in",
        spoc_phone: "+91-9876543210",
        created_at: "2025-12-02T07:00:00Z",
        updated_at: "2025-12-02T07:00:00Z",
      },
      {
        id: "9",
        name: "ziion technology",
        logo_url: "/images/2.png",
        location: "Mohali, Punjab",
        spoc_name: "Ravi Singh",
        spoc_email: "ravi.singh@cuchd.in",
        spoc_phone: "+91-9876543210",
        created_at: "2025-12-02T07:00:00Z",
        updated_at: "2025-12-02T07:00:00Z",
      },
      {
        id: "10",
        name: "Rksd college of management",
        logo_url: "/images/10.png",
        location: "Haryana, India",
        spoc_name: "Ravi Singh",
        spoc_email: "ravi.singh@cuchd.in",
        spoc_phone: "+91-9876543210",
        created_at: "2025-12-02T07:00:00Z",
        updated_at: "2025-12-02T07:00:00Z",
      },
      // Colleges from JSON data
      {
        id: "11",
        name: "GRV Business Management Academy",
        logo_url: "/images/grv - Edited.png",
        location: "Bengaluru, India",
        spoc_name: "Ravi Singh",
        spoc_email: "ravi.singh@cuchd.in",
        spoc_phone: "+91-9876543210",
        created_at: "2025-12-02T07:00:00Z",
        updated_at: "2025-12-02T07:00:00Z",
      },
      {
        id: "12",
        name: "Ebenezer Group Of Institutions",
        logo_url: "/images/ebenezer.png",
        location: "Bengaluru, India",
        spoc_name: "Ravi Singh",
        spoc_email: "ravi.singh@cuchd.in",
        spoc_phone: "+91-9876543210",
        created_at: "2025-12-02T07:00:00Z",
        updated_at: "2025-12-02T07:00:00Z",
      },
      {
        id: "13",
        name: "IIM Sambalpur",
        logo_url: "/images/iimsambalpur.png",
        location: "Sambalpur, Odisha, India",
        spoc_name: "Ravi Singh",
        spoc_email: "ravi.singh@cuchd.in",
        spoc_phone: "+91-9876543210",
        created_at: "2025-12-02T07:00:00Z",
        updated_at: "2025-12-02T07:00:00Z",
      },
      {
        id: "14",
        name: "Narsee Monjee Institute of Management Studies",
        logo_url: "/images/nmims.png",
        location: "Hyderabad, Telangana, India",
        spoc_name: "john doe",
        spoc_email: "hohn@gmaiul.com",
        spoc_phone: "+91-9899xxxxxx",
        created_at: "2025-12-02T07:00:00Z",
        updated_at: "2025-12-02T07:00:00Z",
      },{
        id: "15",
        name: "ISBR Business School",
        logo_url: "/images/isbr.png",
        location: "Bengaluru, Karnataka, India",
        spoc_name: "john doe",
        spoc_email: "hohn@gmaiul.com",
        spoc_phone: "+91-9899xxxxxx",
        created_at: "2025-12-02T07:00:00Z",
        updated_at: "2025-12-02T07:00:00Z",
      },{
        id: "16",
        name: "Anudip Foundation",
        logo_url: "/images/nudip.png",
        location: "Maharashtra, India",
        spoc_name: "john doe",
        spoc_email: "hohn@gmaiul.com",
        spoc_phone: "+91-9899xxxxxx",
        created_at: "2025-12-02T07:00:00Z",
        updated_at: "2025-12-02T07:00:00Z",
      },{
        id: "17",
        name: "T. A. Pai Management Institute (TAPMI)",
        logo_url: "/images/tapmi.png",
        location: "Manipal, Karnataka, India",
        spoc_name: "john doe",
        spoc_email: "hohn@gmaiul.com",
        spoc_phone: "+91-9899xxxxxx",
        created_at: "2025-12-02T07:00:00Z",
        updated_at: "2025-12-02T07:00:00Z",
      },
    ];

    setColleges(mockColleges);
    /*
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data: ApiResponse) => setColleges(data.colleges))
      .catch((error) => console.error('Error fetching colleges:', error));
    */
  }, []);

  return (
    <>
      <Header />
      <div className="container mx-auto px-8 py-8 min-h-screen">
        <h2 className="text-4xl font-bold text-orange-500 text-center mb-4 lg:mt-8">
          Our College Tie-Ups
        </h2>
        <p className="text-center text-gray-600 mb-8 lg:mb-16">
          EarlyJobs AI collaborates with India's top colleges to empower future
          talent.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {colleges.map((college) => (
            <div
              key={college.id}
              className="college-card bg-gray-100 p-4 rounded-lg shadow-md text-center hover:scale-102 transition-transform duration-300 border-t-3 border-orange-500 hover:border-blue-80 max-h-55 min-h-55"
            >
              {college.logo_url ? (
                <img
                  src={college.logo_url}
                  alt={`${college.name} logo`}
                  className="mx-auto w-25 mb-3 object-contain scale-180"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = placeholderImage;
                  }}
                />
              ) : (
                <img
                  src={placeholderImage}
                  alt="Placeholder logo"
                  className="mx-auto h-20 mb-4 object-contain"
                />
              )}
              <h3 className="text-lg font-semibold text-gray-800">
                {college.name}
              </h3>
              <p className="text-sm text-gray-600">{college.location}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CollegeTieUp;
