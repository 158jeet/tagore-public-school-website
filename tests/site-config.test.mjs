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

for (const [app, path, recoveryLinks] of [
  ["TPS", "../src/app/error.tsx", ["/", "/admissions"]],
  ["TIER", "../apps/tier/src/app/error.tsx", ["/", "/institutions", "/contact"]],
]) {
  test(app + ": branded route error boundary provides retry and safe recovery without leaking exception details", async () => {
    const source = await readFile(new URL(path, import.meta.url), "utf8");
    assert.ok(source.includes('"use client"'), app + " error boundary must be a client component");
    assert.ok(source.includes("reset: () => void"), app + " error boundary must accept Next.js reset");
    assert.ok(source.includes("onClick={() => reset()}"), app + " error boundary must expose a working retry action");
    assert.ok(source.includes("TEMPORARY SERVICE ISSUE"), app + " error boundary must show a visitor-safe status");
    for (const href of recoveryLinks) {
      assert.ok(source.includes('href="' + href + '"'), app + " error boundary is missing recovery link " + href);
    }
    assert.ok(!source.includes("error.message"), app + " must not display raw exception messages");
    assert.ok(!source.includes("error.stack"), app + " must not display stack traces");
  });
}


for (const [app, path, brand] of [
  ["TPS", "../src/app/global-error.tsx", "TAGORE PUBLIC SCHOOL"],
  ["TIER", "../apps/tier/src/app/global-error.tsx", "TAGORE GROUP"],
]) {
  test(app + ": root-layout global error fallback is self-contained and safe", async () => {
    const source = await readFile(new URL(path, import.meta.url), "utf8");
    assert.ok(source.includes('"use client"'), app + " global error must be a client component");
    assert.ok(source.includes('<html lang="en">'), app + " global error must provide the document root");
    assert.ok(source.includes("<body"), app + " global error must provide the document body");
    assert.ok(source.includes("reset: () => void"), app + " global error must accept the retry callback");
    assert.ok(source.includes("onClick={() => reset()}"), app + " global error must provide retry");
    assert.ok(source.includes(brand), app + " global error must identify the site");
    assert.ok(source.includes('href="/"'), app + " global error must provide a homepage recovery link");
    assert.ok(!source.includes("error.message"), app + " must not expose exception messages");
    assert.ok(!source.includes("error.stack"), app + " must not expose stack traces");
    assert.ok(!source.includes("globals.css"), app + " global error must not depend on root-layout CSS");
  });
}
