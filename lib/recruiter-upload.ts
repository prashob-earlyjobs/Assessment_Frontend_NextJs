const UPLOAD_ENDPOINT = "https://portal-bd-prod.earlyjobs.ai/api/publicCom/file";

const uploadHeaders = {
  Referer: "https://www.earlyjobs.ai/",
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36",
  "sec-ch-ua": '"Chromium";v="154", "Google Chrome";v="154", "Not_A Brand";v="99"',
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": '"macOS"',
};

export type UploadedFile = {
  fileUrl: string;
  [key: string]: unknown;
};

export function sanitizeEmailForPath(email: string) {
  const value = email.trim() || "anonymous";
  return value.replace(/[^a-zA-Z0-9]/g, "_");
}

export function applicationFolderPath(email: string, sessionId: string, folder: string) {
  return `anonymous/applications/${sanitizeEmailForPath(email)}_${sessionId}/${folder}`;
}

export async function uploadPublicFile(file: File, folderPath: string): Promise<UploadedFile> {
  const bytes = Buffer.from(await file.arrayBuffer());
  const filename = file.name?.trim() || "upload.jpg";
  const blob = new Blob([bytes], { type: file.type || "image/jpeg" });

  const body = new FormData();
  body.append("file", blob, filename);
  body.append("folderPath", folderPath);

  const response = await fetch(UPLOAD_ENDPOINT, {
    method: "POST",
    headers: uploadHeaders,
    body,
  });

  const raw = await response.text();
  let payload: { message?: string; data?: UploadedFile; status?: string } = {};
  try {
    payload = raw ? (JSON.parse(raw) as typeof payload) : {};
  } catch {
    payload = { message: raw.slice(0, 200) || undefined };
  }

  if (!response.ok) {
    if (response.status === 413) {
      throw new Error("File is too large for the upload server. Use an image under 1 MB.");
    }
    throw new Error(
      payload.message || `HTTP ${response.status}: Failed to upload file`,
    );
  }

  if (!payload.data?.fileUrl) {
    throw new Error("Upload succeeded but no file URL was returned");
  }

  return payload.data;
}
