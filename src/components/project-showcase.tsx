import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

const projects = {
  art: [
    { title: 'Oil Painting Series', imageId: 'project-art-1' },
    { title: 'Digital Illustrations', imageId: 'project-art-2' },
  ],
  music: [
    { title: 'Debut Album "Echoes"', imageId: 'project-music-1' },
    { title: 'Orchestral Piece', imageId: 'project-music-2' },
  ],
  literature: [
    { title: 'Short Story Collection', imageId: 'project-lit-1' },
    { title: 'Poetry Anthology', imageId: 'project-lit-2' },
  ],
};

function ProjectCard({ title, imageId }: { title: string; imageId: string }) {
  const image = PlaceHolderImages.find((img) => img.id === imageId);
  return (
    <Card className="overflow-hidden transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
      <CardHeader>
        <CardTitle className="font-headline text-xl tracking-wide">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {image && (
          <Image
            src={image.imageUrl}
            alt={image.description}
            data-ai-hint={image.imageHint}
            width={400}
            height={300}
            className="aspect-[4/3] rounded-md object-cover"
          />
        )}
      </CardContent>
    </Card>
  );
}

export function ProjectShowcase() {
  return (
    <Tabs defaultValue="art" className="w-full max-w-5xl">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="art">Art</TabsTrigger>
        <TabsTrigger value="music">Music</TabsTrigger>
        <TabsTrigger value="literature">Literature</TabsTrigger>
      </TabsList>
      <TabsContent value="art" className="mt-6">
        <div className="grid gap-6 md:grid-cols-2">
          {projects.art.map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="music" className="mt-6">
        <div className="grid gap-6 md:grid-cols-2">
          {projects.music.map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="literature" className="mt-6">
        <div className="grid gap-6 md:grid-cols-2">
          {projects.literature.map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
