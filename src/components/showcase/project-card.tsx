"use client";

import Image from "next/image";
import { Project } from "@/lib/projects-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { SoundcloudEmbed } from "../soundcloud-embed";

export function ProjectCard({
  title,
  imageUrl,
  imageId,
  soundcloudUrl,
}: Project) {
  const finalImageUrl =
    imageUrl ||
    (imageId && PlaceHolderImages.find((img) => img.id === imageId)?.imageUrl);
  const altText = title;

  return (
    <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 h-full flex flex-col">
      <div className="p-4 flex-grow">
        <h3 className="font-headline text-xl tracking-wide text-white mb-2">
          {title}
        </h3>
        <div className="aspect-video relative">
          {soundcloudUrl ? (
            <SoundcloudEmbed url={soundcloudUrl} />
          ) : finalImageUrl && (
            <Image
              src={finalImageUrl}
              alt={altText}
              fill
              className="rounded-md object-cover"
            />
          )}
        </div>
      </div>
    </div>
  );
}