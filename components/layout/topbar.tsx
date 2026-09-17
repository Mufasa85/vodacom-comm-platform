"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bell, ChevronDown, Globe, Moon, Sun } from "lucide-react";
import * as React from "react";
import { VodacomMark } from "@/components/auth/vodacom-mark";
import { useTheme } from "@/components/theme-provider";

export function Topbar() {
  const [lang, setLang] = React.useState<"FR" | "EN">("FR");
  const [notifOpen, setNotifOpen] = React.useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border bg-card px-4">
      <div className="flex flex-1 items-center">
        <VodacomMark />
      </div>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => setLang((l) => (l === "FR" ? "EN" : "FR"))}
          className="flex h-9 items-center gap-1.5 rounded-md px-2.5 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <Globe className="h-4 w-4" />
          {lang}
        </button>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Passer au thème clair" : "Passer au thème sombre"}
          className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <AnimatePresence mode="wait" initial={false}>
            {theme === "dark" ? (
              <motion.span
                key="sun"
                initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
              >
                <Sun className="h-[18px] w-[18px]" />
              </motion.span>
            ) : (
              <motion.span
                key="moon"
                initial={{ opacity: 0, rotate: 90, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -90, scale: 0.6 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
              >
                <Moon className="h-[18px] w-[18px]" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() => setNotifOpen((v) => !v)}
            className="relative flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Bell className="h-[18px] w-[18px]" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary ring-2 ring-card" />
          </button>
          {notifOpen && (
            <div className="absolute right-0 top-11 z-50 w-80 rounded-lg border border-border bg-card p-1.5 shadow-raised">
              <div className="px-2.5 py-2 text-[13px] font-semibold text-foreground">
                Notifications
              </div>
              {[
                { title: "Nouveau message — Assistance Mobile", time: "il y a 2 min" },
                { title: "Bundle 5 Go activé sur votre ligne", time: "il y a 6 min" },
                { title: "TOBi a répondu à votre demande", time: "il y a 18 min" },
              ].map((n) => (
                <button
                  type="button"
                  key={n.title}
                  className="flex w-full flex-col items-start rounded-md px-2.5 py-2 text-left transition-colors hover:bg-muted"
                >
                  <span className="text-[13px] text-foreground">{n.title}</span>
                  <span className="text-[11.5px] text-muted-foreground">{n.time}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          className="ml-1 flex h-9 items-center gap-2 rounded-md pl-1 pr-2 transition-colors hover:bg-muted"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#111111] text-[11px] font-semibold text-white">
            MC
          </span>
          <span className="hidden text-left leading-tight sm:block">
            <span className="block text-[13px] font-medium text-foreground">Mon compte</span>
            <span className="block text-[11px] text-muted-foreground">0821 234 567</span>
          </span>
          <ChevronDown className="hidden h-3.5 w-3.5 text-muted-foreground sm:block" />
        </button>
      </div>
    </header>
  );
}
