import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Start Here | Tagore Group",
  description: "A lightweight starting point for families, learners, institutions and candidates exploring Tagore Group pathways.",
  alternates: { canonical: "/start" },
  robots: { index: false, follow: true },
};

const destinations = [
  { title: "Choose an institution", description: "Explore school education, competitive learning, higher education and residential pathways.", href: "/choose", action: "Choose a pathway" },
  { title: "Search common questions", description: "Find guidance about institutions, programmes, hostel, partnerships and careers.", href: "/help", action: "Search help topics" },
  { title: "Discuss a partnership", description: "Read about the group partnership pathway before sending an enquiry.", href: "/partnerships", action: "Partnership information" },
  { title: "Contact the group", description: "Choose a family, institution, careers or general contact pathway.", href: "/connect", action: "Connect with Tagore" },
];

export default function GroupStartPage() {
  return (
    <>
      <section className="hero">
        <div className="shell" style={{ padding: "76px 0" }}>
          <div className="eyebrow" style={{ color: "var(--gold)" }}>Tagore Group · Gudha Gorji</div>
          <h1 className="serif" style={{ fontSize: "clamp(42px,6vw,68px)", maxWidth: 850 }}>Start with the information you need.</h1>
          <p className="lead" style={{ maxWidth: 720 }}>If you reached this page from a printed guide, community meeting or QR code, choose the pathway closest to your question. No login is required.</p>
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <div className="cards">
            {destinations.map((item) => (
              <article className="card" key={item.href}>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <Link prefetch={false} className="button" href={item.href} style={{ display: "inline-flex", marginTop: 18 }}>{item.action} ↗</Link>
              </article>
            ))}
          </div>
          <p style={{ marginTop: 28, color: "var(--muted)", fontSize: 12, lineHeight: 1.7 }}>This page is an information gateway only. A website enquiry does not confirm admission, a vacancy, partnership approval, appointment or automatic routing. Current details must be confirmed with the relevant institution.</p>
        </div>
      </section>
    </>
  );
}
