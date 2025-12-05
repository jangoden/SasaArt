'use server';

import { generateBackgroundArt } from '@/ai/flows/generate-background-art';

export async function generateArtAction() {
  try {
    // These colors are from the UI style guide
    const result = await generateBackgroundArt({
      primaryColor: '#F2B8C3', // A soft pink
      backgroundColor: '#F9E7EA', // A very light pink
      accentColor: '#F2E3B8', // A light yellow
    });
    return { artDataUri: result.artDataUri };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to generate background art.' };
  }
}
