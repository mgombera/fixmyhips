import { SectionNav } from "@/components/SectionNav";

const ITEMS = [
  { href: "/before", label: "Checklist" },
  { href: "/before/surgery-day", label: "Surgery day" },
  { href: "/before/diagnosis", label: "Your diagnosis" },
  { href: "/before/add-ons", label: "Add-ons" },
];

export default function BeforeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SectionNav label="Before surgery" items={ITEMS} />
      {children}
    </>
  );
}
