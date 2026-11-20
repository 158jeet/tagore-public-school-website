import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.tpsgudhagorji.com";
  const indexingEnabled = process.env.SITE_INDEXING_ENABLED === "true";
  return {
    rules: indexingEnabled ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" },
    sitemap: base + "/sitemap.xml",
  };
}
