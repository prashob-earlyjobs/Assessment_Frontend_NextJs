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
  try {
    const backendUrl =  process.env.NEXT_PUBLIC_BACKEND_URL_2_0;
    const response = await fetch(`${backendUrl}/publicCom/company/onboard`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(onboardingData),
    });

    // Parse the response body
    const data = await response.json();

    if (!response.ok) {
      // Handle specific error status codes
      if (response.status === 409) {
        toast.error("TPO onboarding already exists");
      } else if (response.status === 400) {
        toast.error("Invalid onboarding data provided");
      } else if (response.status === 404) {
        toast.error("TPO not found");
      } else {
        toast.error(`Failed to create TPO onboarding: ${data.message || 'Unknown error'}`);
      }
      throw new Error(data.message || 'Request failed');
    }

    console.log("TPO onboarding created:", data);
    toast.success("TPO onboarding completed successfully");
    return data;
  } catch (error: any) {
    console.error("Failed to create TPO onboarding:", error.message);
    toast.error(`Failed to create TPO onboarding: ${error.message}`);
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
