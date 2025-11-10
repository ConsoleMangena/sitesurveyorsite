"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";

export default function NotificationsPage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-12 space-y-6 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Notifications</h1>
        <p className="text-muted-foreground">Please sign in to view your notifications.</p>
        <div className="flex items-center justify-center">
          <Button asChild>
            <Link href="/login">Sign in</Link>
          </Button>
        </div>
      </main>
    );
  }

  // Placeholder content; integrate with Appwrite later
  const notifications: { id: string; title: string; date: string; body: string }[] = [];

  return (
    <main className="max-w-3xl mx-auto px-4 py-12 space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Notifications</h1>
        <p className="text-muted-foreground">Stay up to date with your project activity and updates.</p>
      </header>

      {notifications.length === 0 ? (
        <div className="text-center text-muted-foreground">No notifications yet.</div>
      ) : (
        <ul className="space-y-3">
          {notifications.map((n) => (
            <li key={n.id} className="border rounded-lg p-4 bg-card">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-medium">{n.title}</h2>
                <span className="text-xs text-muted-foreground">{n.date}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{n.body}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
