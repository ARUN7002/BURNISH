'use client';

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Target } from 'lucide-react';
import type { BusinessImpact } from '@/lib/types';

interface BusinessImpactChartProps {
  business: BusinessImpact;
}

export function BusinessImpactChart({ business }: BusinessImpactChartProps) {
  const data = [
    { name: 'Market Readiness', value: business.marketReadiness },
    { name: 'Scalability', value: business.scalability },
    { name: 'Technical Debt', value: 100 - business.technicalDebt },
    { name: 'Innovation', value: business.innovation },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-4 w-4" />
          Business Impact
        </CardTitle>
      </CardHeader>
      <div className="px-6 pb-6">
        <div style={{ width: '100%', height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
              <PolarGrid stroke="oklch(1 0 0 / 8%)" />
              <PolarAngleAxis
                dataKey="name"
                tick={{
                  fill: 'oklch(0.708 0 0)',
                  fontSize: 11,
                }}
              />
              <Radar
                name="Impact"
                dataKey="value"
                stroke="oklch(0.623 0.214 259)"
                fill="oklch(0.623 0.214 259 / 20%)"
                fillOpacity={1}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        {business.summary && (
          <p className="mt-3 text-center text-sm text-muted-foreground">
            {business.summary}
          </p>
        )}
      </div>
    </Card>
  );
}
