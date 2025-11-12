import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, AlertTriangle } from "lucide-react";

export interface Recommendation {
  type: "critical" | "warning" | "success";
  message: string;
}

interface RecommendationsPanelProps {
  recommendations: Recommendation[];
}

const typeConfig = {
  critical: {
    icon: AlertCircle,
    borderColor: "border-l-red-500",
    iconColor: "text-red-600 dark:text-red-500",
    label: "Critical",
  },
  warning: {
    icon: AlertTriangle,
    borderColor: "border-l-yellow-500",
    iconColor: "text-yellow-600 dark:text-yellow-500",
    label: "Warning",
  },
  success: {
    icon: CheckCircle2,
    borderColor: "border-l-green-500",
    iconColor: "text-green-600 dark:text-green-500",
    label: "Good",
  },
};

export default function RecommendationsPanel({ recommendations }: RecommendationsPanelProps) {
  const criticalItems = recommendations.filter((r) => r.type === "critical");
  const warningItems = recommendations.filter((r) => r.type === "warning");
  const successItems = recommendations.filter((r) => r.type === "success");

  const sortedRecommendations = [...criticalItems, ...warningItems, ...successItems];

  return (
    <Card data-testid="card-recommendations">
      <CardHeader>
        <CardTitle className="text-xl">Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {sortedRecommendations.map((rec, index) => {
            const config = typeConfig[rec.type];
            const Icon = config.icon;
            
            return (
              <div
                key={index}
                className={`border-l-4 ${config.borderColor} pl-4 py-2`}
                data-testid={`recommendation-${rec.type}-${index}`}
              >
                <div className="flex gap-3">
                  <Icon className={`h-5 w-5 ${config.iconColor} flex-shrink-0 mt-0.5`} />
                  <p className="text-sm">{rec.message}</p>
                </div>
              </div>
            );
          })}
          {sortedRecommendations.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              No recommendations at this time. Great job!
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
