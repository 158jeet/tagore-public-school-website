import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { auditLegacyMedia } from "../scripts/audit-legacy-media.mjs";

const manifest = JSON.parse(fs.readFileSync(new URL("../docs/content/legacy-media-manifest.json", import.meta.url), "utf8"));

test("legacy media manifest has unique, secure, described assets", () => {
  const report = auditLegacyMedia(manifest);
  assert.deepEqual(report.errors, []);
  assert.ok(report.totals.assets > 0);
  assert.equal(report.totals.assets, report.totals.tps + report.totals.tier);
});

test("identifiable student and child photos are explicitly gated for consent", () => {
  const report = auditLegacyMedia(manifest);
  assert.ok(report.totals.peopleConsentRequired > 0);
  assert.ok(report.records.every((item) => item.approval === "pending"));
});

test("the audit rejects duplicate IDs and insecure URLs", () => {
  const broken = {
    tps: [{ id: "same", src: "http://example.com/a.jpg", alt: "Campus", consentReview: "rights review" }],
    tier: [{ id: "same", src: "https://example.com/b.jpg", alt: "Campus", consentReview: "rights review" }],
  };
  const report = auditLegacyMedia(broken);
  assert.ok(report.errors.some((error) => error.includes("duplicate")));
  assert.ok(report.errors.some((error) => error.includes("HTTPS")));
});
