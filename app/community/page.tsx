import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Community | SiteSurveyor",
  description: "Join the SiteSurveyor community: discussions, support, and contribution.",
};

export default function CommunityPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12 space-y-10">
      <header className="space-y-3 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Community</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Connect with other surveyors, share workflows, and help shape the roadmap.
        </p>
      </header>

      <section className="grid md:grid-cols-3 gap-6">
        <div className="space-y-3 border rounded-lg p-5 bg-card">
          <h2 className="text-lg font-medium">Report a bug</h2>
          <p className="text-muted-foreground">Found a problem? Open an issue with steps to reproduce.</p>
          <Button asChild>
            <a href="https://github.com/ConsoleMangena/sitesurveyor/issues/new" target="_blank" rel="noopener noreferrer">New issue</a>
          </Button>
        </div>
        <div className="space-y-3 border rounded-lg p-5 bg-card">
          <h2 className="text-lg font-medium">Request a feature</h2>
          <p className="text-muted-foreground">Tell us what would make SiteSurveyor better for your team.</p>
          <Button asChild variant="outline">
            <a href="https://github.com/ConsoleMangena/sitesurveyor/issues/new?labels=enhancement" target="_blank" rel="noopener noreferrer">Request feature</a>
          </Button>
        </div>
        <div className="space-y-3 border rounded-lg p-5 bg-card">
          <h2 className="text-lg font-medium">Contribute</h2>
          <p className="text-muted-foreground">Fix a bug, improve docs, or add an integration.</p>
          <div className="flex gap-3">
            <Button asChild>
              <a href="https://github.com/ConsoleMangena/sitesurveyor/pulls" target="_blank" rel="noopener noreferrer">Open PRs</a>
            </Button>
            <Button asChild variant="outline">
              <a href="https://github.com/ConsoleMangena/sitesurveyor" target="_blank" rel="noopener noreferrer">Repository</a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
