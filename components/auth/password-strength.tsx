"use client";

import { useLocale } from "@/components/locale-provider";
import { cn } from "@/lib/utils";

function getStrength(password: string) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

const colors = ["bg-danger", "bg-warning", "bg-[#3B82F6]", "bg-success"];

export function PasswordStrength({ password }: { password: string }) {
  const { t } = useLocale();
  const score = getStrength(password);
  const level = Math.max(0, score - 1);

  const labels = [
    t("auth.passwordStrength.weak"),
    t("auth.passwordStrength.fair"),
    t("auth.passwordStrength.good"),
    t("auth.passwordStrength.strong"),
  ];

  if (!password) return null;

  return (
    <div className="space-y-1.5">
      <div className="flex gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full bg-muted transition-colors",
              i <= level && colors[level]
            )}
          />
        ))}
      </div>
      <p className="text-[12px] text-muted-foreground">
        {t("auth.passwordStrength.label")}{" "}
        <span className="font-medium text-foreground">{labels[level]}</span>
      </p>
    </div>
  );
}
