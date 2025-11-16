import type { Metadata } from "next";
import { ArrowDownToLine, ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { fetchAllReleases, REPO_FULL_NAME, type GitHubRelease } from "@/lib/github";
import { formatAssetSize, formatReleaseDate } from "@/lib/releases";

export const metadata: Metadata = {
  title: "Downloads | SiteSurveyor",
  description: "Grab the latest SiteSurveyor builds and access the web experience in one place.",
};

type ReleaseAsset = GitHubRelease["assets"][number];

// Lightweight filename heuristics so we can split release assets by platform without extra metadata.
const WINDOWS_PATTERNS = [/windows/i, /win32/i, /win64/i, /\.exe$/i, /\.msi$/i, /win-?x/i];
const LINUX_PATTERNS = [/linux/i, /x86_64/i, /amd64/i, /arm64/i, /\.AppImage$/i, /\.tar\.gz$/i, /\.deb$/i, /\.rpm$/i];

function filterAssetsByPlatform(assets: ReleaseAsset[], platform: "windows" | "linux") {
  const patterns = platform === "windows" ? WINDOWS_PATTERNS : LINUX_PATTERNS;
  return assets.filter((asset) => patterns.some((pattern) => pattern.test(asset.name)));
}

function AssetSection({ title, assets }: { title: string; assets: ReleaseAsset[] }) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        <span className="text-xs text-muted-foreground">{assets.length} file{assets.length === 1 ? "" : "s"}</span>
      </div>

      {assets.length === 0 ? (
        <p className="text-sm text-muted-foreground">No builds are published for this platform yet.</p>
      ) : (
        <ul className="space-y-3">
          {assets.map((asset) => (
            <li key={asset.id} className="rounded-2xl border bg-card/70 p-4 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium" title={asset.name}>
                    {asset.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{formatAssetSize(asset.size)}</p>
                </div>
                <Button asChild size="sm">
                  <a href={asset.browser_download_url} target="_blank" rel="noreferrer">
                    <ArrowDownToLine className="mr-2 size-4" aria-hidden="true" />
                    Download
                  </a>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default async function DownloadsPage() {
  let releases: GitHubRelease[] = [];
  let releasesError: string | null = null;

  try {
    releases = await fetchAllReleases();
  } catch {
    releasesError = "GitHub releases are unavailable right now. Please try again shortly.";
  }

  const latestRelease = releases.find((release) => !release.prerelease) ?? releases[0];
  const windowsAssets = latestRelease ? filterAssetsByPlatform(latestRelease.assets, "windows") : [];
  const linuxAssets = latestRelease ? filterAssetsByPlatform(latestRelease.assets, "linux") : [];

  return (
    <main className="max-w-4xl mx-auto px-4 py-12 space-y-10">
      <header className="space-y-3 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">Downloads</h1>
        <p className="text-muted-foreground">
          Fetch the latest SiteSurveyor desktop builds. Windows and Linux downloads are separated for clarity, and all
          files come straight from GitHub releases.
        </p>
      </header>

      {releasesError ? (
        <div className="rounded-2xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
          {releasesError}
        </div>
      ) : null}

      {latestRelease ? (
        <section className="space-y-6">
          <div className="rounded-3xl border bg-card/80 p-6 shadow-sm space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm text-muted-foreground">Latest {latestRelease.prerelease ? "prerelease" : "stable release"}</p>
                <h2 className="text-2xl font-semibold tracking-tight">
                  {latestRelease.name?.trim() || latestRelease.tag_name}
                </h2>
              </div>
              <div className="text-sm text-muted-foreground text-right">
                <p>Tag {latestRelease.tag_name}</p>
                <p>Published {formatReleaseDate(latestRelease.published_at)}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <a href={latestRelease.html_url} target="_blank" rel="noreferrer">
                  View release notes
                  <ArrowUpRight className="ml-2 size-4" aria-hidden="true" />
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={`https://github.com/${REPO_FULL_NAME}/releases`} target="_blank" rel="noreferrer">
                  Browse all releases
                  <ArrowUpRight className="ml-2 size-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <AssetSection title="Windows builds" assets={windowsAssets} />
            <AssetSection title="Linux builds" assets={linuxAssets} />
          </div>
        </section>
      ) : releasesError ? null : (
        <p className="text-sm text-muted-foreground">No releases are available yet.</p>
      )}
    </main>
  );
}
