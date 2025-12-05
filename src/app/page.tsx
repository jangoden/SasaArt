import { BackgroundGenerator } from '@/components/background-generator';
import { ProfileCard } from '@/components/profile-card';
import { ProjectShowcase } from '@/components/project-showcase';
import { SocialLinks } from '@/components/social-links';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <BackgroundGenerator />
      <header className="p-6">
        <h2 className="text-2xl font-headline text-foreground">Sasa Art</h2>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-6 space-y-12">
        <section className="flex flex-col items-center space-y-4 text-center">
          <ProfileCard />
          <SocialLinks />
        </section>

        <section className="w-full max-w-5xl">
          <ProjectShowcase />
        </section>
      </main>

      <footer className="w-full p-6 text-center">
        <Button asChild className="bg-primary/80 hover:bg-primary text-primary-foreground">
          <a href="mailto:sasa@example.com">
            <Mail className="mr-2 h-4 w-4" /> Contact Me
          </a>
        </Button>
      </footer>
    </div>
  );
}
