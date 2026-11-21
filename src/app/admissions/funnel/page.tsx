import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, CalendarDays, CheckCircle2, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { EnquiryForm } from "@/components/enquiry-form";

export const metadata: Metadata = {
  title: "Admissions Enquiry | Tagore Public School, Gudha Gorji",
  description: "Explore the admission process at Tagore Public School. Ask about classes, learning, school life and arrange a conversation with the school team.",
  alternates: { canonical: "/admissions/funnel" },
  robots: { index: false, follow: true }
};

const decisionPoints = [
  { icon: BookOpen, title: "Understand the learning journey", text: "Ask about the class you are considering, the academic approach and the support available to learners." },
  { icon: ShieldCheck, title: "Discuss what matters to your family", text: "Talk through school routines, student life, transport, residential questions and the admission process." },
  { icon: CalendarDays, title: "See the school before deciding", text: "Request a campus visit and ask your questions directly. The school team will confirm a suitable date and time." }
];

const questions = [
  { q: "How do I enquire about a particular class?", a: "Submit the short form with the class you are considering. The school team can then discuss eligibility, current availability and the official admission requirements." },
  { q: "Can I visit the campus before applying?", a: "Yes. You can request a preferred date and time through the campus visit page. Your visit is scheduled only after the school team confirms it with you." },
  { q: "Does submitting this form confirm admission or reserve a seat?", a: "No. This form is an enquiry only. Admission and availability are subject to the school's official process and confirmation by the school office." },
  { q: "What information should I share?", a: "Please provide a parent or guardian contact, mobile number and class of interest. Do not submit identity documents, medical details or other sensitive information through this form." }
];

export default function AdmissionsFunnelPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy text-white">
        <div aria-hidden="true" className="absolute inset-0 -z-10" style={{ backgroundImage: "radial-gradient(ellipse at 82% 18%,rgba(199,155,69,.3),transparent 36%),linear-gradient(120deg,transparent 45%,rgba(255,255,255,.05))" }} />
        <div className="container-shell grid gap-12 py-20 lg:grid-cols-[1.12fr_.88fr] lg:items-center lg:py-28">
          <div className="max-w-2xl">
            <p className="eyebrow text-gold">Admissions 2026–27 · Gudha Gorji</p>
            <h1 className="mt-6 font-serif text-5xl leading-[1.06] tracking-tight sm:text-6xl">Choose with clarity. Start with a conversation.</h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-white/70 sm:text-lg">Every family has different questions when choosing a school. Tell us the class you are exploring and what matters most. The Tagore Public School team can help you understand the next steps.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#enquiry" className="inline-flex items-center gap-3 rounded-full bg-gold px-7 py-4 text-sm font-bold text-navy transition hover:bg-white">Enquire about admission <ArrowRight size={17}/></a>
              <Link href="/visit" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-4 text-sm font-semibold text-white transition hover:border-gold hover:text-gold">Plan a campus visit <CalendarDays size={16}/></Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/15 pt-6 text-xs text-white/65">
              <span className="flex items-center gap-2"><CheckCircle2 size={15} className="text-gold"/> Parent-focused guidance</span>
              <span className="flex items-center gap-2"><CheckCircle2 size={15} className="text-gold"/> Clear admission next steps</span>
              <span className="flex items-center gap-2"><CheckCircle2 size={15} className="text-gold"/> No admission promise from an enquiry</span>
            </div>
          </div>
          <aside className="rounded-[2rem] border border-white/15 bg-white/[.06] p-7 backdrop-blur-sm sm:p-9">
            <p className="eyebrow text-gold">A simple way to begin</p>
            <h2 className="mt-4 font-serif text-3xl leading-tight">Tell us what you are looking for.</h2>
            <p className="mt-4 text-sm leading-7 text-white/65">Share only the essentials. A member of the school team can discuss class, eligibility, availability and the official process with you.</p>
            <div className="mt-7 space-y-5">
              <div className="flex gap-4"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold/15 font-semibold text-white">01</span><div><p className="text-sm font-semibold">Choose the class</p><p className="mt-1 text-xs leading-5 text-white/55">Nursery through Class 12 options are available in the enquiry form.</p></div></div>
              <div className="flex gap-4"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold/15 font-semibold text-white">02</span><div><p className="text-sm font-semibold">Tell us your question</p><p className="mt-1 text-xs leading-5 text-white/55">Academics, student life, transport, residential questions or fees.</p></div></div>
              <div className="flex gap-4"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold/15 font-semibold text-white">03</span><div><p className="text-sm font-semibold">Speak with the school</p><p className="mt-1 text-xs leading-5 text-white/55">Discuss eligibility, availability and the next step.</p></div></div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section-pad bg-cream">
        <div className="container-shell">
          <div className="max-w-2xl"><p className="eyebrow text-gold">Make an informed decision</p><h2 className="mt-4 font-serif text-4xl leading-tight text-navy sm:text-5xl">The questions worth asking before you choose.</h2><p className="mt-5 leading-8 text-ink/65">A good school conversation should help you understand the everyday experience—not just collect a form. Use these prompts to guide your discussion with our team.</p></div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {decisionPoints.map(({icon:Icon,title,text},index)=><article key={title} className="rounded-3xl border border-ink/10 bg-white p-7 shadow-sm"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-cream text-gold"><Icon size={23}/></span><p className="mt-7 text-xs font-bold tracking-widest text-gold">0{index+1}</p><h3 className="mt-2 font-serif text-2xl text-navy">{title}</h3><p className="mt-4 text-sm leading-7 text-ink/65">{text}</p></article>)}
          </div>
        </div>
      </section>

      <section id="enquiry" className="section-pad scroll-mt-8 bg-mist">
        <div className="container-shell grid items-start gap-12 lg:grid-cols-[.78fr_1.22fr]">
          <div className="lg:sticky lg:top-10">
            <p className="eyebrow text-gold">Start your enquiry</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-navy sm:text-5xl">Let’s understand what your family needs.</h2>
            <p className="mt-6 leading-8 text-ink/65">Complete the short form. The school team can follow up using the contact details you provide. Submitting an enquiry does not confirm admission or reserve a seat.</p>
            <div className="mt-8 space-y-4 rounded-2xl border border-ink/10 bg-white p-6">
              <a href="tel:+919462213490" className="flex items-center gap-3 text-sm font-semibold text-navy"><Phone size={18} className="text-gold"/> +91 94622 13490</a>
              <a href="https://wa.me/919462213490" className="flex items-center gap-3 text-sm font-semibold text-navy" rel="noopener noreferrer"><MessageCircle size={18} className="text-gold"/> Ask the school on WhatsApp</a>
              <p className="text-xs leading-5 text-ink/55">Please verify current contact availability and response hours with the school office.</p>
            </div>
            <div className="mt-7 flex flex-col items-start gap-3">
              <Link href="/parent-guide" className="inline-flex items-center gap-2 text-sm font-semibold text-navy underline underline-offset-4">Explore the Parent Decision Centre <ArrowRight size={16}/></Link>
              <Link href="/admissions/parent-checklist" className="inline-flex items-center gap-2 text-sm font-semibold text-navy underline underline-offset-4">Use the parent admission checklist <ArrowRight size={16}/></Link>
              <Link href="/visit/guide" className="inline-flex items-center gap-2 text-sm font-semibold text-navy underline underline-offset-4">Prepare for a campus visit <ArrowRight size={16}/></Link>
              <Link href="/hostel/guide" className="inline-flex items-center gap-2 text-sm font-semibold text-navy underline underline-offset-4">Questions about residential life <ArrowRight size={16}/></Link>
            </div>
          </div>
          <EnquiryForm/>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-shell grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
          <div><p className="eyebrow text-gold">Before you enquire</p><h2 className="mt-4 font-serif text-4xl text-navy">A few useful answers.</h2><p className="mt-5 text-sm leading-7 text-ink/65">Still comparing options? Read our <Link className="font-semibold text-navy underline underline-offset-4" href="/admissions/faq">admissions FAQs</Link> or request a <Link className="font-semibold text-navy underline underline-offset-4" href="/visit">campus visit</Link>.</p></div>
          <div className="divide-y divide-ink/10 border-y border-ink/10">{questions.map(item=><details key={item.q} className="group py-5"><summary className="cursor-pointer list-none pr-8 font-semibold text-navy marker:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold">{item.q}<span aria-hidden="true" className="float-right text-gold group-open:rotate-45">+</span></summary><p className="mt-3 max-w-3xl text-sm leading-7 text-ink/65">{item.a}</p></details>)}</div>
        </div>
      </section>

      <section className="bg-navy py-14 text-white"><div className="container-shell flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center"><div><p className="eyebrow text-gold">Prefer to meet first?</p><h2 className="mt-3 font-serif text-3xl">See the school. Ask what matters.</h2></div><Link href="/visit" className="inline-flex items-center gap-3 rounded-full bg-gold px-7 py-4 text-sm font-bold text-navy">Request a campus visit <ArrowRight size={17}/></Link></div></section>
    </>
  );
}
