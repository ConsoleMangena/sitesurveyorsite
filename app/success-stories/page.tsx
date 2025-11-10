import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Success Stories | SiteSurveyor",
  description: "Real-world stories of teams using SiteSurveyor to deliver results.",
};

export default function SuccessStoriesPage() {
  const stories = [
    {
      org: "Your Organization Here",
      summary:
        "Share how SiteSurveyor improved your field capture and processing times.",
    },
    {
      org: "Another Team",
      summary:
        "Describe the impact on collaboration, QA, and data dissemination.",
    },
  ];

  return (
    <main className="max-w-5xl mx-auto px-4 py-12 space-y-8">
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
    </main>
  );
}
