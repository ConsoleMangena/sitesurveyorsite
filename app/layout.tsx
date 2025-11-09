import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import NavBar from "@/components/navbar";
import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SiteSurveyor - Affordable Geomatics Software",
  description: "Affordable geomatics software for land surveying, GPS tracking, and mapping.",
  icons: {
    icon: '/logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* 
          Plausible Analytics integration for website analytics.
          Replace the data-domain and src attributes with your own Plausible setup,
          or remove this script entirely if you don't need analytics.
          Note: The current configuration sends your data to the creator's domain.
        */}
        <script
          defer
          data-domain="saas.gonzalochale.dev"
          src="https://plausible.gonzalochale.dev/js/script.outbound-links.js"
        ></script>
      </head>
      <body className={`${geist.className} antialiased`}>
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
