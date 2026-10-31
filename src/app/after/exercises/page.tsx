import type { Metadata } from "next";
import { ExerciseLibrary } from "@/components/ExerciseLibrary";
import { Container, PageHeader, Reviewed } from "@/components/ui";
import { routeInfo } from "@/lib/routes";

const r = routeInfo("/after/exercises");
export const metadata: Metadata = { title: r.title, description: r.summary, alternates: { canonical: "/after/exercises" } };

export default function ExercisesPage() {
  return (
    <Container className="py-10">
      <PageHeader eyebrow="After surgery" title="Exercise library" intro="Every exercise in your protocol, phase by phase." />
      <div className="mt-8">
        <ExerciseLibrary />
      </div>
      <Reviewed />
    </Container>
  );
}
