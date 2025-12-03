"use client";
import axios from 'axios';
import React, { useState, useRef, useEffect, useLayoutEffect, use } from 'react';
import { useSearchParams } from 'next/navigation';
import { getInitialDataAPI, submitAdditionalDetailsAPI } from '../../components/services/candidateapi';

interface CustomDropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
  id?: string;
  name?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder,
  required = false,
  id,
  name,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
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

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
    setSearchQuery('');
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedLabel = value || placeholder;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-2.5 pr-10 border-2 rounded-lg text-left transition-all duration-200 bg-white appearance-none cursor-pointer shadow-sm hover:shadow-md font-medium flex items-center justify-between text-sm ${
          isOpen
            ? 'border-orange-200 ring-2 ring-orange-200'
            : value
            ? 'border-gray-300 hover:border-orange-200'
            : 'border-gray-300 hover:border-orange-200'
        } ${!value ? 'text-gray-400' : 'text-gray-900'}`}
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

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-lg shadow-xl max-h-60 overflow-hidden flex flex-col">
          <div className="p-2 border-b border-gray-200 sticky top-0 bg-white">
            <div className="relative">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full px-3 py-1.5 pl-10 border border-gray-300 rounded-md text-gray-900 focus:ring-2 focus:ring-orange-200 focus:border-orange-200 outline-none text-sm"
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
                  type="button"
                  onClick={() => handleSelect(option)}
                  className={`w-full px-3 py-2 text-left transition-colors duration-150 text-sm ${
                    value === option
                      ? 'bg-orange-50 text-orange-600 font-medium'
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
    vendorName: '',
    region: '',
    panNumber: '',
    qualification: '',
    previousExperience: '',
    currentStreetAddress: '',
    currentArea: '',
    currentCity: '',
    currentPincode: '',
    permanentStreetAddress: '',
    permanentArea: '',
    permanentCity: '',
    permanentPincode: '',
    alternateMobileNumber: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sameAsCurrentAddress, setSameAsCurrentAddress] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'error' | 'success' } | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useLayoutEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        setHasError(false);
        const response = await getInitialDataAPI(id || undefined);
        if(response && response.status ==="success"){
          const data = response.data;
          
          // Check if addresses are the same
          const addressesMatch = 
            data.currentAddress && data.permanentAddress &&
            data.currentAddress.street === data.permanentAddress.street &&
            data.currentAddress.area === data.permanentAddress.area &&
            data.currentAddress.city === data.permanentAddress.city &&
            data.currentAddress.pincode === data.permanentAddress.pincode;
          
          setSameAsCurrentAddress(addressesMatch);
          
          setFormData(prev => ({
            ...prev,
            name: data.name || '',
            email: data.email || '',
            phone: data.phone || '',
            alternateMobileNumber: data.additionalDetails?.alternateMobileNumber || '',
            vendorName: data.additionalDetails?.vendorName || '',
            region: data.additionalDetails?.region || '',
            panNumber: data.additionalDetails?.panNumber || '',
            qualification: data.additionalDetails?.qualification || '',
            previousExperience: data.additionalDetails?.previousExperience || '',
            currentStreetAddress: data.additionalDetails?.currentAddress?.street || '',
            currentArea: data.additionalDetails?.currentAddress?.area || '',
            currentCity: data.additionalDetails?.currentAddress?.city || '',
            currentPincode: data.additionalDetails?.currentAddress?.pincode || '',
            permanentStreetAddress: data.additionalDetails?.permanentAddress?.street || '',
            permanentArea: data.additionalDetails?.permanentAddress?.area || '',
            permanentCity: data.additionalDetails?.permanentAddress?.city || '',
            permanentPincode: data.additionalDetails?.permanentAddress?.pincode || '',
          }));
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

  const vendorOptions = 
    [
      "Bayleaf HR Solutions",
      "Bright Right",
      "Spectrum",
      "Dream Consulting",
      "Golden Vulture Consulting",
      "Hunar.ai",
      "Hygenia Services",
      "Fresh Duniya",
      "Futurz",
      "Jobox",
      "Kosi Digital",
      "Milestone Projects",
      "Netambit",
      "Quess",
      "Surya Capital HR Services",
      "Idyllic services",
      "Grow more consultants",
      "Urmila International services",
      "Alpen HR",
      "Orion Edutech",
      "Uprising consulting PVT LTD",
      "Lotus group",
      "Production Modeling India PVT LTD",
      "Sigma Staffing solutions",
      "TalentBizz",
      "Aarshita consulting",
      "Big Tree Resource Management Pvt. Ltd.",
      "Earlyjobs",
      "CHN Technologies Pvt Ltd",
      "Betterment quest solution",
      "Novum Insight Management Pvt Ltd",
      "Mandhata Enterprises",
      "TALENTOR EDGE PRIVATE LIMITED",
      "Minivel Services Pvt. Ltd",
      "HirePulse Solutions Pvt.Ltd",
      "Career BLOOM HR",
      "EliteEmp Services Private Limited",
      "Skillnix Recruitment Services Private Limited",
      "Heyresources Services Pvt Ltd",
      "J&S Business Services Private limited",
      "DIGI UDYOG",
      "Ikamate HR India pvt ltd",
      "The Growup Consulting",
      "Z2 Plus Placement & Security Agency Pvt. Ltd.",
      "KALS Enterprise",
      "Sarvasync Solutions Pvt. Ltd.",
      "HVR Management Services PVT Ltd",
      "Hired rocket pvt Ltd",
      "Saty optimum services Private Limited",
      "Future Technologies and Services",
      "Universal Manpower Online",
      "SHANVI JOB PLACEMENT SERVICES",
      "Thinqor solutions"
    
    
  ];

  const regionOptions = [
    'DLNCR',
    'UP',
    'RON',
    'West Mumbai',
    'West Pune',
    'East',
    'MPCG',
    'APTO',
    'South'
  ];

  const qualificationOptions = [
    '12th',
    'SSC',
    'ITI',
    'Diploma'
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
    
    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: processedValue,
      };
      // If same as current address is checked, copy all current address fields to permanent
      if (sameAsCurrentAddress && (
        name === 'currentStreetAddress' || 
        name === 'currentArea' || 
        name === 'currentCity' || 
        name === 'currentPincode'
      )) {
        if (name === 'currentStreetAddress') updated.permanentStreetAddress = processedValue;
        if (name === 'currentArea') updated.permanentArea = processedValue;
        if (name === 'currentCity') updated.permanentCity = processedValue;
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
        permanentPincode: prev.currentPincode,
      }));
    }
  };

  const handleDropdownChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearForm = () => {
    setFormData(prev => ({
      ...prev,
      vendorName: '',
      region: '',
      panNumber: '',
      qualification: '',
      previousExperience: '',
      currentStreetAddress: '',
      currentArea: '',
      currentCity: '',
      currentPincode: '',
      permanentStreetAddress: '',
      permanentArea: '',
      permanentCity: '',
      permanentPincode: '',
      alternateMobileNumber: '',
    }));
    setSameAsCurrentAddress(false);
  };

  const validateForm = (): string | null => {
    // Validate alternate mobile number (min 3, max 10)
    if (!formData.alternateMobileNumber || formData.alternateMobileNumber.length < 3) {
      return 'Alternate Mobile Number must be at least 3 characters';
    }
    if (formData.alternateMobileNumber.length > 10) {
      return 'Alternate Mobile Number must not exceed 10 characters';
    }

    // Validate vendor name
    if (!formData.vendorName || formData.vendorName.length < 3) {
      return 'Vendor Name is required and must be at least 3 characters';
    }

    // Validate region
    if (!formData.region || formData.region.length < 3) {
      return 'Region is required and must be at least 3 characters';
    }

    // Validate PAN number
    if (!formData.panNumber || formData.panNumber.length < 3) {
      return 'PAN Card Number is required and must be at least 3 characters';
    }

    // Validate qualification
    if (!formData.qualification || formData.qualification.length < 3) {
      return 'Qualification is required and must be at least 3 characters';
    }

    // Validate previous experience
    if (!formData.previousExperience || formData.previousExperience.length < 3) {
      return 'Previous Experience is required and must be at least 3 characters';
    }

    // Validate current address
    if (!formData.currentStreetAddress || formData.currentStreetAddress.length < 3) {
      return 'Current Street Address is required and must be at least 3 characters';
    }
    if (!formData.currentArea || formData.currentArea.length < 3) {
      return 'Current Area/Locality is required and must be at least 3 characters';
    }
    if (!formData.currentCity || formData.currentCity.length < 3) {
      return 'Current City is required and must be at least 3 characters';
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
      if (!formData.permanentCity || formData.permanentCity.length < 3) {
        return 'Permanent City is required and must be at least 3 characters';
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form
    const validationError = validateForm();
    if (validationError) {
      showToast(validationError, 'error');
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('Form submitted:', formData);
      await submitAdditionalDetailsAPI(id || undefined, formData);
      
      // Reset form after successful submission
      
      showToast('Form submitted successfully!', 'success');
    } catch (error) {
      console.error('Form submission error:', error);
      showToast('Failed to submit form. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
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
      <div className="max-w-4xl mx-auto px-8 pt-8">
        <div className="mb-6">
          <img 
            src="/images/logo.png" 
            alt="Logo" 
            className="h-12 w-auto"
          />
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5 p-8 pt-1 max-w-4xl mx-auto">
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
          Alternate Mobile Number <span className="text-red-500">*</span>
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
          required
          className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-gray-900 focus:ring-2 focus:ring-orange-200 focus:border-orange-200 outline-none transition-colors text-sm"
          placeholder="Enter alternate mobile number (3-10 digits)"
        />
      </div>

      <div className="space-y-4">
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
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-gray-900 focus:ring-2 focus:ring-orange-200 focus:border-orange-200 outline-none transition-colors text-sm"
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
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-gray-900 focus:ring-2 focus:ring-orange-200 focus:border-orange-200 outline-none transition-colors text-sm"
            placeholder="Enter area/locality"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label 
              htmlFor="currentCity" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="currentCity"
              name="currentCity"
              value={formData.currentCity}
              onChange={handleChange}
              minLength={3}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-gray-900 focus:ring-2 focus:ring-orange-200 focus:border-orange-200 outline-none transition-colors text-sm"
              placeholder="Enter city"
        />
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
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-gray-900 focus:ring-2 focus:ring-orange-200 focus:border-orange-200 outline-none transition-colors text-sm"
              placeholder="Enter pincode (6 digits)"
            />
          </div>
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

      <div className="space-y-4">
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
              sameAsCurrentAddress ? 'bg-gray-100 cursor-not-allowed' : ''
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
              sameAsCurrentAddress ? 'bg-gray-100 cursor-not-allowed' : ''
            }`}
            placeholder="Enter area/locality"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
      <div>
        <label 
              htmlFor="permanentCity" 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
              City {!sameAsCurrentAddress && <span className="text-red-500">*</span>}
        </label>
            <input
              type="text"
              id="permanentCity"
              name="permanentCity"
              value={formData.permanentCity}
          onChange={handleChange}
          disabled={sameAsCurrentAddress}
              minLength={3}
              required={!sameAsCurrentAddress}
              className={`w-full px-4 py-2.5 border border-gray-300 rounded-md text-gray-900 focus:ring-2 focus:ring-orange-200 focus:border-orange-200 outline-none transition-colors text-sm ${
            sameAsCurrentAddress ? 'bg-gray-100 cursor-not-allowed' : ''
          }`}
              placeholder="Enter city"
        />
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
                sameAsCurrentAddress ? 'bg-gray-100 cursor-not-allowed' : ''
              }`}
              placeholder="Enter pincode (6 digits)"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label 
          htmlFor="vendorName" 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Vendor Name <span className="text-red-500">*</span>
        </label>
        <CustomDropdown
          id="vendorName"
          name="vendorName"
          options={vendorOptions}
          value={formData.vendorName}
          onChange={(value) => handleDropdownChange('vendorName', value)}
          placeholder="Select a vendor"
          required
        />
      </div>

      <div>
        <label 
          htmlFor="region" 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Select Region <span className="text-red-500">*</span>
        </label>
        <CustomDropdown
          id="region"
          name="region"
          options={regionOptions}
          value={formData.region}
          onChange={(value) => handleDropdownChange('region', value)}
          placeholder="Select a region"
          required
        />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label 
            htmlFor="panNumber" 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Candidate PAN Card Number <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
            id="panNumber"
            name="panNumber"
            value={formData.panNumber}
          onChange={handleChange}
            minLength={10}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-200 outline-none transition-colors uppercase text-sm"
          placeholder="Enter PAN card number"
          maxLength={10}
          required
        />
      </div>

      <div>
        <label 
          htmlFor="qualification" 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          12th SSC / ITI / Diploma? <span className="text-red-500">*</span>
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

    </>
  );
};

export default ContactFormPage;

