import type { MetadataRoute } from "next";
export default function sitemap():MetadataRoute.Sitemap {
 const base="https://www.tieredu.org";
 return ["","/about","/institutions","/contact","/institutions/tagore-bal-niketan","/institutions/tagore-smart-school","/institutions/tagore-vedant-academy","/institutions/tagore-pg-college","/institutions/tagore-hostel"].map(path=>({url:base+path,lastModified:new Date(),changeFrequency:"monthly",priority:path===""?1:path==="/institutions"?0.9:0.7}));
}