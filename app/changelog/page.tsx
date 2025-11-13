import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock3 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { fetchAllReleases } from "@/lib/github";

export const metadata: Metadata = {
  title: "Changelog | SiteSurveyor",
  description: "Visual timeline of every SiteSurveyor release pulled directly from GitHub tags and notes.",
};

type TimelineSection = {
  period: string;
  releases: Awaited<ReturnType<typeof fetchAllReleases>>;
};

function groupByMonth(releases: Awaited<ReturnType<typeof fetchAllReleases>>) {
  const map = new Map<string, TimelineSection["releases"]>();

  for (const release of releases) {
    const published = release.published_at ? new Date(release.published_at) : new Date();
    const key = published.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key)!.push(release);
  }

  return Array.from(map.entries()).map(([period, releases]) => ({ period, releases }));
}

function extractHighlights(body?: string | null) {
  if (!body) return [] as string[];
  return body
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => /^[-*+]/.test(line))
    .map((line) => line.replace(/^[-*+]\s*/, ""))
    .slice(0, 4);
}

export default async function ChangelogPage() {
  const releases = await fetchAllReleases();
  const grouped = groupByMonth(
    releases.slice().sort((a, b) => {
      const ta = a.published_at ? Date.parse(a.published_at) : 0;
      const tb = b.published_at ? Date.parse(b.published_at) : 0;
      return tb - ta;
    }),
  );

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 space-y-10">
      <header className="space-y-3 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Changelog</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Every SiteSurveyor release in one place. Filter through months, review highlights, and jump straight to GitHub
          for the full diff.
        </p>
      </header>

      <section className="space-y-8">
        {grouped.map((section) => (
          <div key={section.period} className="space-y-4">
            <div className="flex items-center gap-3">
              <Clock3 className="size-4 text-primary" aria-hidden="true" />
              <h2 className="text-lg font-semibold">{section.period}</h2>
              <Badge variant="secondary">{section.releases.length} releases</Badge>
            </div>
            <div className="space-y-4">
              {section.releases.map((release) => {
                const published = release.published_at
                  ? new Date(release.published_at).toLocaleDateString("en-US", {
                      dateStyle: "medium",
                    })
                  : "Unpublished";
                const highlights = extractHighlights(release.body);

                return (
                  <Card key={release.id} className="bg-card/80 backdrop-blur">
                    <CardContent className="space-y-4 p-5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-semibold text-primary">{release.tag_name}</span>
                        {release.name ? (
                          <span className="text-sm text-muted-foreground">{release.name}</span>
                        ) : null}
                        {release.prerelease ? <Badge variant="warning">Pre-release</Badge> : null}
                      </div>
                      <p className="text-xs text-muted-foreground">Published {published}</p>

                      {highlights.length > 0 ? (
                        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                          {highlights.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          No structured notes provided. Visit GitHub for the full release context.
                        </p>
                      )}

                      <Link
                        href={release.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline"
                      >
                        View on GitHub
                        <ArrowUpRight className="size-4" aria-hidden="true" />
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
