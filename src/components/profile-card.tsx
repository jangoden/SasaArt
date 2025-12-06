import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function ProfileCard() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <Avatar className="h-32 w-32 border-4 border-card shadow-md">
        <AvatarImage
            src="/images/foto-profil.webp"
            alt="Profile Picture"
            className="object-cover"
        />
        <AvatarFallback>SA</AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <h1 className="text-4xl font-headline text-white font-bold">Lunea Arte</h1>
        <p className="text-lg text-white">Artist, Musician, Writer</p>
      </div>
    </div>
  );
}
