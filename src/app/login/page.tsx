"use client";
import { useEffect, useState, Suspense, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { ArrowLeft, Eye, EyeOff, Briefcase, GraduationCap, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../components/ui/dialog";
import Cookies from "js-cookie";
import { isUserLoggedIn, resetPassword, sendOtptoMobile, userLogin, userSignup, verifyOtpMobile } from "../components/services/servicesapis";
import axiosInstance from "../components/services/apiinterseptor";
import { useUser } from "@/app/context";

function LoginContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { userCredentials, setUserCredentials } = useUser();
  const [loginData, setLoginData] = useState({ emailormobile: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    mobile: "",
    experienceLevel: "experienced",
    currentCity: "",
    referrerId: "",
    role: ""
  });
  const [signupErrors, setSignupErrors] = useState({
    name: "",
    email: "",
    mobile: "",
    experienceLevel: "",
    referrerId: "",
    currentCity: "",
    role: ""
  });
  const [otp, setOtp] = useState("");
  const [otpInputs, setOtpInputs] = useState(["", "", "", "", "", ""]);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [loginOtp, setLoginOtp] = useState("");
  const [loginOtpInputs, setLoginOtpInputs] = useState(["", "", "", "", "", ""]);
  const loginOtpInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [showLoginOtpForm, setShowLoginOtpForm] = useState(false);
  const [loginOtpTimer, setLoginOtpTimer] = useState(30);
  const [isLoginOtpTimerActive, setIsLoginOtpTimerActive] = useState(false);
  const [isForgotPasswordDialogOpen, setIsForgotPasswordDialogOpen] = useState(false);
  const [isForgotOtpDialogOpen, setIsForgotOtpDialogOpen] = useState(false);
  const [isResetPasswordDialogOpen, setIsResetPasswordDialogOpen] = useState(false);
  const [forgotPasswordData, setForgotPasswordData] = useState({ email: "", mobile: "", newPassword: "", confirmPassword: "" });
  const [forgotOtp, setForgotOtp] = useState("");
  const [isEnteringNumber, setIsEnteringNumber] = useState(false);
  const [otpTimer, setOtpTimer] = useState(30);
  const [isOtpTimerActive, setIsOtpTimerActive] = useState(false);
  const [forgotOtpTimer, setForgotOtpTimer] = useState(30);
  const [isForgotOtpTimerActive, setIsForgotOtpTimerActive] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  useEffect(() => {
    // Capture ref query param as referrerId
    const ref = searchParams?.get?.('ref') || "";
    if (ref) {
      setSignupData((prev) => ({ ...prev, referrerId: ref }));
    }

    // If ref is present in URL, skip login check and stay on login/signup page
    if (ref) {
      console.log("Ref parameter detected, staying on login/signup page regardless of auth status");
      return;
    }

    const checkUserLoggedIn = async () => {
      const response = await isUserLoggedIn();
      if (response.success && (response.user.role === 'super_admin' || response.user.role === 'franchise_admin')) {
        console.log("Admin user detected, redirecting to /admin");
        setUserCredentials(response.user);
        router.push('/admin');
      } else if (response.success && response.user.role === 'creator') {
        console.log("Creator user authenticated, redirecting to /creator");
        setUserCredentials(response.user);
        localStorage.removeItem("redirectAfterLogin");
        router.push('/creator');
      } else if (response.success && response.user.role === 'creator') {
        console.log("Creator user authenticated, redirecting to /creator");
        setUserCredentials(response.user);
        localStorage.removeItem("redirectAfterLogin");
        router.push('/creator');
      } else if (response.success && response.user.role !== 'super_admin' && response.user.role !== 'franchise_admin') {
        const redirectPath = localStorage.getItem("redirectAfterLogin") || '/dashboard';
        console.log("Non-admin user authenticated, redirecting to:", redirectPath);
        setUserCredentials(response.user);
        localStorage.removeItem("redirectAfterLogin"); // Clear stored path
        router.push(redirectPath);
      } else {
        // Don't redirect if already on login/signup page - preserve query parameters
        if (!pathname.startsWith('/login') && !pathname.startsWith('/signup')) {
          console.log("User not authenticated, staying on login/signup page");
          const currentMode = searchParams?.get('mode');
          const loginUrl = currentMode ? `/login?mode=${currentMode}` : '/login';
          router.push(loginUrl);
        }
      }
    };

    if (pathname.startsWith('/login') || pathname.startsWith('/signup')) {
      checkUserLoggedIn();
    }
  }, [router, pathname, setUserCredentials, searchParams]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOtpTimerActive && otpTimer > 0) {
      timer = setInterval(() => {
        setOtpTimer((prev) => {
          if (prev <= 1) {
            setIsOtpTimerActive(false);
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOtpTimerActive, otpTimer]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isForgotOtpTimerActive && forgotOtpTimer > 0) {
      timer = setInterval(() => {
        setForgotOtpTimer((prev) => {
          if (prev <= 1) {
            setIsForgotOtpTimerActive(false);
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isForgotOtpTimerActive, forgotOtpTimer]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isLoginOtpTimerActive && loginOtpTimer > 0) {
      timer = setInterval(() => {
        setLoginOtpTimer((prev) => {
          if (prev <= 1) {
            setIsLoginOtpTimerActive(false);
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isLoginOtpTimerActive, loginOtpTimer]);

  const handleLogin = async () => {
    if (isEnteringNumber && loginData.emailormobile.length !== 10) {
      toast.error("Please enter a valid mobile number!");
      return;
    }
    const isValidEmailOrMobile = (input: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const mobileRegex = /^[6-9]\d{9}$/;
      return emailRegex.test(input) || mobileRegex.test(input);
    };

    if (!isValidEmailOrMobile(loginData.emailormobile)) {
      toast.error("Please enter a valid email or mobile number!");
      return;
    }

    setIsLoginLoading(true);
    try {
      // Determine if input is email or mobile
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.emailormobile);
      const phoneNumber = isEmail ? "" : loginData.emailormobile.replace(/^\+91/, '');
      const email = isEmail ? loginData.emailormobile : "";

      const otpResponse = await sendOtptoMobile({
        phoneNumber: phoneNumber,
        email: email,
        toLogin: true
      });

      if (!otpResponse.success) {
        // Check if the failure is due to user not found (404)
        if (otpResponse.statusCode === 404 || otpResponse.statusCode === 400 || 
            otpResponse.message?.toLowerCase().includes('not found') ||
            otpResponse.message?.toLowerCase().includes('does not exist')) {
          // User doesn't exist, switch to signup tab and prefill email/mobile
          const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.emailormobile);
          if (isEmail) {
            setSignupData(prev => ({ ...prev, email: loginData.emailormobile }));
          } else {
            // Extract phone number: remove +91 prefix and any non-digit characters, keep only digits
            let phoneNumber = loginData.emailormobile.replace(/^\+91/, '').replace(/\D/g, '');
            // Keep only first 10 digits
            phoneNumber = phoneNumber.slice(0, 10);
            setSignupData(prev => ({ ...prev, mobile: phoneNumber }));
          }
          updateTab('signup');
          toast.info("User not found. Please sign up to create an account.");
          setIsLoginLoading(false);
          return;
        }
        toast.error(otpResponse.message || "Failed to send OTP");
        setIsLoginLoading(false);
        return;
      }

      setShowLoginOtpForm(true);
      setIsLoginOtpTimerActive(true);
      setLoginOtp("");
      setLoginOtpInputs(["", "", "", "", "", ""]);
      setTimeout(() => {
        loginOtpInputRefs.current[0]?.focus();
      }, 100);
      toast.success("OTP sent to your mobile number and email!");
      setIsLoginLoading(false);
    } catch (error: any) {
      // Check if error is 404 (user not found)
      if (error?.response?.status === 404 || error?.response?.status === 400) {
        // User doesn't exist, switch to signup tab and prefill email/mobile
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.emailormobile);
        if (isEmail) {
          setSignupData(prev => ({ ...prev, email: loginData.emailormobile }));
        } else {
          // Extract phone number: remove +91 prefix and any non-digit characters, keep only digits
          let phoneNumber = loginData.emailormobile.replace(/^\+91/, '').replace(/\D/g, '');
          // Keep only first 10 digits
          phoneNumber = phoneNumber.slice(0, 10);
          setSignupData(prev => ({ ...prev, mobile: phoneNumber }));
        }
        updateTab('signup');
        toast.info("User not found. Please sign up to create an account.");
        setIsLoginLoading(false);
        return;
      }
      toast.error(error?.response?.data?.message || error.message || "Error sending OTP");
      setIsLoginLoading(false);
    }
  };

  const handleSignup = async () => {
    const errors = {
      name: "",
      email: "",
      mobile: "",
      experienceLevel: "",
      currentCity: ""
    };

    let hasErrors = false;

    // Validate name
    if (!signupData.name || !signupData.name.trim()) {
      errors.name = "Full name is required";
      hasErrors = true;
    } else if (signupData.name.trim().length < 4) {
      errors.name = "Name must be at least 4 characters long";
      hasErrors = true;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!signupData.email || !signupData.email.trim()) {
      errors.email = "Email is required";
      hasErrors = true;
    } else if (!emailRegex.test(signupData.email.trim())) {
      errors.email = "Please enter a valid email address";
      hasErrors = true;
    }

    // Validate mobile
    if (!signupData.mobile || signupData.mobile.length === 0) {
      errors.mobile = "Mobile number is required";
      hasErrors = true;
    } else if (signupData.mobile.length !== 10) {
      errors.mobile = "Mobile number must be 10 digits";
      hasErrors = true;
    } else if (!/^[6-9]\d{9}$/.test(signupData.mobile)) {
      errors.mobile = "Please enter a valid mobile number";
      hasErrors = true;
    }

    // Validate experience level
    if (!signupData.experienceLevel) {
      errors.experienceLevel = "Please select your experience level";
      hasErrors = true;
    }

    // Validate current city
    if (!signupData.currentCity || !signupData.currentCity.trim()) {
      errors.currentCity = "Current city is required";
      hasErrors = true;
    } else if (signupData.currentCity.trim().length < 2) {
      errors.currentCity = "Please enter a valid city name";
      hasErrors = true;
    }

    setSignupErrors({ ...errors, referrerId: "", role: "" });

    if (hasErrors) {
      toast.error("Please fill in all required fields correctly");
      return;
    }

    try {
      const otpResponse = await sendOtptoMobile({
        phoneNumber: signupData.mobile.replace(/^\+91/, ''),
        email: signupData.email
      });

      if (!otpResponse.success) {
        console.log("otpResponse", otpResponse);
        
        // Handle 409 status code - show error under input
        if (otpResponse.statusCode === 409) {
          const errorMessage = otpResponse.message || otpResponse.data?.message || "This mobile number is already registered";
          setSignupErrors({
            ...signupErrors,
            mobile: errorMessage
          });
          return;
        }
        
        throw new Error(otpResponse.message || "Failed to send OTP");
      }

      setShowOtpForm(true);
      setIsOtpTimerActive(true);
      setOtp(""); // Reset OTP when opening dialog
      setOtpInputs(["", "", "", "", "", ""]); // Reset individual inputs
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 100);
      toast.success("OTP sent to your mobile number!");
    } catch (error: any) {
      console.log("error", error?.response?.data || error.message || error);
      toast.error(error?.response?.data?.message || error.message || "Error sending OTP");
    }
  };

  const handleResendOtp = async () => {
    try {
      const otpResponse = await sendOtptoMobile({
        phoneNumber: signupData.mobile.replace(/^\+91/, ''),
        email: signupData.email
      });

      if (!otpResponse.success) {
        toast.error(otpResponse.data.message);
        return;
      }
      setOtp("");
      setIsOtpTimerActive(true);
      setOtpTimer(30);
      setOtpInputs(["", "", "", "", "", ""]); // Reset individual inputs
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 100);
      toast.success("OTP resent to your mobile number!");
    } catch (error) {
      toast.error("Error resending OTP");
    }
  };

  const handleOtpInputChange = (index: number, value: string) => {
    // Only allow numeric input
    const numericValue = value.replace(/\D/g, '').slice(0, 1);
    
    const newOtpInputs = [...otpInputs];
    newOtpInputs[index] = numericValue;
    setOtpInputs(newOtpInputs);
    
    // Update the combined OTP string
    const newOtp = newOtpInputs.join('');
    setOtp(newOtp);
    
    // Auto-focus next input if value entered
    if (numericValue && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpInputKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otpInputs[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
    // Handle paste
    if (e.key === 'v' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      navigator.clipboard.readText().then(text => {
        const pastedValue = text.replace(/\D/g, '').slice(0, 6);
        const newOtpInputs = [...otpInputs];
        for (let i = 0; i < 6; i++) {
          newOtpInputs[i] = pastedValue[i] || '';
        }
        setOtpInputs(newOtpInputs);
        setOtp(pastedValue);
        if (pastedValue.length < 6) {
          otpInputRefs.current[pastedValue.length]?.focus();
        } else {
          otpInputRefs.current[5]?.focus();
        }
      });
    }
  };

  const handleOtpInputFocus = (index: number) => {
    otpInputRefs.current[index]?.select();
  };

  const handleOtpVerification = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter a 6-digit OTP");
      return;
    }

    try {
      const response = await verifyOtpMobile({
        phoneNumber: signupData.mobile.replace(/^\+91/, ''),
        email: signupData.email,
        otp
      });

      if (!response.success) {
        toast.error(response.data.message);
        return;
      }

      const signupResponse = await userSignup(signupData);
      if (!signupResponse.success) {
        toast.error(signupResponse.data.message);
        return;
      }
      console.log("signupResponse", signupResponse);

      Cookies.set("accessToken", signupResponse.data.accessToken);
      setUserCredentials(signupResponse.data.user);

      setShowOtpForm(false);
      setIsOtpTimerActive(false);
      setOtpTimer(30);
      toast.success("Account created successfully!");
      const redirectPath = localStorage.getItem("redirectAfterLogin") || '/onboarding';
      console.log("Signup successful, redirecting to:", redirectPath);
     
      router.push('/onboarding');
    } catch (error) {
      toast.error("Error verifying OTP");
    }
  };

  const handleLoginOtpInputChange = (index: number, value: string) => {
    // Only allow numeric input
    const numericValue = value.replace(/\D/g, '').slice(0, 1);
    
    const newOtpInputs = [...loginOtpInputs];
    newOtpInputs[index] = numericValue;
    setLoginOtpInputs(newOtpInputs);
    
    // Update the combined OTP string
    const newOtp = newOtpInputs.join('');
    setLoginOtp(newOtp);
    
    // Auto-focus next input if value entered
    if (numericValue && index < 5) {
      loginOtpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleLoginOtpInputKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace' && !loginOtpInputs[index] && index > 0) {
      loginOtpInputRefs.current[index - 1]?.focus();
    }
    // Handle paste
    if (e.key === 'v' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      navigator.clipboard.readText().then(text => {
        const pastedValue = text.replace(/\D/g, '').slice(0, 6);
        const newOtpInputs = [...loginOtpInputs];
        for (let i = 0; i < 6; i++) {
          newOtpInputs[i] = pastedValue[i] || '';
        }
        setLoginOtpInputs(newOtpInputs);
        setLoginOtp(pastedValue);
        if (pastedValue.length < 6) {
          loginOtpInputRefs.current[pastedValue.length]?.focus();
        } else {
          loginOtpInputRefs.current[5]?.focus();
        }
      });
    }
  };

  const handleLoginOtpInputFocus = (index: number) => {
    loginOtpInputRefs.current[index]?.select();
  };

  const handleLoginOtpVerification = async () => {
    if (loginOtp.length !== 6) {
      toast.error("Please enter a 6-digit OTP");
      return;
    }

    try {
      // Determine if input is email or mobile
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.emailormobile);
      const phoneNumber = isEmail ? "" : loginData.emailormobile.replace(/^\+91/, '');
      const email = isEmail ? loginData.emailormobile : "";

      const loginResponse = await verifyOtpMobile({
        phoneNumber: phoneNumber,
        email: email,
        otp: loginOtp,
        toLogin: true
      });

     
      if (!loginResponse.success) {
        toast.error(loginResponse?.response?.data?.message);
        return;
      } else {
        // Same cookies and localStorage logic as old password login
        // Response structure should match userLogin: data.data.accessToken and data.data.user
        const accessToken = loginResponse.data?.accessToken || loginResponse.data?.data?.accessToken;
        const user = loginResponse.data?.user || loginResponse.data?.data?.user;
        
        if (accessToken) {
          Cookies.set("accessToken", accessToken, { expires: 7 });
          localStorage.setItem("accessToken", accessToken);
          // Set axios headers (same as userLogin does)
          axiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;
        }
        
        if (user) {
          setUserCredentials(user);
        }
        
        // Reset OTP form state
        setShowLoginOtpForm(false);
        setIsLoginOtpTimerActive(false);
        setLoginOtpTimer(30);
        setLoginOtp("");
        setLoginOtpInputs(["", "", "", "", "", ""]);
        
        toast.success("Login successful!");
        const redirectPath = localStorage.getItem("redirectAfterLogin") || '/dashboard';
        console.log("Login successful, redirecting to:", redirectPath);
        localStorage.removeItem("redirectAfterLogin"); // Clear stored path
        
        // Use window.location.href for hard redirect to ensure token is picked up
        // This prevents the useEffect from interfering before redirect completes
        setTimeout(() => {
          window.location.href = redirectPath;
        }, 100);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message || "Error verifying OTP");
    }
  };

  const handleResendLoginOtp = async () => {
    try {
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.emailormobile);
      const phoneNumber = isEmail ? "" : loginData.emailormobile.replace(/^\+91/, '');
      const email = isEmail ? loginData.emailormobile : "";

      const otpResponse = await sendOtptoMobile({
        phoneNumber: phoneNumber,
        email: email,
        toLogin: true
      });

      if (!otpResponse.success) {
        toast.error(otpResponse.message || "Failed to resend OTP");
        return;
      }
      setLoginOtp("");
      setIsLoginOtpTimerActive(true);
      setLoginOtpTimer(30);
      setLoginOtpInputs(["", "", "", "", "", ""]);
      setTimeout(() => {
        loginOtpInputRefs.current[0]?.focus();
      }, 100);
      toast.success("OTP resent to your mobile number and email!");
    } catch (error) {
      toast.error("Error resending OTP");
    }
  };

  useEffect(() => {
    console.log("userCredentials", userCredentials);
  }, [userCredentials]);

  const handleForgotPassword = async () => {
    if (forgotPasswordData.mobile.length !== 10) {
      toast.error("Please enter a valid mobile number!");
      return;
    }
    if (!forgotPasswordData.email) {
      toast.error("Please enter your email!");
      return;
    }
    try {
      const otpResponse = await sendOtptoMobile({
        phoneNumber: forgotPasswordData.mobile.replace(/^\+91/, ''),
        email: forgotPasswordData.email
      }, true);

      if (!otpResponse.success) {
        throw new Error(otpResponse.data);
      }
      setUserCredentials(otpResponse.data.user);
      setIsForgotPasswordDialogOpen(false);
      setIsForgotOtpDialogOpen(true);
      setIsForgotOtpTimerActive(true);
      toast.success("OTP sent to your mobile number and email!");
    } catch (error) {
      toast.error("User does not exist with this mobile number or email");
    }
  };

  const handleForgotOtpVerification = async () => {
    if (forgotOtp.length !== 6) {
      toast.error("Please enter a 6-digit OTP");
      return;
    }

    try {
      const response = await verifyOtpMobile({
        phoneNumber: forgotPasswordData.mobile.replace(/^\+91/, ''),
        email: forgotPasswordData.email,
        otp: forgotOtp
      });

      if (!response.success) {
        toast.error(response.data.message);
        return;
      }

      setIsForgotOtpDialogOpen(false);
      setIsForgotOtpTimerActive(false);
      setForgotOtpTimer(30);
      setIsResetPasswordDialogOpen(true);
      toast.success("OTP verified successfully!");
    } catch (error) {
      toast.error("Error verifying OTP");
    }
  };

  const handleResetPassword = async () => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/;

    if (!forgotPasswordData.newPassword || !forgotPasswordData.confirmPassword) {
      toast.error("Please fill in both password fields");
      return;
    }

    if (forgotPasswordData.newPassword !== forgotPasswordData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (forgotPasswordData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    if (!passwordRegex.test(forgotPasswordData.newPassword)) {
      toast.error("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character");
      return;
    }

    try {
      const response = await resetPassword(userCredentials._id, forgotPasswordData.newPassword);

      if (!response.success) {
        toast.error(response.message);
        return;
      }

      setIsResetPasswordDialogOpen(false);
      setForgotPasswordData({ email: "", mobile: "", newPassword: "", confirmPassword: "" });
      setForgotOtp("");
      toast.success("Password reset successfully!");
      updateTab('login');
    } catch (error) {
      toast.error("Error resetting password");
    }
  };

  const handleGoogleAuth = () => {
    toast.success("Google authentication initiated!");
    const redirectPath = localStorage.getItem("redirectAfterLogin") || '/dashboard';
    console.log("Google auth initiated, redirecting to:", redirectPath);
    localStorage.removeItem("redirectAfterLogin"); // Clear stored path
    router.push(redirectPath);
  };

  // Initialize defaultTab based on query parameter or pathname
  const getInitialTab = (): 'login' | 'signup' => {
    if (searchParams) {
      const mode = searchParams.get('mode');
      if (mode === 'signup') return 'signup';
      if (mode === 'login') return 'login'; 
    }
    return pathname.includes('signup') ? 'signup' : 'login';
  };

  const [defaultTab, setDefaultTab] = useState<'login' | 'signup'>(getInitialTab);

  // Helper function to update tab and URL query parameter
  const updateTab = (tab: 'login' | 'signup') => {
    setDefaultTab(tab);
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.set('mode', tab);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    // Check query parameter first, then fallback to pathname
    const mode = searchParams?.get('mode');
    
    if (mode === 'signup' || mode === 'login') {
      // Query parameter exists, respect it - always sync with URL
      const targetTab = mode as 'login' | 'signup';
      setDefaultTab(targetTab);
    } else {
      // No mode query parameter, determine from pathname and update URL
      const targetMode = pathname.includes('signup') ? 'signup' : 'login';
      setDefaultTab(targetMode);
      // Update URL to include query parameter if not present
      const params = new URLSearchParams(searchParams?.toString() || '');
      params.set('mode', targetMode);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [pathname, searchParams, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>

      <div className="relative w-full max-w-md">
        <Button
          variant="ghost"
          onClick={() => router.push('/')}
          className="mb-6 text-gray-600 hover:text-gray-900 rounded-lg"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="text-center mb-8">
          <div className="flex items-center justify-center mx-auto mb-4">
            <img
              src="/images/logo.png"
              alt="EarlyJobs"
              className="h-20 w-32"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome to EarlyJobs</h1>
          <p className="text-gray-600 mt-2">Your career journey starts here.</p>
        </div>

        <Card className="shadow-2xl border-0 rounded-3xl overflow-hidden">
          <Tabs value={defaultTab} onValueChange={(value) => {
            updateTab(value as 'login' | 'signup');
            // Clear signup form fields when manually switching to login
            if (value === 'login') {
              setSignupData(prev => ({ ...prev, email: '', mobile: '' }));
            }
          }} className="w-full">
            <TabsContent value="login" className="m-0">
              {!showLoginOtpForm ? (
                <>
                  <CardHeader className="space-y-1 pb-4">
                    <CardTitle className="text-2xl text-center">Sign in to your account</CardTitle>
                    <CardDescription className="text-center">
                      Enter your email or mobile number to receive OTP
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="emailOrMobile">Email or Mobile Number</Label>
                        <Input
                          id="emailOrMobile"
                          type="text"
                          placeholder="your@email.com or 9876543210"
                          value={loginData.emailormobile}
                          onChange={(e) => setLoginData({ ...loginData, emailormobile: e.target.value })}
                          className="h-12 rounded-lg border-gray-200 focus:border-orange-500"
                          required
                        />
                      </div>
                      <Button
                        onClick={handleLogin}
                        disabled={isLoginLoading}
                        className="w-full h-12 bg-orange-600 hover:bg-orange-700 rounded-lg text-base shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoginLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending OTP...
                          </>
                        ) : (
                          "Send OTP"
                        )}
                      </Button>
                      <div className="text-center text-sm text-gray-600 pt-2">
                        Don't have an account?{" "}
                        <button
                          type="button"
                          onClick={() => updateTab('signup')}
                          className="text-orange-600 hover:text-orange-700 font-medium underline"
                        >
                          Sign Up
                        </button>
                      </div>
                  </CardContent>
                </>
              ) : (
                <>
                  <CardHeader className="space-y-1 pb-4">
                    <div className="flex items-center mb-2">
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setShowLoginOtpForm(false);
                          setLoginOtp("");
                          setLoginOtpInputs(["", "", "", "", "", ""]);
                          setIsLoginOtpTimerActive(false);
                          setLoginOtpTimer(30);
                        }}
                        className="p-0 h-auto text-gray-600 hover:text-gray-900 -ml-2"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                      </Button>
                    </div>
                    <CardTitle className="text-2xl text-center">Verify OTP</CardTitle>
                    <CardDescription className="text-center">
                      Enter the 6-digit OTP sent to your mobile number and email.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-6 py-8">
                      <div className="grid gap-4">
                        <Label className="text-base font-medium text-center">Enter OTP</Label>
                        <div className="flex justify-center gap-2 sm:gap-2.5">
                          {[0, 1, 2, 3, 4, 5].map((index) => (
                            <input
                              key={index}
                              ref={(el) => {
                                loginOtpInputRefs.current[index] = el;
                              }}
                              type="tel"
                              inputMode="numeric"
                              pattern="[0-9]"
                              maxLength={1}
                              value={loginOtpInputs[index]}
                              onChange={(e) => handleLoginOtpInputChange(index, e.target.value)}
                              onKeyDown={(e) => handleLoginOtpInputKeyDown(index, e)}
                              onFocus={() => handleLoginOtpInputFocus(index)}
                              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-lg border-2 text-center text-lg sm:text-xl font-bold transition-all duration-200 shadow-sm ${
                                loginOtpInputs[index]
                                  ? "border-orange-500 bg-gradient-to-br from-orange-50 to-orange-100 text-orange-700 shadow-md scale-105"
                                  : "border-gray-300 bg-white text-gray-900 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 hover:border-orange-300 hover:shadow-md"
                              }`}
                              required
                              autoFocus={index === 0}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                          onClick={handleLoginOtpVerification}
                          className="w-full h-12 sm:h-14 bg-orange-600 hover:bg-orange-700 rounded-lg text-base font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={loginOtp.length !== 6}
                        >
                          Login
                        </Button>
                      </div>
                      <div className="text-center text-xs sm:text-sm text-gray-500">
                        Didn't receive OTP?{" "}
                        <button
                          type="button"
                          onClick={handleResendLoginOtp}
                          disabled={isLoginOtpTimerActive}
                          className={`text-orange-600 hover:text-orange-700 font-medium underline disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline ${
                            isLoginOtpTimerActive ? "cursor-not-allowed" : "cursor-pointer"
                          }`}
                        >
                          {isLoginOtpTimerActive ? `Resend OTP in ${loginOtpTimer}s` : "Resend OTP"}
                        </button>
                        . Check your SMS inbox and email.
                      </div>
                      <div className="text-center text-sm text-gray-600 pt-2">
                        Don't have an account?{" "}
                        <button
                          type="button"
                          onClick={() => updateTab('signup')}
                          className="text-orange-600 hover:text-orange-700 font-medium underline"
                        >
                          Sign Up
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </>
              )}
            </TabsContent>

            <TabsContent value="signup" className="m-0">
              {!showOtpForm ? (
                <>
                  <CardHeader className="space-y-1 pb-4">
                    <CardTitle className="text-2xl text-center">Create your account</CardTitle>
                    <CardDescription className="text-center">
                      Join thousands of candidates advancing their careerss
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your full name"
                        value={signupData.name}
                        onChange={(e) => {
                          setSignupData({ ...signupData, name: e.target.value });
                          if (signupErrors.name) {
                            setSignupErrors({ ...signupErrors, name: "" });
                          }
                        }}
                        className={`h-12 rounded-lg border-gray-200 focus:border-orange-500 ${
                          signupErrors.name ? "border-red-500 focus:border-red-500" : ""
                        }`}
                        required
                      />
                      {signupErrors.name && (
                        <p className="text-sm text-red-500 mt-1">{signupErrors.name}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email <span className="text-red-500">*</span></Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="your@email.com"
                        value={signupData.email}
                        onChange={(e) => {
                          setSignupData({ ...signupData, email: e.target.value });
                          if (signupErrors.email) {
                            setSignupErrors({ ...signupErrors, email: "" });
                          }
                        }}
                        className={`h-12 rounded-lg border-gray-200 focus:border-orange-500 ${
                          signupErrors.email ? "border-red-500 focus:border-red-500" : ""
                        }`}
                        required
                      />
                      {signupErrors.email && (
                        <p className="text-sm text-red-500 mt-1">{signupErrors.email}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mobile">Mobile Number <span className="text-red-500">*</span></Label>
                      <input
                        id="mobile"
                        name="mobile"
                        type="text"
                        value={signupData.mobile}
                        placeholder="9876543210"
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^\d{0,10}$/.test(value)) {
                            setSignupData({ ...signupData, mobile: value });
                            if (signupErrors.mobile) {
                              setSignupErrors({ ...signupErrors, mobile: "" });
                            }
                          }
                        }}
                        pattern="\d{10}"
                        inputMode="numeric"
                        required
                        className={`h-12 w-full rounded-lg border focus:outline-none focus:ring-2 px-4 ${
                          signupErrors.mobile
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-200 focus:ring-orange-500"
                        }`}
                      />
                      {signupErrors.mobile && (
                        <p className="text-sm text-red-500 mt-1">{signupErrors.mobile}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Experience Level <span className="text-red-500">*</span></Label>
                      <div className="grid grid-cols-2 gap-3 mt-2">
                        <label
                          className={`flex flex-col items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 text-center ${
                            signupData.experienceLevel === "experienced"
                              ? "border-orange-500 bg-orange-50"
                              : signupErrors.experienceLevel
                              ? "border-red-500 bg-red-50"
                              : "border-gray-200 bg-white hover:border-orange-300 hover:bg-orange-50/30"
                          }`}
                        >
                          <input
                            type="radio"
                            name="experienceLevel"
                            value="experienced"
                            checked={signupData.experienceLevel === "experienced"}
                            onChange={(e) => {
                              setSignupData({ ...signupData, experienceLevel: e.target.value });
                              if (signupErrors.experienceLevel) {
                                setSignupErrors({ ...signupErrors, experienceLevel: "" });
                              }
                            }}
                            className="sr-only"
                            required
                          />
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                            signupData.experienceLevel === "experienced"
                              ? "bg-orange-100"
                              : "bg-gray-100"
                          }`}>
                            <Briefcase className={`w-6 h-6 ${
                              signupData.experienceLevel === "experienced"
                                ? "text-orange-600"
                                : "text-gray-500"
                            }`} />
                          </div>
                          <div className="font-medium text-gray-900 mb-1">I'm experienced</div>
                          <div className="text-xs text-gray-500">I have work experience (excluding internships)</div>
                        </label>
                        <label
                          className={`flex flex-col items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 text-center ${
                            signupData.experienceLevel === "fresher"
                              ? "border-orange-500 bg-orange-50"
                              : signupErrors.experienceLevel
                              ? "border-red-500 bg-red-50"
                              : "border-gray-200 bg-white hover:border-orange-300 hover:bg-orange-50/30"
                          }`}
                        >
                          <input
                            type="radio"
                            name="experienceLevel"
                            value="fresher"
                            checked={signupData.experienceLevel === "fresher"}
                            onChange={(e) => {
                              setSignupData({ ...signupData, experienceLevel: e.target.value });
                              if (signupErrors.experienceLevel) {
                                setSignupErrors({ ...signupErrors, experienceLevel: "" });
                              }
                            }}
                            className="sr-only"
                            required
                          />
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                            signupData.experienceLevel === "fresher"
                              ? "bg-orange-100"
                              : "bg-gray-100"
                          }`}>
                            <GraduationCap className={`w-6 h-6 ${
                              signupData.experienceLevel === "fresher"
                                ? "text-orange-600"
                                : "text-gray-500"
                            }`} />
                          </div>
                          <div className="font-medium text-gray-900 mb-1">I'm a fresher</div>
                          <div className="text-xs text-gray-500">I'm new to the workforce or have only internship experience</div>
                        </label>
                      </div>
                      {signupErrors.experienceLevel && (
                        <p className="text-sm text-red-500 mt-1">{signupErrors.experienceLevel}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currentCity">Current City <span className="text-red-500">*</span></Label>
                      <Input
                        id="currentCity"
                        type="text"
                        placeholder="Enter your current city"
                        value={signupData.currentCity}
                        onChange={(e) => {
                          setSignupData({ ...signupData, currentCity: e.target.value });
                          if (signupErrors.currentCity) {
                            setSignupErrors({ ...signupErrors, currentCity: "" });
                          }
                        }}
                        className={`h-12 rounded-lg border-gray-200 focus:border-orange-500 ${
                          signupErrors.currentCity ? "border-red-500 focus:border-red-500" : ""
                        }`}
                        required
                      />
                      {signupErrors.currentCity && (
                        <p className="text-sm text-red-500 mt-1">{signupErrors.currentCity}</p>
                      )}
                    </div>
                    <Button
                      onClick={handleSignup}
                      className="w-full h-12 bg-orange-600 hover:bg-orange-700 rounded-lg text-base shadow-lg"
                    >
                      Create Account
                    </Button>
                    <div className="text-center text-sm text-gray-600 pt-2">
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => {
                          updateTab('login');
                          setSignupData(prev => ({ ...prev, email: '', mobile: '' }));
                        }}
                        className="text-orange-600 hover:text-orange-700 font-medium underline"
                      >
                        Login
                      </button>
                    </div>
                  </CardContent>
                </>
              ) : (
                <>
                  <CardHeader className="space-y-1 pb-4">
                    <div className="flex items-center mb-2">
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setShowOtpForm(false);
                          setOtp("");
                          setOtpInputs(["", "", "", "", "", ""]);
                        }}
                        className="p-0 h-auto text-gray-600 hover:text-gray-900 -ml-2"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                      </Button>
                    </div>
                    <CardTitle className="text-2xl text-center">Verify OTP</CardTitle>
                    <CardDescription className="text-center">
                      Enter the 6-digit OTP sent to your mobile number.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-6 py-8">
                      <div className="grid gap-4">
                        <Label className="text-base font-medium text-center">Enter OTP</Label>
                        <div className="flex justify-center gap-2 sm:gap-2.5">
                          {[0, 1, 2, 3, 4, 5].map((index) => (
                            <input
                              key={index}
                              ref={(el) => {
                                otpInputRefs.current[index] = el;
                              }}
                              type="tel"
                              inputMode="numeric"
                              pattern="[0-9]"
                              maxLength={1}
                              value={otpInputs[index]}
                              onChange={(e) => handleOtpInputChange(index, e.target.value)}
                              onKeyDown={(e) => handleOtpInputKeyDown(index, e)}
                              onFocus={() => handleOtpInputFocus(index)}
                              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-lg border-2 text-center text-lg sm:text-xl font-bold transition-all duration-200 shadow-sm ${
                                otpInputs[index]
                                  ? "border-orange-500 bg-gradient-to-br from-orange-50 to-orange-100 text-orange-700 shadow-md scale-105"
                                  : "border-gray-300 bg-white text-gray-900 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 hover:border-orange-300 hover:shadow-md"
                              }`}
                              required
                              autoFocus={index === 0}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                          onClick={handleOtpVerification}
                          className="w-full h-12 sm:h-14 bg-orange-600 hover:bg-orange-700 rounded-lg text-base font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={otp.length !== 6}
                        >
                          Verify OTP
                        </Button>
                      </div>
                      <div className="text-center text-xs sm:text-sm text-gray-500">
                        Didn't receive OTP?{" "}
                        <button
                          type="button"
                          onClick={handleResendOtp}
                          disabled={isOtpTimerActive}
                          className={`text-orange-600 hover:text-orange-700 font-medium underline disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline ${
                            isOtpTimerActive ? "cursor-not-allowed" : "cursor-pointer"
                          }`}
                        >
                          {isOtpTimerActive ? `Resend OTP in ${otpTimer}s` : "Resend OTP"}
                        </button>
                        . Check your SMS inbox.
                      </div>
                      <div className="text-center text-sm text-gray-600 pt-2">
                        Already have an account?{" "}
                        <button
                          type="button"
                          onClick={() => {
                            updateTab('login');
                            setSignupData(prev => ({ ...prev, email: '', mobile: '' }));
                          }}
                          className="text-orange-600 hover:text-orange-700 font-medium underline"
                        >
                          Login
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </>
              )}
            </TabsContent>
          </Tabs>
        </Card>

        <Dialog open={isForgotPasswordDialogOpen} onOpenChange={setIsForgotPasswordDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Forgot Password</DialogTitle>
              <DialogDescription>
                To reset your password, we need to verify your identity with your email and phone number.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="forgot-email">Email</Label>
                <Input
                  id="forgot-email"
                  type="email"
                  placeholder="your@email.com"
                  value={forgotPasswordData.email}
                  onChange={(e) => setForgotPasswordData({ ...forgotPasswordData, email: e.target.value })}
                  className="h-12 rounded-lg border-gray-200 focus:border-orange-500"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="forgot-mobile">Mobile Number</Label>
                <input
                  id="forgot-mobile"
                  type="text"
                  placeholder="9876543210"
                  value={forgotPasswordData.mobile}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d{0,10}$/.test(value)) {
                      setForgotPasswordData({ ...forgotPasswordData, mobile: value });
                    }
                  }}
                  pattern="\d{10}"
                  inputMode="numeric"
                  required
                  className="h-12 w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 px-4"
                />
              </div>
              <Button
                onClick={handleForgotPassword}
                className="w-full h-12 bg-orange-600 hover:bg-orange-700 rounded-lg text-base shadow-lg"
                disabled={!forgotPasswordData.email || forgotPasswordData.mobile.length !== 10}
              >
                Send OTP
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={isForgotOtpDialogOpen} onOpenChange={setIsForgotOtpDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Verify OTP</DialogTitle>
              <DialogDescription>
                Enter the 6-digit OTP sent to your mobile and email.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="forgot-otp">OTP</Label>
                <Input
                  id="forgot-otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={forgotOtp}
                  onChange={(e) => setForgotOtp(e.target.value)}
                  maxLength={6}
                  className="h-12 rounded-lg border-gray-200 focus:border-orange-500"
                  required
                />
              </div>
              <div className="flex gap-4">
                <Button
                  onClick={handleForgotOtpVerification}
                  className="w-full h-12 bg-orange-600 hover:bg-orange-700 rounded-lg text-base shadow-lg"
                  disabled={!forgotOtp || forgotOtp.length !== 6}
                >
                  Verify OTP
                </Button>
                <Button
                  onClick={handleForgotPassword}
                  variant="outline"
                  className="w-full h-12 rounded-lg text-base"
                  disabled={isForgotOtpTimerActive}
                >
                  {isForgotOtpTimerActive ? `Resend OTP in ${forgotOtpTimer}s` : "Resend OTP"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={isResetPasswordDialogOpen} onOpenChange={setIsResetPasswordDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Reset Password</DialogTitle>
              <DialogDescription>
                Enter your new password and confirm it.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="new-password">New Password</Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={forgotPasswordData.newPassword}
                    onChange={(e) => setForgotPasswordData({ ...forgotPasswordData, newPassword: e.target.value })}
                    className="h-12 rounded-lg border-gray-200 focus:border-orange-500 pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-new-password">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirm-new-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={forgotPasswordData.confirmPassword}
                    onChange={(e) => setForgotPasswordData({ ...forgotPasswordData, confirmPassword: e.target.value })}
                    className="h-12 rounded-lg border-gray-200 focus:border-orange-500 pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <Button
                onClick={handleResetPassword}
                className="w-full h-12 bg-orange-600 hover:bg-orange-700 rounded-lg text-base shadow-lg"
                disabled={!forgotPasswordData.newPassword || !forgotPasswordData.confirmPassword}
              >
                Reset Password
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <p className="text-center text-sm text-gray-500 mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}