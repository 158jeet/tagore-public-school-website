import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Start Here | Tagore Public School",
  description: "A simple, low-bandwidth starting point for families who want to explore admissions, campus visits or common questions at Tagore Public School.",
  alternates: { canonical: "/start" },
  robots: { index: false, follow: true },
};

export default function StartHerePage() {
  return (
    <>
      <section className="bg-navy py-16 text-white sm:py-20">
        <div className="container-shell max-w-4xl">
          <p className="eyebrow text-gold">Tagore Public School · Gudha Gorji</p>
          <h1 className="mt-5 max-w-3xl font-serif text-5xl leading-tight sm:text-6xl">Your next conversation starts here.</h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/70">If you received this page through a printed guide, community conversation or QR code, choose the information you need. No login is required.</p>
        </div>
      </section>
      <section className="section-pad bg-cream">
        <div className="container-shell max-w-4xl">
          <div className="grid gap-4 sm:grid-cols-2">
            <article className="rounded-3xl border border-ink/10 bg-white p-7">
              <p className="eyebrow text-gold">For families</p>
              <h2 className="mt-3 font-serif text-2xl text-navy">Explore admissions</h2>
              <p className="mt-3 text-sm leading-7 text-ink/65">Ask about the class you are considering and the official admission process.</p>
              <Link prefetch={false} href="/admissions" className="mt-5 inline-flex rounded-full bg-gold px-5 py-3 text-sm font-bold text-navy">Admissions enquiry ↗</Link>
            </article>
            <article className="rounded-3xl border border-ink/10 bg-white p-7">
              <p className="eyebrow text-gold">See the campus</p>
              <h2 className="mt-3 font-serif text-2xl text-navy">Request a visit</h2>
              <p className="mt-3 text-sm leading-7 text-ink/65">Share a preferred date and time. The visit is arranged only after the school confirms it.</p>
              <Link prefetch={false} href="/visit" className="mt-5 inline-flex rounded-full border border-ink/15 px-5 py-3 text-sm font-semibold text-navy">Campus visit request ↗</Link>
            </article>
            <article className="rounded-3xl border border-ink/10 bg-white p-7">
              <p className="eyebrow text-gold">Quick answers</p>
              <h2 className="mt-3 font-serif text-2xl text-navy">Read family FAQs</h2>
              <p className="mt-3 text-sm leading-7 text-ink/65">Search common questions about fees, documents, transport and the admission process.</p>
              <Link prefetch={false} href="/admissions/faq" className="mt-5 inline-flex rounded-full border border-ink/15 px-5 py-3 text-sm font-semibold text-navy">Search admissions FAQs ↗</Link>
            </article>
            <article className="rounded-3xl border border-ink/10 bg-white p-7">
              <p className="eyebrow text-gold">Talk to the school</p>
              <h2 className="mt-3 font-serif text-2xl text-navy">Call the school office</h2>
              <p className="mt-3 text-sm leading-7 text-ink/65">For current availability and official information, speak with the school team.</p>
              <a href="tel:+919462213490" className="mt-5 inline-flex rounded-full border border-ink/15 px-5 py-3 text-sm font-semibold text-navy">Call +91 94622 13490</a>
            </article>
          </div>
          <p className="mt-8 text-xs leading-6 text-ink/50">This page is a general information gateway. An enquiry does not confirm admission or reserve a seat. Current eligibility, fees and availability must be confirmed through the school’s official process.</p>
        </div>
      </section>
    </>
  );
}
