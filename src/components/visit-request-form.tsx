"use client";
import { FormEvent,useState } from "react";
export function VisitRequestForm(){
 const [busy,setBusy]=useState(false);const [status,setStatus]=useState("");
 const today=new Date();const minDate=new Date(today.getTime()-today.getTimezoneOffset()*60000).toISOString().slice(0,10);
 async function submit(event:FormEvent<HTMLFormElement>){event.preventDefault();const form=event.currentTarget;const data=Object.fromEntries(new FormData(form).entries());data.enquiry_type="campus_visit";setBusy(true);setStatus("");
  try{const response=await fetch("/api/enquiry",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});const result=await response.json();if(!response.ok)throw new Error(result.message||"We could not submit your request.");form.reset();setStatus("Your visit request has been received. The school team will contact you to confirm a suitable time.");}
  catch(error){setStatus(error instanceof Error?error.message:"The visit request service is unavailable. Please contact the school directly.");}
  finally{setBusy(false);}
 }
 return <form onSubmit={submit} className="rounded-3xl bg-white p-7 text-ink shadow-soft sm:p-9"><div className="grid gap-5 sm:grid-cols-2">
 <label className="text-xs font-semibold text-ink/70">Parent / guardian name<input required name="parent_name" autoComplete="name" maxLength={100} className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-3 text-sm" placeholder="Your full name"/></label>
 <label className="text-xs font-semibold text-ink/70">Mobile number<input required name="mobile" type="tel" inputMode="tel" pattern="[0-9+() -]{8,18}" autoComplete="tel" maxLength={18} className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-3 text-sm" placeholder="Your contact number"/></label>
 <label className="text-xs font-semibold text-ink/70">Email (optional)<input name="email" type="email" maxLength={150} autoComplete="email" className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-3 text-sm" placeholder="you@example.com"/></label>
 <label className="text-xs font-semibold text-ink/70">Class of interest<select required name="class" defaultValue="" className="mt-2 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm"><option value="" disabled>Select class</option>{["Nursery","LKG","UKG",...Array.from({length:12},(_,i)=>"Class "+(i+1))].map(x=><option key={x}>{x}</option>)}</select></label>
 <label className="text-xs font-semibold text-ink/70">Preferred visit date<input required name="preferred_date" type="date" min={minDate} className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-3 text-sm"/></label>
 <label className="text-xs font-semibold text-ink/70">Preferred time<select required name="preferred_time" defaultValue="" className="mt-2 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm"><option value="" disabled>Select a time</option><option>Morning</option><option>Afternoon</option></select></label>
 </div><label className="mt-5 flex items-start gap-3 text-xs leading-5 text-ink/60"><input required type="checkbox" name="contact_consent" value="yes" className="mt-1 accent-[#c79b45]"/><span>I agree that the school may contact me to discuss and confirm this visit request.</span></label>
 <button disabled={busy} className="mt-7 w-full rounded-full bg-gold px-6 py-4 text-sm font-bold text-navy disabled:opacity-60">{busy?"Sending request…":"Request a campus visit"}</button>
 {status&&<p role="status" aria-live="polite" className="mt-4 text-sm text-ink/70">{status}</p>}
 <p className="mt-4 text-[11px] leading-5 text-ink/45">This is a visit request, not a confirmed appointment. The school team must confirm the date and time with you.</p></form>;
}