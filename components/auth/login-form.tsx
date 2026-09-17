"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { InsetInput } from "@/components/ui/inset-input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert } from "@/components/ui/alert";
import { PasswordInput } from "@/components/auth/password-input";
import { loginSchema, type LoginValues } from "@/lib/validations/auth";

const fieldMotion = {
  hidden: { opacity: 0, y: 8 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.06 * i, duration: 0.35, ease: "easeOut" },
  }),
};

export function LoginForm() {
  const router = useRouter();
  const [serverError, setServerError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", remember: false },
  });

  async function onSubmit(values: LoginValues) {
    setServerError(null);
    await new Promise((r) => setTimeout(r, 900));

    if (values.password.length < 8) {
      setServerError("The email or password you entered is incorrect.");
      return;
    }
    router.push("/otp");
  }

  return (
    <div>
      <motion.div
        initial="hidden"
        animate="show"
        custom={0}
        variants={fieldMotion}
      >
        <h1 className="text-[24px] font-semibold tracking-tight text-foreground">
          Sign in to your workspace
        </h1>
        <p className="mt-1.5 text-[14px] text-muted-foreground">
          Enter your Vodacom credentials to access the care platform.
        </p>
      </motion.div>

      {serverError && (
        <motion.div initial="hidden" animate="show" custom={1} variants={fieldMotion} className="mt-6">
          <Alert variant="danger">{serverError}</Alert>
        </motion.div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-7 space-y-5" noValidate>
        <motion.div initial="hidden" animate="show" custom={2} variants={fieldMotion} className="space-y-1.5">
          <InsetInput
            id="email"
            label="Work email"
            type="email"
            invalid={!!errors.email}
            autoComplete="email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-[12.5px] text-danger">{errors.email.message}</p>
          )}
        </motion.div>

        <motion.div initial="hidden" animate="show" custom={3} variants={fieldMotion} className="space-y-1.5">
          <PasswordInput
            id="password"
            label="Password"
            invalid={!!errors.password}
            autoComplete="current-password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-[12.5px] text-danger">{errors.password.message}</p>
          )}
        </motion.div>

        <motion.div
          initial="hidden"
          animate="show"
          custom={4}
          variants={fieldMotion}
          className="flex items-center justify-between gap-3"
        >
          <span className="flex items-center gap-2">
            <Checkbox id="remember" {...register("remember")} />
            <Label htmlFor="remember" className="font-normal text-muted-foreground">
              Keep me signed in on this device
            </Label>
          </span>
          <Link
            href="/forgot-password"
            className="shrink-0 text-[13px] font-medium text-primary hover:text-primary-hover"
          >
            Forgot password?
          </Link>
        </motion.div>

        <motion.div initial="hidden" animate="show" custom={5} variants={fieldMotion}>
          <Button type="submit" className="w-full" size="lg" loading={isSubmitting}>
            {isSubmitting ? "Signing in" : "Sign in"}
          </Button>
        </motion.div>
      </form>

      <motion.p
        initial="hidden"
        animate="show"
        custom={6}
        variants={fieldMotion}
        className="mt-8 text-center text-[13px] text-muted-foreground"
      >
        Trouble accessing your account?{" "}
        <a href="#" className="font-medium text-primary hover:text-primary-hover">
          Contact IT support
        </a>
      </motion.p>
    </div>
  );
}
