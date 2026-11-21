import type { Metadata } from "next";
import "./globals.css";
import { GroupSiteHeader } from "@/components/site-header";
import { GroupSiteFooter } from "@/components/site-footer";
import { MobileQuickActions } from "@/components/mobile-quick-actions";


const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.tieredu.org";
const indexingEnabled = process.env.SITE_INDEXING_ENABLED === "true";

const groupSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Tagore Group",
  url: siteUrl,
  description: "The Tagore Group education ecosystem in Gudha Gorji, Rajasthan, India.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Gudha Gorji",
    addressRegion: "Rajasthan",
    addressCountry: "IN"
  }
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  robots: { index: indexingEnabled, follow: indexingEnabled },
  applicationName: "Tagore Group",
  title: {
    default: "Tagore Group | Education, Community & Future",
    template: "%s | Tagore Group"
  },
  description: "Explore the Tagore Group education ecosystem in Gudha Gorji, Rajasthan—schools, higher education, competitive learning and student life.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Tagore Group",
    title: "Tagore Group | Education, Community & Future",
    description: "Explore the Tagore Group education ecosystem in Gudha Gorji, Rajasthan—schools, higher education, competitive learning and student life."
  },
  twitter: {
    card: "summary",
    title: "Tagore Group | Education, Community & Future",
    description: "Explore the Tagore Group education ecosystem in Gudha Gorji, Rajasthan."
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(groupSchema).replace(/</g, "\\u003c") }}
        />
        <GroupSiteHeader />
        {children}
        <GroupSiteFooter />
        <MobileQuickActions />
      </body>
    </html>
  );
}
