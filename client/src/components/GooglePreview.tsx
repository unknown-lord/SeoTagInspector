import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

interface GooglePreviewProps {
  title: string;
  description: string;
  url: string;
}

export default function GooglePreview({ title, description, url }: GooglePreviewProps) {
  const displayUrl = url.replace(/^https?:\/\//, '').replace(/\/$/, '');
  const domain = displayUrl.split('/')[0];
  const path = displayUrl.substring(domain.length);

  return (
    <Card data-testid="card-google-preview">
      <CardHeader>
        <CardTitle className="text-base sm:text-lg flex items-center gap-2">
          Google Search Preview
          <ExternalLink className="h-4 w-4 text-muted-foreground" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1 p-3 sm:p-4 bg-muted/30 rounded-md">
          <div className="text-xs sm:text-sm text-muted-foreground flex items-baseline gap-1 flex-wrap">
            <span className="font-medium break-all">{domain}</span>
            {path && <span className="text-xs break-all">{path}</span>}
          </div>
          <h3 className="text-lg sm:text-xl text-primary font-normal hover:underline cursor-pointer break-words" data-testid="text-preview-title">
            {title || "Untitled Page"}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed" data-testid="text-preview-description">
            {description || "No description available"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
