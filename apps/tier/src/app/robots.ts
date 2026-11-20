import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const indexingEnabled = process.env.SITE_INDEXING_ENABLED === "true";
  return {
    rules: indexingEnabled ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" },
    sitemap: "https://www.tieredu.org/sitemap.xml",
    host: "https://www.tieredu.org",
  };
}
