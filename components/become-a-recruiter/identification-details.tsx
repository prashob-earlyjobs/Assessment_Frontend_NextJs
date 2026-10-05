"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";
import {
  Field,
  emptyFamilyMember,
  inputClass,
  shell,
  type FamilyMember,
  type IdentificationDetails,
  type IdentificationErrors,
} from "@/components/become-a-recruiter/form-shared";
import {
  recruiterUploadFolderPath,
  uploadRecruiterDocument,
  type UploadFolder,
} from "@/components/become-a-recruiter/upload";

const MAX_DOC_BYTES = 1 * 1024 * 1024;
const MAX_DOC_LABEL = "1 MB";

type UploadKey = "profilePhoto" | "aadharFront" | "aadharBack" | "panFront" | "panBack";

const uploadFolderByKey: Record<UploadKey, UploadFolder> = {
  profilePhoto: "profile",
  aadharFront: "aadhar",
  aadharBack: "aadhar",
  panFront: "pan",
  panBack: "pan",
};

const uploadLabelByKey: Record<UploadKey, string> = {
  profilePhoto: "profile photo",
  aadharFront: "Aadhar front",
  aadharBack: "Aadhar back",
  panFront: "PAN front",
  panBack: "PAN back",
};

export function IdentificationDetailsStep({
  value,
  errors,
  email,
  uploadSessionId,
  onChange,
}: {
  value: IdentificationDetails;
  errors: IdentificationErrors;
  email: string;
  uploadSessionId: string;
  onChange: (next: IdentificationDetails) => void;
}) {
  const valueRef = useRef(value);
  valueRef.current = value;
  const busyRef = useRef(false);

  const [uploadErrors, setUploadErrors] = useState<Partial<Record<UploadKey, string>>>({});
  const [activeUpload, setActiveUpload] = useState<UploadKey | null>(null);
  const isUploading = activeUpload !== null;

  function patch(key: keyof IdentificationDetails, next: IdentificationDetails[keyof IdentificationDetails]) {
    onChange({ ...valueRef.current, [key]: next });
  }

  function updateMember(index: number, memberPatch: Partial<FamilyMember>) {
    patch(
      "familyMembers",
      valueRef.current.familyMembers.map((member, i) =>
        i === index ? { ...member, ...memberPatch } : member,
      ),
    );
  }

  function addMember() {
    if (valueRef.current.familyMembers.length >= 5) return;
    patch("familyMembers", [...valueRef.current.familyMembers, emptyFamilyMember()]);
  }

  function removeMember(index: number) {
    if (valueRef.current.familyMembers.length <= 1) return;
    patch(
      "familyMembers",
      valueRef.current.familyMembers.filter((_, i) => i !== index),
    );
  }

  function clearUploadError(key: UploadKey) {
    setUploadErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  async function onFile(key: UploadKey, file: File | undefined) {
    if (!file) return;
    if (busyRef.current) {
      toast.message("Please wait for the current upload to finish");
      return;
    }
    if (!file.type.startsWith("image/")) {
      setUploadErrors((prev) => ({ ...prev, [key]: "Only image files are allowed" }));
      return;
    }
    if (file.size > MAX_DOC_BYTES) {
      setUploadErrors((prev) => ({
        ...prev,
        [key]: `File must be ${MAX_DOC_LABEL} or smaller`,
      }));
      return;
    }

    clearUploadError(key);
    busyRef.current = true;
    setActiveUpload(key);

    const preview = URL.createObjectURL(file);
    patch(key, preview);

    const toastId = toast.loading(`Uploading ${uploadLabelByKey[key]}…`);

    try {
      const folderPath = recruiterUploadFolderPath(email, uploadSessionId, uploadFolderByKey[key]);
      const fileUrl = await uploadRecruiterDocument(file, folderPath);
      patch(key, fileUrl);
      URL.revokeObjectURL(preview);
      toast.success(`${uploadLabelByKey[key]} uploaded`, { id: toastId });
    } catch (error) {
      patch(key, "");
      URL.revokeObjectURL(preview);
      const message = error instanceof Error ? error.message : "Failed to upload file";
      setUploadErrors((prev) => ({ ...prev, [key]: message }));
      toast.error(message, { id: toastId });
    } finally {
      busyRef.current = false;
      setActiveUpload(null);
    }
  }

  function uploadError(key: UploadKey) {
    return uploadErrors[key] || errors[key];
  }

  return (
    <div className="mt-8 space-y-10">
      <div>
        <UploadTile
          label="Profile photo"
          hint={`Passport size photo · max ${MAX_DOC_LABEL}`}
          preview={value.profilePhoto}
          error={uploadError("profilePhoto")}
          uploading={activeUpload === "profilePhoto"}
          disabled={isUploading}
          accept="image/*"
          onFile={(file) => void onFile("profilePhoto", file)}
          tall
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Aadhar number" required error={errors.aadharNumber}>
          <span className={shell(errors.aadharNumber)}>
            <input
              value={value.aadharNumber}
              onChange={(event) =>
                patch("aadharNumber", event.target.value.replace(/\D/g, "").slice(0, 12))
              }
              inputMode="numeric"
              placeholder="Ex. 123456789012"
              className={inputClass()}
            />
          </span>
        </Field>

        <Field label="PAN number" required error={errors.panNumber}>
          <span className={shell(errors.panNumber)}>
            <input
              value={value.panNumber}
              onChange={(event) =>
                patch(
                  "panNumber",
                  event.target.value
                    .toUpperCase()
                    .replace(/[^A-Z0-9]/g, "")
                    .slice(0, 10),
                )
              }
              placeholder="Ex. AAAAA1111A"
              className={`${inputClass()} uppercase`}
            />
          </span>
        </Field>
      </div>

      <section>
        <h3 className="text-base font-medium tracking-[-0.02em] text-neutral-950">
          Aadhar card<span className="text-brand"> *</span>
        </h3>
        <p className="mt-1 text-[13px] text-neutral-500">Images only · max {MAX_DOC_LABEL} each</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <UploadTile
            label="Front"
            hint="Upload the front side of Aadhar card"
            preview={value.aadharFront}
            error={uploadError("aadharFront")}
            uploading={activeUpload === "aadharFront"}
            disabled={isUploading}
            accept="image/*"
            onFile={(file) => void onFile("aadharFront", file)}
          />
          <UploadTile
            label="Back"
            hint="Upload the back side of Aadhar card"
            preview={value.aadharBack}
            error={uploadError("aadharBack")}
            uploading={activeUpload === "aadharBack"}
            disabled={isUploading}
            accept="image/*"
            onFile={(file) => void onFile("aadharBack", file)}
          />
        </div>
      </section>

      <section>
        <h3 className="text-base font-medium tracking-[-0.02em] text-neutral-950">
          PAN card<span className="text-brand"> *</span>
        </h3>
        <p className="mt-1 text-[13px] text-neutral-500">Images only · max {MAX_DOC_LABEL} each</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <UploadTile
            label="Front"
            hint="Upload the front side of PAN card"
            preview={value.panFront}
            error={uploadError("panFront")}
            uploading={activeUpload === "panFront"}
            disabled={isUploading}
            accept="image/*"
            onFile={(file) => void onFile("panFront", file)}
          />
          <UploadTile
            label="Back"
            hint="Upload the back side of PAN card"
            preview={value.panBack}
            error={uploadError("panBack")}
            uploading={activeUpload === "panBack"}
            disabled={isUploading}
            accept="image/*"
            onFile={(file) => void onFile("panBack", file)}
          />
        </div>
      </section>

      <Field label="Emergency contact" required error={errors.emergencyContact}>
        <span className={shell(errors.emergencyContact)}>
          <input
            value={value.emergencyContact}
            onChange={(event) =>
              patch("emergencyContact", event.target.value.replace(/\D/g, "").slice(0, 10))
            }
            inputMode="numeric"
            placeholder="Ex. 9876543210"
            className={inputClass()}
          />
        </span>
      </Field>

      <section className="border-t border-black/10 pt-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h3 className="text-base font-medium tracking-[-0.02em] text-neutral-950">
              Family members
            </h3>
            <p className="mt-1 text-[13px] text-neutral-500">
              Add at least 3 members (maximum 5).
            </p>
          </div>
          <button
            type="button"
            onClick={addMember}
            disabled={value.familyMembers.length >= 5}
            className="inline-flex h-9 items-center justify-center rounded-[6px] bg-brand px-3 text-[12px] font-medium text-white transition-colors hover:bg-[#d85c42] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Add member
          </button>
        </div>
        {errors.familyMembersCount ? (
          <p className="mt-2 text-[12px] text-red-500">{errors.familyMembersCount}</p>
        ) : null}

        <ul className="mt-6 space-y-4">
          {value.familyMembers.map((member, index) => {
            const row = errors.familyMembers?.[index] ?? {};
            return (
              <li
                key={index}
                className="rounded-[6px] border border-black/10 bg-neutral-50/80 p-4 sm:p-5"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <p className="text-[13px] font-medium text-neutral-800">Member {index + 1}</p>
                  {value.familyMembers.length > 1 ? (
                    <button
                      type="button"
                      onClick={() => removeMember(index)}
                      className="text-[12px] font-medium text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  ) : null}
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Name" required error={row.name}>
                    <span className={shell(row.name)}>
                      <input
                        value={member.name}
                        onChange={(event) => updateMember(index, { name: event.target.value })}
                        placeholder="Ex. John Doe"
                        className={inputClass()}
                      />
                    </span>
                  </Field>
                  <Field label="Relationship" required error={row.relationship}>
                    <span className={shell(row.relationship)}>
                      <input
                        value={member.relationship}
                        onChange={(event) =>
                          updateMember(index, { relationship: event.target.value })
                        }
                        placeholder="Ex. Father"
                        className={inputClass()}
                      />
                    </span>
                  </Field>
                  <Field label="Occupation" required error={row.occupation}>
                    <span className={shell(row.occupation)}>
                      <input
                        value={member.occupation}
                        onChange={(event) => updateMember(index, { occupation: event.target.value })}
                        placeholder="Ex. Engineer"
                        className={inputClass()}
                      />
                    </span>
                  </Field>
                  <Field label="Age" required error={row.age}>
                    <span className={shell(row.age)}>
                      <input
                        value={member.age}
                        onChange={(event) =>
                          updateMember(index, {
                            age: event.target.value.replace(/\D/g, "").slice(0, 3),
                          })
                        }
                        inputMode="numeric"
                        placeholder="Ex. 45"
                        className={inputClass()}
                      />
                    </span>
                  </Field>
                  <fieldset className="sm:col-span-2">
                    <legend className="px-1.5 text-[11px] font-medium tracking-[0.14em] text-neutral-400 uppercase">
                      Dependent on you<span className="text-brand"> *</span>
                    </legend>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {[
                        { value: true, label: "Yes" },
                        { value: false, label: "No" },
                      ].map((option) => {
                        const active = member.dependent === option.value;
                        return (
                          <button
                            key={option.label}
                            type="button"
                            onClick={() => updateMember(index, { dependent: option.value })}
                            aria-pressed={active}
                            className={`h-10 rounded-full px-4 text-[13px] font-medium transition-colors ${
                              active
                                ? "bg-brand text-white ring-1 ring-brand"
                                : "bg-white text-neutral-600 ring-1 ring-black/10 hover:bg-neutral-100"
                            }`}
                          >
                            {option.label}
                          </button>
                        );
                      })}
                    </div>
                    {row.dependent ? (
                      <p className="mt-1.5 px-1.5 text-[12px] text-red-500">{row.dependent}</p>
                    ) : null}
                  </fieldset>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

function UploadTile({
  label,
  hint,
  preview,
  error,
  uploading,
  disabled,
  accept,
  onFile,
  tall,
}: {
  label: string;
  hint: string;
  preview: string;
  error?: string;
  uploading?: boolean;
  disabled?: boolean;
  accept: string;
  onFile: (file: File | undefined) => void;
  tall?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const locked = Boolean(disabled);

  return (
    <div className={tall ? "w-full max-w-xs" : "min-w-0"}>
      <span className="px-1.5 text-[11px] font-medium tracking-[0.14em] text-neutral-400 uppercase">
        {label}
        <span className="text-brand"> *</span>
      </span>
      <button
        type="button"
        onClick={() => {
          if (locked) return;
          inputRef.current?.click();
        }}
        disabled={locked}
        className={[
          "relative mt-2 flex w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-[18px] border border-dashed px-4 text-center transition-colors",
          tall ? "h-[172px]" : "h-[140px]",
          error
            ? "border-red-300 bg-red-50/40"
            : "border-black/15 bg-neutral-50 hover:border-brand/40 hover:bg-white",
          locked ? "cursor-not-allowed opacity-60 hover:border-black/15 hover:bg-neutral-50" : "",
          uploading ? "cursor-wait opacity-80" : "",
        ].join(" ")}
      >
        <span
          className={[
            "flex shrink-0 items-center justify-center overflow-hidden rounded-md",
            tall ? "size-24" : "h-12 w-20",
          ].join(" ")}
        >
          {preview ? (
            <img src={preview} alt={`${label} preview`} className="size-full object-cover" />
          ) : (
            <span className="flex size-10 items-center justify-center rounded-full bg-white text-neutral-400 ring-1 ring-black/5">
              <UploadIcon />
            </span>
          )}
        </span>
        <span className="line-clamp-2 px-1 text-[12px] text-neutral-500">
          {uploading ? "Uploading…" : hint}
        </span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="sr-only"
        disabled={locked}
        onChange={(event) => {
          onFile(event.target.files?.[0]);
          event.target.value = "";
        }}
      />
      {error ? <p className="mt-1.5 px-1.5 text-[12px] text-red-500">{error}</p> : null}
    </div>
  );
}

function UploadIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-4" fill="none" aria-hidden>
      <path
        d="M10 13V4m0 0 3.5 3.5M10 4 6.5 7.5M4 13.5V15a1.5 1.5 0 0 0 1.5 1.5h9A1.5 1.5 0 0 0 16 15v-1.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
