"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "transcript-library-theme";

type ThemeMode = "light" | "dark";

function readThemeSnapshot(): ThemeMode {
  if (typeof document === "undefined") return "light";

  const theme = document.documentElement.dataset.theme;
  return theme === "dark" ? "dark" : "light";
}

function getServerSnapshot(): ThemeMode {
  return "light";
}

function subscribe(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => undefined;

  const handleChange = () => onStoreChange();
  window.addEventListener("storage", handleChange);
  window.addEventListener("themechange", handleChange);

  return () => {
    window.removeEventListener("storage", handleChange);
    window.removeEventListener("themechange", handleChange);
  };
}

function applyTheme(theme: ThemeMode) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  window.localStorage.setItem(STORAGE_KEY, theme);
  window.dispatchEvent(new Event("themechange"));
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, readThemeSnapshot, getServerSnapshot);
  const nextTheme = theme === "dark" ? "light" : "dark";

  function handleToggle() {
    applyTheme(nextTheme);
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={"Switch to " + nextTheme + " mode"}
      aria-pressed={theme === "dark"}
      className="inline-flex h-10 items-center gap-2 rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4 text-sm font-medium text-[var(--ink)] shadow-[var(--shadow-card)] transition hover:border-[var(--accent)]/30 hover:bg-[var(--panel)]"
    >
      <span className="text-xs tracking-[0.18em] text-[var(--muted)] uppercase">Theme</span>
      <span>{theme === "dark" ? "Dark" : "Light"}</span>
    </button>
  );
}
