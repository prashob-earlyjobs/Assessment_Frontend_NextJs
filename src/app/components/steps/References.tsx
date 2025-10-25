import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import type { FormData } from '../pages/applyform';
import { toast } from "react-hot-toast";

interface ReferencesProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

export interface ReferencesRef {
  validateForm: () => boolean;
}

interface ValidationErrors {
  [key: string]: string | undefined;
}

export const References = forwardRef<ReferencesRef, ReferencesProps>(({
  formData,
  updateFormData,
}, ref) => {
  const [errors, setErrors] = useState<ValidationErrors>({});

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateMobileNumber = (mobile: string): boolean => {
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(mobile);
  };

  const validateRequired = (value: string): boolean => {
    return value.trim().length > 0;
  };

  const validateName = (name: string): boolean => {
    return name.trim().length >= 2;
  };

  const checkUniqueContactNumbers = (): boolean => {
    const contactNumbers = formData.references
      .map(ref => ref.contactNumber.trim())
      .filter(num => num.length > 0);
    const uniqueNumbers = new Set(contactNumbers);
    return contactNumbers.length === uniqueNumbers.size;
  };

  const checkUniqueEmails = (): boolean => {
    const emails = formData.references
      .map(ref => ref.email.trim().toLowerCase())
      .filter(email => email.length > 0);
    const uniqueEmails = new Set(emails);
    return emails.length === uniqueEmails.size;
  };

  const validateAllFields = (): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    // Check if we have at least 3 references
    if (formData.references.length < 3) {
      isValid = false;
    }

    // Check for unique contact numbers
    if (!checkUniqueContactNumbers()) {
      newErrors.duplicateContacts = 'Contact numbers must be unique across all references';
      toast.error('Duplicate mobile number found!');
      isValid = false;
    }

    // Check for unique emails
    if (!checkUniqueEmails()) {
      newErrors.duplicateEmails = 'Email addresses must be unique across all references';
      toast.error('Duplicate email address found!');
      isValid = false;
    }

    // Validate each reference
    formData.references.slice(0, 3).forEach((reference, index) => {
      // Name validation
      if (!validateRequired(reference.name)) {
        newErrors[`name-${index}`] = 'Name is required';
        isValid = false;
      } else if (!validateName(reference.name)) {
        newErrors[`name-${index}`] = 'Name must be at least 2 characters';
        isValid = false;
      }

      // Contact number validation
      if (!validateRequired(reference.contactNumber)) {
        newErrors[`contactNumber-${index}`] = 'Contact number is required';
        isValid = false;
      } else if (!validateMobileNumber(reference.contactNumber)) {
        newErrors[`contactNumber-${index}`] = 'Enter a valid 10-digit mobile number';
        isValid = false;
      }

      // Email validation
      if (!validateRequired(reference.email)) {
        newErrors[`email-${index}`] = 'Email is required';
        isValid = false;
      } else if (!validateEmail(reference.email)) {
        newErrors[`email-${index}`] = 'Enter a valid email address';
        isValid = false;
      }

      // Organization validation
      if (!validateRequired(reference.organization)) {
        newErrors[`organization-${index}`] = 'Organization is required';
        isValid = false;
      }

      // Designation validation
      if (!validateRequired(reference.designation)) {
        newErrors[`designation-${index}`] = 'Designation is required';
        isValid = false;
      }

      // How they know you validation
      if (!validateRequired(reference.howTheyKnow)) {
        newErrors[`howTheyKnow-${index}`] = 'This field is required';
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // Expose validation function to parent
  useImperativeHandle(ref, () => ({
    validateForm: validateAllFields
  }));

  const updateReference = (index: number, field: string, value: string) => {
    // Clear specific field error when user starts typing
    const errorKey = `${field}-${index}`;
    if (errors[errorKey]) {
      setErrors(prev => ({ ...prev, [errorKey]: undefined }));
    }

    // Clear duplicate errors when relevant fields change
    if (field === 'contactNumber' && errors.duplicateContacts) {
      setErrors(prev => ({ ...prev, duplicateContacts: undefined }));
    }
    if (field === 'email' && errors.duplicateEmails) {
      setErrors(prev => ({ ...prev, duplicateEmails: undefined }));
    }

    const updatedReferences = formData.references.map((ref, i) =>
      i === index ? { ...ref, [field]: value } : ref
    );
    updateFormData({ references: updatedReferences });
  };

  const addReference = () => {
    const newReference = {
      name: '',
      contactNumber: '',
      email: '',
      organization: '',
      designation: '',
      howTheyKnow: '',
    };
    updateFormData({
      references: [...formData.references, newReference],
    });
  };

  // Ensure we have at least 3 references
  while (formData.references.length < 3) {
    formData.references.push({
      name: '',
      contactNumber: '',
      email: '',
      organization: '',
      designation: '',
      howTheyKnow: '',
    });
  }

  return (
    <div className="space-y-8">
      <div className="text-sm text-gray-600">
        List any three persons (not related) (Broad relations to you, who are professionally known to you).
      </div>

      {/* Display duplicate errors at the top */}
      {(errors.duplicateContacts || errors.duplicateEmails) && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          {errors.duplicateContacts && (
            <p className="text-red-600 text-sm">{errors.duplicateContacts}</p>
          )}
          {errors.duplicateEmails && (
            <p className="text-red-600 text-sm">{errors.duplicateEmails}</p>
          )}
        </div>
      )}

      {formData.references.slice(0, 3).map((reference, index) => (
        <div key={index} className="space-y-4">
          <h3 className="text-lg font-medium text-form-accent">Person {index + 1}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`name-${index}`} className="text-sm font-medium text-gray-700">
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id={`name-${index}`}
                placeholder="Ex. John Doe"
                value={reference.name}
                onChange={(e) => updateReference(index, 'name', e.target.value)}
                className={`mt-1 border focus:ring-form-accent focus:border-form-accent ${
                  errors[`name-${index}`] ? 'border-red-500' : ''
                }`}
              />
              {errors[`name-${index}`] && (
                <p className="text-red-500 text-sm mt-1">{errors[`name-${index}`]}</p>
              )}
            </div>

            <div>
              <Label htmlFor={`contactNumber-${index}`} className="text-sm font-medium text-gray-700">
                Contact Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id={`contactNumber-${index}`}
                placeholder="Ex. 9876543210"
                value={reference.contactNumber}
                onChange={(e) => updateReference(index, 'contactNumber', e.target.value)}
                className={`mt-1 border focus:ring-form-accent focus:border-form-accent ${
                  errors[`contactNumber-${index}`] ? 'border-red-500' : ''
                }`}
              />
              {errors[`contactNumber-${index}`] && (
                <p className="text-red-500 text-sm mt-1">{errors[`contactNumber-${index}`]}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`email-${index}`} className="text-sm font-medium text-gray-700">
                Mail ID <span className="text-red-500">*</span>
              </Label>
              <Input
                id={`email-${index}`}
                type="email"
                placeholder="Ex. hr@example.in"
                value={reference.email}
                onChange={(e) => updateReference(index, 'email', e.target.value)}
                className={`mt-1 border focus:ring-form-accent focus:border-form-accent ${
                  errors[`email-${index}`] ? 'border-red-500' : ''
                }`}
              />
              {errors[`email-${index}`] && (
                <p className="text-red-500 text-sm mt-1">{errors[`email-${index}`]}</p>
              )}
            </div>

            <div>
              <Label htmlFor={`organization-${index}`} className="text-sm font-medium text-gray-700">
                Organization <span className="text-red-500">*</span>
              </Label>
              <Input
                id={`organization-${index}`}
                placeholder="Ex. MicroSoft"
                value={reference.organization}
                onChange={(e) => updateReference(index, 'organization', e.target.value)}
                className={`mt-1 border focus:ring-form-accent focus:border-form-accent ${
                  errors[`organization-${index}`] ? 'border-red-500' : ''
                }`}
              />
              {errors[`organization-${index}`] && (
                <p className="text-red-500 text-sm mt-1">{errors[`organization-${index}`]}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`designation-${index}`} className="text-sm font-medium text-gray-700">
                Designation <span className="text-red-500">*</span>
              </Label>
              <Input
                id={`designation-${index}`}
                placeholder="Ex. Hiring Manager"
                value={reference.designation}
                onChange={(e) => updateReference(index, 'designation', e.target.value)}
                className={`mt-1 border focus:ring-form-accent focus:border-form-accent ${
                  errors[`designation-${index}`] ? 'border-red-500' : ''
                }`}
              />
              {errors[`designation-${index}`] && (
                <p className="text-red-500 text-sm mt-1">{errors[`designation-${index}`]}</p>
              )}
            </div>

            <div>
              <Label htmlFor={`howTheyKnow-${index}`} className="text-sm font-medium text-gray-700">
                How they know you? <span className="text-red-500">*</span>
              </Label>
              <Input
                id={`howTheyKnow-${index}`}
                placeholder="Ex. Colleague"
                value={reference.howTheyKnow}
                onChange={(e) => updateReference(index, 'howTheyKnow', e.target.value)}
                className={`mt-1 border focus:ring-form-accent focus:border-form-accent ${
                  errors[`howTheyKnow-${index}`] ? 'border-red-500' : ''
                }`}
              />
              {errors[`howTheyKnow-${index}`] && (
                <p className="text-red-500 text-sm mt-1">{errors[`howTheyKnow-${index}`]}</p>
              )}
            </div>
          </div>

          {index < 2 && <hr className="border-gray-200" />}
        </div>
      ))}
    </div>
  );
});

export default References;