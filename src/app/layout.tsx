import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
export const metadata: Metadata = { metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.tpsgudhagorji.com"), title: { default: "Tagore Public School | Gudha Gorji", template: "%s | Tagore Public School" }, description: "Discover learning, character and opportunity at Tagore Public School, Gudha Gorji. Explore our school and enquire about admissions." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body className="antialiased"><SiteHeader /><main>{children}</main><SiteFooter /></body></html>; }
