"use client";
import React, { useState, useRef, useEffect } from 'react';

interface OTPModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (otp: string) => Promise<void>;
  onSendOTP: () => Promise<void>;
  isSubmitting?: boolean;
  showToast?: (message: string, type: 'success' | 'error') => void;
}

const OTPModal: React.FC<OTPModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onSendOTP,
  isSubmitting = false,
  showToast,
}) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [otpTimer, setOtpTimer] = useState(60);
  const [isResendingOTP, setIsResendingOTP] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const hasSentOTPRef = useRef(false);
  const onSendOTPRef = useRef(onSendOTP);
  const showToastRef = useRef(showToast);

  // Update refs when props change
  useEffect(() => {
    onSendOTPRef.current = onSendOTP;
    showToastRef.current = showToast;
  }, [onSendOTP, showToast]);

  // Debug: Log error message changes
  useEffect(() => {
    if (errorMessage) {
      console.log('Error message set in OTPModal:', errorMessage);
    }
  }, [errorMessage]);

  // Timer effect for OTP resend
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOpen && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isOpen, otpTimer]);

  // Reset timer and send OTP when modal opens
  useEffect(() => {
    if (isOpen && !hasSentOTPRef.current) {
      setOtpTimer(60);
      setOtp(['', '', '', '']);
      setErrorMessage(''); // Clear error message when modal opens
      hasSentOTPRef.current = true;
      
      // Send OTP API call
      const sendOTP = async () => {
        try {
          await onSendOTPRef.current();
          console.log('OTP sent successfully');
          setErrorMessage(''); // Clear any previous errors
        } catch (error: any) {
          console.error('Failed to send OTP:', error);
          const errorMsg = error?.response?.data?.message || 'Failed to send OTP. Please try again.';
          setErrorMessage(errorMsg);
          if (showToastRef.current) {
            showToastRef.current(errorMsg, 'error');
          }
        }
      };
      
      sendOTP();
      
      // Focus first input when modal opens
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 200);
    } else if (!isOpen) {
      // Reset the flag and error message when modal closes
      hasSentOTPRef.current = false;
      setErrorMessage('');
    }
  }, [isOpen]);

  const handleOTPChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Clear error message when user starts typing
    if (errorMessage) {
      setErrorMessage('');
    }

    // Auto-focus next input when a digit is entered
    if (value && index < 3) {
      setTimeout(() => {
        otpInputRefs.current[index + 1]?.focus();
      }, 0);
    }
  };

  const handleOTPKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle Enter key to submit
    if (e.key === 'Enter') {
      e.preventDefault();
      const otpValue = otp.join('');
      if (otpValue.length === 4 && !isSubmitting) {
        handleOTPSubmit();
      }
      return;
    }
    
    // Handle backspace
    if (e.key === 'Backspace') {
      if (otp[index]) {
        // If current field has value, clear it
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0) {
        // If current field is empty, move to previous and clear it
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        setTimeout(() => {
          otpInputRefs.current[index - 1]?.focus();
        }, 0);
      }
    }
    
    // Handle arrow keys for navigation
    if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      otpInputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowRight' && index < 3) {
      e.preventDefault();
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOTPPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    const digits = pastedData.replace(/\D/g, '').slice(0, 4).split('');
    
    if (digits.length > 0) {
      const newOtp = ['', '', '', ''];
      digits.forEach((digit, idx) => {
        if (idx < 4) {
          newOtp[idx] = digit;
        }
      });
      setOtp(newOtp);
      
      // Focus the next empty input or the last input
      const nextIndex = Math.min(digits.length, 3);
      setTimeout(() => {
        otpInputRefs.current[nextIndex]?.focus();
      }, 0);
    }
  };

  const handleResendOTP = async () => {
    if (otpTimer > 0) return;
    
    setIsResendingOTP(true);
    setErrorMessage(''); // Clear previous error
    try {
      await onSendOTP();
      setOtpTimer(60);
      setOtp(['', '', '', '']);
      setErrorMessage(''); // Clear error on success
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 0);
      if (showToast) {
        showToast('OTP resent successfully', 'success');
      }
    } catch (error: any) {
      console.error('Failed to resend OTP:', error);
      const errorMsg = error?.response?.data?.message || 'Failed to resend OTP. Please try again.';
      setErrorMessage(errorMsg);
      if (showToast) {
        showToast(errorMsg, 'error');
      }
    } finally {
      setIsResendingOTP(false);
    }
  };

  const handleOTPSubmit = async () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 4) {
      const errorMsg = 'Please enter a valid 4-digit OTP';
      console.log('Setting error for invalid OTP length');
      setErrorMessage(errorMsg);
      if (showToast) {
        showToast(errorMsg, 'error');
      }
      return;
    }

   
    setErrorMessage(''); // Clear previous error
    
    try {
        console.log('Calling onSubmit with OTP:', otpValue);
      const response = await onSubmit(otpValue);
      console.log('API Response:', response);

      setErrorMessage(''); // Clear error on success
    } catch (error: any) {
     
      
      
      // Extract error message from the error object - try multiple paths
      // Handle different error response structures
      let errorMsg = 'Invalid OTP. Please try again.';
      
      // Check for axios error format: error.response.data.error.message (nested, check first)
      if (error?.response?.data?.error?.message) {
        errorMsg = error.response.data.error.message;
        console.log('Using error.response.data.error.message:', errorMsg);
      }
      // Check for axios error format: error.response.data.message
      else if (error?.response?.data?.message) {
        errorMsg = error.response.data.message;
        console.log('Using error.response.data.message:', errorMsg);
      }
      // Check for direct error object: error.error.message
      else if (error?.error?.message) {
        errorMsg = error.error.message;
        console.log('Using error.error.message:', errorMsg);
      }
      // Check for direct message: error.message
      else if (error?.message) {
        errorMsg = error.message;
        console.log('Using error.message:', errorMsg);
      }
      // Check for response data message directly
      else if (error?.response?.data?.error) {
        errorMsg = typeof error.response.data.error === 'string' 
          ? error.response.data.error 
          : error.response.data.error.message || 'Invalid OTP. Please try again.';
        console.log('Using error.response.data.error:', errorMsg);
      }
      // Check if error is a string
      else if (typeof error === 'string') {
        errorMsg = error;
        console.log('Using error as string:', errorMsg);
      }
      
      console.log('=== SETTING ERROR MESSAGE ===', errorMsg);
      console.log('About to call setErrorMessage with:', errorMsg);
      
      // Use a function form of setState to ensure it updates
      setErrorMessage((prev) => {
        console.log('setErrorMessage callback - prev:', prev, 'new:', errorMsg);
        return errorMsg;
      });
      
      // Also set it directly
      setErrorMessage(errorMsg);
      
      // Verify it was set
      setTimeout(() => {
        console.log('Error message state after setTimeout (checking via ref would be better):', errorMsg);
      }, 100);
      
      if (showToast) {
        showToast(errorMsg, 'error');
      }
      
      // Don't re-throw - we've handled it
    } 
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="otp-modal-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity" 
        onClick={() => !isSubmitting && onClose()}
      ></div>
      
      {/* Modal Content */}
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
          <div className="bg-white px-6 pt-6 pb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900" id="otp-modal-title">
                Enter OTP
              </h3>
              <button
                type="button"
                onClick={() => !isSubmitting && onClose()}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                disabled={isSubmitting}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Please enter the 4-digit OTP sent to your mobile number and email address.
            </p>
            
            {/* Error Message */}
            {errorMessage ? (
              <div className="mb-4 p-3 bg-red-50 border-2 border-red-300 rounded-lg shadow-sm animate-in fade-in duration-200">
                <div className="flex items-start">
                  <svg className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm font-medium text-red-800">{errorMessage}</p>
                </div>
              </div>
            ) : null}
            
            
            
            <div className="flex justify-center gap-3 mb-6">
              {[0, 1, 2, 3].map((index) => (
                <input
                  key={index}
                  ref={(el) => {
                    if (el) otpInputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={otp[index]}
                  onChange={(e) => handleOTPChange(index, e.target.value)}
                  onKeyDown={(e) => handleOTPKeyDown(index, e)}
                  onPaste={handleOTPPaste}
                  disabled={isSubmitting}
                  autoComplete="off"
                  className="w-14 h-14 text-center text-2xl font-semibold border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              ))}
            </div>

            <div className="flex items-center justify-between mb-6">
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={otpTimer > 0 || isResendingOTP || isSubmitting}
                className={`text-sm font-medium transition-colors ${
                  otpTimer > 0 || isResendingOTP || isSubmitting
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-orange-600 hover:text-orange-700'
                }`}
              >
                {isResendingOTP ? 'Resending...' : 'Resend OTP'}
              </button>
              <div className="text-sm text-gray-600">
                {otpTimer > 0 ? (
                  <span>Resend in <span className="font-semibold text-orange-600">{otpTimer}s</span></span>
                ) : (
                  <span className="text-gray-400">OTP can be resent</span>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => !isSubmitting && onClose()}
                disabled={isSubmitting}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleOTPSubmit}
                disabled={isSubmitting || otp.join('').length !== 4}
                className="flex-1 px-4 py-2.5 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPModal;

