'use client';

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

interface Props {
  breakdown: GovernanceScore['breakdown'];
}

const BARS = [
  { key: 'codeQuality' as const, label: 'Code Quality', shortLabel: 'Quality' },
  { key: 'testing' as const, label: 'Testing', shortLabel: 'Testing' },
  { key: 'documentation' as const, label: 'Documentation', shortLabel: 'Docs' },
  { key: 'security' as const, label: 'Security', shortLabel: 'Security' },
  { key: 'maintainability' as const, label: 'Maintainability', shortLabel: 'Maintain' },
  { key: 'dependencyManagement' as const, label: 'Dependencies', shortLabel: 'Deps' },
];

function getBarColor(value: number): string {
  if (value >= 85) return 'oklch(0.7 0.18 150)';
  if (value >= 70) return 'oklch(0.75 0.17 165)';
  if (value >= 50) return 'oklch(0.8 0.18 90)';
  return 'oklch(0.7 0.2 25)';
}

export default function GovernanceBreakdownChart({ breakdown }: Props) {
  const chartData = BARS.map((b) => ({
    name: b.shortLabel,
    fullName: b.label,
    value: Math.round(breakdown[b.key] * 10) / 10,
  }));

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} barCategoryGap="20%">
          <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 6%)" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fill: 'oklch(0.708 0 0)', fontSize: 12 }}
            axisLine={{ stroke: 'oklch(1 0 0 / 10%)' }}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: 'oklch(0.708 0 0)', fontSize: 12 }}
            axisLine={{ stroke: 'oklch(1 0 0 / 10%)' }}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'oklch(0.178 0.005 260)',
              border: '1px solid oklch(1 0 0 / 15%)',
              borderRadius: '8px',
              fontSize: '13px',
            }}
            labelStyle={{ color: 'oklch(0.985 0 0)', fontWeight: 600 }}
            itemStyle={{ color: 'oklch(0.708 0 0)' }}
            formatter={(value: number, _name: string, props: { payload: { fullName: string } }) => [
              `${value}/100`,
              props.payload.fullName,
            ]}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={48}>
            {chartData.map((entry, index) => (
              <Cell key={index} fill={getBarColor(entry.value)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
