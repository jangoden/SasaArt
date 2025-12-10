"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Project } from "@/lib/projects-data";
import { ProjectCard } from "./project-card";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((p, index) => (
        <ProjectCard
          key={`${p.title}-${p.imageUrl || p.imageId || p.soundcloudUrl}-${index}`}
          {...p}
        />
      ))}
    </div>
  );
}

interface ShowcaseProps {
    data: {
        [category: string]: {
            [subCategory: string]: Project[]
        }
    }
}

// A showcase that includes only sub-category tabs
export function SubCategoryShowcase({ data }: { data: { [subCategory: string]: Project[] } }) {
    const subCategories = Object.keys(data);

    if(subCategories.length === 0) {
        return <p>No projects in this category yet.</p>
    }

    return (
        <Tabs defaultValue={subCategories[0]} className="w-full">
            <div className="flex justify-center">
                <TabsList className="bg-white/10 backdrop-blur-md border border-white/20">
                    {subCategories.map(subCat => <TabsTrigger key={subCat} value={subCat} className="text-white/80">{subCat}</TabsTrigger>)}
                </TabsList>
            </div>
            {subCategories.map(subCat => (
                <TabsContent key={subCat} value={subCat} className="mt-4">
                    <ProjectGrid projects={data[subCat]} />
                </TabsContent>
            ))}
        </Tabs>
    );
}


export function ProjectShowcase({ data }: ShowcaseProps) {
    const categories = Object.keys(data);

    if(categories.length === 0) {
        return <p>No projects in this category yet.</p>
    }

  return (
    <Tabs defaultValue={categories[0]} className="w-full">
      <div className="flex justify-center">
        <TabsList className="bg-white/10 backdrop-blur-md border border-white/20">
          {categories.map((cat) => (
            <TabsTrigger key={cat} value={cat} className="text-white/80">
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {categories.map((cat) => (
        <TabsContent key={cat} value={cat} className="mt-6">
            <ProjectGrid projects={Object.values(data[cat]).flat()} />
        </TabsContent>
      ))}
    </Tabs>
  );
}

// A more detailed showcase that includes sub-categories
export function DetailedProjectShowcase({ data }: ShowcaseProps) {
    const categories = Object.keys(data);

    if(categories.length === 0) {
        return <p>No projects in this category yet.</p>
    }

  return (
    <Tabs defaultValue={categories[0]} className="w-full">
      <div className="flex justify-center">
        <TabsList className="bg-white/10 backdrop-blur-md border border-white/20">
          {categories.map((cat) => (
            <TabsTrigger key={cat} value={cat} className="text-white/80">
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {categories.map((cat) => (
        <TabsContent key={cat} value={cat} className="mt-6">
          <Tabs defaultValue={Object.keys(data[cat])[0]} className="w-full">
            <div className="flex justify-center">
                <TabsList className="bg-white/10 backdrop-blur-md border border-white/20">
                {Object.keys(data[cat]).map(subCat => <TabsTrigger key={subCat} value={subCat} className="text-white/80">{subCat}</TabsTrigger>)}
                </TabsList>
            </div>
            {Object.keys(data[cat]).map(subCat => (
                <TabsContent key={subCat} value={subCat} className="mt-4">
                    <ProjectGrid projects={data[cat][subCat]} />
                </TabsContent>
            ))}
          </Tabs>
        </TabsContent>
      ))}
    </Tabs>
  );
}