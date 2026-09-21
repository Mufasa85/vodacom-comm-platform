"use client";

import { motion } from "framer-motion";
import { Check, CheckCheck, Sparkles } from "lucide-react";
import type { ChatMessage, ChatParticipant } from "@/lib/types/chat";
import { cn, getInitials } from "@/lib/utils";

/**
 * One row in the conversation: avatar + bubble + meta.
 *
 * - User messages (right side) use the brand red on the bubble.
 * - Assistant messages (left side) use a neutral card with a subtle border.
 * - Consecutive messages from the same sender collapse the avatar.
 */
export function ChatMessageRow({
  message,
  sender,
  showMeta,
}: {
  message: ChatMessage;
  sender?: ChatParticipant;
  showMeta: boolean;
}) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
      className={cn("flex w-full gap-3 px-5 py-1.5", isUser ? "flex-row-reverse" : "flex-row")}
    >
      {/* Avatar column — width is fixed so bubbles align nicely */}
      <div className="w-9 shrink-0">
        {!isUser && showMeta && sender && <Avatar participant={sender} />}
      </div>

      {/* Bubble column */}
      <div
        className={cn("flex min-w-0 max-w-[72%] flex-col", isUser ? "items-end" : "items-start")}
      >
        {showMeta && !isUser && sender && (
          <span className="mb-1 px-1 text-[12.5px] font-semibold text-foreground/80">
            {sender.name}
            {sender.role === "bot" && (
              <span className="ml-1.5 inline-flex items-center gap-1 rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                <Sparkles className="h-2.5 w-2.5" />
                IA
              </span>
            )}
          </span>
        )}

        <div
          className={cn(
            "relative rounded-[14px] px-4 py-2.5 text-[13.5px] leading-relaxed shadow-card",
            isUser
              ? "rounded-tr-[4px] bg-primary text-white"
              : "rounded-tl-[4px] border border-border bg-card text-foreground"
          )}
        >
          <p className="whitespace-pre-wrap break-words">{message.content}</p>
        </div>

        <div
          className={cn(
            "mt-1 flex items-center gap-1.5 px-1 text-[11px] text-muted-foreground",
            isUser && "flex-row-reverse"
          )}
        >
          <time dateTime={message.createdAt}>{formatTime(message.createdAt)}</time>
          {isUser && <DeliveryTicks status={message.status} />}
        </div>
      </div>
    </motion.div>
  );
}

function Avatar({ participant }: { participant: ChatParticipant }) {
  const bg = participant.avatarColor ?? "hsl(var(--muted-foreground))";
  return (
    <span
      className="flex h-9 w-9 items-center justify-center rounded-full text-[11px] font-semibold text-white shadow-sm"
      style={{ background: bg }}
      aria-hidden
    >
      {participant.initials ?? getInitials(participant.name)}
    </span>
  );
}

function DeliveryTicks({ status }: { status?: ChatMessage["status"] }) {
  if (!status || status === "sending") return null;
  if (status === "sent") return <Check className="h-3 w-3" />;
  return <CheckCheck className={cn("h-3 w-3", status === "read" && "text-primary")} />;
}

/** Formats an ISO timestamp as HH:MM, locale-aware. */
function formatTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
}
