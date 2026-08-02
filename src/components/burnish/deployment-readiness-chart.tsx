'use client';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Rocket } from 'lucide-react';
import type { DeploymentReadiness } from '@/lib/types';

interface DeploymentReadinessChartProps {
  deployment: DeploymentReadiness;
}

interface MetricBarProps {
  label: string;
  score: number;
}

function MetricBar({ label, score }: MetricBarProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-sm font-bold text-foreground">
        {score}
      </div>
      <div className="w-full max-w-[120px]">
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${score}%`,
              backgroundColor:
                score >= 80
                  ? 'oklch(0.723 0.219 149)'
                  : score >= 60
                    ? 'oklch(0.795 0.184 86)'
                    : score >= 40
                      ? 'oklch(0.795 0.184 86)'
                      : 'oklch(0.637 0.237 25)',
            }}
          />
        </div>
      </div>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}

export function DeploymentReadinessChart({
  deployment,
}: DeploymentReadinessChartProps) {
  const metrics = [
    { label: 'CI/CD', score: deployment.ciCd },
    { label: 'Containerization', score: deployment.containerization },
    { label: 'Monitoring', score: deployment.monitoring },
    { label: 'Environment Mgmt', score: deployment.environmentManagement },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Rocket className="h-4 w-4" />
            Deployment Readiness
          </CardTitle>
          <Badge variant={deployment.grade === 'A' ? 'default' : 'secondary'}>
            {deployment.grade}
          </Badge>
        </div>
      </CardHeader>
      <div className="px-6 pb-6">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {metrics.map((metric) => (
            <MetricBar
              key={metric.label}
              label={metric.label}
              score={metric.score}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}
