import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
 const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.tpsgudhagorji.com";
 return ["", "/about", "/admissions", "/parent-guide", "/admissions/faq", "/admissions/parent-checklist", "/visit"].map((path) => ({url: base + path, changeFrequency: "monthly", priority: path === "" ? 1 : 0.75}));
}
