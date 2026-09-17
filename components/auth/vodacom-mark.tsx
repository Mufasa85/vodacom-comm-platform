import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * Wordmark de la plateforme : le logo Vodacom en médaillon circulaire
 * suivi du nom du produit.
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
          "flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white",
          isLight ? "ring-1 ring-white/40" : "ring-1 ring-border"
        )}
      >
        <Image
          src="/logo-vodacom.png"
          alt="Vodacom"
          width={36}
          height={36}
          priority
          className="h-9 w-9 object-cover"
        />
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
