import { NextResponse } from "next/server";
export async function POST(request:Request){
 const key=process.env.WEB3FORMS_ACCESS_KEY;
 if(!key)return NextResponse.json({message:"The group enquiry form is not connected yet. Please contact the Tagore Group through its official social channels."},{status:503});
 let data:Record<string,unknown>;
 try{data=await request.json();}catch{return NextResponse.json({message:"Invalid form submission."},{status:400});}
 const name=typeof data.name==="string"?data.name.trim():"";
 const mobile=typeof data.mobile==="string"?data.mobile.trim():"";
 const email=typeof data.email==="string"?data.email.trim():"";
 const institution=typeof data.institution==="string"?data.institution.trim():"";
 const message=typeof data.message==="string"?data.message.trim():"";
 if(name.length<2||name.length>100||!/^[0-9+() -]{8,18}$/.test(mobile)||!institution||message.length<8||message.length>1500||data.consent!=="yes")return NextResponse.json({message:"Please check the required fields and try again."},{status:400});
 if(email&&(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||email.length>150))return NextResponse.json({message:"Please enter a valid email address."},{status:400});
 const payload=new FormData();payload.set("access_key",key);payload.set("subject","New Tagore Group website enquiry");payload.set("from_name","Tagore Group Website");payload.set("name",name);payload.set("mobile",mobile);payload.set("email",email);payload.set("institution",institution);payload.set("message",message);
 try{const response=await fetch("https://api.web3forms.com/submit",{method:"POST",body:payload,cache:"no-store"});const result=await response.json();if(!response.ok||!result.success)return NextResponse.json({message:"We could not deliver your enquiry. Please try again later."},{status:502});return NextResponse.json({success:true});}
 catch{return NextResponse.json({message:"The enquiry service is temporarily unavailable."},{status:502});}
}