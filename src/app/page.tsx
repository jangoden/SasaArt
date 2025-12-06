import { ProfileCard } from '@/components/profile-card';
import { ProjectShowcase } from '@/components/project-showcase';
import { SocialLinks } from '@/components/social-links';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <header className="p-6">
        <h2 className="text-2xl font-headline text-white font-bold">Lunea Arte</h2>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-6 space-y-12">
        <section className="flex flex-col items-center space-y-4 text-center">
          <ProfileCard />
          <SocialLinks />
        <p className="mt-4 max-w-5xl text-center text-lg text-white">
          I exist at the intersection of art, literature, and music spaces where ideas, emotions, and the search for meaning converge. Within these realms, I find both freedom to explore and commitment to the process of becoming my best work. To me, excellence is not an accident, but a conscious pursuit shaped by intention, reflection, and wholehearted engagement. As long as I remain within my chosen disciplines, I continue to create, grow, and contribute through art, literature, and songwriting
        </p>
        </section>

        <section className="w-full max-w-5xl">
          <ProjectShowcase />
        </section>
      </main>

      <footer className="w-full p-6 text-center">
        <Button asChild className="bg-primary/80 hover:bg-primary text-primary-foreground">
          <a href="mailto:artelunea@gmail.com">
            <Mail className="mr-2 h-4 w-4" /> Contact Me
          </a>
        </Button>
      </footer>
    </div>
  );
}
