"use client";

import { useState } from 'react';
import { Lightbulb, Loader2 } from 'lucide-react';
import { suggestContentUpdates, type SuggestContentUpdatesOutput } from '@/ai/flows/suggest-content-updates';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type ContentSuggesterProps = {
  content: string;
};

export default function ContentSuggester({ content }: ContentSuggesterProps) {
  const [suggestions, setSuggestions] = useState<SuggestContentUpdatesOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSuggest = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await suggestContentUpdates({ blogContent: content });
      setSuggestions(result);
    } catch (e) {
      setError('An error occurred while generating suggestions. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Lightbulb className="h-8 w-8 text-accent" />
          <div>
            <CardTitle className="font-headline text-2xl">AI Content Assistant</CardTitle>
            <CardDescription>Get AI-powered suggestions to improve your blog post.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {!suggestions && (
          <div className="text-center">
            <p className="mb-4">Click the button below to analyze the article and get ideas for updates, new topics, and better headlines.</p>
            <Button onClick={handleSuggest} disabled={isLoading} size="lg">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Get Suggestions'
              )}
            </Button>
          </div>
        )}

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {suggestions && (
          <div className="mt-4">
            <h3 className="text-xl font-bold mb-4 text-center font-headline">Suggestions Generated!</h3>
            <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-semibold">Suggested Content Updates</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-5 space-y-2">
                    {suggestions.suggestedUpdates.map((update, index) => (
                      <li key={index}>{update}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-semibold">Additional Topic Ideas</AccordionTrigger>
                <AccordionContent>
                   <ul className="list-disc pl-5 space-y-2">
                    {suggestions.additionalTopics.map((topic, index) => (
                      <li key={index}>{topic}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-semibold">Rewritten Headlines</AccordionTrigger>
                <AccordionContent>
                   <ul className="list-disc pl-5 space-y-2">
                    {suggestions.rewrittenHeadlines.map((headline, index) => (
                      <li key={index}>{headline}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="text-center mt-6">
                 <Button onClick={handleSuggest} disabled={isLoading} variant="outline">
                    {isLoading ? (
                        <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Regenerating...
                        </>
                    ) : (
                        'Regenerate Suggestions'
                    )}
                </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
