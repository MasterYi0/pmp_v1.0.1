import { ReactNode } from "react";
import { CalendarDays } from "lucide-react";

interface PrivacyHeaderProps {
  title: string;
  description: string;
  lastUpdated: string;
  locale: string;
}

export function PrivacyHeader({ title, description, lastUpdated, locale }: PrivacyHeaderProps) {
  return (
    <div className="border-b border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          {locale === "ar" ? "قانوني" : "Legal"}
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
        <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground">
          <CalendarDays className="size-3.5" aria-hidden />
          {locale === "ar" ? "آخر تحديث:" : "Last updated:"} {lastUpdated}
        </p>
      </div>
    </div>
  );
}