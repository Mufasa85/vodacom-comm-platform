"use client";

import * as React from "react";
import { Search, X } from "lucide-react";

import type { Conversation } from "@/lib/types/conversation";
import { ChannelIcon } from "@/components/conversations/channel-icon";
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
      {searchOpen ? (
        <div className="flex flex-1 items-center gap-2">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher dans la conversation…"
            className="h-9 flex-1 rounded-md border border-input bg-surface px-3 text-[13.5px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <button
            onClick={() => {
              setSearchOpen(false);
              setQuery("");
            }}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <>
          <ChannelIcon icon={conversation.icon} accent={conversation.accent} />
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-[15px] font-semibold text-foreground">
              {conversation.name}
            </h2>
            <p className="truncate text-[12.5px] text-muted-foreground">
              {conversation.isChannel
                ? `Salon · ${conversation.memberCount ?? 0} membres`
                : "Conversation directe"}
              {conversation.onlineCount ? ` · ${conversation.onlineCount} en ligne` : ""}
            </p>
          </div>

          <div className="flex items-center gap-0.5">
            <HeaderIconButton label="Rechercher" onClick={() => setSearchOpen(true)}>
              <Search className="h-[17px] w-[17px]" />
            </HeaderIconButton>
          </div>
        </>
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
