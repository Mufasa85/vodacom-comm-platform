"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import { PasswordInput } from "@/components/auth/password-input";
import { PasswordStrength } from "@/components/auth/password-strength";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { InsetInput } from "@/components/ui/inset-input";
import { Label } from "@/components/ui/label";
import { type FirstLoginValues, firstLoginSchema } from "@/lib/validations/auth";

export function FirstLoginForm() {
  const router = useRouter();
  const [serverError, setServerError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FirstLoginValues>({
    resolver: zodResolver(firstLoginSchema),
    defaultValues: {
      fullName: "",
      password: "",
      confirmPassword: "",
      acceptTerms: undefined,
    },
  });

  const password = watch("password");

  async function onSubmit(_values: FirstLoginValues) {
    setServerError(null);
    await new Promise((r) => setTimeout(r, 900));
    router.push("/conversations");
  }

  return (
    <div>
      <span className="inline-flex rounded-full bg-primary/10 px-2.5 py-1 text-[12px] font-medium text-primary">
        Welcome to the platform
      </span>
      <h1 className="mt-4 text-[24px] font-semibold tracking-tight text-foreground">
        Set up your account
      </h1>
      <p className="mt-1.5 text-[14px] text-muted-foreground">
        This is your first sign-in. Confirm your name and choose a password to activate your
        account.
      </p>

      {serverError && (
        <div className="mt-6">
          <Alert variant="danger">{serverError}</Alert>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-7 space-y-5" noValidate>
        <div className="space-y-1.5">
          <InsetInput
            id="fullName"
            label="Full name"
            invalid={!!errors.fullName}
            autoComplete="name"
            {...register("fullName")}
          />
          {errors.fullName && (
            <p className="text-[12.5px] text-danger">{errors.fullName.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <PasswordInput
            id="password"
            label="Create password"
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
            label="Confirm password"
            invalid={!!errors.confirmPassword}
            autoComplete="new-password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-[12.5px] text-danger">{errors.confirmPassword.message}</p>
          )}
        </div>

        <div className="flex items-start gap-2.5">
          <Checkbox id="acceptTerms" className="mt-0.5" {...register("acceptTerms")} />
          <Label htmlFor="acceptTerms" className="font-normal leading-snug text-muted-foreground">
            I agree to Vodacom&apos;s acceptable use policy and data handling guidelines for
            internal systems.
          </Label>
        </div>
        {errors.acceptTerms && (
          <p className="-mt-2 text-[12.5px] text-danger">{errors.acceptTerms.message}</p>
        )}

        <Button type="submit" className="w-full" size="lg" loading={isSubmitting}>
          {isSubmitting ? "Activating account" : "Activate account"}
        </Button>
      </form>
    </div>
  );
}
