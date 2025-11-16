import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GitPullRequest, Globe, ShieldCheck, Sparkles, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const description =
  "Learn how SiteSurveyor's open-source community builds and ships geospatial workflows across capture, QA, and delivery.";

export const metadata: Metadata = {
  title: "About | SiteSurveyor",
  description,
  alternates: {
    canonical: "https://sitesurveyor.dev/about",
  },
  openGraph: {
    title: "About SiteSurveyor · Open geomatics tooling",
    description,
    url: "https://sitesurveyor.dev/about",
    siteName: "SiteSurveyor",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About SiteSurveyor",
    description,
  },
};

export default function AboutPage() {
  const principles = [
    {
      title: "Open by default",
      description:
        "Every feature ships from the public repository, with issues, discussions, and roadmaps visible to all.",
      icon: Globe,
    },
    {
      title: "Community guarded",
      description:
        "Transparent governance plus lightweight RFCs keep platform choices measured and reversible.",
      icon: ShieldCheck,
    },
    {
      title: "Inclusive velocity",
      description:
        "Templates, starter issues, and mentorship sessions help first‑time contributors land real impact.",
      icon: Users,
    },
    {
      title: "Pragmatic innovation",
      description:
        "We prototype fast, document rigorously, and ship artifacts that teams can depend on in production.",
      icon: Sparkles,
    },
  ];

  const contributionSteps = [
    {
      title: "Discover the roadmap",
      detail: "Check Discussions, Issues, and the changelog labels to see what the community is prioritizing.",
      link: "https://github.com/ConsoleMangena/sitesurveyor/discussions",
    },
    {
      title: "Pick an issue",
      detail: "Good first issues, help‑wanted tasks, and RFCs all live in GitHub so triage stays transparent.",
      link: "https://github.com/ConsoleMangena/sitesurveyor/issues",
    },
    {
      title: "Ship and celebrate",
      detail: "Open a PR with context, screenshots, and tests. Maintainers review quickly and highlight wins in the changelog.",
      link: "https://github.com/ConsoleMangena/sitesurveyor/pulls",
    },
  ];

  const communityLinks = [
    {
      title: "Contribute on GitHub",
      blurb: "Star the repo, clone it locally, and explore the build tooling that powers every release.",
      href: "https://github.com/ConsoleMangena/sitesurveyor",
    },
    {
      title: "Documentation",
      blurb: "Follow install guides, API references, and workflow recipes maintained alongside the code.",
      href: "/documentation",
    },
    {
      title: "Releases & builds",
      blurb: "Grab signed artifacts, hashes, and release notes for every platform modernization sprint.",
      href: "/downloads",
    },
  ];

  return (
    <main className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      <section className="rounded-3xl border bg-gradient-to-br from-background via-background to-primary/5 p-8 text-center space-y-4">
        <p className="text-sm uppercase tracking-wide text-primary/80 font-semibold">Open source + geospatial</p>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">SiteSurveyor is built in the open</h1>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          We are an open-source geomatics platform maintained by surveyors, planners, and civic technologists. Every
          commit, build pipeline, and roadmap discussion happens in public so teams can trust what they deploy.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild>
            <a href="https://github.com/ConsoleMangena/sitesurveyor" target="_blank" rel="noreferrer">
              <GitPullRequest className="mr-2 size-4" aria-hidden="true" />
              Explore the repo
            </a>
          </Button>
          <Button asChild variant="outline">
            <Link href="/downloads">Grab the latest build</Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-6 rounded-3xl border bg-card/70 p-6 md:grid-cols-[auto,1fr] md:items-center">
        <div className="mx-auto h-48 w-48 overflow-hidden rounded-3xl border shadow-lg md:mx-0">
          <Image
            src="/profile.jpg"
            alt="Console Mangena"
            width={192}
            height={192}
            className="h-full w-full object-cover"
            priority
          />
        </div>
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">Founder</p>
          <div>
            <h2 className="text-2xl font-semibold">Console Mangena</h2>
            <p className="text-sm text-muted-foreground">Lead developer & SiteSurveyor project steward</p>
          </div>
          <p className="text-muted-foreground">
            Console started SiteSurveyor after years of coordinating survey teams who needed transparent tooling from
            capture to delivery. He now reviews community contributions, maintains the release pipeline, and mentors new
            contributors entering open-source geomatics.
          </p>
          <div className="flex flex-wrap gap-3">
            <Badge variant="secondary">Roadmap curator</Badge>
            <Badge variant="outline">Full-stack engineer</Badge>
            <Badge variant="info">Field data advocate</Badge>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Why we exist</p>
          <h2 className="text-2xl font-semibold">Accessible, auditable geomatics workflows</h2>
          <p className="text-muted-foreground max-w-3xl">
            SiteSurveyor keeps the entire capture → QA → delivery pipeline transparent. Tagged releases mirror source,
            desktop and web experiences stay in sync, and data governance is configurable without vendor lock‑in.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {principles.map((principle) => {
            const Icon = principle.icon;
            return (
              <article key={principle.title} className="rounded-2xl border bg-card/70 p-5 space-y-3">
                <div className="inline-flex rounded-full bg-primary/10 p-2 text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-base font-semibold">{principle.title}</h3>
                  <p className="text-sm text-muted-foreground">{principle.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="rounded-3xl border bg-muted/40 p-6 space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Contribute</p>
          <h2 className="text-2xl font-semibold">How to get involved</h2>
          <p className="text-muted-foreground">
            Whether you are field-testing builds, writing documentation, or shipping features, the workflow stays the
            same—transparent, async-friendly, and designed for shared ownership.
          </p>
        </div>
        <ol className="space-y-4 border-l pl-6">
          {contributionSteps.map((step, index) => (
            <li key={step.title} className="relative">
              <span className="absolute -left-3 top-1 flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                {index + 1}
              </span>
              <div className="space-y-1">
                <h3 className="text-base font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.detail}</p>
                <Button asChild variant="link" className="px-0 text-sm">
                  <a href={step.link} target="_blank" rel="noreferrer">
                    Open resource
                  </a>
                </Button>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Community resources</p>
          <h2 className="text-2xl font-semibold">Everything lives beside the code</h2>
          <p className="text-muted-foreground max-w-3xl">
            Deployment docs, platform builds, architecture decisions, and governance notes share one repo. No PDF lag, no
            private portals—just immediate context for anyone joining the project.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {communityLinks.map((resource) => (
            <article key={resource.title} className="rounded-2xl border bg-card/80 p-5 space-y-3">
              <h3 className="text-base font-semibold">{resource.title}</h3>
              <p className="text-sm text-muted-foreground">{resource.blurb}</p>
              {resource.href.startsWith("http") ? (
                <Button asChild variant="outline" size="sm">
                  <a href={resource.href} target="_blank" rel="noreferrer">
                    Open
                  </a>
                </Button>
              ) : (
                <Button asChild variant="outline" size="sm">
                  <Link href={resource.href}>Open</Link>
                </Button>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
