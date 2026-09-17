"use client";

import { Bell, ChevronRight, FileText, Image as ImageIcon, Search, Star, X } from "lucide-react";
import { Avatar } from "@/components/conversations/avatar";
import { ChannelIcon } from "@/components/conversations/channel-icon";
import { useLocale } from "@/components/locale-provider";
import { Separator } from "@/components/ui/separator";
import type { Conversation } from "@/lib/types/conversation";

export function DetailsPanel({
  conversation,
  onClose,
}: {
  conversation: Conversation;
  onClose: () => void;
}) {
  const { t } = useLocale();

  return (
    <div className="flex h-full w-[300px] shrink-0 flex-col border-l border-border bg-card">
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-4">
        <h3 className="text-[14px] font-semibold text-foreground">
          {conversation.isChannel
            ? t("conversations.details.channelTitle")
            : t("conversations.details.contactTitle")}
        </h3>
        <button
          type="button"
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
        <div className="flex flex-col items-center pb-4 text-center">
          <ChannelIcon icon={conversation.icon} accent={conversation.accent} size="lg" />
          <p className="mt-3 text-[15px] font-semibold text-foreground">{conversation.name}</p>
          <p className="mt-0.5 text-[12.5px] text-muted-foreground">{conversation.subtitle}</p>

          <div className="mt-3 flex items-center gap-2">
            {conversation.isChannel && (
              <span className="rounded-full bg-muted px-2.5 py-1 text-[11.5px] font-medium text-muted-foreground">
                {t("conversations.details.officialChannel")}
              </span>
            )}
            {conversation.memberCount != null && (
              <span className="rounded-full bg-muted px-2.5 py-1 text-[11.5px] font-medium text-muted-foreground">
                {t("conversations.details.members", { count: conversation.memberCount })}
              </span>
            )}
            {conversation.onlineCount != null && (
              <span className="flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-1 text-[11.5px] font-medium text-success">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                {t("conversations.details.online", { count: conversation.onlineCount })}
              </span>
            )}
          </div>
        </div>

        <Separator />

        <div className="space-y-0.5 py-3">
          <DetailRow
            icon={Bell}
            label={t("conversations.details.notifications")}
            value={t("conversations.details.allNotifications")}
          />
          <DetailRow
            icon={ImageIcon}
            label={t("conversations.details.media")}
            value={t("conversations.details.filesCount", {
              count: conversation.sharedFiles.length,
            })}
          />
          <DetailRow icon={Star} label={t("conversations.details.starred")} value="8" />
          <DetailRow icon={Search} label={t("conversations.details.searchInChat")} />
        </div>

        <Separator />

        <div className="py-3">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-[12.5px] font-semibold text-foreground">
              {t("conversations.details.participants", {
                count: conversation.participants.length,
              })}
            </p>
            <button
              type="button"
              className="text-[12px] font-medium text-primary hover:text-primary-hover"
            >
              {t("conversations.details.seeAll")}
            </button>
          </div>
          <div className="space-y-1">
            {conversation.participants.slice(0, 5).map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-2.5 rounded-md px-1.5 py-1.5 hover:bg-muted"
              >
                <Avatar name={p.name} color={p.avatarColor} online={p.online} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] text-foreground">{p.name}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {p.online
                      ? t("conversations.details.onlineStatus")
                      : t("conversations.details.offlineStatus")}
                  </p>
                </div>
                <RoleBadge role={p.role} />
              </div>
            ))}
          </div>
        </div>

        {conversation.sharedFiles.length > 0 && (
          <>
            <Separator />
            <div className="py-3">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[12.5px] font-semibold text-foreground">
                  {t("conversations.details.sharedFiles")}
                </p>
                <button
                  type="button"
                  className="text-[12px] font-medium text-primary hover:text-primary-hover"
                >
                  {t("conversations.details.seeAll")}
                </button>
              </div>
              <div className="space-y-1">
                {conversation.sharedFiles.map((f) => (
                  <button
                    type="button"
                    key={f.name}
                    className="flex w-full items-center gap-2.5 rounded-md px-1.5 py-1.5 text-left hover:bg-muted"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <FileText className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[12.5px] text-foreground">{f.name}</p>
                      <p className="text-[11px] text-muted-foreground">
                        {f.kind.toUpperCase()} · {f.size}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value?: string;
}) {
  return (
    <button
      type="button"
      className="flex w-full items-center gap-3 rounded-md px-1.5 py-2 text-left hover:bg-muted"
    >
      <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
      <span className="flex-1 text-[13px] text-foreground">{label}</span>
      {value && <span className="text-[12px] text-muted-foreground">{value}</span>}
      <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
    </button>
  );
}

function RoleBadge({ role }: { role: "agent" | "supervisor" | "customer" | "bot" }) {
  const { t } = useLocale();
  const map = {
    agent: { label: t("conversations.roles.agent"), cls: "bg-primary/10 text-primary" },
    supervisor: {
      label: t("conversations.roles.supervisor"),
      cls: "bg-[#7C3AED]/10 text-[#7C3AED]",
    },
    customer: { label: t("conversations.roles.customer"), cls: "bg-muted text-muted-foreground" },
    bot: { label: t("conversations.roles.bot"), cls: "bg-foreground/10 text-foreground" },
  };
  const r = map[role];
  return (
    <span className={`rounded-full px-2 py-0.5 text-[10.5px] font-medium ${r.cls}`}>{r.label}</span>
  );
}
