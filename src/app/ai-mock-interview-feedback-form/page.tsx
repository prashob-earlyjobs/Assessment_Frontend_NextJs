'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { Toaster, toast } from 'sonner';
import { Loader2, CheckCircle } from 'lucide-react';
import Footer from '../components/pages/footer';
import { useRouter } from 'next/navigation';

const SHEETDB_URL = 'https://sheetdb.io/api/v1/8qhngx57d5arm'; 

type FormDataType = {
  fullName: string;
  collegeName: string;
  courseYear: string;
  aiHelp: string;
  testimonialOneLine: string;
  rating: number;
  publicConsent: 'yes_name' | 'yes_anonymous' | 'no';
  photo?: File | null;
};

export default function AIMockInterviewFeedbackForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormDataType>({
    fullName: '',
    collegeName: '',
    courseYear: '',
    aiHelp: '',
    testimonialOneLine: '',
    rating: 5,
    publicConsent: 'yes_name',
    photo: null
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFormData(prev => ({ ...prev, photo: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // basic validation
    if (!formData.fullName.trim()) { toast.error('Please enter your full name'); return; }
    if (!formData.collegeName.trim()) { toast.error('Please enter your college/university name'); return; }
    if (!formData.courseYear.trim()) { toast.error('Please enter your course & year'); return; }
    if (!formData.aiHelp.trim()) { toast.error('Please describe how the AI mock interview helped you'); return; }
    if (!formData.testimonialOneLine.trim()) { toast.error('Please enter a one-line testimonial'); return; }

    setIsSubmitting(true);

    try {
       const record = {
        "Full Name": formData.fullName,
        "College / University": formData.collegeName,
        "Course & Year": formData.courseYear,
        "AI Mock Interview Help": formData.aiHelp,
        "One-Line Testimonial": formData.testimonialOneLine,
        "Rating": formData.rating,
        "Public Consent": formData.publicConsent,
        "Submitted At": new Date().toISOString()
      };

      const jsonBody = { data: [record] };

      const resp = await fetch(SHEETDB_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonBody),
      });

      if (!resp.ok) {
        const text = await resp.text().catch(() => null);
        throw new Error(text || `Submission failed with status ${resp.status}`);
      }

      toast.success('Thank you — your feedback has been submitted!');
      // reset
      setFormData({
        fullName: '',
        collegeName: '',
        courseYear: '',
        aiHelp: '',
        testimonialOneLine: '',
        rating: 5,
        publicConsent: 'yes_name',
        photo: null
      });
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit feedback. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
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
              <img src="/images/logo.png" className="h-[4rem] cursor-pointer" onClick={() => router.push('/')} alt="logo" />
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8">
          <Card className="border-orange-200 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
              <div className="flex items-center gap-2">
                <CardTitle className="text-2xl">AI Mock Interview — Feedback Form</CardTitle>
              </div>
              <CardDescription className="text-orange-50">
                Share your experience to help us improve the AI mock interview product.
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 1. Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-orange-700 font-semibold">Your Full Name <span className="text-red-500">*</span></Label>
                  <Input id="fullName" value={formData.fullName} onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))} required />
                </div>

                {/* 2. College / University */}
                <div className="space-y-2">
                  <Label htmlFor="collegeName" className="text-orange-700 font-semibold">College / University Name <span className="text-red-500">*</span></Label>
                  <Input id="collegeName" value={formData.collegeName} onChange={(e) => setFormData(prev => ({ ...prev, collegeName: e.target.value }))} required />
                </div>

                {/* 3. Course & Year */}
                <div className="space-y-2">
                  <Label htmlFor="courseYear" className="text-orange-700 font-semibold">Course & Year <span className="text-red-500">*</span></Label>
                  <Input id="courseYear" value={formData.courseYear} onChange={(e) => setFormData(prev => ({ ...prev, courseYear: e.target.value }))} required placeholder="e.g. B.Tech - 3rd Year" />
                </div>

                {/* 4. How did AI mock interview help you (paragraph) */}
                <div className="space-y-2">
                  <Label htmlFor="aiHelp" className="text-orange-700 font-semibold">How did the AI mock interview help you? <span className="text-red-500">*</span></Label>
                  <Textarea id="aiHelp" value={formData.aiHelp} onChange={(e) => setFormData(prev => ({ ...prev, aiHelp: e.target.value }))} placeholder="Confidence improvement, clearer structure, realistic interview feeling..." required rows={4} />
                </div>

                {/* 5. One-line testimonial */}
                <div className="space-y-2">
                  <Label htmlFor="testimonialOneLine" className="text-orange-700 font-semibold">Your One-Line Testimonial <span className="text-red-500">*</span></Label>
                  <Input id="testimonialOneLine" value={formData.testimonialOneLine} onChange={(e) => setFormData(prev => ({ ...prev, testimonialOneLine: e.target.value }))} placeholder='e.g. "The AI mock interview helped me become more confident."' required />
                </div>

                {/* 6. Rating 1-5 */}
                <div className="space-y-2">
                  <Label className="text-orange-700 font-semibold">Rate Your Experience (1-5) <span className="text-red-500">*</span></Label>
                  <div className="flex items-center space-x-3">
                    {[1,2,3,4,5].map((n) => (
                      <label key={n} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="rating"
                          value={n}
                          checked={formData.rating === n}
                          onChange={() => setFormData(prev => ({ ...prev, rating: n }))
                          }
                          className="h-4 w-4"
                          required
                        />
                        <span className="text-sm">{'⭐'.repeat(n)} {n}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 7. Public consent (multiple choice) */}
                <div className="space-y-2">
                  <Label className="text-orange-700 font-semibold">Can we feature your feedback publicly?</Label>
                  <div className="flex flex-col space-y-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="radio" name="publicConsent" checked={formData.publicConsent === 'yes_name'} onChange={() => setFormData(prev => ({ ...prev, publicConsent: 'yes_name' }))} className="h-4 w-4" />
                      <span>✅ Yes, you can use my name & feedback</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="radio" name="publicConsent" checked={formData.publicConsent === 'yes_anonymous'} onChange={() => setFormData(prev => ({ ...prev, publicConsent: 'yes_anonymous' }))} className="h-4 w-4" />
                      <span>✅ Yes, but keep my name anonymous</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="radio" name="publicConsent" checked={formData.publicConsent === 'no'} onChange={() => setFormData(prev => ({ ...prev, publicConsent: 'no' }))} className="h-4 w-4" />
                      <span>❌ No, only for internal improvement</span>
                    </label>
                  </div>
                </div>

                {/* 8. Upload photo (optional) */}
                <div className="space-y-2">
                  <Label htmlFor="photo" className="text-orange-700 font-semibold">Upload Your Photo (optional)</Label>
                  <input id="photo" type="file" accept="image/*" onChange={handleFileChange} className="block" />
                </div>

                {/* Submit */}
                <Button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-4 text-lg shadow-lg transition-all">
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