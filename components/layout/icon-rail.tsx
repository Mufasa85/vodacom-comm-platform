"use client";

import {
  BarChart3,
  BookOpen,
  LayoutDashboard,
  MessageSquare,
  Phone,
  Settings,
  Users2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/conversations", label: "Discussions", icon: MessageSquare, badge: 12 },
  { href: "/customers", label: "Clients", icon: Users2 },
  { href: "/calls", label: "Appels", icon: Phone },
  { href: "/knowledge-base", label: "Base de connaissances", icon: BookOpen },
  { href: "/reports", label: "Rapports", icon: BarChart3 },
];

export function IconRail() {
  const pathname = usePathname();

  return (
    <nav className="flex h-full w-[72px] shrink-0 flex-col items-center border-r border-border bg-card py-4">
      <Link href="/conversations" className="mb-6 flex h-9 w-9 items-center justify-center">
        <span className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-primary">
          <svg width="14" height="12" viewBox="0 0 16 14" fill="none" aria-hidden="true">
            <rect x="0" y="8" width="3" height="6" rx="1" fill="#fff" />
            <rect x="6.5" y="4.5" width="3" height="9.5" rx="1" fill="#fff" />
            <rect x="13" y="0" width="3" height="14" rx="1" fill="#fff" />
          </svg>
        </span>
      </Link>

      <ul className="flex flex-1 flex-col items-center gap-1.5">
        {navItems.map((item) => {
          const active = pathname?.startsWith(item.href);
          const Icon = item.icon;
          return (
            <li key={item.href} className="group relative">
              <Link
                href={item.href}
                className={cn(
                  "relative flex h-11 w-11 items-center justify-center rounded-[10px] text-muted-foreground transition-colors",
                  "hover:bg-muted hover:text-foreground",
                  active && "bg-primary/10 text-primary"
                )}
              >
                <Icon className="h-[19px] w-[19px]" strokeWidth={active ? 2.25 : 1.9} />
                {item.badge ? (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-white">
                    {item.badge}
                  </span>
                ) : null}
              </Link>
              <span className="pointer-events-none absolute left-[60px] top-1/2 z-50 -translate-y-1/2 whitespace-nowrap rounded-md bg-foreground px-2.5 py-1.5 text-[12px] font-medium text-white opacity-0 shadow-raised transition-opacity duration-150 group-hover:opacity-100">
                {item.label}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="mt-auto flex flex-col items-center gap-2">
        <Link
          href="/settings"
          className="flex h-11 w-11 items-center justify-center rounded-[10px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <Settings className="h-[19px] w-[19px]" strokeWidth={1.9} />
        </Link>
        <Link
          href="/profile"
          className="mt-1 h-9 w-9 overflow-hidden rounded-full ring-2 ring-transparent transition-all hover:ring-primary/30"
        >
          <span className="flex h-full w-full items-center justify-center bg-[#111111] text-[12px] font-semibold text-white">
            SA
          </span>
        </Link>
      </div>
    </nav>
  );
}
