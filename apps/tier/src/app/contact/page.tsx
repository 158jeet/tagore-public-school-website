import { GroupEnquiryForm } from "@/components/group-enquiry-form";

export const metadata = {
  title: "Contact & Enquiries",
  description: "Contact the Tagore Group and direct your enquiry to the appropriate institution.",
  alternates: { canonical: "/contact" },
};

const enquiryPaths: Record<string, string> = {
  family: "Family / student enquiry",
  partnership: "Institutional partnership enquiry",
  careers: "Careers / educator enquiry",
  community: "Community / vendor enquiry",
  general: "General group enquiry",
};

type ContactPageProps = { searchParams: Promise<{ path?: string | string[] }> };

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const requestedPath = Array.isArray(params.path) ? params.path[0] : params.path;
  const initialMessage = requestedPath && enquiryPaths[requestedPath] ? `Enquiry pathway: ${enquiryPaths[requestedPath]}\n\nPlease add details about your enquiry below.` : "";
  return <main><section className="hero"><div className="shell contact-hero-inner"><div className="eyebrow" style={{color:"var(--gold)"}}>Talk to the Tagore Group</div><h1 className="serif" style={{fontSize:"clamp(42px,6vw,68px)",maxWidth:820}}>A question is a good place to begin.</h1><p className="lead" style={{maxWidth:700}}>Tell us which institution or programme you are exploring. We will direct your question to the appropriate team once group enquiry routing is configured.</p></div></section><section className="section contact-section"><div className="shell contact-grid"><div className="intro"><div className="eyebrow" style={{color:"var(--gold)"}}>Before you write</div><h2>Choose the right starting point.</h2><p>For Tagore Public School’s CBSE admissions, please use its dedicated website. This group form is intended for other institutions and group-level questions.</p><a className="button" href="https://www.tpsgudhagorji.com/admissions">TPS admissions ↗</a><p style={{fontSize:12,marginTop:24}}>You can also follow the group’s official public channels for updates.</p><p><a href="https://www.instagram.com/tagoregudha">Instagram ↗</a> · <a href="https://www.facebook.com/tagore.gudha/">Facebook ↗</a> · <a href="https://www.youtube.com/@TagoreGudha">YouTube ↗</a></p><div className="card" style={{marginTop:28}}><div className="eyebrow" style={{color:"var(--gold)"}}>Existing group contact details · verify before launch</div><h3 style={{fontFamily:"var(--serif)",fontSize:24,marginTop:12,color:"var(--navy)"}}>Tagore Group office</h3><p style={{marginTop:12,lineHeight:1.8}}>The existing Tagore Group website lists Rajasthan State Highway 37, Gudha-Gorji, Jhunjhunu, Rajasthan.</p><p style={{marginTop:12}}><a href="tel:+911594319504" style={{fontWeight:700,color:"var(--navy)"}}>01594-319504</a></p><p style={{marginTop:8}}><a href="mailto:tagoregg@gmail.com" style={{color:"var(--navy)"}}>tagoregg@gmail.com</a></p><p style={{fontSize:12,lineHeight:1.7,marginTop:12,color:"var(--muted)"}}>These are legacy website details, not yet confirmed as the current group office line or enquiry-routing inbox.</p><a href="https://www.tieredu.org/contact.php" target="_blank" rel="noreferrer" style={{display:"inline-block",marginTop:12,fontSize:12,fontWeight:700,color:"var(--navy)"}}>View original group contact page ↗</a></div></div><div id="group-enquiry"><GroupEnquiryForm initialMessage={initialMessage}/></div></div></section></main>;
}
