import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import type { GovernanceScore } from '@/lib/types';

const COLORS = [
  'oklch(0.623 0.214 259)',
  'oklch(0.696 0.17 162.48)',
  'oklch(0.769 0.188 70.08)',
  'oklch(0.627 0.265 303.9)',
  'oklch(0.645 0.246 16.439)',
  'oklch(0.7 0.15 200)',
];

const LABELS: Record<string, string> = {
  codeQuality: 'Code Quality',
  testing: 'Testing',
  documentation: 'Docs',
  security: 'Security',
  maintainability: 'Maintain',
  dependencyManagement: 'Deps',
};

type GovernanceBreakdownChartProps = {
  governance: GovernanceScore;
};

const tooltipStyle = {
  backgroundColor: 'oklch(0.178 0.005 260)',
  border: '1px solid oklch(1 0 0 / 15%)',
  borderRadius: '8px',
  labelStyle: { color: 'oklch(0.985 0 0)' },
  itemStyle: { color: 'oklch(0.708 0 0)' },
};

const axisTick = { fill: 'oklch(0.708 0 0)', fontSize: 12 };
const axisLine = { stroke: 'oklch(1 0 0 / 10%)' };

export default function GovernanceBreakdownChart({ governance }: GovernanceBreakdownChartProps) {
  const data = Object.entries(governance.breakdown).map(([key, value]) => ({
    name: LABELS[key] || key,
    score: value,
  }));

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 6%)" vertical={false} />
        <XAxis dataKey="name" tick={axisTick} axisLine={axisLine} tickLine={false} />
        <YAxis domain={[0, 100]} tick={axisTick} axisLine={axisLine} tickLine={false} />
        <Tooltip {...tooltipStyle} cursor={{ fill: 'oklch(1 0 0 / 4%)' }} />
        <Bar dataKey="score" radius={[4, 4, 0, 0]} maxBarSize={48}>
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
