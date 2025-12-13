"use client";

import { useState } from "react";
import { Project } from "@/lib/data-service";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

function truncateText(text: string | undefined, length: number): string {
  if (!text) return "";
  if (text.length <= length) return text;
  return text.substring(0, length) + "...";
}

export function LiteratureGrid({ projects }: { projects: Project[] }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-white/60 text-lg">No projects in this category yet.</p>
        <p className="text-white/40 text-sm mt-2">Check back soon for new content!</p>
      </div>
    );
  }

  return (
    <Dialog>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <Card key={p.id} className="flex flex-col bg-white/5 backdrop-blur-xl border border-white/10">
            <CardHeader>
              <CardTitle className="text-white">{p.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <div
                className="prose prose-sm prose-invert"
                dangerouslySetInnerHTML={{
                  __html: truncateText(p.content, 150),
                }}
              />
            </CardContent>
            <CardFooter>
              <DialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white" 
                  onClick={() => setSelectedProject(p)}
                >
                  Read More
                </Button>
              </DialogTrigger>
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedProject && (
        <DialogContent className="sm:max-w-3xl bg-black/50 backdrop-blur-xl border border-white/10">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">{selectedProject.title}</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[70vh] p-4">
            <div
              className="prose prose-invert"
              dangerouslySetInnerHTML={{ __html: selectedProject.content || "" }}
            />
          </ScrollArea>
        </DialogContent>
      )}
    </Dialog>
  );
}
