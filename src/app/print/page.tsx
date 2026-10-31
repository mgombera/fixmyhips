import type { Metadata } from "next";
import { Placeholder } from "@/components/Placeholder";
import { routeInfo } from "@/lib/routes";

const r = routeInfo("/print");
export const metadata: Metadata = { title: r.title, description: r.summary, alternates: { canonical: "/print" } };

export default function Page() {
  return <Placeholder path="/print" />;
}
