'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Checkbox } from '../components/ui/checkbox';
import { Button } from '../components/ui/button';
import { Toaster, toast } from 'sonner';
import { Building2, School, Loader2, CheckCircle } from 'lucide-react';
import Footer from '../components/pages/footer';
import { useRouter } from 'next/navigation';


const SHEETDB_URL = 'https://sheetdb.io/api/v1/ip1ihev569oa2';


type CheckedState = boolean | 'indeterminate';

type EventType = {
  workshop: boolean;
  aiAssessment: boolean;
  placementDrive: boolean;
  other: boolean;
  otherText: string;
};

type FormDataType = {
  collegeName: string;
  department: string;
  coordinatorName: string;
  eventType: EventType;
  date: string;
  feedback1: string;            // experience (textarea)
  feedback2: boolean;           // benefits (yes/no)
  feedback3: boolean;           // collaborate again (yes/no)
  testimonial: string;
  permission: boolean;
};

// --- Add this helper type + handler ---
type StringKeys<T> = { [K in keyof T]: T[K] extends string ? K : never }[keyof T];
type FormStringKey = StringKeys<FormDataType>;



export default function CollegeFeedbackForm() {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormDataType>({
    collegeName: '',
    department: '',
    coordinatorName: '',
    eventType: {
      workshop: false,
      aiAssessment: false,
      placementDrive: false,
      other: false,
      otherText: ''
    },
    date: '',
    feedback1: '',      // experience
    feedback2: false,   // benefits (yes/no)
    feedback3: false,   // collaborate again (yes/no)
    testimonial: '',
    permission: false
  });
  const handleStringFieldChange = <K extends FormStringKey>(key: K, value: string) => {
  setFormData(prev => ({
    ...prev,
    [key]: value,
  }));
};

  // === Handle checkbox change with proper CheckedState and typed key ===
  const handleEventTypeChange = (type: keyof EventType, checked: CheckedState) => {
    if (checked === 'indeterminate') return;
    setFormData(prev => ({
      ...prev,
      eventType: {
        ...prev.eventType,
        [type]: checked
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Determine event type
    const eventType = formData.eventType.workshop ? 'Workshop' :
                     formData.eventType.aiAssessment ? 'AI Assessment' :
                     formData.eventType.placementDrive ? 'Placement Drive' :
                     formData.eventType.other ? formData.eventType.otherText.trim() : '';

    if (!eventType) {
      toast.error('Please select or specify an event type.');
      setIsSubmitting(false);
      return;
    }

    const payload = {
      'College Name': formData.collegeName,
      'Department': formData.department || 'N/A',
      'TPO': formData.coordinatorName,
      'Event Type': eventType,
      'Date': formData.date,
      'Experience': formData.feedback1 || 'N/A',
      'Benefits': formData.feedback2 ? 'Yes' : 'No',
      'Collaborate again': formData.feedback3 ? 'Yes' : 'No',
      'Testimonial': formData.testimonial || 'N/A',
      'Permission to Share': formData.permission ? 'Yes' : 'No',
      'Submitted At': new Date().toLocaleString()
    };

    try {
      const response = await fetch(SHEETDB_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success('Your feedback has been submitted successfully!', {
          description: 'Thank you for your time!',
        });

        // Reset form
        setFormData({
          collegeName: '',
          department: '',
          coordinatorName: '',
          eventType: { workshop: false, aiAssessment: false, placementDrive: false, other: false, otherText: '' },
          date: '',
          feedback1: '',
          feedback2: false,
          feedback3: false,
          testimonial: '',
          permission: false
        });
      } else {
        throw new Error('Server error');
      }
    } catch (error) {
      console.error('Submission failed:', error);
      toast.error('Failed to submit feedback.', {
        description: 'Please check your connection and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Sonner Toaster */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#fff',
            border: '1px solid #fed7aa',
            color: '#c2410c',
            fontSize: '15px',
          },
          classNames: {
            success: 'border-green-500 bg-green-50 text-green-800',
            error: 'border-red-500 bg-red-50 text-red-800',
          },
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-orange-200">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="flex items-center justify-center gap-3">
              <img src="/images/logo.png" className='h-[4rem] cursor-pointer' onClick={()=> router.push("/")}/>
            </div>
          </div>
        </header>

        {/* Form */}
        <main className="max-w-4xl mx-auto px-4 py-8">
          <Card className="border-orange-200 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
              <div className="flex items-center gap-2">
                <School className="h-6 w-6" />
                <CardTitle className="text-2xl">College Feedback Form </CardTitle>
              </div>
              <CardDescription className="text-orange-50">
                Your input helps us improve
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* College & Department */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="college" className="text-orange-700 font-semibold">
                      College Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="college"
                      placeholder="e.g. ABC Engineering College"
                      value={formData.collegeName}
                      onChange={(e) => setFormData(prev => ({ ...prev, collegeName: e.target.value }))}
                      className="border-orange-300 focus:border-orange-500 focus:ring-orange-500"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department" className="text-orange-700 font-semibold">
                      Department
                    </Label>
                    <Input
                      id="department"
                      placeholder="e.g. Computer Science"
                      value={formData.department}
                      onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                      className="border-orange-300 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                </div>

                {/* Coordinator */}
                <div className="space-y-2">
                  <Label htmlFor="coordinator" className="text-orange-700 font-semibold">
                    TPO / Coordinator Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="coordinator"
                    placeholder="e.g. Prof. John Doe"
                    value={formData.coordinatorName}
                    onChange={(e) => setFormData(prev => ({ ...prev, coordinatorName: e.target.value }))}
                    className="border-orange-300 focus:border-orange-500 focus:ring-orange-500"
                    required
                  />
                </div>

                {/* Date */}
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-orange-700 font-semibold">
                    Date <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    className="border-orange-300 focus:border-orange-500 focus:ring-orange-500"
                    required
                  />
                </div>

                {/* Event Type */}
                <div className="space-y-3">
                  <Label className="text-orange-700 font-semibold">Event Type <span className="text-red-500">*</span></Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 border border-orange-200 rounded-lg bg-orange-50/30">
                    {[
                      { id: 'workshop', label: 'Workshop', icon: 'Tool' },
                      { id: 'aiAssessment', label: 'AI Assessment', icon: 'Robot' },
                      { id: 'placementDrive', label: 'Placement Drive', icon: 'Briefcase' },
                    ].map(item => (
                      <div key={item.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={item.id}
                          checked={formData.eventType[item.id as keyof EventType] as boolean}
                          onCheckedChange={(checked) => handleEventTypeChange(item.id as keyof EventType, checked)}
                          className="border-orange-500 text-orange-500"
                        />
                        <label htmlFor={item.id} className="text-sm font-medium cursor-pointer">
                          {item.icon} {item.label}
                        </label>
                      </div>
                    ))}

                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="other"
                        checked={formData.eventType.other}
                        onCheckedChange={(checked) => handleEventTypeChange('other', checked)}
                        className="border-orange-500 text-orange-500"
                      />
                      <label htmlFor="other" className="text-sm font-medium cursor-pointer">
                        Other:
                      </label>
                      <Input
                        placeholder="Specify..."
                        value={formData.eventType.otherText}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          eventType: { ...prev.eventType, otherText: e.target.value }
                        }))}
                        className="flex-1 border-orange-300 focus:border-orange-500 focus:ring-orange-500 text-sm"
                        disabled={!formData.eventType.other}
                      />
                    </div>
                  </div>
                </div>

                {/* Feedback Questions */}
                <div className="space-y-4 p-5 bg-orange-50 border-l-4 border-orange-400 rounded-r-lg">
                  <h3 className="font-semibold text-orange-800 mb-4 flex items-center gap-2">
                    Please share your feedback (3–4 lines):
                  </h3>

                  <div className="space-y-1">
                    <Label className="text-sm font-medium text-orange-700">How was your experience with EarlyJobs?</Label>
                    <Textarea
                      value={formData.feedback1}
                      onChange={(e) => setFormData(prev => ({ ...prev, feedback1: (e.target as HTMLTextAreaElement).value }))}
                      placeholder="Your thoughts..."
                      className="min-h-[80px] border-orange-300 focus:border-orange-500 focus:ring-orange-500 resize-none"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-orange-100">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Did students benefit from the event?</p>
                        <p className="text-xs text-gray-500">Select Yes or No</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <Checkbox
                            id="benefits_yes"
                            checked={formData.feedback2}
                            onCheckedChange={(checked) => {
                              if (checked !== 'indeterminate') setFormData(prev => ({ ...prev, feedback2: checked }));
                            }}
                            className="border-orange-500 text-orange-500"
                          />
                          <span className="text-sm">Yes</span>
                        </label>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-orange-100">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Would you like to collaborate again?</p>
                        <p className="text-xs text-gray-500">Select Yes or No</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <Checkbox
                            id="collab_yes"
                            checked={formData.feedback3}
                            onCheckedChange={(checked) => {
                              if (checked !== 'indeterminate') setFormData(prev => ({ ...prev, feedback3: checked }));
                            }}
                            className="border-orange-500 text-orange-500"
                          />
                          <span className="text-sm">Yes</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Testimonial */}
                <div className="space-y-2">
                  <Label className="text-orange-700 font-semibold">
                    Your Feedback / Testimonial
                  </Label>
                  <Textarea
                    value={formData.testimonial}
                    onChange={(e) => setFormData(prev => ({ ...prev, testimonial: e.target.value }))}
                    placeholder="We'd love to feature your words!"
                    className="min-h-[100px] border-orange-300 focus:border-orange-500 focus:ring-orange-500 resize-none"
                  />
                </div>

                {/* Permission */}
                <div className="flex items-start space-x-3 p-4 bg-orange-50 rounded-lg">
                  <Checkbox
                    id="permission"
                    checked={formData.permission}
                    onCheckedChange={(checked) => {
                      if (checked !== 'indeterminate') {
                        setFormData(prev => ({ ...prev, permission: checked }));
                      }
                    }}
                    className="mt-1 border-orange-500 text-orange-500"
                  />
                  <label htmlFor="permission" className="text-sm leading-6 text-orange-800 cursor-pointer">
                    Permission to share your testimonial publicly on our website and social media
                  </label>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-6 text-lg shadow-lg transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Submit Feedback
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
      <Footer />
    </>
  );
}