import { Button } from '@/components/ui/button';
import { Instagram, Mail, Linkedin, Music } from 'lucide-react'; // Added Instagram, Mail, Music

export function SocialLinks() {
  const socialLinks = [
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://www.instagram.com/elfebrianti',
    },
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:artelunea@gmail.com',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/elsa-febrianti-564454199?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    },
    {
      name: 'SoundCloud',
      icon: Music, // Using Music icon as a placeholder for SoundCloud
      url: 'https://on.soundcloud.com/2i1SvqUroyYQh9kOVN',
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
          className="text-white transition-transform hover:scale-110"
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
