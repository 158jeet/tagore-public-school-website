import type { Metadata } from "next";
import Link from "next/link";
import { PrintChecklistButton } from "@/components/print-checklist-button";

export const metadata: Metadata = {
  title: "Parent Admission Checklist | Tagore Public School",
  description: "A practical checklist of questions families can use when exploring school admission at Tagore Public School, Gudha Gorji.",
  alternates: { canonical: "/admissions/parent-checklist" },
};

const sections = [
  { title: "1. Class and eligibility", items: ["Confirm the class and academic year you are enquiring about.", "Ask the school office to explain current age, previous-class and eligibility requirements.", "Confirm whether a place is currently available; availability can change."] },
  { title: "2. Learning and everyday school life", items: ["Ask how the curriculum and classroom learning are organised for the relevant class.", "Understand the school-day timings, attendance expectations and assessment approach.", "Ask how teachers communicate progress and how families can raise concerns.", "Discuss student support, co-curricular activities and the transition into a new class."] },
  { title: "3. Practical arrangements", items: ["Request the current approved fee schedule and payment dates directly from the school office.", "If needed, ask about transport routes, availability, timings and charges for your location.", "If considering residential arrangements, request a separate discussion about current facilities, supervision, routines and policies.", "Ask who to contact for academic, attendance, transport and fee-related questions."] },
  { title: "4. Campus visit", items: ["Request a visit for a date and time that suits your family.", "Ask which areas can be visited and whether a relevant staff member can answer your questions.", "Observe the learning environment and ask about safety, communication and daily routines.", "Remember: a visit request is not confirmed until the school team agrees the date and time."] },
  { title: "5. Documents and next steps", items: ["Ask the school for the current official document checklist for the class and admission stage.", "Confirm how and when documents should be submitted through the school's approved process.", "Ask about the application steps, decision timeline and whom to contact for updates.", "Do not send identity documents, medical records or sensitive information through a general website enquiry form."] },
];

export default function ParentAdmissionChecklistPage() {
  return (
    <main>
      <section className="bg-navy py-20 text-white">
        <div className="container-shell">
          <p className="eyebrow text-gold">A practical family guide</p>
          <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-tight sm:text-6xl">A clearer checklist for your school conversation.</h1>
          <p className="mt-6 max-w-2xl leading-8 text-white/65">Use these questions while comparing options, speaking with the school team or planning a campus visit. This is a general preparation guide—not an official admission, eligibility or document policy.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/admissions/funnel" className="rounded-full bg-gold px-6 py-3 text-sm font-bold text-navy">Ask an admission question</Link>
            <Link href="/visit" className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white print:hidden">Request a campus visit</Link>
            <PrintChecklistButton />
          </div>
        </div>
      </section>
      <section className="section-pad bg-cream print:bg-white print:py-6">
        <div className="container-shell max-w-4xl">
          <div className="mb-8 rounded-2xl border border-ink/10 bg-white p-6 text-sm leading-7 text-ink/65 print:border-0 print:p-0">Tip: save this page or print it for your family discussion. Confirm all current requirements, availability, fees and arrangements directly with the school office before making a decision.</div>
          <div className="space-y-6">
            {sections.map((section) => (
              <article key={section.title} className="rounded-3xl border border-ink/10 bg-white p-7 sm:p-9">
                <h2 className="font-serif text-2xl text-navy">{section.title}</h2>
                <ul className="mt-5 space-y-4">
                  {section.items.map((item) => <li key={item} className="flex gap-3 text-sm leading-7 text-ink/70"><span aria-hidden="true" className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded border border-gold text-xs text-gold">✓</span><span>{item}</span></li>)}
                </ul>
              </article>
            ))}
          </div>
          <div className="mt-8 rounded-3xl bg-navy p-8 text-white">
            <h2 className="font-serif text-3xl">Ready to ask your questions?</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/65">Share the class you are exploring and the topics you would like to discuss. An enquiry does not confirm admission or reserve a seat.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/admissions/funnel" className="rounded-full bg-gold px-6 py-3 text-sm font-bold text-navy">Start an enquiry ↗</Link>
              <Link href="/admissions/faq" className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white">Read admissions FAQs</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
