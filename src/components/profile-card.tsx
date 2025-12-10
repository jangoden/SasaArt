import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function ProfileCard() {
  return (
    <div className="flex flex-col items-center space-y-3 text-center">
      <Avatar className="h-24 w-24 border-4 border-white/10 shadow-md">
        <AvatarImage
            src="/images/foto-profil.webp"
            alt="Profile Picture"
            className="object-cover"
        />
        <AvatarFallback>SA</AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <h1 className="text-3xl font-headline text-white font-bold">Lunea Arte</h1>
        <p className="text-base text-white/80">Artist, Musician, Writer</p>
      </div>
    </div>
  );
}
