import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";
import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sitesurveyor.dev"),
  title: {
    default: "SiteSurveyor — Fast, Reliable Site Audits",
    template: "%s | SiteSurveyor",
  },
  description:
    "SiteSurveyor helps field teams capture site data, sync insights instantly, and deliver polished reports without the busywork.",
  keywords: [
    "site surveys",
    "field data collection",
    "site assessment software",
    "construction site audits",
    "SiteSurveyor",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SiteSurveyor — Fast, Reliable Site Audits",
    description:
      "SiteSurveyor helps field teams capture site data, sync insights instantly, and deliver polished reports without the busywork.",
    url: "https://sitesurveyor.dev",
    siteName: "SiteSurveyor",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://sitesurveyor.dev/preview.png",
        width: 1200,
        height: 630,
        alt: "SiteSurveyor platform preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SiteSurveyor — Fast, Reliable Site Audits",
    description:
      "SiteSurveyor helps field teams capture site data, sync insights instantly, and deliver polished reports without the busywork.",
    images: ["https://sitesurveyor.dev/preview.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/logo.svg",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SiteSurveyor",
  url: "https://sitesurveyor.dev",
  logo: "https://sitesurveyor.dev/logo.svg",
  sameAs: ["https://github.com/ConsoleMangena/sitesurveyor"],
  description:
    "SiteSurveyor helps field teams capture site data, sync insights instantly, and deliver polished reports without the busywork.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Reduce HTML caching to avoid stale chunk references after deployments */}
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${geist.className} antialiased`}>
        <Providers>
          <div className="flex min-h-screen flex-col bg-background">
            <NavBar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
