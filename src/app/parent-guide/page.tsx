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
    </>
  );
}
