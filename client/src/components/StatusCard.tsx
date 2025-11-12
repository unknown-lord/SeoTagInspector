import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

export type StatusType = "good" | "warning" | "missing";

interface StatusCardProps {
  title: string;
  value: string | null;
  status: StatusType;
  recommendation?: string;
  charCount?: number;
  maxChars?: number;
}

const statusConfig = {
  good: {
    icon: CheckCircle2,
    label: "Good",
    variant: "default" as const,
    className: "bg-green-500 text-white hover:bg-green-600",
  },
  warning: {
    icon: AlertTriangle,
    label: "Needs Review",
    variant: "secondary" as const,
    className: "bg-yellow-500 text-white hover:bg-yellow-600",
  },
  missing: {
    icon: XCircle,
    label: "Missing",
    variant: "destructive" as const,
    className: "bg-red-500 text-white hover:bg-red-600",
  },
};

export default function StatusCard({
  title,
  value,
  status,
  recommendation,
  charCount,
  maxChars,
}: StatusCardProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Card className="hover-elevate" data-testid={`card-status-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 pb-3">
        <div className="flex-1">
          <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            {title}
          </h3>
        </div>
        <Badge className={config.className} data-testid={`badge-status-${status}`}>
          <Icon className="h-3 w-3 mr-1" />
          {config.label}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        {value ? (
          <div className="space-y-2">
            <p className="text-base break-words" data-testid="text-tag-value">
              {value}
            </p>
            {charCount !== undefined && maxChars && (
              <p className="text-sm text-muted-foreground" data-testid="text-char-count">
                {charCount} / {maxChars} characters
                {charCount > maxChars && (
                  <span className="text-yellow-600 dark:text-yellow-500 ml-2">
                    (exceeds recommended length)
                  </span>
                )}
              </p>
            )}
          </div>
        ) : (
          <p className="text-base text-muted-foreground italic" data-testid="text-not-found">
            Not found
          </p>
        )}
        {recommendation && (
          <p className="text-sm text-muted-foreground border-l-2 border-muted pl-3">
            {recommendation}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
