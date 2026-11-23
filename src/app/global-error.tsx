"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, background: "#f7f4ed", color: "#202a35", fontFamily: "Arial, sans-serif" }}>
        <main style={{ width: "100%", maxWidth: 680, textAlign: "center" }}>
          <p style={{ color: "#9a7838", fontSize: 12, fontWeight: 700, letterSpacing: "0.16em" }}>TAGORE PUBLIC SCHOOL</p>
          <h1 style={{ fontSize: "clamp(32px, 6vw, 52px)", lineHeight: 1.1 }}>We’re having trouble loading the website</h1>
          <p style={{ fontSize: 17, lineHeight: 1.6 }}>Please try again. You can also return to the school website and continue browsing.</p>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 12, marginTop: 28 }}>
            <button type="button" onClick={() => reset()} style={{ padding: "13px 20px", border: 0, background: "#263b50", color: "#fff", cursor: "pointer" }}>Try again</button>
            <button type="button" onClick={() => window.location.assign("/")} style={{ padding: "13px 20px", border: "1px solid #9a7838", background: "transparent", color: "#263b50", cursor: "pointer" }}>Return to homepage</button>
          </div>
        </main>
      </body>
    </html>
  );
}
