function teamsEndpoint() {
  const configured = process.env.NEXT_PUBLIC_BACKEND_URL_2_0?.replace(/\/$/, "");
  if (configured) return `${configured}/teams`;
  return "https://portal-bd-prod.earlyjobs.ai/api/teams";
}

export type TeamMember = {
  id: string;
  name: string;
  designation: string;
  imageUrl: string;
  linkedInUrl?: string;
  biography: string;
  position: number;
};

type RawMember = {
  _id?: string;
  name?: string;
  designation?: string;
  linkedinUrl?: string;
  description?: string;
  photoUrl?: string;
  position?: number;
};

type TeamsResponse = {
  success?: boolean;
  data?: {
    members?: RawMember[];
  };
};

function normalizeMembers(raw: RawMember[] | undefined): TeamMember[] {
  return (raw ?? [])
    .map((member): TeamMember | null => {
      const name = member.name?.trim() ?? "";
      if (!name) return null;
      const linkedInUrl = member.linkedinUrl?.trim();
      return {
        id: member._id || name,
        name,
        designation: member.designation?.trim() ?? "",
        imageUrl: member.photoUrl?.trim() ?? "",
        linkedInUrl: linkedInUrl || undefined,
        biography: member.description?.trim() ?? "",
        position: member.position ?? Number.MAX_SAFE_INTEGER,
      };
    })
    .filter((member): member is TeamMember => Boolean(member))
    .sort((a, b) => a.position - b.position);
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const response = await fetch(teamsEndpoint(), {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!response.ok) return [];
    const payload = (await response.json()) as TeamsResponse;
    return normalizeMembers(payload.data?.members);
  } catch {
    return [];
  }
}
