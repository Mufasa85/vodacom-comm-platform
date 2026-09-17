"use client";

import { Moon, Sun } from "lucide-react";
import { LanguageToggle } from "@/components/layout/language-toggle";
import { useLocale } from "@/components/locale-provider";
import { useTheme } from "@/components/theme-provider";
import { BrandPanel } from "./brand-panel";
import { VodacomMark } from "./vodacom-mark";

export function AuthShell({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLocale();

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col px-6 py-8 sm:px-10 lg:px-16 lg:py-12">
        <div className="mb-10 flex items-center justify-between">
          <div className="lg:hidden">
            <VodacomMark />
          </div>
          <div className="ml-auto flex items-center gap-1">
            <LanguageToggle />
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? t("common.themeLight") : t("common.themeDark")}
              className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {theme === "dark" ? (
                <Sun className="h-[18px] w-[18px]" />
              ) : (
                <Moon className="h-[18px] w-[18px]" />
              )}
            </button>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-[400px]">{children}</div>
        </div>
      </div>
      <BrandPanel />
    </div>
  );
}
