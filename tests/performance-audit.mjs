import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import path from "node:path";
import { mkdir, writeFile } from "node:fs/promises";
import { setTimeout as delay } from "node:timers/promises";
import { chromium } from "@playwright/test";

const app = process.env.SMOKE_APP;
assert.ok(app === "tps" || app === "tier", "Set SMOKE_APP to tps or tier");
const root = process.cwd();
const appDir = app === "tier" ? path.join(root, "apps", "tier") : root;
const port = Number(process.env.PERFORMANCE_PORT || (app === "tps" ? 3580 : 3680));
const origin = `http://127.0.0.1:${port}`;
const routes = app === "tps" ? ["/", "/parent-guide", "/admissions", "/visit"] : ["/", "/institutions", "/contact"];
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
    if (server.exitCode !== null) throw new Error(`Next.js server exited early.\\n${serverOutput}`);
    try {
      const response = await fetch(origin, { signal: AbortSignal.timeout(2000) });
      if (response.status === 200) { ready = true; break; }
    } catch {}
    await delay(500);
  }
  assert.ok(ready, `Next.js server did not become ready.\\n${serverOutput}`);

  const browser = await chromium.launch({ headless: true });
  const results = [];
  try {
    for (const viewport of [{ name: "mobile-390", width: 390, height: 844 }, { name: "desktop-1440", width: 1440, height: 900 }]) {
      for (const route of routes) {
        // Isolate every measurement so earlier navigations cannot warm the browser cache.
        const context = await browser.newContext({
          viewport: { width: viewport.width, height: viewport.height },
          reducedMotion: "reduce",
          serviceWorkers: "block",
        });
        try {
          await context.addInitScript(() => {
            window.__labVitals = { lcp: 0, cls: 0 };
            if (PerformanceObserver.supportedEntryTypes.includes("largest-contentful-paint")) {
              new PerformanceObserver(list => {
                const entries = list.getEntries();
                if (entries.length) window.__labVitals.lcp = entries[entries.length - 1].startTime;
              }).observe({ type: "largest-contentful-paint", buffered: true });
            }
            if (PerformanceObserver.supportedEntryTypes.includes("layout-shift")) {
              new PerformanceObserver(list => {
                for (const entry of list.getEntries()) {
                  if (!entry.hadRecentInput) window.__labVitals.cls += entry.value;
                }
              }).observe({ type: "layout-shift", buffered: true });
            }
          });
          const page = await context.newPage();
          const response = await page.goto(origin + route, { waitUntil: "networkidle", timeout: 30000 });
          assert.equal(response?.status(), 200, `${app.toUpperCase()} performance route ${route} failed at ${viewport.name}`);
          await page.waitForTimeout(1500);
          const metrics = await page.evaluate(() => {
            const navigation = performance.getEntriesByType("navigation")[0];
            const resources = performance.getEntriesByType("resource");
            const paints = performance.getEntriesByType("paint");
            const vitals = window.__labVitals || { lcp: 0, cls: 0 };
            return {
              ttfbMs: Math.round(navigation ? navigation.responseStart - navigation.requestStart : 0),
              fcpMs: Math.round(paints.find(entry => entry.name === "first-contentful-paint")?.startTime || 0),
              lcpMs: Math.round(vitals.lcp || 0),
              cls: Number((vitals.cls || 0).toFixed(4)),
              totalTransferBytes: resources.reduce((sum, entry) => sum + (entry.transferSize || 0), 0),
              javascriptTransferBytes: resources.filter(entry => entry.initiatorType === "script").reduce((sum, entry) => sum + (entry.transferSize || 0), 0),
              resourceCount: resources.length,
              documentLoadMs: Math.round(navigation?.loadEventEnd || 0),
            };
          });
          assert.ok(metrics.resourceCount > 0, `No resource timing entries recorded for ${route} at ${viewport.name}`);
          assert.ok(metrics.totalTransferBytes > 0, `No transferred resource bytes recorded for ${route} at ${viewport.name}; cold-cache measurement may not be working`);
          results.push({
            route,
            viewport: viewport.name,
            ...metrics,
            targetStatus: {
              lcp: metrics.lcpMs > 0 ? (metrics.lcpMs <= 2500 ? "within-lab-target" : "over-lab-target") : "not-observed",
              cls: metrics.cls <= 0.1 ? "within-lab-target" : "over-lab-target",
            },
          });
          console.log(`PERF ${app.toUpperCase()} ${viewport.name} ${route}: LCP ${metrics.lcpMs}ms; CLS ${metrics.cls}; JS transfer ${metrics.javascriptTransferBytes} bytes`);
        } finally {
          await context.close();
        }
      }
    }
  } finally {
    await browser.close();
  }

  const report = {
    schemaVersion: 1,
    app,
    generatedAt: new Date().toISOString(),
    environment: "GitHub Actions Ubuntu 24.04; local Next.js production build; Chromium; synthetic lab measurements; fresh browser context per route (cold cache)",
    caveats: [
      "These are repeatable CI lab observations, not 75th-percentile field data.",
      "INP is not measured by this navigation-only audit; it requires representative interactions and field data.",
      "A Lighthouse performance score is not produced by this report.",
      "Each route uses a fresh browser context and blocks service workers to avoid cross-route warm-cache contamination. LCP and CLS may vary with runner load; targets are reported, not used as hard CI gates until a stable baseline is established."
    ],
    targets: { lcpMs: 2500, cls: 0.1 },
    results,
  };
  const outputDir = path.join(root, "artifacts", "performance");
  await mkdir(outputDir, { recursive: true });
  const outputPath = path.join(outputDir, `${app}-lab.json`);
  await writeFile(outputPath, JSON.stringify(report, null, 2) + "\n");
  console.log(`Performance lab report written to ${outputPath}`);
} finally {
  await stopServer();
}
