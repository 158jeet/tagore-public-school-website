"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
const institutions=["Tagore Bal Niketan","Tagore Smart School","Tagore Vedant Academy","Tagore PG College","Tagore Hostel","General group enquiry"];
type GroupEnquiryFormProps = { initialMessage?: string };
export function GroupEnquiryForm({ initialMessage = "" }: GroupEnquiryFormProps){
 const [busy,setBusy]=useState(false); const [status,setStatus]=useState(""); const [success,setSuccess]=useState(false); const [formStartedAt]=useState(()=>String(Date.now()));
 async function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault(); const form=event.currentTarget; const body=Object.fromEntries(new FormData(form).entries());body.form_started_at=formStartedAt;
  setBusy(true);setStatus("");setSuccess(false);
  try{const response=await fetch("/api/enquiry",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});const result=await response.json();if(!response.ok)throw new Error(result.message||"The enquiry service is not configured yet.");form.reset();setSuccess(true);}
  catch(error){setStatus(error instanceof Error?error.message:"We could not submit the enquiry. Please use the group social channels for now.");}
  finally{setBusy(false);}
 }
 return <form onSubmit={submit} className="group-form">
  <input type="hidden" name="form_started_at" value={formStartedAt}/><label aria-hidden="true" style={{position:"absolute",left:"-10000px",width:1,height:1,overflow:"hidden"}}><span>Leave this field empty</span><input name="website" tabIndex={-1} autoComplete="off"/></label><div className="form-grid">
   <label>Parent / enquirer name<input required name="name" autoComplete="name" maxLength={100} placeholder="Your full name"/></label>
   <label>Mobile number<input required name="mobile" type="tel" inputMode="tel" pattern="[0-9+() -]{8,18}" autoComplete="tel" maxLength={18} placeholder="Your contact number"/></label>
   <label>Email (optional)<input name="email" type="email" autoComplete="email" maxLength={150} placeholder="you@example.com"/></label>
   <label>Institution / area<select required name="institution" defaultValue=""><option value="" disabled>Select an institution</option>{institutions.map(x=><option key={x}>{x}</option>)}</select></label>
  </div>
  <label className="message-label">How can we help?<textarea required name="message" minLength={8} maxLength={1500} rows={5} defaultValue={initialMessage} placeholder="Tell us what information you need."/></label>
  <label className="consent"><input required type="checkbox" name="consent" value="yes"/> I agree that the Tagore Group may contact me about this enquiry.</label>
  <button className="button" disabled={busy}>{busy?"Sending…":"Send group enquiry ↗"}</button>
  {success?<div role="status" aria-live="polite" className="form-success-panel"><p style={{fontWeight:700,color:"var(--navy)"}}>Your group enquiry has been sent.</p><p style={{marginTop:8,fontSize:13,lineHeight:1.7,color:"var(--muted)"}}>Keep your phone available for a response using the contact details you provided. A request is not a confirmed admission, appointment or service booking.</p><Link href="/institutions" style={{display:"inline-block",marginTop:14,fontSize:12,fontWeight:700,color:"var(--navy)",textDecoration:"underline",textUnderlineOffset:4}}>Explore Tagore institutions</Link></div>:status&&<p role="alert" aria-live="assertive" className="form-error-panel form-status">{status}</p>}
  <p className="form-note">Please do not include identity numbers, financial details or sensitive medical information.</p>
 </form>;
}
