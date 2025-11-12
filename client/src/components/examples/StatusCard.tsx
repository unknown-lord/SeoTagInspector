import StatusCard from '../StatusCard';

export default function StatusCardExample() {
  return (
    <div className="space-y-4 max-w-2xl">
      <StatusCard
        title="Title Tag"
        value="Best SEO Practices for Modern Websites | SEO Guide 2025"
        status="good"
        charCount={58}
        maxChars={60}
        recommendation="Keep titles under 60 characters for optimal display in search results."
      />
      <StatusCard
        title="Meta Description"
        value="Learn comprehensive SEO strategies"
        status="warning"
        charCount={42}
        maxChars={155}
        recommendation="Descriptions should be 120-155 characters for best results."
      />
      <StatusCard
        title="Canonical URL"
        value={null}
        status="missing"
        recommendation="Add a canonical URL to prevent duplicate content issues."
      />
    </div>
  );
}
