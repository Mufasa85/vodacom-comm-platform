"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, MailCheck } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useLocale } from "@/components/locale-provider";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { InsetInput } from "@/components/ui/inset-input";
import { createForgotPasswordSchema, type ForgotPasswordValues } from "@/lib/validations/auth";

export function ForgotPasswordForm() {
  const { t, validation } = useLocale();
  const [sentTo, setSentTo] = React.useState<string | null>(null);
  const [serverError, setServerError] = React.useState<string | null>(null);

  const forgotPasswordSchema = React.useMemo(
    () => createForgotPasswordSchema(validation),
    [validation]
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: ForgotPasswordValues) {
    setServerError(null);
    await new Promise((r) => setTimeout(r, 900));
    setSentTo(values.email);
  }

  if (sentTo) {
    return (
      <div>
        <div className="flex h-11 w-11 items-center justify-center rounded-md bg-success/10">
          <MailCheck className="h-5 w-5 text-success" />
        </div>
        <h1 className="mt-5 text-[24px] font-semibold tracking-tight text-foreground">
          {t("auth.forgot.checkTitle")}
        </h1>
        <p className="mt-1.5 text-[14px] leading-relaxed text-muted-foreground">
          {t("auth.forgot.checkBodyBefore")}{" "}
          <span className="font-medium text-foreground">{sentTo}</span>.{" "}
          {t("auth.forgot.checkBodyAfter")}
        </p>
        <Button asChild variant="outline" className="mt-7 w-full" size="lg">
          <Link href="/login">{t("auth.backToSignIn")}</Link>
        </Button>
        <p className="mt-5 text-center text-[13px] text-muted-foreground">
          {t("auth.forgot.didntReceive")}{" "}
          <button
            type="button"
            onClick={() => setSentTo(null)}
            className="font-medium text-primary hover:text-primary-hover"
          >
            {t("auth.forgot.tryDifferent")}
          </button>
        </p>
      </div>
    );
  }

  return (
    <div>
      <Link
        href="/login"
        className="inline-flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        {t("auth.backToSignIn")}
      </Link>

      <h1 className="mt-5 text-[24px] font-semibold tracking-tight text-foreground">
        {t("auth.forgot.title")}
      </h1>
      <p className="mt-1.5 text-[14px] text-muted-foreground">{t("auth.forgot.subtitle")}</p>

      {serverError && (
        <div className="mt-6">
          <Alert variant="danger">{serverError}</Alert>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-7 space-y-5" noValidate>
        <div className="space-y-1.5">
          <InsetInput
            id="email"
            label={t("auth.forgot.workEmail")}
            type="email"
            invalid={!!errors.email}
            autoComplete="email"
            {...register("email")}
          />
          {errors.email && <p className="text-[12.5px] text-danger">{errors.email.message}</p>}
        </div>

        <Button type="submit" className="w-full" size="lg" loading={isSubmitting}>
          {isSubmitting ? t("auth.forgot.sending") : t("auth.forgot.send")}
        </Button>
      </form>
    </div>
  );
}
