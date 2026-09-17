import { Megaphone, Bot, Phone, Wifi, CreditCard, Wallet, FileText, Star, User } from "lucide-react";

import type { Conversation } from "@/lib/types/conversation";
import { cn } from "@/lib/utils";

const iconMap = {
  megaphone: Megaphone,
  bot: Bot,
  phone: Phone,
  wifi: Wifi,
  card: CreditCard,
  wallet: Wallet,
  file: FileText,
  star: Star,
  person: User,
};

export function ChannelIcon({
  icon,
  accent,
  size = "md",
}: {
  icon: Conversation["icon"];
  accent: string;
  size?: "sm" | "md" | "lg";
}) {
  const Icon = iconMap[icon];
  const dims = size === "lg" ? "h-11 w-11" : size === "sm" ? "h-8 w-8" : "h-10 w-10";
  const iconDims = size === "lg" ? "h-[19px] w-[19px]" : size === "sm" ? "h-4 w-4" : "h-[17px] w-[17px]";

  return (
    <span
      className={cn("flex shrink-0 items-center justify-center rounded-full", dims)}
      style={{ backgroundColor: `${accent}1A`, color: accent }}
    >
      <Icon className={iconDims} strokeWidth={2} />
    </span>
  );
}
