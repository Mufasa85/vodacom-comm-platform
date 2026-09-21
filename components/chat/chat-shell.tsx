"use client";

import { useParams, useRouter } from "next/navigation";
import * as React from "react";
import { ChatSidebar } from "@/components/chat/chat-sidebar";
import { ChatThread as ChatThreadView } from "@/components/chat/chat-thread";
import { getChatThreads } from "@/lib/data/chat-threads";
import type { ChatMessage, ChatThread } from "@/lib/types/chat";

/**
 * Top-level orchestrator — URL-driven routing:
 *
 *   /chat             → home view ("Par quoi commençons-nous ?")
 *   /chat/[number]    → conversation identified by the padded number (001…)
 *
 * The shell owns the thread list and the local message mutations. It
 * reads the active selection from `useParams()` so the URL and the
 * rendered thread stay in sync, and writes back via `router.push()`
 * whenever the user navigates through the UI.
 *
 * To wire to a real backend:
 *   1. Replace `getChatThreads()` with a TanStack Query hook.
 *   2. Replace `appendMessageToThread` with a `useMutation` that calls
 *      the REST API and on success invalidates the thread query.
 */
export function ChatShell() {
  const router = useRouter();
  const params = useParams<{ number?: string }>();
  const [threads, setThreads] = React.useState<ChatThread[]>(() => getChatThreads());
  const [error, setError] = React.useState<string | null>(null);

  // Resolve the active thread from the URL. `params.number` is the
  // padded string ("001") — normalise defensively in case the URL
  // contains a raw integer.
  const urlNumber = (params?.number ?? "").padStart(3, "0");
  const activeThread = React.useMemo(() => {
    if (!urlNumber) return null;
    return threads.find((t) => (t.number ?? "").padStart(3, "0") === urlNumber) ?? null;
  }, [threads, urlNumber]);

  function navigateHome() {
    setError(null);
    router.push("/chat");
  }

  function handleSend(threadId: string, text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setError(null);

    // --- Home view (`threadId === ""`) ------------------------------------
    // Numbers ("001" … "010") navigate to the matching conversation.
    // Anything else triggers a clear error banner — the home composer
    // is a strict navigation control, not a message composer.
    if (!threadId) {
      const numeric = trimmed.match(/^0*(\d{1,3})$/);
      if (numeric) {
        const requestedNumber = numeric[1].padStart(3, "0");
        const target = threads.find((t) => (t.number ?? "").padStart(3, "0") === requestedNumber);
        if (target) {
          appendMessageToThread(target.id, trimmed);
          router.push(`/chat/${requestedNumber}`);
          return;
        }
        // Number format OK, but no such conversation exists.
        setError(
          `La conversation n°${requestedNumber} n'existe pas. Essayez un numéro listé dans la colonne de gauche.`
        );
        return;
      }
      // Not even a number — prompt the user to enter a number.
      setError("Veuillez saisir un numéro de conversation (ex. 001, 002…).");
      return;
    }

    // --- Inside a conversation -------------------------------------------
    appendMessageToThread(threadId, trimmed);
  }

  /** Append a user message to the thread identified by `id`. */
  function appendMessageToThread(id: string, text: string) {
    const newMessage: ChatMessage = {
      id: `local-${Date.now()}`,
      threadId: id,
      senderId: "user-me",
      role: "user",
      content: text,
      createdAt: new Date().toISOString(),
      status: "sent",
    };

    setThreads((prev) => {
      const next = prev.map((t) =>
        t.id === id
          ? { ...t, messages: [...t.messages, newMessage], updatedAt: newMessage.createdAt }
          : t
      );
      return next.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    });

    // Simulate delivery acknowledgement (real backend would emit this).
    window.setTimeout(() => {
      setThreads((prev) =>
        prev.map((t) =>
          t.id === id
            ? {
                ...t,
                messages: t.messages.map((m: ChatMessage) =>
                  m.id === newMessage.id ? { ...m, status: "delivered" } : m
                ),
              }
            : t
        )
      );
    }, 600);
  }

  /** Clear the routing error banner (passed down to the thread view). */
  function clearError() {
    setError(null);
  }

  // If the URL contains a number that doesn't match any thread, surface
  // a clear "unknown conversation" error and let the user click home.
  React.useEffect(() => {
    if (!urlNumber) return;
    if (!activeThread) {
      setError(`La conversation n°${urlNumber} n'existe pas.`);
    } else {
      setError(null);
    }
  }, [urlNumber, activeThread]);

  return (
    <div className="flex h-[100dvh] w-full overflow-hidden bg-background">
      <ChatSidebar threads={threads} activeId={activeThread?.id ?? null} onNewChat={navigateHome} />
      <ChatThreadView
        thread={activeThread}
        onSend={handleSend}
        error={error}
        onClearError={clearError}
      />
    </div>
  );
}
