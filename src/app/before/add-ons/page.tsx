import type { Metadata } from "next";
import { Placeholder } from "@/components/Placeholder";
import { routeInfo } from "@/lib/routes";

const r = routeInfo("/before/add-ons");
export const metadata: Metadata = { title: r.title, description: r.summary, alternates: { canonical: "/before/add-ons" } };

export default function Page() {
  return <Placeholder path="/before/add-ons" />;
}
