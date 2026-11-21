import type { ReactNode } from "react";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-json-ld";

export const metadata = {
  title: "Choose Your Pathway | Tagore Group",
  description: "Find the Tagore Group institution pathway for school education, competitive learning, higher education or residential life.",
  alternates: { canonical: "/choose" },
};

const pathways = [
  { eyebrow: "School education", title: "A school for the next stage", description: "Explore the group’s school pathways, including CBSE and RBSE institutions. Confirm current classes, eligibility and admissions directly with the relevant school.", links: [{ label: "Tagore Public School · CBSE", href: "https://www.tpsgudhagorji.com" }, { label: "Tagore Bal Niketan · RBSE", href: "/institutions/tagore-bal-niketan" }, { label: "Tagore Smart School · RBSE", href: "/institutions/tagore-smart-school" }] },
  { eyebrow: "Competitive learning", title: "Focused academic preparation", description: "Explore the Tagore Vedant Academy pathway for pre-foundation and competitive learning enquiries. Programme details and current availability should be confirmed with the academy.", links: [{ label: "Tagore Vedant Academy", href: "/institutions/tagore-vedant-academy" }] },
  { eyebrow: "Higher education", title: "Explore college-level learning", description: "For higher education and college programme questions, connect with the institution and ask for its current programme and admission information.", links: [{ label: "Tagore PG College", href: "/institutions/tagore-pg-college" }] },
  { eyebrow: "Residential life", title: "Questions about student residence", description: "Families considering residential arrangements should request a direct discussion about current availability, supervision, routines, policies and charges.", links: [{ label: "Tagore Hostel", href: "/institutions/tagore-hostel" }] },
];

function PathLink({ href, children }: { href: string; children: ReactNode }) {
  return href.startsWith("http") ? <a className="inline-flex items-center rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold text-navy hover:border-gold" href={href} target="_blank" rel="noopener noreferrer">{children} ↗</a> : <Link className="inline-flex items-center rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold text-navy hover:border-gold" href={href}>{children} ↗</Link>;
}

export default function ChoosePathwayPage() {
  return (
    <main>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Choose a pathway", path: "/choose" }]} />
      <section className="hero">
        <div className="shell" style={{ padding: "90px 0" }}>
          <div className="eyebrow" style={{ color: "var(--gold)" }}>Find your next step</div>
          <h1 className="serif" style={{ fontSize: "clamp(42px,6vw,68px)", maxWidth: 850 }}>Start with the journey you have in mind.</h1>
          <p className="lead" style={{ maxWidth: 720 }}>The Tagore Group includes institutions with different purposes. Choose the pathway closest to your question, then contact the relevant institution for current and verified details.</p>
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <div className="cards">
            {pathways.map((pathway, index) => (
              <article className="card" key={pathway.eyebrow}>
                <span className="number">0{index + 1}</span>
                <div className="eyebrow" style={{ color: "var(--gold)", marginTop: 20 }}>{pathway.eyebrow}</div>
                <h2>{pathway.title}</h2>
                <p>{pathway.description}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 22 }}>
                  {pathway.links.map((link) => <PathLink key={link.href} href={link.href}>{link.label}</PathLink>)}
                </div>
              </article>
            ))}
          </div>
          <div className="card" style={{ marginTop: 28 }}>
            <h2>Not sure which institution to contact?</h2>
            <p>Send a general group enquiry and describe the programme, partnership or question you have in mind. The selected pathway helps provide context; it does not guarantee automatic routing or a response time.</p>
            <Link className="button" href="/connect" style={{ marginTop: 18 }}>Connect with the group ↗</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
