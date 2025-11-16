import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowDownToLine,
  ArrowUpRight,
  BellPlus,
  BookmarkCheck,
  CalendarClock,
  GitBranch,
  Globe,
  MonitorSmartphone,
} from "lucide-react";

import DownloadsList from "@/components/downloads-list";
import ReleaseAlertForm from "@/components/release-alert-form";
import StatusWidget from "@/components/status-widget";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { fetchAllReleases, REPO_FULL_NAME, type GitHubRelease } from "@/lib/github";
import {
  extractReleaseHighlights,
  formatAssetSize,
  formatReleaseDate,
  type ReleaseHighlight,
} from "@/lib/releases";

export const metadata: Metadata = {
  title: "Downloads | SiteSurveyor",
  description: "Grab the latest SiteSurveyor builds and access the web experience in one place.",
};

export default async function DownloadsPage() {
  let releases: GitHubRelease[] = [];
  let releasesError: string | null = null;

  try {
    releases = await fetchAllReleases();
  } catch (error) {
    releasesError = "GitHub releases are unavailable right now. Please try again in a moment.";
  }

  const latestRelease = releases.find((release) => !release.prerelease) ?? releases[0];
  const latestHighlights: ReleaseHighlight[] = latestRelease ? extractReleaseHighlights(latestRelease.body) : [];
  const featuredAssets = latestRelease?.assets.slice(0, 3) ?? [];
  const primaryAsset = featuredAssets[0];

  const downloadTiles = [
    {
      title: "Web experience",
      description: "Access SiteSurveyor instantly in any modern browser with zero installs.",
      action: "Launch web app",
      href: "/",
      icon: Globe,
      pill: "Recommended",
    },
    {
      title: latestRelease
        ? `${latestRelease.prerelease ? "Prerelease" : "Stable"} build`
        : "Latest build",
      description: latestRelease
        ? `Tag ${latestRelease.tag_name} · ${formatReleaseDate(latestRelease.published_at)}`
        : "Pull tagged artifacts directly from GitHub releases.",
      action: primaryAsset ? `Download ${primaryAsset.name}` : "View release",
      href:
        primaryAsset?.browser_download_url ||
        latestRelease?.html_url ||
        `https://github.com/${REPO_FULL_NAME}/releases/latest`,
      icon: MonitorSmartphone,
    },
    {
      title: "Release archive",
      description: "Browse every tagged build, check hashes, and inspect source archives.",
      action: "Open releases",
      href: `https://github.com/${REPO_FULL_NAME}/releases`,
      icon: GitBranch,
      external: true,
    },
    {
      title: "Release alerts",
      description: "Get an email the moment a new platform build lands.",
      action: "Subscribe",
      href: "#release-alerts",
      icon: BellPlus,
    },
  ];

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

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {downloadTiles.map((tile) => {
          const Icon = tile.icon;
          const isExternal = tile.external || tile.href.startsWith("http");

          const button = (
            <Button
              asChild
              size="sm"
              variant={tile.pill ? "secondary" : "outline"}
              className="mt-4"
            >
              {isExternal ? (
                <a href={tile.href} target="_blank" rel="noreferrer">
                  {tile.action}
                  <ArrowUpRight className="ml-2 size-4" aria-hidden="true" />
                </a>
              ) : (
                <Link href={tile.href}>
                  {tile.action}
                  <ArrowUpRight className="ml-2 size-4" aria-hidden="true" />
                </Link>
              )}
            </Button>
          );

          return (
            <article
              key={tile.title}
              className="rounded-2xl border bg-card/70 p-5 shadow-sm flex flex-col"
            >
              <div className="flex items-start justify-between">
                <div className="rounded-full bg-primary/10 p-2 text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                {tile.pill ? (
                  <Badge variant="secondary" className="text-xs">
                    {tile.pill}
                  </Badge>
                ) : null}
              </div>
              <div className="mt-4 space-y-2">
                <h2 className="text-base font-semibold">{tile.title}</h2>
                <p className="text-sm text-muted-foreground">{tile.description}</p>
              </div>
              {button}
            </article>
          );
        })}
      </section>

      {releasesError ? (
        <div className="rounded-2xl border border-amber-500/50 bg-amber-500/10 p-4 text-sm text-amber-900 dark:text-amber-100 flex items-start gap-3">
          <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <p>{releasesError}</p>
        </div>
      ) : null}

      {latestRelease ? (
        <section className="rounded-3xl border bg-card/80 p-6 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant={latestRelease.prerelease ? "warning" : "success"}>
              {latestRelease.prerelease ? "Latest prerelease" : "Latest stable release"}
            </Badge>
            <span className="text-sm text-muted-foreground">
              Published {formatReleaseDate(latestRelease.published_at)}
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
              <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {featuredAssets.map((asset) => (
                  <li
                    key={asset.id}
                    className="rounded-2xl border border-border/60 bg-background/90 p-4 flex flex-col"
                  >
                    <div>
                      <p className="text-sm font-semibold truncate" title={asset.name}>
                        {asset.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{formatAssetSize(asset.size)}</p>
                    </div>
                    <Button asChild variant="ghost" size="sm" className="mt-4 justify-between">
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
          <div id="release-alerts" className="rounded-2xl border bg-card/80 p-5 shadow-sm">
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
