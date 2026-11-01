import { SectionNav } from "@/components/SectionNav";

const ITEMS = [
  { href: "/after", label: "Dashboard" },
  { href: "/after/care", label: "Home care" },
  { href: "/after/timeline", label: "Timeline" },
  { href: "/after/home-program", label: "Home program" },
  { href: "/after/when-to-call", label: "When to call" },
];

export default function AfterLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SectionNav label="After surgery" items={ITEMS} />
      {children}
    </>
  );
}
