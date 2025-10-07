import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Button } from '../../components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import type { FormData } from '../pages/applyform';

interface QualificationProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

interface ValidationErrors {
  highestQualification?: string;
  workExperience?: Array<{
    company?: string;
    experienceYears?: string;
  }>;
}

export interface QualificationRef {
  validateForm: () => boolean;
}

export const Qualification = forwardRef<QualificationRef, QualificationProps>(({
  formData,
  updateFormData,
}, ref) => {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [previewExp, setPreviewExp] = useState({ company: '', experienceYears: '' });

  // Validation functions
  const validateRequired = (value: string, fieldName: string): string | undefined => {
    if (!value.trim()) return `${fieldName} is required`;
    return undefined;
  };

  const validateExperienceYears = (years: string): string | undefined => {
    if (!years.trim()) return 'Experience years is required';
    const num = parseInt(years);
    if (isNaN(num) || num < 0) return 'Please enter a valid number';
    if (num > 50) return 'Experience cannot exceed 50 years';
    return undefined;
  };

  // Function to validate all fields
  const validateAllFields = (): boolean => {
    const newErrors: ValidationErrors = {};
    
    // Validate highest qualification
    if (!formData.qualification.highestQualification) {
      newErrors.highestQualification = 'Highest qualification is required';
    }
    
    // Validate work experience if any exists
    if (formData.qualification.workExperience.length > 0) {
      newErrors.workExperience = formData.qualification.workExperience.map((exp, index) => ({
        company: validateRequired(exp.company, 'Company name'),
        experienceYears: validateExperienceYears(exp.experienceYears || ''),
      }));
    }
    
    setErrors(newErrors);
    
    // Check if there are any errors
    const hasErrors = 
      newErrors.highestQualification ||
      (newErrors.workExperience && newErrors.workExperience.some(exp => exp.company || exp.experienceYears));
    
    return !hasErrors;
  };

  // Expose validation function to parent
  useImperativeHandle(ref, () => ({
    validateForm: validateAllFields,
  }));

  const updateQualification = (field: string, value: any) => {
    updateFormData({
      qualification: {
        ...formData.qualification,
        [field]: value,
      },
    });
  };

  const addWorkExperience = () => {
    let newEntry = { company: '', experienceYears: '' };
    if (previewExp.company.trim() || previewExp.experienceYears.trim()) {
      newEntry = { 
        company: previewExp.company, 
        experienceYears: previewExp.experienceYears 
      };
      setPreviewExp({ company: '', experienceYears: '' }); // Reset preview
    }
    const newWorkExp = [...formData.qualification.workExperience, newEntry];
    updateQualification('workExperience', newWorkExp);
  };

  const updateWorkExperience = (index: number, field: 'company' | 'experienceYears', value: string) => {
    const updated = formData.qualification.workExperience.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    );
    updateQualification('workExperience', updated);
    
    // Clear specific field error when user starts typing
    if (errors.workExperience && errors.workExperience[index]) {
      const newErrors = { ...errors };
      if (newErrors.workExperience) {
        newErrors.workExperience[index] = {
          ...newErrors.workExperience[index],
          [field]: undefined
        };
        setErrors(newErrors);
      }
    }
  };

  const removeWorkExperience = (index: number) => {
    const updated = formData.qualification.workExperience.filter((_, i) => i !== index);
    updateQualification('workExperience', updated);
    
    // Remove corresponding error
    if (errors.workExperience) {
      const newErrors = { ...errors };
      if (Array.isArray(newErrors.workExperience)) {
        newErrors.workExperience = newErrors.workExperience.filter((_, i) => i !== index);
      }
      setErrors(newErrors);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="highestQualification" className="text-sm font-medium text-gray-700">
          Highest Qualification <span className="text-red-500">*</span>
        </Label>
        <Select
          value={formData.qualification.highestQualification}
          onValueChange={(value) => {
            updateQualification('highestQualification', value);
            // Clear error when user selects a value
            setErrors(prev => ({ ...prev, highestQualification: undefined }));
          }}
        >
          <SelectTrigger className={`mt-1 border ${
            errors.highestQualification ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
          }`}>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Bachelor's Degree">Bachelor's Degree</SelectItem>
            <SelectItem value="Master's Degree">Master's Degree</SelectItem>
            <SelectItem value="PhD">PhD</SelectItem>
            <SelectItem value="Diploma">Diploma</SelectItem>
            <SelectItem value="Certificate">Certificate</SelectItem>
            <SelectItem value="High School">High School</SelectItem>
          </SelectContent>
        </Select>
        {errors.highestQualification && (
          <p className="mt-1 text-sm text-red-600">{errors.highestQualification}</p>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <Label className="text-sm font-medium text-gray-700">Work Experience</Label>
          <Button
            type="button"
            onClick={addWorkExperience}
            className="bg-orange-500 text-white px-4 py-2 text-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>

        <div className="space-y-4">
          {formData.qualification.workExperience.map((exp, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium text-gray-700">Work Experience {index + 1}</h4>
                <Button
                  type="button"
                  onClick={() => removeWorkExperience(index)}
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-300"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Company Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    placeholder="Ex. Microsoft"
                    value={exp.company}
                    onChange={(e) => updateWorkExperience(index, 'company', e.target.value)}
                    className={`mt-1 border focus:ring-form-accent focus:border-form-accent ${
                      errors.workExperience?.[index]?.company ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                    }`}
                  />
                  {errors.workExperience?.[index]?.company && (
                    <p className="mt-1 text-sm text-red-600">{errors.workExperience[index].company}</p>
                  )}
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Experience (Years) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    placeholder="Ex. 2"
                    type="number"
                    min="0"
                    max="50"
                    value={exp.experienceYears || ''}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, ''); // Only allow numbers
                      updateWorkExperience(index, 'experienceYears', value);
                    }}
                    className={`mt-1 border focus:ring-form-accent focus:border-form-accent ${
                      errors.workExperience?.[index]?.experienceYears ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                    }`}
                  />
                  {errors.workExperience?.[index]?.experienceYears && (
                    <p className="mt-1 text-sm text-red-600">{errors.workExperience[index].experienceYears}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {formData.qualification.workExperience.length === 0 && (
          <div className="mt-4 border border-gray-200 rounded-lg p-4 space-y-3">
            <h4 className="text-sm font-medium text-gray-700">Add Work Experience</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Company Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="newCompany"
                  placeholder="Ex. Microsoft"
                  value={previewExp.company}
                  onChange={(e) => setPreviewExp({ ...previewExp, company: e.target.value })}
                  className="mt-1 border focus:ring-form-accent focus:border-form-accent"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Experience (Years) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="newExperienceYears"
                  placeholder="Ex. 2"
                  type="number"
                  min="0"
                  max="50"
                  value={previewExp.experienceYears}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, ''); // Only allow numbers
                    setPreviewExp({ ...previewExp, experienceYears: value });
                  }}
                  className="mt-1 border focus:ring-form-accent focus:border-form-accent"
                />
              </div>
            </div>
          
            <p className="text-xs text-gray-500">
              Fill in both company name and years of experience, then click "Add" above.
            </p>
          </div>
        )}
      </div>
    </div>
  );
});

Qualification.displayName = 'Qualification';