import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <section className="hero">
        <div className="shell" style={{ padding: "100px 0" }}>
          <div className="eyebrow" style={{ color: "var(--gold)" }}>404 · PAGE NOT FOUND</div>
          <h1 className="serif" style={{ fontSize: "clamp(42px, 6vw, 68px)", maxWidth: 820 }}>Page not found</h1>
          <p className="lead" style={{ maxWidth: 680 }}>The page may have moved or the address may be incorrect. Explore the Tagore institutions or contact the group team for direction.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 28 }}>
            <Link className="button" href="/">Return to homepage ↗</Link>
            <Link className="button" href="/institutions">Explore institutions ↗</Link>
            <Link className="button" href="/contact">Contact the group ↗</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
