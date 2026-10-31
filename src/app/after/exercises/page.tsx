import type { Metadata } from "next";
import { Placeholder } from "@/components/Placeholder";
import { routeInfo } from "@/lib/routes";

const r = routeInfo("/after/exercises");
export const metadata: Metadata = { title: r.title, description: r.summary, alternates: { canonical: "/after/exercises" } };

export default function Page() {
  return <Placeholder path="/after/exercises" />;
}
