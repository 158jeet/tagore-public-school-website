import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
 const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.tpsgudhagorji.com";
 return ["", "/about", "/admissions", "/parent-guide", "/admissions/faq", "/admissions/parent-checklist", "/admissions/pathways", "/admissions/pathways/early-years", "/admissions/pathways/primary", "/admissions/pathways/middle", "/admissions/pathways/secondary", "/admissions/pathways/senior-secondary", "/visit"].map((path) => ({url: base + path, changeFrequency: "monthly", priority: path === "" ? 1 : 0.75}));
}
