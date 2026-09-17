import { z } from "zod";
import type { Dictionary } from "@/lib/i18n/translations";

type ValidationMessages = Dictionary["validation"];

function passwordRules(v: ValidationMessages) {
  return z
    .string()
    .min(8, v.passwordMin)
    .regex(/[A-Z]/, v.passwordUpper)
    .regex(/[0-9]/, v.passwordNumber)
    .regex(/[^A-Za-z0-9]/, v.passwordSymbol);
}

export function createLoginSchema(v: ValidationMessages) {
  return z.object({
    email: z.string().min(1, v.emailRequired).email(v.emailInvalid),
    password: z.string().min(1, v.passwordRequired),
    remember: z.boolean().optional(),
  });
}
export type LoginValues = z.infer<ReturnType<typeof createLoginSchema>>;

export function createOtpSchema(v: ValidationMessages) {
  return z.object({
    code: z
      .string()
      .length(6, v.otpLength)
      .regex(/^\d{6}$/, v.otpDigits),
  });
}
export type OtpValues = z.infer<ReturnType<typeof createOtpSchema>>;

export function createForgotPasswordSchema(v: ValidationMessages) {
  return z.object({
    email: z.string().min(1, v.emailRequired).email(v.emailInvalid),
  });
}
export type ForgotPasswordValues = z.infer<ReturnType<typeof createForgotPasswordSchema>>;

export function createResetPasswordSchema(v: ValidationMessages) {
  return z
    .object({
      password: passwordRules(v),
      confirmPassword: z.string().min(1, v.confirmRequired),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: v.passwordsMismatch,
      path: ["confirmPassword"],
    });
}
export type ResetPasswordValues = z.infer<ReturnType<typeof createResetPasswordSchema>>;

export function createFirstLoginSchema(v: ValidationMessages) {
  return z
    .object({
      fullName: z.string().min(2, v.fullNameRequired),
      password: passwordRules(v),
      confirmPassword: z.string().min(1, v.confirmRequired),
      acceptTerms: z.literal(true, {
        errorMap: () => ({ message: v.acceptTerms }),
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: v.passwordsMismatch,
      path: ["confirmPassword"],
    });
}
export type FirstLoginValues = z.infer<ReturnType<typeof createFirstLoginSchema>>;
