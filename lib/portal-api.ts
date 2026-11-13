const PRODUCTION_PORTAL_API = "https://portal-bd-prod.earlyjobs.ai/api";

/** Portal API origin, including `/api`. Set `NEXT_PUBLIC_BACKEND_URL_2_0` to point the site at another server. */
export function portalApiBase() {
  const configured = process.env.NEXT_PUBLIC_BACKEND_URL_2_0?.trim().replace(/\/$/, "");
  return configured || PRODUCTION_PORTAL_API;
}

export function portalApiUrl(path: string) {
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${portalApiBase()}${suffix}`;
}
