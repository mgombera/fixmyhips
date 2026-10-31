import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRINT_SHEETS, printSheet } from "@/content";
import { PrintSheetView } from "@/components/print/PrintSheetView";
import { Container } from "@/components/ui";

export function generateStaticParams() {
  return PRINT_SHEETS.map((s) => ({ sheet: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ sheet: string }> }): Promise<Metadata> {
  const s = printSheet((await params).sheet);
  return s ? { title: `Print: ${s.title}`, description: s.summary, alternates: { canonical: `/print/${s.id}` } } : {};
}

export default async function SheetPage({ params }: { params: Promise<{ sheet: string }> }) {
  const s = printSheet((await params).sheet);
  if (!s) notFound();
  return (
    <Container className="py-8 print:p-0">
      <PrintSheetView id={s.id} />
    </Container>
  );
}
