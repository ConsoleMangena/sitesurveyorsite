import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Downloads | SiteSurveyor",
  description: "Get SiteSurveyor on desktop and mobile. Web app is available instantly.",
};

export default function DownloadsPage() {
  const downloads = [
    {
      os: "Windows",
      description: "ZIP archive; extract and run SiteSurveyor.",
      href: "https://github.com/ConsoleMangena/sitesurveyor/releases/latest/download/SiteSurveyor-Windows.zip",
    },
    {
      os: "Ubuntu/Debian (amd64)",
      description: ".deb package; install with: sudo dpkg -i <file>.deb",
      href: "https://github.com/ConsoleMangena/sitesurveyor/releases/latest/download/SiteSurveyor-Debian-amd64.deb",
    },
  ];

  return (
    <main className="max-w-5xl mx-auto px-4 py-12 space-y-10">
      <header className="space-y-3 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Downloads</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Get the latest SiteSurveyor desktop apps, or use the web app right away.
        </p>
      </header>

      <section className="grid md:grid-cols-2 gap-6">
        {downloads.map((d) => (
          <div key={d.os} className="space-y-3 border rounded-lg p-6 bg-card">
            <h2 className="text-lg font-medium">{d.os}</h2>
            <p className="text-sm text-muted-foreground">{d.description}</p>
            <Button asChild size="lg" className="mt-2 w-full">
              <a href={d.href} target="_blank" rel="noopener noreferrer">
                Download for {d.os}
              </a>
            </Button>
          </div>
        ))}
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">Web app</h2>
        <ol className="list-decimal pl-5 space-y-1 text-muted-foreground">
          <li>Go to the homepage and sign in.</li>
          <li>Access projects, data collection, and processing tools.</li>
          <li>Works on desktop and mobile browsers.</li>
        </ol>
      </section>
    </main>
  );
}
