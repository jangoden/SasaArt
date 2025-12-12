import { PageLayout } from "@/components/layout/page-layout";
import { ProjectGrid } from "@/components/showcase/project-showcase";
import { getMusicProjects } from "@/lib/data-service";

export default async function MusicPage() {
  const musicProjects = await getMusicProjects();
  return (
    <PageLayout
      title="Music"
      subtitle="Melodies and lyrics from the heart."
    >
      <ProjectGrid projects={musicProjects} />
    </PageLayout>
  );
}