import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Plan Your School Visit | Tagore Public School",
  description: "A practical guide to preparing questions and requesting a campus conversation with Tagore Public School.",
  alternates: { canonical: "/visit/guide" },
  robots: { index: false, follow: true },
};

const prompts = [
  { title: "Learning and teaching", questions: ["How is learning organised for the class we are considering?", "How are progress, attendance and concerns communicated to families?", "What support is available when a student needs additional help?"] },
  { title: "Daily routines", questions: ["What are the current school timings and daily routines?", "Which co-curricular opportunities are available for this class?", "Who should parents contact for academic or pastoral questions?"] },
  { title: "Practical arrangements", questions: ["Can the office explain the current fee schedule and payment dates?", "Are transport arrangements available for our area, and what are the current terms?", "If residential options are relevant, whom should we meet to discuss them?"] },
  { title: "Safety and communication", questions: ["What visitor check-in and campus safety procedures should families know?", "How can parents raise a concern and receive an update?", "Which areas can be visited, and will a relevant staff member be available?"] },
];

export default function VisitGuidePage() {
  return (
    <main>
      <section className="bg-navy py-20 text-white">
        <div className="container-shell">
          <p className="eyebrow text-gold">Make your visit useful</p>
          <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-tight sm:text-6xl">Bring your questions. Leave with a clearer picture.</h1>
          <p className="mt-6 max-w-2xl leading-8 text-white/65">A school visit is a chance to speak directly with the team and understand whether the environment and arrangements fit your family’s needs. Use this guide to prepare.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/visit" className="rounded-full bg-gold px-6 py-3 text-sm font-bold text-navy">Request a campus visit</Link>
            <Link href="/admissions/parent-checklist" className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white">Parent admission checklist</Link>
          </div>
        </div>
      </section>
      <section className="section-pad bg-cream">
        <div className="container-shell grid gap-5 md:grid-cols-2">
          {prompts.map((group) => (
            <article key={group.title} className="rounded-3xl border border-ink/10 bg-white p-7">
              <h2 className="font-serif text-2xl text-navy">{group.title}</h2>
              <ul className="mt-5 space-y-3">{group.questions.map((question) => <li key={question} className="flex gap-3 text-sm leading-7 text-ink/70"><span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gold" />{question}</li>)}</ul>
            </article>
          ))}
        </div>
        <div className="container-shell mt-8 max-w-4xl rounded-3xl bg-navy p-8 text-white">
          <h2 className="font-serif text-3xl">Before you travel</h2>
          <p className="mt-3 text-sm leading-7 text-white/70">Submit a preferred date and time through the visit request page. A request is not a confirmed appointment: please wait for the school team to contact you and confirm the arrangements. Ask the office about current availability, directions and who will meet you.</p>
          <p className="mt-4 text-sm text-white/70">This is a general preparation guide, not a statement of current facilities, policies, timings or admission eligibility.</p>
        </div>
      </section>
    </main>
  );
}
