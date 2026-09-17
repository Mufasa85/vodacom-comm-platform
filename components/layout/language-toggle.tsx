"use client";

import { Globe } from "lucide-react";
import { useLocale } from "@/components/locale-provider";

export function LanguageToggle({ className }: { className?: string }) {
  const { localeLabel, toggleLocale, t } = useLocale();

  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label={t("common.switchLanguage")}
      className={
        className ??
        "flex h-9 items-center gap-1.5 rounded-md px-2.5 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      }
    >
      <Globe className="h-4 w-4" />
      {localeLabel}
    </button>
  );
}
