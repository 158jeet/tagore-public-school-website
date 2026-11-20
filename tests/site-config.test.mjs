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
