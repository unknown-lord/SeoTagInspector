import { FileSearch } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4" data-testid="empty-state">
      <div className="bg-muted rounded-full p-6 mb-4">
        <FileSearch className="h-16 w-16 text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-semibold mb-2">Ready to Analyze</h2>
      <p className="text-muted-foreground text-center max-w-md">
        Enter a URL above to analyze SEO meta tags and receive detailed recommendations
        for optimizing your website's search presence.
      </p>
    </div>
  );
}
