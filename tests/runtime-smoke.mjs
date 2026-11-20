import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";
import assert from "node:assert/strict";

const app = process.env.SMOKE_APP;
assert.ok(app === "tps" || app === "tier", "Set SMOKE_APP to tps or tier");
const port = Number(process.env.SMOKE_PORT || (app === "tps" ? 3180 : 3280));
const origin = `http://127.0.0.1:${port}`;
const expectedHost = app === "tps" ? "www.tpsgudhagorji.com" : "www.tieredu.org";
const routes = app === "tps"
  ? ["/", "/about", "/admissions", "/parent-guide", "/admissions/faq", "/visit"]
  : ["/", "/about", "/institutions", "/contact", "/institutions/tagore-bal-niketan", "/institutions/tagore-smart-school", "/institutions/tagore-vedant-academy", "/institutions/tagore-pg-college", "/institutions/tagore-hostel"];

const server = spawn("npm", ["run", "start", "--", "--hostname", "127.0.0.1", "--port", String(port)], {
  cwd: process.cwd(),
  env: { ...process.env, SITE_INDEXING_ENABLED: "false", PORT: String(port), HOSTNAME: "127.0.0.1" },
  stdio: ["ignore", "pipe", "pipe"],
  shell: process.platform === "win32",
});
let serverOutput = "";
server.stdout.on("data", (chunk) => { serverOutput += chunk.toString(); });
server.stderr.on("data", (chunk) => { serverOutput += chunk.toString(); });

async function stopServer() {
  if (server.exitCode === null && !server.killed) {
    server.kill("SIGTERM");
    await Promise.race([new Promise((resolve) => server.once("exit", resolve)), delay(5000)]);
    if (server.exitCode === null) server.kill("SIGKILL");
  }
}

try {
  let ready = false;
  for (let attempt = 0; attempt < 60; attempt += 1) {
    if (server.exitCode !== null) throw new Error(`Next.js server exited early.\n${serverOutput}`);
    try {
      const response = await fetch(origin, { signal: AbortSignal.timeout(2000) });
      if (response.status === 200) { ready = true; break; }
    } catch {}
    await delay(500);
  }
  assert.ok(ready, `Next.js server did not become ready.\n${serverOutput}`);

  for (const path of routes) {
    const response = await fetch(origin + path, { redirect: "manual" });
    assert.equal(response.status, 200, `${app.toUpperCase()} route ${path} returned ${response.status}`);
    for (const [header, expected] of [
      ["x-content-type-options", "nosniff"],
      ["x-frame-options", "DENY"],
      ["referrer-policy", "strict-origin-when-cross-origin"],
      ["strict-transport-security", "max-age=31536000"],
    ]) assert.equal(response.headers.get(header), expected, `${path} missing or changed ${header}`);
    assert.ok(response.headers.get("content-security-policy-report-only"), `${path} missing report-only CSP`);
    assert.equal(response.headers.get("x-powered-by"), null, `${path} exposes X-Powered-By`);
    const html = await response.text();
    assert.match(html, /<html(?:\s|>)/i, `${path} did not return an HTML document`);
    assert.match(html, /<meta[^>]+name="robots"[^>]+content="noindex, ?nofollow"/i, `${path} must remain noindex in smoke environment`);
  }

  const robotsResponse = await fetch(origin + "/robots.txt");
  assert.equal(robotsResponse.status, 200);
  const robots = await robotsResponse.text();
  assert.match(robots, /Disallow:\s*\//i, "staging robots.txt must disallow crawling");
  assert.ok(robots.includes(expectedHost), "robots.txt must advertise the correct canonical host sitemap");

  const sitemapResponse = await fetch(origin + "/sitemap.xml");
  assert.equal(sitemapResponse.status, 200);
  const sitemap = await sitemapResponse.text();
  assert.ok(sitemap.includes(expectedHost), "sitemap must use the app's own canonical host");
  assert.ok(!sitemap.includes(app === "tps" ? "www.tieredu.org" : "www.tpsgudhagorji.com"), "sitemap must not mix the other brand's host");

  console.log(`PASS: ${app.toUpperCase()} production HTTP smoke checks (${routes.length} pages, security headers, noindex, robots, sitemap)`);
} finally {
  await stopServer();
}
