import { useState } from "react";
import URLInput from "@/components/URLInput";
import StatusCard, { type StatusType } from "@/components/StatusCard";
import GooglePreview from "@/components/GooglePreview";
import SocialMediaPreviews from "@/components/SocialMediaPreviews";
import OverallScore from "@/components/OverallScore";
import RecommendationsPanel, { type Recommendation } from "@/components/RecommendationsPanel";
import TechnicalDetails from "@/components/TechnicalDetails";
import EmptyState from "@/components/EmptyState";

// TODO: remove mock functionality
interface SEOData {
  title: string | null;
  description: string | null;
  canonical: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
  twitterCard: string | null;
  twitterTitle: string | null;
  twitterDescription: string | null;
  twitterImage: string | null;
  robots: string | null;
  viewport: string | null;
}

// TODO: remove mock functionality
const mockSEOData: SEOData = {
  title: "Best SEO Practices for Modern Websites | SEO Guide 2025",
  description: "Learn comprehensive SEO strategies including meta tags, structured data, and optimization techniques to improve your website's search engine rankings and drive organic traffic.",
  canonical: "https://example.com/seo-guide",
  ogTitle: "Best SEO Practices for Modern Websites",
  ogDescription: "Learn comprehensive SEO strategies including meta tags, structured data, and optimization techniques.",
  ogImage: null,
  twitterCard: "summary_large_image",
  twitterTitle: "Best SEO Practices for Modern Websites",
  twitterDescription: "Learn comprehensive SEO strategies including meta tags, structured data, and optimization techniques.",
  twitterImage: null,
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
};

export default function Home() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzedUrl, setAnalyzedUrl] = useState<string | null>(null);
  const [seoData, setSeoData] = useState<SEOData | null>(null);

  const handleAnalyze = (url: string) => {
    setIsAnalyzing(true);
    setAnalyzedUrl(url);
    
    // TODO: remove mock functionality - replace with actual API call
    setTimeout(() => {
      setSeoData(mockSEOData);
      setIsAnalyzing(false);
    }, 1500);
  };

  // Calculate status and recommendations
  const getTagStatus = (value: string | null, minChars?: number, maxChars?: number): StatusType => {
    if (!value) return "missing";
    if (minChars && value.length < minChars) return "warning";
    if (maxChars && value.length > maxChars) return "warning";
    return "good";
  };

  const recommendations: Recommendation[] = [];
  let goodCount = 0;
  let warningCount = 0;
  let missingCount = 0;

  if (seoData) {
    // Title
    const titleStatus = getTagStatus(seoData.title, undefined, 60);
    if (titleStatus === "missing") {
      recommendations.push({
        type: "critical",
        message: "Missing title tag. Add a descriptive title under 60 characters."
      });
      missingCount++;
    } else if (titleStatus === "warning") {
      recommendations.push({
        type: "warning",
        message: `Title tag is ${seoData.title!.length} characters. Keep it under 60 characters for optimal display.`
      });
      warningCount++;
    } else {
      goodCount++;
    }

    // Description
    const descStatus = getTagStatus(seoData.description, 120, 155);
    if (descStatus === "missing") {
      recommendations.push({
        type: "critical",
        message: "Missing meta description. Add a description between 120-155 characters."
      });
      missingCount++;
    } else if (descStatus === "warning") {
      const len = seoData.description!.length;
      if (len < 120) {
        recommendations.push({
          type: "warning",
          message: `Meta description is too short (${len} characters). Aim for 120-155 characters.`
        });
      } else {
        recommendations.push({
          type: "warning",
          message: `Meta description is too long (${len} characters). Keep it under 155 characters.`
        });
      }
      warningCount++;
    } else {
      goodCount++;
    }

    // Canonical
    if (!seoData.canonical) {
      recommendations.push({
        type: "warning",
        message: "No canonical URL specified. This helps prevent duplicate content issues."
      });
      warningCount++;
    } else {
      goodCount++;
    }

    // Open Graph
    if (!seoData.ogTitle) {
      recommendations.push({
        type: "warning",
        message: "Missing Open Graph title. Add og:title for better social media sharing."
      });
      warningCount++;
    } else {
      goodCount++;
    }

    if (!seoData.ogDescription) {
      recommendations.push({
        type: "warning",
        message: "Missing Open Graph description. Add og:description for social previews."
      });
      warningCount++;
    } else {
      goodCount++;
    }

    if (!seoData.ogImage) {
      recommendations.push({
        type: "warning",
        message: "No Open Graph image specified. Add og:image to improve social media appearance."
      });
      warningCount++;
    } else {
      goodCount++;
    }

    // Twitter
    if (!seoData.twitterCard) {
      recommendations.push({
        type: "warning",
        message: "Missing Twitter card type. Add twitter:card for Twitter sharing."
      });
      warningCount++;
    } else {
      goodCount++;
    }

    if (!seoData.twitterTitle) {
      warningCount++;
    } else {
      goodCount++;
    }

    if (!seoData.twitterDescription) {
      warningCount++;
    } else {
      goodCount++;
    }

    if (!seoData.twitterImage) {
      warningCount++;
    } else {
      goodCount++;
    }

    // Robots
    if (!seoData.robots) {
      recommendations.push({
        type: "warning",
        message: "No robots meta tag found. Consider adding one to control search engine indexing."
      });
      warningCount++;
    } else {
      goodCount++;
    }

    // Viewport
    if (!seoData.viewport) {
      recommendations.push({
        type: "critical",
        message: "Missing viewport meta tag. This is essential for mobile responsiveness."
      });
      missingCount++;
    } else {
      goodCount++;
    }
  }

  const totalTags = 12;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b">
        <div className="max-w-7xl mx-auto px-4 py-6 md:px-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight">SEO Meta Tag Analyzer</h1>
            <p className="text-muted-foreground">
              Analyze and optimize your website's SEO tags
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 md:px-8">
        <div className="mb-12">
          <URLInput onAnalyze={handleAnalyze} isLoading={isAnalyzing} />
        </div>

        {!seoData && !isAnalyzing && <EmptyState />}

        {seoData && (
          <div className="space-y-12">
            <div className="max-w-2xl mx-auto">
              <OverallScore 
                score={goodCount} 
                total={totalTags} 
                warnings={warningCount}
                missing={missingCount}
              />
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-6">Meta Tags Status</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StatusCard
                  title="Title Tag"
                  value={seoData.title}
                  status={getTagStatus(seoData.title, undefined, 60)}
                  charCount={seoData.title?.length}
                  maxChars={60}
                  recommendation="Keep titles under 60 characters for optimal display in search results."
                />
                <StatusCard
                  title="Meta Description"
                  value={seoData.description}
                  status={getTagStatus(seoData.description, 120, 155)}
                  charCount={seoData.description?.length}
                  maxChars={155}
                  recommendation="Descriptions should be 120-155 characters for best click-through rates."
                />
                <StatusCard
                  title="Canonical URL"
                  value={seoData.canonical}
                  status={getTagStatus(seoData.canonical)}
                  recommendation="Prevents duplicate content issues by specifying the preferred URL."
                />
                <StatusCard
                  title="Robots Meta"
                  value={seoData.robots}
                  status={getTagStatus(seoData.robots)}
                  recommendation="Controls how search engines crawl and index your pages."
                />
                <StatusCard
                  title="Open Graph Title"
                  value={seoData.ogTitle}
                  status={getTagStatus(seoData.ogTitle)}
                  recommendation="Defines the title when shared on Facebook and other platforms."
                />
                <StatusCard
                  title="Open Graph Description"
                  value={seoData.ogDescription}
                  status={getTagStatus(seoData.ogDescription)}
                  recommendation="Description shown in social media previews."
                />
                <StatusCard
                  title="Open Graph Image"
                  value={seoData.ogImage}
                  status={getTagStatus(seoData.ogImage)}
                  recommendation="Image displayed when sharing on social media (1200x630px recommended)."
                />
                <StatusCard
                  title="Twitter Card"
                  value={seoData.twitterCard}
                  status={getTagStatus(seoData.twitterCard)}
                  recommendation="Specifies the card type for Twitter sharing (summary_large_image recommended)."
                />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-6">Search & Social Previews</h2>
              <div className="space-y-6">
                <GooglePreview
                  title={seoData.title || "Untitled"}
                  description={seoData.description || "No description"}
                  url={analyzedUrl || "https://example.com"}
                />
                <SocialMediaPreviews
                  openGraph={{
                    title: seoData.ogTitle || seoData.title || "Untitled",
                    description: seoData.ogDescription || seoData.description || "No description",
                    image: seoData.ogImage || undefined,
                    url: analyzedUrl || "https://example.com",
                  }}
                  twitter={{
                    title: seoData.twitterTitle || seoData.title || "Untitled",
                    description: seoData.twitterDescription || seoData.description || "No description",
                    image: seoData.twitterImage || undefined,
                    url: analyzedUrl || "https://example.com",
                  }}
                />
              </div>
            </div>

            <RecommendationsPanel recommendations={recommendations} />

            <TechnicalDetails
              metaTags={[
                { tag: "Title", html: seoData.title ? `<title>${seoData.title}</title>` : "Not found" },
                { tag: "Meta Description", html: seoData.description ? `<meta name="description" content="${seoData.description}" />` : "Not found" },
                { tag: "Canonical", html: seoData.canonical ? `<link rel="canonical" href="${seoData.canonical}" />` : "Not found" },
                { tag: "Robots", html: seoData.robots ? `<meta name="robots" content="${seoData.robots}" />` : "Not found" },
                { tag: "Viewport", html: seoData.viewport ? `<meta name="viewport" content="${seoData.viewport}" />` : "Not found" },
                { tag: "OG Title", html: seoData.ogTitle ? `<meta property="og:title" content="${seoData.ogTitle}" />` : "Not found" },
                { tag: "OG Description", html: seoData.ogDescription ? `<meta property="og:description" content="${seoData.ogDescription}" />` : "Not found" },
                { tag: "Twitter Card", html: seoData.twitterCard ? `<meta name="twitter:card" content="${seoData.twitterCard}" />` : "Not found" },
              ]}
            />
          </div>
        )}
      </main>
    </div>
  );
}
