import { SectionNav } from "@/components/SectionNav";

const ITEMS = [
  { href: "/after", label: "Dashboard" },
  { href: "/after/timeline", label: "Timeline" },
  { href: "/after/exercises", label: "Exercises" },
  { href: "/after/care", label: "Home care" },
];

export default function AfterLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SectionNav label="After surgery" items={ITEMS} />
      {children}
    </>
  );
}
