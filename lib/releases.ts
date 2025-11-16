export type ReleaseHighlight = {
  text: string;
  isBreaking: boolean;
};

export function formatReleaseDate(isoDate?: string) {
  if (!isoDate) return "Unpublished";
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(new Date(isoDate));
}

export function formatAssetSize(bytes?: number) {
  if (!bytes && bytes !== 0) return "";
  const units = ["B", "KB", "MB", "GB", "TB"] as const;
  let value = bytes;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  const formattedValue = value % 1 === 0 ? value.toFixed(0) : value.toFixed(1);
  return `${formattedValue} ${units[unitIndex]}`;
}

export function extractReleaseHighlights(body?: string | null): ReleaseHighlight[] {
  if (!body) return [];

  const lines = body
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const bulletPoints = lines
    .filter((line) => /^[-*+]/.test(line))
    .map((line) => line.replace(/^[-*+]\s*/, ""));

  const meaningful = (bulletPoints.length > 0 ? bulletPoints : lines).filter((line) => line.length > 3);

  return meaningful.slice(0, 3).map((text) => ({
    text,
    isBreaking: /breaking/i.test(text),
  }));
}
