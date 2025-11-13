import { AlertCircle, CheckCircle2, Hammer, RotateCcw } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { fetchStatusSnapshot } from "@/lib/status";

const indicatorConfig = {
  none: {
    icon: CheckCircle2,
    label: "Operational",
    variant: "success" as const,
  },
  minor: {
    icon: AlertCircle,
    label: "Minor disruption",
    variant: "warning" as const,
  },
  major: {
    icon: AlertCircle,
    label: "Major outage",
    variant: "warning" as const,
  },
  critical: {
    icon: AlertCircle,
    label: "Critical outage",
    variant: "warning" as const,
  },
  maintenance: {
    icon: Hammer,
    label: "Maintenance",
    variant: "secondary" as const,
  },
} as const;

export default async function StatusWidget() {
  const snapshot = await fetchStatusSnapshot();
  const config = indicatorConfig[snapshot.indicator] ?? indicatorConfig.none;
  const Icon = config.icon;

  const updatedAt = new Date(snapshot.updatedAt);
  const diffHours = Number.isFinite(updatedAt.getTime())
    ? Math.round((updatedAt.getTime() - Date.now()) / (1000 * 60 * 60))
    : 0;
  const relative = new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(diffHours, "hour");

  return (
    <div className="rounded-2xl border bg-card/80 p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <Badge variant={config.variant}>
          <Icon className="mr-1 size-4" aria-hidden="true" />
          {config.label}
        </Badge>
        <span className="text-xs text-muted-foreground">Updated {relative}</span>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{snapshot.description}</p>
      <div className="mt-4 flex items-center justify-between border-t pt-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <RotateCcw className="size-3.5" aria-hidden="true" />
          <span>{snapshot.source}</span>
        </div>
        {snapshot.pageUrl ? (
          <Link href={snapshot.pageUrl} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
            View details
          </Link>
        ) : null}
      </div>
    </div>
  );
}
