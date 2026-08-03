'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ScoreRing from './score-ring';
import GovernanceBreakdownChart from './governance-breakdown-chart';
import type { AnalysisResult } from '@/lib/types';
import { Shield, Activity, TrendingUp, AlertTriangle, Rocket, Target } from 'lucide-react';

interface Props {
  data: AnalysisResult;
}

export default function GovernanceDashboard({ data }: Props) {
  const scoreCards = [
    {
      label: 'Governance',
      score: data.governanceScore.overall,
      grade: data.governanceScore.grade,
      icon: Shield,
    },
    {
      label: 'Health',
      score: data.health.overall,
      grade: data.health.grade,
      icon: Activity,
    },
    {
      label: 'Maturity',
      score: data.maturity.overall,
      grade: data.maturity.level,
      icon: TrendingUp,
    },
    {
      label: 'Risk',
      score: 100 - data.risk.overall,
      grade: data.risk.overall > 70 ? 'High' : data.risk.overall > 40 ? 'Medium' : 'Low',
      icon: AlertTriangle,
      invertColor: true,
    },
    {
      label: 'Deployment',
      score: data.deployment.overall,
      grade: data.deployment.grade,
      icon: Rocket,
    },
    {
      label: 'Business Impact',
      score: data.businessImpact.overall,
      grade: '',
      icon: Target,
    },
  ];

  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent" />
        <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary">
          <Shield className="h-3 w-3 mr-1.5" />
          Governance Overview
        </Badge>
        <div className="h-px flex-1 bg-gradient-to-l from-primary/40 to-transparent" />
      </div>

      {/* Score Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {scoreCards.map((s) => (
          <Card key={s.label} className="bg-card/80 border-border/50 card-hover">
            <CardContent className="p-4 flex flex-col items-center">
              <s.icon className="h-4 w-4 text-muted-foreground mb-3" />
              <ScoreRing
                score={s.score}
                size={100}
                strokeWidth={7}
                showGrade={!!s.grade}
                grade={s.grade}
              />
              <span className="text-xs text-muted-foreground mt-1 font-medium">{s.label}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Governance Breakdown Chart */}
      <Card className="bg-card/80 border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            Governance Score Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <GovernanceBreakdownChart breakdown={data.governanceScore.breakdown} />
        </CardContent>
      </Card>
    </section>
  );
}
