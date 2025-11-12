import RecommendationsPanel from '../RecommendationsPanel';

export default function RecommendationsPanelExample() {
  const recommendations = [
    {
      type: "critical" as const,
      message: "Missing meta description. Add a description between 120-155 characters to improve click-through rates."
    },
    {
      type: "warning" as const,
      message: "Title tag is too long (68 characters). Keep it under 60 characters for optimal display in search results."
    },
    {
      type: "warning" as const,
      message: "No Open Graph image specified. Add og:image to improve social media sharing appearance."
    },
    {
      type: "success" as const,
      message: "Canonical URL is properly set, preventing duplicate content issues."
    }
  ];

  return (
    <div className="max-w-3xl">
      <RecommendationsPanel recommendations={recommendations} />
    </div>
  );
}
