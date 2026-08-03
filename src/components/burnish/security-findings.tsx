'use client';

import { ShieldAlert } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2 } from 'lucide-react';
import type { SecurityRisk } from '@/lib/types';

const severityColorMap: Record<string, string> = {
  critical: 'border-red-500 text-red-600 bg-red-50 dark:bg-red-950 dark:text-red-400',
  high: 'border-orange-500 text-orange-600 bg-orange-50 dark:bg-orange-950 dark:text-orange-400',
  medium: 'border-yellow-500 text-yellow-600 bg-yellow-50 dark:bg-yellow-950 dark:text-yellow-400',
  low: 'border-green-500 text-green-600 bg-green-50 dark:bg-green-950 dark:text-green-400',
};

interface SecurityFindingsProps {
  security: SecurityRisk[];
}

export function SecurityFindings({ security }: SecurityFindingsProps) {
  const criticalOrHigh = security.filter(
    (s) => s.severity === 'critical' || s.severity === 'high'
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldAlert className="h-5 w-5" />
          Security Findings
        </CardTitle>
      </CardHeader>
      <div className="space-y-3 px-6 pb-6">
        {criticalOrHigh.length === 0 ? (
          <div className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950">
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
            <div>
              <p className="text-sm font-medium text-green-700 dark:text-green-300">
                No critical or high severity findings
              </p>
              <p className="text-xs text-green-600 dark:text-green-400">
                Your repository passed the high-priority security checks.
              </p>
            </div>
          </div>
        ) : (
          security.map((finding, index) => (
            <div
              key={index}
              className="rounded-lg border p-4 space-y-2"
            >
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className={severityColorMap[finding.severity]}>
                  {finding.severity}
                </Badge>
                <span className="text-sm font-medium text-foreground">
                  {finding.category}
                </span>
              </div>
              <p className="text-sm text-foreground">{finding.finding}</p>
              <p className="text-xs text-muted-foreground">{finding.recommendation}</p>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
