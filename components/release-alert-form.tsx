"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const frequencies = [
  { value: "immediate", label: "Every release" },
  { value: "daily", label: "Daily digest" },
  { value: "weekly", label: "Weekly summary" },
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type StatusState = {
  type: "idle" | "success" | "error";
  message: string;
};

export default function ReleaseAlertForm({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [frequency, setFrequency] = useState("immediate");
  const [status, setStatus] = useState<StatusState>({ type: "idle", message: "" });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!emailRegex.test(email)) {
      setStatus({ type: "error", message: "Please provide a valid email address." });
      return;
    }

    setSubmitting(true);
    setStatus({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/release-alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, frequency }),
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        setStatus({
          type: "error",
          message: payload?.message || "We couldn't register you right now. Please try again soon.",
        });
        return;
      }

      setStatus({ type: "success", message: "You're on the list! We'll email you when new releases land." });
      setEmail("");
    } catch {
      setStatus({ type: "error", message: "Network error. Check your connection and retry." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-3", className)}>
      <div className="space-y-2">
        <label htmlFor="alert-email" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Email address
        </label>
        <Input
          id="alert-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={submitting}
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="alert-frequency" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Notification cadence
        </label>
        <div className="relative">
          <select
            id="alert-frequency"
            className="w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring/40 disabled:cursor-not-allowed disabled:opacity-50"
            value={frequency}
            onChange={(event) => setFrequency(event.target.value)}
            disabled={submitting}
          >
            {frequencies.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-muted-foreground">⌄</span>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={submitting}>
        {submitting ? (
          <span className="inline-flex items-center gap-2">
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Saving
          </span>
        ) : (
          "Notify me"
        )}
      </Button>

      {status.type !== "idle" ? (
        <p
          className={cn(
            "text-xs",
            status.type === "success" ? "text-emerald-600" : "text-red-600",
          )}
        >
          {status.message}
        </p>
      ) : null}
    </form>
  );
}
