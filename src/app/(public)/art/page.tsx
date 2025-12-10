import { PageLayout } from "@/components/layout/page-layout";
import { SubCategoryShowcase } from "@/components/showcase/project-showcase";
import { getArtProjects } from "@/lib/data-service";

export default async function ArtPage() {
  const artProjectsBySubcategory = await getArtProjects();
  return (
    <PageLayout
      title="Art"
      subtitle="A collection of visual works."
    >
      <SubCategoryShowcase data={artProjectsBySubcategory} />
    </PageLayout>
  );
}