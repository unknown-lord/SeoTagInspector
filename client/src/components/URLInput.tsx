import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";

interface URLInputProps {
  onAnalyze: (url: string) => void;
  isLoading?: boolean;
}

export default function URLInput({ onAnalyze, isLoading = false }: URLInputProps) {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onAnalyze(url.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="pl-10"
            disabled={isLoading}
            data-testid="input-url"
          />
        </div>
        <Button 
          type="submit" 
          disabled={!url.trim() || isLoading}
          className="min-w-[120px] w-full sm:w-auto"
          data-testid="button-analyze"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing
            </>
          ) : (
            "Analyze"
          )}
        </Button>
      </div>
    </form>
  );
}
