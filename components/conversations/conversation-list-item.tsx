"use client";

import { Pin } from "lucide-react";
import { ChannelIcon } from "@/components/conversations/channel-icon";
import type { Conversation } from "@/lib/types/conversation";
import { cn } from "@/lib/utils";

export function ConversationListItem({
  conversation,
  active,
  onSelect,
}: {
  conversation: Conversation;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "group flex w-full items-center gap-3 rounded-md px-2.5 py-2.5 text-left transition-colors",
        active ? "bg-primary/[0.07]" : "hover:bg-muted"
      )}
    >
      <span className="relative shrink-0">
        <ChannelIcon icon={conversation.icon} accent={conversation.accent} />
        {conversation.online && (
          <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-success ring-2 ring-card" />
        )}
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex items-center justify-between gap-2">
          <span
            className={cn(
              "truncate text-[13.5px]",
              active || conversation.unread
                ? "font-semibold text-foreground"
                : "font-medium text-foreground/90"
            )}
          >
            {conversation.name}
          </span>
          <span className="shrink-0 text-[11px] text-muted-foreground">
            {conversation.lastMessageTime}
          </span>
        </span>
        <span className="mt-0.5 flex items-center justify-between gap-2">
          <span className="truncate text-[12.5px] text-muted-foreground">
            {conversation.lastMessagePreview}
          </span>
          <span className="flex shrink-0 items-center gap-1">
            {conversation.pinned && <Pin className="h-3 w-3 text-muted-foreground" />}
            {conversation.unread > 0 && (
              <span className="flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-primary px-1 text-[10.5px] font-semibold text-white">
                {conversation.unread}
              </span>
            )}
          </span>
        </span>
      </span>
    </button>
  );
}
