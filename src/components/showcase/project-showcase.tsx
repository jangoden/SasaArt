"use client";

import { Project } from "@/lib/data-service";
import { ProjectCard } from "./project-card";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-white/60 text-lg">No projects in this category yet.</p>
        <p className="text-white/40 text-sm mt-2">Check back soon for new content!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((p) => (
        <ProjectCard key={p.id} {...p} />
      ))}
    </div>
  );
}