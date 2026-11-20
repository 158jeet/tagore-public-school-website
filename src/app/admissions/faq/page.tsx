import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admissions FAQs",
  description: "Answers to common questions families may have while exploring Tagore Public School, Gudha Gorji.",
  alternates: { canonical: "/admissions/faq" },
};

const faqs = [
  { q: "How do I begin an admission enquiry?", a: "Use the online admissions form or contact the school office. Share the class you are considering and the school team can explain the current process and next steps." },
  { q: "Which classes are currently open for admission?", a: "Class availability can change during the academic year. Please contact the school directly to confirm current openings and eligibility for the class you are considering." },
  { q: "How can I understand the fee structure?", a: "The school office can provide the current approved fee details and explain any applicable components. Please rely on the latest information shared directly by the school." },
  { q: "Can I visit the campus before deciding?", a: "Yes. You can submit a campus visit request through the website. A requested date is not confirmed until the school team contacts you and agrees the visit details." },
  { q: "How can I ask about transport or residential arrangements?", a: "Mention transport or residential questions in your enquiry. The school team can explain the arrangements that are currently available and relevant to your location and class." },
  { q: "What documents should I prepare?", a: "The school office will share the current document checklist for the relevant class and admission stage. Do not upload identity documents or sensitive records through the general enquiry form." },
  { q: "Does submitting an online form confirm admission or reserve a seat?", a: "No. An online enquiry is a request for information and follow-up. Admission and seat availability are confirmed only through the school's official process." },
  { q: "How will the school respond to my enquiry?", a: "The school team will use the contact details you provide to follow up, subject to the contact consent shown on the form. If you need immediate assistance, call the school office." },
];

export default function AdmissionsFaqPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="bg-navy py-20 text-white">
        <div className="container-shell">
          <p className="eyebrow text-gold">Helpful answers for families</p>
          <h1 className="mt-5 max-w-3xl font-serif text-5xl leading-tight sm:text-6xl">Admissions questions, answered clearly.</h1>
          <p className="mt-6 max-w-2xl leading-8 text-white/65">Use these answers as a starting point. The school office can confirm current eligibility, fees, availability and requirements.</p>
        </div>
      </section>
      <section className="section-pad bg-cream">
        <div className="container-shell max-w-4xl">
          <div className="divide-y divide-ink/10 rounded-3xl border border-ink/10 bg-white px-7 sm:px-10">
            {faqs.map(({ q, a }) => (
              <details key={q} className="group py-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-5 font-semibold text-navy marker:content-none">
                  <span>{q}</span>
                  <span aria-hidden="true" className="text-xl text-gold transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-ink/65">{a}</p>
              </details>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/admissions" className="rounded-full bg-gold px-6 py-3 text-sm font-bold text-navy">Ask an admission question ↗</Link>
            <Link href="/visit" className="rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold text-navy">Request a campus visit</Link>
          </div>
          <p className="mt-6 text-xs leading-6 text-ink/45">Information is general guidance, not a guarantee of admission, fees, services or seat availability. Confirm current details directly with the school.</p>
        </div>
      </section>
    </>
  );
}
