// Small shared building blocks for content pages.

export function PageHeader({ eyebrow, title, intro }: { eyebrow?: string; title: React.ReactNode; intro?: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      {eyebrow && <p className="m-0 text-sm font-semibold uppercase tracking-widest text-muted">{eyebrow}</p>}
      <h1 className="m-0 font-display text-5xl font-extrabold uppercase leading-[0.95] sm:text-7xl">{title}</h1>
      {intro && <div className="m-0 max-w-2xl text-lg">{intro}</div>}
    </div>
  );
}

export function SectionTitle({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2 id={id} className="m-0 font-display text-3xl font-bold uppercase tracking-wide sm:text-4xl">
      {children}
    </h2>
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-xl border border-border bg-surface p-5 ${className}`}>{children}</div>;
}

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="m-0 flex list-disc flex-col gap-1.5 pl-5">
      {items.map((p) => (
        <li key={p}>{p}</li>
      ))}
    </ul>
  );
}

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-6xl px-4 ${className}`}>{children}</div>;
}
