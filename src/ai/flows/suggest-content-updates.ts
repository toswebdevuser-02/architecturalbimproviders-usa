'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting content updates,
 * additional topics, and rewritten headlines for a blog post.
 *
 * - suggestContentUpdates - An async function that accepts blog content as input and returns suggestions for updates.
 * - SuggestContentUpdatesInput - The input type for the suggestContentUpdates function.
 * - SuggestContentUpdatesOutput - The output type for the suggestContentUpdates function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestContentUpdatesInputSchema = z.object({
  blogContent: z.string().describe('The content of the blog post to analyze.'),
});
export type SuggestContentUpdatesInput = z.infer<typeof SuggestContentUpdatesInputSchema>;

const SuggestContentUpdatesOutputSchema = z.object({
  suggestedUpdates: z.array(z.string()).describe('Suggestions for updating the existing content.'),
  additionalTopics: z.array(z.string()).describe('Suggestions for additional topics to cover.'),
  rewrittenHeadlines: z.array(z.string()).describe('Suggestions for rewriting the headlines.'),
});
export type SuggestContentUpdatesOutput = z.infer<typeof SuggestContentUpdatesOutputSchema>;

export async function suggestContentUpdates(input: SuggestContentUpdatesInput): Promise<SuggestContentUpdatesOutput> {
  return suggestContentUpdatesFlow(input);
}

const suggestContentUpdatesPrompt = ai.definePrompt({
  name: 'suggestContentUpdatesPrompt',
  input: {schema: SuggestContentUpdatesInputSchema},
  output: {schema: SuggestContentUpdatesOutputSchema},
  prompt: `You are an AI assistant specialized in content improvement for blog posts.

  Given the following blog post content, provide suggestions for:
  - Updating the existing content to make it more engaging and informative.
  - Additional topics that could be covered to expand on the existing content.
  - Rewritten headlines to make them more attention-grabbing.

  Blog Post Content:
  {{blogContent}}
  `,
});

const suggestContentUpdatesFlow = ai.defineFlow(
  {
    name: 'suggestContentUpdatesFlow',
    inputSchema: SuggestContentUpdatesInputSchema,
    outputSchema: SuggestContentUpdatesOutputSchema,
  },
  async input => {
    const {output} = await suggestContentUpdatesPrompt(input);
    return output!;
  }
);
