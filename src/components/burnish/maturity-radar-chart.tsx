'use client';

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import type { RepositoryMaturity } from '@/lib/types';

interface MaturityRadarChartProps {
  maturity: RepositoryMaturity;
}

export function MaturityRadarChart({ maturity }: MaturityRadarChartProps) {
  const data = maturity.dimensions.map((dim) => ({
    name: dim.name,
    value: dim.level,
  }));

  const overallLevel = maturity.dimensions.length
    ? (
        maturity.dimensions.reduce((sum, d) => sum + d.level, 0) /
        maturity.dimensions.length
      ).toFixed(1)
    : '0.0';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          Maturity Assessment
        </CardTitle>
      </CardHeader>
      <div className="px-6 pb-6">
        <p className="mb-4 text-center text-sm font-medium text-foreground">
          Overall Maturity Level:{' '}
          <span className="text-base font-bold">{overallLevel} / 5</span>
        </p>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
              <PolarGrid
                stroke="oklch(1 0 0 / 8%)"
              />
              <PolarAngleAxis
                dataKey="name"
                tick={{
                  fill: 'oklch(0.708 0 0)',
                  fontSize: 11,
                }}
              />
              <Radar
                name="Maturity"
                dataKey="value"
                stroke="oklch(0.623 0.214 259)"
                fill="oklch(0.623 0.214 259 / 20%)"
                fillOpacity={1}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}
