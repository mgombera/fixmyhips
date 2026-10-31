import type { Metadata } from "next";
import { Placeholder } from "@/components/Placeholder";
import { routeInfo } from "@/lib/routes";

const r = routeInfo("/before/diagnosis");
export const metadata: Metadata = { title: r.title, description: r.summary, alternates: { canonical: "/before/diagnosis" } };

export default function Page() {
  return <Placeholder path="/before/diagnosis" />;
}
