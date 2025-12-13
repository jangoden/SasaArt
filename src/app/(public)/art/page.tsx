import { PageLayout } from "@/components/layout/page-layout";
import { ProjectGrid } from "@/components/showcase/project-showcase";
import { getArtProjects } from "@/lib/data-service";

export const revalidate = 0;

export default async function ArtPage() {
  const artProjects = await getArtProjects();
  return (
    <PageLayout
      title="Art"
      subtitle="A collection of visual works exploring texture, color, and emotion."
    >
      <ProjectGrid projects={artProjects} />
    </PageLayout>
  );
}