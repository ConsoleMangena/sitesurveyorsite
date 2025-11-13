import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import DownloadsList from "@/components/downloads-list";
import { Button } from "@/components/ui/button";

const REPO_FULL_NAME = "ConsoleMangena/sitesurveyor";

export const metadata: Metadata = {
  title: "Downloads | SiteSurveyor",
  description: "Grab the latest SiteSurveyor builds and access the web experience in one place.",
};

export default function DownloadsPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12 space-y-10">
      <header className="space-y-3 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Downloads</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          SiteSurveyor ships as a modern web application and publishes tagged builds straight from our open-source
          repository. Use the browser app now, or pull the latest release artifacts to explore native integrations as
          they land.
        </p>
      </header>

      <section className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <h2 className="text-lg font-medium">Web experience</h2>
          <ol className="list-decimal pl-5 space-y-1 text-muted-foreground">
            <li>Visit the homepage and sign in with your SiteSurveyor account.</li>
            <li>Manage projects, field data, and processing workflows from any device.</li>
            <li>Optimized for Chromium, Firefox, and mobile browsers.</li>
          </ol>
        </div>
        <div className="space-y-2">
          <h2 className="text-lg font-medium">Source-aligned releases</h2>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li>Pull tagged releases directly from GitHub.</li>
            <li>Inspect changelogs before you download.</li>
            <li>Track prereleases as new platform targets stabilize.</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold">All GitHub releases</h2>
            <p className="text-muted-foreground text-sm">
              Browse every tagged build pulled directly from the repository. The feed updates automatically as new
              releases publish.
            </p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href={`https://github.com/${REPO_FULL_NAME}/releases`} target="_blank" rel="noreferrer">
              View repository
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <DownloadsList />
      </section>
    </main>
  );
}
