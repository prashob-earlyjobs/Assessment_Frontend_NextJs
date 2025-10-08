import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Button } from '../../components/ui/button';
import { Trash2 } from 'lucide-react';
import type { FormData } from '../pages/applyform';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { Calendar } from "lucide-react";

interface PersonalDetailsProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

export interface PersonalDetailsRef {
  validateForm: () => boolean;
}

interface ValidationErrors {
  fullName?: string;
  dateOfBirth?: string;
  gender?: string;
  phoneNumber?: string;
  whatsappNumber?: string;
  email?: string;
  currentAddress?: {
    buildingFlat?: string;
    street?: string;
    areaVillage?: string;
    cityTownBlock?: string;
    state?: string;
    pincode?: string;
  };
  permanentAddress?: {
    buildingFlat?: string;
    street?: string;
    areaVillage?: string;
    cityTownBlock?: string;
    state?: string;
    pincode?: string;
  };
}

const languageOptions = [
  'English',
  'Hindi',
  'Marathi',
  'Gujarati',
  'Tamil',
  'Telugu',
  'Kannada',
  'Bengali',
  'Punjabi',
  'Urdu',
  'Other'
];

const getMaxDate = () => {
  const today = new Date();
  const minAge = 16;
  const maxDate = new Date(
    today.getFullYear() - minAge,
    today.getMonth(),
    today.getDate()
  );
  return maxDate;
};

export const PersonalDetails = forwardRef<PersonalDetailsRef, PersonalDetailsProps>(({
  formData,
  updateFormData,
}, ref) => {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(formData.personalDetails.languages || []);

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguages(prev => {
      if (prev.includes(lang)) {
        // Remove language
        const updated = prev.filter(l => l !== lang);
        updatePersonalDetails('languages', updated);
        return updated;
      } else {
        // Add language
        const updated = [...prev, lang];
        updatePersonalDetails('languages', updated);
        return updated;
      }
    });
  };

  // Validation functions
  const validateFullName = (name: string): string | undefined => {
    if (!name.trim()) return 'Full name is required';
    if (name.trim().length < 2) return 'Name must be at least 2 characters';
    if (!/^[a-zA-Z\s]+$/.test(name)) return 'Name can only contain letters and spaces';
    return undefined;
  };

  const validateEmail = (email: string): string | undefined => {
    if (!email.trim()) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return undefined;
  };

  const validatePhoneNumber = (phone: string): string | undefined => {
    if (!phone.trim()) return 'Phone number is required';
    const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile number format
    if (!phoneRegex.test(phone)) return 'Please enter a valid 10-digit mobile number starting with 6-9';
    return undefined;
  };

  const validateWhatsAppNumber = (phone: string): string | undefined => {
    if (!phone.trim()) return 'WhatsApp number is required';
    const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile number format
    if (!phoneRegex.test(phone)) return 'Please enter a valid 10-digit WhatsApp number starting with 6-9';
    return undefined;
  };

  const validateDateOfBirth = (dob: string): string | undefined => {
    if (!dob) return 'Date of birth is required';
    
    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      // age--;
    }
    
    if (birthDate > today) return 'Date of birth cannot be in the future';
    if (age < 16) return 'You must be at least 16 years old';
    if (age > 100) return 'Please enter a valid date of birth';
    return undefined;
  };

  const validatePincode = (pincode: string): string | undefined => {
    if (!pincode.trim()) return 'Pincode is required';
    const pincodeRegex = /^[1-9][0-9]{5}$/;
    if (!pincodeRegex.test(pincode)) return 'Please enter a valid 6-digit pincode';
    return undefined;
  };

  const validateRequired = (value: string, fieldName: string): string | undefined => {
    if (!value.trim()) return `${fieldName} is required`;
    return undefined;
  };

  // Function to validate all fields at once
  const validateAllFields = (): boolean => {
    const newErrors: ValidationErrors = {};
    
    // Validate basic fields
    newErrors.fullName = validateFullName(formData.personalDetails.fullName);
    newErrors.dateOfBirth = validateDateOfBirth(formData.personalDetails.dateOfBirth);
    newErrors.phoneNumber = validatePhoneNumber(formData.personalDetails.phoneNumber);
    newErrors.whatsappNumber = validateWhatsAppNumber(formData.personalDetails.whatsappNumber);
    newErrors.email = validateEmail(formData.personalDetails.email);
    
    if (!formData.personalDetails.gender) {
      newErrors.gender = 'Gender is required';
    }
    
    // Validate current address
    newErrors.currentAddress = {
      buildingFlat: validateRequired(formData.personalDetails.currentAddress.buildingFlat, 'Building/Flat No.'),
      street: validateRequired(formData.personalDetails.currentAddress.street, 'Street'),
      areaVillage: validateRequired(formData.personalDetails.currentAddress.areaVillage, 'Area/Village'),
      cityTownBlock: validateRequired(formData.personalDetails.currentAddress.cityTownBlock, 'City/Town/Block'),
      state: validateRequired(formData.personalDetails.currentAddress.state, 'State'),
      pincode: validatePincode(formData.personalDetails.currentAddress.pincode)
    };
    
    // Validate permanent address
    newErrors.permanentAddress = {
      buildingFlat: validateRequired(formData.personalDetails.permanentAddress.buildingFlat, 'Building/Flat No.'),
      street: validateRequired(formData.personalDetails.permanentAddress.street, 'Street'),
      areaVillage: validateRequired(formData.personalDetails.permanentAddress.areaVillage, 'Area/Village'),
      cityTownBlock: validateRequired(formData.personalDetails.permanentAddress.cityTownBlock, 'City/Town/Block'),
      state: validateRequired(formData.personalDetails.permanentAddress.state, 'State'),
      pincode: validatePincode(formData.personalDetails.permanentAddress.pincode)
    };
    
    setErrors(newErrors);
    
    // Check if there are any errors
    const hasErrors = Object.values(newErrors).some(error => {
      if (typeof error === 'string') return error;
      if (typeof error === 'object' && error !== null) {
        return Object.values(error).some(subError => subError);
      }
      return false;
    });
    
    return !hasErrors;
  };

  // Expose validation function for parent components
  useImperativeHandle(ref, () => ({
    validateForm: validateAllFields
  }));

  const handleFieldChange = (field: string, value: string, validationFn?: (val: string) => string | undefined) => {
    updatePersonalDetails(field, value);
    
    if (validationFn) {
      const error = validationFn(value);
      setErrors(prev => ({
        ...prev,
        [field]: error
      }));
    }
  };

  const handleAddressChange = (type: 'currentAddress' | 'permanentAddress', field: string, value: string, validationFn?: (val: string) => string | undefined) => {
    updateAddress(type, field, value);
    
    if (validationFn) {
      const error = validationFn(value);
      setErrors(prev => ({
        ...prev,
        [type]: {
          ...prev[type],
          [field]: error
        }
      }));
    }
  };

  const updatePersonalDetails = (field: string, value: any) => {
    updateFormData({
      personalDetails: {
        ...formData.personalDetails,
        [field]: value,
      },
    });
  };

  const updateAddress = (type: 'currentAddress' | 'permanentAddress', field: string, value: string) => {
    updateFormData({
      personalDetails: {
        ...formData.personalDetails,
        [type]: {
          ...formData.personalDetails[type],
          [field]: value,
        },
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
            Full Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="fullName"
            placeholder="Ex. John Doe"
            value={formData.personalDetails.fullName}
            onChange={(e) => handleFieldChange('fullName', e.target.value, validateFullName)}
            className={`mt-1 border focus:ring-form-accent focus:border-form-accent ${
              errors.fullName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
            }`}
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
          )}
        </div>

        <div>
          <Label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-700">
            Date of Birth <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <DatePicker
              selected={formData.personalDetails.dateOfBirth ? new Date(formData.personalDetails.dateOfBirth) : null}
              onChange={(date: Date | [Date, Date] | null) => {
                let formattedDate = "";
                if (date instanceof Date) {
                  formattedDate = format(date, "yyyy-MM-dd");
                } else if (Array.isArray(date) && date[0] instanceof Date) {
                  formattedDate = format(date[0], "yyyy-MM-dd");
                }
                handleFieldChange('dateOfBirth', formattedDate, validateDateOfBirth);
              }}
              maxDate={getMaxDate()}
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={100}
              dateFormat="MMMM d, yyyy"
              placeholderText="Select date of birth"
              className={`w-full p-3 border rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 shadow-sm ${
                errors.dateOfBirth 
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50'
                  : 'border-gray-200 focus:ring-orange-500 focus:border-orange-500'
              }`}
              wrapperClassName="w-full"
              calendarClassName="shadow-lg border border-gray-200 rounded-lg"
            />
            <Calendar 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" 
              style={{ color: 'black' }} 
            />
          </div>
          {errors.dateOfBirth && (
            <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="gender" className="text-sm font-medium text-gray-700">
            Gender <span className="text-red-500">*</span>
          </Label>
          <Select 
            value={formData.personalDetails.gender} 
            onValueChange={(value) => {
              updatePersonalDetails('gender', value);
              setErrors(prev => ({ ...prev, gender: undefined }));
            }}
          >
            <SelectTrigger className={`mt-1 p-1 ${
              errors.gender ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
            }`}>
              <SelectValue placeholder="Select Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.gender && (
            <p className="mt-1 text-sm text-red-600">{errors.gender}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">
            Phone Number <span className="text-red-500">*</span>
          </Label>
          <div className="mt-1 flex">
            <Select defaultValue="+91">
              <SelectTrigger className="w-20 p-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="+91">+91</SelectItem>
                <SelectItem value="+1">+1</SelectItem>
                <SelectItem value="+44">+44</SelectItem>
              </SelectContent>
            </Select>
            <div className="ml-2 flex-1">
              <Input
                id="phoneNumber"
                placeholder="Ex. 9876543210"
                value={formData.personalDetails.phoneNumber}
                onChange={(e) => {
                  // Only allow numbers and limit to 10 digits
                  const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                  handleFieldChange('phoneNumber', value, validatePhoneNumber);
                }}
                maxLength={10}
                className={`border focus:ring-form-accent focus:border-form-accent ${
                  errors.phoneNumber ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                }`}
              />
              {errors.phoneNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="whatsappNumber" className="text-sm font-medium text-gray-700">
            WhatsApp Number <span className="text-red-500">*</span>
          </Label>
          <div className="mt-1 flex">
            <Select defaultValue="+91">
              <SelectTrigger className="w-20 border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="+91">+91</SelectItem>
                <SelectItem value="+1">+1</SelectItem>
                <SelectItem value="+44">+44</SelectItem>
              </SelectContent>
            </Select>
            <div className="ml-2 flex-1">
              <Input
                id="whatsappNumber"
                placeholder="Ex. 9876543210"
                value={formData.personalDetails.whatsappNumber}
                onChange={(e) => {
                  // Only allow numbers and limit to 10 digits
                  const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                  handleFieldChange('whatsappNumber', value, validateWhatsAppNumber);
                }}
                maxLength={10}
                className={`border focus:ring-form-accent focus:border-form-accent ${
                  errors.whatsappNumber ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                }`}
              />
              {errors.whatsappNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.whatsappNumber}</p>
              )}
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Ex. hr@example.in"
            value={formData.personalDetails.email}
            onChange={(e) => handleFieldChange('email', e.target.value.toLowerCase(), validateEmail)}
            className={`mt-1 border focus:ring-form-accent focus:border-form-accent ${
              errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Current Address */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Current Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="currentBuildingFlat" className="text-sm font-medium text-gray-700">
              Building/Flat No. <span className="text-red-500">*</span>
            </Label>
            <Input
              id="currentBuildingFlat"
              placeholder="building number"
              value={formData.personalDetails.currentAddress.buildingFlat}
              onChange={(e) => handleAddressChange('currentAddress', 'buildingFlat', e.target.value, (val) => validateRequired(val, 'Building/Flat No.'))}
              className={`mt-1 border focus:ring-form-accent focus:border-form-accent ${
                errors.currentAddress?.buildingFlat ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
              }`}
            />
            {errors.currentAddress?.buildingFlat && (
              <p className="mt-1 text-sm text-red-600">{errors.currentAddress.buildingFlat}</p>
            )}
          </div>

          <div>
            <Label htmlFor="currentStreet" className="text-sm font-medium text-gray-700">
              Street <span className="text-red-500">*</span>
            </Label>
            <Input
              id="currentStreet"
              placeholder="street"
              value={formData.personalDetails.currentAddress.street}
              onChange={(e) => updateAddress('currentAddress', 'street', e.target.value)}
              className="mt-1 border focus:ring-form-accent focus:border-form-accent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="currentAreaVillage" className="text-sm font-medium text-gray-700">
              Area/Village <span className="text-red-500">*</span>
            </Label>
            <Input
              id="currentAreaVillage"
              placeholder="city"
              value={formData.personalDetails.currentAddress.areaVillage}
              onChange={(e) => updateAddress('currentAddress', 'areaVillage', e.target.value)}
              className="mt-1 border focus:ring-form-accent focus:border-form-accent"
            />
          </div>

          <div>
            <Label htmlFor="currentCityTownBlock" className="text-sm font-medium text-gray-700">
              City/Town/Block <span className="text-red-500">*</span>
            </Label>
            <Input
              id="currentCityTownBlock"
              placeholder="city"
              value={formData.personalDetails.currentAddress.cityTownBlock}
              onChange={(e) => updateAddress('currentAddress', 'cityTownBlock', e.target.value)}
              className="mt-1 border focus:ring-form-accent focus:border-form-accent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="currentState" className="text-sm font-medium text-gray-700">
              State <span className="text-red-500">*</span>
            </Label>
            <Input
              id="currentState"
              placeholder="state"
              value={formData.personalDetails.currentAddress.state}
              onChange={(e) => updateAddress('currentAddress', 'state', e.target.value)}
              className="mt-1 border focus:ring-form-accent focus:border-form-accent"
            />
          </div>

          <div>
            <Label htmlFor="currentPincode" className="text-sm font-medium text-gray-700">
              Pincode <span className="text-red-500">*</span>
            </Label>
            <Input
              id="currentPincode"
              placeholder="Ex. 123456"
              value={formData.personalDetails.currentAddress.pincode}
              onChange={(e) => {
                // Only allow numbers and limit to 6 digits
                const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                handleAddressChange('currentAddress', 'pincode', value, validatePincode);
              }}
              maxLength={6}
              className={`mt-1 border focus:ring-form-accent focus:border-form-accent ${
                errors.currentAddress?.pincode ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
              }`}
            />
            {errors.currentAddress?.pincode && (
              <p className="mt-1 text-sm text-red-600">{errors.currentAddress.pincode}</p>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2 pt-2">
          <input
            type="checkbox"
            id="sameAsCurrentAddress"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            onChange={(e) => {
              if (e.target.checked) {
                updateFormData({
                  personalDetails: {
                    ...formData.personalDetails,
                    permanentAddress: { ...formData.personalDetails.currentAddress }
                  }
                });
                // Clear permanent address errors when copying
                setErrors(prev => ({
                  ...prev,
                  permanentAddress: {}
                }));
              }
            }}
          />
          <Label htmlFor="sameAsCurrentAddress" className="text-sm text-gray-700 cursor-pointer">
            Permanent address is same as current address
          </Label>
        </div>
      </div>

      {/* Permanent Address */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Permanent Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="permanentBuildingFlat" className="text-sm font-medium text-gray-700">
              Building/Flat No. <span className="text-red-500">*</span>
            </Label>
            <Input
              id="permanentBuildingFlat"
              placeholder="building number"
              value={formData.personalDetails.permanentAddress.buildingFlat}
              onChange={(e) => updateAddress('permanentAddress', 'buildingFlat', e.target.value)}
              className="mt-1 border focus:ring-form-accent focus:border-form-accent"
            />
          </div>

          <div>
            <Label htmlFor="permanentStreet" className="text-sm font-medium text-gray-700">
              Street <span className="text-red-500">*</span>
            </Label>
            <Input
              id="permanentStreet"
              placeholder="street"
              value={formData.personalDetails.permanentAddress.street}
              onChange={(e) => updateAddress('permanentAddress', 'street', e.target.value)}
              className="mt-1 border focus:ring-form-accent focus:border-form-accent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="permanentAreaVillage" className="text-sm font-medium text-gray-700">
              Area/Village <span className="text-red-500">*</span>
            </Label>
            <Input
              id="permanentAreaVillage"
              placeholder="city"
              value={formData.personalDetails.permanentAddress.areaVillage}
              onChange={(e) => updateAddress('permanentAddress', 'areaVillage', e.target.value)}
              className="mt-1 border focus:ring-form-accent focus:border-form-accent"
            />
          </div>

          <div>
            <Label htmlFor="permanentCityTownBlock" className="text-sm font-medium text-gray-700">
              City/Town/Block <span className="text-red-500">*</span>
            </Label>
            <Input
              id="permanentCityTownBlock"
              placeholder="city"
              value={formData.personalDetails.permanentAddress.cityTownBlock}
              onChange={(e) => updateAddress('permanentAddress', 'cityTownBlock', e.target.value)}
              className="mt-1 border focus:ring-form-accent focus:border-form-accent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="permanentState" className="text-sm font-medium text-gray-700">
              State <span className="text-red-500">*</span>
            </Label>
            <Input
              id="permanentState"
              placeholder="state"
              value={formData.personalDetails.permanentAddress.state}
              onChange={(e) => updateAddress('permanentAddress', 'state', e.target.value)}
              className="mt-1 border focus:ring-form-accent focus:border-form-accent"
            />
          </div>

          <div>
            <Label htmlFor="permanentPincode" className="text-sm font-medium text-gray-700">
              Pincode <span className="text-red-500">*</span>
            </Label>
            <Input
              id="permanentPincode"
              placeholder="Ex. 123456"
              value={formData.personalDetails.permanentAddress.pincode}
              onChange={(e) => {
                // Only allow numbers and limit to 6 digits
                const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                handleAddressChange('permanentAddress', 'pincode', value, validatePincode);
              }}
              maxLength={6}
              className={`mt-1 border focus:ring-form-accent focus:border-form-accent ${
                errors.permanentAddress?.pincode ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
              }`}
            />
            {errors.permanentAddress?.pincode && (
              <p className="mt-1 text-sm text-red-600">{errors.permanentAddress.pincode}</p>
            )}
          </div>
        </div>
      </div>

      {/* Spoken Languages Section - Reference UI */}
      <div className="space-y-6">
       
        <div className="space-y-4">
          <Label className="text-sm font-bold text-gray-700">Select Languages *</Label>
          <Select
            value={""}
            onValueChange={lang => {
              if (lang && !selectedLanguages.includes(lang)) {
                const newLanguages = [...selectedLanguages, lang];
                setSelectedLanguages(newLanguages);
                updatePersonalDetails('languages', newLanguages);
              }
            }}>
            <SelectTrigger className="h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-400 bg-white/50 font-medium">
              <SelectValue placeholder="Select a language to add" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {languageOptions.filter(lang => !selectedLanguages.includes(lang)).map(lang => (
                <SelectItem key={lang} value={lang}>{lang}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex flex-wrap gap-3 mt-4">
            {selectedLanguages.map((language, index) => (
              <span key={index} className="gap-2 py-2 px-4 bg-orange-50 text-orange-700 border border-orange-200 rounded-xl font-medium flex items-center">
                {language}
                <span
                  className="ml-2 h-3 w-3 cursor-pointer hover:text-red-500 transition-colors"
                  onClick={() => {
                    const updated = selectedLanguages.filter((_, i) => i !== index);
                    setSelectedLanguages(updated);
                    updatePersonalDetails('languages', updated);
                  }}
                  role="button"
                  aria-label={`Remove ${language}`}
                >✕</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});