import { ChatLanding } from "@/components/chat/chat-landing";

/**
 * Landing page for the chat module.
 *
 * The user types a number here, presses Enter, and is sent straight to
 * `/conversations` which holds the full three-pane workspace.
 */
export default function ChatPage() {
  return <ChatLanding />;
}
