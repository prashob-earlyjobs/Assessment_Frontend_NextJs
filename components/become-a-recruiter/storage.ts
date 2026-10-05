import {
  emptyAboutDetails,
  emptyIdentificationDetails,
  emptyPersonalDetails,
  emptyQualificationDetails,
  emptyReferences,
  type AboutDetails,
  type IdentificationDetails,
  type PersonalDetails,
  type QualificationDetails,
  type ReferencePerson,
} from "@/components/become-a-recruiter/form-shared";

export const RECRUITER_APPLICATION_STORAGE_KEY = "earlyjobs.recruiter-application.v1";

export type RecruiterApplicationDraft = {
  current: number;
  uploadSessionId: string;
  personal: PersonalDetails;
  qualification: QualificationDetails;
  about: AboutDetails;
  references: ReferencePerson[];
  identification: IdentificationDetails;
};

export function emptyRecruiterApplicationDraft(): RecruiterApplicationDraft {
  return {
    current: 0,
    uploadSessionId: String(Date.now()),
    personal: emptyPersonalDetails(),
    qualification: emptyQualificationDetails(),
    about: emptyAboutDetails(),
    references: emptyReferences(),
    identification: emptyIdentificationDetails(),
  };
}

export function loadRecruiterApplicationDraft(): RecruiterApplicationDraft | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(RECRUITER_APPLICATION_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<RecruiterApplicationDraft>;
    const fallback = emptyRecruiterApplicationDraft();
    return {
      current:
        typeof parsed.current === "number" && parsed.current >= 0 && parsed.current <= 4
          ? parsed.current
          : 0,
      uploadSessionId:
        typeof parsed.uploadSessionId === "string" && parsed.uploadSessionId
          ? parsed.uploadSessionId
          : String(Date.now()),
      personal: { ...fallback.personal, ...parsed.personal },
      qualification: { ...fallback.qualification, ...parsed.qualification },
      about: { ...fallback.about, ...parsed.about },
      references: mergeReferences(parsed.references),
      identification: mergeIdentification(parsed.identification),
    };
  } catch {
    return null;
  }
}

export function saveRecruiterApplicationDraft(draft: RecruiterApplicationDraft) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(RECRUITER_APPLICATION_STORAGE_KEY, JSON.stringify(draft));
  } catch {
    // Quota or private mode — keep the in-memory draft only.
    try {
      const withoutHeavyImages: RecruiterApplicationDraft = {
        ...draft,
        identification: {
          ...draft.identification,
          profilePhoto: "",
          aadharFront: "",
          aadharBack: "",
          panFront: "",
          panBack: "",
        },
      };
      window.localStorage.setItem(RECRUITER_APPLICATION_STORAGE_KEY, JSON.stringify(withoutHeavyImages));
    } catch {
      // Ignore persistence failures.
    }
  }
}

export function clearRecruiterApplicationDraft() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(RECRUITER_APPLICATION_STORAGE_KEY);
  } catch {
    // Ignore.
  }
}

function mergeReferences(value: Partial<ReferencePerson>[] | undefined): ReferencePerson[] {
  const fallback = emptyReferences();
  if (!Array.isArray(value) || value.length === 0) return fallback;
  return [0, 1, 2].map((index) => ({
    ...fallback[index],
    ...value[index],
  }));
}

function mergeIdentification(
  value: Partial<IdentificationDetails> | undefined,
): IdentificationDetails {
  const fallback = emptyIdentificationDetails();
  if (!value) return fallback;
  const members = Array.isArray(value.familyMembers) && value.familyMembers.length
    ? value.familyMembers.map((member) => ({
        ...fallback.familyMembers[0],
        ...member,
        dependent:
          member.dependent === true || member.dependent === false ? member.dependent : null,
      }))
    : fallback.familyMembers;

  return {
    ...fallback,
    ...value,
    familyMembers: members,
  };
}
