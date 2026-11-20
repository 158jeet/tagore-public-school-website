import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(path, import.meta.url), "utf8");

test("TPS admission form fields are accepted by the TPS API", async () => {
  const [form, api] = await Promise.all([
    read("../src/components/enquiry-form.tsx"),
    read("../src/app/api/enquiry/route.ts"),
  ]);
  for (const field of ["parent_name", "mobile", "email", "class", "enquiry_topic", "contact_consent", "form_started_at", "website"]) {
    assert.ok(form.includes(`name="${field}"`), `TPS form is missing ${field}`);
  }
  for (const field of ["parent_name", "mobile", "email", "class", "enquiry_topic", "contact_consent", "form_started_at", "website"]) {
    assert.ok(api.includes(`data.${field}`) || api.includes(`data["${field}"]`) || api.includes(`data['${field}']`), `TPS API does not validate/use ${field}`);
  }
  assert.ok(form.includes('fetch("/api/enquiry"'));
});

test("TPS campus visit form supplies the visit-specific API fields", async () => {
  const [form, api] = await Promise.all([
    read("../src/components/visit-request-form.tsx"),
    read("../src/app/api/enquiry/route.ts"),
  ]);
  for (const field of ["preferred_date", "preferred_time", "contact_consent", "form_started_at", "website"]) {
    assert.ok(form.includes(`name="${field}"`), `Visit form is missing ${field}`);
  }
  assert.ok(form.includes('data.enquiry_type="campus_visit"'));
  assert.ok(api.includes('data.enquiry_type === "campus_visit"'));
  assert.ok(api.includes('data.preferred_date'));
  assert.ok(api.includes('data.preferred_time'));
});

test("TIER group enquiry form fields are accepted by the TIER API", async () => {
  const [form, api] = await Promise.all([
    read("../apps/tier/src/components/group-enquiry-form.tsx"),
    read("../apps/tier/src/app/api/enquiry/route.ts"),
  ]);
  for (const field of ["name", "mobile", "email", "institution", "message", "consent", "form_started_at", "website"]) {
    assert.ok(form.includes(`name="${field}"`), `TIER form is missing ${field}`);
    assert.ok(api.includes(`data.${field}`), `TIER API does not validate/use ${field}`);
  }
  assert.ok(form.includes('fetch("/api/enquiry"'));
});
