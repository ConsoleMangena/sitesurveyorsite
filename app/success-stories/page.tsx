import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Success Stories | SiteSurveyor",
  description: "Real-world stories of teams using SiteSurveyor to deliver results.",
};

export default function SuccessStoriesPage() {
  const stories = [
    {
      org: "Municipal Survey Team (Example)",
      summary:
        "Reduced field‑to‑report turnaround from 3 days to 24 hours by standardizing data capture and automating QA.",
    },
    {
      org: "University Research Lab (Example)",
      summary:
        "Coordinated multi‑site fieldwork with mobile capture and centralized processing, improving data consistency.",
    },
  ];

  return (
    <main className="max-w-5xl mx-auto px-4 py-12 space-y-10">
      <header className="space-y-3 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Success Stories</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          A few examples of the outcomes teams are achieving with SiteSurveyor.
        </p>
      </header>

      <div className="space-y-6">
        {stories.map((s) => (
          <article key={s.org} className="space-y-1 border rounded-lg p-4 bg-card">
            <h2 className="text-lg font-medium">{s.org}</h2>
            <p className="text-muted-foreground">{s.summary}</p>
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
