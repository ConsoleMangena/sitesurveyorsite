import { cn } from "@/lib/utils";

const badgeStyles = {
  default: "bg-primary/10 text-primary border border-primary/20",
  secondary: "bg-secondary/10 text-secondary-foreground border border-border/60",
  outline: "border border-border text-muted-foreground",
  warning: "bg-amber-500/10 text-amber-600 border border-amber-500/20",
  success: "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20",
  info: "bg-sky-500/10 text-sky-600 border border-sky-500/20",
} as const;

export type BadgeVariant = keyof typeof badgeStyles;

export function Badge({
  children,
  className,
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: BadgeVariant;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
        badgeStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
