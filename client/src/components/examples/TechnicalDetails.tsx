import TechnicalDetails from '../TechnicalDetails';

export default function TechnicalDetailsExample() {
  const metaTags = [
    {
      tag: "Title",
      html: '<title>Best SEO Practices for Modern Websites | SEO Guide 2025</title>'
    },
    {
      tag: "Meta Description",
      html: '<meta name="description" content="Learn comprehensive SEO strategies including meta tags, structured data, and optimization techniques to improve your website\'s search engine rankings." />'
    },
    {
      tag: "Open Graph Title",
      html: '<meta property="og:title" content="Best SEO Practices for Modern Websites" />'
    },
    {
      tag: "Twitter Card",
      html: '<meta name="twitter:card" content="summary_large_image" />'
    }
  ];

  return (
    <div className="max-w-3xl">
      <TechnicalDetails metaTags={metaTags} />
    </div>
  );
}
