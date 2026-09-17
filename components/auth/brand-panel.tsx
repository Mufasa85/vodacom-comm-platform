"use client";

import { useLocale } from "@/components/locale-provider";
import { NetworkIllustration } from "./network-illustration";
import { VodacomMark } from "./vodacom-mark";

export function BrandPanel() {
  const { t } = useLocale();

  return (
    <div className="relative hidden h-full flex-col justify-between overflow-hidden bg-primary px-12 py-10 text-white lg:flex">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[url('/vodacome_pattern2.png')] bg-cover bg-center opacity-40 mix-blend-multiply"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-primary/10"
      />

      <div className="relative z-10">
        <VodacomMark variant="light" />
      </div>

      <div className="relative z-10 max-w-sm">
        <p className="text-[26px] font-semibold leading-[1.25] tracking-tight">
          {t("brand.headline")}
        </p>
        <p className="mt-3 text-[14px] leading-relaxed text-white/75">{t("brand.subline")}</p>
      </div>

      <div className="relative z-10 flex items-center gap-6 text-[13px] text-white/70">
        <span>© {new Date().getFullYear()} Vodacom Group</span>
        <span className="h-1 w-1 rounded-full bg-white/40" />
        <a href="https://www.vodacom.com/privacy-policy" className="hover:text-white">
          {t("brand.privacy")}
        </a>
        <a href="mailto:support@vodacom.com" className="hover:text-white">
          {t("brand.support")}
        </a>
      </div>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-16 -top-10 h-[420px] w-[420px] opacity-90">
          <NetworkIllustration />
        </div>
      </div>
    </div>
  );
}
