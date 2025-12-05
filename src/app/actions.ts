'use server';

import { generateBackgroundArt } from '@/ai/flows/generate-background-art';

export async function generateArtAction() {
  try {
    // These colors are from the UI style guide
    const result = await generateBackgroundArt({
      primaryColor: '#93c5fd', // blue-300
      backgroundColor: '#dbeafe', // blue-100
      accentColor: '#bfdbfe', // blue-200
    });
    return { artDataUri: result.artDataUri };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to generate background art.' };
  }
}
