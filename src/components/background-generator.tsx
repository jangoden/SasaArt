'use client';

import { startTransition, useEffect, useState } from 'react';

import { generateArtAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { LoaderCircle, Paintbrush } from 'lucide-react';
import { Button } from './ui/button';

export function BackgroundGenerator() {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    setIsLoading(true);
    startTransition(async () => {
      const result = await generateArtAction();
      if (result.error) {
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive',
        });
      } else if (result.artDataUri) {
        setBackgroundImage(result.artDataUri);
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    handleGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {backgroundImage && (
        <div
          className="fixed inset-0 -z-10 h-full w-full bg-cover bg-center transition-opacity duration-1000"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={handleGenerate}
          disabled={isLoading}
          size="lg"
          className="rounded-full shadow-lg"
        >
          {isLoading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <Paintbrush />
          )}
          <span className="ml-2 hidden md:inline">
            {isLoading ? 'Generating...' : 'Regenerate Art'}
          </span>
        </Button>
      </div>
    </>
  );
}
