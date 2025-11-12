import type { Metadata } from "next";
import DownloadsList from "@/components/downloads-list";

export const metadata: Metadata = {
  title: "Downloads | SiteSurveyor",
  description: "Get SiteSurveyor on desktop and mobile. Web app is available instantly.",
};

export default function DownloadsPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12 space-y-10">
      <header className="space-y-3 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Downloads</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Get the latest SiteSurveyor desktop apps below. All past releases are listed, with the latest marked.
        </p>
      </header>

      <DownloadsList />

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
