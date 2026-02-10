"use client";
import PublicTalentPoolForm from "@/app/components/forms/TalentPoolForm";
import { createTalentPoolcandidatePublic, sendOTPAPI, sendOTPAPIForJointTalentPool, getJobCategoriesAPI, IJobCategory } from "../../../components/services/candidateapi";
import { generateGeminiContentFromResume } from "../../../components/services/usersapi";
import { uploadFile } from "../../../components/services/companiesapi";
import axios from "axios";

export default function Page() {
  // Wrapper function for form submission
  const handleSubmitForm = async (
    id: string | undefined,
    data: any,
    resumeFile?: File
  ) => {
    return await createTalentPoolcandidatePublic(id, data, resumeFile);
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
  const handleSendOTP = async (id: string | undefined, phone: string) => {
    try {
      await sendOTPAPIForJointTalentPool(id, phone);
      console.log('OTP sent successfully');
    } catch (error) {
      console.error('Failed to send OTP:', error);  
      throw error; // Re-throw to let OTPModal handle it
    }
  };

  // Wrapper function for fetching job categories
  const handleFetchJobCategories = async (): Promise<IJobCategory[]> => {
    return await getJobCategoriesAPI();
  };

  return (
    <PublicTalentPoolForm
      title="Talent Pool Registration"
      subtitle="Complete your profile to join our talent pool and unlock career opportunities"
      onSubmitForm={handleSubmitForm}
      uploadResumeFile={handleUploadResume}
      generateResumeContent={handleGenerateResumeContent}
      fetchCitiesByCountry={handleFetchCities}
      fetchJobCategories={handleFetchJobCategories}
      sendOTP={handleSendOTP}
    />
  );
}