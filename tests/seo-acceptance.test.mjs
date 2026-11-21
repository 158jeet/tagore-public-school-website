import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
const read = (path) => readFile(new URL(path, import.meta.url), "utf8");
const routes = [
 ["TPS home","../src/app/layout.tsx","/"],
 ["TPS admissions","../src/app/admissions/page.tsx","/admissions"],
 ["TPS parent guide","../src/app/parent-guide/page.tsx","/parent-guide"],
 ["TPS admissions FAQ","../src/app/admissions/faq/page.tsx","/admissions/faq"],
 ["TPS visit","../src/app/visit/page.tsx","/visit"],
 ["TIER home","../apps/tier/src/app/layout.tsx","/"],
 ["TIER institutions","../apps/tier/src/app/institutions/page.tsx","/institutions"],
 ["TIER pathway guide","../apps/tier/src/app/choose/page.tsx","/choose"]
];
for (const [label,path,canonical] of routes) {
 test(label+": declares title, description and canonical identity",async()=>{
  const source=await read(path);
  assert.ok(source.includes("title:"),label+" missing title");
  assert.ok(source.includes("description:"),label+" missing description");
  assert.ok(source.includes('canonical: "'+canonical+'"')||source.includes('canonical:"'+canonical+'"'),label+" missing canonical "+canonical);
 });
}
test("both root layouts keep indexing disabled until explicitly enabled",async()=>{
 for(const path of ["../src/app/layout.tsx","../apps/tier/src/app/layout.tsx"]){
  const source=await read(path);
  assert.ok(source.includes('process.env.SITE_INDEXING_ENABLED === "true"'));
  assert.ok(source.includes("robots: { index: indexingEnabled, follow: indexingEnabled }"));
 }
});
test("both root layouts safely escape JSON-LD before script insertion",async()=>{
 for(const path of ["../src/app/layout.tsx","../apps/tier/src/app/layout.tsx"]){
  const source=await read(path);
  assert.ok(source.includes("application/ld+json"));
  assert.ok(source.includes("JSON.stringify("));
  assert.ok(source.includes(".replace(/</g"));
  assert.ok(source.includes("u003c"));
 }
});
test("institution profile metadata is generated from its profile record",async()=>{
 const source=await read("../apps/tier/src/app/institutions/[slug]/page.tsx");
 assert.ok(source.includes("generateMetadata"));
 assert.ok(source.includes("canonical:"));
 assert.ok(source.includes("/institutions/"));
 assert.ok(source.includes("profiles[slug]?.summary"));
});
test("robots and sitemaps preserve separate TPS and TIER domains",async()=>{
 const [tpsRobots,tierRobots,tpsMap,tierMap]=await Promise.all([read("../src/app/robots.ts"),read("../apps/tier/src/app/robots.ts"),read("../src/app/sitemap.ts"),read("../apps/tier/src/app/sitemap.ts")]);
 assert.ok(tpsRobots.includes("www.tpsgudhagorji.com"));
 assert.ok(tierRobots.includes("www.tieredu.org"));
 assert.ok(tpsMap.includes("www.tpsgudhagorji.com"));
 assert.ok(tierMap.includes("www.tieredu.org"));
 assert.ok(!tpsMap.includes("www.tieredu.org"));
 assert.ok(!tierMap.includes("www.tpsgudhagorji.com"));
});
test("noindex campaign pages remain excluded from XML sitemap route lists",async()=>{
 const [tpsMap,tierMap]=await Promise.all([read("../src/app/sitemap.ts"),read("../apps/tier/src/app/sitemap.ts")]);
 for(const path of ["/admissions/funnel","/visit/guide","/hostel/guide"])assert.ok(!tpsMap.includes('"'+path+'"'));
 for(const path of ["/connect","/partnerships"])assert.ok(!tierMap.includes('"'+path+'"'));
});
