"use client";
import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import { toast } from 'sonner';
import { Loader2, CheckCircle2, Home } from 'lucide-react';
import { submitEnquiry } from '../services/servicesapis';

const EnquiryForm: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sourceFromUrl = searchParams.get('source') || 'website';
  
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    expectations: [] as string[],
    otherExpectation: '',
    remarks: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleExpectationToggle = (value: string) => {
    setFormData((prev) => {
      const isSelected = prev.expectations.includes(value);
      let newExpectations: string[];
      
      if (value === 'other') {
        // If unchecking "other", clear the otherExpectation text
        if (isSelected) {
          newExpectations = prev.expectations.filter((exp) => exp !== 'other');
          return { ...prev, expectations: newExpectations, otherExpectation: '' };
        } else {
          newExpectations = [...prev.expectations, 'other'];
        }
      } else {
        // Toggle regular options - allow multiple selections
        if (isSelected) {
          newExpectations = prev.expectations.filter((exp) => exp !== value);
        } else {
          newExpectations = [...prev.expectations, value];
        }
      }
      
      return { ...prev, expectations: newExpectations };
    });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error('Please enter your name');
      return false;
    }
    if (!formData.mobile.trim()) {
      toast.error('Please enter your mobile number');
      return false;
    }
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(formData.mobile.replace(/\D/g, ''))) {
      toast.error('Please enter a valid 10-digit mobile number');
      return false;
    }
    if (!formData.email.trim()) {
      toast.error('Please enter your email');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (formData.expectations.length === 0) {
      toast.error('Please select at least one option for what you are expecting from us');
      return false;
    }
    if (formData.expectations.includes('other') && !formData.otherExpectation.trim()) {
      toast.error('Please specify your other expectation');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Format mobile number (remove any non-digits and ensure it's 10 digits)
      const cleanMobile = formData.mobile.replace(/\D/g, '');
      // Send mobile as 10 digits only (without +91 prefix)
      const formattedMobile = cleanMobile.length === 10 ? cleanMobile : formData.mobile.replace(/\D/g, '');

      // Build expectations array - replace 'other' with the actual otherExpectation value
      const expectationsArray = formData.expectations.map((exp) => 
        exp === 'other' ? formData.otherExpectation.trim() : exp
      );

      const enquiryData = {
        name: formData.name.trim(),
        mobile: formattedMobile,
        email: formData.email.trim(),
        expectations: expectationsArray,
        remarks: formData.remarks.trim() || undefined,
        source: sourceFromUrl,
      };

      const response = await submitEnquiry(enquiryData);

      if (response.success) {
        // Reset form
        setFormData({
          name: '',
          mobile: '',
          email: '',
          expectations: [],
          otherExpectation: '',
          remarks: '',
        });
        
        // Show success dialog
        setShowSuccessDialog(true);
      } else {
        throw new Error(response.message || 'Failed to submit enquiry');
      }
    } catch (error: any) {
      console.error('Enquiry submission error:', error);
      // Error toast is already shown in submitEnquiry function
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50">
      {/* Logo Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-center">
            <img
              src="/images/logo.png"
              alt="EarlyJobs Logo"
              className="h-16 sm:h-20 w-auto"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </div>

        <Card className="shadow-xl border-2 border-gray-200">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-900 text-center">
              Enquiry Form
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700 font-medium">
                  Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>

              {/* Mobile Field */}
              <div className="space-y-2">
                <Label htmlFor="mobile" className="text-gray-700 font-medium">
                  Mobile <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  placeholder="Enter your 10-digit mobile number"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  maxLength={10}
                  className="w-full"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>

              {/* Expectation Field - Multi-select with checkboxes */}
              <div className="space-y-3">
                <Label className="text-gray-700 font-medium">
                  What you are expecting from us <span className="text-red-500">*</span>
                </Label>
                <div className="space-y-3 border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <label className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-2 rounded transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.expectations.includes('Looking for job')}
                      onChange={() => handleExpectationToggle('Looking for job')}
                      className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
                    />
                    <span className="text-gray-700">Looking for job</span>
                  </label>
                  
                  <label className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-2 rounded transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.expectations.includes('company-tieups')}
                      onChange={() => handleExpectationToggle('company-tieups')}
                      className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
                    />
                    <span className="text-gray-700">Company Tie-ups</span>
                  </label>
                  
                  <label className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-2 rounded transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.expectations.includes('college-tieups')}
                      onChange={() => handleExpectationToggle('college-tieups')}
                      className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
                    />
                    <span className="text-gray-700">College Tie-ups</span>
                  </label>
                  
                  <label className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-2 rounded transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.expectations.includes('Looking for franchise')}
                      onChange={() => handleExpectationToggle('Looking for franchise')}
                      className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
                    />
                    <span className="text-gray-700">Looking for franchise</span>
                  </label>
                  
                  <label className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-2 rounded transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.expectations.includes('other')}
                      onChange={() => handleExpectationToggle('other')}
                      className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
                    />
                    <span className="text-gray-700">Other</span>
                  </label>
                  
                  {/* Other expectation text input - shown when "Other" is checked */}
                  {formData.expectations.includes('other') && (
                    <div className="ml-7 mt-2">
                      <Input
                        type="text"
                        placeholder="Please specify your expectation"
                        value={formData.otherExpectation}
                        onChange={(e) => setFormData((prev) => ({ ...prev, otherExpectation: e.target.value }))}
                        className="w-full"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Remarks Field - Optional */}
              <div className="space-y-2">
                <Label htmlFor="remarks" className="text-gray-700 font-medium">
                  Remarks
                </Label>
                <Textarea
                  id="remarks"
                  name="remarks"
                  placeholder="Any additional remarks or comments (optional)"
                  value={formData.remarks}
                  onChange={handleChange}
                  rows={4}
                  className="w-full resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-6 text-lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Enquiry'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <DialogTitle className="text-center text-2xl font-bold text-gray-900">
              Enquiry Submitted Successfully!
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600 pt-2">
              Thank you for reaching out to us. We have received your enquiry and our team will contact you within 24-48 hours.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center pt-4">
            <Button
              onClick={() => router.push('/')}
              className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white font-semibold"
            >
              <Home className="mr-2 h-4 w-4" />
              Explore EarlyJobs.ai
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EnquiryForm;

