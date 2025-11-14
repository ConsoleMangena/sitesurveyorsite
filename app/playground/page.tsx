import type { Metadata } from "next";

import Playground from "@/components/playground";
import { fetchAllReleases, fetchOpenIssues, fetchRepoSnapshot } from "@/lib/github";

export const metadata: Metadata = {
  title: "Playground | SiteSurveyor",
  description: "Interactive sandbox that showcases SiteSurveyor's inspection and reporting workflow.",
};

export default async function PlaygroundPage() {
  const [releasesResult, repoResult, issuesResult] = await Promise.allSettled([
    fetchAllReleases({ force: false }),
    fetchRepoSnapshot({ force: false }),
    fetchOpenIssues({ limit: 5, force: false }),
  ]);

  const releases = releasesResult.status === "fulfilled" ? releasesResult.value : [];
  const repoSnapshot = repoResult.status === "fulfilled" ? repoResult.value : null;
  const issues = issuesResult.status === "fulfilled" ? issuesResult.value : [];

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 space-y-8">
      <header className="space-y-3 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Playground</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Experiment with a guided, read-only workspace powered by sample data. Walk through the same capture → QA →
          delivery pipeline your team would use in production—no login required.
        </p>
      </header>

      <Playground
        releases={releases.slice(0, 3).map((release) => ({
          id: release.id,
          name: release.name ?? release.tag_name,
          tag: release.tag_name,
          htmlUrl: release.html_url,
          publishedAt: release.published_at,
          assets: release.assets.slice(0, 5).map((asset) => ({
            id: asset.id,
            name: asset.name,
            size: asset.size,
            downloadUrl: asset.browser_download_url,
          })),
        }))}
        repoSnapshot={repoSnapshot}
        issues={issues}
      />
    </main>
  );
}
