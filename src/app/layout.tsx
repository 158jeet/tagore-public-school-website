import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MobileQuickActions } from "@/components/mobile-quick-actions";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.tpsgudhagorji.com";
const indexingEnabled = process.env.SITE_INDEXING_ENABLED === "true";

const schoolSchema = {
  "@context": "https://schema.org",
  "@type": "School",
  name: "Tagore Public School",
  url: siteUrl,
  description: "Tagore Public School, a CBSE-affiliated school in Gudha Gorji, Jhunjhunu, Rajasthan.",
  foundingDate: "2004",
  identifier: [
    { "@type": "PropertyValue", propertyID: "CBSE affiliation number", value: "1730360" },
    { "@type": "PropertyValue", propertyID: "CBSE school code", value: "10705" }
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Todi, Duriya",
    addressLocality: "Gudha Gorji",
    addressRegion: "Rajasthan",
    postalCode: "333022",
    addressCountry: "IN"
  }
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  robots: { index: indexingEnabled, follow: indexingEnabled },
  applicationName: "Tagore Public School",
  title: {
    default: "Tagore Public School | Gudha Gorji",
    template: "%s | Tagore Public School"
  },
  description: "Discover learning, character and opportunity at Tagore Public School, Gudha Gorji. Explore our school and enquire about admissions.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Tagore Public School",
    title: "Tagore Public School | Gudha Gorji",
    description: "Discover learning, character and opportunity at Tagore Public School, Gudha Gorji."
  },
  twitter: {
    card: "summary",
    title: "Tagore Public School | Gudha Gorji",
    description: "Discover learning, character and opportunity at Tagore Public School, Gudha Gorji."
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schoolSchema).replace(/</g, "\\u003c") }}
        />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <MobileQuickActions />
      </body>
    </html>
  );
}
