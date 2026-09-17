"use client";

import * as React from "react";

import { conversations } from "@/lib/data/conversations";
import { ConversationList } from "@/components/conversations/conversation-list";
import { ChatWindow } from "@/components/conversations/chat-window";

export default function ConversationsPage() {
  const [activeId, setActiveId] = React.useState(conversations[2].id);

  const active = conversations.find((c) => c.id === activeId) ?? null;

  return (
    <div className="flex h-full">
      <ConversationList
        conversations={conversations}
        activeId={activeId}
        onSelect={(id) => {
          setActiveId(id);
        }}
      />
      <ChatWindow conversation={active} />
    </div>
  );
}
