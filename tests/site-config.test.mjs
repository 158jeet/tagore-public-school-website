

for (const [app, path, recoveryLinks] of [
  ["TPS", "../src/app/error.tsx", ["/", "/admissions"]],
  ["TIER", "../apps/tier/src/app/error.tsx", ["/", "/institutions", "/contact"]],
]) {
  test(app + ": branded route error boundary provides retry and safe recovery without leaking exception details", async () => {
    const source = await readFile(new URL(path, import.meta.url), "utf8");
    assert.ok(source.includes('"use client"'), app + " error boundary must be a client component");
    assert.ok(source.includes("reset: () => void"), app + " error boundary must accept Next.js reset");
    assert.ok(source.includes("onClick={() => reset()}"), app + " error boundary must expose a working retry action");
    assert.ok(source.includes("TEMPORARY SERVICE ISSUE"), app + " error boundary must show a visitor-safe status");
    for (const href of recoveryLinks) {
      assert.ok(source.includes('href="' + href + '"'), app + " error boundary is missing recovery link " + href);
    }
    assert.ok(!source.includes("error.message"), app + " must not display raw exception messages");
    assert.ok(!source.includes("error.stack"), app + " must not display stack traces");
  });
}
