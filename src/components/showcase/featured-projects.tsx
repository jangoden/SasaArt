"use client";

import { getFeaturedProjects } from "@/lib/data-service";
import { ProjectCard } from "./project-card";

export function FeaturedProjects() {
  const featuredProjects = getFeaturedProjects();
  return (
    <div>
        <h2 className="text-2xl md:text-3xl font-headline text-white font-bold mb-6">Featured Work</h2>
        <div className="grid gap-6 md:grid-cols-2">
            {featuredProjects.map((p, index) => (
                <ProjectCard key={`${p.title}-${p.imageUrl || p.imageId || p.soundcloudUrl}-${index}`} {...p} />
            ))}
        </div>
    </div>
  );
}