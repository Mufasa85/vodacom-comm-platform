"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ArrowUp, X } from "lucide-react";
import * as React from "react";
import { ChatMessageRow } from "@/components/chat/chat-message";
import type { ChatMessage, ChatThread as ChatThreadData } from "@/lib/types/chat";
import { cn } from "@/lib/utils";

/**
 * Main chat panel.
 *
 * Two visual modes:
 *  - Home (no thread)          → centered hero + composer, plus an error banner
 *                                when the user typed an unknown number.
 *  - Conversation (thread set) → sticky conversation header + scrollable
 *                                message history + composer at the bottom.
 */
export function ChatThread({
  thread,
  onSend,
  error,
  onClearError,
}: {
  thread: ChatThreadData | null;
  onSend?: (threadId: string, text: string) => void;
  error?: string | null;
  onClearError?: () => void;
}) {
  return (
    <main className="relative flex min-w-0 flex-1 flex-col overflow-hidden bg-surface text-foreground">
      <TopToolbar />

      {error && <ErrorBanner message={error} onDismiss={onClearError} />}

      <AnimatePresence mode="wait">
        {thread ? (
          <motion.div
            key={thread.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
            className="flex min-h-0 flex-1 flex-col"
          >
            <ConversationHeader thread={thread} />
            <MessageList thread={thread} />
            <StandaloneComposer
              onSend={(text) => onSend?.(thread.id, text)}
              placeholder={`Répondre dans "${thread.title}"…`}
            />
          </motion.div>
        ) : (
          <HomeView key="home" onSend={(text) => onSend?.("", text)} />
        )}
      </AnimatePresence>
    </main>
  );
}

/* --------------------------------------------------------------------------
 * Top toolbar — just the history button on the right.
 * ----------------------------------------------------------------------- */
function TopToolbar() {
  return (
    <header className="flex items-center justify-end gap-3 px-5 pt-4">
      <button
        type="button"
        aria-label="Historique"
        className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="h-4 w-4"
        >
          <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
          <path d="M3 3v5h5" />
          <path d="M12 7v5l4 2" />
        </svg>
      </button>
    </header>
  );
}

/* --------------------------------------------------------------------------
 * Error banner — appears under the toolbar when the home composer
 * receives an unknown number / non-numeric text.
 * ----------------------------------------------------------------------- */
function ErrorBanner({ message, onDismiss }: { message: string; onDismiss?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
      role="alert"
      className="mx-5 mt-3 flex items-start gap-2.5 rounded-lg border border-danger/30 bg-danger/10 px-3.5 py-2.5 text-[13px] text-danger"
    >
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
      <p className="flex-1 leading-snug">{message}</p>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Fermer l'alerte"
          className="-mr-1 -mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded text-danger/70 transition-colors hover:bg-danger/15 hover:text-danger"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </motion.div>
  );
}

/* --------------------------------------------------------------------------
 * Conversation header — title + number + meta, shown when a thread is
 * active. Sticky above the message list.
 * ----------------------------------------------------------------------- */
function ConversationHeader({ thread }: { thread: ChatThreadData }) {
  const counterpart = thread.participants.find((p) => p.id !== "user-me") ?? thread.participants[0];
  const initials = counterpart?.initials ?? "?";

  return (
    <div className="flex items-center gap-3 border-b border-border bg-card/60 px-5 py-3 backdrop-blur-sm">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-primary/30 text-[12px] font-semibold tabular-nums tracking-tight text-primary">
        {thread.number ?? "—"}
      </span>
      <div className="min-w-0 flex-1">
        <h2 className="truncate text-[14.5px] font-semibold tracking-tight text-foreground">
          {thread.title}
        </h2>
        <p className="truncate text-[12px] text-muted-foreground">
          {thread.subtitle ?? "Conversation interne"} ·{" "}
          <span className="font-medium text-foreground/70">
            {thread.messages.length} message{thread.messages.length > 1 ? "s" : ""}
          </span>
        </p>
      </div>
      <span
        aria-hidden
        className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-semibold text-white"
        style={{ background: counterpart?.avatarColor ?? "hsl(var(--muted-foreground))" }}
      >
        {initials}
      </span>
    </div>
  );
}

/* --------------------------------------------------------------------------
 * Home view — centered hero + composer
 * ----------------------------------------------------------------------- */
function HomeView({ onSend }: { onSend: (text: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
      className="flex min-h-0 flex-1 flex-col items-center justify-center px-5"
    >
      <h1 className="mb-8 text-center text-[28px] font-medium tracking-tight text-foreground">
        Par quoi commençons-nous ?
      </h1>
      <div className="w-full max-w-3xl">
        <StandaloneComposer placeholder="veuillez entrer le numero" onSend={onSend} />
      </div>
    </motion.div>
  );
}

/* --------------------------------------------------------------------------
 * Standalone composer (reused for home + active thread)
 * ----------------------------------------------------------------------- */
function StandaloneComposer({
  onSend,
  placeholder = "Écrivez votre message…",
}: {
  onSend?: (text: string) => void;
  placeholder?: string;
}) {
  const [value, setValue] = React.useState("");
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "0px";
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  }, [value]);

  function submit() {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend?.(trimmed);
    setValue("");
  }

  return (
    <div className="px-5 pb-6">
      <div className="mx-auto flex w-full max-w-3xl items-end gap-2 rounded-3xl border border-border bg-card px-3 py-2.5 shadow-card transition-shadow focus-within:border-primary/50">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          placeholder={placeholder}
          rows={1}
          className="min-h-[36px] max-h-[200px] flex-1 resize-none bg-transparent px-1 text-[14px] leading-relaxed text-foreground placeholder:text-muted-foreground focus-visible:outline-none"
        />

        <motion.button
          type="button"
          onClick={submit}
          disabled={!value.trim()}
          aria-label="Envoyer"
          whileTap={{ scale: 0.94 }}
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors",
            value.trim()
              ? "bg-primary text-white hover:bg-primary-hover"
              : "bg-muted text-muted-foreground"
          )}
        >
          <ArrowUp className="h-4 w-4" />
        </motion.button>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
 * Message list (active-thread mode)
 * ----------------------------------------------------------------------- */
function MessageList({ thread }: { thread: ChatThreadData }) {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [thread.id, thread.messages.length]);

  const participantMap = new Map(thread.participants.map((p) => [p.id, p]));
  const groups = groupByDay(thread.messages);

  return (
    <div className="relative min-h-0 flex-1 overflow-hidden">
      {/* Decorative background pattern (public/pattern.png). A dimming
          layer keeps it subtle in light mode; in dark mode we blend it
          with the surface so it stays visible without dominating. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[url('/pattern.png')] bg-repeat opacity-[0.05] dark:opacity-[0.08]"
        style={{ backgroundSize: "320px 320px" }}
      />
      <div ref={scrollRef} className="relative h-full overflow-y-auto px-4 py-6">
        {thread.messages.length === 0 ? (
          <div className="flex h-full items-center justify-center text-[13px] text-muted-foreground">
            Aucun message pour le moment.
          </div>
        ) : (
          <div className="mx-auto max-w-3xl space-y-5">
            {groups.map((group, gi) => (
              <section key={group.label}>
                <div className="flex items-center justify-center pb-3">
                  <span className="rounded-full bg-muted px-3 py-1 text-[11px] font-medium text-muted-foreground">
                    {group.label}
                  </span>
                </div>
                <div className="space-y-1.5">
                  {group.items.map((message, i) => {
                    const prev = group.items[i - 1];
                    const showMeta =
                      !prev ||
                      prev.senderId !== message.senderId ||
                      isNewDay(prev.createdAt, message.createdAt);
                    const sender =
                      message.senderId === "user-me"
                        ? {
                            id: "user-me",
                            name: "Vous",
                            role: "agent" as const,
                            initials: "VO",
                            avatarColor: "#111111",
                          }
                        : participantMap.get(message.senderId);
                    return (
                      <ChatMessageRow
                        key={message.id}
                        message={message}
                        sender={sender}
                        showMeta={showMeta}
                      />
                    );
                  })}
                </div>
                {gi === groups.length - 1 && <TypingIndicator />}
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="mt-3 flex items-center gap-2 text-[12px] text-muted-foreground">
      <span className="flex items-center gap-1">
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:0ms]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:120ms]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:240ms]" />
      </span>
      <span>{"En train d'écrire…"}</span>
    </div>
  );
}

// --- helpers ---------------------------------------------------------------

interface DayGroup {
  label: string;
  items: ChatMessage[];
}

function groupByDay(messages: ChatMessage[]): DayGroup[] {
  const groups: DayGroup[] = [];
  for (const message of messages) {
    const label = formatDayLabel(message.createdAt);
    const last = groups[groups.length - 1];
    if (last && last.label === label) {
      last.items.push(message);
    } else {
      groups.push({ label, items: [message] });
    }
  }
  return groups;
}

function isNewDay(a: string, b: string) {
  return new Date(a).toDateString() !== new Date(b).toDateString();
}

function formatDayLabel(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const sameDay = (x: Date) =>
    x.getFullYear() === d.getFullYear() &&
    x.getMonth() === d.getMonth() &&
    x.getDate() === d.getDate();
  if (sameDay(today)) return "Aujourd'hui";
  if (sameDay(yesterday)) return "Hier";
  return d.toLocaleDateString(undefined, {
    weekday: "long",
    day: "2-digit",
    month: "short",
  });
}
