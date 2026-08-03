'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { RiskDistribution } from '@/lib/types';

interface Props {
  risk: RiskDistribution;
}

const COLORS: Record<string, string> = {
  critical: '#ef4444',
  high: '#f97316',
  medium: '#eab308',
  low: '#22c55e',
};

const SEVERITY_ORDER = ['critical', 'high', 'medium', 'low'] as const;

const SEVERITY_VARIANT: Record<string, 'destructive' | 'default' | 'secondary' | 'outline'> = {
  critical: 'destructive',
  high: 'default',
  medium: 'secondary',
  low: 'outline',
};

export default function RiskDistributionChart({ risk }: Props) {
  const data = SEVERITY_ORDER.filter((key) => risk[key] > 0).map((key) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value: risk[key],
    severity: key,
  }));

  const total = risk.critical + risk.high + risk.medium + risk.low;

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          Risk Distribution
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {/* Donut chart with center label */}
        <div className="relative h-48 w-full">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="text-2xl font-bold tabular-nums">{total}</span>
              <p className="text-[10px] text-muted-foreground">total risks</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={COLORS[entry.severity]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'oklch(0.178 0.005 260)',
                  border: '1px solid oklch(1 0 0 / 15%)',
                  borderRadius: '8px',
                  fontSize: '13px',
                }}
                labelStyle={{ color: 'oklch(0.985 0 0)', fontWeight: 600 }}
                itemStyle={{ color: 'oklch(0.708 0 0)' }}
                formatter={(value: number) => [value, 'Count']}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {SEVERITY_ORDER.map((key) => (
            <div key={key} className="flex items-center gap-1.5">
              <span
                className="inline-block h-2.5 w-2.5 rounded-sm"
                style={{ backgroundColor: COLORS[key] }}
              />
              <span className="text-xs text-muted-foreground">
                {key.charAt(0).toUpperCase() + key.slice(1)} ({risk[key]})
              </span>
            </div>
          ))}
        </div>

        {/* Risk items list */}
        {risk.items.length > 0 && (
          <ScrollArea className="max-h-48">
            <div className="flex flex-col gap-2 pr-3">
              {risk.items.slice(0, 5).map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 rounded-md border border-border/50 p-2"
                >
                  <Badge variant={SEVERITY_VARIANT[item.severity]} className="mt-0.5 shrink-0 text-[10px] px-1.5 py-0">
                    {item.severity}
                  </Badge>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-medium text-foreground/80">
                      {item.category}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
