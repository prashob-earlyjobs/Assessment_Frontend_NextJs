"use client";
import PublicTalentPoolForm from "@/app/components/forms/TalentPoolForm";
import { createTalentPoolcandidatePublic, getInitialDataAPI, updateCandidateDetailsPublic, sendOTPAPI } from "@/app/components/services/candidateapi";
import { generateGeminiContentFromResume } from "@/app/components/services/usersapi";
import { uploadFile } from "@/app/components/services/companiesapi";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function Page() {

  const [candidateDetails, setCandidateDetails] = useState<any>({});
  const { candidateId } = useParams<{ candidateId: string }>();
  // Wrapper function for form submission
  const handleSubmitForm = async (
    id: string | undefined,
    data: any,
    resumeFile?: File
  ) => {
    return await updateCandidateDetailsPublic(id, data, resumeFile);
  };

  // Wrapper function for resume upload
  const handleUploadResume = async (file: File, fileName: string) => {
    const response = await uploadFile(file);
    return { fileUrl: response.fileUrl };
  };

  // Wrapper function for generating resume content
  const handleGenerateResumeContent = async (file: File) => {
    return await generateGeminiContentFromResume(file);
  };

  // Wrapper function for fetching cities
  const handleFetchCities = async (country: string): Promise<string[]> => {
    try {
      const response = await axios.post('https://countriesnow.space/api/v0.1/countries/cities', {
        country: country
      });
      
      if (response.data && response.data.data && Array.isArray(response.data.data)) {
        return response.data.data;
      }
      return [];
    } catch (error) {
      console.error('Error fetching cities:', error);
      return [];
    }
  };

  // Wrapper function for sending OTP
  const handleSendOTP = async (id: string | undefined, phone?: string) => {
    // sendOTPAPI doesn't require phone, so we ignore it
    return await sendOTPAPI(id);
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      const response = await getInitialDataAPI(candidateId || undefined);
      if(response && response.status ==="success"){
        setCandidateDetails(response.data);
      }
    };
    fetchInitialData();
  }, [candidateId]);


  return (
    <PublicTalentPoolForm
      title="Candidate Details"
      subtitle="Edit Candidate Details"
      modalMessage="Candidate details updated successfully"
      onSubmitForm={handleSubmitForm}
      uploadResumeFile={handleUploadResume}
      generateResumeContent={handleGenerateResumeContent}
      fetchCitiesByCountry={handleFetchCities}
      sendOTP={handleSendOTP}
      initialData={candidateDetails || undefined}
    />
  );
}

