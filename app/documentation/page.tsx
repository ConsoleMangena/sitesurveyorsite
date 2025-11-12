import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Documentation | SiteSurveyor",
  description: "How to install, configure, and use SiteSurveyor across web, Windows, and Debian.",
};

export default function DocumentationPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12 space-y-12">
      <header className="space-y-3 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Documentation</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Install the apps, configure backend, then collect, process, and share data. SiteSurveyor is open source and cross‑platform.
        </p>
      </header>

      {/* Quick start */}
      <section className="space-y-2">
        <h2 className="text-lg font-medium">Quick start</h2>
        <ol className="list-decimal pl-5 space-y-1 text-muted-foreground">
          <li>
            Download for <a className="underline" href="https://github.com/ConsoleMangena/sitesurveyor/releases/latest/download/SiteSurveyor-Windows.zip" target="_blank" rel="noopener noreferrer">Windows</a>
            {" "}or{ " "}
            <a className="underline" href="https://github.com/ConsoleMangena/sitesurveyor/releases/latest/download/SiteSurveyor-Debian-amd64.deb" target="_blank" rel="noopener noreferrer">Ubuntu/Debian</a>, or use the {" "}
            <Link className="underline" href="/">web app</Link>.
          </li>
          <li>Create an account and sign in (email/password or GitHub).</li>
          <li>Start a field data collection; review and export results.</li>
        </ol>
        <div className="text-xs text-muted-foreground">
          <p>Ubuntu/Debian: <code>sudo dpkg -i SiteSurveyor-Debian-amd64.deb</code> (then <code>sudo apt -f install -y</code> if needed).</p>
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

      {/* Install & configuration */}
      <section className="space-y-2">
        <h2 className="text-lg font-medium">Install & configuration</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="font-medium">Desktop apps</h3>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground text-sm">
              <li>Windows (ZIP) and Debian (amd64 .deb) builds are published on {" "}
                <a className="underline" href="https://github.com/ConsoleMangena/sitesurveyor/releases" target="_blank" rel="noopener noreferrer">GitHub Releases</a>.</li>
              <li>Keep multiple versions—archives are available in past releases.</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Backend (Appwrite)</h3>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground text-sm">
              <li>Set environment variables (e.g., in <code>.env.local</code> or hosting secrets):</li>
              <li className="pl-5">NEXT_PUBLIC_APPWRITE_ENDPOINT</li>
              <li className="pl-5">NEXT_PUBLIC_APPWRITE_PROJECT_ID</li>
              <li className="pl-5">NEXT_PUBLIC_APPWRITE_DATABASE_ID</li>
              <li className="pl-5">NEXT_PUBLIC_APPWRITE_NOTIFICATIONS_COLLECTION_ID</li>
              <li>GitHub OAuth: add allowed redirect URLs in Appwrite → OAuth {" "}
                <span className="text-xs">(e.g., <code>https://your-domain/</code> and <code>https://your-domain/login/</code>)</span>.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Using SiteSurveyor */}
      <div className="grid md:grid-cols-2 gap-6">
        <section className="space-y-2">
          <h2 className="text-lg font-medium">Data collection</h2>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li>Prepare forms and required fields for field practicals.</li>
            <li>Capture points/lines on mobile; review on desktop.</li>
            <li>Sync preferences and profile info from Settings → Profile.</li>
          </ul>
        </section>
        <section className="space-y-2">
          <h2 className="text-lg font-medium">Processing & QA</h2>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li>Run standard checks; Pro plan includes AI‑assisted QA.</li>
            <li>Track versions through tagged releases and exports.</li>
            <li>Audit changes via activity and notifications (where available).</li>
          </ul>
        </section>
        <section className="space-y-2">
          <h2 className="text-lg font-medium">Presentation & sharing</h2>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li>Share exports and reports with clients or classmates.</li>
            <li>Publish links to maps/layers where applicable.</li>
            <li>Use the web app for quick access without installs.</li>
          </ul>
        </section>
        <section className="space-y-2">
          <h2 className="text-lg font-medium">Releases & updates</h2>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li>Grab the {" "}
              <a className="underline" href="https://github.com/ConsoleMangena/sitesurveyor/releases/latest" target="_blank" rel="noopener noreferrer">latest release</a>{" "}
              or browse {" "}
              <a className="underline" href="https://github.com/ConsoleMangena/sitesurveyor/releases" target="_blank" rel="noopener noreferrer">all releases</a>.</li>
            <li>Windows + Debian builds are provided; use the web app for instant access.</li>
          </ul>
        </section>
      </div>

      {/* Support */}
      <section className="space-y-2">
        <h2 className="text-lg font-medium">Support & troubleshooting</h2>
        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
          <li>Ubuntu: <code>sudo apt -f install -y</code> if dependencies are missing after installing the <code>.deb</code>.</li>
          <li>Windows: SmartScreen → “More info” → “Run anyway” if prompted.</li>
          <li>Open {" "}
            <a className="underline" href="https://github.com/ConsoleMangena/sitesurveyor/issues" target="_blank" rel="noopener noreferrer">issues</a>{" "}
            or {" "}
            <a className="underline" href="https://github.com/ConsoleMangena/sitesurveyor/pulls" target="_blank" rel="noopener noreferrer">pull requests</a>.</li>
        </ul>
        <div className="flex gap-3 mt-2">
          <Button asChild>
            <Link href="/downloads">Download apps</Link>
          </Button>
          <Button asChild variant="outline">
            <a href="https://github.com/ConsoleMangena/sitesurveyor" target="_blank" rel="noopener noreferrer">Contribute on GitHub</a>
          </Button>
        </div>
      </section>
    </main>
  );
}
