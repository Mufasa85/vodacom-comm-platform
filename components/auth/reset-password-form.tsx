"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import { PasswordInput } from "@/components/auth/password-input";
import { PasswordStrength } from "@/components/auth/password-strength";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { type ResetPasswordValues, resetPasswordSchema } from "@/lib/validations/auth";

const requirements = [
  { test: (p: string) => p.length >= 8, label: "At least 8 characters" },
  { test: (p: string) => /[A-Z]/.test(p), label: "One uppercase letter" },
  { test: (p: string) => /[0-9]/.test(p), label: "One number" },
  { test: (p: string) => /[^A-Za-z0-9]/.test(p), label: "One symbol" },
];

export function ResetPasswordForm() {
  const router = useRouter();
  const [serverError, setServerError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const password = watch("password");

  async function onSubmit(_values: ResetPasswordValues) {
    setServerError(null);
    await new Promise((r) => setTimeout(r, 900));
    router.push("/login");
  }

  return (
    <div>
      <h1 className="text-[24px] font-semibold tracking-tight text-foreground">
        Create a new password
      </h1>
      <p className="mt-1.5 text-[14px] text-muted-foreground">
        Choose a strong password you haven&apos;t used before on this account.
      </p>

      {serverError && (
        <div className="mt-6">
          <Alert variant="danger">{serverError}</Alert>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-7 space-y-5" noValidate>
        <div className="space-y-1.5">
          <PasswordInput
            id="password"
            label="New password"
            invalid={!!errors.password}
            autoComplete="new-password"
            {...register("password")}
          />
          <PasswordStrength password={password} />
          {errors.password && (
            <p className="text-[12.5px] text-danger">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <PasswordInput
            id="confirmPassword"
            label="Confirm new password"
            invalid={!!errors.confirmPassword}
            autoComplete="new-password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-[12.5px] text-danger">{errors.confirmPassword.message}</p>
          )}
        </div>

        <ul className="space-y-1.5 rounded-md bg-muted p-3.5">
          {requirements.map((req) => {
            const met = req.test(password || "");
            return (
              <li
                key={req.label}
                className={`flex items-center gap-2 text-[12.5px] ${
                  met ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                <CheckCircle2 className={`h-3.5 w-3.5 ${met ? "text-success" : "text-border"}`} />
                {req.label}
              </li>
            );
          })}
        </ul>

        <Button type="submit" className="w-full" size="lg" loading={isSubmitting}>
          {isSubmitting ? "Updating password" : "Update password"}
        </Button>
      </form>
    </div>
  );
}
