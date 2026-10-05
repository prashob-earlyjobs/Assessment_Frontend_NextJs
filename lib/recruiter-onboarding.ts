import type {
  AboutDetails,
  IdentificationDetails,
  PersonalDetails,
  QualificationDetails,
  ReferencePerson,
} from "@/components/become-a-recruiter/form-shared";

const ONBOARDING_ENDPOINT =
  "https://portal-bd-prod.earlyjobs.ai/api/recruiter/create-onboarding";

const onboardingHeaders = {
  Referer: "https://www.earlyjobs.ai/",
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36",
  "sec-ch-ua": '"Chromium";v="154", "Google Chrome";v="154", "Not_A Brand";v="99"',
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": '"macOS"',
  "Content-Type": "application/json",
};

const genderLabels: Record<string, string> = {
  male: "Male",
  female: "Female",
  other: "Other",
};

export type RecruiterOnboardingInput = {
  personal: PersonalDetails;
  qualification: QualificationDetails;
  about: AboutDetails;
  references: ReferencePerson[];
  identification: IdentificationDetails;
};

function genderLabel(value: string) {
  return genderLabels[value] ?? value;
}

function permanentAddress(personal: PersonalDetails) {
  return personal.sameAsCurrent ? personal.current : personal.permanent;
}

export function buildRecruiterOnboardingPayload(input: RecruiterOnboardingInput) {
  const permanent = permanentAddress(input.personal);

  return {
    updatedDateTime: new Date().toISOString(),
    personalDetails: {
      recruiterType: input.personal.role,
      fullName: input.personal.fullName.trim(),
      email: input.personal.email.trim(),
      role: "applicant",
      phone: input.personal.phone.trim(),
      wtspNum: input.personal.whatsapp.trim(),
      gender: genderLabel(input.personal.gender),
      dob: input.personal.dateOfBirth,
      applyFor: "hm",
      currBuildingNo: input.personal.current.building.trim(),
      currStreet: input.personal.current.street.trim(),
      currArea: input.personal.current.area.trim(),
      currCity: input.personal.current.city.trim(),
      currState: input.personal.current.state.trim(),
      currPin: input.personal.current.pincode.trim(),
      permBuildingNo: permanent.building.trim(),
      permStreet: permanent.street.trim(),
      permArea: permanent.area.trim(),
      permCity: permanent.city.trim(),
      permState: permanent.state.trim(),
      permPin: permanent.pincode.trim(),
      languages: input.personal.languages,
    },
    qualification: {
      highestQualification: input.qualification.highestQualification,
      workExperience: input.qualification.workExperience.map((entry) => ({
        CompanyName: entry.company.trim(),
        ExperienceYears: entry.experienceYears.trim(),
      })),
    },
    about: {
      questions: [
        { question: "Tell about yourself", answer: input.about.tellAboutYourself.trim() },
        { question: "Why do you want to join HR?", answer: input.about.whyJoinHR.trim() },
        { question: "How will you contribute?", answer: input.about.howContribute.trim() },
        {
          question: "How many hours can you contribute?",
          answer: input.about.hoursContribute.trim(),
        },
      ],
    },
    familyMembers: Object.fromEntries(
      input.identification.familyMembers.map((member, index) => [
        `member${index + 1}`,
        {
          name: member.name.trim(),
          age: member.age.trim(),
          relationship: member.relationship.trim(),
          organization: member.occupation.trim(),
          dependentOnYou: member.dependent ? "yes" : "no",
        },
      ]),
    ),
    newIdentityProof: {
      aadharFront: input.identification.aadharFront,
      aadharBack: input.identification.aadharBack,
      aadharNumber: input.identification.aadharNumber.trim(),
      panFront: input.identification.panFront,
      panBack: input.identification.panBack,
      panNumber: input.identification.panNumber.trim().toUpperCase(),
      emergencyNumber: input.identification.emergencyContact.trim(),
      photo: input.identification.profilePhoto,
    },
    references: Object.fromEntries(
      input.references.slice(0, 3).map((person, index) => [
        `person${index + 1}`,
        {
          name: person.name.trim(),
          designation: person.designation.trim(),
          organization: person.organization.trim(),
          email: person.email.trim(),
          phone: person.contactNumber.trim(),
          connection: person.howTheyKnow.trim(),
        },
      ]),
    ),
  };
}

export async function createRecruiterOnboarding(payload: ReturnType<typeof buildRecruiterOnboardingPayload>) {
  const response = await fetch(ONBOARDING_ENDPOINT, {
    method: "POST",
    headers: onboardingHeaders,
    body: JSON.stringify(payload),
  });

  const raw = await response.text();
  let body: { message?: string; status?: string; data?: unknown } = {};
  try {
    body = raw ? (JSON.parse(raw) as typeof body) : {};
  } catch {
    body = { message: raw.slice(0, 240) || undefined };
  }

  if (!response.ok) {
    throw new Error(body.message || `HTTP ${response.status}: Failed to submit application`);
  }

  return body;
}
