import axiosInstance from "./apiinterseptor"; // Assuming same interceptor setup
import { toast } from "react-toastify";
import axios, { AxiosResponse } from 'axios';
import { ICreateTallentPoolFormData } from "@/app/talentpoolform/public/[id]/page";

// Interface for location details
export interface ILocationDetails {
  street: string;
  area: string;
  city: string; // Required field
  pincode: string;
  fullAddress: string;
}

// Interface for user details
interface IUserDetails {
  id: string;
  username: string;
  email: string;
}

// Interface for candidate data
interface ICandidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  highestQualification: string;
  totalExperienceYears: number;
  totalExperienceMonths: number;
  skills: string[];
  currentLocationDetails: ILocationDetails;
  profileSource: string;
  createdAt: string;
  candidateProfileStrength: number;
  resumeUrl?: string;
}

// Interface for job details
interface IJob {
  id: string;
  title: string;
  companyName: string;
}

// Interface for application status
interface ICurrentStatusInfo {
  status: string;
  timestamp: Date;
  updatedBy: IUserDetails | null;
}

// Interface for status history
interface IStatusHistory {
  status: string;
  changedAt: Date;
  comments: string;
  changedBy: IUserDetails | null;
}

// Interface for payout details
interface IPayoutDetails {
  isSourcerCommissionClaimed?: boolean;
  claimedByUserId?: string;
  claimDate?: Date;
  [key: string]: any; // For additional payout fields
}

// Interface for application details
interface IApplicationDetails {
  id: string;
  currentStatus: ICurrentStatusInfo;
  candidate: ICandidate;
  job: IJob;
  sourcedBy: IUserDetails | null;
  appliedOn: Date;
  interviewId?: string;
  verificationStatus?: string;
  payoutDetails?: IPayoutDetails;
  statusHistory: IStatusHistory[];
}
interface ICandidateDetails {
  id: string;
  name: string;
  email: string;
  phone: string;
  availabilityStatus: string;
  highestQualification: string;
  totalExperienceYears: number;
  skills: string[];
  currentLocation: string;
  sourcedBy: {
      id: string;
      username: string;
      email: string;
  },
  profileCreatedAt: string
}

// Interface for application history item (used in getApplicationsByCandidateId)
interface IApplicationHistoryItem {
  applicationId: string;
  job: IJob;
  currentStatus: ICurrentStatusInfo;
  appliedOn: Date;
  sourcedBy: IUserDetails | null;
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

// Interface for get applications response
interface IGetApplicationsResponse {
  status: string;
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
  results: number;
  data: {
    applications: IApplicationDetails[];
  };
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

// Interface for update application status response
interface IUpdateApplicationStatusResponse {
  status: string;
  message: string;
  data: {
    applicationId: string;
    newStatus: string;
  };
}

// Interface for update verification status response
interface IUpdateVerificationStatusResponse {
  status: string;
  message: string;
  data: {
    applicationId: string;
    verificationStatus: string;
  };
}

// Interface for update tenure status response
interface IUpdateTenureStatusResponse {
  status: string;
  message: string;
  data: {
    applicationId: string;
    newStatus: string;
  };
}

// Enum for tenure eligibility status
export enum TenureEligibilityStatus {
  ELIGIBLE = 'Eligible',
  NOT_ELIGIBLE = 'Not Eligible',
  UNKNOWN = 'Unknown',
}

// Interface for update tenure eligibility status response
interface IUpdateTenureEligibilityStatusResponse {
  message: string;
}

// Interface for get application by ID response
interface IGetApplicationByIdResponse {
  status: string;
  data: {
    application: IApplicationDetails;
  };
}

// Interface for edit application response
interface IEditApplicationResponse {
  status: string;
  message: string;
  data: {
    application: IApplicationDetails;
  };
}

// Interface for payout summary
interface IPayoutSummary {
  [key: string]: any; // Adjust based on actual summary structure
}

// Interface for get payout applications response
interface IGetPayoutApplicationsResponse {
  status: string;
  totalPages: number;
  totalResults: number;
   page?: number;
  limit?: number;
  _t?: number;
  search?: string;
  jobId?: string;
  recruiterId?: string;
  joiningDateFrom?: string;
  joiningDateTo?: string;
  results: number;
  summary: IPayoutSummary;
  data: {
    applications: IApplicationDetails[];
  };
}



// Interface for update payout details response
interface IUpdatePayoutDetailsResponse {
  status: string;
  message: string;
  data: {
    application: IApplicationDetails;
  };
}

// Interface for update claim status response
interface IUpdateClaimStatusResponse {
  status: string;
  message: string;
  data: {
    applicationId: string;
    payoutDetails: IPayoutDetails;
  };
}

// Interface for get joined applications response
interface IGetJoinedApplicationsResponse {
  status: string;
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
  results: number;
  summary: IPayoutSummary;
  data: {
    applications: IApplicationDetails[];
  };
}

// Interface for get applications by candidate ID response
interface IGetApplicationsByCandidateResponse {
  status: string;
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
  results: number;
  data: {
    applications: IApplicationHistoryItem[];
  };
}

// Get all applications
export const getAllApplications = async (params: {
  page?: number;
  limit?: number;
  search?: string;
  jobId?: string;
  applicationStatus?: string;
  recruiterId?: string;
  interviewDateFrom?: string;
  interviewDateTo?: string;
  _t?: number; // For cache busting
} = {}): Promise<IGetApplicationsResponse> => {
  try {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.search) queryParams.append('search', params.search);
    if (params.jobId) queryParams.append('jobId', params.jobId);
    if (params.applicationStatus) queryParams.append('applicationStatus', params.applicationStatus);
    if (params.recruiterId) queryParams.append('recruiterId', params.recruiterId);
    if (params.interviewDateFrom) queryParams.append('interviewDateFrom', params.interviewDateFrom);
    if (params.interviewDateTo) queryParams.append('interviewDateTo', params.interviewDateTo);
    if (params._t) queryParams.append('_t', params._t.toString());

    const apiUrl = `/applications?${queryParams.toString()}`;
    const fullUrl = `${axiosInstance.defaults.baseURL}${apiUrl}`;

    console.log('Fetching applications');
    console.log('Request params:', params);
    console.log('Query params string:', queryParams.toString());
    console.log('API URL:', fullUrl);

    const response = await axiosInstance.get(apiUrl);

    console.log('Applications fetched successfully:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Failed to fetch applications:', error.response?.data?.message || error.message);
    console.error('Full error response:', error.response?.data);

    if (error.response?.status === 401) {
      toast.error('Authentication failed. Please log in again.');
    } else if (error.response?.status === 403) {
      toast.error('Access denied. You may not have permission to view applications.');
    } else if (error.response?.status === 404) {
      toast.error('No applications found or endpoint not available.');
    } else {
      toast.error(error.response?.data?.message || 'Failed to fetch applications. Please try again.');
    }
    throw error;
  }
};

export interface CandidateAvailabilityStatus {
  type: 'Available' | 'Placed' | 'Do Not Contact';
}
export interface IGetCandidatesQuery {
  page?: Number;
  limit?: Number;
  search?: string; // For name, email, phone
  skills?: string; // Comma-separated string, e.g., "React,Node.js"
  minExperience?: string;
  location?: string; // Search by city
  sourcedBy?: string; // Filter by the ID of the recruiter who created the profile
  availabilityStatus?: CandidateAvailabilityStatus;
  status: string;
  
  totalPages: number;
  totalResults: number;
  results: number;
   data: {
    candidates: ICandidateDetails[];
  };
  
}

export const getAllCandidates = async (params: {
  page?: Number;
  limit?: Number;
  search?: string; // For name, email, phone
  skills?: string; // Comma-separated string, e.g., "React,Node.js"
  minExperience?: string;
  location?: string; // Search by city
  sourcedBy?: string; // Filter by t  he ID of the recruiter who created the profile
  availabilityStatus?: CandidateAvailabilityStatus;
 
} = {}): Promise<IGetCandidatesQuery> => {
  try {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.search) queryParams.append('search', params.search);
    if (params.skills) queryParams.append('skills', params.skills);
    if (params.minExperience) queryParams.append('minExperience', params.minExperience);
    if (params.location) queryParams.append('location', params.location);
    if (params.sourcedBy) queryParams.append('sourcedBy', params.sourcedBy);
    if (params.availabilityStatus) queryParams.append('availabilityStatus', JSON.stringify(params.availabilityStatus));

    const apiUrl = `/candidates?${queryParams.toString()}`;
    const fullUrl = `${axiosInstance.defaults.baseURL}${apiUrl}`;

    console.log('Fetching applications');
    console.log('API URL:', fullUrl);
    console.log('Request params:', params);

    const response = await axiosInstance.get(apiUrl);

    console.log('Applications fetched successfully:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Failed to fetch applications:', error.response?.data?.message || error.message);
    console.error('Full error response:', error.response?.data);

    if (error.response?.status === 401) {
      toast.error('Authentication failed. Please log in again.');
    } else if (error.response?.status === 403) {
      toast.error('Access denied. You may not have permission to view applications.');
    } else if (error.response?.status === 404) {
      toast.error('No applications found or endpoint not available.');
    } else {
      toast.error(error.response?.data?.message || 'Failed to fetch applications. Please try again.');
    }
    throw error;
  }
};

// Create a new application
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

export const gettalentPoolCandidates = async (params: {
  page?: Number;
  limit?: Number;
  search?: string; // For name, email, phone
  skills?: string; // Comma-separated string, e.g., "React,Node.js"
  minExperience?: string;
  location?: string; // Search by city
  sourcedBy?: string; // Filter by t  he ID of the recruiter who created the profile
  availabilityStatus?: CandidateAvailabilityStatus;
 
} = {}):Promise<any> => {
  try {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.search) queryParams.append('search', params.search);
    if (params.skills) queryParams.append('skills', params.skills);
    if (params.minExperience) queryParams.append('minExperience', params.minExperience);
    if (params.location) queryParams.append('location', params.location);
    if (params.sourcedBy) queryParams.append('sourcedBy', params.sourcedBy);
    if (params.availabilityStatus) queryParams.append('availabilityStatus', JSON.stringify(params.availabilityStatus));

    const apiUrl = `/talentPoolCandidates?${queryParams.toString()}`;
    

    const response = await axiosInstance.get(apiUrl);

    console.log('Applications fetched successfully:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Failed to fetch applications:', error.response?.data?.message || error.message);
    console.error('Full error response:', error.response?.data);

    if (error.response?.status === 401) {
      toast.error('Authentication failed. Please log in again.');
    } else if (error.response?.status === 403) {
      toast.error('Access denied. You may not have permission to view applications.');
    } else if (error.response?.status === 404) {
      toast.error('No applications found or endpoint not available.');
    } else {
      toast.error(error.response?.data?.message || 'Failed to fetch applications. Please try again.');
    }
    throw error;
  }
};

export const getTalentPoolCandidateById = async (id: string): Promise<any> => {
  try {
    const response = await axiosInstance.get(`/talentPoolCandidates/${id}`);
    return response.data;
  } 
  catch (error: any) {
    console.error('Failed to fetch applications:', error.response?.data?.message || error.message);
    console.error('Full error response:', error.response?.data);

    if (error.response?.status === 401) {
      toast.error('Authentication failed. Please log in again.');
    } else if (error.response?.status === 403) {
      toast.error('Access denied. You may not have permission to view applications.');
    } else if (error.response?.status === 404) {
      // Handle 404 error
    }
    throw error;
  }
};

export const createTalentPoolcandidatePublic = async (
  id: string,
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
    const apiEndpoint = `${backendUrl}/talentPoolCandidates/68c42a766d9630692f685496/createTalentPoolCandidate`;

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
      resumeUrl: data.resume
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




// Update application status
export const updateApplicationStatus = async (
  applicationId: string,
  data: {
    newStatus: string;
    comments?: string;
    offeredDate?: string;
    joiningDate?: string;
  }
): Promise<IUpdateApplicationStatusResponse> => {
  try {
    // Simple string validation for applicationId (assuming MongoDB ObjectId format: 24 hex characters)
    if (!/^[0-9a-fA-F]{24}$/.test(applicationId)) {
      throw new Error('Invalid Application ID format.');
    }

    const apiUrl = `/applications/${applicationId}/status`;
    const fullUrl = `${axiosInstance.defaults.baseURL}${apiUrl}`;

    console.log('Updating application status');
    console.log('API URL:', fullUrl);
    console.log('Request Data:', data);

    const response = await axiosInstance.patch(apiUrl, data);

    console.log('Application status updated successfully:', response.data);
    toast.success('Application status updated successfully');
    return response.data;
  } catch (error: any) {
    console.error('Failed to update application status:', error.response?.data?.message || error.message);
    console.error('Full error response:', error.response?.data);

    if (error.response?.status === 400) {
      toast.error('Invalid status update data.');
    } else if (error.response?.status === 401) {
      toast.error('Authentication failed. Please log in again.');
    } else if (error.response?.status === 403) {
      toast.error('Access denied. You may not have permission to update status.');
    } else if (error.response?.status === 404) {
      toast.error('Application not found.');
    } else {
      toast.error(error.response?.data?.message || 'Failed to update application status.');
    }
    throw error;
  }
};

// Update verification status
export const updateVerificationStatus = async (
  applicationId: string,
  data: {
    verificationStatus: string;
    comments?: string;
  }
): Promise<IUpdateVerificationStatusResponse> => {
  try {
    // Simple string validation for applicationId (assuming MongoDB ObjectId format: 24 hex characters)
    if (!/^[0-9a-fA-F]{24}$/.test(applicationId)) {
      throw new Error('Invalid Application ID format.');
    }

    const apiUrl = `/applications/${applicationId}/verification-status`;
    const fullUrl = `${axiosInstance.defaults.baseURL}${apiUrl}`;

    console.log('Updating verification status');
    console.log('API URL:', fullUrl);
    console.log('Request Data:', data);

    const response = await axiosInstance.patch(apiUrl, data);

    console.log('Verification status updated successfully:', response.data);
    toast.success('Verification status updated successfully');
    return response.data;
  } catch (error: any) {
    console.error('Failed to update verification status:', error.response?.data?.message || error.message);
    console.error('Full error response:', error.response?.data);

    if (error.response?.status === 400) {
      toast.error('Invalid verification status data.');
    } else if (error.response?.status === 401) {
      toast.error('Authentication failed. Please log in again.');
    } else if (error.response?.status === 403) {
      toast.error('Access denied. You may not have permission to update verification status.');
    } else if (error.response?.status === 404) {
      toast.error('Application not found.');
    } else {
      toast.error(error.response?.data?.message || 'Failed to update verification status.');
    }
    throw error;
  }
};

// Update tenure status
export const updateTenureStatus = async (
  applicationId: string,
  data: {
    isTenureApproved: boolean;
    comments?: string;
    payoutDetails?: IPayoutDetails;
  }
): Promise<IUpdateTenureStatusResponse> => {
  try {
    // Simple string validation for applicationId (assuming MongoDB ObjectId format: 24 hex characters)
    if (!/^[0-9a-fA-F]{24}$/.test(applicationId)) {
      throw new Error('Invalid Application ID format.');
    }

    const apiUrl = `/applications/${applicationId}/tenure-status`;
    const fullUrl = `${axiosInstance.defaults.baseURL}${apiUrl}`;

    console.log('Updating tenure status');
    console.log('API URL:', fullUrl);
    console.log('Request Data:', data);

    const response = await axiosInstance.patch(apiUrl, data);

    console.log('Tenure status updated successfully:', response.data);
    toast.success('Tenure status updated successfully');
    return response.data;
  } catch (error: any) {
    console.error('Failed to update tenure status:', error.response?.data?.message || error.message);
    console.error('Full error response:', error.response?.data);

    if (error.response?.status === 400) {
      toast.error('Invalid tenure status data.');
    } else if (error.response?.status === 401) {
      toast.error('Authentication failed. Please log in again.');
    } else if (error.response?.status === 403) {
      toast.error('Access denied. You may not have permission to update tenure status.');
    } else if (error.response?.status === 404) {
      toast.error('Application not found.');
    } else {
      toast.error(error.response?.data?.message || 'Failed to update tenure status.');
    }
    throw error;
  }
};

// Update tenure eligibility status
export const updateTenureEligibilityStatus = async (
  applicationId: string,
  tenureEligibilityStatus: TenureEligibilityStatus
): Promise<IUpdateTenureEligibilityStatusResponse> => {
  try {
    // Simple string validation for applicationId (assuming MongoDB ObjectId format: 24 hex characters)
    if (!/^[0-9a-fA-F]{24}$/.test(applicationId)) {
      throw new Error('Invalid Application ID format.');
    }

    // Validate tenure eligibility status
    if (!Object.values(TenureEligibilityStatus).includes(tenureEligibilityStatus)) {
      throw new Error('Invalid tenure eligibility status value.');
    }

    const apiUrl = `/applications/${applicationId}/tenure-eligibility-status`;
    const fullUrl = `${axiosInstance.defaults.baseURL}${apiUrl}`;

    console.log('Updating tenure eligibility status');
    console.log('API URL:', fullUrl);
    console.log('Request Data:', { tenureEligibilityStatus });

    const response = await axiosInstance.patch(apiUrl, { tenureEligibilityStatus });

    console.log('Tenure eligibility status updated successfully:', response.data);
    toast.success('Tenure eligibility status updated successfully');
    return response.data;
  } catch (error: any) {
    console.error('Failed to update tenure eligibility status:', error.response?.data?.message || error.message);
    console.error('Full error response:', error.response?.data);

    if (error.response?.status === 400) {
      const errorMessage = error.response?.data?.message;
      if (errorMessage?.includes('remaining')) {
        toast.error(`Tenure period not complete. ${errorMessage}`);
      } else if (errorMessage?.includes('Tenure duration is not defined')) {
        toast.error('Tenure duration is not defined for this job.');
      } else if (errorMessage?.includes('no joining date')) {
        toast.error('Candidate has no joining date. Cannot determine tenure.');
      } else {
        toast.error('Invalid tenure eligibility status data.');
      }
    } else if (error.response?.status === 401) {
      toast.error('Authentication failed. Please log in again.');
    } else if (error.response?.status === 403) {
      toast.error('Access denied. You may not have permission to update tenure eligibility status.');
    } else if (error.response?.status === 404) {
      toast.error('Application not found.');
    } else {
      toast.error(error.response?.data?.message || 'Failed to update tenure eligibility status.');
    }
    throw error;
  }
};

// Get application by ID
export const getApplicationById = async (applicationId: string): Promise<IGetApplicationByIdResponse> => {
  try {
    // Simple string validation for applicationId (assuming MongoDB ObjectId format: 24 hex characters)
    if (!/^[0-9a-fA-F]{24}$/.test(applicationId)) {
      throw new Error('Invalid Application ID format.');
    }

    const apiUrl = `/applications/${applicationId}`;
    const fullUrl = `${axiosInstance.defaults.baseURL}${apiUrl}`;

    console.log('Fetching application by ID');
    console.log('API URL:', fullUrl);

    const response = await axiosInstance.get(apiUrl);

    console.log('Application fetched successfully:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Failed to fetch application:', error.response?.data?.message || error.message);
    console.error('Full error response:', error.response?.data);

    if (error.response?.status === 401) {
      toast.error('Authentication failed. Please log in again.');
    } else if (error.response?.status === 403) {
      toast.error('Access denied. You may not have permission to view this application.');
    } else if (error.response?.status === 404) {
      toast.error('Application not found.');
    } else {
      toast.error(error.response?.data?.message || 'Failed to fetch application.');
    }
    throw error;
  }
};

// Edit application (ADMIN only)
export const editApplication = async (
  applicationId: string,
  data: {
    jobId: string;
    jobType: string;
    comments: string;
  }
): Promise<IEditApplicationResponse> => {
  try {
    // Simple string validation for applicationId (assuming MongoDB ObjectId format: 24 hex characters)
    if (!/^[0-9a-fA-F]{24}$/.test(applicationId)) {
      throw new Error('Invalid Application ID format.');
    }

    const apiUrl = `/applications/${applicationId}`;
    const fullUrl = `${axiosInstance.defaults.baseURL}${apiUrl}`;

    console.log('Editing application');
    console.log('API URL:', fullUrl);
    console.log('Request Data:', data);

    const response = await axiosInstance.patch(apiUrl, data);

    console.log('Application edited successfully:', response.data);
    toast.success('Application edited successfully');
    return response.data;
  } catch (error: any) {
    console.error('Failed to edit application:', error.response?.data?.message || error.message);
    console.error('Full error response:', error.response?.data);

    if (error.response?.status === 400) {
      toast.error('Invalid application data.');
    } else if (error.response?.status === 401) {
      toast.error('Authentication failed. Please log in again.');
    } else if (error.response?.status === 403) {
      toast.error('Access denied. Admin permission required.');
    } else if (error.response?.status === 404) {
      toast.error('Application not found.');
    } else {
      toast.error(error.response?.data?.message || 'Failed to edit application.');
    }
    throw error;
  }
};

// Get payout applications (ADMIN only)
export const getPayoutApplicationsList = async (params: {
  page?: number;
  limit?: number;
  _t?: number; // For cache busting
    search?: string;
    ledById?: string;
  jobId?: string;
  recruiterId?: string;
  joiningDateFrom?: string;
  joiningDateTo?: string;
    claimStatus?: string; 
} = {}): Promise<IGetPayoutApplicationsResponse> => {
  try {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params._t) queryParams.append('_t', params._t.toString());
    if (params.claimStatus) queryParams.append('claimStatus', params.claimStatus);
    if (params.search) queryParams.append('search', params.search);
    if (params.ledById) queryParams.append('ledById', params.ledById);
    if (params.jobId) queryParams.append('jobId', params.jobId);
    if (params.recruiterId) queryParams.append('recruiterId', params.recruiterId);
    if (params.joiningDateFrom) queryParams.append('joiningDateFrom', params.joiningDateFrom);
    if (params.joiningDateTo) queryParams.append('joiningDateTo', params.joiningDateTo);

    const apiUrl = `/applications/payouts/get?${queryParams.toString()}`;
    const fullUrl = `${axiosInstance.defaults.baseURL}${apiUrl}`;

    console.log('Fetching payout applications');
    console.log('API URL:', fullUrl);
    console.log('Request params:', params);

    const response = await axiosInstance.get(apiUrl);

    console.log('Payout applications fetched successfully:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Failed to fetch payout applications:', error.response?.data?.message || error.message);
    console.error('Full error response:', error.response?.data);

    if (error.response?.status === 401) {
      toast.error('Authentication failed. Please log in again.');
    } else if (error.response?.status === 403) {
      toast.error('Access denied. Admin permission required.');
    } else if (error.response?.status === 404) {
      toast.error('No payout applications found.');
    } else {
      toast.error(error.response?.data?.message || 'Failed to fetch payout applications.');
    }
    throw error;
  }
};
interface CandidateApplication {
  applicationId: string
  job: {
    id: string
    title: string
    companyName: string
  }
  appliedOn: string
  currentStatus: {
    status: string
    timestamp: string
    updatedBy: {
      id: string
      username: string
      email: string
    }
  }
  sourcedBy: {
    id: string
    username: string
    email: string
  }
}
interface ICandidateApplications{
  candidateId?: string;
  page?: number;
  limit?: number;
  data: {
    
    applications: CandidateApplication[]
  }
  totalPages: number
  totalResults: number

}

export const getCandidateApplications = async (params: {
  candidateId?: string;
  page?: number;
  limit?: number;
} = {}): Promise<ICandidateApplications> => {
  try {
    const queryParams = new URLSearchParams();

    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());

    const apiUrl = `candidates/${params.candidateId}/applications?${queryParams.toString()}`;
    const response = await axiosInstance.get(apiUrl);

    return response.data;
  } catch (error: any) {

    if (error.response?.status === 401) {
      toast.error('Authentication failed. Please log in again.');
    } else if (error.response?.status === 403) {
      toast.error('Access denied. Admin permission required.');
    } else if (error.response?.status === 404) {
      toast.error('No payout applications found.');
    } else {
      toast.error(error.response?.data?.message || 'Failed to fetch payout applications.');
    }
    throw error;
  }
};

interface IUpdateStatus {
  candidateId?: string;
  newStatus?: string;
  comments?: string;
}

export const MarkCandidateStatus = async (
  candidateId: string,
  newStatus: string,
  comments?: string
): Promise<IUpdateStatus> => {
  try {
    const apiUrl = `candidates/${candidateId}/availability`;
    const response = await axiosInstance.patch(apiUrl, {
      newStatus,
      comments,
    });

    return response.data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      toast.error('Authentication failed. Please log in again.');
    } else if (error.response?.status === 403) {
      toast.error('Access denied. Admin permission required.');
    } else if (error.response?.status === 404) {
      toast.error('No payout applications found.');
    } else {
      toast.error(error.response?.data?.message || 'Failed to update candidate status.');
    }
    throw error;
  }
};


// Update payout details (ADMIN only)
export const updatePayoutDetails = async (
  applicationId: string,
  data: IPayoutDetails & { comments: string }
): Promise<IUpdatePayoutDetailsResponse> => {
  try {
    // Simple string validation for applicationId (assuming MongoDB ObjectId format: 24 hex characters)
    if (!/^[0-9a-fA-F]{24}$/.test(applicationId)) {
      throw new Error('Invalid Application ID format.');
    }

    const apiUrl = `/applications/${applicationId}/payout-details`;
    const fullUrl = `${axiosInstance.defaults.baseURL}${apiUrl}`;

    console.log('Updating payout details');
    console.log('API URL:', fullUrl);
    console.log('Request Data:', data);

    const response = await axiosInstance.patch(apiUrl, data);

    console.log('Payout details updated successfully:', response.data);
    toast.success('Payout details updated successfully');
    return response.data;
  } catch (error: any) {
    console.error('Failed to update payout details:', error.response?.data?.message || error.message);
    console.error('Full error response:', error.response?.data);

    if (error.response?.status === 400) {
      toast.error('Invalid payout details data.');
    } else if (error.response?.status === 401) {
      toast.error('Authentication failed. Please log in again.');
    } else if (error.response?.status === 403) {
      toast.error('Access denied. Admin permission required.');
    } else if (error.response?.status === 404) {
      toast.error('Application not found.');
    } else {
      toast.error(error.response?.data?.message || 'Failed to update payout details.');
    }
    throw error;
  }
};

// Update claim status (ADMIN only)
export const updateClaimStatus = async (
  applicationId: string,
  data: {
    isClaimed: boolean;
    comments: string;
  }
): Promise<IUpdateClaimStatusResponse> => {
  try {
    // Simple string validation for applicationId (assuming MongoDB ObjectId format: 24 hex characters)
    if (!/^[0-9a-fA-F]{24}$/.test(applicationId)) {
      throw new Error('Invalid Application ID format.');
    }

    const apiUrl = `/applications/${applicationId}/claim-status`;
    const fullUrl = `${axiosInstance.defaults.baseURL}${apiUrl}`;

    console.log('Updating claim status');
    console.log('API URL:', fullUrl);
    console.log('Request Data:', data);

    const response = await axiosInstance.patch(apiUrl, data);

    console.log('Claim status updated successfully:', response.data);
    toast.success(`Commission status updated to ${data.isClaimed ? 'claimed' : 'unclaimed'}`);
    return response.data;
  } catch (error: any) {
    console.error('Failed to update claim status:', error.response?.data?.message || error.message);
    console.error('Full error response:', error.response?.data);

    if (error.response?.status === 400) {
      toast.error('Invalid claim status data.');
    } else if (error.response?.status === 401) {
      toast.error('Authentication failed. Please log in again.');
    } else if (error.response?.status === 403) {
      toast.error('Access denied. Admin permission required.');
    } else if (error.response?.status === 404) {
      toast.error('Application not found.');
    } else {
      toast.error(error.response?.data?.message || 'Failed to update claim status.');
    }
    throw error;
  }
};

// Get joined applications
// In your candidateapi.ts service file
export const getJoinedApplications = async (params: {
  page: number;
  limit: number;
  search?: string;
  jobId?: string;
  recruiterId?: string;
  verificationStatus?: string;
  tenureStatus?: string;
  tenureEligibilityStatus?: string;
  claimStatus?: string;
  joiningDateFrom?: string;
  joiningDateTo?: string;
  approveStatus?: boolean;
  _t: number;
}) => {
  const query = new URLSearchParams();

  // required params
  query.append("page", params.page.toString());
  query.append("limit", params.limit.toString());

  // optional params
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && key !== "page" && key !== "limit") {
      query.append(key, String(value));
    }
  });

  return await axiosInstance.get(
    `/applications/joined-dashboard/get?${query.toString()}`
  );
};


// Get applications by candidate ID
export const getApplicationsByCandidateId = async (
  candidateId: string,
  params: {
    page?: number;
    limit?: number;
    _t?: number; // For cache busting
  } = {}
): Promise<IGetApplicationsByCandidateResponse> => {
  try {
    // Simple string validation for candidateId (assuming MongoDB ObjectId format: 24 hex characters)
    if (!/^[0-9a-fA-F]{24}$/.test(candidateId)) {
      throw new Error('Invalid Candidate ID format.');
    }

    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params._t) queryParams.append('_t', params._t.toString());

    const apiUrl = `/applications/by-candidate/${candidateId}?${queryParams.toString()}`;
    const fullUrl = `${axiosInstance.defaults.baseURL}${apiUrl}`;

    console.log('Fetching applications by candidate ID');
    console.log('API URL:', fullUrl);
    console.log('Request params:', params);

    const response = await axiosInstance.get(apiUrl);

    console.log('Applications by candidate fetched successfully:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Failed to fetch applications by candidate:', error.response?.data?.message || error.message);
    console.error('Full error response:', error.response?.data);

    if (error.response?.status === 400) {
      toast.error('Invalid candidate ID.');
    } else if (error.response?.status === 401) {
      toast.error('Authentication failed. Please log in again.');
    } else if (error.response?.status === 403) {
      toast.error('Access denied. You may not have permission to view this candidate’s applications.');
    } else if (error.response?.status === 404) {
      toast.error('Candidate or applications not found.');
    } else {
      toast.error(error.response?.data?.message || 'Failed to fetch applications by candidate.');
    }
    throw error;
  }
};

export const getCandidateById = async (candidateId: string) => {
  try {
  const response = await axiosInstance.get(`/candidates/${candidateId}`);
    return response.data;
  } catch (error: any) {
    // You can customize error handling as needed
    throw error.response?.data || error;
  }
};

export interface ReassignApplicationPayload {
  newJobId: string; 
  comments: string;
}

export interface ReassignApplicationResponse {
  status: 'success';
  message: string;
  data: {
    newApplicationId: string;
    newInterviewId: string;
  };
}

const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const reassignCandidateApplication = async (
  applicationId: string,
  payload: ReassignApplicationPayload
): Promise<ReassignApplicationResponse> => {
  try {
    const response: AxiosResponse<ReassignApplicationResponse> = await axiosInstance.post(
      `/applications/${applicationId}/reassign`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
      }
    );
    return response.data;
  } catch (error: any) {
    // If token expired, try to refresh and retry once
    if (error.response?.status === 401) {
      try {
        // Always send refresh token as cookie
        const refreshResponse = await axios.post(
          `/auth/refresh-token`,
          {},
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        );
        const newAccessToken = refreshResponse.data?.accessToken;
        if (newAccessToken) {
          localStorage.setItem('accessToken', newAccessToken);
          // Retry the original request with new token
          const retryResponse: AxiosResponse<ReassignApplicationResponse> = await axiosInstance.post(
            `/applications/${applicationId}/reassign`,
            payload,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${newAccessToken}`,
              },
            }
          );
          return retryResponse.data;
        } else {
          throw new Error('Session expired. Please log in again.');
        }
      } catch (refreshError: any) {
        throw new Error(refreshError.response?.data?.message || 'Session expired. Please log in again.');
      }
    }
    throw new Error(error.response?.data?.message || 'Failed to reassign candidate application');
  }
};



