import { PageLayout } from "@/components/layout/page-layout";
import { LiteratureGrid } from "@/components/showcase/literature-grid";
import { getLiteratureProjects } from "@/lib/data-service";

export default async function LiteraturePage() {
  const literatureProjects = await getLiteratureProjects();
  return (
    <PageLayout
      title="Literature"
      subtitle="Written words, poems, and stories."
    >
      <LiteratureGrid projects={literatureProjects} />
    </PageLayout>
  );
}