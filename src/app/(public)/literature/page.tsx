import { PageLayout } from "@/components/layout/page-layout";
import { ProjectGrid } from "@/components/showcase/project-showcase";
import { getLiteratureProjects } from "@/lib/data-service";

export default async function LiteraturePage() {
  const literatureProjects = await getLiteratureProjects();
  return (
    <PageLayout
      title="Literature"
      subtitle="Written words, poems, and stories."
    >
      <ProjectGrid projects={literatureProjects} />
    </PageLayout>
  );
}