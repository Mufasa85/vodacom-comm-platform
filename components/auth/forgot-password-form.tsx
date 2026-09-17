"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { ArrowLeft, MailCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";
import {
  forgotPasswordSchema,
  type ForgotPasswordValues,
} from "@/lib/validations/auth";

export function ForgotPasswordForm() {
  const [sentTo, setSentTo] = React.useState<string | null>(null);
  const [serverError, setServerError] = React.useState<string | null>(null);

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
          Check your email
        </h1>
        <p className="mt-1.5 text-[14px] leading-relaxed text-muted-foreground">
          We&apos;ve sent password reset instructions to{" "}
          <span className="font-medium text-foreground">{sentTo}</span>. The
          link expires in 30 minutes.
        </p>
        <Button asChild variant="outline" className="mt-7 w-full" size="lg">
          <Link href="/login">Back to sign in</Link>
        </Button>
        <p className="mt-5 text-center text-[13px] text-muted-foreground">
          Didn&apos;t receive it?{" "}
          <button
            type="button"
            onClick={() => setSentTo(null)}
            className="font-medium text-primary hover:text-primary-hover"
          >
            Try a different address
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
        Back to sign in
      </Link>

      <h1 className="mt-5 text-[24px] font-semibold tracking-tight text-foreground">
        Reset your password
      </h1>
      <p className="mt-1.5 text-[14px] text-muted-foreground">
        Enter your work email and we&apos;ll send you instructions to reset
        your password.
      </p>

      {serverError && (
        <div className="mt-6">
          <Alert variant="danger">{serverError}</Alert>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-7 space-y-5" noValidate>
        <div className="space-y-1.5">
          <Label htmlFor="email">Work email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@vodacom.co.za"
            invalid={!!errors.email}
            autoComplete="email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-[12.5px] text-danger">{errors.email.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" size="lg" loading={isSubmitting}>
          {isSubmitting ? "Sending instructions" : "Send reset instructions"}
        </Button>
      </form>
    </div>
  );
}
