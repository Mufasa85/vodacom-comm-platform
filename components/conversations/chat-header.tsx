"use client";

import { Search, X } from "lucide-react";
import * as React from "react";
import { ChannelIcon } from "@/components/conversations/channel-icon";
import type { Conversation } from "@/lib/types/conversation";
import { cn } from "@/lib/utils";

export function ChatHeader({
  conversation,
  onSearchChange,
}: {
  conversation: Conversation;
  onSearchChange: (query: string) => void;
}) {
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  React.useEffect(() => {
    onSearchChange(searchOpen ? query : "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, searchOpen]);

  return (
    <div className="flex h-16 shrink-0 items-center gap-3 border-b border-border bg-card px-5">
      <ChannelIcon icon={conversation.icon} accent={conversation.accent} />
      <div className="min-w-0 flex-1">
        <h2 className="truncate text-[15px] font-semibold text-foreground">{conversation.name}</h2>
        <p className="truncate text-[12.5px] text-muted-foreground">
          {conversation.isChannel
            ? `Salon · ${conversation.memberCount ?? 0} membres`
            : "Conversation directe"}
          {conversation.onlineCount ? ` · ${conversation.onlineCount} en ligne` : ""}
        </p>
      </div>

      {searchOpen ? (
        <div className="flex shrink-0 items-center gap-1.5">
          <div className="relative w-[220px] sm:w-[280px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher dans la conversation…"
              className="h-9 w-full rounded-md border border-input bg-surface pl-8 pr-3 text-[13px] text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <HeaderIconButton
            label="Fermer la recherche"
            onClick={() => {
              setSearchOpen(false);
              setQuery("");
            }}
          >
            <X className="h-4 w-4" />
          </HeaderIconButton>
        </div>
      ) : (
        <HeaderIconButton label="Rechercher" onClick={() => setSearchOpen(true)}>
          <Search className="h-[17px] w-[17px]" />
        </HeaderIconButton>
      )}
    </div>
  );
}

function HeaderIconButton({
  children,
  label,
  onClick,
  active,
}: {
  children: React.ReactNode;
  label: string;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
        active && "bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary"
      )}
    >
      {children}
    </button>
  );
}
