"use client";

import { ArrowUp, Boxes, History, PenSquare, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Landing page for `/chat`.
 *
 * Layout:
 *   [Sidebar — list of previously-typed numbers]  [Composer — please enter the number]
 *
 * Whatever the user types is appended to the local history and they
 * are pushed to `/conversations`, which hosts the full three-pane
 * workspace. The history persists in `localStorage`.
 */
const STORAGE_KEY = "vodacom-chat-history";

export function ChatLanding() {
  const router = useRouter();
  const [value, setValue] = React.useState("");
  const [history, setHistory] = React.useState<string[]>([]);
  const [hydrated, setHydrated] = React.useState(false);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // Hydrate from localStorage on mount.
  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setHistory(parsed.filter((x) => typeof x === "string"));
        }
      }
    } catch {
      /* ignore corrupted storage */
    }
    setHydrated(true);
  }, []);

  // Persist history on update.
  React.useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch {
      /* ignore quota / privacy errors */
    }
  }, [history, hydrated]);

  // Auto-grow the textarea.
  React.useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "0px";
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  }, [value]);

  function submit(typed?: string) {
    const text = (typed ?? value).trim();
    if (!text) return;
    setHistory((prev) => {
      const next = [text, ...prev.filter((x) => x !== text)];
      return next.slice(0, 30);
    });
    if (typed === undefined) setValue("");
    router.push("/conversations");
  }

  function removeFromHistory(entry: string) {
    setHistory((prev) => prev.filter((x) => x !== entry));
  }

  function clearHistory() {
    setHistory([]);
  }

  return (
    <div className="flex h-[100dvh] w-screen overflow-hidden bg-surface">
      <HistorySidebar
        history={history}
        onSelect={(entry) => submit(entry)}
        onRemove={removeFromHistory}
        onClear={clearHistory}
      />

      <main className="relative flex min-w-0 flex-1 flex-col items-center justify-center overflow-hidden px-5">
        {/* Decorative background pattern (public/pattern.png) — matches the
            opacity / tile size of the messages panel in /conversations. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[url('/pattern.png')] bg-repeat opacity-[0.15] dark:opacity-[0.05]"
          style={{ backgroundSize: "320px 320px" }}
        />
        <div className="relative z-10 w-full max-w-3xl">
          <h1 className="mb-6 text-center text-[26px] font-medium tracking-tight text-foreground">
            Par quoi commençons-nous ?
          </h1>
          <div className="flex items-end gap-2 rounded-3xl border border-border bg-card px-3 py-2.5 shadow-card transition-shadow focus-within:border-primary/50">
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
              placeholder="veuillez entrer le numero"
              rows={1}
              className="min-h-[36px] max-h-[200px] flex-1 resize-none bg-transparent px-1 text-[14px] leading-relaxed text-foreground placeholder:text-muted-foreground focus-visible:outline-none"
            />
            <button
              type="button"
              onClick={() => submit()}
              disabled={!value.trim()}
              aria-label="Accéder aux conversations"
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors",
                value.trim()
                  ? "bg-primary text-white hover:bg-primary-hover"
                  : "bg-muted text-muted-foreground"
              )}
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-3 text-center text-[11.5px] text-muted-foreground">
            Entrez un numéro de conversation puis appuyez sur Entrée pour ouvrir l'espace de chat.
          </p>
        </div>
      </main>
    </div>
  );
}

/* --------------------------------------------------------------------------
 * History sidebar — persisted list of every number / text the user has
 * submitted from the landing composer.
 * ----------------------------------------------------------------------- */
function HistorySidebar({
  history,
  onSelect,
  onRemove,
  onClear,
}: {
  history: string[];
  onSelect: (entry: string) => void;
  onRemove: (entry: string) => void;
  onClear: () => void;
}) {
  return (
    <aside className="flex h-full w-[300px] shrink-0 flex-col border-r border-border bg-card text-foreground">
      {/* Brand row */}
      <div className="flex items-center gap-2 px-3 pb-2 pt-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-border">
          <Image
            src="/logo-vodacom.png"
            alt="Vodacom"
            width={36}
            height={36}
            priority
            className="h-9 w-9 object-cover"
          />
        </span>
        <div className="leading-tight">
          <p className="text-[14.5px] font-semibold tracking-tight text-foreground">TOBI</p>
        </div>
        <button
          type="button"
          aria-label="Ouvrir un autre compte"
          className="ml-auto flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <Boxes className="h-4 w-4" />
        </button>
      </div>

      {/* New chat (visual) */}
      <div className="flex items-center gap-2 px-3 pb-2 pt-1">
        <button
          type="button"
          className="flex flex-1 items-center gap-2 rounded-lg px-2.5 py-2 text-[13px] text-foreground transition-colors hover:bg-muted"
        >
          <PenSquare className="h-4 w-4 text-muted-foreground" />
          Nouveau chat
        </button>
      </div>

      {/* Section title + clear */}
      <div className="mt-1 flex items-center justify-between px-4 pb-2">
        <div className="flex items-center gap-1.5">
          <History className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Historique
          </p>
        </div>
        {history.length > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="text-[11px] text-muted-foreground transition-colors hover:text-danger"
          >
            Effacer
          </button>
        )}
      </div>

      {/* List */}
      <nav className="min-h-0 flex-1 overflow-y-auto px-2">
        {history.length === 0 ? (
          <div className="px-3 py-6 text-center text-[12px] text-muted-foreground">
            Aucun numéro saisi pour l'instant. Tapez un numéro ci-contre et appuyez sur Entrée pour
            démarrer.
          </div>
        ) : (
          <ul className="space-y-1">
            {history.map((entry) => (
              <li key={entry}>
                <HistoryItem
                  entry={entry}
                  onSelect={() => onSelect(entry)}
                  onRemove={() => onRemove(entry)}
                />
              </li>
            ))}
          </ul>
        )}
      </nav>

      {/* Footer */}
      <div className="border-t border-border px-4 py-3 text-[11px] text-muted-foreground">
        {history.length} entrée{history.length > 1 ? "s" : ""} conservée
        {history.length > 1 ? "s" : ""} localement
      </div>
    </aside>
  );
}

function HistoryItem({
  entry,
  onSelect,
  onRemove,
}: {
  entry: string;
  onSelect: () => void;
  onRemove: () => void;
}) {
  // Try to extract a leading number — if found, render it as a small
  // badge to mirror the main chat's numbered list aesthetic.
  const numeric = entry.match(/^\s*0*(\d{1,4})\b/);
  const displayNumber = numeric ? numeric[1].padStart(3, "0") : null;

  return (
    <div
      className={cn(
        "group flex w-full items-center gap-2.5 rounded-lg px-2 py-2 transition-colors hover:bg-muted/70"
      )}
    >
      <button
        type="button"
        onClick={onSelect}
        className="flex min-w-0 flex-1 items-center gap-2.5 text-left"
      >
        {displayNumber ? (
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border bg-surface text-[11px] font-semibold tabular-nums tracking-tight text-muted-foreground">
            {displayNumber}
          </span>
        ) : (
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border bg-surface text-muted-foreground">
            <PenSquare className="h-3.5 w-3.5" />
          </span>
        )}
        <span className="min-w-0 flex-1 truncate text-[12.5px] text-foreground/85">{entry}</span>
      </button>
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Supprimer « ${entry} » de l'historique`}
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground opacity-0 transition-all hover:bg-muted hover:text-danger group-hover:opacity-100"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
