import type { Metadata } from "next";
import { Placeholder } from "@/components/Placeholder";
import { routeInfo } from "@/lib/routes";

const r = routeInfo("/privacy");
export const metadata: Metadata = { title: r.title, description: r.summary, alternates: { canonical: "/privacy" } };

export default function Page() {
  return <Placeholder path="/privacy" />;
}
