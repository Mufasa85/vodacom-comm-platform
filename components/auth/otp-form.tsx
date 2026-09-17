"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { OtpInput } from "@/components/auth/otp-input";
import { useLocale } from "@/components/locale-provider";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { createOtpSchema, type OtpValues } from "@/lib/validations/auth";

const RESEND_SECONDS = 30;

export function OtpForm() {
  const router = useRouter();
  const { t, validation } = useLocale();
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = React.useState(RESEND_SECONDS);

  const otpSchema = React.useMemo(() => createOtpSchema(validation), [validation]);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OtpValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { code: "" },
  });

  React.useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  async function onSubmit(values: OtpValues) {
    setServerError(null);
    await new Promise((r) => setTimeout(r, 900));

    if (values.code !== "000000" && values.code.length === 6) {
      if (values.code === "111111") {
        setServerError(t("auth.otp.serverError"));
        return;
      }
    }
    router.push("/conversations");
  }

  function handleResend() {
    setSecondsLeft(RESEND_SECONDS);
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
        {t("auth.otp.title")}
      </h1>
      <p className="mt-1.5 text-[14px] text-muted-foreground">{t("auth.otp.subtitle")}</p>

      {serverError && (
        <div className="mt-6">
          <Alert variant="danger">{serverError}</Alert>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-7 space-y-6" noValidate>
        <Controller
          control={control}
          name="code"
          render={({ field }) => (
            <div className="space-y-1.5">
              <OtpInput
                value={field.value}
                onChange={field.onChange}
                invalid={!!errors.code}
                disabled={isSubmitting}
              />
              {errors.code && <p className="text-[12.5px] text-danger">{errors.code.message}</p>}
            </div>
          )}
        />

        <Button type="submit" className="w-full" size="lg" loading={isSubmitting}>
          {isSubmitting ? t("auth.otp.verifying") : t("auth.otp.verify")}
        </Button>
      </form>

      <div className="mt-6 text-center text-[13px] text-muted-foreground">
        {secondsLeft > 0 ? (
          <span>{t("auth.otp.resendIn", { seconds: secondsLeft })}</span>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            className="font-medium text-primary hover:text-primary-hover"
          >
            {t("auth.otp.resend")}
          </button>
        )}
      </div>
    </div>
  );
}
