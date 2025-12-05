import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function ProfileCard() {
  const profileImage = PlaceHolderImages.find(
    (img) => img.id === 'profile-picture'
  );

  return (
    <div className="flex flex-col items-center space-y-4">
      <Avatar className="h-32 w-32 border-4 border-card shadow-md">
        {profileImage && (
            <AvatarImage
                src={profileImage.imageUrl}
                alt={profileImage.description}
                data-ai-hint={profileImage.imageHint}
            />
        )}
        <AvatarFallback>SA</AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <h1 className="text-4xl font-headline text-foreground">Sasa</h1>
        <p className="text-lg text-muted-foreground">Artist, Musician, Writer</p>
      </div>
    </div>
  );
}
