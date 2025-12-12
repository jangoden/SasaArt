import { Button } from "@/components/ui/button";
import { Mail, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getFeaturedProjects } from "@/lib/data-service";
import { ProjectGrid } from "@/components/showcase/project-showcase";

export default async function Home() {
    const featuredProjects = await getFeaturedProjects();

    return (
        <div className="min-h-full flex flex-col justify-center space-y-12">
            <div className="space-y-8">
                <section className="text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold font-headline text-white drop-shadow-lg">
                        Welcome to the World of Lunea
                    </h1>
                    <p className="text-lg md:text-xl text-white/80 mt-2">
                        Artist, Musician, Writer
                    </p>
                </section>

                {/* Main Content */}
                <div className="p-4 md:p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg">
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-headline text-white font-bold mb-4">
                                About
                            </h2>
                            <p className="text-base md:text-lg text-white/90 leading-relaxed">
                                I exist at the intersection of art, literature, and music —
                                spaces where ideas, emotions, and the search for meaning
                                converge. Within these realms, I find both freedom to explore
                                and commitment to the process of becoming my best work. To me,
                                excellence is not an accident, but a conscious pursuit shaped by
                                intention, reflection, and wholehearted engagement.
                            </p>
                        </div>
                        <div className="text-center pt-6">
                            <Button asChild size="lg" className="bg-white/10 hover:bg-white/20 text-white border border-white/20">
                                <a href="mailto:artelunea@gmail.com">
                                    <Mail className="mr-2 h-4 w-4" /> Contact Me
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Projects Section */}
            {featuredProjects.length > 0 && (
                <section className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl md:text-3xl font-headline text-white font-bold">
                            Recent Works
                        </h2>
                        <Link href="/art" className="text-purple-300 hover:text-purple-200 flex items-center gap-1 text-sm font-medium transition-colors">
                            View all <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                    <div className="p-4 md:p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg">
                        <ProjectGrid projects={featuredProjects} />
                    </div>
                </section>
            )}
        </div>
    );
}

