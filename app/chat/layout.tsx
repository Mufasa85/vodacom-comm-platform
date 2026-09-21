/**
 * Chat workspace layout — full-bleed container.
 *
 * Theme follows the global toggle (light/dark) handled by the
 * `ThemeProvider` at the root, exactly like `/conversations`.
 */
export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-[100dvh] w-screen overflow-hidden bg-background text-foreground">
      {children}
    </div>
  );
}
