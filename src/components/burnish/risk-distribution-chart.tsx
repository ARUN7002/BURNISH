import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { RiskDistribution } from '@/lib/types';
import { cn } from '@/lib/utils';

const SEVERITY_COLORS = {
  critical: '#ef4444',
  high: '#f97316',
  medium: '#eab308',
  low: '#22c55e',
};

const SEVERITY_ORDER = ['critical', 'high', 'medium', 'low'] as const;

const tooltipStyle = {
  backgroundColor: 'oklch(0.178 0.005 260)',
  border: '1px solid oklch(1 0 0 / 15%)',
  borderRadius: '8px',
  labelStyle: { color: 'oklch(0.985 0 0)' },
  itemStyle: { color: 'oklch(0.708 0 0)' },
};

type RiskDistributionChartProps = {
  risk: RiskDistribution;
};

export default function RiskDistributionChart({ risk }: RiskDistributionChartProps) {
  const data = SEVERITY_ORDER
    .filter((s) => risk[s] > 0)
    .map((severity) => ({
      name: severity.charAt(0).toUpperCase() + severity.slice(1),
      value: risk[severity],
      severity,
    }));

  const total = risk.critical + risk.high + risk.medium + risk.low;

  function severityBadgeColor(severity: string) {
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

  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Risk Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4 lg:flex-row">
          <div className="relative h-[200px] w-[200px] shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={SEVERITY_COLORS[entry.severity as keyof typeof SEVERITY_COLORS]}
                    />
                  ))}
                </Pie>
                <Tooltip {...tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold">{total}</span>
              <span className="text-xs text-muted-foreground">Total</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 lg:flex-col lg:justify-start">
            {SEVERITY_ORDER.map((severity) => (
              <div key={severity} className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: SEVERITY_COLORS[severity] }}
                />
                <span className="text-sm capitalize">{severity}</span>
                <span className="text-sm font-semibold">{risk[severity]}</span>
              </div>
            ))}
          </div>
        </div>

        {risk.items.length > 0 && (
          <div className="mt-4 max-h-64 overflow-y-auto space-y-2 pr-1">
            {risk.items.map((item, i) => (
              <div
                key={i}
                className="rounded-lg border border-border bg-background/50 p-3 text-sm"
              >
                <div className="mb-1 flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={cn('text-[10px] px-1.5 py-0', severityBadgeColor(item.severity))}
                  >
                    {item.severity}
                  </Badge>
                  <span className="font-medium">{item.category}</span>
                </div>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
