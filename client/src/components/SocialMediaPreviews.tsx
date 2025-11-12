import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Facebook, Twitter, Image as ImageIcon } from "lucide-react";

interface SocialPreviewData {
  title: string;
  description: string;
  image?: string;
  url: string;
}

interface SocialMediaPreviewsProps {
  openGraph: SocialPreviewData;
  twitter: SocialPreviewData;
}

function FacebookPreview({ title, description, image }: SocialPreviewData) {
  return (
    <Card data-testid="card-facebook-preview">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Facebook className="h-5 w-5" />
          Facebook / Open Graph
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border border-border rounded-md overflow-hidden hover-elevate">
          {image ? (
            <div className="aspect-[1.91/1] bg-muted flex items-center justify-center">
              <img src={image} alt="" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="aspect-[1.91/1] bg-muted flex items-center justify-center">
              <ImageIcon className="h-12 w-12 text-muted-foreground" />
            </div>
          )}
          <div className="p-3 bg-card space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              example.com
            </p>
            <h4 className="text-base font-semibold line-clamp-1" data-testid="text-og-title">
              {title || "No title"}
            </h4>
            <p className="text-sm text-muted-foreground line-clamp-2" data-testid="text-og-description">
              {description || "No description"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TwitterPreview({ title, description, image }: SocialPreviewData) {
  return (
    <Card data-testid="card-twitter-preview">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Twitter className="h-5 w-5" />
          Twitter Card
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border border-border rounded-md overflow-hidden hover-elevate">
          {image ? (
            <div className="aspect-[2/1] bg-muted flex items-center justify-center">
              <img src={image} alt="" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="aspect-[2/1] bg-muted flex items-center justify-center">
              <ImageIcon className="h-12 w-12 text-muted-foreground" />
            </div>
          )}
          <div className="p-3 bg-card space-y-1">
            <p className="text-xs text-muted-foreground">
              example.com
            </p>
            <h4 className="text-base font-semibold line-clamp-1" data-testid="text-twitter-title">
              {title || "No title"}
            </h4>
            <p className="text-sm text-muted-foreground line-clamp-2" data-testid="text-twitter-description">
              {description || "No description"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function SocialMediaPreviews({ openGraph, twitter }: SocialMediaPreviewsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <FacebookPreview {...openGraph} />
      <TwitterPreview {...twitter} />
    </div>
  );
}
