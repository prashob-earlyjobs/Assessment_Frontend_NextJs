import type { MetadataRoute } from "next";
import { headers } from "next/headers";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const headerList = await headers();
  const host = (headerList.get("x-forwarded-host") ?? headerList.get("host") ?? "").split(",")[0].trim();
  const isDevHost =
    host === "dev.earlyjobs.ai" ||
    host.startsWith("localhost") ||
    host.startsWith("127.0.0.1");

  if (isDevHost) {
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
    },
    sitemap: "https://www.earlyjobs.ai/sitemap.xml",
  };
}
