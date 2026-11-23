import { readFile } from "node:fs/promises";

const ALLOWED_STATUSES = new Set(["draft", "evidence-needed", "review-pending", "approved", "expired", "rejected", "withdrawn"]);
const APPROVAL_FIELDS = ["sourceTitle", "sourceRef", "sourceAuthority", "evidenceExcerpt", "owner", "approver", "lastVerified", "nextReviewDue"];

function isDate(value) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
}

export function validateRegister(document, today = new Date().toISOString().slice(0, 10)) {
  const errors = [];
  if (!document || typeof document !== "object" || !Array.isArray(document.records)) {
    return ["Register must be an object containing a records array."];
  }
  if (!isDate(today)) return ["Validation reference date must be YYYY-MM-DD."];
  const seen = new Set();
  for (const [index, record] of document.records.entries()) {
    const prefix = `records[${index}]`;
    if (!record || typeof record !== "object" || Array.isArray(record)) {
      errors.push(`${prefix} must be an object.`);
      continue;
    }
    for (const field of ["claimId", "site", "claim", "status"]) {
      if (typeof record[field] !== "string" || !record[field].trim()) errors.push(`${prefix}.${field} is required.`);
    }
    if (record.claimId) {
      if (seen.has(record.claimId)) errors.push(`${prefix}.claimId duplicates ${record.claimId}.`);
      seen.add(record.claimId);
    }
    if (!ALLOWED_STATUSES.has(record.status)) errors.push(`${prefix}.status is not an allowed status.`);
    for (const field of ["lastVerified", "nextReviewDue", "sourceDate"]) {
      if (record[field] != null && record[field] !== "" && !isDate(record[field])) errors.push(`${prefix}.${field} must be a real YYYY-MM-DD date.`);
    }
    if (record.lastVerified && record.nextReviewDue && isDate(record.lastVerified) && isDate(record.nextReviewDue) && record.nextReviewDue < record.lastVerified) {
      errors.push(`${prefix}.nextReviewDue cannot precede lastVerified.`);
    }
    if (record.status === "approved") {
      for (const field of APPROVAL_FIELDS) {
        if (typeof record[field] !== "string" || !record[field].trim()) errors.push(`${prefix}.${field} is required for approved claims.`);
      }
      if (!Array.isArray(record.publicationLocations) || record.publicationLocations.length === 0 || record.publicationLocations.some((v) => typeof v !== "string" || !v.trim())) {
        errors.push(`${prefix}.publicationLocations must contain at least one route or document location for approved claims.`);
      }
      if (isDate(record.nextReviewDue) && record.nextReviewDue < today) errors.push(`${prefix} is overdue; approved claims cannot pass the publication gate.`);
      if (isDate(record.lastVerified) && record.lastVerified > today) errors.push(`${prefix}.lastVerified cannot be in the future.`);
    }
  }
  return errors;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const path = process.argv[2] ?? "docs/content/content-evidence-register.json";
  const document = JSON.parse(await readFile(path, "utf8"));
  const errors = validateRegister(document);
  if (errors.length) {
    for (const error of errors) process.stderr.write(`ERROR: ${error}\n`);
    process.exitCode = 1;
  } else {
    process.stdout.write(`Content evidence register valid: ${document.records.length} record(s); approval gate enforced.\n`);
  }
}
