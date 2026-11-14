import { createHash } from "crypto";

function pathPart(value: string, fallback: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || fallback;
}

/** Opaque 8-char id for /jobs/{title}-{shortId} (e.g. x0riu6ee). */
export function jobShortId(jobId: string) {
  return createHash("sha256")
    .update(`earlyjobs:${jobId}`)
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/[^a-z0-9]/gi, "")
    .toLowerCase()
    .slice(0, 8);
}

export function jobSlug(job: { title: string; jobId: string }) {
  return `${pathPart(job.title, "job")}-${jobShortId(job.jobId)}`;
}

export function jobHref(job: { title: string; jobId: string }) {
  return `/jobs/${jobSlug(job)}`;
}

/** Extract the short id / legacy token from a /jobs/{title}-{id} slug. */
export function parseJobShortId(slug: string) {
  const value = slug.trim();
  // Brief period used full 24-hex ObjectIds in the path
  const hex = value.match(/-([a-f0-9]{24})$/i);
  if (hex) return hex[1].toLowerCase();
  const ej = value.match(/-(ej[A-Za-z0-9]+)$/i);
  if (ej) return ej[1];
  // Current format: opaque 8-char short id. Must win over the 16-char token —
  // e.g. "account-manager-sjqbtjy9" otherwise matches "manager-sjqbtjy9".
  const short = value.toLowerCase().match(/-([a-z0-9]{8})$/);
  if (short) return short[1];
  // Brief period used 16-char base64url ObjectId tokens
  const token = value.match(/-([A-Za-z0-9_-]{16})$/);
  if (token) return token[1];
  return null;
}

/** Expand reversible path tokens (not the opaque 8-char hash) back to a public job id. */
export function expandJobShortId(shortId: string): string | null {
  if (/^[a-f0-9]{24}$/i.test(shortId)) return shortId.toLowerCase();
  if (/^ej[A-Za-z0-9]+$/i.test(shortId)) return shortId;
  if (/^[A-Za-z0-9_-]{16}$/.test(shortId)) {
    try {
      const hex = Buffer.from(shortId, "base64url").toString("hex");
      return /^[a-f0-9]{24}$/.test(hex) ? hex : null;
    } catch {
      return null;
    }
  }
  return null;
}

export function isPublicJobId(jobId: string) {
  return /^ej[A-Za-z0-9]+$/.test(jobId) || /^[a-f0-9]{24}$/i.test(jobId);
}
