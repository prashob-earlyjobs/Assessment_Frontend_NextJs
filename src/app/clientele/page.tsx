"use client"
import React, { useState, useEffect } from 'react';
import Header from '../components/pages/header';
import Footer from '../components/pages/footer';

interface Company {
  id: string;
  name: string;
  logo_url: string | null;
  registered_address: string;
  address: string;
  email: string;
  phone: string;
  gst_no: string;
  spoc_name: string;
  spoc_email: string;
  spoc_phone: string;
  created_at: string;
  updated_at: string;
  referred_by: string | null;
}

interface ApiResponse {
  companies: Company[];
  count: number;
}

const Clientele: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL_IN}/companies/companies`;

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data: ApiResponse) => setCompanies(data.companies))
      .catch((error) => console.error('Error fetching companies:', error));
  }, [apiUrl]);

  return (
    <>
    <Header/>
    <div className="container mx-auto px-8 py-8">
      <h2 className="text-4xl font-bold text-orange-500 text-center mb-4 lg:mt-8 ">Our Clientele</h2>
      <p className="text-center text-gray-600 mb-8 lg:mb-16">EarlyJobs AI powers hiring for India's best brands.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {companies.map((company) => (
          <div key={company.id} className="client-card bg-gray-100 p-4 rounded-lg shadow-md text-center hover:scale-105 transition-transform duration-300 border-t-3 border-orange-500 hover:border-blue-800">
            {company.logo_url ? (
              <img src={company.logo_url} alt={`${company.name} logo`} className="mx-auto h-18 mb-4 bg-white" />
            ) : (
              <div className="mx-auto h-16 mb-4 bg-white flex items-center justify-center">No Logo</div>
            )}
            <h3 className="text-lg font-semibold text-gray-800">{company.name}</h3>
            <button className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600">Services</button>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Clientele;