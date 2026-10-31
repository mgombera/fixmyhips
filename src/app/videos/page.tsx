import type { Metadata } from "next";
import { Placeholder } from "@/components/Placeholder";
import { routeInfo } from "@/lib/routes";

const r = routeInfo("/videos");
export const metadata: Metadata = { title: r.title, description: r.summary, alternates: { canonical: "/videos" } };

export default function Page() {
  return <Placeholder path="/videos" />;
}
