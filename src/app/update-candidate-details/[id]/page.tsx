"use client";
import axios from 'axios';
import React, { useState, useRef, useEffect, useLayoutEffect, use } from 'react';
import { useSearchParams } from 'next/navigation';
import { getInitialDataAPI, submitAdditionalDetailsAPI, sendOTPAPI } from '../../components/services/candidateapi';
import Footer from '@/app/components/pages/footer';
import Header from '@/app/components/pages/header';
import { State, City } from 'country-state-city';

interface CustomDropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
  id?: string;
  name?: string;
  disabled?: boolean;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder,
  required = false,
  id,
  name,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    // Reset highlighted index when search query changes
    setHighlightedIndex(-1);
  }, [searchQuery]);

  useEffect(() => {
    // Scroll highlighted option into view
    if (highlightedIndex >= 0 && optionRefs.current[highlightedIndex]) {
      optionRefs.current[highlightedIndex]?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }, [highlightedIndex]);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
    setSearchQuery('');
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightedIndex((prev) => {
            const next = prev < filteredOptions.length - 1 ? prev + 1 : 0;
            return next;
          });
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (isOpen) {
          setHighlightedIndex((prev) => {
            const next = prev > 0 ? prev - 1 : filteredOptions.length - 1;
            return next;
          });
        }
        break;
      case 'Enter':
        e.preventDefault();
        if (isOpen && highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          handleSelect(filteredOptions[highlightedIndex]);
        } else if (!isOpen) {
          setIsOpen(true);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setSearchQuery('');
        setHighlightedIndex(-1);
        break;
      case 'Tab':
        setIsOpen(false);
        setSearchQuery('');
        setHighlightedIndex(-1);
        break;
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) => {
          const next = prev < filteredOptions.length - 1 ? prev + 1 : 0;
          return next;
        });
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => {
          const next = prev > 0 ? prev - 1 : filteredOptions.length - 1;
          return next;
        });
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          handleSelect(filteredOptions[highlightedIndex]);
        } else if (filteredOptions.length === 1) {
          handleSelect(filteredOptions[0]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setSearchQuery('');
        setHighlightedIndex(-1);
        break;
    }
  };

  const selectedLabel = value || placeholder;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={`w-full px-4 py-2.5 pr-10 border-2 rounded-lg text-left transition-all duration-200 appearance-none font-medium flex items-center justify-between text-sm ${
          disabled
            ? 'bg-gray-100 cursor-not-allowed border-gray-300 text-gray-500'
            : isOpen
            ? 'bg-white border-orange-200 ring-2 ring-orange-200 cursor-pointer shadow-sm hover:shadow-md'
            : value
            ? 'bg-white border-gray-300 hover:border-orange-200 cursor-pointer shadow-sm hover:shadow-md'
            : 'bg-white border-gray-300 hover:border-orange-200 cursor-pointer shadow-sm hover:shadow-md'
        } ${!value && !disabled ? 'text-gray-400' : disabled ? 'text-gray-500' : 'text-gray-900'}`}
      >
        <span>{selectedLabel}</span>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-lg shadow-xl max-h-60 overflow-hidden flex flex-col">
          <div className="p-2 border-b border-gray-200 sticky top-0 bg-white">
            <div className="relative">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder="Search..."
                className="w-full px-3 py-1.5 pl-10 border border-gray-300 rounded-md text-gray-900 bg-white focus:ring-2 focus:ring-orange-200 focus:border-orange-200 outline-none text-sm"
                onClick={(e) => e.stopPropagation()}
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          <div className="overflow-y-auto max-h-48">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <button
                  key={index}
                  ref={(el) => {
                    optionRefs.current[index] = el;
                  }}
                  type="button"
                  onClick={() => handleSelect(option)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={`w-full px-3 py-2 text-left transition-colors duration-150 text-sm ${
                    value === option
                      ? highlightedIndex === index
                        ? 'bg-orange-100 text-orange-700 font-medium'
                        : 'bg-orange-50 text-orange-600 font-medium'
                      : highlightedIndex === index
                      ? 'bg-orange-100 text-orange-700'
                      : 'text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {option}
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-gray-200 text-center text-sm">
                No results found
              </div>
            )}
          </div>
        </div>
      )}

      <input
        type="hidden"
        id={id}
        name={name}
        value={value}
        required={required}
      />
    </div>
  );
};

const ContactFormPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const searchParams = useSearchParams();
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    panNumber: '',
    aadharNumber: '',
    qualification: '',
    previousExperience: '',
    currentStreetAddress: '',
    currentArea: '',
    currentCity: '',
    currentState: '',
    currentPincode: '',
    permanentStreetAddress: '',
    permanentArea: '',
    permanentCity: '',
    permanentState: '',
    permanentPincode: '',
    alternateMobileNumber: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sameAsCurrentAddress, setSameAsCurrentAddress] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'error' | 'success' } | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [otpTimer, setOtpTimer] = useState(60);
  const [isResendingOTP, setIsResendingOTP] = useState(false);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [currentCities, setCurrentCities] = useState<string[]>([]);
  const [permanentCities, setPermanentCities] = useState<string[]>([]);
  const [loadingCurrentCities, setLoadingCurrentCities] = useState(false);
  const [loadingPermanentCities, setLoadingPermanentCities] = useState(false);

  const [indianStates, setIndianStates] = useState<any[]>([]);
 

  useLayoutEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        setHasError(false);
        
        // Load states first
        const states = State.getStatesOfCountry("IN");
        setIndianStates(states);
        
        const response = await getInitialDataAPI(id || undefined);
       
        if(response && response.status ==="success"){
          const data = response.data;
          // Check if addresses are the same
          const addressesMatch = 
            data.currentAddress && data.permanentAddress &&
            data.currentAddress.street === data.permanentAddress.street &&
            data.currentAddress.area === data.permanentAddress.area &&
            data.currentAddress.city === data.permanentAddress.city &&
            data.currentAddress.state === data.permanentAddress.state &&
            data.currentAddress.pincode === data.permanentAddress.pincode;
          
          setSameAsCurrentAddress(addressesMatch);
          
          setFormData(prev => ({
            ...prev,
            name: data.name || '',
            email: data.email || '',
            phone: data.phone || '',
            alternateMobileNumber: data.additionalDetails?.alternateMobileNumber || '',
            panNumber: data.additionalDetails?.panNumber || '',
            aadharNumber: data?.aadharNumber || '',
            qualification: data.additionalDetails?.qualification || '',
            previousExperience: data.additionalDetails?.previousExperience || '',
            currentStreetAddress: data.additionalDetails?.currentAddress?.street || '',
            currentArea: data.additionalDetails?.currentAddress?.area || '',
            currentCity: data.additionalDetails?.currentAddress?.city || '',
            currentState: data.additionalDetails?.currentAddress?.state || '',
            currentPincode: data.additionalDetails?.currentAddress?.pincode || '',
            permanentStreetAddress: data.additionalDetails?.permanentAddress?.street || '',
            permanentArea: data.additionalDetails?.permanentAddress?.area || '',
            permanentCity: data.additionalDetails?.permanentAddress?.city || '',
            permanentState: data.additionalDetails?.permanentAddress?.state || '',
            permanentPincode: data.additionalDetails?.permanentAddress?.pincode || '',
          }));

          // Fetch cities for current state if state exists
          if (data.additionalDetails?.currentAddress?.state) {
            setLoadingCurrentCities(true);
            try {
              // Find state code from state name
              const stateObj = states.find((s: any) => s.name === data.additionalDetails.currentAddress.state);
              if (stateObj) {
                const cities = City.getCitiesOfState("IN", stateObj.isoCode);
                setCurrentCities(cities.map(city => city.name));
              }
            } catch (error: any) {
              console.error('Failed to fetch current cities:', error);
            } finally {
              setLoadingCurrentCities(false);
            }
          }

          // Fetch cities for permanent state if state exists and addresses don't match
          if (data.additionalDetails?.permanentAddress?.state && !addressesMatch) {
            setLoadingPermanentCities(true);
            try {
              // Find state code from state name
              const stateObj = states.find((s: any) => s.name === data.additionalDetails.permanentAddress.state);
              if (stateObj) {
                const cities = City.getCitiesOfState("IN", stateObj.isoCode);
                setPermanentCities(cities.map(city => city.name));
              }
            } catch (error: any) {
              console.error('Failed to fetch permanent cities:', error);
            } finally {
              setLoadingPermanentCities(false);
            }
          }
        } else {
          setHasError(true);
        }
      } catch (error) {
        console.error('Error fetching initial data:', error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, [id]);

  const qualificationOptions = [
    '10th',
    '12th',
    'ITI',
    'Diploma',
    'Vocational Course',
    'Graduation (10 + 2 + 3)',
    'Graduation (10 + 2 + 4)',
    'Post Graduation',
    'Post Diploma',
    'Professional PG',
    'MPhil',
    'PhD',
    'Post Doctorate',
    'CA',
    'CMA',
    'CS',
    'LLB',
    'LLM',
    'MBBS',
    'MD',
    'BDS',
    'Associate Degree',
    'No Formal Education',
    'Other'
  ];

  const experienceOptions = [
    'Fresher',
    '0-2 years in BFSI / Fintech',
    '2+ years in BFSI / Fintech',
    '0-2 years in another industry',
    '2+ years in another industry'
  ];



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let processedValue = value;
    
    // For alternate mobile number, only allow numbers and limit to 10 digits
    if (name === 'alternateMobileNumber') {
      processedValue = value.replace(/\D/g, '').slice(0, 10);
    }
    
    // For pincode fields, only allow numbers and limit to 6 digits
    if (name === 'currentPincode' || name === 'permanentPincode') {
      processedValue = value.replace(/\D/g, '').slice(0, 6);
    }
    
    // For aadhar number, only allow numbers and limit to 12 digits
    if (name === 'aadharNumber') {
      processedValue = value.replace(/\D/g, '').slice(0, 12);
    }
    
    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: processedValue,
      };
      // If same as current address is checked, copy all current address fields to permanent
      // Note: City and State are handled in handleDropdownChange
      if (sameAsCurrentAddress && (
        name === 'currentStreetAddress' || 
        name === 'currentArea' || 
        name === 'currentPincode'
      )) {
        if (name === 'currentStreetAddress') updated.permanentStreetAddress = processedValue;
        if (name === 'currentArea') updated.permanentArea = processedValue;
        if (name === 'currentPincode') updated.permanentPincode = processedValue;
      }
      return updated;
    });
  };

  const handleSameAsCurrentAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setSameAsCurrentAddress(checked);
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        permanentStreetAddress: prev.currentStreetAddress,
        permanentArea: prev.currentArea,
        permanentCity: prev.currentCity,
        permanentState: prev.currentState,
        permanentPincode: prev.currentPincode,
      }));
      // Copy cities list to permanent cities
      setPermanentCities([...currentCities]);
    } else {
      // Clear permanent cities when unchecked
      setPermanentCities([]);
    }
  };

  const handleDropdownChange = async (name: string, value: string) => {
    setFormData((prev) => {
      const updated = {
      ...prev,
      [name]: value,
      };
      // If same as current address is checked and current state is changed, copy to permanent
      if (sameAsCurrentAddress && name === 'currentState') {
        updated.permanentState = value;
      }
      // If same as current address is checked and current city is changed, copy to permanent
      if (sameAsCurrentAddress && name === 'currentCity') {
        updated.permanentCity = value;
      }
      return updated;
    });

    // Fetch cities when state changes using country-state-city library
    if (name === 'currentState') {
      setLoadingCurrentCities(true);
      setCurrentCities([]);
      setFormData((prev) => ({ ...prev, currentCity: '' })); // Clear city when state changes
      try {
        // Find state code from state name
        const stateObj = indianStates.find(s => s.name === value);
        if (stateObj) {
          const cities = City.getCitiesOfState("IN", stateObj.isoCode);
          const cityNames = cities.map(city => city.name);
          setCurrentCities(cityNames);
          
          // If same as current address is checked, also update permanent cities
          if (sameAsCurrentAddress) {
            setPermanentCities(cityNames);
          }
        } else {
          setCurrentCities([]);
          if (sameAsCurrentAddress) {
            setPermanentCities([]);
          }
        }
      } catch (error: any) {
        console.error('Failed to fetch cities:', error);
        setCurrentCities([]);
        if (sameAsCurrentAddress) {
          setPermanentCities([]);
        }
      } finally {
        setLoadingCurrentCities(false);
      }
    } else if (name === 'permanentState') {
      setLoadingPermanentCities(true);
      setPermanentCities([]);
      setFormData((prev) => ({ ...prev, permanentCity: '' })); // Clear city when state changes
      try {
        // Find state code from state name
        const stateObj = indianStates.find(s => s.name === value);
        if (stateObj) {
          const cities = City.getCitiesOfState("IN", stateObj.isoCode);
          const cityNames = cities.map(city => city.name);
          setPermanentCities(cityNames);
        } else {
          setPermanentCities([]);
        }
      } catch (error: any) {
        console.error('Failed to fetch cities:', error);
        setPermanentCities([]);
      } finally {
        setLoadingPermanentCities(false);
      }
    }
  };

  const clearForm = () => {
    setFormData(prev => ({
      ...prev,
      panNumber: '',
      aadharNumber: '',
      qualification: '',
      previousExperience: '',
      currentStreetAddress: '',
      currentArea: '',
      currentCity: '',
      currentState: '',
      currentPincode: '',
      permanentStreetAddress: '',
      permanentArea: '',
      permanentCity: '',
      permanentState: '',
      permanentPincode: '',
      alternateMobileNumber: '',
    }));
    setSameAsCurrentAddress(false);
    setCurrentCities([]);
    setPermanentCities([]);
  };

  const validateForm = (): string | null => {
    // Validate alternate mobile number (optional, but if provided, must be 3-10 digits)
    if (formData.alternateMobileNumber) {
      if (formData.alternateMobileNumber.length < 3) {
        return 'Alternate Mobile Number must be at least 3 characters';
      }
      if (formData.alternateMobileNumber.length > 10) {
        return 'Alternate Mobile Number must not exceed 10 characters';
      }
    }

    // Validate PAN number
    if (!formData.panNumber || formData.panNumber.length !== 10) {
      return 'PAN Card Number is required and must be exactly 10 characters';
    }

    // Validate Aadhar number
    if (!formData.aadharNumber || formData.aadharNumber.length !== 12) {
      return 'Aadhar Number is required and must be exactly 12 digits';
    }

    // Validate qualification
    if (!formData.qualification || formData.qualification.length < 2) {
      return 'Qualification is required and must be at least 3 characters';
    }

    // Validate previous experience
    if (!formData.previousExperience) {
      return 'Previous Experience is required.';
    }

    // Validate current address
    if (!formData.currentStreetAddress || formData.currentStreetAddress.length < 3) {
      return 'Current Street Address is required and must be at least 3 characters';
    }
    if (!formData.currentArea || formData.currentArea.length < 3) {
      return 'Current Area/Locality is required and must be at least 3 characters';
    }
    if (!formData.currentCity) {
      return 'Current City is required';
    }
    if (!formData.currentState || formData.currentState.length < 3) {
      return 'Current State is required';
    }
    if (!formData.currentPincode || formData.currentPincode.length !== 6) {
      return 'Current Pin Code is required and must be exactly 6 digits';
    }

    // Validate permanent address (only if not same as current)
    if (!sameAsCurrentAddress) {
      if (!formData.permanentStreetAddress || formData.permanentStreetAddress.length < 3) {
        return 'Permanent Street Address is required and must be at least 3 characters';
      }
      if (!formData.permanentArea || formData.permanentArea.length < 3) {
        return 'Permanent Area/Locality is required and must be at least 3 characters';
      }
      if (!formData.permanentCity) {
        return 'Permanent City is required';
      }
      if (!formData.permanentState || formData.permanentState.length < 3) {
        return 'Permanent State is required';
      }
      if (!formData.permanentPincode || formData.permanentPincode.length !== 6) {
        return 'Permanent Pin Code is required and must be exactly 6 digits';
      }
    }

    return null;
  };

  const showToast = (message: string, type: 'error' | 'success' = 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  // Timer effect for OTP resend
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (showOTPModal && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [showOTPModal, otpTimer]);

  // Reset timer and send OTP when modal opens
  useEffect(() => {
    if (showOTPModal) {
      setOtpTimer(60);
      setOtp(['', '', '', '']);
      
      // Send OTP API call
      const sendOTP = async () => {
        try {
          await sendOTPAPI(id || undefined);
          console.log('OTP sent successfully');
        } catch (error) {
          console.error('Failed to send OTP:', error);
          showToast('Failed to send OTP. Please try again.', 'error');
        }
      };
      
      sendOTP();
      
      // Focus first input when modal opens - use longer timeout to ensure modal is rendered
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 200);
    }
  }, [showOTPModal, id]);

  const handleOTPChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

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
    try {
      // Call API to resend OTP
      await sendOTPAPI(id || undefined);
      setOtpTimer(60);
      setOtp(['', '', '', '']);
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 0);
      showToast('OTP resent successfully', 'success');
    } catch (error) {
      console.error('Failed to resend OTP:', error);
      showToast('Failed to resend OTP. Please try again.', 'error');
    } finally {
      setIsResendingOTP(false);
    }
  };

  const handleOTPSubmit = async () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 4) {
      showToast('Please enter a valid 4-digit OTP', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare form data with OTP
      const submissionData = {
        ...formData,
        otp: otpValue,
      };

      console.log('Form submitted with OTP:', submissionData);
      const response = await submitAdditionalDetailsAPI(id || undefined, submissionData);
      console.log('Response:', response);
      
      // Close OTP modal and show success
      setShowOTPModal(false);
      showToast('Form submitted successfully!', 'success');
    } catch (error) {
      console.log('Form submission error:', error.response);
      if(error.response.status === 400 && error.response.data.message.includes('OTP')) {
      if (error.response.data.message === 'Invalid OTP') {
        showToast('Invalid OTP. Please try again.', 'error');
      }else if(error.response.data.message === "OTP expired") {
        showToast('OTP expired. Please try again.', 'error');
      }else {
        showToast('Failed to submit form. Please try again.', 'error');
      }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form
    const validationError = validateForm();
    if (validationError) {
      showToast(validationError, 'error');
      setIsSubmitting(false);
      return;
    }

    // Show OTP modal instead of submitting directly
    setShowOTPModal(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-200 mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
    <Header/>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}} />
     
      {showOTPModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="otp-modal-title" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => !isSubmitting && setShowOTPModal(false)}></div>
          
          {/* Modal Content */}
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
              <div className="bg-white px-6 pt-6 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900" id="otp-modal-title">
                    Enter OTP
                  </h3>
                  <button
                    type="button"
                    onClick={() => !isSubmitting && setShowOTPModal(false)}
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
                    onClick={() => !isSubmitting && setShowOTPModal(false)}
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
      )}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowSuccessModal(false)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Success!
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Your form has been submitted successfully. We will review your details and get back to you soon.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-500 text-base font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {toast && (
        <div 
          className="fixed top-4 right-4 z-50"
          style={{
            animation: 'slideInRight 0.3s ease-out',
          }}
        >
          <div className={`rounded-xl shadow-2xl p-4 min-w-[320px] max-w-md backdrop-blur-sm ${
            toast.type === 'error' 
              ? 'bg-white border border-red-200' 
              : 'bg-white border border-green-200'
          }`}>
            <div className="flex items-start">
              <div className={`flex-shrink-0 rounded-full p-2 ${
                toast.type === 'error' ? 'bg-red-100' : 'bg-green-100'
              }`}>
                {toast.type === 'error' ? (
                  <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <div className="ml-3 flex-1">
                <p className={`text-sm font-semibold ${
                  toast.type === 'error' ? 'text-red-900' : 'text-green-900'
                }`}>
                  {toast.type === 'error' ? 'Error' : 'Success'}
                </p>
                <p className={`text-sm mt-1 ${
                  toast.type === 'error' ? 'text-red-700' : 'text-green-700'
                }`}>
                  {toast.message}
                </p>
              </div>
              <button
                onClick={() => setToast(null)}
                className="ml-3 flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-8 pt-8">
       
        <div className="mb-6">
         
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Quote */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28">
              <p className="text-lg text-gray-700 leading-relaxed italic">
                &ldquo;Join us as a Business Development Executive at Phonepe. Drive new client acquisition, identify growth opportunities, manage outreach campaigns and build lasting relationships. Use proactive outreach, lead generation, and negotiation skills to grow revenue. Ideal for an ambitious go-getter ready to make an impact.&rdquo;
              </p>
            </div>
          </div>
          
          {/* Right Column - Form */}
          <div className="col-span-1 lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-5">
      {hasError && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                Something went wrong. Please contact your recruiter.
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label 
          htmlFor="name" 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          readOnly
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-gray-900 bg-gray-100 cursor-not-allowed text-sm"
          placeholder="Enter your name"
        />
      </div>

      <div>
        <label 
          htmlFor="email" 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          readOnly
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-gray-900 bg-gray-100 cursor-not-allowed text-sm"
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label 
          htmlFor="phone" 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Mobile Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          readOnly
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-gray-900 bg-gray-100 cursor-not-allowed text-sm"
          placeholder="Enter your phone number"
        />
        </div>
      </div>

      <div>
        <label 
          htmlFor="alternateMobileNumber" 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Alternate Mobile Number
        </label>
        <input
          type="tel"
          id="alternateMobileNumber"
          name="alternateMobileNumber"
          value={formData.alternateMobileNumber}
          onChange={handleChange}
          minLength={3}
          maxLength={10}
          pattern="[0-9]{3,10}"
          inputMode="numeric"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-gray-900 bg-white focus:ring-2 focus:ring-orange-200 focus:border-orange-200 outline-none transition-colors text-sm"
          placeholder="Enter alternate mobile number (3-10 digits)"
        />
      </div>

     

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label 
            htmlFor="panNumber" 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          PAN number <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
            id="panNumber"
            name="panNumber"
            value={formData.panNumber}
          onChange={handleChange}
            minLength={10}
            maxLength={10}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-gray-900 bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-200 outline-none transition-colors uppercase text-sm"
          placeholder="Enter PAN number (10 characters)"
          required
        />
      </div>

      <div>
        <label 
          htmlFor="aadharNumber" 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Aadhar Number <span className="text-red-500">*</span>
        </label>
          <input
          type="text"
          id="aadharNumber"
          name="aadharNumber"
          value={formData.aadharNumber}
          onChange={handleChange}
          minLength={12}
          maxLength={12}
          pattern="[0-9]{12}"
          inputMode="numeric"
          required
          className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-gray-900 bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-200 outline-none transition-colors text-sm"
          placeholder="Enter Aadhar number (12 digits)"
        />
      </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label 
          htmlFor="qualification" 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Qualification<span className="text-red-500">*</span>
        </label>
        <CustomDropdown
          id="qualification"
          name="qualification"
          options={qualificationOptions}
          value={formData.qualification}
          onChange={(value) => handleDropdownChange('qualification', value)}
          placeholder="Select qualification"
          required
        />
      </div>

      <div>
        <label 
          htmlFor="previousExperience" 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Candidate Previous Experience <span className="text-red-500">*</span>
        </label>
        <CustomDropdown
          id="previousExperience"
          name="previousExperience"
          options={experienceOptions}
          value={formData.previousExperience}
          onChange={(value) => handleDropdownChange('previousExperience', value)}
          placeholder="Select experience"
          required
        />
      </div>
      </div>
      </div>
      <div className="space-y-4 bg-gray-50 p-5 rounded-lg border border-gray-200">
        <h3 className="text-base font-semibold text-gray-800 mb-1">Current Address</h3>

      <div>
        <label 
            htmlFor="currentStreetAddress" 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
            Street Address <span className="text-red-500">*</span>
        </label>
          <input
            type="text"
            id="currentStreetAddress"
            name="currentStreetAddress"
            value={formData.currentStreetAddress}
          onChange={handleChange}
            minLength={3}
          required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-gray-900 bg-white focus:ring-2 focus:ring-orange-200 focus:border-orange-200 outline-none transition-colors text-sm"
            placeholder="Enter street address"
        />
      </div>

      <div>
        <label 
            htmlFor="currentArea" 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
            Area/Locality <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
            id="currentArea"
            name="currentArea"
            value={formData.currentArea}
          onChange={handleChange}
            minLength={3}
          required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-gray-900 bg-white focus:ring-2 focus:ring-orange-200 focus:border-orange-200 outline-none transition-colors text-sm"
            placeholder="Enter area/locality"
        />
      </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label 
              htmlFor="currentState" 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
              State <span className="text-red-500">*</span>
        </label>
        <CustomDropdown
              id="currentState"
              name="currentState"
              options={indianStates?.map((state) => state.name)}
              value={formData.currentState}
              onChange={(value) => handleDropdownChange('currentState', value)}
              placeholder="Select state"
          required
        />
      </div>

      <div>
        <label 
              htmlFor="currentCity" 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
              City <span className="text-red-500">*</span>
        </label>
        {loadingCurrentCities ? (
          <div className="w-full px-4 py-2.5 border border-gray-300 rounded-md bg-gray-50 text-gray-500 text-sm flex items-center">
            <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500 mr-2"></div>
            Loading cities...
          </div>
        ) : (
        <CustomDropdown
            id="currentCity"
            name="currentCity"
            options={currentCities}
            value={formData.currentCity}
            onChange={(value) => handleDropdownChange('currentCity', value)}
            placeholder={formData.currentState ? (currentCities.length === 0 ? "No cities found" : "Select city") : "Select state first"}
          required
            disabled={!formData.currentState || currentCities.length === 0}
        />
        )}
      </div>
      </div>

      <div>
        <label 
              htmlFor="currentPincode" 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
              Pin Code <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
              id="currentPincode"
              name="currentPincode"
              value={formData.currentPincode}
          onChange={handleChange}
              minLength={6}
              maxLength={6}
              pattern="[0-9]{6}"
              inputMode="numeric"
          required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-gray-900 bg-white focus:ring-2 focus:ring-orange-200 focus:border-orange-200 outline-none transition-colors text-sm"
              placeholder="Enter pincode (6 digits)"
        />
      </div>
      </div>

      <div className="mb-4">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={sameAsCurrentAddress}
            onChange={handleSameAsCurrentAddress}
            className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-200 cursor-pointer"
          />
          <span className="ml-2 text-sm text-gray-700">
            Permanent address same as current address
          </span>
        </label>
      </div>

      <div className="space-y-4 bg-gray-50 p-5 rounded-lg border border-gray-200">
        <h3 className="text-base font-semibold text-gray-800 mb-1">Permanent Address</h3>

      <div>
        <label 
            htmlFor="permanentStreetAddress" 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
            Street Address {!sameAsCurrentAddress && <span className="text-red-500">*</span>}
          </label>
          <input
            type="text"
            id="permanentStreetAddress"
            name="permanentStreetAddress"
            value={formData.permanentStreetAddress}
            onChange={handleChange}
            disabled={sameAsCurrentAddress}
            minLength={3}
            required={!sameAsCurrentAddress}
            className={`w-full px-4 py-2.5 border border-gray-300 rounded-md text-gray-900 focus:ring-2 focus:ring-orange-200 focus:border-orange-200 outline-none transition-colors text-sm ${
              sameAsCurrentAddress ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
            }`}
            placeholder="Enter street address"
          />
        </div>

        <div>
          <label 
            htmlFor="permanentArea" 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Area/Locality {!sameAsCurrentAddress && <span className="text-red-500">*</span>}
          </label>
          <input
            type="text"
            id="permanentArea"
            name="permanentArea"
            value={formData.permanentArea}
            onChange={handleChange}
            disabled={sameAsCurrentAddress}
            minLength={3}
            required={!sameAsCurrentAddress}
            className={`w-full px-4 py-2.5 border border-gray-300 rounded-md text-gray-900 focus:ring-2 focus:ring-orange-200 focus:border-orange-200 outline-none transition-colors text-sm ${
              sameAsCurrentAddress ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
            }`}
            placeholder="Enter area/locality"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label 
              htmlFor="permanentState" 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
              State {!sameAsCurrentAddress && <span className="text-red-500">*</span>}
        </label>
        <CustomDropdown
              id="permanentState"
              name="permanentState"
              options={indianStates?.map((state) => state.name) || []}
              value={formData.permanentState}
              onChange={(value) => handleDropdownChange('permanentState', value)}
              placeholder="Select state"
              required={!sameAsCurrentAddress}
              disabled={sameAsCurrentAddress}
        />
      </div>

      <div>
        <label 
              htmlFor="permanentCity" 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
              City {!sameAsCurrentAddress && <span className="text-red-500">*</span>}
        </label>
        {loadingPermanentCities ? (
          <div className="w-full px-4 py-2.5 border border-gray-300 rounded-md bg-gray-50 text-gray-500 text-sm flex items-center">
            <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500 mr-2"></div>
            Loading cities...
          </div>
        ) : (
        <CustomDropdown
            id="permanentCity"
            name="permanentCity"
            options={permanentCities}
            value={formData.permanentCity}
            onChange={(value) => handleDropdownChange('permanentCity', value)}
            placeholder={formData.permanentState ? "Select city" : "Select state first"}
            required={!sameAsCurrentAddress}
            disabled={sameAsCurrentAddress || !formData.permanentState || permanentCities.length === 0}
          />
        )}
      </div>
      </div>

          <div>
            <label 
              htmlFor="permanentPincode" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Pin Code {!sameAsCurrentAddress && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              id="permanentPincode"
              name="permanentPincode"
              value={formData.permanentPincode}
              onChange={handleChange}
              disabled={sameAsCurrentAddress}
              minLength={6}
              maxLength={6}
              pattern="[0-9]{6}"
              inputMode="numeric"
              required={!sameAsCurrentAddress}
              className={`w-full px-4 py-2.5 border border-gray-300 rounded-md text-gray-900 focus:ring-2 focus:ring-orange-200 focus:border-orange-200 outline-none transition-colors text-sm ${
                sameAsCurrentAddress ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
              }`}
              placeholder="Enter pincode (6 digits)"
            />
          </div>
      </div>
      <div className="flex gap-4 mt-6">
        <button
          type="button"
          onClick={clearForm}
          disabled={isSubmitting}
          className={`py-2 px-3 rounded-md font-medium text-xs text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Clear
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`flex-1 py-2.5 px-4 rounded-md font-medium text-sm text-white transition-colors ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2'
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
          </div>
        </div>
      
      </div>
      <Footer/>
    </>
  );
};

export default ContactFormPage;

