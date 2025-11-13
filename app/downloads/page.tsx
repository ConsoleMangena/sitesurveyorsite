import type { Metadata } from "next";
<<<<<<< HEAD
import DownloadsList from "@/components/downloads-list";
=======
import Link from "next/link";
import { ArrowUpRight, DownloadIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type GitHubRelease = {
  id: number;
  name: string | null;
  tag_name: string;
  html_url: string;
  body?: string | null;
  published_at: string;
  draft: boolean;
  prerelease: boolean;
  assets: Array<{
    id: number;
    name: string;
    size: number;
    browser_download_url: string;
  }>;
};

const REPO_FULL_NAME = "ConsoleMangena/sitesurveyor";
const RELEASES_API = `https://api.github.com/repos/${REPO_FULL_NAME}/releases`;
const MAX_RELEASE_PAGES = 5;
const RELEASES_PER_PAGE = 100;

const GITHUB_HEADERS = {
  Accept: "application/vnd.github+json",
  "User-Agent": "SiteSurveyorSite/1.0",
} as const;

function formatDate(isoDate: string) {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(new Date(isoDate));
}

function formatBytes(bytes: number) {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return "Unknown size";
  }

  const units = ["B", "KB", "MB", "GB"] as const;
  const exponent = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1,
  );
  const value = bytes / 1024 ** exponent;
  return `${value.toFixed(value >= 10 || exponent === 0 ? 0 : 1)} ${units[exponent]}`;
}

function summarizeBody(body?: string | null) {
  if (!body) {
    return null;
  }

  const normalized = body
    .replace(/```[\s\S]*?```/g, "")
    .replace(/[#*_`>-]/g, "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (!normalized.length) {
    return null;
  }

  const summary = normalized.slice(0, 2).join(" ");
  import type { Metadata } from "next";
  import Link from "next/link";
  import { ArrowUpRight } from "lucide-react";

  import DownloadsList from "@/components/downloads-list";
  import { Button } from "@/components/ui/button";

  const REPO_FULL_NAME = "ConsoleMangena/sitesurveyor";

  export const metadata: Metadata = {
    title: "Downloads | SiteSurveyor",
    description: "Grab the latest SiteSurveyor builds and access the web experience in one place.",
  };

  export default function DownloadsPage() {
    return (
      <main className="max-w-5xl mx-auto px-4 py-12 space-y-10">
        <header className="space-y-3 text-center">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Downloads</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            SiteSurveyor ships as a modern web application and publishes tagged builds straight from our open-source
            repository. Use the browser app now, or pull the latest release artifacts to explore native integrations as
            they land.
          </p>
        </header>

        <section className="grid md:grid-cols-2 gap-6">
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

        <section className="space-y-4">
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

          <DownloadsList />
        </section>
      </main>
    );
  }
          SiteSurveyor ships as a modern web application and publishes tagged builds straight from
