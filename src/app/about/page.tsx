import type { Metadata } from "next";
import { Placeholder } from "@/components/Placeholder";
import { routeInfo } from "@/lib/routes";

const r = routeInfo("/about");
export const metadata: Metadata = { title: r.title, description: r.summary, alternates: { canonical: "/about" } };

export default function Page() {
  return <Placeholder path="/about" />;
}
