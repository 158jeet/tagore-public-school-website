import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, MessageCircle } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-json-ld";

const pathways = {
  "early-years": {
    title: "Early years admissions pathway",
    stage: "Nursery · LKG · UKG",
    description: "A helpful starting point for families exploring the first school experience. Use these prompts to discuss transition, everyday routines and the kind of support your child may need.",
    classes: ["Nursery", "LKG", "UKG"],
    questions: [
      "What age and document requirements apply for the class being considered?",
      "How is a new child and family introduced to the school routine?",
      "What does a typical day look like, including arrival, breaks and dispersal?",
      "How does the school communicate a child's adjustment and progress to parents?",
      "What should parents know about transport, fees and the admission process?"
    ]
  },
  "primary": {
    title: "Primary school admissions pathway",
    stage: "Classes 1–5",
    description: "Prepare for a conversation about the primary years. Ask how learning expectations, classroom routines, feedback and home–school communication are explained for the class you are considering.",
    classes: ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5"],
    questions: [
      "Which subjects and learning expectations apply to this class and academic year?",
      "How are reading, writing, numeracy and wider learning progress communicated?",
      "What homework or home-learning routine should families expect?",
      "How can parents raise a concern or ask for additional guidance?",
      "What are the current eligibility, fee, transport and admission requirements?"
    ]
  },
  "middle": {
    title: "Middle school admissions pathway",
    stage: "Classes 6–8",
    description: "Use this guide to explore the transition into the middle grades. The questions focus on subject learning, study habits, assessment and how families can stay informed.",
    classes: ["Class 6", "Class 7", "Class 8"],
    questions: [
      "Which subjects, languages and academic requirements apply to the class?",
      "How are assessment, feedback and academic progress explained to parents?",
      "What study habits and home-learning expectations should a learner prepare for?",
      "What support is available if a learner finds a subject challenging?",
      "How are timetable, transport, fees and admission requirements confirmed?"
    ]
  },
  "secondary": {
    title: "Secondary school admissions pathway",
    stage: "Classes 9–10",
    description: "For families considering the secondary grades, use these prompts to understand the current academic requirements, assessment approach and planning expectations before making a decision.",
    classes: ["Class 9", "Class 10"],
    questions: [
      "Which board, subjects and current academic-year requirements apply?",
      "How are internal assessment, practical work and examination preparation explained?",
      "How does the school communicate attendance, progress and academic concerns?",
      "What guidance is available when a learner needs help planning study time?",
      "Which documents, eligibility conditions, fees and deadlines should be confirmed?"
    ]
  },
  "senior-secondary": {
    title: "Senior secondary admissions pathway",
    stage: "Classes 11–12",
    description: "A focused guide for families exploring the senior secondary years. Discuss the current subject options, board requirements, academic support and longer-term study goals directly with the school.",
    classes: ["Class 11", "Class 12"],
    questions: [
      "Which subject combinations and eligibility requirements are currently offered?",
      "What board, practical and assessment requirements apply to the selected subjects?",
      "How are academic progress and subject-specific support communicated?",
      "How can families discuss higher-education or career-planning questions?",
      "What are the current admission dates, fees, documents and availability?"
    ]
  }
} as const;

type Stage = keyof typeof pathways;

export function generateStaticParams() {
  return Object.keys(pathways).map((stage) => ({ stage }));
}

export async function generateMetadata({ params }: { params: Promise<{ stage: string }> }): Promise<Metadata> {
  const { stage } = await params;
  const pathway = pathways[stage as Stage];
  if (!pathway) return { title: "Admissions pathway" };
  return {
    title: pathway.title,
    description: pathway.description,
    alternates: { canonical: `/admissions/pathways/${stage}` }
  };
}

export default async function AdmissionsPathwayPage({ params }: { params: Promise<{ stage: string }> }) {
  const { stage } = await params;
  const pathway = pathways[stage as Stage];
  if (!pathway) notFound();

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Admissions", path: "/admissions" }, { name: "Learning stages", path: "/admissions/pathways" }, { name: pathway.stage, path: `/admissions/pathways/${stage}` }]} />
      <section className="bg-navy py-20 text-white sm:py-24">
        <div className="container-shell">
          <Link href="/admissions/pathways" className="text-sm font-semibold text-gold underline underline-offset-4">All learning stages</Link>
          <p className="eyebrow mt-8 text-gold">Admissions pathway · {pathway.stage}</p>
          <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-tight sm:text-6xl">{pathway.title}</h1>
          <p className="mt-7 max-w-3xl text-base leading-8 text-white/70">{pathway.description}</p>
          <p className="mt-5 max-w-3xl text-xs leading-6 text-white/55">This guide helps you prepare questions. It does not confirm class availability, eligibility, fees, facilities or admission.</p>
        </div>
      </section>
      <section className="section-pad bg-cream">
        <div className="container-shell grid gap-12 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <p className="eyebrow text-gold">Choose the class</p>
            <h2 className="mt-4 font-serif text-3xl text-navy">Start with the class you are considering.</h2>
            <p className="mt-4 text-sm leading-7 text-ink/65">Choose a class to carry it into the enquiry form. The school office can confirm current requirements and availability.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              {pathway.classes.map((schoolClass) => (
                <Link key={schoolClass} href={`/admissions?class=${encodeURIComponent(schoolClass)}`} className="rounded-full border border-ink/15 bg-white px-5 py-3 text-sm font-semibold text-navy transition hover:border-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold">
                  {schoolClass} <ArrowRight className="ml-1 inline" size={15} aria-hidden="true" />
                </Link>
              ))}
            </div>
            <div className="mt-9 rounded-2xl border border-ink/10 bg-white p-6">
              <p className="font-semibold text-navy">Prefer to prepare first?</p>
              <p className="mt-2 text-sm leading-6 text-ink/60">Use the Parent Decision Centre to choose a topic for your conversation.</p>
              <Link href="/parent-guide" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-navy underline underline-offset-4">Open Parent Decision Centre <ArrowRight size={15}/></Link>
            </div>
          </div>
          <div>
            <p className="eyebrow text-gold">Questions for your school conversation</p>
            <h2 className="mt-4 font-serif text-3xl text-navy">What to ask before deciding.</h2>
            <ol className="mt-7 space-y-4">
              {pathway.questions.map((question, index) => (
                <li key={question} className="flex gap-4 rounded-2xl border border-ink/10 bg-white p-5">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-cream text-xs font-bold text-gold">0{index + 1}</span>
                  <p className="text-sm leading-7 text-ink/70">{question}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
      <section className="bg-mist py-14">
        <div className="container-shell flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div><h2 className="font-serif text-2xl text-navy">Continue the conversation.</h2><p className="mt-2 text-sm leading-6 text-ink/60">Send an enquiry or request a campus visit. Both are requests, not admission or booking confirmations.</p></div>
          <div className="flex flex-wrap gap-3">
            <Link href="/admissions" className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-bold text-navy"><MessageCircle size={16}/> Enquire</Link>
            <Link href="/visit" className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-3 text-sm font-semibold text-navy"><CalendarDays size={16}/> Request a visit</Link>
          </div>
        </div>
      </section>
    </>
  );
}
