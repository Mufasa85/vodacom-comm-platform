import type { Metadata } from "next";
import { FirstLoginForm } from "@/components/auth/first-login-form";

export const metadata: Metadata = { title: "Set up your account | Vodacom Care" };

export default function FirstLoginPage() {
  return <FirstLoginForm />;
}
