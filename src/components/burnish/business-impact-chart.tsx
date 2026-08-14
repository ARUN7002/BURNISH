import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { BusinessImpact } from '@/lib/types';

const tooltipStyle = {
  backgroundColor: 'oklch(0.178 0.005 260)',
  border: '1px solid oklch(1 0 0 / 15%)',
  borderRadius: '8px',
  labelStyle: { color: 'oklch(0.985 0 0)' },
  itemStyle: { color: 'oklch(0.708 0 0)' },
};

const axisTick = { fill: 'oklch(0.708 0 0)', fontSize: 11 };

export function BusinessImpactChart({ businessImpact }: { businessImpact: BusinessImpact }) {
  const data = [
    { dimension: 'Market Readiness', value: businessImpact.marketReadiness },
    { dimension: 'Scalability', value: businessImpact.scalability },
    { dimension: 'Technical Debt', value: 100 - businessImpact.technicalDebt },
    { dimension: 'Innovation', value: businessImpact.innovation },
  ];

  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Business Impact</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="oklch(1 0 0 / 8%)" />
            <PolarAngleAxis dataKey="dimension" tick={axisTick} />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={axisTick}
              axisLine={false}
              tickCount={6}
            />
            <Radar
              name="Score"
              dataKey="value"
              stroke="oklch(0.696 0.17 162.48)"
              fill="oklch(0.696 0.17 162.48 / 25%)"
              strokeWidth={2}
            />
            <Tooltip {...tooltipStyle} />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
