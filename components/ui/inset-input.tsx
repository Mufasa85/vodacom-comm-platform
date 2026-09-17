import * as React from "react";

import { cn } from "@/lib/utils";

export interface InsetInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  invalid?: boolean;
  /** Élément affiché à droite dans le champ (ex. bouton afficher/masquer). */
  trailing?: React.ReactNode;
}

const InsetInput = React.forwardRef<HTMLInputElement, InsetInputProps>(
  ({ className, label, invalid, trailing, id, type, ...props }, ref) => {
    return (
      <div
        className={cn(
          "relative rounded-md border bg-card transition-colors",
          "border-input focus-within:border-ring focus-within:ring-2 focus-within:ring-ring",
          invalid && "border-danger focus-within:border-danger focus-within:ring-danger",
          className
        )}
      >
        <label
          htmlFor={id}
          className="pointer-events-none absolute left-3.5 top-2 text-[12px] text-muted-foreground"
        >
          {label}
        </label>
        <input
          id={id}
          ref={ref}
          type={type}
          aria-invalid={invalid}
          className={cn(
            "h-14 w-full rounded-md bg-transparent px-3.5 pb-1.5 pt-6 text-[14px] text-foreground",
            "placeholder:text-muted-foreground/70 focus-visible:outline-none",
            "disabled:cursor-not-allowed disabled:opacity-50",
            trailing && "pr-11"
          )}
          {...props}
        />
        {trailing && (
          <span className="absolute right-0 top-0 flex h-14 w-11 items-center justify-center">
            {trailing}
          </span>
        )}
      </div>
    );
  }
);
InsetInput.displayName = "InsetInput";

export { InsetInput };
