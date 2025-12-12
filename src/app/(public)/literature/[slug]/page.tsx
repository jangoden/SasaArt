import { getProjectBySlug, getLiteratureProjects } from "@/lib/data-service";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, BookOpen, Share2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getLiteratureProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function LiteratureDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Format content into paragraphs
  const paragraphs = project.content?.split('\n\n').filter(Boolean) || [];

  return (
    <article className="min-h-screen animate-in fade-in duration-500">
      {/* Hero Section */}
      <header className="relative pb-12 pt-4">
        {/* Back Button */}
        <Link
          href="/literature"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Literature</span>
        </Link>

        {/* Title Section */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Literature
            </span>
            <div className="flex items-center gap-2 text-white/50 text-sm">
              <Calendar className="h-4 w-4" />
              <span>Published</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold text-white leading-tight mb-6">
            {project.title}
          </h1>

          {/* Reading info */}
          <div className="flex items-center gap-6 text-white/60">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="text-sm">
                {Math.max(1, Math.ceil((project.content?.length || 0) / 1000))} min read
              </span>
            </div>
          </div>
        </div>

        {/* Decorative gradient line */}
        <div className="mt-12 h-px bg-gradient-to-r from-purple-500/50 via-white/10 to-transparent" />
      </header>

      {/* Content Section */}
      <div className="max-w-3xl">
        <div className="p-6 md:p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10">
          <div className="prose prose-lg prose-invert max-w-none">
            {paragraphs.length > 0 ? (
              paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={`text-white/80 text-lg leading-relaxed mb-6 ${index === 0 ? 'first-letter:text-5xl first-letter:font-headline first-letter:font-bold first-letter:text-purple-300 first-letter:float-left first-letter:mr-3 first-letter:mt-1' : ''}`}
                >
                  {paragraph}
                </p>
              ))
            ) : project.content ? (
              <div
                className="text-white/80 text-lg leading-relaxed"
                dangerouslySetInnerHTML={{ __html: project.content }}
              />
            ) : (
              <p className="text-white/60 italic text-center py-8">
                Content coming soon...
              </p>
            )}
          </div>
        </div>

        {/* Actions Bar */}
        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-white/60 hover:text-white hover:bg-white/10"
            >
              <Heart className="h-4 w-4 mr-2" />
              Like
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white/60 hover:text-white hover:bg-white/10"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>

          <Link
            href="/literature"
            className="text-purple-300 hover:text-purple-200 text-sm font-medium transition-colors"
          >
            ← More Stories
          </Link>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="fixed top-1/4 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-1/4 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
    </article>
  );
}
