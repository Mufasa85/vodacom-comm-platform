"use client";

import { CalendarDays, Search } from "lucide-react";
import * as React from "react";
import { ConversationListItem } from "@/components/conversations/conversation-list-item";
import { useLocale } from "@/components/locale-provider";
import type { Conversation } from "@/lib/types/conversation";
import { cn } from "@/lib/utils";

const filterKeys = ["all", "unread", "favorites", "agents"] as const;
type ConversationFilter = (typeof filterKeys)[number];

const dateFilterKeys = ["all", "today", "yesterday", "week", "month", "custom"] as const;
type DateFilter = (typeof dateFilterKeys)[number];

function startOfDay(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function matchesDate(isoDate: string, filter: DateFilter, range: { from: string; to: string }) {
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
  const { t } = useLocale();
  const [filter, setFilter] = React.useState<ConversationFilter>("all");
  const [query, setQuery] = React.useState("");
  const [dateFilter, setDateFilter] = React.useState<DateFilter>("all");
  const [dateMenuOpen, setDateMenuOpen] = React.useState(false);
  const [range, setRange] = React.useState({ from: "", to: "" });

  const filtered = conversations.filter((c) => {
    if (query && !c.name.toLowerCase().includes(query.toLowerCase())) return false;
    if (!matchesDate(c.lastMessageAt, dateFilter, range)) return false;
    if (filter === "unread") return c.unread > 0;
    if (filter === "favorites") return c.pinned;
    if (filter === "agents") return c.participants.some((p) => p.role === "agent");
    return true;
  });

  const official = filtered.filter((c) => c.category === "official");
  const recent = filtered.filter((c) => c.category === "recent");
  const totalUnread = conversations.reduce((sum, c) => sum + c.unread, 0);

  return (
    <div className="flex h-full w-[320px] shrink-0 flex-col border-r border-border bg-card">
      <div className="flex items-center justify-between px-4 pt-4">
        <h1 className="text-[16px] font-semibold tracking-tight text-foreground">
          {t("conversations.title")}
        </h1>
        <span className="text-[12px] text-muted-foreground">
          {totalUnread} {t("conversations.unread")}
        </span>
      </div>

      <div className="px-4 pt-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("conversations.searchPlaceholder")}
            className="h-9 w-full rounded-md border border-input bg-surface pl-8 pr-3 text-[13px] text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </div>

      <div className="flex items-center gap-1.5 px-4 pb-3 pt-3">
        {filterKeys.map((key) => (
          <button
            type="button"
            key={key}
            onClick={() => setFilter(key)}
            className={cn(
              "rounded-full px-2.5 py-1 text-[12px] font-medium transition-colors",
              filter === key
                ? "bg-primary text-white"
                : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            {t(`conversations.filters.${key}`)}
          </button>
        ))}
      </div>

      <div className="relative px-4 pb-3">
        <button
          type="button"
          onClick={() => setDateMenuOpen((v) => !v)}
          className={cn(
            "flex h-8 w-full items-center gap-1.5 rounded-md border border-input bg-surface px-2.5 text-[12.5px] font-medium transition-colors hover:bg-muted",
            dateFilter === "all" ? "text-muted-foreground" : "border-primary/40 text-primary"
          )}
        >
          <CalendarDays className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{t(`conversations.dateFilters.${dateFilter}`)}</span>
          {dateFilter !== "all" && (
            <button
              type="button"
              aria-label={t("conversations.resetDateFilter")}
              onClick={(e) => {
                e.stopPropagation();
                setDateFilter("all");
                setRange({ from: "", to: "" });
              }}
              className="ml-auto shrink-0 rounded px-1 text-[11px] text-muted-foreground hover:text-foreground"
            >
              {t("conversations.clear")}
            </button>
          )}
        </button>

        {dateMenuOpen && (
          <div className="absolute left-4 right-4 top-10 z-50 rounded-lg border border-border bg-card p-1.5 shadow-raised">
            {dateFilterKeys.map((key) => (
              <button
                type="button"
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
                {t(`conversations.dateFilters.${key}`)}
              </button>
            ))}

            {dateFilter === "custom" && (
              <div className="mt-1 space-y-2 border-t border-border px-2.5 pb-1 pt-2">
                <label className="block text-[11.5px] text-muted-foreground">
                  {t("conversations.from")}
                  <input
                    type="date"
                    value={range.from}
                    max={range.to || undefined}
                    onChange={(e) => setRange((r) => ({ ...r, from: e.target.value }))}
                    className="mt-1 h-8 w-full rounded-md border border-input bg-surface px-2 text-[12.5px] text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </label>
                <label className="block text-[11.5px] text-muted-foreground">
                  {t("conversations.to")}
                  <input
                    type="date"
                    value={range.to}
                    min={range.from || undefined}
                    onChange={(e) => setRange((r) => ({ ...r, to: e.target.value }))}
                    className="mt-1 h-8 w-full rounded-md border border-input bg-surface px-2 text-[12.5px] text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </label>
                <button
                  type="button"
                  onClick={() => setDateMenuOpen(false)}
                  className="h-8 w-full rounded-md bg-primary text-[12.5px] font-medium text-white transition-opacity hover:opacity-90"
                >
                  {t("conversations.apply")}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-2.5 pb-4">
        {official.length > 0 && (
          <div className="mb-1 mt-1 px-2 text-[12px] font-semibold text-muted-foreground/80">
            {t("conversations.sectionOfficial")}
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
            {t("conversations.sectionRecent")}
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
            {t("conversations.emptyList")}
          </div>
        )}
      </div>
    </div>
  );
}
