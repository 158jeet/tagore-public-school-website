import test, { afterEach } from "node:test";
import assert from "node:assert/strict";

const apps = [
  {
    name: "TPS",
    limit: 8192,
    post: (await import("../src/app/api/enquiry/route.ts")).POST,
    valid: () => ({ parent_name: "Test Parent", mobile: "9876543210", email: "", class: "Class 1", enquiry_topic: "academics", contact_consent: "yes", enquiry_type: "admission", form_started_at: String(Date.now() - 2000) }),
    invalid: (body) => ({ ...body, class: "Class 99" }),
    invalidTopic: (body) => ({ ...body, enquiry_topic: "guaranteed-seat" }),
  },
  {
    name: "TIER",
    limit: 10240,
    post: (await import("../apps/tier/src/app/api/enquiry/route.ts")).POST,
    valid: () => ({ name: "Test Enquirer", mobile: "9876543210", email: "", institution: "Tagore Smart School", message: "Interested in admission", consent: "yes", form_started_at: String(Date.now() - 2000) }),
    invalid: (body) => ({ ...body, institution: "Unknown Institution" }),
  },
];

const originalFetch = globalThis.fetch;
const originalKey = process.env.WEB3FORMS_ACCESS_KEY;
afterEach(() => {
  globalThis.fetch = originalFetch;
  if (originalKey === undefined) delete process.env.WEB3FORMS_ACCESS_KEY;
  else process.env.WEB3FORMS_ACCESS_KEY = originalKey;
});

function makeRequest(body, options = {}) {
  const origin = options.origin === undefined ? "https://tagore.test" : options.origin;
  const url = options.url || "https://tagore.test/api/enquiry";
  return new Request(url, {
    method: "POST",
    headers: { ...(origin ? { origin } : {}), "content-type": "application/json" },
    body: options.raw ? body : JSON.stringify(body),
  });
}

for (const app of apps) {
  test(app.name + ": rejects missing and foreign origins", async () => {
    process.env.WEB3FORMS_ACCESS_KEY = "test-key";
    assert.equal((await app.post(makeRequest(app.valid(), { origin: null }))).status, 403);
    assert.equal((await app.post(makeRequest(app.valid(), { origin: "https://evil.test" }))).status, 403);
    assert.equal((await app.post(makeRequest(app.valid(), { origin: "http://tagore.test" }))).status, 403);
  });

  test(app.name + ": rejects malformed JSON and oversized streaming bodies", async () => {
    process.env.WEB3FORMS_ACCESS_KEY = "test-key";
    assert.equal((await app.post(makeRequest("{", { raw: true }))).status, 400);
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode("x".repeat(app.limit + 1)));
        controller.close();
      },
    });
    const oversized = new Request("https://tagore.test/api/enquiry", {
      method: "POST",
      headers: { origin: "https://tagore.test", "content-type": "application/json" },
      body: stream,
      duplex: "half",
    });
    assert.equal((await app.post(oversized)).status, 413);
  });

  test(app.name + ": silently drops honeypot submissions without provider calls", async () => {
    process.env.WEB3FORMS_ACCESS_KEY = "test-key";
    let calls = 0;
    globalThis.fetch = async () => { calls += 1; throw new Error("must not call provider"); };
    assert.equal((await app.post(makeRequest({ ...app.valid(), website: "bot-filled" }))).status, 200);
    assert.equal(calls, 0);
  });

  test(app.name + ": validates timing and allowed business fields", async () => {
    process.env.WEB3FORMS_ACCESS_KEY = "test-key";
    assert.equal((await app.post(makeRequest({ ...app.valid(), form_started_at: String(Date.now()) }))).status, 400);
    assert.equal((await app.post(makeRequest(app.invalid(app.valid())))).status, 400);
    if (app.invalidTopic) assert.equal((await app.post(makeRequest(app.invalidTopic(app.valid())))).status, 400);
  });

  test(app.name + ": fails closed without a provider key and masks provider errors", async () => {
    delete process.env.WEB3FORMS_ACCESS_KEY;
    assert.equal((await app.post(makeRequest(app.valid()))).status, 503);
    process.env.WEB3FORMS_ACCESS_KEY = "test-key";
    globalThis.fetch = async () => { throw new Error("sensitive provider detail"); };
    const response = await app.post(makeRequest(app.valid()));
    assert.equal(response.status, 502);
    assert.doesNotMatch(await response.text(), /sensitive provider detail/);
  });

  test(app.name + ": rejects invalid email addresses", async () => {
    process.env.WEB3FORMS_ACCESS_KEY = "test-key";
    assert.equal((await app.post(makeRequest({ ...app.valid(), email: "not-an-email" }))).status, 400);
  });

  test(app.name + ": rejects provider-level unsuccessful responses", async () => {
    process.env.WEB3FORMS_ACCESS_KEY = "test-key";
    globalThis.fetch = async () => new Response(JSON.stringify({ success: false }), { status: 200, headers: { "content-type": "application/json" } });
    assert.equal((await app.post(makeRequest(app.valid()))).status, 502);
  });

  test(app.name + ": accepts a valid request only after provider confirmation", async () => {
    process.env.WEB3FORMS_ACCESS_KEY = "test-key";
    let forwardedBody;
    globalThis.fetch = async (_url, options) => {
      forwardedBody = options.body;
      return new Response(JSON.stringify({ success: true }), { status: 200, headers: { "content-type": "application/json" } });
    };
    const response = await app.post(makeRequest(app.valid()));
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { success: true });
    if (app.name === "TPS") assert.equal(forwardedBody.get("enquiry_topic"), "academics");
  });
}
