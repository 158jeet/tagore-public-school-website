import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-json-ld";

export const metadata: Metadata = {
  title: "Admissions Pathways by Learning Stage",
  description: "Explore parent question guides for early years, primary, middle, secondary and senior secondary admissions at Tagore Public School.",
  alternates: { canonical: "/admissions/pathways" }
};

const stages = [
  { href: "/admissions/pathways/early-years", title: "Early years", classes: "Nursery · LKG · UKG", summary: "Prepare questions about transition, routines and parent communication." },
  { href: "/admissions/pathways/primary", title: "Primary", classes: "Classes 1–5", summary: "Explore learning expectations, feedback and home–school communication." },
  { href: "/admissions/pathways/middle", title: "Middle school", classes: "Classes 6–8", summary: "Discuss subject learning, assessment and study habits." },
  { href: "/admissions/pathways/secondary", title: "Secondary", classes: "Classes 9–10", summary: "Clarify current board requirements, assessment and academic planning." },
  { href: "/admissions/pathways/senior-secondary", title: "Senior secondary", classes: "Classes 11–12", summary: "Ask about subject options, requirements and longer-term study goals." }
];

export default function AdmissionsPathwaysIndexPage() {
  return <main>
    <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Admissions", path: "/admissions" }, { name: "Learning stages", path: "/admissions/pathways" }]} />
    <section className="bg-navy py-20 text-white">
      <div className="container-shell"><p className="eyebrow text-gold">Find your stage</p><h1 className="mt-5 max-w-4xl font-serif text-5xl leading-tight sm:text-6xl">A more useful admissions conversation starts with the right questions.</h1><p className="mt-6 max-w-3xl leading-8 text-white/70">Choose the learning stage closest to your question. Each guide helps you prepare for a conversation with the school; current programme, eligibility, fee and availability details must be confirmed by the school office.</p></div>
    </section>
    <section className="section-pad bg-cream"><div className="container-shell grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {stages.map((stage, index) => <article key={stage.href} className="rounded-3xl border border-ink/10 bg-white p-7">
        <p className="text-xs font-bold uppercase tracking-[.18em] text-gold">0{index + 1} · {stage.classes}</p><h2 className="mt-4 font-serif text-2xl text-navy">{stage.title}</h2><p className="mt-3 text-sm leading-7 text-ink/65">{stage.summary}</p><Link href={stage.href} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-navy underline underline-offset-4">Explore this stage <ArrowRightIcon/></Link>
      </article>)}
    </div></section>
  </main>;
}

function ArrowRightIcon() { return <span aria-hidden="true">↗</span>; }
