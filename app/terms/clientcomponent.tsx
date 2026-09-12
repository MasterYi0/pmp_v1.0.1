"use client";

import { useEffect, useState, ReactNode } from "react";

export interface TocItem {
  id: string;
  label: string;
}

interface TermsClientLayoutProps {
  toc: TocItem[];
  summary: ReactNode;
  children: ReactNode;
  locale: string;
}

export function TermsClientLayout({
  toc,
  summary,
  children,
  locale,
}: TermsClientLayoutProps) {
  const [activeId, setActiveId] = useState<string>(toc[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 }
    );
    for (const item of toc) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [toc]);

  return (
    <div className="grid gap-10 lg:grid-cols-[240px_1fr] lg:gap-16">
      {/* Sidebar TOC */}
      <aside className="hidden lg:block">
        <nav
          aria-label="Table of contents"
          className="sticky top-10 border-l border-border"
        >
          <p className="mb-3 px-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {locale === "ar" ? "في هذه الصفحة" : "On this page"}
          </p>
          <ul className="space-y-0.5">
            {toc.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={activeId === item.id ? "true" : undefined}
                  className={`-ml-px block border-l-2 px-4 py-1.5 text-sm transition-colors ${
                    activeId === item.id
                      ? "border-primary font-medium text-foreground"
                      : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Content */}
      <article className="min-w-0">
        {/* Mobile TOC */}
        <details className="mb-8 rounded-lg border border-border bg-card p-4 lg:hidden">
          <summary className="cursor-pointer text-sm font-semibold text-foreground">
            {locale === "ar" ? "في هذه الصفحة" : "On this page"}
          </summary>
          <ul className="mt-3 space-y-1.5">
            {toc.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </details>

        {/* Summary card */}
        <div className="mb-12 rounded-xl border border-primary/20 bg-primary/5 p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            {locale === "ar" ? "ملخص سريع" : "At a glance"}
          </p>
          <div className="mt-3 text-sm leading-relaxed text-foreground md:text-base">
            {summary}
          </div>
        </div>

        <div className="legal-prose">{children}</div>
      </article>
    </div>
  );
}