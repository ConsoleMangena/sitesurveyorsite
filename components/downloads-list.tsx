"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type ReleaseAsset = {
  id: number;
  name: string;
  browser_download_url: string;
  content_type?: string;
  size?: number; // bytes
};

type Release = {
  id: number;
  tag_name: string;
  name?: string;
  published_at?: string;
  html_url: string;
  draft: boolean;
  prerelease: boolean;
  assets: ReleaseAsset[];
};

const OWNER_REPO = "ConsoleMangena/sitesurveyor";
const RELEASES_API = `https://api.github.com/repos/${OWNER_REPO}/releases?per_page=100`;
const RELEASES_PAGE = `https://github.com/${OWNER_REPO}/releases`;

function formatBytes(bytes?: number): string {
  if (!bytes && bytes !== 0) return "";
  const mb = bytes / (1024 * 1024);
  if (mb >= 1) return `${mb.toFixed(1)} MB`;
  const kb = bytes / 1024;
  if (kb >= 1) return `${kb.toFixed(1)} KB`;
  return `${bytes} B`;
}

export default function DownloadsList() {
  const [releases, setReleases] = useState<Release[] | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(RELEASES_API, {
          headers: { Accept: "application/vnd.github+json" },
        });
        if (!res.ok) throw new Error(`GitHub API responded ${res.status}`);
        const data: Release[] = await res.json();
        if (!cancelled) setReleases(data);
      } catch {
        if (!cancelled) setError("Could not load releases. Please use the GitHub releases page.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="space-y-3">
        <div className="h-6 w-48 bg-muted rounded animate-pulse" />
        <div className="grid md:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 bg-muted rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !releases) {
    return (
      <div className="text-center text-muted-foreground">
        <p className="mb-2">{error || "No releases found."}</p>
        <a className="underline" href={RELEASES_PAGE} target="_blank" rel="noopener noreferrer">
          Open GitHub Releases
        </a>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <h2 className="text-lg font-medium text-center">All releases</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {releases.map((rel, index) => {
          const isLatest = index === 0 && !rel.prerelease && !rel.draft;
          return (
            <Card key={rel.id} className="bg-card">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-semibold">
                      {rel.tag_name}
                      {rel.name ? <span className="text-muted-foreground font-normal"> — {rel.name}</span> : null}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {rel.published_at ? new Date(rel.published_at).toLocaleDateString() : "Unpublished"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {isLatest && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                        Latest
                      </span>
                    )}
                    {rel.prerelease && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20">
                        Pre-release
                      </span>
                    )}
                    {rel.draft && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gray-500/10 text-gray-600 border border-gray-500/20">
                        Draft
                      </span>
                    )}
                  </div>
                </div>

                {rel.assets && rel.assets.length > 0 ? (
                  <ul className="mt-4 space-y-2">
                    {rel.assets.map((a) => (
                      <li key={a.id} className="flex items-center justify-between gap-3">
                        <span className="text-sm text-muted-foreground truncate" title={a.name}>
                          {a.name}
                          {a.size ? <span className="ml-2 text-xs">({formatBytes(a.size)})</span> : null}
                        </span>
                        <Button asChild size="sm">
                          <a href={a.browser_download_url} target="_blank" rel="noopener noreferrer">
                            Download
                          </a>
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 text-sm text-muted-foreground">No downloadable assets. See release notes.</p>
                )}
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button asChild variant="outline" size="sm">
                  <a href={rel.html_url} target="_blank" rel="noopener noreferrer">
                    View on GitHub
                  </a>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
