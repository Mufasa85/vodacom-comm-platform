"use client";

import { motion } from "framer-motion";
import {
  Check,
  CheckCheck,
  Copy,
  FileText,
  Forward,
  MoreHorizontal,
  Pin,
  Play,
  Reply,
  Smile,
} from "lucide-react";
import * as React from "react";
import { Avatar } from "@/components/conversations/avatar";
import type { Message, Participant } from "@/lib/types/conversation";
import { cn } from "@/lib/utils";

const quickReactions = ["👍", "❤️", "😂", "🎉"];

/** Une couleur trop sombre (ex. le noir de TOBi) est illisible en thème sombre. */
function isDarkColor(hex?: string) {
  if (!hex || !/^#[0-9a-f]{6}$/i.test(hex)) return false;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.4;
}

export function MessageBubble({
  message,
  sender,
  isMine,
  showMeta,
  highlighted,
  onReact,
}: {
  message: Message;
  sender?: Participant;
  isMine: boolean;
  showMeta: boolean;
  highlighted?: boolean;
  onReact: (emoji: string) => void;
}) {
  const [toolbarOpen, setToolbarOpen] = React.useState(false);

  if (message.kind === "system") {
    return (
      <div className="my-4 flex items-center justify-center">
        <span className="rounded-full bg-muted px-3 py-1 text-[11.5px] font-medium text-muted-foreground">
          {message.text}
        </span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn("group flex gap-2.5 px-5 py-0.5", isMine && "flex-row-reverse")}
      onMouseEnter={() => setToolbarOpen(true)}
      onMouseLeave={() => setToolbarOpen(false)}
    >
      <div className="w-8 shrink-0">
        {!isMine && showMeta && sender && (
          <Avatar name={sender.name} color={sender.avatarColor} size="sm" />
        )}
      </div>

      <div className={cn("flex max-w-[62%] flex-col", isMine && "items-end")}>
        {showMeta && !isMine && sender && (
          <span
            className={cn(
              "mb-1 px-1 text-[12.5px] font-semibold",
              isDarkColor(sender.avatarColor) && "dark:!text-white"
            )}
            style={{ color: sender.avatarColor }}
          >
            {sender.name}
          </span>
        )}

        <div className="relative flex items-center gap-1.5">
          {isMine && toolbarOpen && <MessageToolbar onReact={onReact} align="left" />}

          <div
            className={cn(
              "rounded-[14px] px-3.5 py-2.5 text-[13.5px] leading-relaxed shadow-card",
              isMine
                ? "rounded-tr-[4px] bg-primary text-white"
                : "rounded-tl-[4px] border border-border bg-card text-foreground",
              highlighted && "ring-2 ring-warning"
            )}
          >
            {message.kind === "text" && <p className="whitespace-pre-wrap">{message.text}</p>}

            {message.kind === "options" && message.options && (
              <div className="flex min-w-[220px] flex-col gap-1.5">
                {message.options.map((opt) => (
                  <button
                    type="button"
                    key={opt}
                    className={cn(
                      "rounded-md border px-3 py-2 text-left text-[13px] font-medium transition-colors",
                      isMine
                        ? "border-white/30 bg-white/10 text-white hover:bg-white/20"
                        : "border-border bg-surface text-foreground hover:bg-muted"
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {message.kind === "file" && message.attachment && (
              <div className="flex min-w-[220px] items-center gap-3">
                <span
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-md",
                    isMine ? "bg-white/15" : "bg-primary/10 text-primary"
                  )}
                >
                  <FileText className="h-[18px] w-[18px]" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-medium">{message.attachment.name}</p>
                  <p
                    className={cn(
                      "text-[11.5px]",
                      isMine ? "text-white/70" : "text-muted-foreground"
                    )}
                  >
                    {message.attachment.size}
                  </p>
                </div>
              </div>
            )}

            {message.kind === "image" && (
              <div className="w-56 overflow-hidden rounded-md bg-foreground/5">
                <div className="flex h-36 items-center justify-center text-[12px] text-muted-foreground">
                  Aperçu image
                </div>
              </div>
            )}

            {message.kind === "voice" && (
              <div className="flex min-w-[200px] items-center gap-3">
                <button
                  type="button"
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                    isMine ? "bg-white/20" : "bg-primary/10 text-primary"
                  )}
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                </button>
                <div className="flex h-6 flex-1 items-center gap-[2px]">
                  {Array.from({ length: 24 }, (_, bar) => bar).map((bar) => (
                    <span
                      key={bar}
                      className={cn(
                        "w-[2.5px] rounded-full",
                        isMine ? "bg-white/50" : "bg-primary/40"
                      )}
                      style={{ height: `${8 + ((bar * 7) % 16)}px` }}
                    />
                  ))}
                </div>
                <span
                  className={cn(
                    "text-[11.5px]",
                    isMine ? "text-white/80" : "text-muted-foreground"
                  )}
                >
                  {message.voiceDuration ?? "0:12"}
                </span>
              </div>
            )}

            <div
              className={cn(
                "mt-1 flex items-center justify-end gap-1 text-[10.5px]",
                isMine ? "text-white/70" : "text-muted-foreground"
              )}
            >
              {message.time}
              {isMine && <MessageStatusTicks status={message.status} />}
            </div>
          </div>

          {!isMine && toolbarOpen && <MessageToolbar onReact={onReact} align="right" />}
        </div>

        {message.reactions && message.reactions.length > 0 && (
          <div className="mt-1 flex gap-1">
            {message.reactions.map((r) => (
              <span
                key={r.emoji}
                className="flex items-center gap-1 rounded-full border border-border bg-card px-1.5 py-0.5 text-[11.5px]"
              >
                {r.emoji} <span className="text-muted-foreground">{r.count}</span>
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function MessageStatusTicks({ status }: { status?: Message["status"] }) {
  if (!status || status === "sending") return null;
  if (status === "sent") return <Check className="h-3.5 w-3.5" />;
  return <CheckCheck className={cn("h-3.5 w-3.5", status === "seen" && "text-[#93C5FD]")} />;
}

function MessageToolbar({
  onReact,
  align,
}: {
  onReact: (emoji: string) => void;
  align: "left" | "right";
}) {
  const [pickerOpen, setPickerOpen] = React.useState(false);

  return (
    <div
      className={cn(
        "relative flex items-center gap-0.5 rounded-md border border-border bg-card p-0.5 shadow-card",
        align === "left" ? "order-first" : "order-last"
      )}
    >
      <ToolbarButton label="Répondre">
        <Reply className="h-3.5 w-3.5" />
      </ToolbarButton>
      <div className="relative">
        <ToolbarButton label="Réagir" onClick={() => setPickerOpen((v) => !v)}>
          <Smile className="h-3.5 w-3.5" />
        </ToolbarButton>
        {pickerOpen && (
          <div className="absolute bottom-9 left-1/2 z-10 flex -translate-x-1/2 gap-1 rounded-md border border-border bg-card p-1 shadow-raised">
            {quickReactions.map((emoji) => (
              <button
                type="button"
                key={emoji}
                onClick={() => {
                  onReact(emoji);
                  setPickerOpen(false);
                }}
                className="flex h-7 w-7 items-center justify-center rounded-md text-[14px] hover:bg-muted"
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
      </div>
      <ToolbarButton label="Transférer">
        <Forward className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton label="Copier">
        <Copy className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton label="Épingler">
        <Pin className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton label="Plus">
        <MoreHorizontal className="h-3.5 w-3.5" />
      </ToolbarButton>
    </div>
  );
}

function ToolbarButton({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-7 w-7 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      {children}
    </button>
  );
}
