"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getTopUsers, LeaderUser } from "@/lib/leaderboard";

type User = LeaderUser & { stats?: { projects?: number; datasets?: number; score?: number } };

const placeholder: User[] = [
  { name: "Tendai Moyo", organization: "Harare Surveys", role: "Professional", city: "Harare", projects: 12, datasets: 24, score: 98 },
  { name: "Rudo Chikore", organization: "Midlands Geo", role: "Researcher", city: "Gweru", projects: 9, datasets: 18, score: 94 },
  { name: "Kuda Ncube", organization: "Bulawayo Mapping", role: "Professional", city: "Bulawayo", projects: 10, datasets: 21, score: 92 },
];

function Avatar({ name, src }: { name: string; src?: string }) {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className="h-10 w-10 rounded-full object-cover border"
      />
    );
  }
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div className="h-10 w-10 rounded-full flex items-center justify-center bg-sky-600 text-white text-sm font-medium border">
      {initials}
    </div>
  );
}

export default function BestUsers() {
  const now = new Date();
  const month = now.toLocaleString(undefined, { month: "long" });
  const year = now.getFullYear();
  const [items, setItems] = useState<User[]>(placeholder);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await getTopUsers(6);
      if (!cancelled && res && res.length > 0) {
        setItems(res as User[]);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <section className="w-full border-t bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-end justify-between mb-6">
          <div className="space-y-1">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Users of the Month
            </h2>
            <p className="text-sm text-muted-foreground">{month} {year}</p>
          </div>
          <Link href="/leaderboard" className="text-sm text-foreground/80 hover:text-foreground hover:underline underline-offset-4">View all</Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((u, idx) => (
            <motion.article
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              key={u.name}
              className="rounded-lg border bg-card p-4 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center gap-3">
                <Avatar name={u.name} src={u.avatar} />
                <div className="min-w-0">
                  <h3 className="font-medium truncate">{u.name}</h3>
                  <p className="text-xs text-muted-foreground truncate">
                    {u.organization} {u.role ? '• ' + u.role : ''}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {u.city}
                    {u.location ? ` • ${u.location.lat.toFixed(3)}, ${u.location.lng.toFixed(3)}` : ''}
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 text-center">
                <div className="px-2">
                  <div className="text-lg font-semibold">{u.projects ?? '-'}</div>
                  <div className="text-xs text-muted-foreground">Projects</div>
                </div>
                <div className="px-2">
                  <div className="text-lg font-semibold">{u.datasets ?? '-'}</div>
                  <div className="text-xs text-muted-foreground">Datasets</div>
                </div>
                <div className="px-2">
                  <div className="text-lg font-semibold">{u.score ?? '-'}</div>
                  <div className="text-xs text-muted-foreground">Score</div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
