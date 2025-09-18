"use client"
import React, { useState, useEffect } from 'react';
import Stepper from 'react-stepper-horizontal';
import Select, { SingleValue } from 'react-select';
import axios from 'axios';

interface PersonalDetails {
  fullName: string;
  dob: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  languages: string[];
}

interface Qualification {
  highestQualification: string;
  workExperience: { id: number; value: string }[];
}

interface About {
  aboutYou: string;
  hours: string;
}

interface Reference {
  name: string;
  phone: string;
  email: string;
}

interface IdentityProof {
  idNumber: string;
  idFile: File | null;
}

const steps = [
  { title: 'Personal Details' },
  { title: 'Qualifications' },
  { title: 'About' },
  { title: 'References' },
  { title: 'Identity Proof' },
];

const countryOptions = [
  { value: '+91', label: '+91' },
  { value: '+1', label: '+1' },
  { value: '+44', label: '+44' },
];

const languageOptions = [
  { value: 'English', label: 'English' },
  { value: 'Hindi', label: 'Hindi' },
  { value: 'Tamil', label: 'Tamil' },
  { value: 'Kannada', label: 'Kannada' },
];

const customSelectStyles = {
  control: (provided: any) => ({
    ...provided,
    border: '1px solid #f97316',
    borderRadius: '4px',
    minHeight: '38px',
    fontSize: '14px',
    width: '80px',
  }),
  dropdownIndicator: (provided: any) => ({
    ...provided,
    color: '#f97316',
    '&:hover': { color: '#ea580c' },
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#f97316' : 'white',
    color: state.isSelected ? 'white' : 'black',
  }),
};

const customSelectStylesFull = {
  control: (provided: any) => ({
    ...provided,
    border: '1px solid #f97316',
    borderRadius: '4px',
    minHeight: '38px',
    fontSize: '14px',
    width: '100%',
  }),
  dropdownIndicator: (provided: any) => ({
    ...provided,
    color: '#f97316',
    '&:hover': { color: '#ea580c' },
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#f97316' : 'white',
    color: state.isSelected ? 'white' : 'black',
  }),
};

const MultiStepForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({
    fullName: '',
    dob: '',
    gender: 'Male',
    phone: '',
    email: '',
    address: '',
    languages: [],
  });
  const [qualifications, setQualifications] = useState<Qualification>({
    highestQualification: '',
    workExperience: [],
  });
  const [about, setAbout] = useState<About>({
    aboutYou: '',
    hours: '',
  });
  const [references, setReferences] = useState<{
    person1: Reference;
    person2: Reference;
  }>({
    person1: { name: '', phone: '', email: '' },
    person2: { name: '', phone: '', email: '' },
  });
  const [identityProof, setIdentityProof] = useState<IdentityProof>({
    idNumber: '',
    idFile: null,
  });

  // Set max date to today (September 18, 2025)
  const today = new Date('2025-09-18T10:43:00+05:30'); // IST
  const maxDob = `${today.getFullYear() - 18}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    setState: React.Dispatch<React.SetStateAction<any>>,
    state: any,
    nestedKey?: string
  ) => {
    const { name, value } = e.target;
    if (nestedKey) {
      setState((prev: any) => ({
        ...prev,
        [nestedKey]: { ...prev[nestedKey], [name]: value },
      }));
    } else {
      setState({ ...state, [name]: value });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size > 100000) {
      setError('File size should be less than 100KB');
      return;
    }
    if (file && !['image/jpeg', 'image/png'].includes(file.type)) {
      setError('File type should be JPEG or PNG');
      return;
    }
    setIdentityProof({ ...identityProof, idFile: file || null });
    setError('');
  };

  const handleLanguageChange = (selectedOption: SingleValue<{ value: string; label: string }>) => {
    if (selectedOption && !personalDetails.languages.includes(selectedOption.value)) {
      setPersonalDetails({
        ...personalDetails,
        languages: [...personalDetails.languages, selectedOption.value],
      });
    }
  };

  const handleLanguageRemove = (language: string) => {
    setPersonalDetails({
      ...personalDetails,
      languages: personalDetails.languages.filter((lang) => lang !== language),
    });
  };

  const handleWorkExperienceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.trim()) {
      setQualifications({
        ...qualifications,
        workExperience: [...qualifications.workExperience, { id: Date.now(), value }],
      });
      e.target.value = '';
    }
  };

  const handleWorkExperienceRemove = (id: number) => {
    setQualifications({
      ...qualifications,
      workExperience: qualifications.workExperience.filter((exp) => exp.id !== id),
    });
  };

  const validatePersonalDetails = (): string => {
    if (!personalDetails.fullName.trim()) return 'Full name is required';
    if (!personalDetails.dob) return 'Date of birth is required';
    if (new Date().getFullYear() - new Date(personalDetails.dob).getFullYear() < 18)
      return 'Age must be 18 or older';
    if (personalDetails.phone.length !== 10) return 'Valid phone number is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalDetails.email))
      return 'Valid email is required';
    if (!personalDetails.address.trim()) return 'Address is required';
    if (personalDetails.languages.length === 0) return 'Select at least one language';
    return '';
  };

  const validateQualifications = (): string => {
    if (!qualifications.highestQualification) return 'Highest qualification is required';
    return '';
  };

  const validateAbout = (): string => {
    if (about.aboutYou.split(/\s+/).length < 50)
      return 'About you must be at least 50 words';
    if (!about.hours) return 'Daily hours contribution is required';
    return '';
  };

  const validateReferences = (): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!references.person1.name.trim()) return 'Person 1 name is required';
    if (references.person1.phone.length !== 10) return 'Person 1 valid phone number is required';
    if (!emailRegex.test(references.person1.email)) return 'Person 1 valid email is required';
    if (!references.person2.name.trim()) return 'Person 2 name is required';
    if (references.person2.phone.length !== 10) return 'Person 2 valid phone number is required';
    if (!emailRegex.test(references.person2.email)) return 'Person 2 valid email is required';
    if (references.person1.phone === references.person2.phone)
      return 'Phone numbers must be unique';
    if (references.person1.email === references.person2.email)
      return 'Emails must be unique';
    return '';
  };

  const validateIdentityProof = (): string => {
    if (identityProof.idNumber.length !== 12) return 'Valid ID number is required';
    // if (!identityProof.idFile) return 'ID file is required';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent, nextStep: number, validate: () => string) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');
    if (nextStep === 5) {
      setLoading(true);
      const formData = {
        personalDetails,
        qualifications,
        about,
        references,
        identityProof: { idNumber: identityProof.idNumber },
      };
      try {
        await axios.post('https://jsonplaceholder.typicode.com/posts', formData);
        setCurrentStep(5);
      } catch (error) {
        setError('Failed to submit form');
      } finally {
        setLoading(false);
      }
    } else {
      setCurrentStep(nextStep);
    }
  };

  const renderPersonalDetails = () => (
    <form onSubmit={(e) => handleSubmit(e, 1, validatePersonalDetails)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-orange-600">Full Name *</label>
        <input
          type="text"
          name="fullName"
          value={personalDetails.fullName}
          onChange={(e) => handleInputChange(e, setPersonalDetails, personalDetails)}
          className="mt-1 block w-full border border-orange-400 rounded-md p-2 focus:border-orange-600 focus:ring-orange-200"
          placeholder="John Doe"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-orange-600">Date of Birth *</label>
        <input
          type="date"
          name="dob"
          value={personalDetails.dob}
          max={maxDob}
          onChange={(e) => handleInputChange(e, setPersonalDetails, personalDetails)}
          className="mt-1 block w-full border border-orange-400 rounded-md p-2 focus:border-orange-600 focus:ring-orange-200"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-orange-600">Gender *</label>
        <select
          name="gender"
          value={personalDetails.gender}
          onChange={(e) => handleInputChange(e, setPersonalDetails, personalDetails)}
          className="mt-1 block w-full border border-orange-400 rounded-md p-2 focus:border-orange-600 focus:ring-orange-200"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-orange-600">Phone Number *</label>
        <div className="flex">
          <Select
            options={countryOptions}
            defaultValue={countryOptions[0]}
            styles={customSelectStyles}
            className="mr-2"
          />
          <input
            type="number"
            name="phone"
            value={personalDetails.phone}
            onChange={(e) => handleInputChange(e, setPersonalDetails, personalDetails)}
            className="mt-1 block w-full border border-orange-400 rounded-md p-2 focus:border-orange-600 focus:ring-orange-200"
            placeholder="9876543210"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-orange-600">Email *</label>
        <input
          type="email"
          name="email"
          value={personalDetails.email}
          onChange={(e) => handleInputChange(e, setPersonalDetails, personalDetails)}
          className="mt-1 block w-full border border-orange-400 rounded-md p-2 focus:border-orange-600 focus:ring-orange-200"
          placeholder="example@domain.com"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-orange-600">Address *</label>
        <input
          type="text"
          name="address"
          value={personalDetails.address}
          onChange={(e) => handleInputChange(e, setPersonalDetails, personalDetails)}
          className="mt-1 block w-full border border-orange-400 rounded-md p-2 focus:border-orange-600 focus:ring-orange-200"
          placeholder="123 Main St, City"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-orange-600">Languages *</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {personalDetails.languages.map((lang, index) => (
            <div key={index} className="flex items-center bg-white border border-orange-200 px-2 py-1 rounded">
              <span className="text-sm text-orange-600">{lang}</span>
              <button
                type="button"
                onClick={() => handleLanguageRemove(lang)}
                className="ml-2 text-orange-600 hover:text-orange-800"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <Select
          options={languageOptions}
          onChange={handleLanguageChange}
          styles={customSelectStylesFull}
          placeholder="Select a language"
        />
      </div>
      <p className="text-red-600 text-sm">{error}</p>
      <div className="flex justify-end gap-4">
        <button
          type="submit"
          className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700"
        >
          Next
        </button>
      </div>
    </form>
  );

  const renderQualifications = () => (
    <form onSubmit={(e) => handleSubmit(e, 2, validateQualifications)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-orange-600">Highest Qualification *</label>
        <select
          name="highestQualification"
          value={qualifications.highestQualification}
          onChange={(e) => handleInputChange(e, setQualifications, qualifications)}
          className="mt-1 block w-full border border-orange-400 rounded-md p-2 focus:border-orange-600 focus:ring-orange-200"
          required
        >
          <option value="">Select</option>
          <option value="High School">High School</option>
          <option value="Bachelor's">Bachelor's</option>
          <option value="Master's">Master's</option>
          <option value="PhD">PhD</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-orange-600">Work Experience</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {qualifications.workExperience.map((exp) => (
            <div key={exp.id} className="flex items-center bg-white border border-orange-200 px-2 py-1 rounded">
              <span className="text-sm text-orange-600">{exp.value}</span>
              <button
                type="button"
                onClick={() => handleWorkExperienceRemove(exp.id)}
                className="ml-2 text-orange-600 hover:text-orange-800"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            placeholder="Company Name"
            className="mt-1 block w-full border border-orange-400 rounded-md p-2 focus:border-orange-600 focus:ring-orange-200"
            onChange={handleWorkExperienceChange}
          />
        </div>
      </div>
      <p className="text-red-600 text-sm">{error}</p>
      <div className="flex justify-between gap-4">
        <button
          type="button"
          onClick={() => setCurrentStep(0)}
          className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700"
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700"
        >
          Next
        </button>
      </div>
    </form>
  );

  const renderAbout = () => (
    <form onSubmit={(e) => handleSubmit(e, 3, validateAbout)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-orange-600">About You (min 50 words) *</label>
        <textarea
          name="aboutYou"
          value={about.aboutYou}
          onChange={(e) => handleInputChange(e, setAbout, about)}
          className="mt-1 block w-full border border-orange-400 rounded-md p-2 focus:border-orange-600 focus:ring-orange-200"
          rows={5}
          placeholder="Describe yourself in at least 50 words"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-orange-600">Daily Hours Contribution *</label>
        <input
          type="number"
          name="hours"
          value={about.hours}
          onChange={(e) => handleInputChange(e, setAbout, about)}
          className="mt-1 block w-full border border-orange-400 rounded-md p-2 focus:border-orange-600 focus:ring-orange-200"
          placeholder="Hours per day"
          required
        />
      </div>
      <p className="text-red-600 text-sm">{error}</p>
      <div className="flex justify-between gap-4">
        <button
          type="button"
          onClick={() => setCurrentStep(1)}
          className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700"
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700"
        >
          Next
        </button>
      </div>
    </form>
  );

  const renderReferences = () => (
    <form onSubmit={(e) => handleSubmit(e, 4, validateReferences)} className="space-y-4">
      <div>
        <h3 className="text-lg font-medium text-orange-600">Reference 1</h3>
        <div className="space-y-2">
          <div>
            <label className="block text-sm font-medium text-orange-600">Name *</label>
            <input
              type="text"
              name="name"
              value={references.person1.name}
              onChange={(e) => handleInputChange(e, setReferences, references, 'person1')}
              className="mt-1 block w-full border border-orange-400 rounded-md p-2 focus:border-orange-600 focus:ring-orange-200"
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-orange-600">Phone *</label>
            <input
              type="number"
              name="phone"
              value={references.person1.phone}
              onChange={(e) => handleInputChange(e, setReferences, references, 'person1')}
              className="mt-1 block w-full border border-orange-400 rounded-md p-2 focus:border-orange-600 focus:ring-orange-200"
              placeholder="9876543210"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-orange-600">Email *</label>
            <input
              type="email"
              name="email"
              value={references.person1.email}
              onChange={(e) => handleInputChange(e, setReferences, references, 'person1')}
              className="mt-1 block w-full border border-orange-400 rounded-md p-2 focus:border-orange-600 focus:ring-orange-200"
              placeholder="example@domain.com"
              required
            />
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium text-orange-600">Reference 2</h3>
        <div className="space-y-2">
          <div>
            <label className="block text-sm font-medium text-orange-600">Name *</label>
            <input
              type="text"
              name="name"
              value={references.person2.name}
              onChange={(e) => handleInputChange(e, setReferences, references, 'person2')}
              className="mt-1 block w-full border border-orange-400 rounded-md p-2 focus:border-orange-600 focus:ring-orange-200"
              placeholder="Jane Doe"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-orange-600">Phone *</label>
            <input
              type="number"
              name="phone"
              value={references.person2.phone}
              onChange={(e) => handleInputChange(e, setReferences, references, 'person2')}
              className="mt-1 block w-full border border-orange-400 rounded-md p-2 focus:border-orange-600 focus:ring-orange-200"
              placeholder="9876543210"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-orange-600">Email *</label>
            <input
              type="email"
              name="email"
              value={references.person2.email}
              onChange={(e) => handleInputChange(e, setReferences, references, 'person2')}
              className="mt-1 block w-full border border-orange-400 rounded-md p-2 focus:border-orange-600 focus:ring-orange-200"
              placeholder="example@domain.com"
              required
            />
          </div>
        </div>
      </div>
      <p className="text-red-600 text-sm">{error}</p>
      <div className="flex justify-between gap-4">
        <button
          type="button"
          onClick={() => setCurrentStep(2)}
          className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700"
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700"
        >
          Next
        </button>
      </div>
    </form>
  );

  const renderIdentityProof = () => (
    <form onSubmit={(e) => handleSubmit(e, 5, validateIdentityProof)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-orange-600">ID Number *</label>
        <input
          type="text"
          name="idNumber"
          value={identityProof.idNumber}
          onChange={(e) => handleInputChange(e, setIdentityProof, identityProof)}
          className="mt-1 block w-full border border-orange-400 rounded-md p-2 focus:border-orange-600 focus:ring-orange-200"
          placeholder="123456789012"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-orange-600">Upload ID (JPEG/PNG,less than 100KB) *</label>
        <input
          type="file"
          accept="image/jpeg,image/png"
          onChange={handleFileChange}
          className="mt-1 block w-full border border-orange-400 rounded-md p-2 focus:border-orange-600 focus:ring-orange-200"
          required
        />
      </div>
      <p className="text-red-600 text-sm">{error}</p>
      <div className="flex justify-between gap-4">
        <button
          type="button"
          onClick={() => setCurrentStep(3)}
          className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={loading}
          className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );

  const renderSuccess = () => (
    <div className="text-center">
      <h2 className="text-2xl font-semibold text-orange-600">Thank You!</h2>
      <p className="mt-4 text-gray-700">Your profile has been submitted successfully. We will get back to you soon.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-orange-600 mb-6">
          Apply as a Recruiter
        </h1>
        <div className="mb-8">
          <Stepper
            steps={steps}
            activeStep={currentStep}
            activeColor="#f97316"
            completeColor="#f97316"
            activeTitleColor="#f97316"
            completeTitleColor="#f97316"
            circleFontSize={16}
            titleFontSize={14}
            size={32}
            completeBarColor="#f97316"
          />
        </div>
        <div>
          {currentStep === 0 && renderPersonalDetails()}
          {currentStep === 1 && renderQualifications()}
          {currentStep === 2 && renderAbout()}
          {currentStep === 3 && renderReferences()}
          {currentStep === 4 && renderIdentityProof()}
          {currentStep === 5 && renderSuccess()}
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;