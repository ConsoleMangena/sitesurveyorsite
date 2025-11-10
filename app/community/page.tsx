import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community | SiteSurveyor",
  description: "Join the SiteSurveyor community: discussions, support, and contribution.",
};

export default function CommunityPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12 space-y-10">
      <header className="space-y-3 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Community</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Connect with other surveyors, share workflows, and help shape the roadmap.
        </p>
      </header>

      <section className="grid md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <h2 className="text-lg font-medium">Discussions</h2>
          <p className="text-muted-foreground">
            Ask questions, propose features, and discuss best practices.
          </p>
        </div>
        <div className="space-y-2">
          <h2 className="text-lg font-medium">Contribute</h2>
          <p className="text-muted-foreground">
            Open issues, suggest improvements, and help improve docs.
          </p>
        </div>
        <div className="space-y-2">
          <h2 className="text-lg font-medium">Support</h2>
          <p className="text-muted-foreground">Get help with setup and integrations.</p>
        </div>
      </section>
    </main>
  );
}
