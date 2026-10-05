"use client";

export type UploadFolder = "profile" | "aadhar" | "pan";

export async function uploadRecruiterDocument(file: File, folderPath: string) {
  const body = new FormData();
  body.append("file", file);
  body.append("folderPath", folderPath);

  const response = await fetch("/api/recruiter/upload", {
    method: "POST",
    body,
  });

  const payload = (await response.json().catch(() => ({}))) as {
    message?: string;
    data?: { fileUrl?: string };
  };

  if (!response.ok) {
    throw new Error(payload.message || "Failed to upload file");
  }

  const fileUrl = payload.data?.fileUrl;
  if (!fileUrl) {
    throw new Error("Upload succeeded but no file URL was returned");
  }

  return fileUrl;
}

export function recruiterUploadFolderPath(email: string, sessionId: string, folder: UploadFolder) {
  const slug = (email.trim() || "anonymous").replace(/[^a-zA-Z0-9]/g, "_");
  return `anonymous/applications/${slug}_${sessionId}/${folder}`;
}
