import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import path from "node:path";
import { mkdir } from "node:fs/promises";
import { setTimeout as delay } from "node:timers/promises";
import { chromium, firefox, webkit } from "@playwright/test";
import axe from "axe-core";

const app = process.env.SMOKE_APP;
assert.ok(app === "tps" || app === "tier", "Set SMOKE_APP to tps or tier");
const root = process.cwd();
const appDir = app === "tier" ? path.join(root, "apps", "tier") : root;
const port = Number(process.env.BROWSER_PORT || (app === "tps" ? 3380 : 3480));
const origin = `http://127.0.0.1:${port}`;
const routes = app === "tps"
  ? ["/", "/parent-guide", "/admissions", "/visit", "/admissions/funnel", "/admissions/faq"]
  : ["/", "/institutions", "/contact", "/connect", "/help"];
const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", String(port)], {
  cwd: appDir,
  env: { ...process.env, SITE_INDEXING_ENABLED: "false", PORT: String(port), HOSTNAME: "127.0.0.1" },
  stdio: ["ignore", "pipe", "pipe"],
});
let serverOutput = "";
server.stdout.on("data", chunk => { serverOutput += chunk.toString(); });
server.stderr.on("data", chunk => { serverOutput += chunk.toString(); });
async function stopServer() {
  if (server.exitCode === null) {
    const exited = new Promise(resolve => server.once("exit", resolve));
    server.kill("SIGTERM");
    await Promise.race([exited, delay(5000)]);
    if (server.exitCode === null) {
      const forced = new Promise(resolve => server.once("exit", resolve));
      server.kill("SIGKILL");
      await Promise.race([forced, delay(2000)]);
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

  for (const [engineName, engine] of [["chromium", chromium], ["firefox", firefox], ["webkit", webkit]]) {
    const browser = await engine.launch({ headless: true });
    try {
      const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
  const page = await context.newPage();
  const pageErrors = [];
  const thirdPartyFontRequests = [];
  page.on("pageerror", error => pageErrors.push(error.message));
  if (app === "tier") {
    page.on("request", request => {
      const url = request.url();
      if (/^https:\/\/(fonts\.googleapis\.com|fonts\.gstatic\.com)\//i.test(url)) {
        thirdPartyFontRequests.push(url);
      }
    });
  }

  for (const route of routes) {
    const response = await page.goto(origin + route, { waitUntil: "networkidle", timeout: 30000 });
    assert.equal(response?.status(), 200, `${app.toUpperCase()} browser route ${route} did not return 200`);
    const motionPreference = await page.evaluate(() => ({ enabled: window.matchMedia("(prefers-reduced-motion: reduce)").matches, scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior }));
    assert.equal(motionPreference.enabled, true, "Browser context must expose prefers-reduced-motion: reduce");
    assert.equal(motionPreference.scrollBehavior, "auto", `${route} must disable smooth scrolling for reduced-motion users`);
    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      document: document.documentElement.scrollWidth,
    }));
    if (dimensions.document > dimensions.viewport + 1) {
      const offenders = await page.evaluate(() => Array.from(document.querySelectorAll("body *")).map(element => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return { tag: element.tagName, className: typeof element.className === "string" ? element.className.slice(0, 100) : "", text: (element.textContent || "").trim().slice(0, 70), left: Math.round(rect.left), right: Math.round(rect.right), width: Math.round(rect.width), position: style.position, overflow: style.overflow };
      }).filter(item => item.right > document.documentElement.clientWidth + 1 && item.width > 0).sort((a,b) => b.right-a.right).slice(0, 16));
      assert.ok(false, `${route} has horizontal overflow on a 390px viewport: ${JSON.stringify(dimensions)}. Offenders: ${JSON.stringify(offenders)}`);
    }

    await page.setViewportSize({ width: 320, height: 844 });
    const narrowDimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      document: document.documentElement.scrollWidth,
    }));
    if (narrowDimensions.document > narrowDimensions.viewport + 1) {
      const offenders = await page.evaluate(() => Array.from(document.querySelectorAll("body *")).map(element => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return { tag: element.tagName, className: typeof element.className === "string" ? element.className.slice(0, 100) : "", text: (element.textContent || "").trim().slice(0, 70), left: Math.round(rect.left), right: Math.round(rect.right), width: Math.round(rect.width), position: style.position, overflow: style.overflow };
      }).filter(item => item.right > document.documentElement.clientWidth + 1 && item.width > 0).sort((a,b) => b.right-a.right).slice(0, 20));
      assert.ok(false, `${app.toUpperCase()} ${engineName} ${route} overflows at 320 CSS px: ${JSON.stringify(narrowDimensions)}. Offenders: ${JSON.stringify(offenders)}`);
    }
    await page.setViewportSize({ width: 390, height: 844 });

    await page.addScriptTag({ content: axe.source });
    const audit = await page.evaluate(async () => window.axe.run(document, {
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"] },
    }));
    const severe = audit.violations.filter(item => item.impact === "serious" || item.impact === "critical");
    const moderate = audit.violations.filter(item => item.impact === "moderate" || item.impact === "minor");
    for (const issue of severe) console.error(`A11Y FAILURE [${app} ${route}] ${issue.impact}: ${issue.id} — ${issue.help}\n${issue.nodes.map(node => `  ${node.target.join(" ")}: ${node.failureSummary}`).join("\n")}`);
    for (const issue of moderate) console.warn(`A11Y WARNING [${app} ${route}] ${issue.impact}: ${issue.id} — ${issue.help}`);
    assert.equal(severe.length, 0, `Serious/critical WCAG violations on ${route}: ${severe.map(item => item.id + " (" + item.nodes.length + " nodes)").join(", ")}`);

    if (engineName === "chromium") {
      const artifactDir = path.join(root, "artifacts", "visual-qa", app);
      await mkdir(artifactDir, { recursive: true });
      const slug = route === "/" ? "home" : route.slice(1).replaceAll("/", "-");
      await page.screenshot({ path: path.join(artifactDir, `${slug}-mobile-390.png`), fullPage: true, animations: "disabled" });
      await page.setViewportSize({ width: 1440, height: 1000 });
      await page.screenshot({ path: path.join(artifactDir, `${slug}-desktop-1440.png`), fullPage: true, animations: "disabled" });
      await page.setViewportSize({ width: 390, height: 844 });
    }

    if (route === "/") {
      await page.keyboard.press("Tab");
      const focused = await page.evaluate(() => {
        const element = document.activeElement;
        if (!element || element === document.body) return false;
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return rect.width > 0 && rect.height > 0 && style.visibility !== "hidden";
      });
      assert.ok(focused, "Keyboard Tab must move focus to a visible interactive element");
      const menuButton = page.locator(app === "tps" ? 'button[aria-controls="tps-mobile-navigation"]' : 'button[aria-controls="tier-mobile-navigation"]');
      await menuButton.click();
      assert.equal(await menuButton.getAttribute("aria-expanded"), "true", "Mobile navigation must expose its expanded state");
      await page.keyboard.press("Escape");
      assert.equal(await menuButton.getAttribute("aria-expanded"), "false", "Escape must close mobile navigation");
      assert.equal(await menuButton.evaluate(element => element === document.activeElement), true, "Closing mobile navigation must restore focus to its toggle");
    }
  }

  if (app === "tps") {
    await page.goto(origin + "/parent-guide", { waitUntil: "networkidle" });
    await page.getByLabel(/Which class are you exploring/i).selectOption("Class 5");
    await page.getByLabel(/What would you most like to discuss/i).selectOption("academics");
    await page.getByRole("link", { name: /Continue to admission enquiry/i }).click();
    await page.waitForURL(/\/admissions\?/);
    const url = new URL(page.url());
    assert.equal(url.searchParams.get("class"), "Class 5");
    assert.equal(url.searchParams.get("topic"), "academics");

    await page.goto(origin + "/admissions", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: /Submit admission enquiry/i }).click();
    assert.equal(await page.locator('[name="parent_name"]').evaluate(el => el.validity.valueMissing), true, "Admission form must enforce required parent name");
    assert.equal(await page.locator('[name="mobile"]').evaluate(el => el.validity.valueMissing), true, "Admission form must enforce required mobile");
    assert.equal(await page.locator('[name="class"]').evaluate(el => el.validity.valueMissing), true, "Admission form must enforce class selection");

    await page.goto(origin + "/visit", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: /Request a campus visit/i }).click();
    assert.equal(await page.locator('[name="preferred_date"]').evaluate(el => el.validity.valueMissing), true, "Visit form must enforce a preferred date");
    assert.equal(await page.locator('[name="preferred_time"]').evaluate(el => el.validity.valueMissing), true, "Visit form must enforce a preferred time");

    await page.goto(origin + "/admissions/faq", { waitUntil: "networkidle" });
    await page.getByRole("searchbox", { name: /Search admissions questions/i }).fill("transport");
    assert.match(await page.getByRole("status").innerText(), /1 answer found/);
    await page.getByText(/How can I ask about transport or residential arrangements/i).waitFor();
    await page.getByRole("searchbox", { name: /Search admissions questions/i }).fill("");
    await page.getByRole("button", { name: "Fees", exact: true }).click();
    assert.match(await page.getByRole("status").innerText(), /1 answer found/);
    if (process.env.NEXT_PUBLIC_HINDI_CONTENT_ENABLED === "true") {
      await page.getByRole("button", { name: "हिन्दी", exact: true }).click();
      await page.getByText("प्रवेश से जुड़े प्रश्न खोजें").waitFor();
      assert.match(await page.getByRole("status").innerText(), /उत्तर मिले/);
      await page.getByRole("button", { name: "English", exact: true }).click();
    }

    await page.goto(origin + "/admissions/funnel", { waitUntil: "networkidle" });
    await page.getByRole("heading", { name: /Choose with clarity/i }).waitFor();
    await page.getByRole("link", { name: /Enquire about admission/i }).click();
    await page.waitForFunction(() => location.pathname === "/admissions/funnel" && location.hash === "#enquiry");
    assert.equal(await page.locator("#enquiry").count(), 1, "TPS funnel primary CTA must reach the enquiry section");
    await page.getByRole("link", { name: /Plan a campus visit/i }).click();
    await page.waitForFunction(() => location.pathname === "/visit");
  } else {
    await page.goto(origin + "/institutions", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "School", exact: true }).click();
    assert.match(await page.locator(".directory-count").innerText(), /Showing 3 of 6 institutions/);
    await page.getByRole("searchbox", { name: /Search institutions/i }).fill("Tagore Vedant Academy");
    assert.match(await page.locator(".directory-count").innerText(), /Showing 0 of 6 institutions/);
    await page.getByRole("button", { name: /Clear filters/i }).click();
    assert.match(await page.locator(".directory-count").innerText(), /Showing 6 of 6 institutions/);

    await page.goto(origin + "/institutions", { waitUntil: "networkidle" });
    await page.getByRole("checkbox", { name: "Compare" }).nth(0).check();
    await page.getByRole("checkbox", { name: "Compare" }).nth(3).check();
    await page.getByRole("heading", { name: "Compare pathways" }).waitFor();
    assert.equal(await page.locator(".compare-table thead th").count(), 3, "Comparison must show the label column and two selected institutions");
    assert.match(await page.locator(".compare-panel").innerText(), /Tagore Public School/);
    await page.getByRole("button", { name: "Clear comparison" }).click();
    assert.equal(await page.locator(".compare-panel").count(), 0, "Clear comparison must remove the comparison panel");

    await page.goto(origin + "/help", { waitUntil: "networkidle" });
    await page.getByRole("searchbox", { name: /Search by question or topic/i }).fill("hostel");
    assert.match(await page.getByRole("status").innerText(), /1 answer found/);
    await page.getByText(/How do I enquire about hostel arrangements/i).waitFor();
    await page.getByRole("searchbox", { name: /Search by question or topic/i }).fill("");
    await page.getByRole("button", { name: "Partnerships", exact: true }).click();
    assert.match(await page.getByRole("status").innerText(), /1 answer found/);
    if (process.env.NEXT_PUBLIC_HINDI_CONTENT_ENABLED === "true") {
      await page.getByRole("button", { name: "हिन्दी", exact: true }).click();
      await page.getByText("अपने प्रश्न या विषय से खोजें").waitFor();
      assert.match(await page.getByRole("status").innerText(), /उत्तर मिले/);
      await page.getByRole("button", { name: "English", exact: true }).click();
    }

    await page.goto(origin + "/contact", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: /Send group enquiry/i }).click();
    assert.equal(await page.locator('[name="name"]').evaluate(el => el.validity.valueMissing), true, "Group enquiry must enforce contact name");
    assert.equal(await page.locator('[name="mobile"]').evaluate(el => el.validity.valueMissing), true, "Group enquiry must enforce mobile");

    await page.goto(origin + "/connect", { waitUntil: "networkidle" });
    await page.getByRole("heading", { name: /The right conversation starts with the right doorway/i }).waitFor();
    await page.getByRole("link", { name: /Discuss a partnership/i }).click();
    await page.waitForFunction(() => location.pathname === "/contact" && location.search === "?path=partnership" && location.hash === "#group-enquiry");
    const partnershipMessage = await page.locator('textarea[name="message"]').inputValue();
    assert.match(partnershipMessage, /Institutional partnership enquiry/, "TIER partnership pathway must prefill enquiry context");
    assert.match(partnershipMessage, /Please add details about your enquiry below/, "TIER pathway prefill must retain an editable prompt");
  }

  assert.deepEqual(pageErrors, [], `Browser runtime errors detected: ${pageErrors.join(" | ")}`);
  if (app === "tier") {
    assert.deepEqual(thirdPartyFontRequests, [], `TIER must not request Google Fonts at runtime: ${thirdPartyFontRequests.join(", ")}`);
  }
      console.log(`PASS: ${app.toUpperCase()} ${engineName} journeys, 390px/320px reflow, keyboard focus, form validation and WCAG 2.2 A/AA serious/critical axe checks (${routes.length} routes)`);
    } finally {
      await browser.close();
    }
  }
} finally {
  await stopServer();
}
