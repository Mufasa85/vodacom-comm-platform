"use client";

import { Eye, EyeOff } from "lucide-react";
import * as React from "react";

import { InsetInput, type InsetInputProps } from "@/components/ui/inset-input";

type PasswordInputProps = Omit<InsetInputProps, "type" | "trailing">;

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>((props, ref) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <InsetInput
      ref={ref}
      type={visible ? "text" : "password"}
      trailing={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          tabIndex={-1}
          aria-label={visible ? "Masquer le mot de passe" : "Afficher le mot de passe"}
          className="flex h-full w-full items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      }
      {...props}
    />
  );
});
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
