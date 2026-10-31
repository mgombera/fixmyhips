import { routeInfo } from "@/lib/routes";

// Temporary page body until the milestone that builds the real page.
export function Placeholder({ path }: { path: string }) {
  const r = routeInfo(path);
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <p className="m-0 text-sm font-semibold uppercase tracking-widest text-muted">
        Coming in milestone {r.milestone}
      </p>
      <h1 className="mt-2 mb-4 font-display text-5xl font-extrabold uppercase leading-none sm:text-6xl">
        {r.title}
      </h1>
      <p className="m-0 max-w-2xl text-lg text-muted">{r.summary}</p>
    </div>
  );
}
