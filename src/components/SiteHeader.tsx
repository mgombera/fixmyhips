"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { PRIMARY_NAV } from "@/lib/routes";
import { PRACTICE } from "@/lib/site";
import { PhoneIcon, AlertIcon, MenuIcon, CloseIcon } from "./icons";
import { ThemeToggle } from "./ThemeToggle";

function ModeSwitch({ pathname }: { pathname: string }) {
  const isBefore = pathname.startsWith("/before");
  const isAfter = pathname.startsWith("/after");
  const base =
    "inline-flex min-h-11 items-center rounded-md px-3 text-sm font-semibold uppercase tracking-wide";
  return (
    <div
      role="group"
      aria-label="Surgery stage"
      className="inline-flex rounded-lg border border-border p-0.5"
    >
      <Link
        href="/before"
        aria-current={isBefore ? "page" : undefined}
        className={`${base} ${isBefore ? "bg-accent text-accent-ink" : "text-muted hover:text-text"}`}
      >
        Before surgery
      </Link>
      <Link
        href="/after"
        aria-current={isAfter ? "page" : undefined}
        className={`${base} ${isAfter ? "bg-accent text-accent-ink" : "text-muted hover:text-text"}`}
      >
        After surgery
      </Link>
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-border bg-bg print:hidden">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-3 no-underline" aria-label="Fix My Hips home">
          <span className="flex h-11 items-center rounded-md bg-white px-2">
            <Image
              src={PRACTICE.logoUrl}
              alt="Mufaddal Gombera, MD"
              width={120}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </span>
          <span className="font-display text-2xl font-extrabold uppercase tracking-wide text-text">
            Fix<span className="text-accent">/</span>My Hips
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${PRACTICE.office.tel}`}
            className="inline-flex min-h-11 items-center gap-2 rounded-md bg-accent px-3 font-semibold text-accent-ink no-underline"
          >
            <PhoneIcon />
            <span className="sr-only sm:not-sr-only">Call</span>
          </a>
          <Link
            href="/red-flags"
            className="inline-flex min-h-11 items-center gap-2 rounded-md border border-alert px-3 font-semibold text-alert no-underline"
          >
            <AlertIcon />
            <span>Red flags</span>
          </Link>
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-border text-text md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <nav aria-label="Main" className="hidden md:block">
            <ul className="-ml-3 flex gap-1">
              {PRIMARY_NAV.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`inline-flex min-h-11 items-center px-3 text-sm font-semibold uppercase tracking-wide no-underline ${active ? "text-text" : "text-muted hover:text-text"}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <ModeSwitch pathname={pathname} />
        </div>
        {open && (
          <nav id="mobile-nav" aria-label="Main" className="mt-3 md:hidden">
            <ul className="flex flex-col border-t border-border">
              {PRIMARY_NAV.map((item) => (
                <li key={item.href} className="border-b border-border">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-12 items-center font-semibold text-text no-underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
