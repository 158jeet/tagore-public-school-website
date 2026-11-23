import type { MetadataRoute } from "next";
export default function sitemap():MetadataRoute.Sitemap {
 const base="https://www.tieredu.org";
 const paths=["","/about","/campus","/institutions","/choose","/start","/help","/contact","/connect","/partnerships","/institutions/tagore-bal-niketan","/institutions/tagore-smart-school","/institutions/tagore-vedant-academy","/institutions/tagore-pg-college","/institutions/tagore-hostel"];
 return paths.map(path=>({url:base+path,changeFrequency:"monthly",priority:path===""?1:path==="/institutions"||path==="/campus"?0.9:0.7}));
}