import type { Metadata } from "next";
import { Walkthrough } from "@/components/Walkthrough";
import { Container, PageHeader } from "@/components/ui";

// Gate 2 review tool for Dr. Gombera. Not linked, not in the sitemap, not
// indexed and not counted in analytics. Remove at launch (milestone 8).
export const metadata: Metadata = {
  title: "Walkthrough",
  robots: { index: false, follow: false },
};

export default function WalkthroughPage() {
  return (
    <Container className="py-10">
      <PageHeader
        eyebrow="Review only"
        title="Gate 2 walkthrough"
        intro="Tap a state to load it on this device, review the page it opens, then come back here for the next one. Nothing is sent anywhere."
      />
      <div className="mt-8">
        <Walkthrough />
      </div>
    </Container>
  );
}
