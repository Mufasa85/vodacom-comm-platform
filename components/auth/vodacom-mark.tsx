import { cn } from "@/lib/utils";

/**
 * Original enterprise wordmark for the internal platform shell.
 * Deliberately does not reproduce Vodacom's trademarked speechmark —
 * uses an abstract signal-bars monogram instead.
 */
export function VodacomMark({
  variant = "dark",
  className,
}: {
  variant?: "dark" | "light";
  className?: string;
}) {
  const isLight = variant === "light";
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-[8px]",
          isLight ? "bg-white" : "bg-primary"
        )}
      >
        <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
          <rect x="0" y="8" width="3" height="6" rx="1" fill={isLight ? "#E60000" : "#fff"} />
          <rect x="6.5" y="4.5" width="3" height="9.5" rx="1" fill={isLight ? "#E60000" : "#fff"} />
          <rect x="13" y="0" width="3" height="14" rx="1" fill={isLight ? "#E60000" : "#fff"} />
        </svg>
      </span>
      <span
        className={cn(
          "text-[15px] font-semibold tracking-tight",
          isLight ? "text-white" : "text-foreground"
        )}
      >
        Vodacom
        <span className={cn("font-normal", isLight ? "text-white/70" : "text-muted-foreground")}>
          {" "}
          Care
        </span>
      </span>
    </div>
  );
}
