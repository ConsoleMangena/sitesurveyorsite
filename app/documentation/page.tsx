import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation | SiteSurveyor",
  description: "Getting started, guides, and references for SiteSurveyor.",
};

export default function DocumentationPage() {
  const sections = [
    {
      title: "Getting started",
      items: [
        "Create an account and set up your organization",
        "Configure projects and permissions",
        "Connect Appwrite backend and environment variables",
      ],
    },
    {
      title: "Data collection",
      items: [
        "Field capture workflows",
        "Forms and validation",
        "Offline capture (planned)",
      ],
    },
    {
      title: "Processing & QA",
      items: [
        "Pipelines and transformations",
        "Quality checks and review",
        "Versioning and provenance",
      ],
    },
    {
      title: "Presentation & dissemination",
      items: [
        "Reports and shareable links",
        "Embeds and exports",
        "Maps and layers",
      ],
    },
    {
      title: "Management & storage",
      items: [
        "Access control and roles",
        "Storage, backups, and retention",
        "Auditing and activity logs",
      ],
    },
  ];

  return (
    <main className="max-w-5xl mx-auto px-4 py-12 space-y-10">
      <header className="space-y-3 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Documentation</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore guides and references to build end‑to‑end workflows with SiteSurveyor.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        {sections.map((s) => (
          <section key={s.title} className="space-y-2">
            <h2 className="text-lg font-medium">{s.title}</h2>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              {s.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
