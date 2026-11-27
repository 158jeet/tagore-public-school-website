import type { Metadata } from "next";
import Link from "next/link";
import { ParentDecisionCentre } from "@/components/parent-decision-centre";

export const metadata: Metadata = {
  title: "Parent Guide",
  description: "A practical guide for families exploring classes, school fit, admissions questions and a campus visit at Tagore Public School, Gudha Gorji.",
  alternates: { canonical: "/parent-guide" }
};

export default function ParentGuidePage() {
  return (
    <>
      <section className="bg-navy py-20 text-white">
        <div className="container-shell">
          <p className="eyebrow text-gold">For parents and guardians</p>
          <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-tight sm:text-6xl">Choose with clarity. Begin with a conversation.</h1>
          <p className="mt-6 max-w-2xl leading-8 text-white/65">Explore the questions that matter, tell us which class you are considering and take the next step at your own pace.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#decision-centre" className="rounded-full bg-gold px-6 py-3 text-sm font-bold text-navy">Build your enquiry ↗</a>
            <Link href="/admissions" className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white">Admission process</Link>
            <Link href="/admissions/faq" className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white">Admissions FAQs</Link>
          </div>
        </div>
      </section>
      <div id="decision-centre"><ParentDecisionCentre /></div>
      <section className="section-pad bg-cream">
        <div className="container-shell grid gap-8 md:grid-cols-2">
          <article className="rounded-3xl bg-white p-8">
            <p className="eyebrow text-gold">Before you decide</p>
            <h2 className="mt-4 font-serif text-3xl text-navy">Ask for the details that affect your child.</h2>
            <p className="mt-4 text-sm leading-7 text-ink/65">Ask the school team to explain current class eligibility, learning expectations, the school day, parent communication, fees and any transport or residential arrangements relevant to your family.</p>
            <Link href="/admissions/faq" className="mt-5 inline-flex text-sm font-bold text-navy hover:text-gold">Read admissions FAQs ↗</Link>
          </article>
          <article className="rounded-3xl bg-white p-8">
            <p className="eyebrow text-gold">A real-world next step</p>
            <h2 className="mt-4 font-serif text-3xl text-navy">See the environment for yourself.</h2>
            <p className="mt-4 text-sm leading-7 text-ink/65">A campus visit gives you the opportunity to ask questions directly. A requested visit is not confirmed until the school team contacts you.</p>
            <Link href="/visit" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-navy hover:text-gold">Request a campus visit ↗</Link>
          </article>
        </div>
      </section>
      <section className="section-pad bg-white">
        <div className="container-shell">
          <div className="max-w-3xl">
            <p className="eyebrow text-gold">Student safety and accountability</p>
            <h2 className="mt-4 font-serif text-4xl text-navy">Protection, anti-bullying and grievance channels.</h2>
            <p className="mt-5 leading-8 text-ink/65">The existing TPS website publishes committee documents for the 2026–27 session covering child protection (POCSO), anti-bullying and grievance redressal. Families can review the published documents and ask the school office about the current reporting process and designated contact route.</p>
          </div>
          <div className="mt-9 grid gap-4 md:grid-cols-3">
            <a href="https://www.tpsgudhagorji.com/wp-content/uploads/2026/06/Child-Protection-Committee-POSCO.pdf" target="_blank" rel="noreferrer" className="rounded-3xl border border-ink/10 bg-cream p-7"><p className="eyebrow text-gold">01 · Child protection</p><h3 className="mt-3 font-serif text-2xl text-navy">POCSO Committee</h3><p className="mt-3 text-sm leading-7 text-ink/60">View the published child-protection committee document for 2026–27 ↗</p></a>
            <a href="https://www.tpsgudhagorji.com/wp-content/uploads/2026/06/Anti-Bullying-Committee.pdf" target="_blank" rel="noreferrer" className="rounded-3xl border border-ink/10 bg-cream p-7"><p className="eyebrow text-gold">02 · Student wellbeing</p><h3 className="mt-3 font-serif text-2xl text-navy">Anti-Bullying Committee</h3><p className="mt-3 text-sm leading-7 text-ink/60">View the published anti-bullying committee document for 2026–27 ↗</p></a>
            <a href="https://www.tpsgudhagorji.com/wp-content/uploads/2026/06/Grievance-Redressal-Committee.pdf" target="_blank" rel="noreferrer" className="rounded-3xl border border-ink/10 bg-cream p-7"><p className="eyebrow text-gold">03 · Accountability</p><h3 className="mt-3 font-serif text-2xl text-navy">Grievance Redressal</h3><p className="mt-3 text-sm leading-7 text-ink/60">View the published grievance redressal committee document for 2026–27 ↗</p></a>
          </div>
          <p className="mt-7 text-xs leading-6 text-ink/50">The linked documents contain member names and contact numbers. The school must confirm that the committee lists, phone numbers and reporting procedure are still current before these links are promoted as the active safeguarding route.</p>
        </div>
      </section>
    </>
  );
}
