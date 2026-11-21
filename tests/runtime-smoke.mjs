import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";
import assert from "node:assert/strict";

const app = process.env.SMOKE_APP;
assert.ok(app === "tps" || app === "tier", "Set SMOKE_APP to tps or tier");
const port = Number(process.env.SMOKE_PORT || (app === "tps" ? 3180 : 3280));
const origin = `http://127.0.0.1:${port}`;
const expectedHost = app === "tps" ? "www.tpsgudhagorji.com" : "www.tieredu.org";
const routes = app === "tps"
  ? ["/", "/about", "/admissions", "/parent-guide", "/admissions/faq", "/admissions/parent-checklist", "/admissions/funnel", "/admissions/pathways", "/admissions/pathways/early-years", "/admissions/pathways/primary", "/admissions/pathways/middle", "/admissions/pathways/secondary", "/admissions/pathways/senior-secondary", "/visit", "/visit/guide", "/hostel/guide", "/start"]
  : ["/", "/about", "/institutions", "/choose", "/help", "/contact", "/connect", "/partnerships", "/institutions/tagore-bal-niketan", "/institutions/tagore-smart-school", "/institutions/tagore-vedant-academy", "/institutions/tagore-pg-college", "/institutions/tagore-hostel", "/start"];
const noindexRoutes = app === "tps"
  ? ["/admissions/funnel", "/visit/guide", "/hostel/guide", "/start"]
  : ["/connect", "/partnerships", "/start"];

const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", String(port)], {
  cwd: process.cwd(),
  env: { ...process.env, SITE_INDEXING_ENABLED: "false", PORT: String(port), HOSTNAME: "127.0.0.1" },
  stdio: ["ignore", "pipe", "pipe"],
  shell: process.platform === "win32",
});
let serverOutput = "";
server.stdout.on("data", (chunk) => { serverOutput += chunk.toString(); });
server.stderr.on("data", (chunk) => { serverOutput += chunk.toString(); });

async function stopServer() {
  if (server.exitCode === null) {
    const exited = new Promise((resolve) => server.once("exit", resolve));
    server.kill("SIGTERM");
    await Promise.race([exited, delay(5000)]);
    if (server.exitCode === null) {
      const forceExited = new Promise((resolve) => server.once("exit", resolve));
      server.kill("SIGKILL");
      await Promise.race([forceExited, delay(2000)]);
    }
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
    const response = await fetch(origin + path, { redirect: "manual", signal: AbortSignal.timeout(10000) });
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
    const expectedRobots = noindexRoutes.includes(path)
      ? /<meta[^>]+name="robots"[^>]+content="noindex, ?follow"/i
      : /<meta[^>]+name="robots"[^>]+content="noindex, ?nofollow"/i;
    assert.match(html, expectedRobots, `${path} must use the expected smoke-environment robots directive`);
    assert.match(html, /<title>[^<]+<\/title>/i, `${path} must render a page title`);
    assert.match(html, /<meta[^>]+name="description"[^>]+content="[^"]{20,}"/i, `${path} must render a useful meta description`);
    const canonicalTag = html.match(/<link[^>]*rel="canonical"[^>]*>/i)?.[0] || "";
    const canonicalHref = canonicalTag.match(/href="([^"]+)"/i)?.[1];
    assert.ok(canonicalHref, `${path} must render a canonical URL`);
    assert.equal(new URL(canonicalHref).host, expectedHost, `${path} canonical URL must use the correct brand host`);
    assert.match(html, /<meta[^>]+property="og:title"[^>]+content="[^"]+"/i, `${path} must render Open Graph title metadata`);
    assert.match(html, /<meta[^>]+name="twitter:card"[^>]+content="summary"/i, `${path} must render a Twitter summary card`);
    const jsonLd = [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
    assert.ok(jsonLd.length > 0, `${path} must render JSON-LD structured data`);
    for (const match of jsonLd) assert.doesNotThrow(() => JSON.parse(match[1]), `${path} contains invalid JSON-LD`);

  }

  const pageHtml = new Map();
  for (const path of routes) {
    const response = await fetch(origin + path, { signal: AbortSignal.timeout(10000) });
    pageHtml.set(path, await response.text());
  }

  function assertJourneyLink(from, to) {
    const html = pageHtml.get(from);
    assert.ok(html, "Journey source page was not smoke-tested: " + from);
    assert.ok(html.includes('href="' + to + '"') || html.includes("href='" + to + "'"), app.toUpperCase() + " journey link missing: " + from + " → " + to);
  }

  function assertFormFields(path, fields) {
    const html = pageHtml.get(path);
    assert.ok(html, "Form page was not smoke-tested: " + path);
    assert.match(html, /<form(?:\s|>)/i, app.toUpperCase() + " expected a form on " + path);
    for (const field of fields) assert.ok(html.includes('name="' + field + '"') || html.includes("name='" + field + "'"), path + " form is missing the " + field + " field");
  }

  if (app === "tps") {
    assertJourneyLink("/", "/parent-guide");
    assertJourneyLink("/", "/visit");
    assertJourneyLink("/parent-guide", "/visit");
    assertJourneyLink("/parent-guide", "/admissions/faq");
    assertJourneyLink("/admissions", "/admissions/pathways/early-years");
    assertJourneyLink("/admissions/pathways", "/admissions/pathways/early-years");
    assertJourneyLink("/admissions/pathways/early-years", "/admissions?class=Nursery");
    assertJourneyLink("/admissions/pathways/early-years", "/parent-guide");
    assertJourneyLink("/admissions/pathways/early-years", "/visit");
    assertJourneyLink("/start", "/admissions");
    assertJourneyLink("/start", "/visit");
    assertFormFields("/admissions", ["parent_name", "mobile", "class", "contact_consent"]);
    assertFormFields("/visit", ["parent_name", "mobile", "preferred_date", "preferred_time", "contact_consent"]);
  } else {
    assertJourneyLink("/", "/institutions");
    assertJourneyLink("/", "/contact");
    assertJourneyLink("/institutions", "/institutions/tagore-bal-niketan");
    assertJourneyLink("/choose", "/institutions/tagore-vedant-academy");
    assertJourneyLink("/help", "/choose");
    assertJourneyLink("/start", "/choose");
    assertJourneyLink("/start", "/help");
    assertFormFields("/contact", ["name", "mobile", "institution", "message", "consent"]);
  }
  // Crawl same-origin links rendered by the tested pages. This catches accidental
  // broken navigation without following external sites or framework asset URLs.
  const internalTargets = new Set();
  for (const [sourcePath, html] of pageHtml) {
    for (const match of html.matchAll(/\bhref=["']([^"']+)["']/gi)) {
      const rawHref = match[1];
      if (!rawHref || rawHref.startsWith("#")) continue;
      let target;
      try { target = new URL(rawHref, origin + sourcePath); } catch { continue; }
      if (target.origin !== origin || target.pathname.startsWith("/_next/")) continue;
      internalTargets.add(target.pathname + target.search);
    }
  }
  for (const target of internalTargets) {
    const response = await fetch(origin + target, { redirect: "follow", signal: AbortSignal.timeout(10000) });
    assert.equal(response.status, 200, `${app.toUpperCase()} internal link ${target} returned ${response.status}`);
  }

  const missingRoute = "/__tagore_smoke_missing_route__";
  const missingResponse = await fetch(origin + missingRoute, { redirect: "manual", signal: AbortSignal.timeout(10000) });
  assert.equal(missingResponse.status, 404, `${app.toUpperCase()} unknown route must return HTTP 404`);

  const robotsResponse = await fetch(origin + "/robots.txt", { signal: AbortSignal.timeout(10000) });
  assert.equal(robotsResponse.status, 200);
  const robots = await robotsResponse.text();
  assert.match(robots, /Disallow:\s*\//i, "staging robots.txt must disallow crawling");
  assert.ok(robots.includes(expectedHost), "robots.txt must advertise the correct canonical host sitemap");

  const sitemapResponse = await fetch(origin + "/sitemap.xml", { signal: AbortSignal.timeout(10000) });
  assert.equal(sitemapResponse.status, 200);
  const sitemap = await sitemapResponse.text();
  assert.ok(sitemap.includes(expectedHost), "sitemap must use the app's own canonical host");
  assert.ok(!sitemap.includes(app === "tps" ? "www.tieredu.org" : "www.tpsgudhagorji.com"), "sitemap must not mix the other brand's host");
  const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/gi)].map((match) => new URL(match[1]));
  assert.ok(sitemapUrls.length > 0, "sitemap must contain at least one indexable route");
  for (const url of sitemapUrls) {
    assert.equal(url.host, expectedHost, "every sitemap URL must use the correct brand host");
    assert.ok(routes.includes(url.pathname), "sitemap route is missing from the smoke-test matrix: " + url.pathname);
    const response = await fetch(origin + url.pathname, { signal: AbortSignal.timeout(10000) });
    assert.equal(response.status, 200, "sitemap route must return HTTP 200: " + url.pathname);
  }
  for (const excluded of noindexRoutes) {
    assert.ok(!sitemapUrls.some((url) => url.pathname === excluded), "noindex route must not appear in sitemap: " + excluded);
  }

  console.log(`PASS: ${app.toUpperCase()} production HTTP smoke checks (${routes.length} pages, journey links, enquiry forms, security headers, noindex, robots, sitemap)`);
} finally {
  await stopServer();
}
