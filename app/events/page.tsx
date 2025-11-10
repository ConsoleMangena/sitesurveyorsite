import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events | SiteSurveyor",
  description: "Upcoming meetups, webinars, and community events.",
};

export default function EventsPage() {
  const events: { name: string; date: string; location: string }[] = [];

  return (
    <main className="max-w-5xl mx-auto px-4 py-12 space-y-8">
      <header className="space-y-3 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Events</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Join the community online and in person.
        </p>
      </header>

      {events.length === 0 ? (
        <p className="text-center text-muted-foreground">No upcoming events yet.</p>
      ) : (
        <div className="space-y-6">
          {events.map((e) => (
            <article key={e.name} className="space-y-1 border rounded-lg p-4 bg-card">
              <h2 className="text-lg font-medium">{e.name}</h2>
              <p className="text-xs text-muted-foreground">{e.date} — {e.location}</p>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
