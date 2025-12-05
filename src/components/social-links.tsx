import { Button } from '@/components/ui/button';
import { Github, Linkedin, Twitter } from 'lucide-react';

export function SocialLinks() {
  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com',
    },
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://www.github.com',
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: 'https://www.twitter.com',
    },
  ];

  return (
    <div className="flex items-center justify-center gap-2">
      {socialLinks.map((link) => (
        <Button
          key={link.name}
          variant="ghost"
          size="icon"
          asChild
          className="text-muted-foreground transition-transform hover:scale-110 hover:text-foreground"
        >
          <a href={link.url} target="_blank" rel="noopener noreferrer">
            <link.icon className="h-5 w-5" />
            <span className="sr-only">{link.name}</span>
          </a>
        </Button>
      ))}
    </div>
  );
}
