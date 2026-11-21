"use client";

import { useState } from "react";
import { ArrowUpRight, CalendarDays, CheckCircle2 } from "lucide-react";

const classes = ["Nursery", "LKG", "UKG", ...Array.from({ length: 12 }, (_, index) => "Class " + (index + 1))];
const topics = [
  { value: "academics", label: "Academic approach and learning support" },
  { value: "student-life", label: "School day and student life" },
  { value: "transport", label: "Transport and daily commute" },
  { value: "residential", label: "Residential / hostel questions" },
  { value: "fees", label: "Fees, eligibility and admission process" },
  { value: "campus", label: "Campus visit" },
  { value: "other", label: "Something else" }
];

const visitQuestions = [
  "What will my child’s learning journey look like in this class?",
  "How does the school communicate progress and concerns to parents?",
  "What does a typical school day involve?",
  "Which transport or residential options, if any, are relevant to our family?",
  "What are the current eligibility rules, fees and documents?"
];

export function ParentDecisionCentre() {
  const [schoolClass, setSchoolClass] = useState("");
  const [topic, setTopic] = useState("");
  const params = new URLSearchParams();
  if (schoolClass) params.set("class", schoolClass);
  if (topic) params.set("topic", topic);
  const query = params.toString();
  const enquiryHref = query ? "/admissions?" + query : "/admissions";
  const selectedTopic = topics.find((item) => item.value === topic);

  return (
    <section className="section-pad bg-mist">
      <div className="container-shell grid items-start gap-12 lg:grid-cols-[.9fr_1.1fr]">
        <div>
          <p className="eyebrow text-gold">The parent decision centre</p>
          <h2 className="mt-5 font-serif text-4xl leading-tight text-navy sm:text-5xl">Start with what matters to your family.</h2>
          <p className="mt-6 leading-8 text-ink/65">A school decision is personal. Choose the class you are considering and the question you want to discuss. We’ll carry that context into your enquiry so the conversation can start in the right place.</p>
          <div className="mt-9 rounded-3xl bg-white p-7">
            <h3 className="font-serif text-2xl text-navy">Questions worth asking on a visit</h3>
            <ul className="mt-6 space-y-4">
              {visitQuestions.map((question) => (
                <li key={question} className="flex gap-3 text-sm leading-6 text-ink/70">
                  <CheckCircle2 className="mt-1 shrink-0 text-gold" size={18} />
                  <span>{question}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-3xl border border-ink/10 bg-white p-7 shadow-soft sm:p-9">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-gold">Your next step</p>
          <h3 className="mt-3 font-serif text-3xl text-navy">Let’s make the first conversation useful.</h3>
          <div className="mt-8 space-y-6">
            <label htmlFor="parent-guide-class" className="block text-xs font-semibold text-ink/70">
              1. Which class are you exploring?
              <select id="parent-guide-class" aria-describedby="parent-guide-class-help" value={schoolClass} onChange={(event) => setSchoolClass(event.target.value)} className="mt-2 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none focus:border-gold focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2">
                <option value="">Select a class (optional)</option>
                {classes.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
              <span id="parent-guide-class-help" className="mt-2 block text-xs font-normal leading-5 text-ink/55">You can leave this blank and choose a class on the next step.</span>
            </label>
            <label htmlFor="parent-guide-topic" className="block text-xs font-semibold text-ink/70">
              2. What would you most like to discuss?
              <select id="parent-guide-topic" aria-describedby="parent-guide-topic-help" value={topic} onChange={(event) => setTopic(event.target.value)} className="mt-2 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none focus:border-gold focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2">
                <option value="">Choose a topic (optional)</option>
                {topics.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
              </select>
              <span id="parent-guide-topic-help" className="mt-2 block text-xs font-normal leading-5 text-ink/55">This helps the school understand your question; it does not determine eligibility.</span>
            </label>
          </div>
          <div className="mt-7 rounded-2xl bg-cream p-5" aria-live="polite">
            <p className="text-[10px] font-bold uppercase tracking-[.18em] text-ink/45">Your enquiry will include</p>
            <p className="mt-2 text-sm leading-6 text-navy">
              {schoolClass ? schoolClass : "The class you are considering"}
              {selectedTopic ? " · " + selectedTopic.label : " · The question you want to discuss"}
            </p>
          </div>
          <a href={enquiryHref} className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-4 text-sm font-bold text-navy transition hover:bg-navy hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy">
            Continue to admission enquiry <ArrowUpRight size={17} />
          </a>
          <a href="/visit" className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink/15 px-6 py-4 text-sm font-semibold text-navy transition hover:border-gold hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy">
            <CalendarDays size={17} /> Request a campus visit
          </a>
          <p className="mt-5 text-[11px] leading-5 text-ink/45">This guide does not indicate seat availability or confirm admission. The school team will confirm current eligibility, fees, options and availability. Please do not share sensitive identity or medical documents online.</p>
        </div>
      </div>
    </section>
  );
}
