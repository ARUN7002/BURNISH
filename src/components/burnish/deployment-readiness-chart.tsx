import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { DeploymentReadiness } from '@/lib/types';
import { cn } from '@/lib/utils';

function getScoreColor(score: number): string {
  if (score >= 85) return 'oklch(0.7 0.18 150)';
  if (score >= 70) return 'oklch(0.8 0.18 90)';
  if (score >= 50) return 'oklch(0.85 0.18 70)';
  return 'oklch(0.7 0.2 25)';
}

function getGradeBadgeColor(grade: string): string {
  if (grade === 'A' || grade === 'A+') return 'bg-green-500/15 text-green-400 border-green-500/30';
  if (grade === 'B') return 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30';
  if (grade === 'C') return 'bg-orange-500/15 text-orange-400 border-orange-500/30';
  return 'bg-red-500/15 text-red-400 border-red-500/30';
}

type MetricCircleProps = {
  label: string;
  score: number;
};

function MetricCircle({ label, score }: MetricCircleProps) {
  const color = getScoreColor(score);
  const circumference = 2 * Math.PI * 36;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-20 w-20">
        <svg width={80} height={80} className="-rotate-90">
          <circle
            cx="40" cy="40" r="36"
            fill="none"
            stroke="oklch(1 0 0 / 10%)"
            strokeWidth="5"
          />
          <circle
            cx="40" cy="40" r="36"
            fill="none"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="animate-score-fill"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold" style={{ color }}>{Math.round(score)}</span>
        </div>
      </div>
      <div className="h-1.5 w-full max-w-[80px] overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${score}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-xs font-medium text-muted-foreground text-center">{label}</span>
    </div>
  );
}

export function DeploymentReadinessChart({ deployment }: { deployment: DeploymentReadiness }) {
  const metrics: MetricCircleProps[] = [
    { label: 'CI/CD', score: deployment.ciCd },
    { label: 'Containerization', score: deployment.containerization },
    { label: 'Monitoring', score: deployment.monitoring },
    { label: 'Environment Mgmt', score: deployment.environmentManagement },
  ];

  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Deployment Readiness</CardTitle>
          <Badge variant="outline" className={cn('text-xs', getGradeBadgeColor(deployment.grade))}>
            Grade {deployment.grade}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {metrics.map((m) => (
            <MetricCircle key={m.label} label={m.label} score={m.score} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
