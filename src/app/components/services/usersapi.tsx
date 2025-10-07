import axios from "axios";
import axiosInstance from "./apiinterseptor"; // Corrected import path
import { toast } from "react-toastify"; // Make sure this import exists
import Cookies from "js-cookie"; // Add this import if not already present


// Update the interfaces to match the required format
interface IPersonalDetails {
  fullName: string;
  email: string;
  role: string;
  phone: string;
  wtspNum: string;
  gender: string;
  dob: string;
  applyFor: string;
  currBuildingNo: string;
  currStreet: string;
  currArea: string;
  currCity: string;
  currState: string;
  currPin: string;
  permBuildingNo: string;
  permStreet: string;
  permArea: string;
  permCity: string;
  permState: string;
  permPin: string;
  languages: string[];
}

interface IWorkExperience {
  CompanyName: string;
  ExperienceYears: string;
}

interface IQualification {
  highestQualification: string;
  workExperience: IWorkExperience[];
}

interface IAboutQuestion {
  question: string;
  answer: string;
}

interface IAbout {
  questions: IAboutQuestion[];
}

interface IFamilyMember {
  name: string;
  age: string;
  relationship: string;
  organization: string;
  dependentOnYou: string;
}

interface IIdentityProof {
  aadharFront: string;
  aadharBack: string;
  aadharNumber: string;
  panFront: string;
  panBack: string;
  panNumber: string;
  emergencyNumber: string;
  photo: string;
}

interface IReference {
  name: string;
  designation: string;
  organization: string;
  email: string;
  phone: string;
  connection: string;
}

interface IOnboardingData {
  updatedDateTime: string;
  personalDetails: IPersonalDetails;
  qualification: IQualification;
  about: IAbout;
  familyMembers: {
    [key: string]: IFamilyMember;
  };
  newIdentityProof: IIdentityProof;
  references: {
    [key: string]: IReference;
  };
}

// Update the createUserOnboarding function
export const createUserOnboarding = async (userId: string, onboardingData: IOnboardingData) => {
  try {
    // Add current timestamp if not provided
    const dataWithTimestamp = {
      ...onboardingData,
      updatedDateTime: onboardingData.updatedDateTime || new Date().toISOString()
    };
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL_2_0;
    const response = await fetch(`${backendUrl}/onboarding/user/create-onboarding`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify(dataWithTimestamp)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}: Failed to complete onboarding`);
    }

    const data = await response.json();

    if (response.status === 201) {
      toast.success("Onboarding completed successfully");
      return data;
    }

    throw new Error(data.message || 'Failed to complete onboarding');

  } catch (error: any) {
    console.error("Failed to create onboarding:", error.message);
    
    // Handle specific error cases (note: fetch doesn't throw on HTTP errors, so we handle above)
    if (error.message.includes('409')) {
      toast.error("Onboarding already exists for this user");
    } else if (error.message.includes('403')) {
      toast.error("Role mismatch. Cannot create onboarding");
    } else if (error.message.includes('404')) {
      toast.error("User not found");
    } else {
      toast.error(`Failed to create onboarding: ${error.message || 'Unknown error'}`);
    }
    
    throw error;
  }
};

// Generate content using Gemini API
export const generateGeminiContent = async (prompt: string) => {
    try {
        const response = await axiosInstance.post('/ai/gemini', { prompt });
        console.log("Gemini API response:", response.data);
        return response.data;
    } catch (error: any) {
        console.error("Failed to generate content:", error.response?.data?.message);
        toast.error(`Failed to generate content: ${error.response?.data?.message || 'Unknown error'}`);
        throw error;
    }
};


export const generateGeminiContentFromResume = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("resume", file);

    const response = await axiosInstance.post("/ai/gemini/resume", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Gemini API response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Failed to generate content:", error.response?.data?.message);
    toast.error(
      `Failed to generate content: ${
        error.response?.data?.message || "Unknown error"
      }`
    );
    throw error;
  }
};


/**
 * Interface for file upload response
 */
interface FileUploadResponse {
  success: boolean;
  fileUrl: string;
  message: string;
}

/**
 * Upload a file to the server
 * @param file - The file to upload (must be image, PDF, DOC, or DOCX)
 * @returns Promise with the upload response
 */
export const uploadFile = async (
  file: File, 
  folderPath?: string
): Promise<FileUploadResponse> => {
  try {
    // Validate file type
    const allowedTypes = [
      'image/jpeg',
      'image/png', 
      'image/gif',
      'image/webp',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (!allowedTypes.includes(file.type)) {
      throw new Error('Invalid file type. Only images, PDFs, and DOC/DOCX files are allowed.');
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      throw new Error('File size exceeds 10MB limit');
    }

    // Create form data
    const formData = new FormData();
    formData.append('file', file);
    
    // Add folder path if provided
    if (folderPath) {
      // Get current date in YYYY/MM/DD format
      const today = new Date();
      formData.append('folderPath', folderPath);
    }

    // Make the upload request
    const response = await axiosInstance.post('/uploads/file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('File uploaded successfully:', response.data);
    toast.success('File uploaded successfully');

    return response.data.data;

  } catch (error: any) {
    console.error('Failed to upload file:', error.response?.data?.message || error.message);
    toast.error(`Failed to upload file: ${error.response?.data?.message || error.message}`);
    throw error;
  }
};

