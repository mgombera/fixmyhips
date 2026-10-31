import type { Metadata } from "next";
import { Placeholder } from "@/components/Placeholder";
import { routeInfo } from "@/lib/routes";

const r = routeInfo("/faq");
export const metadata: Metadata = { title: r.title, description: r.summary, alternates: { canonical: "/faq" } };

export default function Page() {
  return <Placeholder path="/faq" />;
}
