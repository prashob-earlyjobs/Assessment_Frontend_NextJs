import Cookies from "js-cookie";
import axiosInstance from "./apiinterseptor";
import { toast } from "sonner";

export const userLogin = async ({
  emailormobile,
  password,
}: {
  emailormobile: string;
  password: string;
}) => {
  console.log(typeof emailormobile, emailormobile, password);
  try {
    const response = await axiosInstance.post("/auth/login", {
      emailormobile,
      password,
    });
    const data = response.data;
    const accessToken = data.data.accessToken; // Corrected destructuring
    if (accessToken) {
      axiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`; 
      localStorage.setItem("accessToken", accessToken); // Set for all future requests
      console.log(accessToken, "accessToken in servicesapis.tsx");
    }
    return data;
  } catch (error) {
    if (error?.response?.data?.message == "Account is deactivated") {
      toast.error(
        `Login failed. This ${error?.response?.data?.message} by admin.`
      );
      throw new Error("Account is deactivated.");
    } else {
      toast.error(`Login failed. ${error?.response?.data?.message}.`);
    }
    throw error;
  }
};

export const isUserLoggedIn = async () => {
  try {
    const response = await axiosInstance.get("/auth/is-logged-in");
    
    return response.data;
  } catch (error) {

    return error;
  }
};

export const sendOtptoMobile = async (
  { phoneNumber, email, franchiseId = "", toLogin = false },
  tochangePassword = false,
) => {
  try {
    const response = await axiosInstance.post("/auth/send-otp", {
      phoneNumber,
      email,
      franchiseId,
      tochangePassword,
      toLogin,
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Error sending OTP",
      statusCode: error.response?.status,
      data: error.response?.data,
    };
  }
};

export const verifyOtpMobile = async ({ phoneNumber, email, otp, toLogin = false }) => {
  try {
    const response = await axiosInstance.post("/auth/verify-otp", {
      phoneNumber,
      email,
      otp,
      toLogin,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const userSignup = async ({
  name,
  email,
  mobile,
  password,
  referrerId,
  experienceLevel,
  currentCity
}: {
  email: string;
  password?: string;
  name: string;
  mobile: string;
  referrerId?: string;
  experienceLevel?: string;
  currentCity?: string;
}) => {
  try {
    const response = await axiosInstance.post("/auth/register", {
      email,
      password: password || "",
      name,
      mobile,
      experienceLevel,
      currentCity,
      referrerId
    });
    const data = response.data;
    const accessToken = data.data.accessToken; // Corrected destructuring

    Cookies.set("accessToken", accessToken, { expires: 7 }); // Store token in cookies for 7 days
    if (accessToken) {
      axiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`; // Set for all future requests
    }
    return data;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}.`);

    return error;
  }
};

export const resetPassword = async (userId: string, newPassword: string) => {
  try {
    const response = await axiosInstance.patch(
      `/auth/reset-password/${userId}`,
      {
        newPassword,
      }
    );
    return response.data;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}.`);

    return error;
  }
};
export const completeProfile = async (profileData) => {
  try {
    const response = await axiosInstance.put(
      "/auth/complete-profile",
      profileData
    );

    return response.data;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}.`);

    return error;
  }
};
export const getAssessmentsfromSearch = async ({
  category,
  searchQuery,
  type,
  difficulty,
  page = 1,
  limit = 10,
}) => {
  try {
    const response = await axiosInstance.get(
      `/assessments?category=${encodeURIComponent(category)}&title=${encodeURIComponent(searchQuery)}&type=${encodeURIComponent(type)}&difficulty=${encodeURIComponent(difficulty)}&page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    // Only show toast on client-side (not during server-side sitemap generation)
    if (typeof window !== 'undefined') {
      toast.error(`${error?.response?.data?.message}.`);
    } else {
      console.error('Error fetching assessments:', error?.response?.data?.message || error.message);
    }

    return error;
  }
};
export const getAssessmentsfromSearchLandingPage = async ({ searchQuery }) => {
  try {
    const response = await axiosInstance.get(
      `/assessments?title=${encodeURIComponent(searchQuery)}`
    );
    return response.data;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}.`);
    return error;
  }
};

export const getAssessmentById = async (assessmentId) => {
  try {
    const response = await axiosInstance.get(`/assessments/${assessmentId}`);

    return response;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}.`);

    return error;
  }
};

export const updateProfile = async (profileData) => {
  try {
    const response = await axiosInstance.put(
      "/auth/update-profile",
      profileData
    );
    return response.data;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}.`);

    return error;
  }
};

export const updateBankDetails = async (bankDetailsData) => {
  try {
    const response = await axiosInstance.put(
      "/auth/update-bank-details",
      bankDetailsData
    );
    return response.data;
  } catch (error) {
    toast.error(`${error?.response?.data?.message || "Failed to update bank details"}.`);
    return error;
  }
};
export const getColleges = async (search) => {
  console.log("search", search);
  try {
    const response = await axiosInstance.get(
      `/auth/colleges?search=${encodeURIComponent(search)}`
    );
    if(response.status !== 200){
      throw new Error("Failed to fetch colleges");
    }
    console.log("response", response);
    return response.data;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}.`);

    return error;
  }
};
export const userLogout = async () => {
  try {
    const response = await axiosInstance.post("/auth/logout");
    if (!response.data.success) {
      throw new Error("Logout failed");
    }
    Cookies.remove("accessToken");
    localStorage.removeItem("userCredentials");
    axiosInstance.defaults.headers.Authorization = ""; 
    toast.success("Logged out successfully!");
    return response.data;
  } catch (error) {
    toast.error("Logout failed. Please try again.");
    toast.error(`${error?.response?.data?.message}.`);

    return error;
  }
};

export const adminLogin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });
    const data = response.data;
    const accessToken = data.data.accessToken; // Corrected destructuring
    if (accessToken) {
      axiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;
      localStorage.setItem("accessToken", accessToken); // Set for all future requests
    }
    return data;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}.`);

    return error;
  }
};

export const getUsers = async ({ searchQuery, role, page = 1, limit = 10 }) => {
  try {
    const response = await axiosInstance.get(
      `/admin/getUsers?search=${searchQuery}&isActive=undefined&role=${role}&page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}.`);

    return error;
  }
};

export const getUsersForFranchise = async ({
  franchiseId,
  searchQuery,
  role,
  page = 1,
  limit = 10,
}) => {
  try {
    const response = await axiosInstance.get(
      `/admin/getUsersForFranchise/${franchiseId}?search=${searchQuery}&isActive=undefined&role=${role}&page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}.`);

    return error;
  }
};


export const setUserStatusAactivity = async (userId, isActive) => {
  try {
    const response = await axiosInstance.put(`/admin/users/${userId}/status`, {
      isActive,
    });
    return response.data;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}.`);

    return error;
  }
};

export const getAssessmentsfromAdminSearch = async ({
  searchQuery,
  page = 1,
  limit = 10,
}) => {
  // category, searchQuery, type, difficulty,
  try {
    const response = await axiosInstance.get(
      `/assessments?title=${searchQuery}&page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}.`);

    return error;
  }
};

export const getAssessmentByIdForAdmin = async (assessmentId) => {
  try {
    const response = await axiosInstance.get(`/assessments/${assessmentId}`);
    return response.data;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}.`);

    return error;
  }
};

export const addAssessment = async (assessmentData) => {
  try {
    const response = await axiosInstance.post(
      "/admin/addAssessment",
      assessmentData
    );
    return response.data;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}.`);

    return error;
  }
};

export const editAssessment = async (assessmentData, assessmentId) => {
  try {
    const response = await axiosInstance.put(
      `/admin/editAssessment/${assessmentId}`,
      assessmentData
    );
    return response.data;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}.`);

    return error;
  }
};

export const getAssessmentsByUserId = async (userId: string) => {
  try {
    const response = await axiosInstance.get(
      `assessments/getAssessments/${userId}`
    );
    return response.data;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}.`);

    return error;
  }
};

export const getFranchiser = async (franchiserId: string) => {
  try {
    const response = await axiosInstance.get(
      `/admin/getFranchiser/${franchiserId}`
    );
    return response.data;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}.`);

    return error;
  }
};

export const getOrderIdForPayment = async (paymentdetails) => {
  try {
    const response = await axiosInstance.post(
      `/getOrderIdForPayment/create-order`,
      paymentdetails
    );
    return response.data;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}.`);

    return error;
  }
};

export const addCandidateTransaction = async (
  userId,
  assessmentId,
  paymentdetails
) => {
  try {
    const response = await axiosInstance.post(
      `/transactions/${userId}/${assessmentId}`,
      paymentdetails
    );
    return response.data;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}.`);

    return error;
  }
};

export const getTransactions = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`/transactions/${userId}`);
    return response.data;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}.`);

    return error;
  }
};

/**
 * Create invoice in Zoho Books after successful payment
 * @param invoiceData - Invoice data including customer details, items, and payment info
 * @returns Promise with invoice creation response
 */
export const createZohoBooksInvoice = async (invoiceData: {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  customerAddress?: {
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    zip?: string;
  };
  items: Array<{
    name: string;
    description?: string;
    rate: number;
    quantity: number;
    tax?: number;
  }>;
  transactionId: string;
  paymentId: string;
  amount: number;
  currency?: string;
  notes?: string;
  terms?: string;
}) => {
  try {
    const response = await axiosInstance.post("/zoho-books/create-invoice", {
      customer_name: invoiceData.customerName,
      customer_email: invoiceData.customerEmail,
      customer_phone: invoiceData.customerPhone,
      customer_address: invoiceData.customerAddress,
      line_items: invoiceData.items.map((item) => ({
        name: item.name,
        description: item.description || "",
        rate: item.rate,
        quantity: item.quantity,
        tax_id: item.tax || null,
      })),
      transaction_id: invoiceData.transactionId,
      payment_id: invoiceData.paymentId,
      total: invoiceData.amount,
      currency_code: invoiceData.currency || "INR",
      notes: invoiceData.notes || "",
      terms: invoiceData.terms || "",
    });

    return {
      success: true,
      data: response.data,
      invoiceId: response.data?.data?.invoice_id || response.data?.invoice_id,
      invoiceNumber: response.data?.data?.invoice_number || response.data?.invoice_number,
      invoiceUrl: response.data?.data?.invoice_url || response.data?.invoice_url,
    };
  } catch (error: any) {
    console.error("Zoho Books invoice creation error:", error);
    // Don't show toast error as this is a background operation
    // The payment is already successful, invoice generation failure shouldn't block the user
    return {
      success: false,
      error: error?.response?.data?.message || error?.message || "Failed to create invoice in Zoho Books",
      data: error?.response?.data,
    };
  }
};
export const getTransactionsForSprAdmin = async (page = 1, limit = 10) => {
  try {
    const response = await axiosInstance.get(`/admin/getTransactions`, {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || "Failed to fetch transactions";
    toast.error(`${errorMessage}.`);
    return { success: false, message: errorMessage, error };
  }
};

export const getTransactionsForFranchisenAdmin = async (
  page = 1,
  limit = 10
) => {
  try {
    const response = await axiosInstance.get(
      `/admin/franchise/getTransactions/`,
      {
        params: { page, limit },
      }
    );
    return response.data;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || "Failed to fetch transactions";
    toast.error(`${errorMessage}.`);
    return { success: false, message: errorMessage, error };
  }
};

export const getReferredUsers = async ({
  userId,
  searchQuery = '',
  role = 'candidate',
  page = 1,
  limit = 10,
}) => {
  try {
    const response = await axiosInstance.get(
      `/admin/getReferredUsers/${userId}?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}.`);
    return error;
  }
};

export const getReferredTransactions = async ({
  userId,
  page = 1,
  limit = 10,
}) => {
  try {
    const response = await axiosInstance.get(
      `/admin/getReferredTransactions/${userId}?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || "Failed to fetch referred transactions";
    toast.error(`${errorMessage}.`);
    return { success: false, message: errorMessage, error };
  }
};
interface Franchiser {
  name: string;
  email: string;
  password: string;
  street: string;
  city: string;
  state: string;
  country: string;
  mobile: string;
  zipCode: string;
  franchiseId: string;
}

export const addFranchiser = async (newFranchise: Franchiser) => {
  try {
    const response = await axiosInstance.post(
      `/admin/addFranchiser/`,
      newFranchise
    );
    return response.data;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}.`);

    return error;
  }
};

export const getUserStats = async (userId) => {
  try {
    const response = await axiosInstance.get(
      `/assessments/getUserStats/${userId}`
    );
    return response.data;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}.`);
    return error;
  }
};

// Offer APIs
export const getOffers = async () => {
  try {
    const response = await axiosInstance.get("/offers");
    return Array.isArray(response.data)
      ? response.data
      : response.data.data || [];
  } catch (error) {
    toast.error(
      `${error?.response?.data?.message || "Failed to fetch offers"}.`
    );
    return [];
  }
};

export const addOffer = async (offerData) => {
  try {
    const response = await axiosInstance.post("/offers", offerData);
    toast.success("Offer added successfully!");
    return response.data;
  } catch (error) {
    toast.error(`${error?.response?.data?.message || "Failed to add offer"}.`);
    throw error;
  }
};

export const createCreatorCoupons = async (referrerId: string) => {
  try {
    const coupons = [
      {
        code: `${referrerId}05`,
        discountType: "percentage",
        discountValue: 5,
        maxUsage: 5,
        expiresAt: "2025-12-31T23:59:59.000Z",
        isActive: true,
        minOrderValue: 0,
      },
      {
        code: `${referrerId}10`,
        discountType: "percentage",
        discountValue: 10,
        maxUsage: 5,
        expiresAt: "2025-12-31T23:59:59.000Z",
        isActive: true,
        minOrderValue: 0,
      },
      {
        code: `${referrerId}15`,
        discountType: "percentage",
        discountValue: 15,
        maxUsage: 5,
        expiresAt: "2025-12-31T23:59:59.000Z",
        isActive: true,
        minOrderValue: 0,
      },
    ];

    // Create coupons directly using axiosInstance to avoid multiple toast notifications
    const results = await Promise.all(
      coupons.map(async (coupon) => {
        try {
          const response = await axiosInstance.post("/offers", coupon);
          return response.data;
        } catch (error) {
          console.error(`Error creating coupon ${coupon.code}:`, error);
          throw error;
        }
      })
    );

    return {
      success: true,
      data: results,
    };
  } catch (error) {
    console.error("Error creating creator coupons:", error);
    return {
      success: false,
      message: error?.response?.data?.message || "Failed to create creator coupons",
      error,
    };
  }
};

export const editOffer = async (id, offerData) => {
  try {
    const response = await axiosInstance.put(`/offers/${id}`, offerData);
    toast.success("Offer updated successfully!");
    return response.data;
  } catch (error) {
    toast.error(
      `${error?.response?.data?.message || "Failed to update offer"}.`
    );
    throw error;
  }
};

export const redeemOffer = async (code: string) => {
  try {
    const response = await axiosInstance.patch(`/offers/${code}/redeem`);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || "Failed to redeem offer",
    };
  }
};
export const updateCertificateLink = async ({ userId, interviewId, certificateId }) => {
  try {
   
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const response = await fetch(`${backendUrl}/certificates/update-certificate`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        
      },
      body: JSON.stringify({
        userId,
        interviewId,
        certificateId,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to update certificate link");
    }

    return {
      success: true,
      data: data.data,
    };
  } catch (error) {
    console.error("Error in updateCertificateId:", error);
    throw new Error(error.message || "Failed to update certificate link");
  }
};

export const uploadPhoto = async (file: File, candidateId: string) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axiosInstance.post(
      `/upload/${candidateId}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    if (response.data?.fileUrl) {
      return response.data.fileUrl;
    } else {
      toast.error(response.data?.message || "Failed to upload photo.");
      return null;
    }
  } catch (error) {
    toast.error("Failed to upload photo. Please try again.");
    return null;
  }
};

export const uploadResume = async (file: File, candidateId: string) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axiosInstance.post(
      `/upload/${candidateId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("response", response);

    if (response.data.fileUrl) {
      toast.success("Resume uploaded successfully!");
      return response.data.fileUrl;
    }
    throw new Error("Failed to upload resume");
  } catch (error) {
    toast.error("Failed to upload resume");
    throw error;
  }
};

export const getAssessmentLink = async (assessmentId, details) => {
  try {
    const response = await axiosInstance.post(
      `assessments/getAssessmentLink/${assessmentId}`,
      details
    );
    return response.data;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}.`);
  }
};

export const verifyFranchiseId = async (franchiseId: string) => {
  try {
    const response = await axiosInstance.get(
      `auth/verifyFranchiseId/${franchiseId}`
    );
    return response.data;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}.`);
    return error;
  }
};

export const storeAssessmentDetailsApi = async (userId, data) => {
  try {
    const response = await axiosInstance.post(
      `/assessments/storeAssessmentDetails/${userId}`,
      data
    );
    return response.data;
  } catch (error) {
    toast.error(
      `${
        error?.response?.data?.message || "Failed to store assessment details"
      }.`
    );
    throw error;
  }
};
export const getShortIdForUrl= async () => {
   try {
    const response = await axiosInstance.get(
      "/assessments/getShortIdForUrl"
    );
    return response.data;
  } catch (error) {
    toast.error(
      `${
        error?.response?.data?.message || "Failed to store assessment details"
      }.`
    );
    throw error;
  }
};
export const matchAssessmentsDetails = async (userId, assessmentId) => {
  const response = await axiosInstance.get(
    `/assessments/matchAssessmentsDetails/${userId}/${assessmentId}`
  );
  return response.data;
};

export const getPaidAssessments = async (userId) => {
  try {
    const response = await axiosInstance.get(
      `/assessments/getPaidAssessments/${userId}`
    );
    return response.data;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}.`);
  }
};

export const getAssessmentsVelox = async () => {
  try {
    const response = await axiosInstance.get(`/admin/getAssessmentsVelox`);
    return response.data;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}.`);
  }
};

export const getResultForCandidateAssessment = async (interviewId) => {
  try {
    const response = await axiosInstance.get(
      `/admin/getResultForCandidateAssessment/${interviewId}`
    );
    return response.data;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}.`);
  }
};

export const getRecording = async (interviewId: string) => {
  try {
    const response = await axiosInstance.get(
      `/admin/getRecording/${interviewId}`
    );
    return response.data;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}.`);
  }
};

export const getTranscript = async (interviewId: string) => {
  try {
    const response = await axiosInstance.get(
      `/admin/getTranscript/${interviewId}`
    );
    return response.data;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}.`);
  }
};

export const getCandidatesForAssessment = async (assessmentId) => {
  try {
    const response = await axiosInstance.get(
      `/admin/getCandidatesForAssessment/${assessmentId}`
    );
    return response.data;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}.`);
  }
};

export const getFranchises = async () => {
  try {
    const response = await axiosInstance.get(`/admin/getFranchises`);
    return response.data;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}.`);
  }
};


export const getAssessmentSuggestions = async (page = 1) => {
  try {
    const response = await axiosInstance.get(`/assessments/getAssessmentSuggestions`, {
      params: { page },
    });
    return response;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}.`);
    return error;
  }
};
export const createCertificate = async (certificateData) => {
  try {
    const response = await axiosInstance.post("/certificates", certificateData);
    return response.data;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}.`);
    throw error;
  }
};

export const verifyCertificate = async (certificateNumber) => {
  try {
    const response = await axiosInstance.get(`/certificates/verify/${certificateNumber}`);
    return response.data;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}.`);
    throw error;
  }
};
