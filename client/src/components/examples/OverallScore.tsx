import OverallScore from '../OverallScore';

export default function OverallScoreExample() {
  return (
    <div className="max-w-md mx-auto">
      <OverallScore score={12} total={15} warnings={2} missing={1} />
    </div>
  );
}
