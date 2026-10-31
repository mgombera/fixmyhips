import type { Metadata } from "next";
import { Placeholder } from "@/components/Placeholder";
import { routeInfo } from "@/lib/routes";

const r = routeInfo("/red-flags");
export const metadata: Metadata = { title: r.title, description: r.summary, alternates: { canonical: "/red-flags" } };

export default function Page() {
  return <Placeholder path="/red-flags" />;
}
