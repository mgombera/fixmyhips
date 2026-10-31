"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Tabs between the pages of one section (Before or After surgery).
export function SectionNav({ label, items }: { label: string; items: { href: string; label: string }[] }) {
  const pathname = usePathname();
  return (
    <nav aria-label={label} className="border-b border-border print:hidden">
      <ul className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4">
        {items.map((i) => {
          const active = pathname === i.href;
          return (
            <li key={i.href} className="shrink-0">
              <Link
                href={i.href}
                aria-current={active ? "page" : undefined}
                className={`inline-flex min-h-12 items-center border-b-2 px-3 text-sm font-semibold uppercase tracking-wide no-underline ${
                  active ? "border-accent text-text" : "border-transparent text-muted hover:text-text"
                }`}
              >
                {i.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
