import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Residential Life: A Family Discussion Guide | Tagore",
  description: "Questions families can ask when exploring residential or hostel arrangements through Tagore.",
  alternates: { canonical: "/hostel/guide" },
  robots: { index: false, follow: true },
};

const topics = [
  { title: "Care and supervision", items: ["Who is responsible for student supervision during the day and night?", "How are attendance, movement and visitor access managed?", "How can a parent reach the responsible staff member in an urgent situation?"] },
  { title: "Daily life and wellbeing", items: ["What does a typical weekday and weekend routine look like?", "How are meals, rest, study time and recreation organised?", "What is the process if a student feels unwell or needs additional support?"] },
  { title: "Facilities and practical details", items: ["Which accommodation, washroom and common facilities are currently available?", "What are the current residential fees, inclusions and payment terms?", "What should a family bring, and what items are not permitted?"] },
  { title: "Communication and policies", items: ["How often do staff communicate with parents about student wellbeing?", "What are the current leave, visit and emergency-contact procedures?", "Can the family review the written rules and grievance process before deciding?"] },
];

export default function HostelFamilyGuidePage() {
  return (
    <main>
      <section className="bg-navy py-20 text-white">
        <div className="container-shell">
          <p className="eyebrow text-gold">For families exploring residential life</p>
          <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-tight sm:text-6xl">The right questions matter when home is farther away.</h1>
          <p className="mt-6 max-w-2xl leading-8 text-white/65">Use this guide to structure a direct conversation with the responsible team before making a residential decision.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/visit" className="rounded-full bg-gold px-6 py-3 text-sm font-bold text-navy">Request a campus conversation</Link>
            <Link href="/admissions/funnel" className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white">Ask a question</Link>
          </div>
        </div>
      </section>
      <section className="section-pad bg-white">
        <div className="container-shell">
          <div className="max-w-3xl">
            <p className="eyebrow text-gold">Existing TPS hostel description</p>
            <h2 className="mt-5 font-serif text-4xl text-navy">A residential environment with routines, supervision and support.</h2>
            <p className="mt-6 leading-8 text-ink/70">The existing Tagore Public School website describes separate hostel facilities for boys and girls, triple- and quadruple-occupancy rooms, attached washrooms and balconies in many rooms, and centrally air-cooled accommodation.</p>
            <p className="mt-5 leading-8 text-ink/70">It also describes house-in-charge supervision, hostel superintendents overseeing daily routines, additional classes for difficult subjects, an on-campus medical facility and male and female psychological counsellors.</p>
          </div>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {["Separate boys’ and girls’ accommodation","Triple- and quadruple-occupancy rooms","Attached washrooms and balconies in many rooms","House-in-charge and superintendent supervision","Additional academic support classes","On-campus medical and counselling support"].map((item,index)=><article key={item} className="rounded-2xl border border-ink/10 bg-cream p-6"><p className="eyebrow text-gold">0{index+1}</p><p className="mt-3 text-sm font-semibold leading-6 text-navy">{item}</p></article>)}
          </div>
          <div className="mt-7 rounded-2xl border border-amber-300 bg-cream p-6 text-sm leading-7 text-ink/70"><strong className="text-navy">Prototype note:</strong> These details are carried forward from the legacy TPS hostel page for management review. They are not a guarantee of current room types, staffing, medical arrangements or availability. Families should obtain current written policies and visit the hostel before deciding. <a className="ml-1 font-semibold text-navy underline underline-offset-2" href="https://www.tpsgudhagorji.com/hostel/" target="_blank" rel="noreferrer">View original hostel page ↗</a></div>
        </div>
      </section>
      <section className="section-pad bg-cream">
        <div className="container-shell grid gap-5 md:grid-cols-2">
          {topics.map((topic) => <article key={topic.title} className="rounded-3xl border border-ink/10 bg-white p-7"><h2 className="font-serif text-2xl text-navy">{topic.title}</h2><ul className="mt-5 space-y-3">{topic.items.map((item) => <li key={item} className="flex gap-3 text-sm leading-7 text-ink/70"><span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gold" />{item}</li>)}</ul></article>)}
        </div>
        <div className="container-shell mt-8 max-w-4xl rounded-3xl border border-amber-300 bg-white p-7 text-sm leading-7 text-ink/70">
          <strong className="text-navy">Important:</strong> This page is a family question guide, not a description or guarantee of current hostel facilities, supervision, fees, availability or policies. Obtain current written details directly from the institution and visit in person before deciding. Do not submit a child’s medical, identity or other sensitive records through a general website enquiry form.
        </div>
      </section>
    </main>
  );
}
