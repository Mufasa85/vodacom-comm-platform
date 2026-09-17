"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  invalid?: boolean;
  disabled?: boolean;
}

export function OtpInput({ value, onChange, length = 6, invalid, disabled }: OtpInputProps) {
  const refs = React.useRef<Array<HTMLInputElement | null>>([]);
  const slots = React.useMemo(() => Array.from({ length }, (_, slot) => slot), [length]);
  const digits = React.useMemo(() => {
    const arr = value.split("").slice(0, length);
    while (arr.length < length) arr.push("");
    return arr;
  }, [value, length]);

  function setDigit(index: number, digit: string) {
    const next = [...digits];
    next[index] = digit;
    onChange(next.join(""));
  }

  function handleChange(index: number, raw: string) {
    const digit = raw.replace(/\D/g, "").slice(-1);
    setDigit(index, digit);
    if (digit && index < length - 1) {
      refs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) refs.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < length - 1) refs.current[index + 1]?.focus();
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!pasted) return;
    onChange(pasted.padEnd(length, "").slice(0, length));
    const nextFocus = Math.min(pasted.length, length - 1);
    refs.current[nextFocus]?.focus();
  }

  return (
    <div className="flex items-center justify-between gap-2" onPaste={handlePaste}>
      {slots.map((slot) => (
        <input
          key={slot}
          ref={(el) => {
            refs.current[slot] = el;
          }}
          inputMode="numeric"
          autoComplete={slot === 0 ? "one-time-code" : "off"}
          maxLength={1}
          value={digits[slot]}
          disabled={disabled}
          onChange={(e) => handleChange(slot, e.target.value)}
          onKeyDown={(e) => handleKeyDown(slot, e)}
          className={cn(
            "h-12 w-11 rounded-md border bg-card text-center text-[18px] font-semibold text-foreground transition-colors",
            "border-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-ring",
            invalid && "border-danger focus-visible:ring-danger"
          )}
        />
      ))}
    </div>
  );
}
