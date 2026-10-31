import type { Metadata } from "next";
import { Placeholder } from "@/components/Placeholder";
import { routeInfo } from "@/lib/routes";

const r = routeInfo("/after/timeline");
export const metadata: Metadata = { title: r.title, description: r.summary, alternates: { canonical: "/after/timeline" } };

export default function Page() {
  return <Placeholder path="/after/timeline" />;
}
