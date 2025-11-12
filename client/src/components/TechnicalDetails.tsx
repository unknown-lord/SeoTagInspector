import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface MetaTag {
  tag: string;
  html: string;
}

interface TechnicalDetailsProps {
  metaTags: MetaTag[];
}

export default function TechnicalDetails({ metaTags }: TechnicalDetailsProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <Accordion type="single" collapsible className="w-full" data-testid="accordion-technical-details">
      <AccordionItem value="technical-details">
        <AccordionTrigger className="text-base sm:text-lg font-semibold">
          Technical Details
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4 pt-2">
            {metaTags.map((tag, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wide truncate">
                    {tag.tag}
                  </h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(tag.html, index)}
                    data-testid={`button-copy-${index}`}
                    className="flex-shrink-0"
                  >
                    {copiedIndex === index ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <pre className="bg-muted p-2 sm:p-3 rounded-md overflow-x-auto text-xs sm:text-sm font-mono">
                  <code>{tag.html}</code>
                </pre>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
