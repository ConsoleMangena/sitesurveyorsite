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
const RELEASES_API = `https://api.github.com/repos/${OWNER_REPO}/releases`;
const RELEASES_PAGE = `https://github.com/${OWNER_REPO}/releases`;
const LOCAL_RELEASES = "/releases.json";
const RELEASES_PER_PAGE = 100;
const MAX_RELEASE_PAGES = 5;

const GITHUB_HEADERS = {
  Accept: "application/vnd.github+json",
  "User-Agent": "SiteSurveyorSite/1.0",
} as const;

function formatBytes(bytes?: number): string {
  if (!bytes && bytes !== 0) return "";
  const mb = bytes / (1024 * 1024);
  if (mb >= 1) return `${mb.toFixed(1)} MB`;
  const kb = bytes / 1024;
  if (kb >= 1) return `${kb.toFixed(1)} KB`;
  return `${bytes} B`;
}

function WindowsLogo({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 448 512" className={className} aria-hidden>
      <path fill="currentColor" d="M0 93.7L183.6 68.2v164.6H0V93.7zm0 324.6l183.6 25.6V281.6H0v136.7zM214.6 66.7L448 32v200.8H214.6V66.7zM448 480l-233.4-33.3V281.6H448V480z"/>
    </svg>
  );
}

function LinuxLogo({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <path fill="currentColor" d="M32 4c7 0 10 6 10 12 0 6-3 10-3 14 0 4 3 6 6 10 3 5 3 10-1 12-3 2-8 1-12-2-4 3-9 4-12 2-4-2-4-7-1-12 3-4 6-6 6-10 0-4-3-8-3-14 0-6 3-12 10-12z"/>
    </svg>
  );
}

function categorizeAssets(assets: ReleaseAsset[]) {
  const windows: ReleaseAsset[] = [];
  const debian: ReleaseAsset[] = [];
  const others: ReleaseAsset[] = [];
  for (const a of assets || []) {
    const n = a.name.toLowerCase();
    if (/\.(exe|msi|zip)$/.test(n) || n.includes("win")) {
      windows.push(a);
    } else if (/\.(deb)$/.test(n) || n.includes("debian") || n.includes("ubuntu") || n.includes("linux")) {
      debian.push(a);
    } else {
      others.push(a);
    }
  }
  return { windows, debian, others };
}

async function fetchRemoteReleases(signal: AbortSignal): Promise<Release[]> {
  const all: Release[] = [];

  for (let page = 1; page <= MAX_RELEASE_PAGES; page += 1) {
    const query = `${RELEASES_API}?per_page=${RELEASES_PER_PAGE}&page=${page}`;
    const res = await fetch(query, {
      headers: GITHUB_HEADERS,
      cache: "no-store",
      signal,
    });

    if (!res.ok) {
      throw new Error(`GitHub API responded ${res.status}`);
    }

    const chunk = (await res.json()) as Release[];
    all.push(...chunk);

    if (chunk.length < RELEASES_PER_PAGE) {
      break;
    }
  }

  return all;
}

export default function DownloadsList() {
  const [releases, setReleases] = useState<Release[] | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [osTab, setOsTab] = useState<Record<number, "windows" | "debian">>({});

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;
    (async () => {
      try {
        let data: Release[] | null = null;

        try {
          data = await fetchRemoteReleases(controller.signal);
        } catch (remoteError) {
          if (cancelled || (remoteError instanceof DOMException && remoteError.name === "AbortError")) {
            return;
          }
          try {
            const local = await fetch(LOCAL_RELEASES, {
              cache: "no-store",
              signal: controller.signal,
            });
            if (local.ok) {
              data = await local.json();
            }
          } catch {
            // Ignore and fall back to error message below.
          }
          if (!data) {
            throw remoteError;
          }
        }

        data = data
          .filter((release) => !release.draft)
          .sort((a, b) => {
            const ta = a.published_at ? Date.parse(a.published_at) : 0;
            const tb = b.published_at ? Date.parse(b.published_at) : 0;
            return tb - ta;
          });

        if (!cancelled) setReleases(data);
      } catch (err) {
        if (cancelled || (err instanceof DOMException && err.name === "AbortError")) {
          return;
        }
        setError("Could not load releases. Please use the GitHub releases page.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      controller.abort();
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
          const latestStableIndex = releases.findIndex((r) => !r.prerelease && !r.draft);
          const isLatest = index === latestStableIndex && latestStableIndex !== -1;
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
                  (() => {
                    const { windows, debian } = categorizeAssets(rel.assets);
                    if (windows.length === 0 && debian.length === 0) {
                      return (
                        <p className="mt-4 text-sm text-muted-foreground">No Windows or Debian assets. See release notes.</p>
                      );
                    }
                    const current = osTab[rel.id] ?? (windows.length > 0 ? "windows" : "debian");
                    if (osTab[rel.id] === undefined) {
                      // initialize default for this release id
                      setTimeout(() => setOsTab((m) => ({ ...m, [rel.id]: current })), 0);
                    }
                    const list = current === "windows" ? windows : debian;
                    return (
                      <div className="mt-4 space-y-3">
                        <div className="inline-flex items-center rounded-md border p-1 bg-card">
                          {windows.length > 0 && (
                            <button
                              type="button"
                              className={`flex items-center gap-2 px-3 py-1 text-sm rounded ${
                                current === "windows" ? "bg-secondary" : "hover:bg-accent"
                              }`}
                              onClick={() => setOsTab((m) => ({ ...m, [rel.id]: "windows" }))}
                              aria-pressed={current === "windows"}
                            >
                              <WindowsLogo className="h-4 w-4 text-sky-600" /> Windows
                            </button>
                          )}
                          {debian.length > 0 && (
                            <button
                              type="button"
                              className={`flex items-center gap-2 px-3 py-1 text-sm rounded ${
                                current === "debian" ? "bg-secondary" : "hover:bg-accent"
                              }`}
                              onClick={() => setOsTab((m) => ({ ...m, [rel.id]: "debian" }))}
                              aria-pressed={current === "debian"}
                            >
                              <LinuxLogo className="h-4 w-4 text-emerald-600" /> Debian/Ubuntu
                            </button>
                          )}
                        </div>
                        <ul className="space-y-2">
                          {list.map((a) => (
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
                      </div>
                    );
                  })()
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
