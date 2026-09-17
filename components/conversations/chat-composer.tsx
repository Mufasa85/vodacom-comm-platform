"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Mic, Paperclip, Reply, Send, Smile, Square, X } from "lucide-react";
import * as React from "react";
import { useLocale } from "@/components/locale-provider";
import { Button } from "@/components/ui/button";
import type { Message } from "@/lib/types/conversation";
import { cn } from "@/lib/utils";

const emojiSet = ["😀", "😉", "😂", "👍", "🙏", "🎉", "❤️", "😢", "😮", "🤝", "✅", "⚠️"];

export function ChatComposer({
  onSend,
  replyTo,
  onCancelReply,
}: {
  onSend: (text: string) => void;
  replyTo?: Message | null;
  onCancelReply?: () => void;
}) {
  const { t } = useLocale();
  const [value, setValue] = React.useState("");
  const [emojiOpen, setEmojiOpen] = React.useState(false);
  const [recording, setRecording] = React.useState(false);
  const [seconds, setSeconds] = React.useState(0);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (!recording) return;
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, [recording]);

  function handleSend() {
    if (!value.trim()) return;
    onSend(value.trim());
    setValue("");
    onCancelReply?.();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="shrink-0 border-t border-border bg-card px-5 py-3">
      <AnimatePresence>
        {replyTo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-2 flex items-center gap-2 overflow-hidden rounded-md bg-muted px-3 py-2"
          >
            <Reply className="h-3.5 w-3.5 shrink-0 text-primary" />
            <span className="min-w-0 flex-1 truncate text-[12.5px] text-muted-foreground">
              {t("conversations.composer.replyTo")}{" "}
              <span className="text-foreground">
                {replyTo.text ?? t("conversations.composer.attachment")}
              </span>
            </span>
            <button
              type="button"
              onClick={onCancelReply}
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded text-muted-foreground hover:bg-card hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {recording ? (
        <div className="flex items-center gap-3 rounded-md bg-surface px-3.5 py-2.5">
          <span className="flex h-2 w-2 animate-pulse rounded-full bg-danger" />
          <span className="text-[13.5px] font-medium text-foreground">
            {t("conversations.composer.recording")}{" "}
            {String(Math.floor(seconds / 60)).padStart(2, "0")}:
            {String(seconds % 60).padStart(2, "0")}
          </span>
          <div className="flex flex-1 items-center gap-[2px]">
            {Array.from({ length: 40 }, (_, bar) => bar).map((bar) => (
              <span
                key={bar}
                className="w-[2px] rounded-full bg-primary/50"
                style={{ height: `${4 + ((bar * 13) % 14)}px` }}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              setRecording(false);
              setSeconds(0);
            }}
            className="text-[13px] font-medium text-muted-foreground hover:text-foreground"
          >
            {t("conversations.composer.cancel")}
          </button>
          <Button
            size="sm"
            onClick={() => {
              onSend(t("conversations.voiceNote"));
              setRecording(false);
              setSeconds(0);
            }}
          >
            <Square className="h-3 w-3 fill-current" />
            {t("conversations.composer.send")}
          </Button>
        </div>
      ) : (
        <div className="flex items-end gap-2">
          <div className="relative">
            <ComposerIconButton
              label={t("conversations.composer.emojis")}
              onClick={() => setEmojiOpen((v) => !v)}
            >
              <Smile className="h-[19px] w-[19px]" />
            </ComposerIconButton>
            {emojiOpen && (
              <div className="absolute bottom-11 left-0 z-20 grid w-56 grid-cols-6 gap-1 rounded-lg border border-border bg-card p-2 shadow-raised">
                {emojiSet.map((e) => (
                  <button
                    type="button"
                    key={e}
                    onClick={() => {
                      setValue((v) => v + e);
                      setEmojiOpen(false);
                      textareaRef.current?.focus();
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-md text-[16px] hover:bg-muted"
                  >
                    {e}
                  </button>
                ))}
              </div>
            )}
          </div>

          <ComposerIconButton label={t("conversations.composer.attach")}>
            <Paperclip className="h-[19px] w-[19px]" />
          </ComposerIconButton>

          <div className="flex-1 rounded-md border border-input bg-surface px-3.5 py-2.5 transition-colors focus-within:ring-2 focus-within:ring-ring">
            <textarea
              ref={textareaRef}
              rows={1}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
              }}
              onKeyDown={handleKeyDown}
              placeholder={t("conversations.composer.placeholder")}
              className="max-h-[120px] w-full resize-none bg-transparent text-[13.5px] leading-relaxed text-foreground placeholder:text-muted-foreground focus-visible:outline-none"
            />
          </div>

          {value.trim() ? (
            <Button size="icon" onClick={handleSend} aria-label={t("conversations.composer.send")}>
              <Send className="h-4 w-4" />
            </Button>
          ) : (
            <ComposerIconButton
              label={t("conversations.composer.voiceNote")}
              onClick={() => setRecording(true)}
              primary
            >
              <Mic className="h-[19px] w-[19px]" />
            </ComposerIconButton>
          )}
        </div>
      )}
    </div>
  );
}

function ComposerIconButton({
  children,
  label,
  onClick,
  primary,
}: {
  children: React.ReactNode;
  label: string;
  onClick?: () => void;
  primary?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-md transition-colors",
        primary
          ? "bg-primary text-white hover:bg-primary-hover"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}
