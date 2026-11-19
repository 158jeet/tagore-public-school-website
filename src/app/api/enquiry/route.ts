import { NextResponse } from "next/server";
export async function POST(request:Request){
 const key=process.env.WEB3FORMS_ACCESS_KEY;
 if(!key)return NextResponse.json({message:"The online enquiry form is not connected yet. Please contact the school by phone or WhatsApp."},{status:503});
 let data:Record<string,unknown>;try{data=await request.json();}catch{return NextResponse.json({message:"Invalid form submission."},{status:400});}
 const parent=typeof data.parent_name==="string"?data.parent_name.trim():"";
 const mobile=typeof data.mobile==="string"?data.mobile.trim():"";
 const email=typeof data.email==="string"?data.email.trim():"";
 const schoolClass=typeof data.class==="string"?data.class.trim():"";
 if(parent.length<2||parent.length>100||!/^[0-9+() -]{8,18}$/.test(mobile)||!schoolClass||data.contact_consent!=="yes")return NextResponse.json({message:"Please check the required fields and try again."},{status:400});
 if(email&&(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||email.length>150))return NextResponse.json({message:"Please enter a valid email address."},{status:400});
 const payload=new FormData();payload.set("access_key",key);payload.set("subject","New Tagore Public School admission enquiry");payload.set("from_name","Tagore Public School Website");payload.set("parent_name",parent);payload.set("mobile",mobile);payload.set("email",email);payload.set("class",schoolClass);
 try{const response=await fetch("https://api.web3forms.com/submit",{method:"POST",body:payload,cache:"no-store"});const result=await response.json();if(!response.ok||!result.success)return NextResponse.json({message:"We could not deliver your enquiry. Please try again or contact the school directly."},{status:502});return NextResponse.json({success:true});}
 catch{return NextResponse.json({message:"The enquiry service is temporarily unavailable. Please contact the school directly."},{status:502});}
}