import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { RepositoryHealth } from '@/lib/types';
import { cn } from '@/lib/utils';

function statusColor(status: string): string {
  switch (status) {
    case 'excellent': return 'oklch(0.7 0.18 150)';
    case 'good': return 'oklch(0.8 0.18 90)';
    case 'fair': return 'oklch(0.85 0.18 70)';
    case 'poor': return 'oklch(0.7 0.2 25)';
    default: return 'oklch(0.7 0.2 25)';
  }
}

type HealthMetricsChartProps = {
  health: RepositoryHealth;
};

export default function HealthMetricsChart({ health }: HealthMetricsChartProps) {
  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Health Metrics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {health.metrics.map((metric) => {
          const pct = (metric.score / metric.maxScore) * 100;
          const color = statusColor(metric.status);
          return (
            <div key={metric.name}>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <span>{metric.name}</span>
                </div>
                <span className="font-semibold tabular-nums">{metric.score}/{metric.maxScore}</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className={cn('h-full rounded-full transition-all duration-700')}
                  style={{ width: `${pct}%`, backgroundColor: color }}
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
