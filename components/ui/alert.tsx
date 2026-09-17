import { cva, type VariantProps } from "class-variance-authority";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import type * as React from "react";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "flex items-start gap-2.5 rounded-md border px-3.5 py-3 text-[13px] leading-relaxed",
  {
    variants: {
      variant: {
        danger: "border-danger/20 bg-danger/[0.06] text-danger",
        success: "border-success/20 bg-success/[0.06] text-success",
        info: "border-border bg-muted text-foreground/80",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
);

const icons = {
  danger: AlertCircle,
  success: CheckCircle2,
  info: Info,
};

interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

function Alert({ className, variant = "info", children, ...props }: AlertProps) {
  const Icon = icons[variant ?? "info"];
  return (
    <div role="alert" className={cn(alertVariants({ variant }), className)} {...props}>
      <Icon className="mt-0.5 h-4 w-4 shrink-0" />
      <div>{children}</div>
    </div>
  );
}

export { Alert };
