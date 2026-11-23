import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = path.join(root, "docs/content/legacy-media-manifest.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

export function auditLegacyMedia(data) {
  const errors = [];
  const records = [];
  const ids = new Set();

  for (const group of ["tps", "tier"]) {
    for (const item of data[group] ?? []) {
      if (!item.id || ids.has(item.id)) errors.push(`Missing or duplicate media id: ${item.id ?? "(empty)"}`);
      ids.add(item.id);
      let parsed;
      try { parsed = new URL(item.src); } catch { errors.push(`${item.id}: invalid source URL`); }
      if (parsed && parsed.protocol !== "https:") errors.push(`${item.id}: source must use HTTPS`);
      if (!item.alt?.trim()) errors.push(`${item.id}: missing descriptive alt text`);
      if (!item.consentReview?.trim()) errors.push(`${item.id}: missing rights/consent review note`);

      const review = (item.consentReview ?? "").toLowerCase();
      const requiresPeopleConsent = /identifiable (children|students|persons)|written consent required/.test(review);
      records.push({
        id: item.id,
        group,
        sourceHost: parsed?.hostname ?? "invalid",
        peopleConsentRequired: requiresPeopleConsent,
        approval: "pending",
      });
    }
  }

  return {
    errors,
    records,
    totals: {
      assets: records.length,
      tps: records.filter((item) => item.group === "tps").length,
      tier: records.filter((item) => item.group === "tier").length,
      peopleConsentRequired: records.filter((item) => item.peopleConsentRequired).length,
      awaitingApproval: records.length,
    },
  };
}

const report = auditLegacyMedia(manifest);
console.log("Legacy media governance audit");
console.log(JSON.stringify(report.totals, null, 2));
for (const item of report.records) {
  const gate = item.peopleConsentRequired ? "PEOPLE-CONSENT REQUIRED" : "RIGHTS/CURRENTNESS REVIEW";
  console.log(`- [PENDING] ${item.group}/${item.id}: ${gate} (${item.sourceHost})`);
}
for (const error of report.errors) console.error(`ERROR: ${error}`);

if (report.errors.length) process.exitCode = 1;
if (process.argv.includes("--strict-production") && report.totals.awaitingApproval > 0) {
  console.error("Production gate failed: every asset requires documented approval before local migration.");
  process.exitCode = 1;
}
