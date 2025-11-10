import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Downloads | SiteSurveyor",
  description: "Get SiteSurveyor on desktop and mobile. Web app is available instantly.",
};

export default function DownloadsPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12 space-y-8">
      <header className="space-y-3 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Downloads</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          SiteSurveyor runs on the web today, with native installers planned. Use the web app or
          sign in from your mobile browser to get started.
        </p>
      </header>

      <section className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <h2 className="text-lg font-medium">Web app</h2>
          <ol className="list-decimal pl-5 space-y-1 text-muted-foreground">
            <li>Visit the homepage and sign in.</li>
            <li>Access your projects, data collection, and processing tools.</li>
            <li>Works on desktop and mobile browsers.</li>
          </ol>
        </div>
        <div className="space-y-2">
          <h2 className="text-lg font-medium">Native installers (planned)</h2>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li>Windows and macOS desktop apps</li>
            <li>Android and iOS mobile apps</li>
            <li>Offline-first field data capture</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
