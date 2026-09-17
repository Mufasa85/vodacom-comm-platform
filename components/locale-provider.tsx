"use client";

import * as React from "react";
import {
  type Dictionary,
  dictionaries,
  type Locale,
  localeLabel,
  translate,
} from "@/lib/i18n/translations";

const STORAGE_KEY = "vodacom-locale";

interface LocaleContextValue {
  locale: Locale;
  localeLabel: "FR" | "EN";
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  validation: Dictionary["validation"];
}

const LocaleContext = React.createContext<LocaleContextValue | null>(null);

function applyLocaleToDocument(locale: Locale) {
  document.documentElement.lang = locale === "fr" ? "fr" : "en";
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = React.useState<Locale>("fr");

  React.useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
    const initial: Locale = stored === "en" || stored === "fr" ? stored : "fr";
    setLocaleState(initial);
    applyLocaleToDocument(initial);
  }, []);

  const setLocale = React.useCallback((next: Locale) => {
    setLocaleState(next);
    applyLocaleToDocument(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const toggleLocale = React.useCallback(() => {
    setLocaleState((current) => {
      const next: Locale = current === "fr" ? "en" : "fr";
      applyLocaleToDocument(next);
      window.localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const t = React.useCallback(
    (key: string, params?: Record<string, string | number>) => translate(locale, key, params),
    [locale]
  );

  const value = React.useMemo(
    () => ({
      locale,
      localeLabel: localeLabel(locale),
      setLocale,
      toggleLocale,
      t,
      validation: dictionaries[locale].validation,
    }),
    [locale, setLocale, toggleLocale, t]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = React.useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within a LocaleProvider");
  return ctx;
}
