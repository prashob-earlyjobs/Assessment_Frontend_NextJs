import axios from "axios";
import axiosInstance from "./apiinterseptor"; // Corrected import path
import { toast } from "react-toastify"; // Make sure this import exists
import Cookies from "js-cookie"; // Add this import if not already present

interface FileUploadResponse {
  success: boolean;
  fileUrl: string;
  message: string;
}



export const createCompanyOnboarding = async (onboardingData: any) => {
  // Extract _silentSave flag before sending to API (it's only for internal use)
  const isSilentSave = onboardingData._silentSave || false;
  const { _silentSave, ...dataToSend } = onboardingData;
  
  try {
    const backendUrl =  process.env.NEXT_PUBLIC_BACKEND_URL_2_0;
    
    console.log("API Call - createCompanyOnboarding:", {
      url: `${backendUrl}/publicCom/company/onboard`,
      method: 'POST',
      data: dataToSend,
      silentSave: isSilentSave,
    });
    
    const response = await fetch(`${backendUrl}/publicCom/company/onboard`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    });

    // Parse the response body
    const data = await response.json();

    console.log("API Response - createCompanyOnboarding:", {
      status: response.status,
      ok: response.ok,
      data: data,
    });

    if (!response.ok) {
      // Log full error details for debugging
      console.error("❌ API Error Response:", {
        status: response.status,
        statusText: response.statusText,
        data: data,
        message: data.message,
        errors: data.errors,
      });
      
      // Handle specific error status codes (only show toast if not silent save)
      if (!isSilentSave) {
        if (response.status === 409) {
          toast.error("User onboarding already exists");
        } else if (response.status === 400) {
          // Show more detailed error message if available
          const errorMsg = data.message || data.error || "Invalid onboarding data provided";
          toast.error(errorMsg);
        } else if (response.status === 404) {
          toast.error("User not found");
        } else {
          toast.error(`Failed to create TPO onboarding: ${data.message || 'Unknown error'}`);
        }
      }
      throw new Error(data.message || data.error || 'Request failed');
    }

    console.log("✅ TPO onboarding created successfully:", data);
    // Only show success toast if not a silent save
    if (!isSilentSave) {
      toast.success("TPO onboarding completed successfully");
    }
    return data;
  } catch (error: any) {
    console.error("❌ Failed to create TPO onboarding:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    // Only show error toast if not silent save
    if (!isSilentSave) {
      toast.error(`Failed to create TPO onboarding: ${error.message}`);
    }
    throw error;
  }
};
export const updateCompanyOnboarding = async (id: string, onboardingData: any) => {
  // Extract _silentSave flag before sending to API (it's only for internal use)
  const isSilentSave = onboardingData._silentSave || false;
  const { _silentSave, ...dataToSend } = onboardingData;
  
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL_2_0;
    
    console.log("API Call - updateCompanyOnboarding:", {
      url: `${backendUrl}/publicCom/company/onboard/${id}`,
      method: 'PUT',
      data: dataToSend,
      silentSave: isSilentSave,
    });
    
    const response = await fetch(`${backendUrl}/publicCom/company/onboard/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    });

    // Parse the response body
    const data = await response.json();

    console.log("API Response - updateCompanyOnboarding:", {
      status: response.status,
      ok: response.ok,
      data: data,
    });

    if (!response.ok) {
      // Handle specific error status codes (only show toast if not silent save)
      if (!isSilentSave) {
        if (response.status === 404) {
          toast.error("Company onboarding not found");
        } else if (response.status === 400) {
          toast.error("Invalid onboarding data provided");
        } else {
          toast.error(`Failed to update company onboarding: ${data.message || 'Unknown error'}`);
        }
      }
      throw new Error(data.message || 'Request failed');
    }

    console.log("✅ Company onboarding updated successfully:", data);
    // Only show success toast if not a silent save
    if (!isSilentSave) {
      toast.success("Company onboarding updated successfully");
    }
    return data;
  } catch (error: any) {
    console.error("❌ Failed to update company onboarding:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    // Only show error toast if not silent save
    if (!isSilentSave) {
      toast.error(`Failed to update company onboarding: ${error.message}`);
    }
    throw error;
  }
};

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
      const today = new Date();
      formData.append('folderPath', folderPath);
    }

    // Make the upload request
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL_2_0;
    const response = await fetch(`${backendUrl}/publicCom/file`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}: Failed to upload file`);
    }

    const data = await response.json();
    console.log('File uploaded successfully:', data);
    toast.success('File uploaded successfully');

    return data.data;

  } catch (error: any) {
    console.error('Failed to upload file:', error.message);
    toast.error(`Failed to upload file: ${error.message || 'Unknown error'}`);
    throw error;
  }
};
