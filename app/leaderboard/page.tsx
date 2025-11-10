"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getAllUsers, LeaderUser } from "@/lib/leaderboard";

export default function LeaderboardPage() {
  const [users, setUsers] = useState<LeaderUser[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await getAllUsers(60);
      if (!cancelled) setUsers(res);
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <header className="space-y-2 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Leaderboard</h1>
        <p className="text-muted-foreground">Top contributors this month</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {(users ?? []).map((u, idx) => (
          <motion.article
            key={(u.name || "user") + idx}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4, delay: (idx % 6) * 0.05 }}
            className="rounded-lg border bg-card p-4 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <h3 className="font-medium truncate">{u.name}</h3>
                <p className="text-xs text-muted-foreground truncate">{[u.organization, u.role].filter(Boolean).join(" • ")}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {u.city}
                  {u.location ? ` • ${u.location.lat?.toFixed(3)}, ${u.location.lng?.toFixed(3)}` : ''}
                </p>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold">{u.score ?? "-"}</div>
                <div className="text-xs text-muted-foreground">Score</div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {users === null && (
        <p className="text-center text-muted-foreground">Loading...</p>
      )}
    </main>
  );
}
