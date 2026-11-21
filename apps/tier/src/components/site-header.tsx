"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
const links=[{href:"/about",label:"Our story"},{href:"/institutions",label:"Institutions"},{href:"/choose",label:"Explore pathways"},{href:"/connect",label:"Connect"}];
export function GroupSiteHeader(){
 const [open,setOpen]=useState(false);
 return <><div className="topbar"><div className="shell topbar-inner"><span>TAGORE GROUP · GUDHA GORJI · RAJASTHAN</span><span>Learning · Character · Progress</span></div></div><header className="nav"><div className="shell nav-inner"><Link className="brand" href="/" aria-label="Tagore Group home"><span className="brand-mark">T</span><span><strong>TAGORE GROUP</strong><small>EDUCATION · COMMUNITY · FUTURE</small></span></Link><nav className="nav-links">{links.map(x=><Link key={x.href} href={x.href}>{x.label}</Link>)}<Link className="button" href="/connect">Choose your pathway ↗</Link></nav><button className="mobile-menu-toggle" aria-label={open?"Close navigation":"Open navigation"} aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X size={22}/>:<Menu size={22}/>}</button></div>{open&&<nav className="mobile-nav shell">{links.map(x=><Link key={x.href} href={x.href} onClick={()=>setOpen(false)}>{x.label}</Link>)}<Link className="button" href="/connect" onClick={()=>setOpen(false)}>Choose your pathway ↗</Link></nav>}</header></>;
}