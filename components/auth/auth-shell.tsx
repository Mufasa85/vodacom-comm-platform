"use client";

import { Sun, Moon } from "lucide-react";

import { BrandPanel } from "./brand-panel";
import { VodacomMark } from "./vodacom-mark";
import { useTheme } from "@/components/theme-provider";

export function AuthShell({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="grid min-h-screen lg:grid-cols-[minmax(0,1fr)_480px]">
      <div className="flex flex-col px-6 py-8 sm:px-10 lg:px-16 lg:py-12">
        <div className="mb-10 flex items-center justify-between">
          <div className="lg:hidden">
            <VodacomMark />
          </div>
          <button
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Passer au thème clair" : "Passer au thème sombre"}
            className="ml-auto flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {theme === "dark" ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
          </button>
        </div>
        <div className="flex flex-1 items-center">
          <div className="w-full max-w-[400px]">{children}</div>
        </div>
      </div>
      <BrandPanel />
    </div>
  );
}
