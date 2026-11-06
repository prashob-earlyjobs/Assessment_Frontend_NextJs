import type { MetadataRoute } from "next";
import { headers } from "next/headers";

function hostname(headerList: Headers) {
  const raw = (headerList.get("x-forwarded-host") ?? headerList.get("host") ?? "").split(",")[0].trim();
  return raw.replace(/:\d+$/, "").toLowerCase();
}

export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = hostname(await headers());
  const production = host === "www.earlyjobs.ai" || host === "earlyjobs.ai";

  if (!production) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: "https://www.earlyjobs.ai/sitemap.xml",
  };
}
