"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { OtpInput } from "@/components/auth/otp-input";
import { otpSchema, type OtpValues } from "@/lib/validations/auth";

const RESEND_SECONDS = 30;

export function OtpForm() {
  const router = useRouter();
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = React.useState(RESEND_SECONDS);

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
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [secondsLeft]);

  async function onSubmit(values: OtpValues) {
    setServerError(null);
    await new Promise((r) => setTimeout(r, 900));

    if (values.code !== "000000" && values.code.length === 6) {
      // any 6-digit code is accepted in this scaffold except a deliberate failure case
      if (values.code === "111111") {
        setServerError("That code is incorrect or has expired.");
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
        Back to sign in
      </Link>

      <h1 className="mt-5 text-[24px] font-semibold tracking-tight text-foreground">
        Verify your identity
      </h1>
      <p className="mt-1.5 text-[14px] text-muted-foreground">
        Enter the 6-digit code we sent to your registered email address.
      </p>

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
              {errors.code && (
                <p className="text-[12.5px] text-danger">{errors.code.message}</p>
              )}
            </div>
          )}
        />

        <Button type="submit" className="w-full" size="lg" loading={isSubmitting}>
          {isSubmitting ? "Verifying" : "Verify code"}
        </Button>
      </form>

      <div className="mt-6 text-center text-[13px] text-muted-foreground">
        {secondsLeft > 0 ? (
          <span>Resend code in {secondsLeft}s</span>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            className="font-medium text-primary hover:text-primary-hover"
          >
            Resend code
          </button>
        )}
      </div>
    </div>
  );
}
