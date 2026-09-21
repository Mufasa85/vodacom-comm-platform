/**
 * Domain types for the Vodacom chat module (ChatGPT-style).
 *
 * Designed to map cleanly to a relational store later:
 *  - threads      → `chat_threads`  (1 row per conversation)
 *  - messages     → `chat_messages` (N rows per thread, ordered by `createdAt`)
 *  - participants → `chat_thread_participants` (join table)
 *
 * Keep this file free of UI concerns so it can be re-used by any consumer
 * (REST handlers, websocket gateway, future tRPC procedures, etc.).
 */

export type ChatStatus = "active" | "pending" | "archived" | "unread";

export type ChatSenderRole = "user" | "assistant" | "system";

export interface ChatMessage {
  id: string;
  threadId: string;
  senderId: string;
  role: ChatSenderRole;
  content: string;
  /** ISO 8601 — sortable, locale-agnostic. UI layer formats for display. */
  createdAt: string;
  /** Optional delivery / read state — surfaced as ticks on user messages. */
  status?: "sending" | "sent" | "delivered" | "read";
}

/** Lightweight reference to a file shared in the conversation. */
export interface ChatAttachmentRef {
  id: string;
  name: string;
  size: string;
  kind: "pdf" | "doc" | "xls" | "image" | "zip";
}

export interface ChatParticipant {
  id: string;
  name: string;
  role: "customer" | "agent" | "bot" | "supervisor";
  initials?: string;
  avatarColor?: string;
}

export interface ChatThread {
  id: string;
  /** Display number (e.g. "001", "002"). Computed from index if not provided. */
  number?: string;
  title: string;
  subtitle?: string;
  status: ChatStatus;
  /** ISO date — used for the "il y a 3 min" / "hier" labels in the sidebar. */
  updatedAt: string;
  unreadCount?: number;
  participants: ChatParticipant[];
  messages: ChatMessage[];
  sharedFiles?: ChatAttachmentRef[];
  /** Pinned to the top of the sidebar (ChatGPT "Épinglés" section). */
  pinned?: boolean;
}
