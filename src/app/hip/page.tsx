import type { Metadata } from "next";
import { Placeholder } from "@/components/Placeholder";
import { routeInfo } from "@/lib/routes";

const r = routeInfo("/hip");
export const metadata: Metadata = { title: r.title, description: r.summary, alternates: { canonical: "/hip" } };

export default function Page() {
  return <Placeholder path="/hip" />;
}
