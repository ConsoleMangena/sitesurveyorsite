import "server-only";

export type StatusSnapshot = {
  indicator: "none" | "minor" | "major" | "critical" | "maintenance";
  description: string;
  updatedAt: string;
  source: string;
  pageUrl?: string;
};

const DEFAULT_STATUS_URL = "https://www.githubstatus.com/api/v2/status.json";

const statusFeed =
  process.env.NEXT_PUBLIC_STATUS_FEED ?? process.env.STATUS_FEED_URL ?? DEFAULT_STATUS_URL;

export async function fetchStatusSnapshot(): Promise<StatusSnapshot> {
  try {
    const response = await fetch(statusFeed, {
      next: { revalidate: 60, tags: ["status-feed"] },
    });

    if (!response.ok) {
      throw new Error(`Status feed returned ${response.status}`);
    }

    const payload = await response.json();

    if (payload?.status?.indicator) {
      return {
        indicator: payload.status.indicator,
        description: payload.status.description ?? "Operational",
        updatedAt: payload.page?.updated_at ?? new Date().toISOString(),
        source: payload.page?.name ?? "Status", 
        pageUrl: payload.page?.url,
      };
    }

    if (payload?.status) {
      return {
        indicator: payload.status as StatusSnapshot["indicator"],
        description: payload.description ?? "Status",
        updatedAt: payload.updatedAt ?? new Date().toISOString(),
        source: payload.source ?? statusFeed,
        pageUrl: payload.pageUrl,
      };
    }
  } catch (error) {
    console.error("status-feed", error);
  }

  return {
    indicator: "none",
    description: "Status feed unavailable",
    updatedAt: new Date().toISOString(),
    source: statusFeed,
  };
}
