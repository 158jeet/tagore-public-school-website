import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Institutional Partnerships | Tagore Group",
  description: "Start a conversation about education, institutional and community partnerships with Tagore Group.",
  alternates: { canonical: "/partnerships" },
  robots: { index: false, follow: true },
};

const themes = [
  { title: "Academic collaboration", detail: "Discuss curriculum enrichment, academic exchange, faculty interaction or shared learning initiatives." },
  { title: "Institutional development", detail: "Introduce a proposal involving school, college or education-sector development and collaboration." },
  { title: "Community initiatives", detail: "Explore a community, outreach or educational event proposal with a clear purpose and intended participants." },
  { title: "Technology and services", detail: "Present an education-related technology, service or operational proposal for the relevant team to review." },
];

export default function PartnershipsPage() {
  return (
    <main>
      <section className="hero">
        <div className="shell" style={{ padding: "90px 0" }}>
          <div className="eyebrow" style={{ color: "var(--gold)" }}>Institutional partnerships</div>
          <h1 className="serif" style={{ fontSize: "clamp(42px,6vw,68px)", maxWidth: 900 }}>Good partnerships begin with a well-defined purpose.</h1>
          <p className="lead" style={{ maxWidth: 760 }}>Introduce your institution, the challenge or opportunity you see, and the kind of conversation you would like to have. The group office can then identify the appropriate next step.</p>
          <div style={{ marginTop: 30 }}><Link className="button" href="/contact?path=partnership#group-enquiry">Start a partnership enquiry ↗</Link></div>
        </div>
      </section>
      <section className="section" style={{ background: "#edf0f1" }}>
        <div className="shell">
          <div className="intro"><div className="eyebrow" style={{ color: "var(--gold)" }}>Possible conversation themes</div><h2>Start with the opportunity.</h2><p>These are discussion themes, not a claim that a programme, agreement or partnership is already available.</p></div>
          <div className="institutions">
            {themes.map((theme) => <article className="institution" key={theme.title}><div><h3>{theme.title}</h3><p>{theme.detail}</p></div></article>)}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="shell journey-grid">
          <div className="intro"><div className="eyebrow" style={{ color: "var(--gold)" }}>What to include</div><h2>Make the first conversation useful.</h2><p>Share your organisation name, your role, the purpose of the proposal, relevant geography, a short outline and the type of discussion requested. Do not include confidential, personal or student information in the public form.</p></div>
          <div className="card"><h3>What happens after an enquiry?</h3><p>The group office must review the request, confirm the appropriate recipient and decide whether a follow-up is suitable. Submitting an enquiry is not an approval, commitment, appointment or partnership agreement.</p><Link className="button" href="/contact?path=partnership#group-enquiry">Continue to group enquiry ↗</Link></div>
        </div>
      </section>
    </main>
  );
}
