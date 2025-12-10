import { PageLayout } from "@/components/layout/page-layout";
import { SubCategoryShowcase } from "@/components/showcase/project-showcase";
import { getMusicProjects } from "@/lib/data-service";

export default async function MusicPage() {
  const musicProjectsBySubcategory = await getMusicProjects();
  
  // The user wants to show specific categories as main tabs
  const displayableMusic = {
    'Covers': musicProjectsBySubcategory['Covers'] || [],
    'Perform': musicProjectsBySubcategory['Perform'] || [],
    'Lyrics': musicProjectsBySubcategory['Lyrics'] || [],
  };

  return (
    <PageLayout
      title="Music"
      subtitle="Melodies and lyrics from the heart."
    >
      <SubCategoryShowcase data={displayableMusic} />
    </PageLayout>
  );
}