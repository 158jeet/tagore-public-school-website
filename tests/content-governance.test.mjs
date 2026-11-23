import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { validateRegister } from "../scripts/content-governance.mjs";

const today = "2026-11-23";
const approved = {
  claimId: "TPS-TEST-001", site: "TPS", claim: "Verified sample claim", status: "approved",
  sourceTitle: "Signed approved record", sourceRef: "internal://controlled-record/1",
  sourceAuthority: "Authorised records owner", evidenceExcerpt: "Exact supporting section",
  owner: "Admissions owner", approver: "Management reviewer",
  lastVerified: "2026-11-20", nextReviewDue: "2026-12-20",
  publicationLocations: ["/admissions"], changeHistory: []
};

test("starter register contains no pre-approved claims and passes structural validation", async () => {
  const source = JSON.parse(await readFile(new URL("../docs/content/content-evidence-register.json", import.meta.url), "utf8"));
  assert.ok(source.records.length >= 1);
  assert.ok(source.records.every((record) => record.status !== "approved"));
  assert.deepEqual(validateRegister(source, today), []);
});

test("a complete, current approved claim passes the publication gate", () => {
  assert.deepEqual(validateRegister({ records: [approved] }, today), []);
});

test("approved claims fail when evidence, owner, approver or publication location is missing", () => {
  const invalid = { ...approved, sourceRef: "", owner: "", approver: "", publicationLocations: [] };
  const errors = validateRegister({ records: [invalid] }, today);
  assert.ok(errors.some((error) => error.includes("sourceRef")));
  assert.ok(errors.some((error) => error.includes("owner")));
  assert.ok(errors.some((error) => error.includes("approver")));
  assert.ok(errors.some((error) => error.includes("publicationLocations")));
});

test("expired approvals and impossible date ordering fail", () => {
  const invalid = { ...approved, nextReviewDue: "2026-11-22", lastVerified: "2026-11-25" };
  const errors = validateRegister({ records: [invalid] }, today);
  assert.ok(errors.some((error) => error.includes("overdue")));
  assert.ok(errors.some((error) => error.includes("cannot precede")));
  assert.ok(errors.some((error) => error.includes("cannot be in the future")));
});

test("unknown status, malformed dates and duplicate claim IDs fail", () => {
  const a = { claimId: "DUP", site: "TPS", claim: "A", status: "published", lastVerified: "not-a-date" };
  const b = { claimId: "DUP", site: "TPS", claim: "B", status: "draft" };
  const errors = validateRegister({ records: [a, b] }, today);
  assert.ok(errors.some((error) => error.includes("not an allowed status")));
  assert.ok(errors.some((error) => error.includes("real YYYY-MM-DD date")));
  assert.ok(errors.some((error) => error.includes("duplicates")));
});

test("audited live-claim inventory remains unapproved and maps each claim to a page", async () => {
  const source = JSON.parse(await readFile(new URL("../docs/content/content-evidence-register.json", import.meta.url), "utf8"));
  const audited = source.records.filter((record) => record.claimId !== "TPS-AFF-001" && record.claimId !== "TPS-CON-001" && record.claimId !== "TIER-INS-001");
  assert.ok(audited.length >= 10);
  assert.ok(audited.every((record) => record.status === "evidence-needed"));
  assert.ok(audited.every((record) => record.owner === null && record.approver === null));
  assert.ok(audited.every((record) => record.publicationLocations.length > 0));
});
