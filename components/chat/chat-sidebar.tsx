"use client";

import { Boxes, PenSquare, Search, Sparkles } from "lucide-react";
import Link from "next/link";
import type * as React from "react";
import type { ChatThread } from "@/lib/types/chat";
import { cn } from "@/lib/utils";

/**
 * ChatGPT-style left rail.
 *
 * - Top: brand wordmark + secondary action.
 * - Primary action: "Nouveau chat" highlighted button.
 * - Icon-led navigation (Images, Bibliothèque, Planification, …).
 * - "Plus" expand menu.
 * - "Épinglés" + "Récents" sections (split by `thread.pinned`).
 * - Sticky footer: avatar + name + plan badge + upgrade CTA.
 *
 * The thread list is split locally — pinning/unpinning simply toggles
 * the boolean on the `ChatThread` object, so the parent doesn't need
 * to know about section ordering.
 */
export function ChatSidebar({
  threads,
  activeId,
  onNewChat,
  onSearch,
}: {
  threads: ChatThread[];
  activeId: string | null;
  onNewChat?: () => void;
  onSearch?: () => void;
}) {
  const pinned = threads.filter((t) => t.pinned);
  const recents = threads.filter((t) => !t.pinned);

  return (
    <aside className="flex h-full w-[260px] shrink-0 flex-col bg-card text-foreground">
      {/* Brand row */}
      <div className="flex items-center gap-2 px-3 pb-2 pt-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
          <Sparkles className="h-4 w-4 text-primary" />
        </div>
        <span className="text-[14.5px] font-semibold tracking-tight">Vodacom Chat</span>
        <button
          type="button"
          aria-label="Ouvrir un autre compte"
          className="ml-auto flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <Boxes className="h-4 w-4" />
        </button>
      </div>

      {/* Top actions */}
      <div className="flex items-center gap-1 px-3 pb-2 pt-1">
        <button
          type="button"
          onClick={onNewChat}
          className="flex flex-1 items-center gap-2 rounded-lg px-2.5 py-2 text-[13px] text-foreground transition-colors hover:bg-muted"
        >
          <PenSquare className="h-4 w-4 text-muted-foreground" />
          Nouveau chat
        </button>
        <button
          type="button"
          onClick={onSearch}
          aria-label="Rechercher"
          className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <Search className="h-4 w-4" />
        </button>
      </div>

      {/* Scrollable list — Épinglés + Récents */}
      <nav className="min-h-0 flex-1 overflow-y-auto px-2 pb-3">
        {pinned.length > 0 && <SectionHeader>Pinned</SectionHeader>}
        {pinned.map((thread) => (
          <ThreadItem key={thread.id} thread={thread} active={thread.id === activeId} />
        ))}

        {recents.length > 0 && <SectionHeader>Récents</SectionHeader>}
        {recents.map((thread) => (
          <ThreadItem key={thread.id} thread={thread} active={thread.id === activeId} />
        ))}
      </nav>

      {/* Profile footer */}
      <div className="border-t border-border px-3 py-3">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-orange-500 text-[11px] font-semibold text-white"
          >
            RM
          </span>
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate text-[12.5px] font-medium text-foreground">RANDY Musafiri</p>
            <p className="truncate text-[11px] text-muted-foreground">Free</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  if (!children) return null;
  return (
    <p className="mt-3 px-2.5 pb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
      {children}
    </p>
  );
}

function ThreadItem({ thread, active }: { thread: ChatThread; active: boolean }) {
  const displayNumber = (thread.number ?? "").padStart(3, "0") || "—";
  const href = `/chat/${displayNumber}`;
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left transition-colors",
        active ? "bg-muted" : "hover:bg-muted/70"
      )}
    >
      <span
        className={cn(
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-md border text-[11px] font-semibold tabular-nums tracking-tight transition-colors",
          active
            ? "border-primary bg-primary text-white"
            : "border-border bg-card text-muted-foreground"
        )}
      >
        {displayNumber}
      </span>
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "truncate text-[12.5px] font-medium leading-tight",
            active ? "text-foreground" : "text-foreground/85"
          )}
        >
          {thread.title}
        </p>
      </div>
    </Link>
  );
}
