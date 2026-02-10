import React, { useState, forwardRef, useImperativeHandle, useCallback } from 'react';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Upload, Plus, Trash2, X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import type { FormData } from '../pages/applyform';
import { uploadFile } from '../services/usersapi';

interface IdentificationProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

export interface IdentificationRef {
  validateForm: () => boolean;
}

interface ValidationErrors {
  [key: string]: string | undefined;
}

const previewStyles = {
  container: "mt-4 p-4 border rounded-lg bg-gray-50",
  heading: "text-sm font-medium text-gray-700 mb-2",
  imageGrid: "grid grid-cols-1 sm:grid-cols-2 gap-4",
  imageWrapper: "relative group",
  image: "w-full h-40 object-cover rounded-lg border-2 border-gray-200",
  overlay: "absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center",
  viewButton: "px-4 py-2 bg-white text-gray-800 rounded-md shadow-sm hover:bg-gray-100 transition-colors",
};

const ImagePreviewModal = ({ isOpen, onClose, imageUrl, title }: {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg max-w-3xl w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <img src={imageUrl} alt={title} className="w-full max-h-[80vh] object-contain" />
      </div>
    </div>
  );
};

export const Identification = forwardRef<IdentificationRef, IdentificationProps>(({
  formData,
  updateFormData,
}, ref) => {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [previewModal, setPreviewModal] = useState<{
    isOpen: boolean;
    imageUrl: string;
    title: string;
  }>({
    isOpen: false,
    imageUrl: '',
    title: '',
  });

  const updateIdentification = (field: string, value: any) => {
    updateFormData({
      identification: {
        ...formData.identification,
        [field]: value,
      },
    });
  };

  // Helper to generate unique folder path using email and timestamp
  const getFolderPath = (subFolder: string) => {
    const email = formData.personalDetails.email || 'anonymous';
    const timestamp = Date.now();
    const sanitizedEmail = email.replace(/[^a-zA-Z0-9]/g, '_');
    return `anonymous/applications/${sanitizedEmail}_${timestamp}/${subFolder}`;
  };

  // Update the photo upload handler
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    let previewUrl: string | undefined;
    if (file) {
      try {
        // Show loading toast
        const loadingToast = toast.loading('Uploading profile photo...');
        
        // Create and show temporary preview immediately
        previewUrl = URL.createObjectURL(file);
        updateIdentification('profilePhoto', previewUrl);
        
        const folderPath = getFolderPath('profile');
        const response = await uploadFile(file, folderPath);
        
        // Update with server URL
        if (response && response.fileUrl) {
          updateIdentification('profilePhoto', response.fileUrl);
        }
        
        toast.dismiss(loadingToast);
        toast.success('Profile photo uploaded successfully');
      } catch (error) {
        toast.error('Failed to upload profile photo');
        console.error('Profile photo upload error:', error);
        updateIdentification('profilePhoto', '');
      } finally {
        // Clean up the temporary preview URL
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
        }
      }
    }
  };

  // Update the Aadhar card upload handler
  const handleAadharUpload = (side: 'front' | 'back') => async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const loadingToast = toast.loading(`Uploading Aadhar ${side}...`);
        
        // Create and show temporary preview immediately
        const previewUrl = URL.createObjectURL(file);
        const field = `aadhar${side.charAt(0).toUpperCase() + side.slice(1)}`;
        updateIdentification(field, previewUrl);
        
        const folderPath = getFolderPath('aadhar');
        const response = await uploadFile(file, folderPath);
        
        // Update with server URL
        if (response && response.fileUrl) {
          updateIdentification(field, response.fileUrl);
        }
        
        toast.dismiss(loadingToast);
        toast.success(`Aadhar ${side} uploaded successfully`);
      } catch (error) {
        toast.error(`Failed to upload Aadhar ${side}`);
        console.error(`Aadhar ${side} upload error:`, error);
        updateIdentification(`aadhar${side.charAt(0).toUpperCase() + side.slice(1)}`, '');
      }
    }
  };

  // Update the PAN card upload handler
  const handlePanUpload = (side: 'front' | 'back') => async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const loadingToast = toast.loading(`Uploading PAN ${side}...`);
        
        // Create and show temporary preview immediately
        const previewUrl = URL.createObjectURL(file);
        const field = `pan${side.charAt(0).toUpperCase() + side.slice(1)}`;
        updateIdentification(field, previewUrl);
        
        const folderPath = getFolderPath('pan');
        const response = await uploadFile(file, folderPath);
        
        // Update with server URL
        if (response && response.fileUrl) {
          updateIdentification(field, response.fileUrl);
        }
        
        toast.dismiss(loadingToast);
        toast.success(`PAN ${side} uploaded successfully`);
      } catch (error) {
        toast.error(`Failed to upload PAN ${side}`);
        console.error(`PAN ${side} upload error:`, error);
        updateIdentification(`pan${side.charAt(0).toUpperCase() + side.slice(1)}`, '');
      }
    }
  };

  // Validation functions
  const validateAadharNumber = (aadhar: string): boolean => {
    const aadharRegex = /^\d{12}$/;
    return aadharRegex.test(aadhar);
  };

  const validatePanNumber = (pan: string): boolean => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan);
  };

  const validateMobileNumber = (mobile: string): boolean => {
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(mobile);
  };

  const validateRequired = (value: string): boolean => {
    return value.trim().length > 0;
  };

  // Add this validation function near your other validation functions
  const validateAge = (age: string): boolean => {
    const ageRegex = /^\d+$/;
    return ageRegex.test(age) && parseInt(age) > 0 && parseInt(age) <= 120;
  };

  // Update the validateAllFields function with enhanced validation
  const validateAllFields = (): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    // Check minimum 3 family members
    if (!formData.identification.familyMembers || formData.identification.familyMembers.length < 3) {
      toast.error('Please add at least 3 family members', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#FEE2E2',
          color: '#991B1B',
          padding: '16px',
          borderRadius: '8px',
        },
      });
      return false;
    }

    // Validate first 3 family members thoroughly
    for (let index = 0; index < Math.min(3, formData.identification.familyMembers.length); index++) {
      const member = formData.identification.familyMembers[index];
      const memberNumber = index + 1;
      const missingFields: string[] = [];

      // Check each field and collect missing ones
      if (!validateRequired(member.name)) {
        missingFields.push('Name');
        newErrors[`familyMember-${index}-name`] = 'Name is required';
      }
      if (!validateRequired(member.relationship)) {
        missingFields.push('Relationship');
        newErrors[`familyMember-${index}-relationship`] = 'Relationship is required';
      }
      if (!validateRequired(member.occupation)) {
        missingFields.push('Occupation');
        newErrors[`familyMember-${index}-occupation`] = 'Occupation is required';
      }
      if (!validateRequired(member.age)) {
        missingFields.push('Age');
        newErrors[`familyMember-${index}-age`] = 'Age is required';
      }
      if (member.dependent === undefined || member.dependent === null) {
        missingFields.push('Dependent status');
        newErrors[`familyMember-${index}-dependent`] = 'Please select if dependent';
      }

      // If any fields are missing for this member
      if (missingFields.length > 0) {
        isValid = false;
        toast.error(
          `Member ${memberNumber}: Please fill in the following required fields: ${missingFields.join(', ')}`, 
          {
            duration: 4000,
            position: 'top-center',
            style: {
              background: '#FEE2E2',
              color: '#991B1B',
              padding: '16px',
              borderRadius: '8px',
            },
          }
        );
      }
    }

    // Only proceed with other validations if family members are valid
    if (isValid) {
      if (!validateRequired(formData.identification.aadharNumber)) {
        toast.error('Aadhar number is required', { 
          duration: 3000,
          position: 'top-center'
        });
        newErrors.aadharNumber = 'Aadhar number is required';
        isValid = false;
      } else if (!validateAadharNumber(formData.identification.aadharNumber)) {
        toast.error('Please enter a valid 12-digit Aadhar number', { 
          duration: 3000,
          position: 'top-center'
        });
        newErrors.aadharNumber = 'Invalid Aadhar number';
        isValid = false;
      }

      if (isValid && !validateRequired(formData.identification.panNumber)) {
        toast.error('PAN number is required', { 
          duration: 3000,
          position: 'top-center'
        });
        newErrors.panNumber = 'PAN number is required';
        isValid = false;
      } else if (isValid && !validatePanNumber(formData.identification.panNumber)) {
        toast.error('Please enter a valid PAN number (e.g., AAAAA1111A)', { 
          duration: 3000,
          position: 'top-center'
        });
        newErrors.panNumber = 'Invalid PAN number';
        isValid = false;
      }

      // Add other field validations here
    }

    setErrors(newErrors);

    if (isValid) {
      toast.success('All information has been validated successfully!', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#DCFCE7',
          color: '#166534',
          padding: '16px',
          borderRadius: '8px',
        },
      });
    }

    return isValid;
  };

  // Clear specific field error when user starts typing
  const clearError = (field: string) => {
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Expose validation function to parent
  useImperativeHandle(ref, () => ({
    validateForm: validateAllFields
  }));

  const addFamilyMember = () => {
    if (formData.identification.familyMembers.length >= 5) {
      toast.error('Maximum 5 family members can be added', {
        duration: 3000,
        icon: '⚠️',
        style: {
          background: '#FEE2E2',
          color: '#991B1B',
          padding: '16px',
          borderRadius: '8px',
        },
      });
      return;
    }

    const newMember = {
      name: '',
      relationship: '',
      occupation: '',
      age: '',
      dependent: false,
    };
    updateIdentification('familyMembers', [...formData.identification.familyMembers, newMember]);
    toast.success('New family member added', { duration: 2000 });
  };

  const updateFamilyMember = (index: number, field: string, value: any) => {
    const updatedMembers = formData.identification.familyMembers.map((member, i) =>
      i === index ? { ...member, [field]: value } : member
    );
    updateIdentification('familyMembers', updatedMembers);
  };

  const removeFamilyMember = (index: number) => {
    if (formData.identification.familyMembers.length <= 3) {
      toast.error('Minimum 3 family members are required', {
        duration: 3000,
        icon: '⚠️',
        style: {
          background: '#FEE2E2',
          color: '#991B1B',
          padding: '16px',
          borderRadius: '8px',
        },
      });
      return;
    }
    
    const updatedMembers = formData.identification.familyMembers.filter((_, i) => i !== index);
    updateIdentification('familyMembers', updatedMembers);
    toast.success('Family member removed successfully', { duration: 2000 });
  };

  // Add this helper function
  const openPreview = (imageUrl: string, title: string) => {
    setPreviewModal({
      isOpen: true,
      imageUrl,
      title,
    });
  };

  // Add this section after your document upload sections
  const DocumentPreviews = () => {
    const hasDocuments = formData.identification.profilePhoto ||
      formData.identification.aadharFront ||
      formData.identification.aadharBack ||
      formData.identification.panFront ||
      formData.identification.panBack;

    if (!hasDocuments) return null;

    return (
      <div className={previewStyles.container}>
        <h3 className={previewStyles.heading}>Uploaded Documents</h3>
        <div className={previewStyles.imageGrid}>
          {formData.identification.profilePhoto && (
            <div className={previewStyles.imageWrapper}>
              <img
                src={formData.identification.profilePhoto}
                alt="Profile Photo"
                className={previewStyles.image}
              />
              <div className={previewStyles.overlay}>
                <button
                  onClick={() => openPreview(formData.identification.profilePhoto!, 'Profile Photo')}
                  className={previewStyles.viewButton}
                >
                  View Full Image
                </button>
              </div>
            </div>
          )}
          
          {formData.identification.aadharFront && (
            <div className={previewStyles.imageWrapper}>
              <img
                src={formData.identification.aadharFront}
                alt="Aadhar Front"
                className={previewStyles.image}
              />
              <div className={previewStyles.overlay}>
                <button
                  onClick={() => openPreview(formData.identification.aadharFront!, 'Aadhar Card Front')}
                  className={previewStyles.viewButton}
                >
                  View Full Image
                </button>
              </div>
            </div>
          )}

          {formData.identification.aadharBack && (
            <div className={previewStyles.imageWrapper}>
              <img
                src={formData.identification.aadharBack}
                alt="Aadhar Back"
                className={previewStyles.image}
              />
              <div className={previewStyles.overlay}>
                <button
                  onClick={() => openPreview(formData.identification.aadharBack!, 'Aadhar Card Back')}
                  className={previewStyles.viewButton}
                >
                  View Full Image
                </button>
              </div>
            </div>
          )}

          {formData.identification.panFront && (
            <div className={previewStyles.imageWrapper}>
              <img
                src={formData.identification.panFront}
                alt="PAN Front"
                className={previewStyles.image}
              />
              <div className={previewStyles.overlay}>
                <button
                  onClick={() => openPreview(formData.identification.panFront!, 'PAN Card Front')}
                  className={previewStyles.viewButton}
                >
                  View Full Image
                </button>
              </div>
            </div>
          )}

          {formData.identification.panBack && (
            <div className={previewStyles.imageWrapper}>
              <img
                src={formData.identification.panBack}
                alt="PAN Back"
                className={previewStyles.image}
              />
              <div className={previewStyles.overlay}>
                <button
                  onClick={() => openPreview(formData.identification.panBack!, 'PAN Card Back')}
                  className={previewStyles.viewButton}
                >
                  View Full Image
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Profile Photo at the top */}
      <div className="flex justify-center">
        <div className="w-full max-w-xs space-y-2">
          <Label className="text-sm font-medium text-gray-700 block text-center">
            Profile Photo <span className="text-red-500">*</span>
          </Label>
          <Card className={`border-2 border-dashed  hover:border-form-accent transition-colors cursor-pointer ${
            errors.profilePhoto ? 'border-red-500' : 'border-gray-300'
          }`}>
            <CardContent className="p-6 text-center">
              <div
                className="relative w-fit mx-auto"
                style={{ display: 'inline-block' }}
                onClick={() => {
                  document.getElementById('profile-photo-upload')?.click();
                  clearError('profilePhoto');
                }}
              >
                {formData.identification.profilePhoto ? (
                  <img
                    src={formData.identification.profilePhoto}
                    alt="Profile Preview"
                    className="w-24 h-24 object-cover border cursor-pointer rounded-md"
                  />
                ) : (
                  <Upload className="w-12 h-12 mx-auto mb-2 text-gray-400 cursor-pointer" />
                )}
                <input
                  id="profile-photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  style={{ display: 'none' }}
                />
              </div>
              <p className="text-sm text-gray-500">PHOTO</p>
              <p className="text-xs text-gray-400">Upload your passport size photo</p>
            </CardContent>
          </Card>
          {errors.profilePhoto && (
            <p className="text-red-500 text-sm text-center">{errors.profilePhoto}</p>
          )}
        </div>
      </div>

      {/* Aadhar Number and PAN Number in same row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        <div>
          <Label htmlFor="aadharNumber" className="text-sm font-medium text-gray-700">
            Aadhar Number <span className="text-red-500">*</span>
          </Label>
          <Input
            id="aadharNumber"
            placeholder="Ex. 123456789012"
            value={formData.identification.aadharNumber}
            onChange={(e) => {
              updateIdentification('aadharNumber', e.target.value);
              clearError('aadharNumber');
            }}
            className={`mt-1 focus:ring-form-accent focus:border-form-accent ${
              errors.aadharNumber ? 'border-red-500' : 'border-gray-300'
            }`}
            maxLength={12}
          />
          {errors.aadharNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.aadharNumber}</p>
          )}
        </div>

        <div>
          <Label htmlFor="panNumber" className="text-sm font-medium text-gray-700">
            PAN Number <span className="text-red-500">*</span>
          </Label>
          <Input
            id="panNumber"
            placeholder="Ex. AAAAA1111A"
            value={formData.identification.panNumber}
            onChange={(e) => {
              updateIdentification('panNumber', e.target.value);
              clearError('panNumber');
            }}
            className={`mt-1 focus:ring-form-accent focus:border-form-accent ${
              errors.panNumber ? 'border-red-500' : 'border-gray-300'
            }`}
            maxLength={10}
            style={{ textTransform: 'uppercase' }}
          />
          {errors.panNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.panNumber}</p>
          )}
        </div>
      </div>

      {/* Aadhar Card upload below Aadhar number */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">
          Aadhar Card
        </Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Card className={`border-2 border-dashed hover:border-form-accent transition-colors cursor-pointer ${
              errors.aadharFront ? 'border-red-500' : 'border-gray-300'
            }`}>
              <CardContent className="p-4 text-center">
                <div
                  onClick={() => {
                    document.getElementById('aadhar-front-upload')?.click();
                    clearError('aadharFront');
                  }}
                  className="cursor-pointer"
                >
                  {formData.identification.aadharFront ? (
                    <img
                      src={formData.identification.aadharFront}
                      alt="Aadhar Front Preview"
                      className="w-20 h-12 mx-auto mb-2 object-cover border rounded-md"
                    />
                  ) : (
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  )}
                  <p className="text-xs text-gray-500">FRONT</p>
                  <p className="text-xs text-gray-400">Upload the front side of Aadhar card</p>
                  <input
                    id="aadhar-front-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAadharUpload('front')}
                    style={{ display: 'none' }}
                  />
                </div>
              </CardContent>
            </Card>
            {errors.aadharFront && (
              <p className="text-red-500 text-sm mt-1">{errors.aadharFront}</p>
            )}
          </div>
          <div>
            <Card className={`border-2 border-dashed hover:border-form-accent transition-colors cursor-pointer ${
              errors.aadharBack ? 'border-red-500' : 'border-gray-300'
            }`}>
              <CardContent className="p-4 text-center">
                <div
                  onClick={() => {
                    document.getElementById('aadhar-back-upload')?.click();
                    clearError('aadharBack');
                  }}
                  className="cursor-pointer"
                >
                  {formData.identification.aadharBack ? (
                    <img
                      src={formData.identification.aadharBack}
                      alt="Aadhar Back Preview"
                      className="w-20 h-12 mx-auto mb-2 object-cover border rounded-md"
                    />
                  ) : (
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  )}
                  <p className="text-xs text-gray-500">BACK</p>
                  <p className="text-xs text-gray-400">Upload the back side of Aadhar card</p>
                  <input
                    id="aadhar-back-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAadharUpload('back')}
                    style={{ display: 'none' }}
                  />
                </div>
              </CardContent>
            </Card>
            {errors.aadharBack && (
              <p className="text-red-500 text-sm mt-1">{errors.aadharBack}</p>
            )}
          </div>
        </div>
      </div>

      {/* PAN Card upload */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">
          PAN Card
        </Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Card className={`border-2 border-dashed hover:border-form-accent transition-colors cursor-pointer ${
              errors.panFront ? 'border-red-500' : 'border-gray-300'
            }`}>
              <CardContent className="p-4 text-center">
                <div
                  onClick={() => {
                    document.getElementById('pan-front-upload')?.click();
                    clearError('panFront');
                  }}
                  className="cursor-pointer"
                >
                  {formData.identification.panFront ? (
                    <img
                      src={formData.identification.panFront}
                      alt="PAN Front Preview"
                      className="w-20 h-12 mx-auto mb-2 object-cover border rounded-md"
                    />
                  ) : (
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  )}
                  <p className="text-xs text-gray-500">FRONT</p>
                  <p className="text-xs text-gray-400">Upload the front side of PAN card</p>
                  <input
                    id="pan-front-upload"
                    type="file"
                    accept="image/*"
                    onChange={handlePanUpload('front')}
                    style={{ display: 'none' }}
                  />
                </div>
              </CardContent>
            </Card>
            {errors.panFront && (
              <p className="text-red-500 text-sm mt-1">{errors.panFront}</p>
            )}
          </div>
          <div>
            <Card className={`border-2 border-dashed hover:border-form-accent transition-colors cursor-pointer ${
              errors.panBack ? 'border-red-500' : 'border-gray-300'
            }`}>
              <CardContent className="p-4 text-center">
                <div
                  onClick={() => {
                    document.getElementById('pan-back-upload')?.click();
                    clearError('panBack');
                  }}
                  className="cursor-pointer"
                >
                  {formData.identification.panBack ? (
                    <img
                      src={formData.identification.panBack}
                      alt="PAN Back Preview"
                      className="w-20 h-12 mx-auto mb-2 object-cover border rounded-md"
                    />
                  ) : (
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  )}
                  <p className="text-xs text-gray-500">BACK</p>
                  <p className="text-xs text-gray-400">Upload the back side of PAN card</p>
                  <input
                    id="pan-back-upload"
                    type="file"
                    accept="image/*"
                    onChange={handlePanUpload('back')}
                    style={{ display: 'none' }}
                  />
                </div>
              </CardContent>
            </Card>
            {errors.panBack && (
              <p className="text-red-500 text-sm mt-1">{errors.panBack}</p>
            )}
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="max-w-md">
        <Label htmlFor="emergencyContact" className="text-sm font-medium text-gray-700">
          Emergency Contact <span className="text-red-500">*</span>
        </Label>
        <Input
          id="emergencyContact"
          placeholder="Ex. 9876543210"
          value={formData.identification.emergencyContact}
          onChange={(e) => {
            updateIdentification('emergencyContact', e.target.value);
            clearError('emergencyContact');
          }}
          className={`mt-1 focus:ring-form-accent focus:border-form-accent ${
            errors.emergencyContact ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.emergencyContact && (
          <p className="text-red-500 text-sm mt-1">{errors.emergencyContact}</p>
        )}
      </div>

      {/* Family Members Section */}
      <div className="space-y-4">
     <div className="flex items-center justify-between">
  <div>
    <h3 className="text-lg font-medium text-gray-900">
      Details of Family Members <span className="text-red-500">*</span>
    </h3>
    <p className="text-sm text-gray-500 mt-1">
      (Minimum 3 members required)
    </p>
  </div>
  <Button
    type="button"
    onClick={addFamilyMember}
    className="bg-orange-500 text-white px-4 py-2 text-sm"
  >
    <Plus className="w-4 h-4 mr-2" />
    Add Member
  </Button>
</div>

        {formData.identification.familyMembers.map((member, index) => (
          <Card key={index} className="border-gray-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-md font-medium text-form-accent">Member {index + 1}</h4>
                {formData.identification.familyMembers.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFamilyMember(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`member-name-${index}`} className="text-sm font-medium text-gray-700">
                    Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id={`member-name-${index}`}
                    placeholder="Ex. John Doe"
                    value={member.name}
                    onChange={(e) => {
                      updateFamilyMember(index, 'name', e.target.value);
                      clearError(`familyMember-${index}-name`);
                    }}
                    className={`mt-1 focus:ring-form-accent focus:border-form-accent ${
                      errors[`familyMember-${index}-name`] ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors[`familyMember-${index}-name`] && (
                    <p className="text-red-500 text-sm mt-1">{errors[`familyMember-${index}-name`]}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor={`member-relationship-${index}`} className="text-sm font-medium text-gray-700">
                    Relationship <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id={`member-relationship-${index}`}
                    placeholder="Ex. Brother"
                    value={member.relationship}
                    onChange={(e) => {
                      updateFamilyMember(index, 'relationship', e.target.value);
                      clearError(`familyMember-${index}-relationship`);
                    }}
                    className={`mt-1 focus:ring-form-accent focus:border-form-accent ${
                      errors[`familyMember-${index}-relationship`] ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors[`familyMember-${index}-relationship`] && (
                    <p className="text-red-500 text-sm mt-1">{errors[`familyMember-${index}-relationship`]}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <Label htmlFor={`member-occupation-${index}`} className="text-sm font-medium text-gray-700">
                    Occupation/Organization <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id={`member-occupation-${index}`}
                    placeholder="Ex. MicroSoft"
                    value={member.occupation}
                    onChange={(e) => {
                      updateFamilyMember(index, 'occupation', e.target.value);
                      clearError(`familyMember-${index}-occupation`);
                    }}
                    className={`mt-1 focus:ring-form-accent focus:border-form-accent ${
                      errors[`familyMember-${index}-occupation`] ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors[`familyMember-${index}-occupation`] && (
                    <p className="text-red-500 text-sm mt-1">{errors[`familyMember-${index}-occupation`]}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor={`member-age-${index}`} className="text-sm font-medium text-gray-700">
                    Age <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id={`member-age-${index}`}
                    placeholder="Ex. 25"
                    value={member.age}
                    onChange={(e) => {
                      // Only allow numbers
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      updateFamilyMember(index, 'age', value);
                      clearError(`familyMember-${index}-age`);
                    }}
                    onBlur={() => {
                      if (!validateAge(member.age)) {
                        setErrors(prev => ({
                          ...prev,
                          [`familyMember-${index}-age`]: 'Please enter a valid age between 1 and 120'
                        }));
                      }
                    }}
                    type="text" // Keep as text to handle the input validation ourselves
                    inputMode="numeric" // Shows numeric keyboard on mobile devices
                    className={`mt-1 focus:ring-form-accent focus:border-form-accent ${
                      errors[`familyMember-${index}-age`] ? 'border-red-500' : 'border-gray-300'
                    }`}
                    maxLength={3} // Limit to 3 digits
                  />
                  {errors[`familyMember-${index}-age`] && (
                    <p className="text-red-500 text-sm mt-1">{errors[`familyMember-${index}-age`]}</p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <Label className="text-sm font-medium text-gray-700">
                  Dependent on you? <span className="text-red-500">*</span>
                </Label>
                <div className="mt-2 flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={`member-dependent-yes-${index}`}
                      name={`member-dependent-${index}`}
                      checked={member.dependent === true}
                      onChange={() => updateFamilyMember(index, 'dependent', true)}
                      className="w-4 h-4 text-form-accent border-gray-300 focus:ring-form-accent"
                    />
                    <Label htmlFor={`member-dependent-yes-${index}`} className="text-sm">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={`member-dependent-no-${index}`}
                      name={`member-dependent-${index}`}
                      checked={member.dependent === false}
                      onChange={() => updateFamilyMember(index, 'dependent', false)}
                      className="w-4 h-4 text-form-accent border-gray-300 focus:ring-form-accent"
                    />
                    <Label htmlFor={`member-dependent-no-${index}`} className="text-sm">No</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {formData.identification.familyMembers.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">Click "Add Member" to add family member details</p>
          </div>
        )}
      </div>

      {/* Add the modal */}
      <ImagePreviewModal
        isOpen={previewModal.isOpen}
        onClose={() => setPreviewModal(prev => ({ ...prev, isOpen: false }))}
        imageUrl={previewModal.imageUrl}
        title={previewModal.title}
      />

      {/* Add the document previews section */}
      <DocumentPreviews />
    </div>
  );
});

export default Identification;