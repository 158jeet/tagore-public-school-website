import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const files = [
  ["TPS", new URL("../next.config.ts", import.meta.url)],
  ["TIER", new URL("../apps/tier/next.config.ts", import.meta.url)],
];

for (const [app, url] of files) {
  test(app + ": retains baseline browser security headers", async () => {
    const source = await readFile(url, "utf8");
    for (const header of [
      "X-Content-Type-Options",
      "X-Frame-Options",
      "Referrer-Policy",
      "Permissions-Policy",
      "Strict-Transport-Security",
      "Content-Security-Policy-Report-Only",
    ]) assert.ok(source.includes(header), app + " is missing " + header);
    assert.ok(source.includes("poweredByHeader: false"), app + " must suppress the X-Powered-By header");
    assert.ok(!source.includes("Content-Security-Policy\""), app + " must not silently enforce an unreviewed CSP");
  });
}

test("TPS and TIER publish independent canonical sitemap hosts", async () => {
  const tps = await readFile(new URL("../src/app/sitemap.ts", import.meta.url), "utf8");
  const tier = await readFile(new URL("../apps/tier/src/app/sitemap.ts", import.meta.url), "utf8");
  assert.ok(tps.includes("www.tpsgudhagorji.com"));
  assert.ok(tier.includes("www.tieredu.org"));
  assert.ok(!tps.includes("www.tieredu.org"));
  assert.ok(!tier.includes("www.tpsgudhagorji.com"));
});

for (const [app, paths] of [
  ["TPS", ["../src/app/robots.ts", "../src/app/layout.tsx"]],
  ["TIER", ["../apps/tier/src/app/robots.ts", "../apps/tier/src/app/layout.tsx"]],
]) {
  test(app + ": indexing is opt-in for staging safety", async () => {
    const [robots, layout] = await Promise.all(paths.map((path) => readFile(new URL(path, import.meta.url), "utf8")));
    assert.ok(robots.includes('process.env.SITE_INDEXING_ENABLED === "true"'));
    assert.ok(robots.includes('disallow: "/"'));
    assert.ok(robots.includes('allow: "/"'));
    assert.ok(layout.includes("robots: { index: indexingEnabled, follow: indexingEnabled }"));
  });
}


test("sitemaps include useful indexable guides and exclude noindex campaign routes", async () => {
  const [tpsMap, tierMap, tpsChecklist, tpsFunnel, tpsVisitGuide, tpsHostelGuide, tierChoose, tierConnect, tierPartnerships] = await Promise.all([
    readFile(new URL("../src/app/sitemap.ts", import.meta.url), "utf8"),
    readFile(new URL("../apps/tier/src/app/sitemap.ts", import.meta.url), "utf8"),
    readFile(new URL("../src/app/admissions/parent-checklist/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../src/app/admissions/funnel/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../src/app/visit/guide/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../src/app/hostel/guide/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../apps/tier/src/app/choose/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../apps/tier/src/app/connect/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../apps/tier/src/app/partnerships/page.tsx", import.meta.url), "utf8"),
  ]);

  assert.ok(tpsMap.includes('"/admissions/parent-checklist"'), "TPS parent checklist should be discoverable");
  assert.ok(tierMap.includes('"/choose"'), "TIER pathway guide should be discoverable");
  assert.ok(!tpsMap.includes('"/admissions/funnel"'), "noindex campaign funnel must stay out of sitemap");
  assert.ok(!tpsMap.includes('"/visit/guide"'), "noindex visit guide must stay out of sitemap");
  assert.ok(!tpsMap.includes('"/hostel/guide"'), "noindex hostel guide must stay out of sitemap");
  assert.ok(!tierMap.includes('"/connect"'), "noindex segmented connect page must stay out of sitemap");
  assert.ok(!tierMap.includes('"/partnerships"'), "noindex partnership page must stay out of sitemap");

  assert.ok(!tpsChecklist.includes("robots: { index: false"), "parent checklist is intended to be indexable");
  assert.ok(tierChoose.includes('canonical: "/choose"'), "TIER pathway guide must declare its canonical URL");
  for (const [label, source] of [["TPS funnel", tpsFunnel], ["TPS visit guide", tpsVisitGuide], ["TPS hostel guide", tpsHostelGuide], ["TIER connect", tierConnect], ["TIER partnerships", tierPartnerships]]) {
    assert.ok(source.includes("robots: { index: false"), label + " must remain noindex");
  }
});
