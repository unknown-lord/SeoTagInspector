import SocialMediaPreviews from '../SocialMediaPreviews';

export default function SocialMediaPreviewsExample() {
  return (
    <SocialMediaPreviews
      openGraph={{
        title: "Best SEO Practices for Modern Websites",
        description: "Learn comprehensive SEO strategies including meta tags, structured data, and optimization techniques.",
        url: "https://example.com/seo-guide"
      }}
      twitter={{
        title: "Best SEO Practices for Modern Websites",
        description: "Learn comprehensive SEO strategies including meta tags, structured data, and optimization techniques.",
        url: "https://example.com/seo-guide"
      }}
    />
  );
}
