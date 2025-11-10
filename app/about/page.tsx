import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | SiteSurveyor",
  description:
    "Learn about SiteSurveyor's mission and how we help surveyors collect, process, present/disseminate, manage, and store geospatial data.",
};

export default function AboutPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12 space-y-8">
      <header className="space-y-3 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">About SiteSurveyor</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          SiteSurveyor is a cross‑platform geomatics and planning suite that helps surveyors
          work the entire data lifecycle—collection, processing, presentation/dissemination,
          management, and storage—efficiently and affordably.
        </p>
      </header>

      <section className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h2 className="text-xl font-medium">Our mission</h2>
          <p className="text-muted-foreground">
            Deliver advanced, professional geospatial tooling that’s efficient, lightweight,
            and accessible—so teams can stay ahead of technology without breaking budgets.
          </p>
        </div>
        <div className="space-y-3">
          <h2 className="text-xl font-medium">What we offer</h2>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li>Data collection in the field</li>
            <li>Processing and QA pipelines</li>
            <li>Presentation, reporting, and dissemination</li>
            <li>Team data management and governance</li>
            <li>Secure storage and archival</li>
          </ul>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">Cross‑platform availability</h2>
        <p className="text-muted-foreground">
          SiteSurveyor is designed for desktop and mobile so your workflows stay consistent
          from the office to the field.
        </p>
      </section>
    </main>
  );
}
