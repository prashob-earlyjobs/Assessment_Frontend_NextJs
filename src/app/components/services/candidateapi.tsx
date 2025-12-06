import axiosInstance from "./apiinterseptor"; // Assuming same interceptor setup
import { toast } from "react-toastify";
import axios, { AxiosResponse } from 'axios';
import { ICreateTallentPoolFormData } from "@/app/components/forms/TalentPoolForm";
import { ParamValue } from "next/dist/server/request/params";

// Interface for location details
export interface ILocationDetails {
  street: string;
  area: string;
  city: string; // Required field
  pincode: string;
  fullAddress: string;
}

// Make sure to export the interface
export interface ICreateApplicationFormData {
  // --- Job Details (Required) ---
  jobId: string;
  jobType: 'main' | 'sub';

  // --- Candidate Details (All required as per backend schema) ---
  name: string;
  email: string;
  phone: string;
  fatherName: string;
  dateOfBirth: string; // ISO 8601 date string
  gender: 'Male' | 'Female' | 'Other';
  aadharNumber?: string;
  highestQualification: string;
  currentLocationDetails: ILocationDetails;
  spokenLanguages: string[];
  totalExperienceYears: number;
  totalExperienceMonths: number;
  skills: string[];
  preferredJobCategories: string[];
  preferredEmploymentTypes: string[];
  preferredWorkTypes: ('remote' | 'hybrid' | 'on-site')[];
  
  // File upload
  resume?: File;
}



// Interface for create application response
interface ICreateApplicationResponse {
  status: string;
  message: string;
  data: {
    applicationId: string;
    candidateId: string;
    jobId: string;
    currentStatus: string;
    isNewCandidate: boolean;
  };
}





// Enum for tenure eligibility status
export enum TenureEligibilityStatus {
  ELIGIBLE = 'Eligible',
  NOT_ELIGIBLE = 'Not Eligible',
  UNKNOWN = 'Unknown',
}





// Interface for payout summary
interface IPayoutSummary {
  [key: string]: any; // Adjust based on actual summary structure
}

export const createApplication = async (
  data: ICreateApplicationFormData,
  resumeFile?: File
): Promise<ICreateApplicationResponse> => {
  try {
    const apiUrl = '/applications';
    const fullUrl = `${axiosInstance.defaults.baseURL}${apiUrl}`;

    console.log('Creating new application');
    console.log('API URL:', fullUrl);
    console.log('Request Data:', data);

    // Validate required fields according to backend schema
    const requiredFields = [
      'name', 'email', 'phone', 'fatherName', 'dateOfBirth', 
      'gender', 'highestQualification', 'jobId', 'jobType'
    ];
    
    for (const field of requiredFields) {
      if (!data[field as keyof ICreateApplicationFormData]) {
        throw new Error(`${field} is a required field`);
      }
    }

    // Validate currentLocationDetails.city is required
    if (!data.currentLocationDetails?.city) {
      throw new Error('City is required in location details');
    }

    // Ensure all array fields are properly formatted
    const normalizedData = {
      jobId: data.jobId,
      jobType: data.jobType,
      name: data.name,
      email: data.email,
      phone: data.phone,
      fatherName: data.fatherName,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      ...(data.aadharNumber && data.aadharNumber.trim() && { aadharNumber: data.aadharNumber }),
      highestQualification: data.highestQualification,
      currentLocationDetails: data.currentLocationDetails,
      totalExperienceYears: data.totalExperienceYears,
      totalExperienceMonths: data.totalExperienceMonths,
      // Ensure arrays have at least one element and are properly formatted
      skills: Array.isArray(data.skills) && data.skills.length > 0 ? data.skills : ["General"],
      spokenLanguages: Array.isArray(data.spokenLanguages) && data.spokenLanguages.length > 0 ? data.spokenLanguages : ["English"],
      preferredJobCategories: Array.isArray(data.preferredJobCategories) && data.preferredJobCategories.length > 0 ? data.preferredJobCategories : ["General"],
      preferredEmploymentTypes: Array.isArray(data.preferredEmploymentTypes) && data.preferredEmploymentTypes.length > 0 ? data.preferredEmploymentTypes : ["Full-time"],
      preferredWorkTypes: Array.isArray(data.preferredWorkTypes) && data.preferredWorkTypes.length > 0 ? data.preferredWorkTypes : ["on-site"]
    };

    console.log('Normalized data to send:', normalizedData);

    // Send as JSON instead of FormData
    const response = await axiosInstance.post(apiUrl, normalizedData, {
      headers: { 
        'Content-Type': 'application/json'
      },
    });

    console.log('Application created successfully:', response.data);
    toast.success('Application submitted successfully');
    return response.data;
  } catch (error: any) {
    console.error('Failed to create application:', error.response?.data?.message || error.message);
    console.error('Full error response:', error.response?.data);

    if (error.response?.status === 400) {
      const errorMessage = error.response?.data?.message || 'Invalid application data. Please check the provided information.';
      toast.error(errorMessage);
    } else if (error.response?.status === 401) {
      toast.error('Authentication failed. Please log in again.');
    } else if (error.response?.status === 403) {
      toast.error('Access denied. You may not have permission to create applications.');
    } else if (error.response?.status === 409) {
      toast.error('This candidate has already been applied to this job.');
    } else if (error.response?.status === 422) {
      const errorMessage = error.response?.data?.message || 'Validation error. Please check the application data.';
      toast.error(errorMessage);
    } else {
      toast.error(error.response?.data?.message || 'Failed to create application. Please try again.');
    }
    throw error;
  }
};

export const updateCandidateDetails = async (
  id: string | ParamValue ,
  data: ICreateTallentPoolFormData
): Promise<ICreateApplicationResponse> => {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL_2_0
    if (!backendUrl) {
      throw new Error('Backend URL is not configured in environment variables');
    }
    const apiEndpoint = `${backendUrl}/talentPoolCandidates/${id}/updateCandidateDetails`;
    const response = await axiosInstance.put(apiEndpoint, data);
    return response.data;
  } catch (error: any) {
    console.log('Failed to update candidate details:', error.response?.data?.message || error.message);
    throw error;
  }
};


// Update candidate details for public candidate link send as reminder
export const updateCandidateDetailsPublic = async (
  id: string | ParamValue ,
  data: ICreateTallentPoolFormData,
  resumeFile?: File
): Promise<ICreateApplicationResponse> => {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL_2_0
    if (!backendUrl) {
      throw new Error('Backend URL is not configured in environment variables');
    }
    const apiEndpoint = `${backendUrl}/public/update-candidate/${id}`;
    const response = await axiosInstance.patch(apiEndpoint, data, {
      headers: {
        'Content-Type': 'application/json'
      },
    });
    if (resumeFile) {
      const response = await axiosInstance.post(`${apiEndpoint}/uploadResume`, {
        resume: resumeFile
      });
    }
    return response.data;
  } catch (error: any) {
    console.error('Failed to update candidate details:', error.response?.data?.message || error.message);
    console.error('Full error response:', error.response?.data);
    throw error;
  }
};

export const createTalentPoolcandidatePublic = async (
  id: string | ParamValue ,
  data: ICreateTallentPoolFormData,
  resumeFile?: File
): Promise<ICreateApplicationResponse> => {
  try {
    // Get backend URL from environment variable (adjust the env key as per your setup, e.g., process.env.REACT_APP_BACKEND_URL for CRA or import.meta.env.VITE_BACKEND_URL for Vite)
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL_2_0
    if (!backendUrl) {
      throw new Error('Backend URL is not configured in environment variables');
    }

    // Construct the full API endpoint URL manually
    const apiEndpoint = `${backendUrl}/talentPoolCandidates/${id}/createTalentPoolCandidate`;

    // Validate required fields according to backend schema
    const requiredFields = [
      'name', 'email', 'phone', 'fatherName', 'dateOfBirth', 
      'gender', 'highestQualification', 
    ];
    
    for (const field of requiredFields) {
      if (!data[field as keyof ICreateTallentPoolFormData]) {
        throw new Error(`${field} is a required field`);
      }
    }

    // Validate currentLocationDetails.city is required
    if (!data.currentLocationDetails?.city) {
      throw new Error('City is required in location details');
    }

    // Ensure all array fields are properly formatted
    const normalizedData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      fatherName: data.fatherName,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      ...(data.aadharNumber && data.aadharNumber.trim() && { aadharNumber: data.aadharNumber }),
      highestQualification: data.highestQualification,
      currentLocationDetails: data.currentLocationDetails,
      totalExperienceYears: data.totalExperienceYears,
      totalExperienceMonths: data.totalExperienceMonths,
      skills: Array.isArray(data.skills) && data.skills.length > 0 ? data.skills : ["General"],
      spokenLanguages: Array.isArray(data.spokenLanguages) && data.spokenLanguages.length > 0 ? data.spokenLanguages : ["English"],
      preferredJobCategories: Array.isArray(data.preferredJobCategories) && data.preferredJobCategories.length > 0 ? data.preferredJobCategories : ["General"],
      preferredEmploymentTypes: Array.isArray(data.preferredEmploymentTypes) && data.preferredEmploymentTypes.length > 0 ? data.preferredEmploymentTypes : ["Full-time"],
      preferredWorkTypes: Array.isArray(data.preferredWorkTypes) && data.preferredWorkTypes.length > 0 ? data.preferredWorkTypes : ["on-site"],
      howSoonReady: data.howSoonReady && data.howSoonReady.trim() ? data.howSoonReady : "More than 3 months",
      ...(data.preferredJobLocations && Array.isArray(data.preferredJobLocations) && data.preferredJobLocations.length > 0 && { preferredJobLocations: data.preferredJobLocations }),
      ...(data.expectedSalary && data.expectedSalary > 0 && { expectedSalary: data.expectedSalary }),
      resumeUrl: data.resume,
      ...(data.otp && data.otp.trim() && { otp: data.otp }) // Include OTP if provided
    };

    console.log('Normalized data to send:', normalizedData);

    // Send as JSON using fetch
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(normalizedData),
    });

    // Check if the response is ok
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.message || `HTTP error! status: ${response.status}`;
      throw { response: { status: response.status, data: { message: errorMessage } } } as any;
    }

    const responseData = await response.json();
    console.log('Application created successfully:', responseData);
    toast.success('Application submitted successfully');
    return responseData;
  } catch (error: any) {
    console.error('Failed to create application:', error.response?.data?.message || error.message);
    console.error('Full error response:', error.response?.data);

    if (error.response?.status === 400) {
      const errorMessage = error.response?.data?.message || 'Invalid application data. Please check the provided information.';
      toast.error(errorMessage);
    } else if (error.response?.status === 401) {
      toast.error('Authentication failed. Please log in again.');
    } else if (error.response?.status === 403) {
      toast.error('Access denied. You may not have permission to create applications.');
    } else if (error.response?.status === 409) {
      toast.error('This candidate has already been applied to this job.');
    } else if (error.response?.status === 422) {
      const errorMessage = error.response?.data?.message || 'Validation error. Please check the application data.';
      toast.error(errorMessage);
    } else {
      toast.error(error.response?.data?.message || 'Failed to create application. Please try again.');
    }
    throw error;
  }
};


export const createTalentPoolCandidateInternal = async (
  data: ICreateTallentPoolFormData,
): Promise<ICreateApplicationResponse> => {
  try {

  

    // Validate required fields according to backend schema
    const requiredFields = [
      'name', 'email', 'phone', 'fatherName', 'dateOfBirth', 
      'gender', 'highestQualification', 
    ];
    
    for (const field of requiredFields) {
      if (!data[field as keyof ICreateTallentPoolFormData]) {
        throw new Error(`${field} is a required field`);
      }
    }

    // Validate currentLocationDetails.city is required
    if (!data.currentLocationDetails?.city) {
      throw new Error('City is required in location details');
    }

    // Ensure all array fields are properly formatted
    const normalizedData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      fatherName: data.fatherName,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      ...(data.aadharNumber && data.aadharNumber.trim() && { aadharNumber: data.aadharNumber }),
      highestQualification: data.highestQualification,
      currentLocationDetails: data.currentLocationDetails,
      totalExperienceYears: data.totalExperienceYears,
      totalExperienceMonths: data.totalExperienceMonths,
      skills: Array.isArray(data.skills) && data.skills.length > 0 ? data.skills : ["General"],
      spokenLanguages: Array.isArray(data.spokenLanguages) && data.spokenLanguages.length > 0 ? data.spokenLanguages : ["English"],
      preferredJobCategories: Array.isArray(data.preferredJobCategories) && data.preferredJobCategories.length > 0 ? data.preferredJobCategories : ["General"],
      preferredEmploymentTypes: Array.isArray(data.preferredEmploymentTypes) && data.preferredEmploymentTypes.length > 0 ? data.preferredEmploymentTypes : ["Full-time"],
      preferredWorkTypes: Array.isArray(data.preferredWorkTypes) && data.preferredWorkTypes.length > 0 ? data.preferredWorkTypes : ["on-site"],
      resumeUrl:data.resume
      
      };

    console.log('Normalized data to send:', normalizedData);

    // Send as JSON instead of FormData
    const response = await axiosInstance.post('/talentPoolCandidates/createTalentPoolCandidateInternal', normalizedData, {
      headers: { 
        'Content-Type': 'application/json'
      },
    });

    console.log('Application created successfully:', response.data);
    toast.success('Application submitted successfully');
    return response.data;
  } catch (error: any) {
    console.error('Failed to create application:', error.response?.data?.message || error.message);
    console.error('Full error response:', error.response?.data);

    if (error.response?.status === 400) {
      const errorMessage = error.response?.data?.message || 'Invalid application data. Please check the provided information.';
      toast.error(errorMessage);
    } else if (error.response?.status === 401) {
      toast.error('Authentication failed. Please log in again.');
    } else if (error.response?.status === 403) {
      toast.error('Access denied. You may not have permission to create applications.');
    } else if (error.response?.status === 409) {
      toast.error('This candidate has already been applied to this job.');
    } else if (error.response?.status === 422) {
      const errorMessage = error.response?.data?.message || 'Validation error. Please check the application data.';
      toast.error(errorMessage);
    } else {
      toast.error(error.response?.data?.message || 'Failed to create application. Please try again.');
    }
    throw error;
  }
};





export const getInitialDataAPI = async (id: string | string[] | undefined) => {
  try {
    const idParam = Array.isArray(id) ? id[0] : id;
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL_2_0}/public/candidate/${idParam}`;
    console.log('URL:', url);
    const response = await axios.get(url);
    return response.data;
  } catch (error: any) {
    console.error('Failed to get initial data:', error.response?.data?.message || error.message);
    console.error('Full error response:', error.response?.data);
    throw error;
  }
};

export const submitAdditionalDetailsAPI = async (id: string | string[] | undefined, data: any) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL_2_0}/public/candidate/${id}`;
    const response = await axios.put(url, data);
    return response.data;
  } catch (error: any) {
    console.error('Failed to submit additional details:', error.response?.data?.message || error.message);
    console.error('Full error response:', error.response?.data);
    throw error;
  }
};

export const sendOTPAPI = async (id: string | string[] | undefined) => {
  try {
    const idParam = Array.isArray(id) ? id[0] : id;
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL_2_0}/public/candidate/${idParam}/send-otp`;
    console.log('Sending OTP - URL:', url);
    const response = await axios.post(url)
    return response.data;
  } catch (error: any) {
    console.error('Failed to send OTP:', error.response?.data?.message || error.message);
    console.error('Full error response:', error.response?.data);
    throw error;
  }
};

export const sendOTPAPIForJointTalentPool = async (id: string | string[] | undefined, phone: string) => {
  try {
    const idParam = Array.isArray(id) ? id[0] : id;
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL_2_0}/public/candidate/join-talent-pool/send-otp`;
    console.log('Sending OTP - URL:', url, 'Phone:', phone);
    const response = await axios.post(url, {
      phone: phone
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error: any) {
    console.error('Failed to send OTP:', error.response?.data?.message || error.message);
    console.error('Full error response:', error.response?.data);
    throw error;
  }
};

export const getCitiesByStateAPI = async (state: string) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL_2_0}/public/cities?state=${encodeURIComponent(state)}`;
    console.log('Fetching cities - URL:', url);
    const response = await axios.get(url);
    return response.data;
  } catch (error: any) {
    console.error('Failed to get cities:', error.response?.data?.message || error.message);
    console.error('Full error response:', error.response?.data);
    throw error;
  }
};