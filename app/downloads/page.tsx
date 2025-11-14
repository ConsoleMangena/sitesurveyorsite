import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDownToLine, ArrowUpRight, BellPlus, BookmarkCheck, CalendarClock } from "lucide-react";

import DownloadsList from "@/components/downloads-list";
import ReleaseAlertForm from "@/components/release-alert-form";
import StatusWidget from "@/components/status-widget";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { fetchAllReleases, REPO_FULL_NAME } from "@/lib/github";

type Highlight = {
  text: string;
  isBreaking: boolean;
};

function formatDate(isoDate?: string) {
  if (!isoDate) return "Unpublished";
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(new Date(isoDate));
}

function formatBytes(bytes?: number) {
  if (!bytes && bytes !== 0) return "";
  const units = ["B", "KB", "MB", "GB", "TB"] as const;
  let value = bytes;
  let unitIndex = 0;
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }
  return `${value % 1 === 0 ? value.toFixed(0) : value.toFixed(1)} ${units[unitIndex]}`;
}

function extractHighlights(body?: string | null): Highlight[] {
  if (!body) return [];

  const lines = body
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const bulletPoints = lines
    .filter((line) => /^[-*+]/.test(line))
    .map((line) => line.replace(/^[-*+]\s*/, ""));

  const meaningful = (bulletPoints.length > 0 ? bulletPoints : lines).filter((line) => line.length > 3);

  return meaningful.slice(0, 3).map((text) => ({
    text,
    isBreaking: /breaking/i.test(text),
  }));
}

export const metadata: Metadata = {
  title: "Downloads | SiteSurveyor",
  description: "Grab the latest SiteSurveyor builds and access the web experience in one place.",
};

export default async function DownloadsPage() {
  const releases = await fetchAllReleases();
  const latestRelease = releases.find((release) => !release.prerelease) ?? releases[0];
  const latestHighlights = latestRelease ? extractHighlights(latestRelease.body) : [];
  const featuredAssets = latestRelease?.assets.slice(0, 3) ?? [];
  const primaryAsset = featuredAssets[0];

  return (
    <main className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      <header className="space-y-3 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Downloads</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          SiteSurveyor ships as a modern web application and publishes tagged builds straight from our open-source
          repository. Use the browser app now, or pull the latest release artifacts to explore native integrations as
          they land.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
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

      {latestRelease ? (
        <section className="rounded-3xl border bg-card/80 p-6 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant={latestRelease.prerelease ? "warning" : "success"}>
              {latestRelease.prerelease ? "Latest prerelease" : "Latest stable release"}
            </Badge>
            <span className="text-sm text-muted-foreground">
              Published {formatDate(latestRelease.published_at)}
            </span>
            <span className="text-sm text-muted-foreground">Tag {latestRelease.tag_name}</span>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                {latestRelease.name?.trim() || latestRelease.tag_name}
              </h2>
              <p className="text-muted-foreground text-sm">
                Sourced directly from our open-source repository. Review the highlights and pull the right build fast.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {primaryAsset ? (
                <Button asChild>
                  <a href={primaryAsset.browser_download_url} target="_blank" rel="noreferrer">
                    <ArrowDownToLine className="mr-2 size-4" aria-hidden="true" />
                    Download {primaryAsset.name}
                  </a>
                </Button>
              ) : null}
              <Button asChild variant="outline">
                <a href={latestRelease.html_url} target="_blank" rel="noreferrer">
                  View release notes
                  <ArrowUpRight className="ml-2 size-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>

          {latestHighlights.length > 0 ? (
            <div className="space-y-3 rounded-2xl border border-dashed border-border/60 bg-muted/40 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Key changes</p>
              <ul className="grid gap-3 md:grid-cols-2">
                {latestHighlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <BookmarkCheck className="mt-0.5 size-4 text-primary" aria-hidden="true" />
                    <span className={highlight.isBreaking ? "font-medium text-foreground" : undefined}>
                      {highlight.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Featured assets</p>
            {featuredAssets.length > 0 ? (
              <ul className="grid gap-3 md:grid-cols-3">
                {featuredAssets.map((asset) => (
                  <li key={asset.id} className="rounded-2xl border border-border/60 bg-background/90 p-4">
                    <div className="text-sm font-medium truncate" title={asset.name}>
                      {asset.name}
                    </div>
                    <div className="text-xs text-muted-foreground">{formatBytes(asset.size)}</div>
                    <Button asChild variant="ghost" size="sm" className="mt-3 w-full justify-between">
                      <a href={asset.browser_download_url} target="_blank" rel="noreferrer">
                        Download
                        <ArrowDownToLine className="size-4" aria-hidden="true" />
                      </a>
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">
                This release does not ship bundled artifacts. Follow the release notes for manual build steps.
              </p>
            )}
          </div>
        </section>
      ) : null}

      <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
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

          <DownloadsList releases={releases} />
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border bg-card/80 p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <BellPlus className="size-5 text-primary" aria-hidden="true" />
              <div>
                <h3 className="text-base font-semibold">Get release alerts</h3>
                <p className="text-xs text-muted-foreground">Stay ahead of new tags and milestone builds.</p>
              </div>
            </div>
            <ReleaseAlertForm className="mt-4" />
          </div>

          <div className="rounded-2xl border bg-card/80 p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <CalendarClock className="size-5 text-primary" aria-hidden="true" />
              <div>
                <h3 className="text-base font-semibold">Changelog timeline</h3>
                <p className="text-xs text-muted-foreground">Review every release visually, grouped by sprint.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              <Badge variant="secondary">Highlights</Badge>
              <Badge variant="outline">Breaking changes</Badge>
              <Badge variant="info">Assets</Badge>
            </div>
            <Button asChild variant="secondary" size="sm" className="w-full">
              <Link href="/changelog">
                Open timeline
                <ArrowUpRight className="ml-2 size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>

          <StatusWidget />
        </aside>
      </section>
    </main>
  );
}
