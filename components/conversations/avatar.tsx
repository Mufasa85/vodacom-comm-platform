import { getInitials, cn } from "@/lib/utils";

export function Avatar({
  name,
  color = "#6B7280",
  online,
  size = "md",
}: {
  name: string;
  color?: string;
  online?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const dims = size === "lg" ? "h-10 w-10 text-[13px]" : size === "sm" ? "h-6 w-6 text-[10px]" : "h-8 w-8 text-[11.5px]";
  const dotDims = size === "lg" ? "h-2.5 w-2.5" : "h-2 w-2";

  return (
    <span className="relative inline-flex shrink-0">
      <span
        className={cn("flex items-center justify-center rounded-full font-semibold text-white", dims)}
        style={{ backgroundColor: color }}
      >
        {getInitials(name)}
      </span>
      {online && (
        <span
          className={cn(
            "absolute -bottom-0.5 -right-0.5 rounded-full bg-success ring-2 ring-card",
            dotDims
          )}
        />
      )}
    </span>
  );
}
