"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const ReactSoundcloud = dynamic(() => import('react-soundcloud-embed'), {
  ssr: false,
});

// New nested data structure
const projects = {
  art: {
    'Fine Art': {
      'Canvas': [
        { title: 'Abstrak', imageUrl: '/images/art/Fine%20Art/Canvas/Abstrak.webp' },
        { title: 'Flower', imageUrl: '/images/art/Fine%20Art/Canvas/Flower.webp' },
        { title: 'Pink Color', imageUrl: '/images/art/Fine%20Art/Canvas/Pink%20Color.webp' },
      ],
      'Bag': [
        { title: 'Bag 1', imageUrl: '/images/art/Fine%20Art/Bag/1.webp' },
        { title: 'Bag 2', imageUrl: '/images/art/Fine%20Art/Bag/2.webp' },
        { title: 'Bag 3', imageUrl: '/images/art/Fine%20Art/Bag/3.webp' },
      ],
    },
    'Architecture': {
      'Design Building': [{ title: 'Modern Villa', imageId: 'project-arch-1' }],
      'Competition': [{ title: 'City Tower Concept', imageId: 'project-arch-2' }],
      'Student Exchange': [{ title: 'Campus Pavilion', imageId: 'project-arch-3' }],
    }
  },
  music: {
    'Perform': [{ title: 'Live at The Fillmore', imageId: 'project-music-1' }],
    'Lyrics': [{ title: 'Handwritten Lyrics', imageId: 'project-music-lyrics-1' }],
    'Playlist': [
      { 
        title: 'Lekas Pulih', 
        soundcloudUrl: 'https://soundcloud.com/lunea-arte/lekas-pulih-lunea-arte?si=cf620af30dee4d43a3e52ec66786b22d&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing' 
      },
      {
        title: 'Cantik (Khitna Cover)',
        soundcloudUrl: 'https://soundcloud.com/lunea-arte/cantik-khitna-cover?si=c15450dad36540cf883db629332c7e55&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing'
      },
      {
        title: 'If U Could See Me Cryin\' In My Room (Cover)',
        soundcloudUrl: 'https://soundcloud.com/lunea-arte/if-u-could-see-me-cryin-in-my-room-cover?si=3e84dc3110fd41e8a0f6b0fe86afe743&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing'
      },
      {
        title: 'Papa Mengapa Kau Berubah',
        soundcloudUrl: 'https://soundcloud.com/lunea-arte/papa-mengapa-kau-berubah-lunea-arte?si=176c8e2d5c144824bd6de777add45fd7&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing'
      }
    ],
  },
  literature: {
    'Poem': [{ title: 'Whispers of Dawn', imageId: 'project-lit-1' }],
    'Life Story': [{ title: 'Autobiographical Excerpt', imageId: 'project-lit-2' }],
    'Fictitious': [{ title: 'The Last City', imageId: 'project-lit-fict-1' }],
  },
};

function ProjectCard({ title, imageUrl, imageId, soundcloudUrl }: { title: string; imageUrl?: string; imageId?: string; soundcloudUrl?: string }) {
  const finalImageUrl = imageUrl || (imageId && PlaceHolderImages.find((img) => img.id === imageId)?.imageUrl);
  const altText = title;

  return (
    <Card className="p-1 bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-500 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
      <div className="bg-card rounded-md overflow-hidden h-full">
        <CardHeader>
          <CardTitle className="font-headline text-xl tracking-wide">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {soundcloudUrl ? (
            <ReactSoundcloud url={soundcloudUrl} width="100%" height="250px" />
          ) : finalImageUrl && (
            <Image
              src={finalImageUrl}
              alt={altText}
              width={0}
              height={0}
              sizes="100vw"
              className="rounded-md object-contain w-full h-auto"
            />
          )}
        </CardContent>
      </div>
    </Card>
  );
}

// Helper to render a grid of projects
function ProjectGrid({ projects }: { projects: { title: string; imageUrl?: string; imageId?: string; soundcloudUrl?: string }[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {projects.map((p, index) => (
        <ProjectCard key={`${p.title}-${p.imageUrl || p.imageId || p.soundcloudUrl}-${index}`} {...p} />
      ))}
    </div>
  );
}

export function ProjectShowcase() {
  const artSubCategories = Object.keys(projects.art);
  const musicSubCategories = Object.keys(projects.music);
  const literatureSubCategories = Object.keys(projects.literature);

  return (
    <Tabs defaultValue="art" className="w-full max-w-5xl">
      <div className="flex justify-center">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="art">Art</TabsTrigger>
          <TabsTrigger value="music">Music</TabsTrigger>
          <TabsTrigger value="literature">Literature</TabsTrigger>
        </TabsList>
      </div>

      {/* Art Tab Content */}
      <TabsContent value="art" className="mt-6">
        <Tabs defaultValue={artSubCategories[0]} className="w-full">
          <div className="flex justify-center">
            <TabsList>
              {artSubCategories.map(cat => <TabsTrigger key={cat} value={cat}>{cat}</TabsTrigger>)}
            </TabsList>
          </div>
          {artSubCategories.map(cat => (
            <TabsContent key={cat} value={cat} className="mt-4">
              <Tabs defaultValue={Object.keys(projects.art[cat])[0]} className="w-full">
                <div className="flex justify-center">
                    <TabsList>
                    {Object.keys(projects.art[cat]).map(subCat => <TabsTrigger key={subCat} value={subCat}>{subCat}</TabsTrigger>)}
                    </TabsList>
                </div>
                {Object.keys(projects.art[cat]).map(subCat => (
                    <TabsContent key={subCat} value={subCat} className="mt-4">
                        <ProjectGrid projects={projects.art[cat][subCat]} />
                    </TabsContent>
                ))}
              </Tabs>
            </TabsContent>
          ))}
        </Tabs>
      </TabsContent>

      {/* Music Tab Content */}
      <TabsContent value="music" className="mt-6">
        <Tabs defaultValue={musicSubCategories[0]} className="w-full">
          <div className="flex justify-center">
            <TabsList>
              {musicSubCategories.map(cat => <TabsTrigger key={cat} value={cat}>{cat}</TabsTrigger>)}
            </TabsList>
          </div>
          {musicSubCategories.map(cat => (
            <TabsContent key={cat} value={cat} className="mt-4">
              <ProjectGrid projects={projects.music[cat]} />
            </TabsContent>
          ))}
        </Tabs>
      </TabsContent>

      {/* Literature Tab Content */}
      <TabsContent value="literature" className="mt-6">
        <Tabs defaultValue={literatureSubCategories[0]} className="w-full">
          <div className="flex justify-center">
            <TabsList>
              {literatureSubCategories.map(cat => <TabsTrigger key={cat} value={cat}>{cat}</TabsTrigger>)}
            </TabsList>
          </div>
          {literatureSubCategories.map(cat => (
            <TabsContent key={cat} value={cat} className="mt-4">
              <ProjectGrid projects={projects.literature[cat]} />
            </TabsContent>
          ))}
        </Tabs>
      </TabsContent>
    </Tabs>
  );
}
