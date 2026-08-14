import { ShieldCheck, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { SecurityRisk } from '@/lib/types';
import { cn } from '@/lib/utils';

function severityColor(severity: string): string {
  switch (severity) {
    case 'critical':
      return 'bg-red-500/15 text-red-400 border-red-500/30';
    case 'high':
      return 'bg-orange-500/15 text-orange-400 border-orange-500/30';
    case 'medium':
      return 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30';
    default:
      return 'bg-green-500/15 text-green-400 border-green-500/30';
  }
}

export function SecurityFindings({ findings }: { findings: SecurityRisk[] }) {
  const criticalOrHigh = findings.filter(
    (f) => f.severity === 'critical' || f.severity === 'high',
  );

  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Security Findings</CardTitle>
      </CardHeader>
      <CardContent>
        {criticalOrHigh.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-lg border border-green-500/20 bg-green-500/5 p-6">
            <ShieldCheck className="h-10 w-10 text-green-400" />
            <p className="text-sm font-medium text-green-400">No Critical or High Severity Issues</p>
            <p className="text-center text-xs text-muted-foreground">
              Your repository has passed the security baseline check.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/5 p-3">
              <AlertTriangle className="h-5 w-5 text-destructive shrink-0" />
              <p className="text-sm text-destructive">
                {criticalOrHigh.length} critical/high severity finding{criticalOrHigh.length !== 1 ? 's' : ''} detected
              </p>
            </div>
            <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
              {findings.map((finding, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-border bg-background/50 p-3 text-sm"
                >
                  <div className="mb-1 flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={cn('text-[10px] px-1.5 py-0', severityColor(finding.severity))}
                    >
                      {finding.severity}
                    </Badge>
                    <span className="font-medium">{finding.category}</span>
                  </div>
                  <p className="text-muted-foreground mb-1">{finding.finding}</p>
                  <p className="text-xs text-primary">→ {finding.recommendation}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
