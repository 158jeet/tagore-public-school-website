import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Connect with Tagore | Families, Partnerships and Careers",
  description: "Find the right starting point for family, student, institutional partnership, career and community enquiries across the Tagore Group.",
  alternates: { canonical: "/connect" },
  robots: { index: false, follow: true }
};

const pathways = [
  { key: "family", number: "01", title: "Parents and students", text: "Explore the right Tagore institution or learning pathway for your next step.", action: "Start a family enquiry" },
  { key: "partnership", number: "02", title: "Institutional partnerships", text: "Introduce a school, college, education or community collaboration proposal.", action: "Discuss a partnership" },
  { key: "careers", number: "03", title: "Careers and educators", text: "Share your interest in working with the Tagore education ecosystem.", action: "Make a careers enquiry" },
  { key: "community", number: "04", title: "Community and vendors", text: "Connect about events, community initiatives, services or general coordination.", action: "Contact the group" }
];

export default function ConnectPage() {
  return (
    <main>
      <section className="hero">
        <div className="shell" style={{ padding: "90px 0" }}>
          <div className="eyebrow" style={{ color: "var(--gold)" }}>Connect with Tagore</div>
          <h1 className="serif" style={{ fontSize: "clamp(42px,6vw,68px)", maxWidth: 850 }}>The right conversation starts with the right doorway.</h1>
          <p className="lead" style={{ maxWidth: 720 }}>Families, learners, educators and institutions may come to us with very different questions. Choose the path closest to your purpose and we’ll carry that context into the group enquiry.</p>
        </div>
      </section>
      <section className="section" style={{ background: "#edf0f1" }}>
        <div className="shell">
          <div className="intro"><div className="eyebrow" style={{ color: "var(--gold)" }}>Choose your pathway</div><h2>One group. Different reasons to connect.</h2><p>Each pathway opens the group enquiry form with a starting context. The group office will need to confirm the correct recipient and follow-up process before these enquiries can be routed automatically.</p></div>
          <div className="institutions">
            {pathways.map((item) => (
              <article className="institution" key={item.key}>
                <div><small>PATHWAY {item.number}</small><h3>{item.title}</h3><p>{item.text}</p></div>
                <Link href={`/contact?path=${item.key}#group-enquiry`}>{item.action} ↗</Link>
              </article>
            ))}
          </div>
          <p style={{ marginTop: 28, fontSize: 12, lineHeight: 1.7, color: "var(--muted)" }}>For Tagore Public School CBSE admissions, please use the dedicated <a href="https://www.tpsgudhagorji.com/admissions" style={{ color: "var(--navy)", fontWeight: 700, textDecoration: "underline" }}>TPS admissions website</a>.</p>
        </div>
      </section>
      <section className="section">
        <div className="shell journey-grid">
          <div className="intro"><div className="eyebrow" style={{ color: "var(--gold)" }}>What happens next</div><h2>A clear enquiry. A human conversation.</h2><p>Tell us which institution or area you have in mind and include enough detail for the group office to understand your request. Please do not send confidential documents or sensitive personal information.</p></div>
          <div className="card"><h3>Before you submit</h3><p>This is an initial group enquiry, not an admission offer, job application acknowledgement, partnership approval or service booking. The relevant team and response process must be confirmed by the group office.</p><Link className="button" href="/contact#group-enquiry">Continue to group enquiry ↗</Link></div>
        </div>
      </section>
    </main>
  );
}
