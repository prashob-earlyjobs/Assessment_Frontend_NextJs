"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { City, State } from "country-state-city";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ChevronDown, Check, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

type PhoneValue = {
  countryCode: string;
  nationalNumber: string; // always 10 digits for this form
};

type HiringReference = {
  companyName: string;
  coordinatorName: string;
  phone: PhoneValue;
  email: string;
};

type Spoc = {
  name: string;
  phone: PhoneValue;
  email: string;
};

type AgencyOnboardingFormState = {
  agencyName: string;
  agencyPhone: PhoneValue;
  agencyEmail: string;

  companyGstNo: string; // optional
  companyPan: string; // optional
  establishedYear: string; // input as string for easier validation

  ownerName: string;
  ownerPhone: PhoneValue;
  ownerEmail: string;
  ownerAadhaar: string;

  addressLine1: string;
  state: string; // state name (India)
  city: string; // city name (India)
  pincode: string;

  hiringReferences: HiringReference[]; // exactly 3 entries

  currentTeamSize: string;
  hiringForCategory: "IT" | "NON_IT" | "";
  expertCategories: string[]; // multi-select

  hiringSpoc: Spoc;
  billingSpoc: Spoc;

  declarationAccepted: boolean;
};

const COUNTRY_CODES = [
  { code: "+91", label: "IN +91" },
  { code: "+1", label: "US +1" },
  { code: "+44", label: "UK +44" },
  { code: "+61", label: "AU +61" },
  { code: "+971", label: "UAE +971" },
];

const EXPERT_CATEGORIES = [
  "BPO",
  "Information Technology",
  "Banking",
  "Insurance",
  "Aviation",
  "Retail",
  "Education",
  "Manufacturing",
  "Health Care",
  "E-commerce",
  "Hospitality",
  "Construction",
] as const;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const pincodeRegex = /^\d{6}$/;
const phone10Regex = /^\d{10}$/;
const aadhaarRegex = /^\d{12}$/;
const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{3}$/;
const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

const getAuthHeaders = () => {
  const token =
    Cookies.get("accessToken") ||
    (typeof window !== "undefined" ? localStorage.getItem("accessToken") : "") ||
    "";

  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

function SearchableCombobox(props: {
  label: string;
  placeholder: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (nextValue: string) => void;
  error?: string;
  disabled?: boolean;
}) {
  const { label, placeholder, value, options, onChange, error, disabled } = props;
  const [open, setOpen] = useState(false);

  const selectedLabel = options.find((o) => o.value === value)?.label;

  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-semibold">
        {label}{" "}
      </Label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            disabled={disabled}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={[
              "h-11 w-full justify-between rounded-lg bg-white text-slate-700 font-normal",
              "border-slate-300 hover:bg-slate-50 focus:border-orange-500 focus:ring-orange-500",
              error
                ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                : "",
            ].join(" ")}
          >
            <span className={value ? "text-slate-800" : "text-slate-500"}>
              {selectedLabel || placeholder}
            </span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />
            <CommandEmpty>No matches found.</CommandEmpty>
            <CommandGroup>
              <CommandList>
                {options.map((opt) => (
                  <CommandItem
                    key={opt.value}
                    value={opt.value}
                    onSelect={() => {
                      onChange(opt.value);
                      setOpen(false);
                    }}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center justify-between w-full">
                      <span>{opt.label}</span>
                      {opt.value === value ? <Check className="h-4 w-4" /> : null}
                    </div>
                  </CommandItem>
                ))}
              </CommandList>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}

function PhoneInput(props: {
  value: PhoneValue;
  onChange: (next: PhoneValue) => void;
  placeholder?: string;
  error?: string;
}) {
  const { value, onChange, placeholder, error } = props;

  return (
    <div className="space-y-1.5">
      <div className="flex gap-2">
        <Select
          value={value.countryCode}
          onValueChange={(v) => onChange({ ...value, countryCode: v })}
        >
          <SelectTrigger
            className={[
              "w-28 h-11 rounded-lg",
              error ? "border-red-500 focus:border-red-500 focus:ring-red-500/30" : "",
            ].join(" ")}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {COUNTRY_CODES.map((c) => (
              <SelectItem key={c.code} value={c.code}>
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          inputMode="numeric"
          placeholder={placeholder}
          value={value.nationalNumber}
          onChange={(e) => {
            const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
            onChange({ ...value, nationalNumber: digits });
          }}
          className={[
            "h-11 rounded-lg",
            error ? "border-red-500 focus-visible:ring-2 focus-visible:ring-red-500/30" : "",
          ].join(" ")}
        />
      </div>
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}

export default function AgencyOnboardingClient() {
  const router = useRouter();

  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL_2_0;

  const stateList = useMemo(() => State.getStatesOfCountry("IN"), []);

  const [formState, setFormState] = useState<AgencyOnboardingFormState>({
    agencyName: "",
    agencyPhone: { countryCode: "+91", nationalNumber: "" },
    agencyEmail: "",

    companyGstNo: "",
    companyPan: "",
    establishedYear: "",

    ownerName: "",
    ownerPhone: { countryCode: "+91", nationalNumber: "" },
    ownerEmail: "",
    ownerAadhaar: "",

    addressLine1: "",
    state: "",
    city: "",
    pincode: "",

    hiringReferences: Array.from({ length: 3 }).map(() => ({
      companyName: "",
      coordinatorName: "",
      phone: { countryCode: "+91", nationalNumber: "" },
      email: "",
    })),

    currentTeamSize: "",
    hiringForCategory: "",
    expertCategories: [],

    hiringSpoc: { name: "", phone: { countryCode: "+91", nationalNumber: "" }, email: "" },
    billingSpoc: { name: "", phone: { countryCode: "+91", nationalNumber: "" }, email: "" },

    declarationAccepted: false,
  });

  const selectedStateIsoCode = useMemo(() => {
    const s = stateList.find((st) => st.name === formState.state);
    return s?.isoCode || "";
  }, [formState.state, stateList]);

  const cityOptions = useMemo(() => {
    if (!selectedStateIsoCode) return [];
    return City.getCitiesOfState("IN", selectedStateIsoCode).map((c) => c.name);
  }, [selectedStateIsoCode]);

  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  const validate = (): Record<string, string> => {
    const errors: Record<string, string> = {};
    const currentYear = new Date().getFullYear();

    const agencyName = formState.agencyName.trim();
    if (!agencyName) errors.agencyName = "Agency name is required.";

    const agencyPhone = formState.agencyPhone.nationalNumber;
    if (!agencyPhone || !phone10Regex.test(agencyPhone))
      errors.agencyPhone = "Agency phone must be exactly 10 digits.";

    const agencyEmail = formState.agencyEmail.trim();
    if (!agencyEmail) errors.agencyEmail = "Email is required.";
    else if (!emailRegex.test(agencyEmail)) errors.agencyEmail = "Please enter a valid email.";

    const gst = formState.companyGstNo.trim();
    if (gst && !gstRegex.test(gst)) errors.companyGstNo = "Invalid GST number format.";

    const pan = formState.companyPan.trim();
    if (pan && !panRegex.test(pan)) errors.companyPan = "Invalid PAN format.";

    const yearNum = Number(formState.establishedYear);
    if (!formState.establishedYear.trim()) errors.establishedYear = "Established year is required.";
    else if (!Number.isFinite(yearNum) || yearNum < 1900 || yearNum > currentYear)
      errors.establishedYear = `Established year must be between 1900 and ${currentYear}.`;

    const ownerName = formState.ownerName.trim();
    if (!ownerName) errors.ownerName = "Owner name is required.";

    const ownerPhone = formState.ownerPhone.nationalNumber;
    if (!ownerPhone || !phone10Regex.test(ownerPhone))
      errors.ownerPhone = "Owner phone must be exactly 10 digits.";

    const ownerEmail = formState.ownerEmail.trim();
    if (!ownerEmail) errors.ownerEmail = "Owner email is required.";
    else if (!emailRegex.test(ownerEmail)) errors.ownerEmail = "Please enter a valid owner email.";

    const aadhaar = formState.ownerAadhaar.trim();
    if (!aadhaar) errors.ownerAadhaar = "Aadhaar number is required.";
    else if (!aadhaarRegex.test(aadhaar)) errors.ownerAadhaar = "Aadhaar must be exactly 12 digits.";

    const addressLine1 = formState.addressLine1.trim();
    if (!addressLine1) errors.addressLine1 = "Address line 1 is required.";

    if (!formState.state.trim()) errors.state = "State is required.";
    if (!formState.city.trim()) errors.city = "City is required.";

    const pincode = formState.pincode.trim();
    if (!pincode) errors.pincode = "Pincode is required.";
    else if (!pincodeRegex.test(pincode)) errors.pincode = "Pincode must be exactly 6 digits.";

    formState.hiringReferences.forEach((ref, idx) => {
      const prefix = `ref.${idx}.`;
      if (!ref.companyName.trim()) errors[`${prefix}companyName`] = "Company name is required.";
      if (!ref.coordinatorName.trim())
        errors[`${prefix}coordinatorName`] = "Co-ordinator name is required.";

      const phone = ref.phone.nationalNumber;
      if (!phone || !phone10Regex.test(phone))
        errors[`${prefix}phone`] = "Phone must be exactly 10 digits.";

      const em = ref.email.trim();
      if (!em) errors[`${prefix}email`] = "Email is required.";
      else if (!emailRegex.test(em)) errors[`${prefix}email`] = "Please enter a valid email.";
    });

    const teamSizeStr = formState.currentTeamSize.trim();
    const teamSize = Number(teamSizeStr);
    if (!teamSizeStr) errors.currentTeamSize = "Team size is required.";
    else if (!Number.isFinite(teamSize) || teamSize < 0)
      errors.currentTeamSize = "Team size must be 0 or more.";

    if (!formState.hiringForCategory) errors.hiringForCategory = "Select a hiring category.";

    if (!formState.expertCategories.length)
      errors.expertCategories = "Select at least one expert category.";

    const spocValidate = (spoc: Spoc, keyPrefix: string) => {
      if (!spoc.name.trim()) errors[`${keyPrefix}.name`] = "Name is required.";
      if (!spoc.phone.nationalNumber || !phone10Regex.test(spoc.phone.nationalNumber))
        errors[`${keyPrefix}.phone`] = "Phone must be exactly 10 digits.";
      if (!spoc.email.trim()) errors[`${keyPrefix}.email`] = "Email is required.";
      else if (!emailRegex.test(spoc.email.trim()))
        errors[`${keyPrefix}.email`] = "Please enter a valid email.";
    };

    spocValidate(formState.hiringSpoc, "hiringSpoc");
    spocValidate(formState.billingSpoc, "billingSpoc");

    if (!formState.declarationAccepted) errors.declarationAccepted = "You must accept the declaration to proceed.";

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!backendUrl) {
      toast.error("API base URL is missing in environment variables.");
      return;
    }

    const firstAttempt = !submitAttempted;
    setSubmitAttempted(true);

    const errors = validate();
    setFieldErrors(errors);

    if (Object.keys(errors).length) {
      if (firstAttempt) toast.error("Please fix the errors below.");
      return;
    }

    try {
      setIsSubmitting(true);

      const companyAddress = [
        formState.addressLine1.trim(),
        formState.city.trim(),
        formState.state.trim(),
        formState.pincode.trim(),
      ].join(", ");

      const payload = {
        agencyName: formState.agencyName.trim(),
        agencyPhone: formState.agencyPhone.nationalNumber,
        agencyEmailId: formState.agencyEmail.trim(),
        companyAddress,
        establishedYear: Number(formState.establishedYear),
        ownerDirectorDetails: {
          name: formState.ownerName.trim(),
          phone: formState.ownerPhone.nationalNumber,
          email: formState.ownerEmail.trim(),
          aadhaar: formState.ownerAadhaar.trim(),
        },
        currentlyHiringFor: formState.hiringReferences.map((ref) => ({
          companyName: ref.companyName.trim(),
          coordinatorName: ref.coordinatorName.trim(),
          phone: ref.phone.nationalNumber,
          email: ref.email.trim(),
        })),
        hiringForCategory: formState.hiringForCategory,
        currentTeamSize: Number(formState.currentTeamSize),
        teamExpertCategories: formState.expertCategories,
        spocForHiring: {
          name: formState.hiringSpoc.name.trim(),
          phone: formState.hiringSpoc.phone.nationalNumber,
          email: formState.hiringSpoc.email.trim(),
        },
        spocForBillingMis: {
          name: formState.billingSpoc.name.trim(),
          phone: formState.billingSpoc.phone.nationalNumber,
          email: formState.billingSpoc.email.trim(),
        },
        declarationAccepted: formState.declarationAccepted,
      };

      const url = `${backendUrl}/onboarding/public/agency`;

      const res = await fetch(url, {
        method: "POST",
        headers: getAuthHeaders(),
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (res.status === 201 || res.ok) {
        localStorage.removeItem("redirectAfterLogin");
        setSuccessDialogOpen(true);
        return;
      }

      toast.error(data?.message || data?.error || "Failed to submit onboarding. Please try again.");
    } catch (err: any) {
      toast.error(err?.message || "Failed to submit onboarding. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const showErr = (key: string) => (submitAttempted ? fieldErrors[key] : undefined);

  const stateOptions = useMemo(() => {
    return stateList.map((s) => ({ value: s.name, label: s.name }));
  }, [stateList]);

  const cityOptionsForCombo = useMemo(() => {
    return cityOptions.map((c) => ({ value: c, label: c }));
  }, [cityOptions]);

  const toggleExpertCategory = (cat: string) => {
    setFormState((prev) => {
      const exists = prev.expertCategories.includes(cat);
      return {
        ...prev,
        expertCategories: exists ? prev.expertCategories.filter((x) => x !== cat) : [...prev.expertCategories, cat],
      };
    });
  };

  const selectAllExperts = () => {
    setFormState((prev) => ({ ...prev, expertCategories: [...EXPERT_CATEGORIES] }));
  };

  const clearAllExperts = () => {
    setFormState((prev) => ({ ...prev, expertCategories: [] }));
  };

  const renderSectionError = (key: string) => {
    const err = showErr(key);
    if (!err) return null;
    return <p className="text-xs text-red-600">{err}</p>;
  };

  const goHomeAfterSuccess = () => {
    router.push("/");
    router.refresh();
  };

  return (
    <>
    <div className="w-full py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-slate-900">Agency Onboarding</h1>
          <p className="text-sm text-slate-600 mt-2">
            Fill in your agency details. Fields marked with * are required.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="border border-slate-200 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Agency basic details</CardTitle>
              <CardDescription>Let us know who you are and how to contact you.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-1.5">
                <Label className="text-sm font-semibold text-slate-800">
                  Agency Name *{" "}
                </Label>
                <Input
                  value={formState.agencyName}
                  onChange={(e) => setFormState((prev) => ({ ...prev, agencyName: e.target.value }))}
                  placeholder="Enter agency name"
                  className={showErr("agencyName") ? "border-red-500 focus-visible:ring-2 focus-visible:ring-red-500/30" : ""}
                />
                {showErr("agencyName") ? (
                  <p className="text-xs text-red-600">{showErr("agencyName")}</p>
                ) : null}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <Label className="text-sm font-semibold text-slate-800">
                    Agency Phone * (10 digits)
                  </Label>
                  <PhoneInput
                    value={formState.agencyPhone}
                    onChange={(next) => setFormState((prev) => ({ ...prev, agencyPhone: next }))}
                    error={showErr("agencyPhone")}
                    placeholder="9876543210"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm font-semibold text-slate-800">Agency Email Id *</Label>
                  <Input
                    value={formState.agencyEmail}
                    onChange={(e) => setFormState((prev) => ({ ...prev, agencyEmail: e.target.value }))}
                    placeholder="name@company.com"
                    className={showErr("agencyEmail") ? "border-red-500 focus-visible:ring-2 focus-visible:ring-red-500/30" : ""}
                  />
                  {showErr("agencyEmail") ? (
                    <p className="text-xs text-red-600">{showErr("agencyEmail")}</p>
                  ) : null}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Company & owner</CardTitle>
              <CardDescription>GST/PAN are optional. Owner details are required.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <Label className="text-sm font-semibold text-slate-800">Company GST NO (optional)</Label>
                  <Input
                    value={formState.companyGstNo}
                    onChange={(e) => setFormState((prev) => ({ ...prev, companyGstNo: e.target.value.toUpperCase() }))}
                    placeholder="08ABCDE9999F1Z8"
                    className={showErr("companyGstNo") ? "border-red-500 focus-visible:ring-2 focus-visible:ring-red-500/30" : ""}
                  />
                  {showErr("companyGstNo") ? (
                    <p className="text-xs text-red-600">{showErr("companyGstNo")}</p>
                  ) : null}
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm font-semibold text-slate-800">Company PAN (optional)</Label>
                  <Input
                    value={formState.companyPan}
                    onChange={(e) => setFormState((prev) => ({ ...prev, companyPan: e.target.value.toUpperCase() }))}
                    placeholder="AAAPA1234C"
                    className={showErr("companyPan") ? "border-red-500 focus-visible:ring-2 focus-visible:ring-red-500/30" : ""}
                  />
                  {showErr("companyPan") ? (
                    <p className="text-xs text-red-600">{showErr("companyPan")}</p>
                  ) : null}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <Label className="text-sm font-semibold text-slate-800">Established Year *</Label>
                  <Input
                    value={formState.establishedYear}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, "").slice(0, 4);
                      setFormState((prev) => ({ ...prev, establishedYear: digits }));
                    }}
                    placeholder="e.g. 2012"
                    className={showErr("establishedYear") ? "border-red-500 focus-visible:ring-2 focus-visible:ring-red-500/30" : ""}
                    inputMode="numeric"
                  />
                  {showErr("establishedYear") ? (
                    <p className="text-xs text-red-600">{showErr("establishedYear")}</p>
                  ) : null}
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm font-semibold text-slate-800">
                    Owner / Director: Aadhaar *
                  </Label>
                  <Input
                    value={formState.ownerAadhaar}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, "").slice(0, 12);
                      setFormState((prev) => ({ ...prev, ownerAadhaar: digits }));
                    }}
                    placeholder="12-digit Aadhaar"
                    inputMode="numeric"
                    className={showErr("ownerAadhaar") ? "border-red-500 focus-visible:ring-2 focus-visible:ring-red-500/30" : ""}
                  />
                  {showErr("ownerAadhaar") ? (
                    <p className="text-xs text-red-600">{showErr("ownerAadhaar")}</p>
                  ) : null}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <Label className="text-sm font-semibold text-slate-800">Owner / Director: Name *</Label>
                  <Input
                    value={formState.ownerName}
                    onChange={(e) => setFormState((prev) => ({ ...prev, ownerName: e.target.value }))}
                    placeholder="Enter owner name"
                    className={showErr("ownerName") ? "border-red-500 focus-visible:ring-2 focus-visible:ring-red-500/30" : ""}
                  />
                  {showErr("ownerName") ? (
                    <p className="text-xs text-red-600">{showErr("ownerName")}</p>
                  ) : null}
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm font-semibold text-slate-800">Owner / Director: Email *</Label>
                  <Input
                    value={formState.ownerEmail}
                    onChange={(e) => setFormState((prev) => ({ ...prev, ownerEmail: e.target.value }))}
                    placeholder="owner@company.com"
                    className={showErr("ownerEmail") ? "border-red-500 focus-visible:ring-2 focus-visible:ring-red-500/30" : ""}
                  />
                  {showErr("ownerEmail") ? (
                    <p className="text-xs text-red-600">{showErr("ownerEmail")}</p>
                  ) : null}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-semibold text-slate-800">Owner / Director: Phone *</Label>
                <PhoneInput
                  value={formState.ownerPhone}
                  onChange={(next) => setFormState((prev) => ({ ...prev, ownerPhone: next }))}
                  error={showErr("ownerPhone")}
                  placeholder="9876543210"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Company address</CardTitle>
              <CardDescription>State and city are searchable dropdowns.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-1.5">
                <Label className="text-sm font-semibold text-slate-800">Address Line 1 *</Label>
                <Input
                  value={formState.addressLine1}
                  onChange={(e) => setFormState((prev) => ({ ...prev, addressLine1: e.target.value }))}
                  placeholder="Plot/Building/Street"
                  className={showErr("addressLine1") ? "border-red-500 focus-visible:ring-2 focus-visible:ring-red-500/30" : ""}
                />
                {showErr("addressLine1") ? (
                  <p className="text-xs text-red-600">{showErr("addressLine1")}</p>
                ) : null}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SearchableCombobox
                  label="State *"
                  placeholder="Select state"
                  value={formState.state}
                  options={stateOptions}
                  error={showErr("state")}
                  onChange={(next) => {
                    setFormState((prev) => ({
                      ...prev,
                      state: next,
                      city: "", // clear city when state changes
                    }));
                  }}
                />

                <SearchableCombobox
                  label="City *"
                  placeholder={selectedStateIsoCode ? "Select city" : "Select state first"}
                  value={formState.city}
                  disabled={!selectedStateIsoCode}
                  options={cityOptionsForCombo}
                  error={showErr("city")}
                  onChange={(next) => setFormState((prev) => ({ ...prev, city: next }))}
                />

                <div className="space-y-1.5">
                  <Label className="text-sm font-semibold text-slate-800">Pincode *</Label>
                  <Input
                    value={formState.pincode}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, "").slice(0, 6);
                      setFormState((prev) => ({ ...prev, pincode: digits }));
                    }}
                    placeholder="400001"
                    inputMode="numeric"
                    className={showErr("pincode") ? "border-red-500 focus-visible:ring-2 focus-visible:ring-red-500/30" : ""}
                  />
                  {showErr("pincode") ? <p className="text-xs text-red-600">{showErr("pincode")}</p> : null}
                </div>
              </div>

              <CardDescription className="text-xs text-slate-500">
                Preview companyAddress format: <span className="font-medium">line1, city, state, pincode</span>
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Currently hiring for</CardTitle>
              <CardDescription>3 reference rows (company + coordinator contact).</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {formState.hiringReferences.map((ref, idx) => {
                const keyBase = `ref.${idx}.`;
                return (
                  <div key={idx} className="border border-slate-200 rounded-2xl p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-slate-900">Reference {idx + 1}</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-1.5">
                        <Label className="text-sm font-semibold text-slate-800">Company name *</Label>
                        <Input
                          value={ref.companyName}
                          onChange={(e) => {
                            const next = e.target.value;
                            setFormState((prev) => {
                              const hiringReferences = [...prev.hiringReferences];
                              hiringReferences[idx] = { ...hiringReferences[idx], companyName: next };
                              return { ...prev, hiringReferences };
                            });
                          }}
                          placeholder="Enter company name"
                          className={
                            showErr(`${keyBase}companyName`)
                              ? "border-red-500 focus-visible:ring-2 focus-visible:ring-red-500/30"
                              : ""
                          }
                        />
                        {showErr(`${keyBase}companyName`) ? (
                          <p className="text-xs text-red-600">{showErr(`${keyBase}companyName`)}</p>
                        ) : null}
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-sm font-semibold text-slate-800">Co-ordinator name *</Label>
                        <Input
                          value={ref.coordinatorName}
                          onChange={(e) => {
                            const next = e.target.value;
                            setFormState((prev) => {
                              const hiringReferences = [...prev.hiringReferences];
                              hiringReferences[idx] = { ...hiringReferences[idx], coordinatorName: next };
                              return { ...prev, hiringReferences };
                            });
                          }}
                          placeholder="Enter coordinator name"
                          className={
                            showErr(`${keyBase}coordinatorName`)
                              ? "border-red-500 focus-visible:ring-2 focus-visible:ring-red-500/30"
                              : ""
                          }
                        />
                        {showErr(`${keyBase}coordinatorName`) ? (
                          <p className="text-xs text-red-600">{showErr(`${keyBase}coordinatorName`)}</p>
                        ) : null}
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-sm font-semibold text-slate-800">Phone *</Label>
                        <PhoneInput
                          value={ref.phone}
                          onChange={(next) => {
                            setFormState((prev) => {
                              const hiringReferences = [...prev.hiringReferences];
                              hiringReferences[idx] = { ...hiringReferences[idx], phone: next };
                              return { ...prev, hiringReferences };
                            });
                          }}
                          error={showErr(`${keyBase}phone`)}
                          placeholder="9876543210"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-sm font-semibold text-slate-800">Email *</Label>
                      <Input
                        value={ref.email}
                        onChange={(e) => {
                          const next = e.target.value;
                          setFormState((prev) => {
                            const hiringReferences = [...prev.hiringReferences];
                            hiringReferences[idx] = { ...hiringReferences[idx], email: next };
                            return { ...prev, hiringReferences };
                          });
                        }}
                        placeholder="email@company.com"
                        className={
                          showErr(`${keyBase}email`)
                            ? "border-red-500 focus-visible:ring-2 focus-visible:ring-red-500/30"
                            : ""
                        }
                      />
                      {showErr(`${keyBase}email`) ? (
                        <p className="text-xs text-red-600">{showErr(`${keyBase}email`)}</p>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card className="border border-slate-200 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Team & hiring</CardTitle>
              <CardDescription>Team size, hiring category, expert categories and SPOCs.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <Label className="text-sm font-semibold text-slate-800">Your Current Team Size *</Label>
                  <Input
                    value={formState.currentTeamSize}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, "");
                      setFormState((prev) => ({ ...prev, currentTeamSize: digits }));
                    }}
                    placeholder="e.g. 12"
                    inputMode="numeric"
                    className={showErr("currentTeamSize") ? "border-red-500 focus-visible:ring-2 focus-visible:ring-red-500/30" : ""}
                  />
                  {showErr("currentTeamSize") ? (
                    <p className="text-xs text-red-600">{showErr("currentTeamSize")}</p>
                  ) : null}
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm font-semibold text-slate-800">Hiring For Category *</Label>
                  <Select
                    value={formState.hiringForCategory}
                    onValueChange={(v) => setFormState((prev) => ({ ...prev, hiringForCategory: v as any }))}
                  >
                    <SelectTrigger
                      className={[
                        "h-11 rounded-lg",
                        showErr("hiringForCategory") ? "border-red-500 focus:border-red-500 focus:ring-red-500/30" : "",
                      ].join(" ")}
                    >
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IT">IT</SelectItem>
                      <SelectItem value="NON_IT">NON_IT</SelectItem>
                    </SelectContent>
                  </Select>
                  {showErr("hiringForCategory") ? (
                    <p className="text-xs text-red-600">{showErr("hiringForCategory")}</p>
                  ) : null}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline justify-between gap-4">
                  <Label className="text-sm font-semibold text-slate-800">Expert categories *</Label>
                  <div className="flex gap-2">
                    <Button type="button" variant="outline" className="border-orange-200 text-orange-700 hover:bg-orange-50" onClick={selectAllExperts}>
                      Select all
                    </Button>
                    <Button type="button" variant="outline" className="border-orange-200 text-orange-700 hover:bg-orange-50" onClick={clearAllExperts}>
                      Clear all
                    </Button>
                  </div>
                </div>

                <div
                  className={[
                    "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-4 rounded-2xl border",
                    showErr("expertCategories")
                      ? "border-red-300 bg-red-50/20"
                      : "border-slate-200 bg-white",
                  ].join(" ")}
                >
                  {EXPERT_CATEGORIES.map((cat) => (
                    <label key={cat} className="flex items-center gap-3 p-2 rounded-xl hover:bg-orange-50/50 cursor-pointer border border-transparent">
                      <Checkbox
                        checked={formState.expertCategories.includes(cat)}
                        onCheckedChange={() => toggleExpertCategory(cat)}
                        className="border-orange-400 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                      />
                      <span className="text-slate-900 font-medium">{cat}</span>
                    </label>
                  ))}
                </div>

                {renderSectionError("expertCategories")}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-900">SPOC for hiring *</h3>
                  <div className="space-y-1.5">
                    <Label className="text-sm font-semibold text-slate-800">Name</Label>
                    <Input
                      value={formState.hiringSpoc.name}
                      onChange={(e) => setFormState((prev) => ({ ...prev, hiringSpoc: { ...prev.hiringSpoc, name: e.target.value } }))}
                      placeholder="Enter hiring SPOC name"
                      className={showErr("hiringSpoc.name") ? "border-red-500 focus-visible:ring-2 focus-visible:ring-red-500/30" : ""}
                    />
                    {showErr("hiringSpoc.name") ? <p className="text-xs text-red-600">{showErr("hiringSpoc.name")}</p> : null}
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm font-semibold text-slate-800">Phone</Label>
                    <PhoneInput
                      value={formState.hiringSpoc.phone}
                      onChange={(next) => setFormState((prev) => ({ ...prev, hiringSpoc: { ...prev.hiringSpoc, phone: next } }))}
                      error={showErr("hiringSpoc.phone")}
                      placeholder="9876543210"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm font-semibold text-slate-800">Email</Label>
                    <Input
                      value={formState.hiringSpoc.email}
                      onChange={(e) => setFormState((prev) => ({ ...prev, hiringSpoc: { ...prev.hiringSpoc, email: e.target.value } }))}
                      placeholder="spoc@company.com"
                      className={showErr("hiringSpoc.email") ? "border-red-500 focus-visible:ring-2 focus-visible:ring-red-500/30" : ""}
                    />
                    {showErr("hiringSpoc.email") ? <p className="text-xs text-red-600">{showErr("hiringSpoc.email")}</p> : null}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-900">SPOC for Billing/MIS *</h3>
                  <div className="space-y-1.5">
                    <Label className="text-sm font-semibold text-slate-800">Name</Label>
                    <Input
                      value={formState.billingSpoc.name}
                      onChange={(e) => setFormState((prev) => ({ ...prev, billingSpoc: { ...prev.billingSpoc, name: e.target.value } }))}
                      placeholder="Enter billing SPOC name"
                      className={showErr("billingSpoc.name") ? "border-red-500 focus-visible:ring-2 focus-visible:ring-red-500/30" : ""}
                    />
                    {showErr("billingSpoc.name") ? <p className="text-xs text-red-600">{showErr("billingSpoc.name")}</p> : null}
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm font-semibold text-slate-800">Phone</Label>
                    <PhoneInput
                      value={formState.billingSpoc.phone}
                      onChange={(next) => setFormState((prev) => ({ ...prev, billingSpoc: { ...prev.billingSpoc, phone: next } }))}
                      error={showErr("billingSpoc.phone")}
                      placeholder="9876543210"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm font-semibold text-slate-800">Email</Label>
                    <Input
                      value={formState.billingSpoc.email}
                      onChange={(e) => setFormState((prev) => ({ ...prev, billingSpoc: { ...prev.billingSpoc, email: e.target.value } }))}
                      placeholder="spoc@company.com"
                      className={showErr("billingSpoc.email") ? "border-red-500 focus-visible:ring-2 focus-visible:ring-red-500/30" : ""}
                    />
                    {showErr("billingSpoc.email") ? <p className="text-xs text-red-600">{showErr("billingSpoc.email")}</p> : null}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Legal declaration</CardTitle>
              <CardDescription>Required to submit onboarding.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <Checkbox
                  checked={formState.declarationAccepted}
                  onCheckedChange={(checked) =>
                    setFormState((prev) => ({ ...prev, declarationAccepted: checked === true }))
                  }
                  className={
                    showErr("declarationAccepted")
                      ? "border-red-500 focus-visible:ring-2 focus-visible:ring-red-500/30 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                      : "border-orange-400 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                  }
                />
                <div className="space-y-1">
                  <p className="text-sm text-slate-800 font-medium">
                    I agree that we will not charge any fees from candidates at any stage of the hiring process. I
                    understand that if EarlyJobs discovers any violation of this agreement, Earlyjobs reserve the
                    right to take appropriate legal action against the responsible party.
                  </p>
                </div>
              </label>
              {showErr("declarationAccepted") ? (
                <p className="text-xs text-red-600">{showErr("declarationAccepted")}</p>
              ) : null}
            </CardContent>
          </Card>

          <div className="flex justify-center pt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl h-12 px-8 font-semibold"
            >
              {isSubmitting ? "Submitting..." : "Submit onboarding"}
            </Button>
          </div>
        </form>
      </div>
    </div>

    <Dialog
      open={successDialogOpen}
      onOpenChange={(open) => {
        setSuccessDialogOpen(open);
        if (!open) {
          goHomeAfterSuccess();
        }
      }}
    >
      <DialogContent className="sm:max-w-md border-slate-200">
        <DialogHeader>
          <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2 className="h-8 w-8 text-emerald-600" aria-hidden />
          </div>
          <DialogTitle className="text-center text-xl text-slate-900">
            Application submitted successfully
          </DialogTitle>
          <DialogDescription className="text-center text-slate-600 text-base pt-2 leading-relaxed">
            Thank you for completing agency onboarding. Your request has been received and is under review.
            You will receive your <strong className="text-slate-800">login credentials by email after approval</strong>.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center pt-2">
          <Button
            type="button"
            onClick={() => {
              setSuccessDialogOpen(false);
            }}
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-8"
          >
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  );
}

