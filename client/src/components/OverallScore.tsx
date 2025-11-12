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
  if (percentage >= 90) {
    grade = "A";
    gradeColor = "text-green-600 dark:text-green-500";
  } else if (percentage >= 75) {
    grade = "B";
    gradeColor = "text-blue-600 dark:text-blue-500";
  } else if (percentage >= 60) {
    grade = "C";
    gradeColor = "text-yellow-600 dark:text-yellow-500";
  } else {
    grade = "D";
    gradeColor = "text-red-600 dark:text-red-500";
  }

  return (
    <Card className="border-2" data-testid="card-overall-score">
      <CardContent className="pt-6">
        <div className="text-center space-y-4">
          <div>
            <div className={`text-6xl font-bold ${gradeColor}`} data-testid="text-grade">
              {grade}
            </div>
            <div className="text-2xl text-muted-foreground mt-2">
              {percentage}% SEO Score
            </div>
          </div>
          
          <div className="flex justify-center gap-6 pt-4 border-t">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500" />
              <span className="text-sm">
                <span className="font-semibold">{score - warnings - missing}</span> Good
              </span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-500" />
              <span className="text-sm">
                <span className="font-semibold">{warnings}</span> Warnings
              </span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-600 dark:text-red-500" />
              <span className="text-sm">
                <span className="font-semibold">{missing}</span> Missing
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
