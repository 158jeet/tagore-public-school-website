"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main>
      <section className="hero">
        <div className="shell" style={{ padding: "100px 0" }}>
          <div className="eyebrow" style={{ color: "var(--gold)" }}>TEMPORARY SERVICE ISSUE</div>
          <h1 className="serif" style={{ fontSize: "clamp(42px, 6vw, 68px)", maxWidth: 820 }}>
            We couldn’t load this page
          </h1>
          <p className="lead" style={{ maxWidth: 680 }}>
            Something unexpected happened while opening this page. Please try again, or return to the school website to continue.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 28 }}>
            <button className="button" type="button" onClick={() => reset()}>Try again</button>
            <Link className="button" href="/">Return to homepage ↗</Link>
            <Link className="button" href="/admissions">Admissions information ↗</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
