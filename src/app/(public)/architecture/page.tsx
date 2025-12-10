import { PageLayout } from "@/components/layout/page-layout";
import { ProjectGrid } from "@/components/showcase/project-showcase";
import { getArchitectureProjects } from "@/lib/data-service";

export default async function ArchitecturePage() {
  const architectureProjects = await getArchitectureProjects();

  return (
    <PageLayout
      title="Architecture"
      subtitle="Designs and concepts for the built environment."
    >
      <ProjectGrid projects={architectureProjects} />
    </PageLayout>
  );
}