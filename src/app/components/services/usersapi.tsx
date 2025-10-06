import axios from "axios";
import axiosInstance from "./apiinterseptor"; // Corrected import path
import { toast } from "react-toastify"; // Make sure this import exists
import Cookies from "js-cookie"; // Add this import if not already present
export const getAllUsers = async (params: {
    page?: string;
    limit?: string;
    search?: string;
    role?: string;
    blockStatus?: boolean;
} = {}) => {
    try {
        const response = await axiosInstance.get(`/users?page=${params.page}&limit=${params.limit}&search=${params.search !== undefined ? params.search : ''}&role=${params.role}&blockStatus=${params.blockStatus}`,);
        console.log("Fetched all users:", response.data);
        return response.data;
    } catch (error: any) {
        console.error("Failed to fetch users:", error.response?.data?.message);
        toast.error(`Failed to fetch users: ${error.response?.data?.message || 'Unknown error'}`);
        throw error;
    }
};




// Change user password by admin or authorized roles
export const changeUserPassword = async (userId: string, newPassword: string, confirmPassword: string) => {
    try {
        const response = await axiosInstance.patch(`/users/${userId}/change-password`, { password: newPassword, passwordConfirm: confirmPassword, });
        console.log("Password changed successfully:", response.data);
        if (response.data.status === "success") {
            toast.success("Password changed successfully");
            return response.data;
        }
        throw new Error(response.data.message);
    } catch (error: any) {
        console.error("Failed to change password:", error.response?.data?.message);
        toast.error(`Failed to change password: ${error.response?.data?.message || 'Unknown error'}`);
        throw error;
    }
};

// Update user block status
export const updateUserBlockStatus = async (userId: string, isBlocked: boolean) => {
    try {
        const response = await axiosInstance.patch(`/users/${userId}/status`, { isBlocked });
        console.log("User block status updated:", response.data);
        toast.success("User block status updated successfully");
        return response.data;
    } catch (error: any) {
        console.error("Failed to update block status:", error.response?.data?.message);
        toast.error(`Failed to update block status: ${error.response?.data?.message || 'Unknown error'}`);
        throw error;
    }
};

// Update user details by admin
export const updateUserDetails = async (userId: string, userData: any) => {
    try {
        const response = await axiosInstance.patch(`/users/${userId}`, userData);
        console.log("User details updated:", response.data);
        toast.success("User details updated successfully");
        return response.data;
    } catch (error: any) {
        console.error("Failed to update user details:", error.response?.data?.message);
        toast.error(`Failed to update user details: ${error.response?.data?.message || 'Unknown error'}`);
        throw error;
    }
};

// Change user role by admin
export const changeUserRole = async (userId: string, payload: { newRole: string, newManagerUserId?: string, effectiveDate?: string }) => {
    try {
        const response = await axiosInstance.patch(`/users/${userId}/change-role`, payload);
        console.log("User role changed:", response.data);
        toast.success("User role changed successfully");
        return response.data;
    } catch (error: any) {
        console.error("Failed to change user role:", error.response?.data?.message);
        toast.error(`Failed to change user role: ${error.response?.data?.message || 'Unknown error'}`);
        throw error;
    }
};

// Get users grouped by role (ADMIN only)
export const getUsersGroupedByRole = async () => {
    try {
        const response = await axiosInstance.get('/users/grouped-by-role');
        console.log("Fetched users grouped by role:", response.data);
        return response.data;
    } catch (error: any) {
        console.error("Failed to fetch users grouped by role:", error.response?.data?.message);
        toast.error(`Failed to fetch users grouped by role: ${error.response?.data?.message || 'Unknown error'}`);
        throw error;
    }
};

// Get logged-in user's subordinates
export const getMySubordinates = async () => {
    try {
        const response = await axiosInstance.get('/users/my-subordinates');
        console.log("Fetched subordinates:", response.data);
        return response.data;
    } catch (error: any) {
        console.error("Failed to fetch subordinates:", error.response?.data?.message);
        toast.error(`Failed to fetch subordinates: ${error.response?.data?.message || 'Unknown error'}`);
        throw error;
    }
};

// Reassign user to a new manager
export const reassignUser = async (userId: string, reassignmentData: {
  newManagerUserId: string;
  effectiveDate?: string;
}) => {
  try {
    const response = await axiosInstance.patch(`/users/${userId}/reassign`, reassignmentData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get potential managers for a user
export const getPotentialManagers = async (userId: string) => {
    try {
        const response = await axiosInstance.get(`/users/${userId}/potential-managers`);
        console.log("Fetched potential managers:", response.data);
        return response.data;
    } catch (error: any) {
        console.error("Failed to fetch potential managers:", error.response?.data?.message);
        toast.error(`Failed to fetch potential managers: ${error.response?.data?.message || 'Unknown error'}`);
        throw error;
    }
};

// Register a new candidate
export const registerCandidate = async (
    candidate: {
        name: string;
        email: string;
        phone: string;
        password: string;
    },
    token?: string // Accept token as an argument
) => {
    try {
        const response = await axiosInstance.post(
            '/auth/portal/register',
            candidate,
            token
                ? { headers: { Authorization: `Bearer ${token}` } }
                : undefined
        );
        toast.success(response.data.message || "Candidate registered successfully.");
        return response.data;
    } catch (error: any) {
        console.error("Failed to register candidate:", error.response?.data?.message);
        toast.error(`Failed to register candidate: ${error.response?.data?.message || 'Unknown error'}`);
        throw error;
    }
};

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

    const response = await axiosInstance.post(
      `/onboarding/user/${userId}/create-onboarding`,
      dataWithTimestamp
    );

    if (response.status === 201) {
      toast.success("Onboarding completed successfully");
      return response.data;
    }

    throw new Error(response.data.message || 'Failed to complete onboarding');

  } catch (error: any) {
    console.error("Failed to create onboarding:", error.response?.data?.message);
    
    // Handle specific error cases
    if (error.response?.status === 409) {
      toast.error("Onboarding already exists for this user");
    } else if (error.response?.status === 403) {
      toast.error("Role mismatch. Cannot create onboarding");
    } else if (error.response?.status === 404) {
      toast.error("User not found");
    } else {
      toast.error(`Failed to create onboarding: ${error.response?.data?.message || 'Unknown error'}`);
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

// TPO Onboarding interfaces
interface IWorkDetails {
  preferredCommunicationMode: string;
  officeHours: string;
}

interface IReportingPerson {
  name: string;
  designation: string;
  mobile: string;
  email: string;
}

interface IPrincipalDirector {
  name: string;
  designation: string;
  mobile: string;
  email: string;
}

interface IContactInformation {
  officialEmail: string;
  alternateEmail: string;
  mobile: string;
  alternateMobile: string;
  whatsapp: string;
  linkedin: string;
}

interface ICollegeAddress {
  officeAddress: string;
  city: string;
  state: string;
  pincode: string;
}

interface ITPOOnboardingData {
  tpoId: string;
  fullName: string;
  designation: string;
  department: string;
  selectedColleges: string[];
  collegeCode: string;
  workDetails: IWorkDetails;
  reportingPerson: IReportingPerson;
  principalDirector: IPrincipalDirector;
  contactInformation: IContactInformation;
  collegeAddress: ICollegeAddress;
}

// Create TPO onboarding
export const createTPOOnboarding = async (onboardingData: ITPOOnboardingData) => {
  try {
    const response = await axiosInstance.post('/onboarding/tpo/onboard', onboardingData);
    
    console.log("TPO onboarding created:", response.data);
    toast.success("TPO onboarding completed successfully");
    return response.data;
    
  } catch (error: any) {
    console.error("Failed to create TPO onboarding:", error.response?.data?.message);
    
    // Handle specific error cases
    if (error.response?.status === 409) {
      toast.error("TPO onboarding already exists");
    } else if (error.response?.status === 400) {
      toast.error("Invalid onboarding data provided");
    } else if (error.response?.status === 404) {
      toast.error("TPO not found");
    } else {
      toast.error(`Failed to create TPO onboarding: ${error.response?.data?.message || 'Unknown error'}`);
    }
    
    throw error;
  }
};
