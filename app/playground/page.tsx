import type { Metadata } from "next";

import Playground from "@/components/playground";

export const metadata: Metadata = {
  title: "Playground | SiteSurveyor",
  description: "Interactive sandbox that showcases SiteSurveyor's inspection and reporting workflow.",
};

export default function PlaygroundPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 space-y-8">
      <header className="space-y-3 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Playground</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Experiment with a guided, read-only workspace powered by sample data. Walk through the same capture → QA →
          delivery pipeline your team would use in production—no login required.
        </p>
      </header>

      <Playground />
    </main>
  );
}
