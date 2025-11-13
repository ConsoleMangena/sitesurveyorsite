"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Compass, RefreshCw } from "lucide-react";

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

export default function Playground() {
  const [selection, setSelection] = useState(samples[0]);
  const [syncing, setSyncing] = useState(false);
  const [customNote, setCustomNote] = useState("");

  const relativeUpdated = useMemo(() => {
    const date = new Date(selection.updatedAt);
    return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
      Math.round((date.getTime() - Date.now()) / (1000 * 60 * 60)),
      "hour",
    );
  }, [selection.updatedAt]);

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
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
