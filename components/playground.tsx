"use client";

import { useMemo, useState } from "react";
import { AlertCircle, CheckCircle2, Compass, ExternalLink, GitBranch, Github, RefreshCw } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type SampleProject = {
  id: string;
  name: string;
  location: string;
  updatedAt: string;
  summary: string;
  metrics: {
    coverage: number;
    photos: number;
    issues: number;
    elevationMatches: number;
  };
  notes: string[];
  checklist: Array<{ id: string; label: string; status: "complete" | "pending" }>;
};

const samples: SampleProject[] = [
  {
    id: "wind-farm",
    name: "North Ridge Wind Farm",
    location: "Cheyenne, WY",
    updatedAt: "2025-10-12T16:30:00.000Z",
    summary:
      "Verification flight over 32 turbines to confirm footing elevations and cable trench alignments before winterization.",
    metrics: {
      coverage: 96,
      photos: 428,
      issues: 3,
      elevationMatches: 29,
    },
    notes: [
      "Pad elevations within ±12 mm tolerance.",
      "Turbine 12 needs additional revetment on south slope.",
      "Cable trench 6E flagged for re-survey after melt.",
    ],
    checklist: [
      { id: "ground-control", label: "Ground control targets collected", status: "complete" },
      { id: "uav-sync", label: "UAV flight logs synced", status: "complete" },
      { id: "client-export", label: "Client export ready", status: "pending" },
    ],
  },
  {
    id: "urban-redev",
    name: "Riverside Redevelopment",
    location: "Portland, OR",
    updatedAt: "2025-11-04T09:20:00.000Z",
    summary:
      "Daily reality capture of mixed-use site with automatic clash detection against structural BIM revisions.",
    metrics: {
      coverage: 88,
      photos: 312,
      issues: 5,
      elevationMatches: 18,
    },
    notes: [
      "Detected column drift of 38 mm on grid B4 level 3.",
      "Concrete pour window delayed 24h pending rebar inspection.",
      "Coordinate tie-in with city GIS confirmed.",
    ],
    checklist: [
      { id: "stakeout", label: "Stakeout points confirmed", status: "complete" },
      { id: "rfi", label: "RFIs synced to field tablets", status: "pending" },
      { id: "city-upload", label: "City GIS upload", status: "pending" },
    ],
  },
  {
    id: "pipeline",
    name: "Northern Loop Expansion",
    location: "Regina, SK",
    updatedAt: "2025-09-28T21:45:00.000Z",
    summary:
      "Pipeline corridor monitoring with LiDAR swath comparison for frost heave and encroachment detection.",
    metrics: {
      coverage: 74,
      photos: 164,
      issues: 1,
      elevationMatches: 42,
    },
    notes: [
      "Frost heave flagged near KP 12+450.",
      "Two new encroachments detected at access road delta.",
      "Vegetation height trending above spec near KP 08+100.",
    ],
    checklist: [
      { id: "lidar", label: "LiDAR passes validated", status: "complete" },
      { id: "report", label: "Anomaly report drafted", status: "complete" },
      { id: "operator-brief", label: "Operator briefing uploaded", status: "pending" },
    ],
  },
];

type PlaygroundRelease = {
  id: number;
  name: string;
  tag: string;
  htmlUrl: string;
  publishedAt: string;
  assets: Array<{
    id: number;
    name: string;
    size: number;
    downloadUrl: string;
  }>;
};

type PlaygroundRepoSnapshot = {
  stars: number;
  forks: number;
  watchers: number;
  subscribers: number;
  openIssues: number;
  defaultBranch: string;
  pushedAt: string;
};

type PlaygroundIssue = {
  id: number;
  number: number;
  title: string;
  htmlUrl: string;
  labels: string[];
  createdAt: string;
  comments: number;
};

type PlaygroundProps = {
  releases: PlaygroundRelease[];
  repoSnapshot: PlaygroundRepoSnapshot | null;
  issues: PlaygroundIssue[];
};

const REPO_URL = "https://github.com/ConsoleMangena/sitesurveyor";

const RELATIVE_TIME_FORMATTER = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

function formatRelativeTime(dateString: string) {
  const target = new Date(dateString);
  if (Number.isNaN(target.getTime())) return "";

  const diffMilliseconds = target.getTime() - Date.now();
  const diffSeconds = diffMilliseconds / 1000;
  const absSeconds = Math.abs(diffSeconds);

  if (absSeconds < 60) {
    return RELATIVE_TIME_FORMATTER.format(Math.round(diffSeconds), "second");
  }

  const diffMinutes = diffSeconds / 60;
  if (Math.abs(diffMinutes) < 60) {
    return RELATIVE_TIME_FORMATTER.format(Math.round(diffMinutes), "minute");
  }

  const diffHours = diffMinutes / 60;
  if (Math.abs(diffHours) < 24) {
    return RELATIVE_TIME_FORMATTER.format(Math.round(diffHours), "hour");
  }

  const diffDays = diffHours / 24;
  if (Math.abs(diffDays) < 7) {
    return RELATIVE_TIME_FORMATTER.format(Math.round(diffDays), "day");
  }

  const diffWeeks = diffDays / 7;
  if (Math.abs(diffWeeks) < 5) {
    return RELATIVE_TIME_FORMATTER.format(Math.round(diffWeeks), "week");
  }

  const diffMonths = diffDays / 30;
  if (Math.abs(diffMonths) < 12) {
    return RELATIVE_TIME_FORMATTER.format(Math.round(diffMonths), "month");
  }

  const diffYears = diffDays / 365;
  return RELATIVE_TIME_FORMATTER.format(Math.round(diffYears), "year");
}

function formatFileSize(bytes: number) {
  if (!Number.isFinite(bytes)) return "";
  const units = ["B", "KB", "MB", "GB"];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }

  return `${size.toFixed(size >= 10 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}

export default function Playground({ releases, repoSnapshot, issues }: PlaygroundProps) {
  const [selection, setSelection] = useState(samples[0]);
  const [syncing, setSyncing] = useState(false);
  const [customNote, setCustomNote] = useState("");

  const relativeUpdated = useMemo(() => formatRelativeTime(selection.updatedAt), [selection.updatedAt]);
  const relativeRepoUpdated = repoSnapshot ? formatRelativeTime(repoSnapshot.pushedAt) : null;

  async function simulateSync() {
    setSyncing(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setSyncing(false);
  }

  function handleCustomNoteSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!customNote.trim()) return;

    setSelection((prev) => ({
      ...prev,
      notes: [customNote.trim(), ...prev.notes].slice(0, 5),
    }));
    setCustomNote("");
  }

  return (
    <section className="space-y-6">
      <Card className="bg-card/70 backdrop-blur">
        <CardHeader className="flex flex-col gap-2">
          <CardTitle className="text-xl">Hands-on playground</CardTitle>
          <p className="text-sm text-muted-foreground">
            Toggle through sample projects to experience how SiteSurveyor stitches capture, QA, and delivery into a
            single workflow. Drop a note, simulate a field sync, and preview analytics instantly.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {samples.map((sample) => (
              <Button
                key={sample.id}
                type="button"
                variant={selection.id === sample.id ? "default" : "outline"}
                onClick={() => setSelection(sample)}
                className="text-sm"
              >
                <Compass className="mr-2 size-4" aria-hidden="true" />
                {sample.name}
              </Button>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
            <div className="space-y-4 rounded-2xl border bg-muted/30 p-5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{selection.location}</Badge>
                <Badge variant="outline">Last sync {relativeUpdated}</Badge>
              </div>
              <h2 className="text-xl font-semibold">{selection.name}</h2>
              <p className="text-sm text-muted-foreground">{selection.summary}</p>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border bg-background/80 p-4">
                  <p className="text-xs uppercase text-muted-foreground">Coverage</p>
                  <p className="text-2xl font-semibold">{selection.metrics.coverage}%</p>
                </div>
                <div className="rounded-xl border bg-background/80 p-4">
                  <p className="text-xs uppercase text-muted-foreground">Photos</p>
                  <p className="text-2xl font-semibold">{selection.metrics.photos}</p>
                </div>
                <div className="rounded-xl border bg-background/80 p-4">
                  <p className="text-xs uppercase text-muted-foreground">Issues</p>
                  <p className="text-2xl font-semibold">{selection.metrics.issues}</p>
                </div>
                <div className="rounded-xl border bg-background/80 p-4">
                  <p className="text-xs uppercase text-muted-foreground">Elevation matches</p>
                  <p className="text-2xl font-semibold">{selection.metrics.elevationMatches}</p>
                </div>
              </div>

              <form onSubmit={handleCustomNoteSubmit} className="flex flex-col gap-2 md:flex-row">
                <Input
                  value={customNote}
                  onChange={(event) => setCustomNote(event.target.value)}
                  placeholder="Add a quick observation..."
                />
                <Button type="submit" variant="secondary">
                  Add note
                </Button>
              </form>

              <div className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Crew notes</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {selection.notes.map((note, index) => (
                    <li key={index} className="rounded-lg border border-dashed border-border/60 bg-background/70 px-3 py-2">
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border bg-card/80 p-5 text-sm text-muted-foreground">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Sync simulator</p>
                <p className="mt-2">
                  Emulates a field tablet upload pushing fresh logs, photos, and survey shots back to HQ. Use it to see
                  how dashboards react in real time.
                </p>
                <Button
                  type="button"
                  onClick={simulateSync}
                  className="mt-4 w-full"
                  disabled={syncing}
                >
                  {syncing ? (
                    <span className="inline-flex items-center gap-2">
                      <RefreshCw className="size-4 animate-spin" aria-hidden="true" />
                      Syncing
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2">
                      <CheckCircle2 className="size-4" aria-hidden="true" />
                      Simulate sync
                    </span>
                  )}
                </Button>
              </div>

              <div className="rounded-2xl border bg-card/80 p-5 space-y-3">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Deployment readiness</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {selection.checklist.map((item) => (
                    <li key={item.id} className="flex items-center gap-2">
                      <span
                        className={`size-2 rounded-full ${
                          item.status === "complete" ? "bg-emerald-500" : "bg-amber-500"
                        }`}
                        aria-hidden="true"
                      />
                      <span>{item.label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border bg-card/80 p-5 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Repository snapshot</p>
                    <p className="text-sm text-foreground">ConsoleMangena/sitesurveyor</p>
                  </div>
                  {relativeRepoUpdated ? (
                    <Badge variant="outline">Pushed {relativeRepoUpdated}</Badge>
                  ) : (
                    <Badge variant="outline" className="text-muted-foreground">Status unavailable</Badge>
                  )}
                </div>
                {repoSnapshot ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-xl border bg-background/80 p-3">
                        <p className="text-[11px] uppercase text-muted-foreground">Stars</p>
                        <p className="text-lg font-semibold">{repoSnapshot.stars.toLocaleString()}</p>
                      </div>
                      <div className="rounded-xl border bg-background/80 p-3">
                        <p className="text-[11px] uppercase text-muted-foreground">Forks</p>
                        <p className="text-lg font-semibold">{repoSnapshot.forks.toLocaleString()}</p>
                      </div>
                      <div className="rounded-xl border bg-background/80 p-3">
                        <p className="text-[11px] uppercase text-muted-foreground">Watchers</p>
                        <p className="text-lg font-semibold">{repoSnapshot.watchers.toLocaleString()}</p>
                      </div>
                      <div className="rounded-xl border bg-background/80 p-3">
                        <p className="text-[11px] uppercase text-muted-foreground">Open issues</p>
                        <p className="text-lg font-semibold">{repoSnapshot.openIssues.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <GitBranch className="size-3" aria-hidden="true" />
                      <span>Default branch: {repoSnapshot.defaultBranch}</span>
                      <span aria-hidden="true">•</span>
                      <span>{repoSnapshot.subscribers.toLocaleString()} subscribers</span>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <Button asChild className="flex-1">
                        <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 size-4" aria-hidden="true" />
                          View repository
                        </a>
                      </Button>
                      <Button asChild variant="outline" className="flex-1">
                        <a href={`${REPO_URL}/pulse`} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 size-4" aria-hidden="true" />
                          Activity pulse
                        </a>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed border-border/70 bg-background/70 p-4 text-sm">
                    <p className="flex items-center gap-2 text-muted-foreground">
                      <AlertCircle className="size-4" aria-hidden="true" />
                      Live repository metrics are temporarily unavailable. Try refreshing shortly.
                    </p>
                  </div>
                )}
              </div>

              <div className="rounded-2xl border bg-card/80 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Latest releases</p>
                  <Badge variant="secondary">Top {Math.min(releases.length, 3)}</Badge>
                </div>
                {releases.length > 0 ? (
                  <div className="space-y-3">
                    {releases.map((release) => (
                      <div key={release.id} className="rounded-xl border bg-background/80 p-4 space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <p className="text-sm font-semibold">{release.name}</p>
                            <p className="text-xs text-muted-foreground">Published {formatRelativeTime(release.publishedAt)}</p>
                          </div>
                          <Badge variant="outline">{release.tag}</Badge>
                        </div>
                        {release.assets.length > 0 ? (
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            {release.assets.map((asset) => (
                              <li key={asset.id} className="flex flex-wrap items-center justify-between gap-2">
                                <span>{asset.name}</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-muted-foreground">{formatFileSize(asset.size)}</span>
                                  <Button asChild variant="outline" size="sm">
                                    <a href={asset.downloadUrl} target="_blank" rel="noopener noreferrer">
                                      <ExternalLink className="mr-1 size-3" aria-hidden="true" />
                                      Download
                                    </a>
                                  </Button>
                                </div>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-xs text-muted-foreground">No downloadable assets in this release.</p>
                        )}
                        <Button asChild size="sm" className="w-full">
                          <a href={release.htmlUrl} target="_blank" rel="noopener noreferrer">
                            View release notes
                          </a>
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Releases will appear here once the GitHub API responds.
                  </p>
                )}
              </div>

              <div className="rounded-2xl border bg-card/80 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Active issues</p>
                  <Badge variant="secondary">{issues.length}</Badge>
                </div>
                {issues.length > 0 ? (
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    {issues.map((issue) => (
                      <li key={issue.id} className="rounded-xl border bg-background/80 p-4 space-y-2">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <p className="text-sm font-semibold text-foreground">#{issue.number} · {issue.title}</p>
                            <p className="text-xs text-muted-foreground">
                              Opened {formatRelativeTime(issue.createdAt)} · {issue.comments} comments
                            </p>
                          </div>
                          <Button asChild variant="outline" size="sm">
                            <a href={issue.htmlUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="mr-1 size-3" aria-hidden="true" />
                              View
                            </a>
                          </Button>
                        </div>
                        {issue.labels.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {issue.labels.map((label) => (
                              <Badge key={label} variant="outline">
                                {label}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="size-4 text-emerald-500" aria-hidden="true" />
                    No open issues detected — create a new one to share feedback.
                  </p>
                )}
                <Button asChild variant="secondary" className="w-full">
                  <a href={`${REPO_URL}/issues/new/choose`} target="_blank" rel="noopener noreferrer">
                    Submit an issue or feature idea
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
