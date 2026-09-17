import { VodacomMark } from "./vodacom-mark";
import { NetworkIllustration } from "./network-illustration";

export function BrandPanel() {
  return (
    <div className="relative hidden h-full flex-col justify-between overflow-hidden bg-primary px-12 py-10 text-white lg:flex">
      <VodacomMark variant="light" />

      <div className="relative z-10 max-w-sm">
        <p className="text-[26px] font-semibold leading-[1.25] tracking-tight">
          Every customer conversation, one connected platform.
        </p>
        <p className="mt-3 text-[14px] leading-relaxed text-white/75">
          Support, live assistance and AI-powered conversations for
          Vodacom&apos;s customer care teams — unified in a single workspace.
        </p>
      </div>

      <div className="relative z-10 flex items-center gap-6 text-[13px] text-white/70">
        <span>© {new Date().getFullYear()} Vodacom Group</span>
        <span className="h-1 w-1 rounded-full bg-white/40" />
        <a href="#" className="hover:text-white">
          Privacy
        </a>
        <a href="#" className="hover:text-white">
          Support
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
