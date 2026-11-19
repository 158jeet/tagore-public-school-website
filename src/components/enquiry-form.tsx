"use client";
import { FormEvent, useState } from "react";
export function EnquiryForm() {
 const [status,setStatus]=useState("");const [busy,setBusy]=useState(false);
 async function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();const form=event.currentTarget;const data=Object.fromEntries(new FormData(form).entries());
  setBusy(true);setStatus("");
  try{const response=await fetch("/api/enquiry",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});const result=await response.json();if(!response.ok)throw new Error(result.message||"We could not submit your enquiry.");form.reset();setStatus("Thank you. Your enquiry has been received.");}
  catch(error){setStatus(error instanceof Error?error.message:"We could not submit your enquiry right now. Please contact the school by phone or WhatsApp.");}
  finally{setBusy(false);}
 }
 return <form onSubmit={submit} className="rounded-3xl bg-white p-7 text-ink shadow-soft sm:p-9">
  <div className="grid gap-5 sm:grid-cols-2">
   <label className="text-xs font-semibold text-ink/70">Parent / guardian name<input required name="parent_name" autoComplete="name" maxLength={100} className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-3 text-sm outline-none focus:border-gold" placeholder="Your full name"/></label>
   <label className="text-xs font-semibold text-ink/70">Mobile number<input required name="mobile" type="tel" inputMode="tel" pattern="[0-9+() -]{8,18}" autoComplete="tel" maxLength={18} className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-3 text-sm outline-none focus:border-gold" placeholder="Your contact number"/></label>
   <label className="text-xs font-semibold text-ink/70">Email (optional)<input name="email" type="email" autoComplete="email" maxLength={150} className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-3 text-sm outline-none focus:border-gold" placeholder="you@example.com"/></label>
   <label className="text-xs font-semibold text-ink/70">Class seeking admission<select required name="class" defaultValue="" className="mt-2 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none focus:border-gold"><option value="" disabled>Select class</option>{["Nursery","LKG","UKG",...Array.from({length:12},(_,i)=>"Class "+(i+1))].map(item=><option key={item}>{item}</option>)}</select></label>
  </div>
  <label className="mt-5 flex items-start gap-3 text-xs leading-5 text-ink/60"><input required type="checkbox" name="contact_consent" value="yes" className="mt-1 accent-[#c79b45]"/><span>I agree that the school may contact me about this enquiry. I understand this is not an admission confirmation.</span></label>
  <button disabled={busy} className="mt-7 w-full rounded-full bg-gold px-6 py-4 text-sm font-bold text-navy hover:bg-navy hover:text-white disabled:opacity-60">{busy?"Sending enquiry…":"Submit admission enquiry"}</button>
  {status&&<p role="status" aria-live="polite" className="mt-4 text-sm text-ink/70">{status}</p>}
  <p className="mt-4 text-[11px] leading-5 text-ink/45">Please do not submit sensitive identity or medical documents through this form.</p>
 </form>;
}