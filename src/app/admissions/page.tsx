import type { Metadata } from "next";
import { EnquiryForm } from "@/components/enquiry-form";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

const classOptions = ["Nursery", "LKG", "UKG", ...Array.from({ length: 12 }, (_, index) => "Class " + (index + 1))];
const topicOptions = new Set(["academics", "student-life", "transport", "residential", "fees", "campus", "other"]);

export const metadata: Metadata = { title: "Admissions 2026–27", description: "Enquire about admissions at Tagore Public School, Gudha Gorji.", alternates: { canonical: "/admissions" } };

type AdmissionsPageProps = {
  searchParams: Promise<{ class?: string | string[]; topic?: string | string[] }>;
};

export default async function AdmissionsPage({ searchParams }: AdmissionsPageProps) {
  const params = await searchParams;
  const requestedClass = Array.isArray(params.class) ? params.class[0] : params.class;
  const requestedTopic = Array.isArray(params.topic) ? params.topic[0] : params.topic;
  const initialClass = requestedClass && classOptions.includes(requestedClass) ? requestedClass : "";
  const initialTopic = requestedTopic && topicOptions.has(requestedTopic) ? requestedTopic : "";

  return <><section className="bg-navy py-20 text-white"><div className="container-shell"><p className="eyebrow text-gold">Admissions 2026–27</p><h1 className="mt-5 max-w-3xl font-serif text-5xl leading-tight sm:text-6xl">A confident start begins with a conversation.</h1><p className="mt-6 max-w-2xl leading-8 text-white/65">Tell us what you are looking for. Our school team can guide you through the enquiry and admission process.</p></div></section><section className="section-pad bg-cream"><div className="container-shell grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><h2 className="font-serif text-3xl text-navy">Your next steps</h2><ul className="mt-8 space-y-6">{["Send an enquiry with the class you are considering.","Speak with the school team about eligibility, availability and requirements.","Arrange a campus visit and understand the admission process.","Complete the formal application with the school office."].map((x)=><li key={x} className="flex gap-4"><CheckCircle2 className="mt-1 shrink-0 text-gold" size={21}/><span className="text-sm leading-7 text-ink/70">{x}</span></li>)}</ul><p className="mt-8 text-xs leading-6 text-ink/50">Submitting an online enquiry does not reserve a seat or confirm admission. Final admission is subject to the school’s official process and availability.</p><a href="/admissions/funnel" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy underline underline-offset-4">Explore the guided admissions journey →</a><div className="mt-8 rounded-2xl bg-white p-6"><p className="text-sm font-semibold text-navy">Call the CBSE school</p><a href="tel:+919462213490" className="mt-2 block text-xl font-semibold text-gold">+91 94622 13490</a><a href="mailto:tps_gudhagorji@yahoo.in" className="mt-2 block text-sm text-ink/60">tps_gudhagorji@yahoo.in</a></div></div><EnquiryForm initialClass={initialClass} initialTopic={initialTopic}/></div></section><section className="section-pad bg-mist"><div className="container-shell"><p className="eyebrow text-gold">Explore by learning stage</p><h2 className="mt-4 font-serif text-3xl text-navy">Find the questions that matter to your family.</h2><div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{[{href:"/admissions/pathways/early-years",label:"Early years · Nursery to UKG"},{href:"/admissions/pathways/primary",label:"Primary · Classes 1–5"},{href:"/admissions/pathways/middle",label:"Middle · Classes 6–8"},{href:"/admissions/pathways/secondary",label:"Secondary · Classes 9–10"},{href:"/admissions/pathways/senior-secondary",label:"Senior secondary · Classes 11–12"}].map((item)=><Link key={item.href} href={item.href} className="rounded-2xl border border-ink/10 bg-white p-5 text-sm font-semibold text-navy transition hover:border-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold">{item.label} ↗</Link>)}</div></div></section></>;
}
