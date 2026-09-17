"use client";

import * as React from "react";
import { CalendarDays, Search } from "lucide-react";

import type { Conversation } from "@/lib/types/conversation";
import { ConversationListItem } from "@/components/conversations/conversation-list-item";
import { cn } from "@/lib/utils";

const filters = ["Tous", "Non lus", "Favoris", "Conseillers"] as const;

const dateFilters = {
  all: "Toutes les dates",
  today: "Aujourd'hui",
  yesterday: "Hier",
  week: "7 derniers jours",
  month: "30 derniers jours",
  custom: "Période personnalisée",
} as const;

type DateFilter = keyof typeof dateFilters;

function startOfDay(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function matchesDate(
  isoDate: string,
  filter: DateFilter,
  range: { from: string; to: string }
) {
  if (filter === "all") return true;

  const date = new Date(isoDate);
  const today = startOfDay(new Date());

  if (filter === "custom") {
    if (range.from && date < startOfDay(new Date(range.from))) return false;
    if (range.to) {
      const to = startOfDay(new Date(range.to));
      to.setDate(to.getDate() + 1);
      if (date >= to) return false;
    }
    return true;
  }

  const daysAgo = Math.floor((today.getTime() - startOfDay(date).getTime()) / 86_400_000);
  if (filter === "today") return daysAgo === 0;
  if (filter === "yesterday") return daysAgo === 1;
  if (filter === "week") return daysAgo >= 0 && daysAgo < 7;
  return daysAgo >= 0 && daysAgo < 30;
}

export function ConversationList({
  conversations,
  activeId,
  onSelect,
}: {
  conversations: Conversation[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const [filter, setFilter] = React.useState<(typeof filters)[number]>("Tous");
  const [query, setQuery] = React.useState("");
  const [dateFilter, setDateFilter] = React.useState<DateFilter>("all");
  const [dateMenuOpen, setDateMenuOpen] = React.useState(false);
  const [range, setRange] = React.useState({ from: "", to: "" });

  const filtered = conversations.filter((c) => {
    if (query && !c.name.toLowerCase().includes(query.toLowerCase())) return false;
    if (!matchesDate(c.lastMessageAt, dateFilter, range)) return false;
    if (filter === "Non lus") return c.unread > 0;
    if (filter === "Favoris") return c.pinned;
    if (filter === "Conseillers") return c.participants.some((p) => p.role === "agent");
    return true;
  });

  const official = filtered.filter((c) => c.category === "official");
  const recent = filtered.filter((c) => c.category === "recent");
  const totalUnread = conversations.reduce((sum, c) => sum + c.unread, 0);

  return (
    <div className="flex h-full w-[320px] shrink-0 flex-col border-r border-border bg-card">
      <div className="flex items-center justify-between px-4 pt-4">
        <h1 className="text-[16px] font-semibold tracking-tight text-foreground">
          Discussions
        </h1>
        <span className="text-[12px] text-muted-foreground">
          {totalUnread} non lus
        </span>
      </div>

      <div className="px-4 pt-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher une conversation…"
            className="h-9 w-full rounded-md border border-input bg-surface pl-8 pr-3 text-[13px] text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </div>

      <div className="flex items-center gap-1.5 px-4 pb-3 pt-3">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full px-2.5 py-1 text-[12px] font-medium transition-colors",
              filter === f
                ? "bg-primary text-white"
                : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="relative px-4 pb-3">
        <button
          onClick={() => setDateMenuOpen((v) => !v)}
          className={cn(
            "flex h-8 w-full items-center gap-1.5 rounded-md border border-input bg-surface px-2.5 text-[12.5px] font-medium transition-colors hover:bg-muted",
            dateFilter === "all" ? "text-muted-foreground" : "border-primary/40 text-primary"
          )}
        >
          <CalendarDays className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{dateFilters[dateFilter]}</span>
          {dateFilter !== "all" && (
            <span
              role="button"
              tabIndex={0}
              aria-label="Réinitialiser le filtre par date"
              onClick={(e) => {
                e.stopPropagation();
                setDateFilter("all");
                setRange({ from: "", to: "" });
              }}
              className="ml-auto shrink-0 rounded px-1 text-[11px] text-muted-foreground hover:text-foreground"
            >
              Effacer
            </span>
          )}
        </button>

        {dateMenuOpen && (
          <div className="absolute left-4 right-4 top-10 z-50 rounded-lg border border-border bg-card p-1.5 shadow-raised">
            {(Object.keys(dateFilters) as DateFilter[]).map((key) => (
              <button
                key={key}
                onClick={() => {
                  setDateFilter(key);
                  if (key !== "custom") setDateMenuOpen(false);
                }}
                className={cn(
                  "flex w-full items-center rounded-md px-2.5 py-1.5 text-left text-[12.5px] transition-colors hover:bg-muted",
                  dateFilter === key ? "font-medium text-primary" : "text-foreground"
                )}
              >
                {dateFilters[key]}
              </button>
            ))}

            {dateFilter === "custom" && (
              <div className="mt-1 space-y-2 border-t border-border px-2.5 pb-1 pt-2">
                <label className="block text-[11.5px] text-muted-foreground">
                  Du
                  <input
                    type="date"
                    value={range.from}
                    max={range.to || undefined}
                    onChange={(e) => setRange((r) => ({ ...r, from: e.target.value }))}
                    className="mt-1 h-8 w-full rounded-md border border-input bg-surface px-2 text-[12.5px] text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </label>
                <label className="block text-[11.5px] text-muted-foreground">
                  Au
                  <input
                    type="date"
                    value={range.to}
                    min={range.from || undefined}
                    onChange={(e) => setRange((r) => ({ ...r, to: e.target.value }))}
                    className="mt-1 h-8 w-full rounded-md border border-input bg-surface px-2 text-[12.5px] text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </label>
                <button
                  onClick={() => setDateMenuOpen(false)}
                  className="h-8 w-full rounded-md bg-primary text-[12.5px] font-medium text-white transition-opacity hover:opacity-90"
                >
                  Appliquer
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-2.5 pb-4">
        {official.length > 0 && (
          <div className="mb-1 mt-1 px-2 text-[12px] font-semibold text-muted-foreground/80">
            Assistance Vodacom
          </div>
        )}
        <div className="space-y-0.5">
          {official.map((c) => (
            <ConversationListItem
              key={c.id}
              conversation={c}
              active={c.id === activeId}
              onSelect={() => onSelect(c.id)}
            />
          ))}
        </div>

        {recent.length > 0 && (
          <div className="mb-1 mt-4 px-2 text-[12px] font-semibold text-muted-foreground/80">
            Conversations récentes
          </div>
        )}
        <div className="space-y-0.5">
          {recent.map((c) => (
            <ConversationListItem
              key={c.id}
              conversation={c}
              active={c.id === activeId}
              onSelect={() => onSelect(c.id)}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="px-2 py-10 text-center text-[13px] text-muted-foreground">
            Aucune conversation ne correspond à votre recherche.
          </div>
        )}
      </div>
    </div>
  );
}
