export type ParticipantRole = "agent" | "supervisor" | "customer" | "bot";

export interface Participant {
  id: string;
  name: string;
  role: ParticipantRole;
  online?: boolean;
  avatarColor?: string;
}

export type MessageStatus = "sending" | "sent" | "delivered" | "seen";

export type MessageKind = "text" | "image" | "file" | "voice" | "options" | "system";

export interface MessageAttachment {
  name: string;
  size: string;
  kind: "pdf" | "doc" | "xls" | "image" | "zip";
}

export interface Message {
  id: string;
  senderId: string;
  kind: MessageKind;
  text?: string;
  attachment?: MessageAttachment;
  imageUrl?: string;
  voiceDuration?: string;
  options?: string[];
  time: string;
  status?: MessageStatus;
  reactions?: { emoji: string; count: number }[];
  replyToId?: string;
  pinned?: boolean;
}

export interface Conversation {
  id: string;
  name: string;
  subtitle: string;
  category: "official" | "recent";
  icon: "megaphone" | "bot" | "phone" | "wifi" | "card" | "wallet" | "file" | "star" | "person";
  accent: string;
  memberCount?: number;
  onlineCount?: number;
  unread: number;
  pinned?: boolean;
  lastMessageTime: string;
  lastMessageAt: string;
  lastMessagePreview: string;
  online?: boolean;
  isChannel: boolean;
  participants: Participant[];
  messages: Message[];
  sharedFiles: MessageAttachment[];
}
