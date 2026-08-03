'use client';

import { Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { RepositoryHealth } from '@/lib/types';

interface Props {
  health: RepositoryHealth;
}

function getColor(score: number): string {
  if (score >= 85) return 'oklch(0.7 0.18 150)';
  if (score >= 70) return 'oklch(0.75 0.17 165)';
  if (score >= 50) return 'oklch(0.8 0.18 90)';
  return 'oklch(0.7 0.2 25)';
}

function getStatusDot(status: string): string {
  switch (status) {
    case 'excellent':
    case 'good':
      return 'bg-green-500';
    case 'fair':
      return 'bg-yellow-500';
    case 'poor':
    case 'critical':
      return 'bg-red-500';
    default:
      return 'bg-muted-foreground';
  }
}

export default function HealthMetricsChart({ health }: Props) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <Activity className="h-4 w-4 text-muted-foreground" />
          Repository Health
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="max-h-96 overflow-y-auto space-y-3 pr-1 scrollbar-thin">
          {health.metrics.map((metric) => {
            const normalizedScore =
              metric.maxScore > 0
                ? Math.round((metric.score / metric.maxScore) * 100)
                : 0;

            return (
              <div key={metric.name} className="group">
                <div className="flex items-center gap-3">
                  <div className="flex w-36 shrink-0 items-center gap-1.5">
                    <span
                      className={`inline-block h-1.5 w-1.5 rounded-full shrink-0 ${getStatusDot(metric.status)}`}
                    />
                    <span className="truncate text-xs text-muted-foreground">
                      {metric.name}
                    </span>
                  </div>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${normalizedScore}%`,
                        backgroundColor: getColor(normalizedScore),
                      }}
                    />
                  </div>
                  <span className="text-xs tabular-nums w-8 text-right">
                    {normalizedScore}
                  </span>
                </div>
                {metric.description && (
                  <p className="mt-0.5 text-[10px] text-muted-foreground/70 pl-[5.5rem] truncate">
                    {metric.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
