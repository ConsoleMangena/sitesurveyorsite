import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Documentation | SiteSurveyor",
  description: "Getting started, guides, and references for SiteSurveyor.",
};

export default function DocumentationPage() {
  const sections = [
    {
      title: "Data collection",
      items: [
        "Field capture workflows",
        "Forms and validation",
        "Offline capture (planned)",
      ],
    },
    {
      title: "Processing & QA",
      items: [
        "Pipelines and transformations",
        "Quality checks and review",
        "Versioning and provenance",
      ],
    },
    {
      title: "Presentation & dissemination",
      items: [
        "Reports and shareable links",
        "Embeds and exports",
        "Maps and layers",
      ],
    },
    {
      title: "Management & storage",
      items: [
        "Access control and roles",
        "Storage, backups, and retention",
        "Auditing and activity logs",
      ],
    },
  ];

  return (
    <main className="max-w-5xl mx-auto px-4 py-12 space-y-12">
      <header className="space-y-3 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Documentation</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore guides and references to build end‑to‑end workflows with SiteSurveyor.
        </p>
      </header>

      <section className="space-y-2">
        <h2 className="text-lg font-medium">Quick start</h2>
        <ol className="list-decimal pl-5 space-y-1 text-muted-foreground">
          <li>
            <span>Get the desktop app for </span>
            <a className="underline" href="https://github.com/ConsoleMangena/sitesurveyor/releases/latest/download/SiteSurveyor-Windows.zip" target="_blank" rel="noopener noreferrer">Windows</a>
            <span> or </span>
            <a className="underline" href="https://github.com/ConsoleMangena/sitesurveyor/releases/latest/download/SiteSurveyor-Debian-amd64.deb" target="_blank" rel="noopener noreferrer">Ubuntu/Debian</a>
            <span>, or use the </span>
            <Link className="underline" href="/">web app</Link>.
          </li>
          <li>Create an account and sign in.</li>
          <li>Create your first project and invite teammates.</li>
          <li>Start a field data collection, then process and share results.</li>
        </ol>
        <div className="text-xs text-muted-foreground">
          <p>Ubuntu/Debian: install with <code>sudo dpkg -i SiteSurveyor-Debian-amd64.deb</code> (then <code>sudo apt -f install -y</code> if needed).</p>
          <p>Windows: unzip the archive and run SiteSurveyor.</p>
        </div>
        <div className="flex gap-3 mt-3">
          <Button asChild>
            <Link href="/downloads">Download apps</Link>
          </Button>
          <Button asChild variant="outline">
            <a href="https://github.com/ConsoleMangena/sitesurveyor" target="_blank" rel="noopener noreferrer">View on GitHub</a>
          </Button>
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-6">
        {sections.map((s) => (
          <section key={s.title} className="space-y-2">
            <h2 className="text-lg font-medium">{s.title}</h2>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              {s.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <section className="space-y-2">
        <h2 className="text-lg font-medium">Support & troubleshooting</h2>
        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
          <li>If install fails on Ubuntu, run <code>sudo apt -f install -y</code> to resolve dependencies, then reinstall.</li>
          <li>On Windows, if SmartScreen warns about an unknown publisher, choose “More info” → “Run anyway”.</li>
          <li>Report bugs or request features on <a className="underline" href="https://github.com/ConsoleMangena/sitesurveyor/issues" target="_blank" rel="noopener noreferrer">GitHub Issues</a>.</li>
        </ul>
      </section>
    </main>
  );
}
