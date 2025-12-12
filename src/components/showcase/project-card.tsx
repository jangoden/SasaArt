"use client";

import Image from "next/image";
import { Project } from "@/lib/data-service";
import { SoundcloudEmbed } from "../soundcloud-embed";
import { cn } from "@/lib/utils";

export function ProjectCard({
  title,
  imageUrl,
  soundcloudUrl,
  content,
}: Project) {
  // Determine what type of content to show
  const hasImage = !!imageUrl;
  const hasMusic = !!soundcloudUrl;
  const hasText = !!content;

  return (
    <div className={cn(
      "group relative rounded-2xl overflow-hidden transition-all duration-500 ease-out h-full",
      "bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20",
      "hover:border-white/40 hover:shadow-2xl hover:shadow-purple-500/20",
      "hover:-translate-y-1"
    )}>
      {/* Image Display (For Art, Architecture) */}
      {hasImage && (
        <div className="relative w-full overflow-hidden">
          <Image
            src={imageUrl!}
            alt={title}
            width={800}
            height={600}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-auto object-contain transition-transform duration-700 ease-out group-hover:scale-105"
            unoptimized={imageUrl?.startsWith('http')}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Title on Image (shown on hover) */}
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="font-headline text-xl md:text-2xl font-bold text-white drop-shadow-lg leading-tight">
              {title}
            </h3>
          </div>
        </div>
      )}

      {/* Music Display (For Music) */}
      {hasMusic && !hasImage && (
        <div className="p-5 space-y-4">
          <h3 className="font-headline text-xl font-bold text-white/90 group-hover:text-white transition-colors">
            {title}
          </h3>
          <div className="rounded-xl overflow-hidden border border-white/10">
            <SoundcloudEmbed url={soundcloudUrl!} />
          </div>
        </div>
      )}

      {/* Text/Blog Display (For Literature) */}
      {hasText && !hasImage && !hasMusic && (
        <div className="p-5 space-y-3 flex flex-col h-full">
          <h3 className="font-headline text-xl font-bold text-white/90 group-hover:text-white transition-colors">
            {title}
          </h3>
          <p className="text-white/70 text-sm leading-relaxed line-clamp-4 flex-grow">
            {content}
          </p>
          <div className="pt-2">
            <span className="text-xs text-purple-300 font-medium group-hover:text-purple-200 transition-colors">
              Read more →
            </span>
          </div>
        </div>
      )}

      {/* Fallback: Title only (no specific content) */}
      {!hasImage && !hasMusic && !hasText && (
        <div className="p-5 flex items-center justify-center min-h-[200px]">
          <h3 className="font-headline text-xl font-bold text-white/80 text-center">
            {title}
          </h3>
        </div>
      )}
    </div>
  );
}