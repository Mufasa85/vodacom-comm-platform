"use client";

import { motion } from "framer-motion";

import { Avatar } from "@/components/conversations/avatar";

export function TypingIndicator({ name, color }: { name: string; color?: string }) {
  return (
    <div className="flex items-center gap-2.5 px-5 py-1.5">
      <div className="w-8">
        <Avatar name={name} color={color} size="sm" />
      </div>
      <div className="flex items-center gap-1 rounded-[14px] rounded-tl-[4px] border border-border bg-card px-3.5 py-3 shadow-card">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </div>
  );
}
