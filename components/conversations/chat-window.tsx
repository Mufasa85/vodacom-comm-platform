"use client";

import { MessageSquareOff, Pin } from "lucide-react";
import * as React from "react";
import { ChatComposer } from "@/components/conversations/chat-composer";
import { ChatHeader } from "@/components/conversations/chat-header";
import { MessageBubble } from "@/components/conversations/message-bubble";
import { TypingIndicator } from "@/components/conversations/typing-indicator";
import { useLocale } from "@/components/locale-provider";
import { currentUser } from "@/lib/data/conversations";
import { localeToBcp47 } from "@/lib/i18n/translations";
import type { Conversation, Message } from "@/lib/types/conversation";

export function ChatWindow({ conversation }: { conversation: Conversation | null }) {
  const { t, locale } = useLocale();
  const [messages, setMessages] = React.useState<Message[]>(conversation?.messages ?? []);
  const [typing, setTyping] = React.useState(false);
  const [replyTo, setReplyTo] = React.useState<Message | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setMessages(conversation?.messages ?? []);
    setReplyTo(null);
    // On ne réinitialise qu'au changement de conversation, pas à chaque nouveau message.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversation?.id]);

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  if (!conversation) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center gap-3 bg-surface text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
          <MessageSquareOff className="h-6 w-6 text-muted-foreground" />
        </span>
        <div>
          <p className="text-[14px] font-medium text-foreground">
            {t("conversations.noSelectionTitle")}
          </p>
          <p className="text-[13px] text-muted-foreground">{t("conversations.noSelectionBody")}</p>
        </div>
      </div>
    );
  }

  const participants = conversation.participants;
  const participantMap = new Map(participants.map((p) => [p.id, p]));
  const pinnedMessage = messages.find((m) => m.pinned);

  function handleSend(text: string) {
    const newMessage: Message = {
      id: `local-${Date.now()}`,
      senderId: "me",
      kind: "text",
      text,
      time: new Date().toLocaleTimeString(localeToBcp47(locale), {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "sent",
      replyToId: replyTo?.id,
    };
    setMessages((prev) => [...prev, newMessage]);

    // simulate delivery + a reply from the first agent-like participant
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) => (m.id === newMessage.id ? { ...m, status: "delivered" } : m))
      );
    }, 500);

    const responder = participants.find((p) => p.role === "agent" || p.role === "bot");
    if (responder) {
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: `reply-${Date.now()}`,
            senderId: responder.id,
            kind: "text",
            text: t("conversations.autoReply"),
            time: new Date().toLocaleTimeString(localeToBcp47(locale), {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]);
      }, 1800);
    }
  }

  function handleReact(messageId: string, emoji: string) {
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id !== messageId) return m;
        const existing = m.reactions?.find((r) => r.emoji === emoji);
        const reactions = existing
          ? m.reactions?.map((r) => (r.emoji === emoji ? { ...r, count: r.count + 1 } : r))
          : [...(m.reactions ?? []), { emoji, count: 1 }];
        return { ...m, reactions };
      })
    );
  }

  return (
    <div className="flex h-full min-w-0 flex-1 flex-col bg-surface">
      <ChatHeader conversation={conversation} onSearchChange={setSearchQuery} />

      {pinnedMessage && (
        <div className="flex items-center gap-2 border-b border-border bg-warning/[0.06] px-5 py-2">
          <Pin className="h-3.5 w-3.5 shrink-0 text-warning" />
          <span className="truncate text-[12.5px] text-foreground/80">
            <span className="font-medium">{t("conversations.pinnedPrefix")}</span>{" "}
            {pinnedMessage.text}
          </span>
        </div>
      )}

      <div className="relative min-h-0 flex-1">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[url('/pattern.png')] bg-cover bg-center opacity-70 dark:opacity-[0.04]"
        />
        <div ref={scrollRef} className="relative h-full overflow-y-auto py-4">
          {messages.length === 0 ? (
            <div className="flex h-full items-center justify-center text-[13px] text-muted-foreground">
              {t("conversations.noMessages")}
            </div>
          ) : (
            messages.map((message, i) => {
              const prev = messages[i - 1];
              const showMeta =
                !prev || prev.senderId !== message.senderId || prev.kind === "system";
              const sender =
                message.senderId === "me"
                  ? {
                      id: "me",
                      name: currentUser.name,
                      role: currentUser.role,
                      avatarColor: "#111111",
                    }
                  : participantMap.get(message.senderId);
              const matchesSearch =
                !searchQuery ||
                (message.text ?? "").toLowerCase().includes(searchQuery.toLowerCase());

              return (
                <MessageBubble
                  key={message.id}
                  message={message}
                  sender={sender}
                  isMine={message.senderId === "me"}
                  showMeta={showMeta}
                  highlighted={!!searchQuery && matchesSearch && message.kind !== "system"}
                  onReact={(emoji) => handleReact(message.id, emoji)}
                />
              );
            })
          )}

          {typing && (
            <TypingIndicator
              name={
                participants.find((p) => p.role === "agent" || p.role === "bot")?.name ?? "TOBi AI"
              }
              color={participants.find((p) => p.role === "agent" || p.role === "bot")?.avatarColor}
            />
          )}
        </div>
      </div>

      <ChatComposer onSend={handleSend} replyTo={replyTo} onCancelReply={() => setReplyTo(null)} />
    </div>
  );
}
