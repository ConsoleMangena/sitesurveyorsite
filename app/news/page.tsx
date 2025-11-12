import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News | SiteSurveyor",
  description: "Latest updates, releases, and announcements.",
};

export default function NewsPage() {
  const posts: { title: string; date: string; summary: string }[] = [
    {
      title: "Website launched",
      date: "2025-11-01",
      summary: "The new SiteSurveyor website is live with product overview, docs, and downloads.",
    },
    {
      title: "Desktop releases available",
      date: "2025-11-10",
      summary:
        "Initial Windows (ZIP) and Ubuntu/Debian (amd64 .deb) builds are published on GitHub Releases.",
    },
  ];

  return (
    <main className="max-w-5xl mx-auto px-4 py-12 space-y-8">
      <header className="space-y-3 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">News</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Product updates, release notes, and announcements.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-center text-muted-foreground">No news yet. Check back soon.</p>
      ) : (
        <div className="space-y-6">
          {posts.map((p) => (
            <article key={p.title} className="space-y-1 border rounded-lg p-4 bg-card">
              <h2 className="text-lg font-medium">{p.title}</h2>
              <p className="text-xs text-muted-foreground">{p.date}</p>
              <p className="text-muted-foreground">{p.summary}</p>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
