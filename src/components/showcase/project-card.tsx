"use client";

import Image from "next/image";
import Link from "next/link";
import { Project } from "@/lib/data-service";
import { SoundcloudEmbed } from "../soundcloud-embed";
import { cn } from "@/lib/utils";

type ProjectCardProps = Project & {
  category?: string;
};

export function ProjectCard({
  title,
  slug,
  imageUrl,
  soundcloudUrl,
  content,
  category,
}: ProjectCardProps) {
  // Determine what type of content to show
  const hasImage = !!imageUrl;
  const hasMusic = !!soundcloudUrl;
  const hasText = !!content;

  // Literature items should link to their detail page
  const isLink = category === 'literature' && slug;

  const CardContent = (
    <div className={cn(
      "group relative rounded-2xl overflow-hidden transition-all duration-500 ease-out h-full",
      "bg-gradient-to-br from-balack/10 to-black/5 backdrop-blur-xl border border-white/20",
      "hover:border-white/40 hover:shadow-2xl hover:shadow-purple-500/20",
      isLink && "hover:-translate-y-1"
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
        <div className="p-6 flex flex-col h-full min-h-[280px]">
          {/* Category Badge */}
          <div className="mb-4">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase tracking-wider">
              Literature
            </span>
          </div>

          {/* Title */}
          <h3 className="font-headline text-xl md:text-2xl font-bold text-white leading-snug mb-3 group-hover:text-purple-200 transition-colors line-clamp-2">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-white/60 text-sm leading-relaxed line-clamp-3 flex-grow mb-4">
            {content}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <span className="text-white/40 text-xs">
              {Math.max(1, Math.ceil((content?.length || 0) / 1000))} min read
            </span>
            <span className="text-purple-300 text-xs font-medium group-hover:text-purple-200 group-hover:translate-x-1 transition-all inline-flex items-center gap-1">
              Read article
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
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

  if (isLink) {
    return (
      <Link href={`/${category}/${slug}`} className="block h-full">
        {CardContent}
      </Link>
    );
  }

  return CardContent;
}