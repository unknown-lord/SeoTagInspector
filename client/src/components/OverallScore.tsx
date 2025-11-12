import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

interface OverallScoreProps {
  score: number;
  total: number;
  warnings: number;
  missing: number;
}

export default function OverallScore({ score, total, warnings, missing }: OverallScoreProps) {
  const percentage = Math.round((score / total) * 100);
  
  let grade: string;
  let gradeColor: string;
  let strokeColor: string;
  
  if (percentage >= 90) {
    grade = "A";
    gradeColor = "text-green-600 dark:text-green-500";
    strokeColor = "#10b981";
  } else if (percentage >= 75) {
    grade = "B";
    gradeColor = "text-blue-600 dark:text-blue-500";
    strokeColor = "#3b82f6";
  } else if (percentage >= 60) {
    grade = "C";
    gradeColor = "text-yellow-600 dark:text-yellow-500";
    strokeColor = "#f59e0b";
  } else {
    grade = "D";
    gradeColor = "text-red-600 dark:text-red-500";
    strokeColor = "#ef4444";
  }

  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <Card className="border-2" data-testid="card-overall-score">
      <CardContent className="pt-6 sm:pt-8 pb-6">
        <div className="text-center space-y-4 sm:space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <svg className="transform -rotate-90 w-[140px] h-[140px] sm:w-[180px] sm:h-[180px]" viewBox="0 0 180 180">
                <circle
                  cx="90"
                  cy="90"
                  r="70"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  className="text-muted/30"
                />
                <circle
                  cx="90"
                  cy="90"
                  r="70"
                  stroke={strokeColor}
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className={`text-4xl sm:text-5xl font-bold ${gradeColor}`} data-testid="text-grade">
                  {grade}
                </div>
                <div className="text-base sm:text-lg text-muted-foreground mt-1">
                  {percentage}%
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-1">SEO Score</h3>
            <p className="text-sm text-muted-foreground">
              {score} out of {total} tags optimized
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 pt-4 border-t">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 dark:text-green-500" />
              <span className="text-xs sm:text-sm">
                <span className="font-semibold">{score - warnings - missing}</span> Good
              </span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600 dark:text-yellow-500" />
              <span className="text-xs sm:text-sm">
                <span className="font-semibold">{warnings}</span> Warnings
              </span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 dark:text-red-500" />
              <span className="text-xs sm:text-sm">
                <span className="font-semibold">{missing}</span> Missing
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
