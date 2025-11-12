import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Success Stories | SiteSurveyor",
  description: "How teams and students use SiteSurveyor to collect, process, and share geospatial data.",
};

export default function SuccessStoriesPage() {
  const stories: {
    title: string;
    context: string;
    highlights: string[];
    links: { label: string; href: string }[];
  }[] = [
    {
      title: "Student capstone projects",
      context:
        "Students use the free plan to run field practicals: capture points and lines on-site, process at the lab, and share results for review.",
      highlights: [
        "Cross‑platform: collect on mobile, review on desktop",
        "Basic features are free, with Pro adding AI‑assisted QA",
        "Open source codebase to learn from and extend",
      ],
      links: [
        { label: "Download apps", href: "/downloads" },
        { label: "View repository", href: "https://github.com/ConsoleMangena/sitesurveyor" },
      ],
    },
    {
      title: "Small-firm site layout QA",
      context:
        "A compact workflow for verifying site layouts. Teams prepare forms, capture in the field, then export reports for clients.",
      highlights: [
        "Fast onboarding with a lightweight UI",
        "Consistent web, Windows, and Debian builds",
        "Versioned releases and automated build pipeline",
      ],
      links: [
        { label: "Latest release", href: "https://github.com/ConsoleMangena/sitesurveyor/releases/latest" },
        { label: "All releases", href: "https://github.com/ConsoleMangena/sitesurveyor/releases" },
      ],
    },
    {
      title: "Community mapping & sharing",
      context:
        "Open datasets can be collected and published quickly. Teams share links to maps and outputs for feedback.",
      highlights: [
        "Open source: fork, customize, and deploy",
        "Works offline via desktop builds; online via web app",
        "Simple sharing via exports and links",
      ],
      links: [
        { label: "Get started", href: "/documentation" },
        { label: "Contribute on GitHub", href: "https://github.com/ConsoleMangena/sitesurveyor" },
      ],
    },
  ];

  return (
    <main className="max-w-5xl mx-auto px-4 py-12 space-y-10">
      <header className="space-y-3 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Success Stories</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Real ways SiteSurveyor is applied in learning and practice. Explore how cross‑platform tools and an open‑source stack help deliver results.
        </p>
      </header>

      <div className="space-y-6">
        {stories.map((s) => (
          <article key={s.title} className="space-y-3 border rounded-lg p-5 bg-card">
            <h2 className="text-lg font-semibold">{s.title}</h2>
            <p className="text-muted-foreground">{s.context}</p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              {s.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3 pt-1">
              {s.links.map((l) => (
                l.href.startsWith("/") ? (
                  <Button asChild key={l.href} size="sm">
                    <Link href={l.href}>{l.label}</Link>
                  </Button>
                ) : (
                  <Button asChild key={l.href} size="sm" variant="outline">
                    <a href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
                  </Button>
                )
              ))}
            </div>
          </article>
        ))}
      </div>

      <section className="space-y-2 text-center">
        <h2 className="text-lg font-medium">Share your story</h2>
        <p className="text-muted-foreground">Have a result to share? We’d love to feature it.</p>
        <Button asChild>
          <a
            href="https://github.com/ConsoleMangena/sitesurveyor/issues/new?title=Success%20Story%3A%20%3CYour%20Org%3E&body=What%20was%20the%20challenge%3F%0AWhat%20did%20you%20do%20with%20SiteSurveyor%3F%0AWhat%20was%20the%20impact%3F"
            target="_blank"
            rel="noopener noreferrer"
          >
            Submit via GitHub
          </a>
        </Button>
      </section>
    </main>
  );
}
