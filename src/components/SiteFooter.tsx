import Link from "next/link";
import { AUDIENCE_STATEMENT, DISCLAIMER, PRACTICE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-surface print:hidden">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div className="flex flex-col gap-2 md:col-span-2">
          <p className="m-0 font-semibold">{AUDIENCE_STATEMENT}</p>
          <p className="m-0 text-muted">
            To learn more about hip problems or to be evaluated, request a consultation at{" "}
            <a href={PRACTICE.consultUrl} className="underline underline-offset-2">gomberamd.com</a>.
          </p>
          <p className="m-0 text-sm text-muted">{DISCLAIMER}</p>
          <p className="m-0 text-sm text-muted">Content reviewed by Dr. Gombera.</p>
        </div>
        <div className="flex flex-col gap-1 text-sm">
          <span className="font-semibold">{PRACTICE.doctor}</span>
          <span className="text-muted">{PRACTICE.group}</span>
          <span className="text-muted">{PRACTICE.address}</span>
          <a href={`tel:${PRACTICE.office.tel}`}>Office {PRACTICE.office.label}</a>
          <a href={`tel:${PRACTICE.afterHours.tel}`}>After hours {PRACTICE.afterHours.label}</a>
          <a href={PRACTICE.portalUrl}>Patient portal (not for urgent problems)</a>
          <Link href="/print">Print center</Link>
          <Link href="/privacy">Privacy</Link>
        </div>
      </div>
    </footer>
  );
}
