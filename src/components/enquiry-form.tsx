"use client";
import { FormEvent, useState } from "react";

const classOptions = ["Nursery", "LKG", "UKG", ...Array.from({ length: 12 }, (_, index) => "Class " + (index + 1))];
const topicOptions = [
  { value: "academics", label: "Academic approach and learning support" },
  { value: "student-life", label: "School day and student life" },
  { value: "transport", label: "Transport and daily commute" },
  { value: "residential", label: "Residential / hostel questions" },
  { value: "fees", label: "Fees, eligibility and admission process" },
  { value: "campus", label: "Campus visit" },
  { value: "other", label: "Something else" }
];

type EnquiryFormProps = { initialClass?: string; initialTopic?: string };

export function EnquiryForm({ initialClass = "", initialTopic = "" }: EnquiryFormProps) {
 const [status,setStatus]=useState("");const [success,setSuccess]=useState(false);const [busy,setBusy]=useState(false);const [formStartedAt]=useState(()=>String(Date.now()));
 const safeClass = classOptions.includes(initialClass) ? initialClass : "";
 const safeTopic = topicOptions.some((item) => item.value === initialTopic) ? initialTopic : "";
 async function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();const form=event.currentTarget;const data=Object.fromEntries(new FormData(form).entries());data.form_started_at=formStartedAt;
  setBusy(true);setStatus("");setSuccess(false);
  try{const response=await fetch("/api/enquiry",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});const result=await response.json();if(!response.ok)throw new Error(result.message||"We could not submit your enquiry.");form.reset();setSuccess(true);}
  catch(error){setStatus(error instanceof Error?error.message:"We could not submit your enquiry right now. Please contact the school by phone or WhatsApp.");}
  finally{setBusy(false);}
 }
 return <form onSubmit={submit} className="rounded-3xl bg-white p-7 text-ink shadow-soft sm:p-9">
  <input type="hidden" name="form_started_at" value={formStartedAt}/><label aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden"><span>Leave this field empty</span><input name="website" tabIndex={-1} autoComplete="off"/></label><div className="grid gap-5 sm:grid-cols-2">
   <label className="text-xs font-semibold text-ink/70">Parent / guardian name<input required name="parent_name" autoComplete="name" maxLength={100} className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-3 text-sm outline-none focus:border-gold" placeholder="Your full name"/></label>
   <label className="text-xs font-semibold text-ink/70">Mobile number<input required name="mobile" type="tel" inputMode="tel" pattern="[0-9+() -]{8,18}" autoComplete="tel" maxLength={18} className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-3 text-sm outline-none focus:border-gold" placeholder="Your contact number"/></label>
   <label className="text-xs font-semibold text-ink/70">Email (optional)<input name="email" type="email" autoComplete="email" maxLength={150} className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-3 text-sm outline-none focus:border-gold" placeholder="you@example.com"/></label>
   <label className="text-xs font-semibold text-ink/70">Class seeking admission<select required name="class" defaultValue={safeClass} className="mt-2 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none focus:border-gold"><option value="" disabled>Select class</option>{classOptions.map(item=><option key={item}>{item}</option>)}</select></label>
   <label className="text-xs font-semibold text-ink/70 sm:col-span-2">What would you like to discuss? (optional)<select name="enquiry_topic" defaultValue={safeTopic} className="mt-2 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none focus:border-gold"><option value="">Choose a topic</option>{topicOptions.map(item=><option key={item.value} value={item.value}>{item.label}</option>)}</select></label>
  </div>
  <label className="mt-5 flex items-start gap-3 text-xs leading-5 text-ink/60"><input required type="checkbox" name="contact_consent" value="yes" className="mt-1 accent-[#c79b45]"/><span>I agree that the school may contact me about this enquiry. I understand this is not an admission confirmation.</span></label>
  <button disabled={busy} className="mt-7 w-full rounded-full bg-gold px-6 py-4 text-sm font-bold text-navy hover:bg-navy hover:text-white disabled:opacity-60">{busy?"Sending enquiry…":"Submit admission enquiry"}</button>
  {success?<div role="status" aria-live="polite" className="form-success-panel mt-5"><p className="font-semibold text-navy">Your enquiry has been sent.</p><p className="mt-2 text-sm leading-6 text-ink/70">The school team can use the contact details you provided to follow up. This message is not an admission offer or seat confirmation.</p><div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold"><a className="text-navy underline underline-offset-4" href="/admissions/faq">Read admissions FAQs</a><a className="text-navy underline underline-offset-4" href="/visit">Request a campus visit</a></div></div>:status&&<p role="alert" aria-live="assertive" className="form-error-panel mt-4 text-sm">{status}</p>}
  <p className="mt-4 text-[11px] leading-5 text-ink/45">Please do not submit sensitive identity or medical documents through this form.</p>
 </form>;
}
