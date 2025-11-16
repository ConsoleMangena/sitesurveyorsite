"use client";

import { useMemo, useState, type ComponentType, type SVGProps } from "react";
import { ArrowUpRightSquare, BookmarkCheck, Cpu, FilterIcon, Search } from "lucide-react";

import type { GitHubRelease } from "@/lib/github";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge, type BadgeVariant } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  extractReleaseHighlights,
  formatAssetSize,
  formatReleaseDate,
} from "@/lib/releases";

const RELEASES_PAGE = "https://github.com/ConsoleMangena/sitesurveyor/releases";

type Props = {
  releases: GitHubRelease[];
};

type FilterKey = "all" | "stable" | "prerelease";

type AssetMeta = {
  label: string;
  variant: BadgeVariant;
  Icon?: ComponentType<SVGProps<SVGSVGElement>>;
};

const filterOptions: Array<{ value: FilterKey; label: string }> = [
  { value: "all", label: "All" },
  { value: "stable", label: "Stable" },
  { value: "prerelease", label: "Pre-release" },
];

function resolveAssetMeta(name: string): AssetMeta[] {
  const lower = name.toLowerCase();
  const result: AssetMeta[] = [];

  if (/(\.exe|\.msi|windows|win32|win64)/.test(lower)) {
    result.push({ label: "Windows", variant: "info" });
  } else if (/(\.dmg|macos|darwin|\.pkg)/.test(lower)) {
    result.push({ label: "macOS", variant: "secondary" });
  } else if (/(linux|ubuntu|debian|\.deb|\.tar\.gz|\.appimage)/.test(lower)) {
    result.push({ label: "Linux", variant: "success" });
  }

  if (/arm64|aarch64/.test(lower)) {
    result.push({ label: "ARM64", variant: "outline", Icon: Cpu });
  } else if (/x64|amd64|x86_64/.test(lower)) {
    result.push({ label: "x64", variant: "outline", Icon: Cpu });
  }

  return result;
}

export default function DownloadsList({ releases }: Props) {
  const [track, setTrack] = useState<FilterKey>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const lowerQuery = query.trim().toLowerCase();

    return releases
      .filter((release) => {
        if (track === "stable") {
          return !release.prerelease;
        }
        if (track === "prerelease") {
          return release.prerelease;
        }
        return true;
      })
      .filter((release) => {
        if (!lowerQuery) return true;
        const haystack = [
          release.tag_name,
          release.name ?? "",
          release.body ?? "",
          release.assets.map((asset) => asset.name).join(" "),
        ]
          .join(" ")
          .toLowerCase();

        return haystack.includes(lowerQuery);
      });
  }, [releases, track, query]);

  const latestStableId = useMemo(() => {
    return filtered.find((release) => !release.prerelease)?.id ?? null;
  }, [filtered]);

  if (releases.length === 0) {
    return (
      <div className="text-center text-muted-foreground text-sm">
        No published releases yet. Follow development on
        {" "}
        <Link
          href={RELEASES_PAGE}
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-4"
        >
          GitHub
        </Link>
        .
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-center gap-3">
          <FilterIcon className="size-4 text-muted-foreground" />
          <div className="flex items-center gap-2 rounded-full border bg-card p-1 text-xs">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`rounded-full px-3 py-1 ${
                  track === option.value ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
                onClick={() => setTrack(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Filter by tag, name, or asset"
            className="pl-9"
            aria-label="Search releases"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((release, index) => {
          const highlights = extractReleaseHighlights(release.body);
          const published = formatReleaseDate(release.published_at);
          const isLatestStable = !release.prerelease && release.id === latestStableId;

          return (
            <Card key={release.id} className="bg-card/80 backdrop-blur">
              <CardContent className="flex flex-col gap-4 p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold tracking-tight">
                        {release.name?.trim() || release.tag_name}
                      </h3>
                      {isLatestStable ? <Badge variant="success">Latest</Badge> : null}
                      {release.prerelease ? <Badge variant="warning">Pre-release</Badge> : null}
                    </div>
                    <p className="text-xs text-muted-foreground">Published {published}</p>
                  </div>
                  <Button asChild size="sm" variant="link" className="h-auto px-0 text-sm">
                    <Link href={release.html_url} target="_blank" rel="noreferrer">
                      Release notes
                      <ArrowUpRightSquare className="ml-1 size-4" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>

                {highlights.length > 0 ? (
                  <div className="space-y-2 rounded-lg border border-dashed border-border/60 bg-muted/40 p-3">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Key changes
                    </p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <BookmarkCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                          <span className={highlight.isBreaking ? "font-medium text-foreground" : undefined}>
                            {highlight.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <div className="space-y-3">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Assets
                  </p>

                  {release.assets.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No downloadable artifacts published. Refer to the release notes for build instructions.
                    </p>
                  ) : (
                    <ul className="space-y-2">
                      {release.assets.map((asset) => {
                        const meta = resolveAssetMeta(asset.name);

                        return (
                          <li
                            key={asset.id}
                            className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border/60 bg-background/90 px-3 py-2"
                          >
                            <div className="flex min-w-0 flex-col">
                              <span className="truncate text-sm font-medium" title={asset.name}>
                                {asset.name}
                              </span>
                              <span className="text-xs text-muted-foreground">{formatAssetSize(asset.size)}</span>
                              <div className="mt-1 flex flex-wrap gap-1">
                                {meta.map((entry, idx) => (
                                  <Badge key={idx} variant={entry.variant}>
                                    {entry.Icon ? <entry.Icon className="mr-1 size-3" aria-hidden="true" /> : null}
                                    {entry.label}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <Button asChild size="sm">
                              <a href={asset.browser_download_url} target="_blank" rel="noreferrer">
                                Download
                              </a>
                            </Button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex flex-wrap gap-2 border-t border-border/60 bg-muted/40 px-6 py-3 text-xs text-muted-foreground">
                <span>Total assets: {release.assets.length}</span>
                <span>Tag: {release.tag_name}</span>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed px-4 py-3 text-sm text-muted-foreground">
          No releases match your filters. Try switching to a different track or clearing the search query.
        </div>
      ) : null}
    </section>
  );
}
