import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import path from "node:path";
import { mkdir } from "node:fs/promises";
import { setTimeout as delay } from "node:timers/promises";
import { chromium, devices, firefox, webkit } from "@playwright/test";
import axe from "axe-core";

const app = process.env.SMOKE_APP;
assert.ok(app === "tps" || app === "tier", "Set SMOKE_APP to tps or tier");
const root = process.cwd();
const appDir = app === "tier" ? path.join(root, "apps", "tier") : root;
const port = Number(process.env.BROWSER_PORT || (app === "tps" ? 3380 : 3480));
const origin = `http://127.0.0.1:${port}`;
const routes = app === "tps"
  ? ["/", "/about", "/parent-guide", "/admissions", "/admissions/funnel", "/admissions/faq", "/admissions/parent-checklist", "/admissions/pathways", "/admissions/pathways/early-years", "/admissions/pathways/primary", "/admissions/pathways/middle", "/admissions/pathways/secondary", "/admissions/pathways/senior-secondary", "/visit", "/visit/guide", "/hostel/guide", "/start"]
  : ["/", "/about", "/choose", "/institutions", "/institutions/tagore-bal-niketan", "/institutions/tagore-smart-school", "/institutions/tagore-vedant-academy", "/institutions/tagore-pg-college", "/institutions/tagore-hostel", "/contact", "/connect", "/partnerships", "/help", "/start"];
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
    if (route === "/start") {
      await page.getByRole("heading", { name: app === "tps" ? /Your next conversation starts here/i : /Start with the information you need/i }).waitFor();
    }
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

  if (engineName === "chromium") {
    const cdp = await context.newCDPSession(page);
    try {
      await cdp.send("Network.enable");
      await cdp.send("Network.emulateNetworkConditions", {
        offline: false,
        latency: 400,
        downloadThroughput: 400 * 1024 / 8,
        uploadThroughput: 100 * 1024 / 8,
        connectionType: "cellular3g",
      });
      const startedAt = Date.now();
      const response = await page.goto(origin + "/start", { waitUntil: "domcontentloaded", timeout: 30000 });
      assert.equal(response?.status(), 200, "Text-first QR landing page must return HTTP 200 on simulated slow 3G");
      await page.getByRole("heading", { name: app === "tps" ? /Your next conversation starts here/i : /Start with the information you need/i }).waitFor({ timeout: 20000 });
      const elapsedMs = Date.now() - startedAt;
      const mainText = await page.locator("body").innerText();
      assert.ok(mainText.length > 100, "Low-bandwidth landing page must retain meaningful readable content");
      assert.ok(elapsedMs < 25000, `Low-bandwidth landing page took ${elapsedMs}ms; expected under 25000ms`);
      console.log(`PASS: ${app.toUpperCase()} text-first landing page under simulated 400kbps / 400ms latency (${elapsedMs}ms)`);
    } finally {
      await cdp.send("Network.emulateNetworkConditions", {
        offline: false,
        latency: 0,
        downloadThroughput: -1,
        uploadThroughput: -1,
      });
      await cdp.detach();
    }
  }

  if (engineName === "chromium") {
  const mobileProfiles = [
    { name: "iPhone 13 Safari", engine: webkit, descriptor: devices["iPhone 13"] },
    { name: "Pixel 5 Chrome", engine: chromium, descriptor: devices["Pixel 5"] },
  ];
  for (const profile of mobileProfiles) {
    assert.ok(profile.descriptor, `Playwright device profile is available: ${profile.name}`);
    const mobileBrowser = await profile.engine.launch({ headless: true });
    try {
      const mobileContext = await mobileBrowser.newContext({ ...profile.descriptor, reducedMotion: "reduce" });
      const mobilePage = await mobileContext.newPage();
      for (const route of routes) {
        const response = await mobilePage.goto(origin + route, { waitUntil: "networkidle", timeout: 30000 });
        assert.equal(response?.status(), 200, `${app.toUpperCase()} ${profile.name} route ${route} did not return 200`);
        const dimensions = await mobilePage.evaluate(() => ({
          viewport: document.documentElement.clientWidth,
          document: document.documentElement.scrollWidth,
        }));
        assert.ok(dimensions.document <= dimensions.viewport + 1, `${app.toUpperCase()} ${profile.name} ${route} has horizontal overflow: ${JSON.stringify(dimensions)}`);
        if (route === "/") {
          const toggle = mobilePage.locator(app === "tps" ? 'button[aria-controls="tps-mobile-navigation"]' : 'button[aria-controls="tier-mobile-navigation"]');
          await toggle.tap();
          assert.equal(await toggle.getAttribute("aria-expanded"), "true", `${profile.name} mobile navigation must open from touch`);
          await mobilePage.keyboard.press("Escape");
          assert.equal(await toggle.getAttribute("aria-expanded"), "false", `${profile.name} mobile navigation must close with Escape`);
        }
      }
      await mobileContext.close();
    } finally {
      await mobileBrowser.close();
    }
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
    await page.waitForLoadState("networkidle");

    // Mock the local API at the browser boundary: no live lead or provider call is made.
    await page.route("**/api/enquiry", async route => {
      await delay(350);
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ success: true }) });
    });
    await page.goto(origin + "/admissions", { waitUntil: "networkidle" });
    await page.getByLabel(/Parent \/ guardian name/i).fill("QA Parent");
    await page.getByLabel(/Mobile number/i).fill("9876543210");
    await page.getByLabel(/Class seeking admission/i).selectOption("Class 1");
    await page.locator('input[name="contact_consent"]').check();
    const admissionSubmit = page.getByRole("button", { name: /Submit admission enquiry/i });
    await admissionSubmit.click();
    await page.getByRole("button", { name: /Sending enquiry/i }).waitFor({ state: "visible", timeout: 5000 });
    assert.equal(await admissionSubmit.isDisabled(), true, "TPS admission form must prevent duplicate submission while pending");
    await page.getByRole("status").getByText(/Your enquiry has been sent/i).waitFor();
    assert.equal(await admissionSubmit.isDisabled(), false, "TPS admission form must re-enable after completion");
    await page.unroute("**/api/enquiry");

    await page.route("**/api/enquiry", route => route.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify({ message: "Enquiry service is temporarily unavailable." }),
    }));
    await page.goto(origin + "/visit", { waitUntil: "networkidle" });
    await page.getByLabel(/Parent \/ guardian name/i).fill("QA Parent");
    await page.getByLabel(/Mobile number/i).fill("9876543210");
    await page.getByLabel(/Class of interest/i).selectOption("Class 1");
    const visitDate = await page.locator('input[name="preferred_date"]').getAttribute("min");
    await page.locator('input[name="preferred_date"]').fill(visitDate);
    await page.getByLabel(/Preferred time/i).selectOption("Morning");
    await page.locator('input[name="contact_consent"]').check();
    await page.getByRole("button", { name: /Request a campus visit/i }).click();
    const visitError = page.getByRole("alert");
    await visitError.waitFor();
    assert.match(await visitError.innerText(), /temporarily unavailable/i, "TPS visit form must show a useful provider-failure message");
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

    // Mock the local API at the browser boundary: no live lead or provider call is made.
    await page.route("**/api/enquiry", async route => {
      await delay(350);
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ success: true }) });
    });
    await page.goto(origin + "/contact", { waitUntil: "networkidle" });
    await page.getByLabel(/Parent \/ enquirer name/i).fill("QA Enquirer");
    await page.getByLabel(/Mobile number/i).fill("9876543210");
    await page.getByLabel(/Institution \/ area/i).selectOption("Tagore Bal Niketan");
    await page.getByLabel(/How can we help/i).fill("Please share admission information.");
    await page.locator('input[name="consent"]').check();
    const groupSubmit = page.getByRole("button", { name: /Send group enquiry/i });
    await groupSubmit.click();
    await page.getByRole("button", { name: /Sending…/i }).waitFor({ state: "visible", timeout: 5000 });
    assert.equal(await groupSubmit.isDisabled(), true, "TIER group form must prevent duplicate submission while pending");
    await page.getByRole("status").getByText(/Your group enquiry has been sent/i).waitFor();
    assert.equal(await groupSubmit.isDisabled(), false, "TIER group form must re-enable after completion");
    await page.unroute("**/api/enquiry");

    await page.route("**/api/enquiry", route => route.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify({ message: "Group enquiry service is temporarily unavailable." }),
    }));
    await page.goto(origin + "/contact", { waitUntil: "networkidle" });
    await page.getByLabel(/Parent \/ enquirer name/i).fill("QA Enquirer");
    await page.getByLabel(/Mobile number/i).fill("9876543210");
    await page.getByLabel(/Institution \/ area/i).selectOption("Tagore Bal Niketan");
    await page.getByLabel(/How can we help/i).fill("Please share admission information.");
    await page.locator('input[name="consent"]').check();
    await page.getByRole("button", { name: /Send group enquiry/i }).click();
    const groupError = page.getByRole("alert");
    await groupError.waitFor();
    assert.match(await groupError.innerText(), /temporarily unavailable/i, "TIER group form must show a useful provider-failure message");
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
