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
import type { RepositoryMaturity } from '@/lib/types';

const tooltipStyle = {
  backgroundColor: 'oklch(0.178 0.005 260)',
  border: '1px solid oklch(1 0 0 / 15%)',
  borderRadius: '8px',
  labelStyle: { color: 'oklch(0.985 0 0)' },
  itemStyle: { color: 'oklch(0.708 0 0)' },
};

const axisTick = { fill: 'oklch(0.708 0 0)', fontSize: 11 };

const LEVEL_LABELS = ['Initial', 'Managed', 'Defined', 'Quant. Managed', 'Optimizing'];

export function MaturityRadarChart({ maturity }: { maturity: RepositoryMaturity }) {
  const data = maturity.dimensions.map((d) => ({
    dimension: d.name,
    level: d.level,
    maxLevel: d.maxLevel,
  }));

  const overallLevel = Math.round(maturity.overall / 20);

  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Maturity Assessment</CardTitle>
          <span className="text-sm font-semibold text-primary">
            Level {overallLevel}/5
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="oklch(1 0 0 / 8%)" />
            <PolarAngleAxis dataKey="dimension" tick={axisTick} />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 5]}
              tick={axisTick}
              axisLine={false}
              tickCount={6}
              ticks={[0, 1, 2, 3, 4, 5]}
            />
            <Radar
              name="Level"
              dataKey="level"
              stroke="oklch(0.623 0.214 259)"
              fill="oklch(0.623 0.214 259 / 25%)"
              strokeWidth={2}
            />
            <Tooltip {...tooltipStyle} />
          </RadarChart>
        </ResponsiveContainer>
        <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          {LEVEL_LABELS.map((label, i) => (
            <span key={label}>{i + 1}. {label}</span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
