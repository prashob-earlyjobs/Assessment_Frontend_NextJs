"use client";

import { useEffect, useId, useState } from "react";
import Select, { type StylesConfig } from "react-select";

export const roles = [
  {
    value: "Intern Recruiter (Remote)",
    label: "Intern Recruiter",
    hint: "Remote · build experience with guided hiring work",
  },
  {
    value: "Freelance Recruiter (Remote)",
    label: "Freelance Recruiter",
    hint: "Remote · work verified mandates and earn on placements",
  },
] as const;


export const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
] as const;

export const languages = [
  "English",
  "Hindi",
  "Tamil",
  "Telugu",
  "Kannada",
  "Malayalam",
  "Bengali",
  "Marathi",
  "Gujarati",
  "Punjabi",
  "Urdu",
  "Odia",
] as const;

export type LanguageOption = { value: string; label: string };

export const languageOptions: LanguageOption[] = languages.map((label) => ({ value: label, label }));

export const countryCodeOptions = [
  { value: "+91", label: "+91", meta: "India" },
  { value: "+1", label: "+1", meta: "US / CA" },
  { value: "+44", label: "+44", meta: "UK" },
  { value: "+61", label: "+61", meta: "Australia" },
  { value: "+65", label: "+65", meta: "Singapore" },
  { value: "+971", label: "+971", meta: "UAE" },
] as const;

export type CountryCodeOption = (typeof countryCodeOptions)[number];


export type Address = {
  building: string;
  street: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
};

export type PersonalDetails = {
  role: string;
  fullName: string;
  dateOfBirth: string;
  gender: string;
  phoneCode: string;
  phone: string;
  whatsappCode: string;
  whatsapp: string;
  email: string;
  current: Address;
  sameAsCurrent: boolean;
  permanent: Address;
  languages: string[];
};

export type PersonalErrors = Partial<
  Record<
    | "role"
    | "fullName"
    | "dateOfBirth"
    | "gender"
    | "phone"
    | "whatsapp"
    | "email"
    | "current.building"
    | "current.street"
    | "current.area"
    | "current.city"
    | "current.state"
    | "current.pincode"
    | "permanent.building"
    | "permanent.street"
    | "permanent.area"
    | "permanent.city"
    | "permanent.state"
    | "permanent.pincode"
    | "languages",
    string
  >
>;

export const emptyAddress = (): Address => ({
  building: "",
  street: "",
  area: "",
  city: "",
  state: "",
  pincode: "",
});

export const highestQualificationOptions = [
  "Bachelor's Degree",
  "Master's Degree",
  "PhD",
  "Diploma",
  "Certificate",
  "High School",
] as const;

export type QualificationOption = { value: string; label: string };

export const qualificationSelectOptions: QualificationOption[] = highestQualificationOptions.map(
  (label) => ({ value: label, label }),
);

export type WorkExperienceEntry = {
  company: string;
  experienceYears: string;
};

export type QualificationDetails = {
  highestQualification: string;
  workExperience: WorkExperienceEntry[];
};

export type WorkExperienceErrors = {
  company?: string;
  experienceYears?: string;
};

export type QualificationErrors = {
  highestQualification?: string;
  workExperience?: WorkExperienceErrors[];
};

export const emptyQualificationDetails = (): QualificationDetails => ({
  highestQualification: "",
  workExperience: [],
});

export function validateQualificationDetails(data: QualificationDetails): QualificationErrors {
  const errors: QualificationErrors = {};

  if (!data.highestQualification.trim()) {
    errors.highestQualification = "Highest qualification is required";
  }

  if (data.workExperience.length > 0) {
    errors.workExperience = data.workExperience.map((entry) => {
      const row: WorkExperienceErrors = {};
      if (!entry.company.trim()) row.company = "Company name is required";
      const years = entry.experienceYears.trim();
      if (!years) {
        row.experienceYears = "Experience years is required";
      } else {
        const n = parseInt(years, 10);
        if (Number.isNaN(n) || n < 0) row.experienceYears = "Enter a valid number";
        else if (n > 50) row.experienceYears = "Experience cannot exceed 50 years";
      }
      return row;
    });
    const hasRowErrors = errors.workExperience.some((row) => row.company || row.experienceYears);
    if (!hasRowErrors) delete errors.workExperience;
  }

  return errors;
}

export function qualificationIsValid(errors: QualificationErrors) {
  return !errors.highestQualification && !errors.workExperience?.some((row) => row.company || row.experienceYears);
}

export const hiringCategories = [
  "BPO",
  "Information Technology",
  "Banking",
  "Insurance",
  "Aviation",
  "Oil And Gas",
  "Retail",
  "Education",
  "Manufacturing",
  "Consumer Goods",
  "Health Care",
  "ITES",
  "Entertainment",
  "Finance",
  "Textile",
  "Media and news",
  "Food processing",
  "Hospitality",
  "Construction",
  "Law",
  "Advertising",
  "E-commerce",
  "Other",
] as const;

export type CategoryOption = { value: string; label: string };

export const categorySelectOptions: CategoryOption[] = hiringCategories.map((label) => ({
  value: label,
  label,
}));

export type AboutDetails = {
  tellAboutYourself: string;
  whyJoinHR: string;
  howContribute: string;
  hoursContribute: string;
  categories: string[];
  availability: string;
};

export type AboutErrors = Partial<
  Record<
    | "tellAboutYourself"
    | "whyJoinHR"
    | "howContribute"
    | "hoursContribute"
    | "categories"
    | "availability",
    string
  >
>;

export const emptyAboutDetails = (): AboutDetails => ({
  tellAboutYourself: "",
  whyJoinHR: "",
  howContribute: "",
  hoursContribute: "",
  categories: [],
  availability: "",
});

export function wordCount(value: string) {
  return value.trim().split(/\s+/).filter((word) => word.length > 0).length;
}

function validateMinWords(value: string, label: string) {
  const trimmed = value.trim();
  if (!trimmed) return `${label} is required`;
  const count = wordCount(value);
  if (count < 50) return `${label} must contain at least 50 words (current: ${count})`;
  return "";
}

export function validateAboutDetails(data: AboutDetails): AboutErrors {
  const errors: AboutErrors = {};

  const about = validateMinWords(data.tellAboutYourself, "Tell us about yourself");
  const why = validateMinWords(data.whyJoinHR, "Why you want to join us");
  const contribute = validateMinWords(data.howContribute, "How you can contribute");

  const hoursRaw = data.hoursContribute.trim();
  let hours = "";
  if (!hoursRaw) hours = "Daily hours is required";
  else {
    const n = parseInt(hoursRaw, 10);
    if (Number.isNaN(n) || n < 0) hours = "Enter a valid number of hours";
    else if (n > 24) hours = "Hours cannot exceed 24 per day";
  }

  const categories = data.categories.length ? "" : "Select at least one category";

  const availabilityRaw = data.availability.trim();
  let availability = "";
  if (!availabilityRaw) availability = "Joining availability is required";
  else {
    const n = parseInt(availabilityRaw, 10);
    if (Number.isNaN(n) || n < 0) availability = "Enter a valid number of days";
    else if (n > 365) availability = "Availability cannot exceed 365 days";
  }

  if (about) errors.tellAboutYourself = about;
  if (why) errors.whyJoinHR = why;
  if (contribute) errors.howContribute = contribute;
  if (hours) errors.hoursContribute = hours;
  if (categories) errors.categories = categories;
  if (availability) errors.availability = availability;

  return errors;
}

export function aboutIsValid(errors: AboutErrors) {
  return Object.keys(errors).length === 0;
}

export type ReferencePerson = {
  name: string;
  contactNumber: string;
  email: string;
  organization: string;
  designation: string;
  howTheyKnow: string;
};

export type ReferenceErrors = {
  name?: string;
  contactNumber?: string;
  email?: string;
  organization?: string;
  designation?: string;
  howTheyKnow?: string;
};

export type ReferencesErrors = {
  people?: ReferenceErrors[];
  duplicateContacts?: string;
  duplicateEmails?: string;
};

export const emptyReferencePerson = (): ReferencePerson => ({
  name: "",
  contactNumber: "",
  email: "",
  organization: "",
  designation: "",
  howTheyKnow: "",
});

export const emptyReferences = (): ReferencePerson[] => [
  emptyReferencePerson(),
  emptyReferencePerson(),
  emptyReferencePerson(),
];

export function validateReferences(people: ReferencePerson[]): ReferencesErrors {
  const errors: ReferencesErrors = {};
  const rows: ReferenceErrors[] = people.slice(0, 3).map(() => ({}));

  const contacts = people
    .slice(0, 3)
    .map((person) => person.contactNumber.trim())
    .filter(Boolean);
  if (contacts.length !== new Set(contacts).size) {
    errors.duplicateContacts = "Contact numbers must be unique across all references";
  }

  const emails = people
    .slice(0, 3)
    .map((person) => person.email.trim().toLowerCase())
    .filter(Boolean);
  if (emails.length !== new Set(emails).size) {
    errors.duplicateEmails = "Email addresses must be unique across all references";
  }

  people.slice(0, 3).forEach((person, index) => {
    if (!person.name.trim()) rows[index].name = "Name is required";

    const phone = person.contactNumber.trim();
    if (!phone) rows[index].contactNumber = "Contact number is required";
    else if (!/^[6-9]\d{9}$/.test(phone)) {
      rows[index].contactNumber = "Enter a valid 10-digit mobile number";
    }

    const email = person.email.trim();
    if (!email) rows[index].email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      rows[index].email = "Enter a valid email address";
    }

    if (!person.organization.trim()) rows[index].organization = "Organization is required";
    if (!person.designation.trim()) rows[index].designation = "Designation is required";
    if (!person.howTheyKnow.trim()) rows[index].howTheyKnow = "This field is required";
  });

  if (rows.some((row) => Object.keys(row).length > 0)) errors.people = rows;
  return errors;
}

export function referencesIsValid(errors: ReferencesErrors) {
  return (
    !errors.duplicateContacts &&
    !errors.duplicateEmails &&
    !errors.people?.some((row) => Object.keys(row).length > 0)
  );
}

export type FamilyMember = {
  name: string;
  relationship: string;
  occupation: string;
  age: string;
  dependent: boolean | null;
};

export type IdentificationDetails = {
  profilePhoto: string;
  aadharNumber: string;
  panNumber: string;
  aadharFront: string;
  aadharBack: string;
  panFront: string;
  panBack: string;
  emergencyContact: string;
  familyMembers: FamilyMember[];
};

export type FamilyMemberErrors = {
  name?: string;
  relationship?: string;
  occupation?: string;
  age?: string;
  dependent?: string;
};

export type IdentificationErrors = {
  profilePhoto?: string;
  aadharNumber?: string;
  panNumber?: string;
  aadharFront?: string;
  aadharBack?: string;
  panFront?: string;
  panBack?: string;
  emergencyContact?: string;
  familyMembersCount?: string;
  familyMembers?: FamilyMemberErrors[];
};

export const emptyFamilyMember = (): FamilyMember => ({
  name: "",
  relationship: "",
  occupation: "",
  age: "",
  dependent: null,
});

export const emptyIdentificationDetails = (): IdentificationDetails => ({
  profilePhoto: "",
  aadharNumber: "",
  panNumber: "",
  aadharFront: "",
  aadharBack: "",
  panFront: "",
  panBack: "",
  emergencyContact: "",
  familyMembers: [emptyFamilyMember(), emptyFamilyMember(), emptyFamilyMember()],
});

export function validateIdentificationDetails(data: IdentificationDetails): IdentificationErrors {
  const errors: IdentificationErrors = {};

  if (!data.profilePhoto) errors.profilePhoto = "Profile photo is required";

  const aadhar = data.aadharNumber.trim();
  if (!aadhar) errors.aadharNumber = "Aadhar number is required";
  else if (!/^\d{12}$/.test(aadhar)) errors.aadharNumber = "Enter a valid 12-digit Aadhar number";

  const pan = data.panNumber.trim().toUpperCase();
  if (!pan) errors.panNumber = "PAN number is required";
  else if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan)) {
    errors.panNumber = "PAN number format is not valid";
  }

  if (!data.aadharFront) errors.aadharFront = "Aadhar card front image is required";
  if (!data.aadharBack) errors.aadharBack = "Aadhar card back image is required";
  if (!data.panFront) errors.panFront = "PAN card front image is required";
  if (!data.panBack) errors.panBack = "PAN card back image is required";

  const emergency = data.emergencyContact.trim();
  if (!emergency) errors.emergencyContact = "Emergency contact is required";
  else if (!/^[6-9]\d{9}$/.test(emergency)) {
    errors.emergencyContact = "Enter a valid 10-digit mobile number";
  }

  if (data.familyMembers.length < 3) {
    errors.familyMembersCount = "Add at least 3 family members";
  }

  const memberRows = data.familyMembers.map((member) => {
    const row: FamilyMemberErrors = {};
    if (!member.name.trim()) row.name = "Name is required";
    if (!member.relationship.trim()) row.relationship = "Relationship is required";
    if (!member.occupation.trim()) row.occupation = "Occupation is required";
    const age = member.age.trim();
    if (!age) row.age = "Age is required";
    else {
      const n = parseInt(age, 10);
      if (Number.isNaN(n) || n < 0 || n > 120) row.age = "Enter a valid age";
    }
    if (member.dependent === null) row.dependent = "Please select if dependent";
    return row;
  });

  if (memberRows.some((row) => Object.keys(row).length > 0)) {
    errors.familyMembers = memberRows;
  }

  return errors;
}

export function identificationIsValid(errors: IdentificationErrors) {
  return (
    !errors.profilePhoto &&
    !errors.aadharNumber &&
    !errors.panNumber &&
    !errors.aadharFront &&
    !errors.aadharBack &&
    !errors.panFront &&
    !errors.panBack &&
    !errors.emergencyContact &&
    !errors.familyMembersCount &&
    !errors.familyMembers?.some((row) => Object.keys(row).length > 0)
  );
}

export const emptyPersonalDetails = (): PersonalDetails => ({
  role: "",
  fullName: "",
  dateOfBirth: "",
  gender: "",
  phoneCode: "+91",
  phone: "",
  whatsappCode: "+91",
  whatsapp: "",
  email: "",
  current: emptyAddress(),
  sameAsCurrent: true,
  permanent: emptyAddress(),
  languages: [],
});

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function required(value: string, message: string) {
  return value.trim() ? "" : message;
}

function validateAddress(address: Address, prefix: "current" | "permanent") {
  const errors: PersonalErrors = {};
  const building = required(address.building, "Building / flat number is required");
  const street = required(address.street, "Street is required");
  const area = required(address.area, "Area / village is required");
  const city = required(address.city, "City is required");
  const state = required(address.state, "State is required");
  const pincode = address.pincode.trim()
    ? /^\d{6}$/.test(address.pincode.trim())
      ? ""
      : "Enter a valid 6-digit pincode"
    : "Pincode is required";

  if (building) errors[`${prefix}.building`] = building;
  if (street) errors[`${prefix}.street`] = street;
  if (area) errors[`${prefix}.area`] = area;
  if (city) errors[`${prefix}.city`] = city;
  if (state) errors[`${prefix}.state`] = state;
  if (pincode) errors[`${prefix}.pincode`] = pincode;
  return errors;
}

export function validatePersonalDetails(data: PersonalDetails): PersonalErrors {
  const errors: PersonalErrors = {};

  const role = required(data.role, "Choose a role to continue");
  const fullName = required(data.fullName, "Full name is required");
  const dateOfBirth = data.dateOfBirth
    ? isAdult(data.dateOfBirth)
      ? ""
      : "You must be at least 18 years old"
    : "Date of birth is required";
  const gender = required(data.gender, "Gender is required");
  const phone = data.phone.trim()
    ? phoneValid(data.phoneCode, data.phone)
      ? ""
      : "Enter a valid phone number"
    : "Phone number is required";
  const whatsapp = data.whatsapp.trim()
    ? phoneValid(data.whatsappCode, data.whatsapp)
      ? ""
      : "Enter a valid WhatsApp number"
    : "WhatsApp number is required";
  const email = data.email.trim()
    ? emailPattern.test(data.email.trim())
      ? ""
      : "Enter a valid email address"
    : "Email is required";
  const spoken = data.languages.length ? "" : "Select at least one language";

  if (role) errors.role = role;
  if (fullName) errors.fullName = fullName;
  if (dateOfBirth) errors.dateOfBirth = dateOfBirth;
  if (gender) errors.gender = gender;
  if (phone) errors.phone = phone;
  if (whatsapp) errors.whatsapp = whatsapp;
  if (email) errors.email = email;
  if (spoken) errors.languages = spoken;

  Object.assign(errors, validateAddress(data.current, "current"));
  if (!data.sameAsCurrent) {
    Object.assign(errors, validateAddress(data.permanent, "permanent"));
  }

  return errors;
}

function phoneValid(code: string, phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (code === "+91") return /^\d{10}$/.test(digits);
  return digits.length >= 7 && digits.length <= 15;
}

function isAdult(value: string) {
  const birth = new Date(value);
  if (Number.isNaN(birth.getTime())) return false;
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const month = today.getMonth() - birth.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birth.getDate())) age -= 1;
  return age >= 18;
}

export function shell(error?: string, disabled?: boolean) {
  return [
    "mt-2 flex h-11 items-center gap-2 rounded-full px-3.5 ring-1 transition-[background-color,box-shadow]",
    disabled ? "cursor-not-allowed bg-neutral-100 text-neutral-500" : "bg-neutral-50",
    error
      ? "ring-red-300 focus-within:bg-white focus-within:ring-2 focus-within:ring-red-300/60"
      : "ring-transparent focus-within:bg-white focus-within:ring-2 focus-within:ring-brand/25",
  ].join(" ");
}

export function inputClass() {
  return "w-full bg-transparent text-[13px] text-neutral-950 outline-none placeholder:text-neutral-400 disabled:cursor-not-allowed";
}

export function Field({
  label,
  required,
  error,
  children,
  className = "",
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block min-w-0 ${className}`}>
      <span className="px-1.5 text-[11px] font-medium tracking-[0.14em] text-neutral-400 uppercase">
        {label}
        {required ? <span className="text-brand"> *</span> : null}
      </span>
      {children}
      {error ? <span className="mt-1.5 block px-1.5 text-[12px] text-red-500">{error}</span> : null}
    </label>
  );
}

export function PhoneField({
  label,
  code,
  phone,
  error,
  onCodeChange,
  onPhoneChange,
}: {
  label: string;
  code: string;
  phone: string;
  error?: string;
  onCodeChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
}) {
  const instanceId = useId();
  const [portal, setPortal] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortal(document.body);
  }, []);

  const selected =
    countryCodeOptions.find((option) => option.value === code) ?? countryCodeOptions[0];

  return (
    <div className="min-w-0">
      <span className="px-1.5 text-[11px] font-medium tracking-[0.14em] text-neutral-400 uppercase">
        {label}
        <span className="text-brand"> *</span>
      </span>
      <div className={`${shell(error)} !pr-2`}>
        <div className="w-[5.25rem] shrink-0">
          <Select<CountryCodeOption, false>
            instanceId={`${instanceId}-code`}
            aria-label={`${label} country code`}
            options={[...countryCodeOptions]}
            value={selected}
            onChange={(option) => onCodeChange(option?.value ?? "+91")}
            isSearchable={false}
            styles={codeSelectStyles}
            menuPortalTarget={portal}
            menuPosition="fixed"
            formatOptionLabel={(option, { context }) =>
              context === "menu" ? (
                <span className="flex items-center justify-between gap-3">
                  <span>{option.label}</span>
                  <span className="text-neutral-400">{option.meta}</span>
                </span>
              ) : (
                option.label
              )
            }
          />
        </div>
        <span aria-hidden className="h-4 w-px shrink-0 bg-black/10" />
        <input
          value={phone}
          onChange={(event) =>
            onPhoneChange(event.target.value.replace(/\D/g, "").slice(0, code === "+91" ? 10 : 15))
          }
          inputMode="numeric"
          autoComplete="tel-national"
          placeholder="9876543210"
          className={inputClass()}
        />
      </div>
      {error ? <span className="mt-1.5 block px-1.5 text-[12px] text-red-500">{error}</span> : null}
    </div>
  );
}

export function LanguagesField({
  value,
  error,
  onChange,
}: {
  value: string[];
  error?: string;
  onChange: (languages: string[]) => void;
}) {
  const instanceId = useId();
  const [portal, setPortal] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortal(document.body);
  }, []);

  const selected = languageOptions.filter((option) => value.includes(option.value));

  return (
    <Field label="Languages" required error={error}>
      <Select<LanguageOption, true>
        instanceId={`${instanceId}-languages`}
        isMulti
        options={languageOptions}
        value={selected}
        onChange={(options) => onChange(options.map((option) => option.value))}
        placeholder="Select a language to add"
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        styles={languageSelectStyles(error)}
        menuPortalTarget={portal}
        menuPosition="fixed"
      />
    </Field>
  );
}

export function QualificationField({
  value,
  error,
  onChange,
}: {
  value: string;
  error?: string;
  onChange: (qualification: string) => void;
}) {
  const instanceId = useId();
  const [portal, setPortal] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortal(document.body);
  }, []);

  const selected = qualificationSelectOptions.find((option) => option.value === value) ?? null;

  return (
    <Field label="Highest qualification" required error={error}>
      <Select<QualificationOption, false>
        instanceId={`${instanceId}-qualification`}
        options={qualificationSelectOptions}
        value={selected}
        onChange={(option) => onChange(option?.value ?? "")}
        placeholder="Select qualification"
        isSearchable={false}
        styles={singleSelectStyles(error)}
        menuPortalTarget={portal}
        menuPosition="fixed"
      />
    </Field>
  );
}

export function CategoriesField({
  value,
  error,
  onChange,
}: {
  value: string[];
  error?: string;
  onChange: (categories: string[]) => void;
}) {
  const instanceId = useId();
  const [portal, setPortal] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortal(document.body);
  }, []);

  const selected = categorySelectOptions.filter((option) => value.includes(option.value));

  return (
    <Field label="Categories you are interested to hire" required error={error}>
      <Select<CategoryOption, true>
        instanceId={`${instanceId}-categories`}
        isMulti
        options={categorySelectOptions}
        value={selected}
        onChange={(options) => onChange(options.map((option) => option.value))}
        placeholder="Select a category to add"
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        styles={languageSelectStyles(error) as StylesConfig<CategoryOption, true>}
        menuPortalTarget={portal}
        menuPosition="fixed"
      />
    </Field>
  );
}

function singleSelectStyles(error?: string): StylesConfig<QualificationOption, false> {
  return {
    control: (base, state) => ({
      ...base,
      minHeight: 44,
      marginTop: 8,
      borderRadius: 999,
      border: "none",
      backgroundColor: state.isFocused ? "#fff" : "#fafafa",
      boxShadow: "none",
      cursor: "pointer",
      fontSize: 13,
      outline: state.isFocused
        ? error
          ? "2px solid rgba(248,113,113,0.55)"
          : "2px solid rgba(234,106,78,0.25)"
        : error
          ? "1px solid rgba(248,113,113,0.45)"
          : "1px solid transparent",
    }),
    valueContainer: (base) => ({ ...base, padding: "4px 14px" }),
    placeholder: (base) => ({ ...base, color: "#a3a3a3" }),
    singleValue: (base) => ({ ...base, color: "#171717" }),
    indicatorSeparator: () => ({ display: "none" }),
    dropdownIndicator: (base) => ({ ...base, color: "#a3a3a3", paddingRight: 12 }),
    menuPortal: (base) => ({ ...base, zIndex: 90 }),
    menu: (base) => ({
      ...base,
      borderRadius: 12,
      overflow: "hidden",
      border: "1px solid rgba(0,0,0,0.08)",
      boxShadow: "0 12px 32px rgba(23,23,23,0.08)",
    }),
    option: (base, state) => ({
      ...base,
      fontSize: 13,
      cursor: "pointer",
      backgroundColor: state.isSelected ? "#ea6a4e" : state.isFocused ? "#f5f5f5" : "#fff",
      color: state.isSelected ? "#fff" : "#171717",
    }),
  };
}

function languageSelectStyles(error?: string): StylesConfig<LanguageOption, true> {
  return {
    control: (base, state) => ({
      ...base,
      minHeight: 44,
      marginTop: 8,
      borderRadius: 999,
      border: "none",
      backgroundColor: state.isFocused ? "#fff" : "#fafafa",
      boxShadow: "none",
      cursor: "pointer",
      fontSize: 13,
      outline: state.isFocused
        ? error
          ? "2px solid rgba(248,113,113,0.55)"
          : "2px solid rgba(234,106,78,0.25)"
        : error
          ? "1px solid rgba(248,113,113,0.45)"
          : "1px solid transparent",
    }),
    valueContainer: (base) => ({ ...base, padding: "4px 14px", gap: 4 }),
    placeholder: (base) => ({ ...base, color: "#a3a3a3" }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "#ea6a4e",
      borderRadius: 999,
    }),
    multiValueLabel: (base) => ({ ...base, color: "#fff", fontSize: 12, padding: "2px 6px" }),
    multiValueRemove: (base) => ({
      ...base,
      borderRadius: 999,
      color: "rgba(255,255,255,0.85)",
      ":hover": { backgroundColor: "rgba(0,0,0,0.12)", color: "#fff" },
    }),
    indicatorSeparator: () => ({ display: "none" }),
    dropdownIndicator: (base) => ({ ...base, color: "#a3a3a3", paddingRight: 12 }),
    menuPortal: (base) => ({ ...base, zIndex: 90 }),
    menu: (base) => ({
      ...base,
      borderRadius: 12,
      overflow: "hidden",
      border: "1px solid rgba(0,0,0,0.08)",
      boxShadow: "0 12px 32px rgba(23,23,23,0.08)",
    }),
    option: (base, state) => ({
      ...base,
      fontSize: 13,
      cursor: "pointer",
      backgroundColor: state.isSelected ? "#ea6a4e" : state.isFocused ? "#f5f5f5" : "#fff",
      color: state.isSelected ? "#fff" : "#171717",
    }),
  };
}

const codeSelectStyles: StylesConfig<CountryCodeOption, false> = {
  control: (base) => ({
    ...base,
    minHeight: 36,
    height: 36,
    border: "none",
    borderRadius: 999,
    backgroundColor: "transparent",
    boxShadow: "none",
    cursor: "pointer",
    fontSize: 13,
  }),
  valueContainer: (base) => ({ ...base, padding: "0 2px" }),
  singleValue: (base) => ({ ...base, color: "#404040", margin: 0 }),
  indicatorsContainer: (base) => ({ ...base, height: 36 }),
  dropdownIndicator: (base) => ({ ...base, color: "#a3a3a3", padding: "0 4px" }),
  indicatorSeparator: () => ({ display: "none" }),
  menuPortal: (base) => ({ ...base, zIndex: 90 }),
  menu: (base) => ({
    ...base,
    width: 180,
    borderRadius: 12,
    overflow: "hidden",
    border: "1px solid rgba(0,0,0,0.08)",
    boxShadow: "0 12px 32px rgba(23,23,23,0.08)",
  }),
  option: (base, state) => ({
    ...base,
    fontSize: 13,
    cursor: "pointer",
    backgroundColor: state.isSelected ? "#ea6a4e" : state.isFocused ? "#f5f5f5" : "#fff",
    color: state.isSelected ? "#fff" : "#171717",
  }),
};

