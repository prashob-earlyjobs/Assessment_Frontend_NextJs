import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Checkbox } from '../../components/ui/checkbox';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../../components/ui/select';
import type { FormData } from '../pages/applyform';
import { toast } from 'react-hot-toast';
// ...existing imports...
interface AboutProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

interface ValidationErrors {
  tellAboutYourself?: string;
  whyJoinHR?: string;
  howContribute?: string;
  hoursContribute?: string;
  categories?: string;
  availability?: string;
}

export interface AboutRef {
  validateForm: () => boolean;
}

const categories = [
  'BPO', 'Information Technology', 'Banking', 'Insurance', 'Aviation', 'Oil And Gas',
  'Retail', 'Education', 'Manufacturing', 'Consumer Goods', 'Health Care', 'ITES',
  'Entertainment', 'Finance', 'Textile', 'Media and news', 'Food processing', 'Hospitality',
  'Construction', 'Law', 'Advertising', 'E-commerce', 'Other'
];

export const About = forwardRef<AboutRef, AboutProps>(({
  formData,
  updateFormData,
}, ref) => {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [wordCounts, setWordCounts] = useState({
    tellAboutYourself: 0,
    whyJoinHR: 0,
    howContribute: 0
  });

  // Function to count words
  const countWords = (text: string): number => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  // Validation functions
  const validateWordCount = (text: string, fieldName: string): string | undefined => {
    const wordCount = countWords(text);
    if (!text.trim()) return `${fieldName} is required`;
    if (wordCount < 50) return `${fieldName} must contain at least 50 words (current: ${wordCount})`;
    return undefined;
  };

  const validateHours = (hours: string): string | undefined => {
    if (!hours || !hours.trim()) return 'Hours per day is required';
    const num = parseInt(hours);
    if (isNaN(num) || num <= 0) return 'Please enter a valid number of hours';
    if (num > 24) return 'Hours cannot exceed 24 per day';
    return undefined;
  };

  const validateAvailability = (days: string): string | undefined => {
    if (!days || !days.trim()) return 'Joining availability is required';
    const num = parseInt(days);
    if (isNaN(num) || num < 0) return 'Please enter a valid number of days';
    if (num > 365) return 'Availability cannot exceed 365 days';
    return undefined;
  };

  // Function to validate all fields
  const validateAllFields = (): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    // Validate text fields with word count
    const textFields = {
      tellAboutYourself: 'Tell us about yourself',
      whyJoinHR: 'Why you want to join us',
      howContribute: 'How you can contribute'
    };

    // Check text fields
    (Object.entries(textFields) as Array<[keyof typeof textFields, string]>).forEach(([field, label]) => {
      const value = formData.about[field];
      if (typeof value === 'string') {
        const error = validateWordCount(value, label);
        if (error) {
          newErrors[field as keyof ValidationErrors] = error;
          isValid = false;
          toast.error(`${label}: ${error}`, {
            duration: 3000,
            position: 'top-center',
          });
        }
      }
    });

    // Validate hours
    const hoursError = validateHours(formData.about.hoursContribute);
    if (hoursError) {
      newErrors.hoursContribute = hoursError;
      isValid = false;
      toast.error(`Hours contribution: ${hoursError}`, {
        duration: 3000,
        position: 'top-center',
      });
    }

    // Validate categories
    if (formData.about.categories.length === 0) {
      newErrors.categories = 'Please select at least one category';
      isValid = false;
      toast.error('Please select at least one category of interest', {
        duration: 3000,
        position: 'top-center',
      });
    }

    // Validate availability
    const availabilityError = validateAvailability(formData.about.availability);
    if (availabilityError) {
      newErrors.availability = availabilityError;
      isValid = false;
      toast.error(`Availability: ${availabilityError}`, {
        duration: 3000,
        position: 'top-center',
      });
    }

    setErrors(newErrors);

    if (isValid) {
      toast.success('All information is valid!', {
        duration: 2000,
        position: 'top-center',
      });
    }

    return isValid;
  };

  // Expose validation function to parent
  useImperativeHandle(ref, () => ({
    validateForm: validateAllFields,
  }));

  // Function to handle text input with word count tracking
  const handleTextChange = (field: string, value: string) => {
    updateAbout(field, value);
    
    // Update word count
    if (field in wordCounts) {
      setWordCounts(prev => ({
        ...prev,
        [field]: countWords(value)
      }));
    }
    
    // Clear error when user starts typing
    if (errors[field as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Function to prevent copy-paste
  const preventCopyPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    // You could show a toast notification here if desired
    console.log('Copy-paste is disabled for this field');
  };

  const updateAbout = (field: string, value: any) => {
    updateFormData({
      about: {
        ...formData.about,
        [field]: value,
      },
    });
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    const updatedCategories = checked
      ? [...formData.about.categories, category]
      : formData.about.categories.filter(c => c !== category);
    updateAbout('categories', updatedCategories);
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="tellAboutYourself" className="text-sm font-medium text-gray-700">
          Tell us about yourself (minimum 50 words) <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="tellAboutYourself"
          placeholder="Minimum of 50 words"
          value={formData.about.tellAboutYourself}
          onChange={(e) => handleTextChange('tellAboutYourself', e.target.value)}
          onPaste={preventCopyPaste}
          onCopy={preventCopyPaste}
          onCut={preventCopyPaste}
          className={`mt-1 min-h-[100px] border-gray-300 focus:ring-form-accent focus:border-form-accent resize-none ${
            errors.tellAboutYourself ? 'border-red-500' : ''
          }`}
          rows={4}
        />
        <div className="mt-1 flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {wordCounts.tellAboutYourself || 0} words (minimum 50 required)
          </span>
          {errors.tellAboutYourself && (
            <span className="text-red-500 text-sm">{errors.tellAboutYourself}</span>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="whyJoinHR" className="text-sm font-medium text-gray-700">
          Why you want to join us as a HR Recruiter (minimum 50 Words) <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="whyJoinHR"
          placeholder="Minimum of 50 words"
          value={formData.about.whyJoinHR}
          onChange={(e) => handleTextChange('whyJoinHR', e.target.value)}
          onPaste={preventCopyPaste}
          onCopy={preventCopyPaste}
          onCut={preventCopyPaste}
          className={`mt-1 min-h-[100px] border-gray-300 focus:ring-form-accent focus:border-form-accent resize-none ${
            errors.whyJoinHR ? 'border-red-500' : ''
          }`}
          rows={4}
        />
        <div className="mt-1 flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {wordCounts.whyJoinHR || 0} words (minimum 50 required)
          </span>
          {errors.whyJoinHR && (
            <span className="text-red-500 text-sm">{errors.whyJoinHR}</span>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="howContribute" className="text-sm font-medium text-gray-700">
          How you can contribute to society as a Recruiter (minimum 50 words) <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="howContribute"
          placeholder="Minimum of 50 words"
          value={formData.about.howContribute}
          onChange={(e) => handleTextChange('howContribute', e.target.value)}
          onPaste={preventCopyPaste}
          onCopy={preventCopyPaste}
          onCut={preventCopyPaste}
          className={`mt-1 min-h-[100px] border-gray-300 focus:ring-form-accent focus:border-form-accent resize-none ${
            errors.howContribute ? 'border-red-500' : ''
          }`}
          rows={4}
        />
        <div className="mt-1 flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {wordCounts.howContribute || 0} words (minimum 50 required)
          </span>
          {errors.howContribute && (
            <span className="text-red-500 text-sm">{errors.howContribute}</span>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="hoursContribute" className="text-sm font-medium text-gray-700">
          How many hours you can contribute daily as a Recruiter? (in Hours) <span className="text-red-500">*</span>
        </Label>
        <Input
          id="hoursContribute"
          placeholder="Ex. 8"
          value={formData.about.hoursContribute}
          onChange={(e) => updateAbout('hoursContribute', e.target.value)}
          className={`mt-1 border-gray-300 focus:ring-form-accent focus:border-form-accent ${
            errors.hoursContribute ? 'border-red-500' : ''
          }`}
        />
        {errors.hoursContribute && (
          <span className="text-red-500 text-sm mt-1">{errors.hoursContribute}</span>
        )}
      </div>

      <div>
        <Label className="text-sm font-medium text-gray-700">
          Which category you are interested to hire <span className="text-red-500">*</span>
        </Label>
        <Select
          value={""}
          onValueChange={cat => {
            if (cat && !formData.about.categories.includes(cat)) {
              updateAbout('categories', [...formData.about.categories, cat]);
            }
          }}>
          <SelectTrigger className="h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-400 bg-white/50 font-medium mt-3">
            <SelectValue placeholder="Select a category to add" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            {categories.filter(cat => !formData.about.categories.includes(cat)).map(cat => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex flex-wrap gap-3 mt-4">
          {formData.about.categories.map((category, index) => (
            <span key={index} className="gap-2 py-2 px-4 bg-orange-50 text-orange-700 border border-orange-200 rounded-xl font-medium flex items-center">
              {category}
              <span
                className="ml-2 h-3 w-3 cursor-pointer hover:text-red-500 transition-colors"
                onClick={() => {
                  const updated = formData.about.categories.filter((_, i) => i !== index);
                  updateAbout('categories', updated);
                }}
                role="button"
                aria-label={`Remove ${category}`}
              >✕</span>
            </span>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="availability" className="text-sm font-medium text-gray-700">
          How soon you can join? (in Days) <span className="text-red-500">*</span>
        </Label>
        <Input
          id="availability"
          placeholder="Ex. 30"
          value={formData.about.availability}
          onChange={(e) => updateAbout('availability', e.target.value)}
          className={`mt-1 border-gray-300 focus:ring-form-accent focus:border-form-accent ${
            errors.availability ? 'border-red-500' : ''
          }`}
        />
        {errors.availability && (
          <span className="text-red-500 text-sm mt-1">{errors.availability}</span>
        )}
      </div>
    </div>
  );
});

export default About;