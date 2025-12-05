'use server';

/**
 * @fileOverview Generates abstract background art based on a color palette.
 *
 * - generateBackgroundArt - A function that generates the background art.
 * - GenerateBackgroundArtInput - The input type for the generateBackgroundArt function.
 * - GenerateBackgroundArtOutput - The return type for the generateBackgroundArt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBackgroundArtInputSchema = z.object({
  primaryColor: z
    .string()
    .describe('The primary color for the background art (e.g., #F2B8C3).'),
  backgroundColor: z
    .string()
    .describe('The background color for the background art (e.g., #F9E7EA).'),
  accentColor: z
    .string()
    .describe('The accent color for the background art (e.g., #F2E3B8).'),
});
export type GenerateBackgroundArtInput = z.infer<
  typeof GenerateBackgroundArtInputSchema
>;

const GenerateBackgroundArtOutputSchema = z.object({
  artDataUri: z
    .string()
    .describe(
      'The generated abstract background art as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' as string
    ),
});
export type GenerateBackgroundArtOutput = z.infer<
  typeof GenerateBackgroundArtOutputSchema
>;

export async function generateBackgroundArt(
  input: GenerateBackgroundArtInput
): Promise<GenerateBackgroundArtOutput> {
  return generateBackgroundArtFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBackgroundArtPrompt',
  input: {schema: GenerateBackgroundArtInputSchema},
  output: {schema: GenerateBackgroundArtOutputSchema},
  prompt: `Generate abstract background art using the following color palette:

Primary Color: {{{primaryColor}}}
Background Color: {{{backgroundColor}}}
Accent Color: {{{accentColor}}}

The art should be abstract and suitable for use as a website background. Return the image as a data URI.

Ensure the image is visually appealing and reflects the provided color scheme.`,
});

const generateBackgroundArtFlow = ai.defineFlow(
  {
    name: 'generateBackgroundArtFlow',
    inputSchema: GenerateBackgroundArtInputSchema,
    outputSchema: GenerateBackgroundArtOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      prompt: `Generate abstract background art using the following color palette:\n\nPrimary Color: ${input.primaryColor}\nBackground Color: ${input.backgroundColor}\nAccent Color: ${input.accentColor}\n\nThe art should be abstract and suitable for use as a website background.`,
      model: 'googleai/imagen-4.0-fast-generate-001',
    });

    return {
      artDataUri: media.url,
    };
  }
);
