import type { Metadata } from "next";
import { OtpForm } from "@/components/auth/otp-form";

export const metadata: Metadata = { title: "Verify | Vodacom Care" };

export default function OtpPage() {
  return <OtpForm />;
}
