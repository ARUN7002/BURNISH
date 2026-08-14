import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ScoreRing from '@/components/burnish/score-ring';
import GovernanceBreakdownChart from '@/components/burnish/governance-breakdown-chart';
import type { AnalysisResult } from '@/lib/types';

type GovernanceDashboardProps = {
  result: AnalysisResult;
};

export function GovernanceDashboard({ result }: GovernanceDashboardProps) {
  const { governanceScore, health, maturity, risk, deployment, businessImpact } = result;

  const rings = [
    { label: 'Governance', score: governanceScore.overall, grade: governanceScore.grade, showGrade: true },
    { label: 'Health', score: health.overall, grade: health.grade, showGrade: true },
    { label: 'Maturity', score: maturity.overall, grade: maturity.level, showGrade: true },
    { label: 'Risk', score: 100 - risk.overall, grade: risk.overall <= 30 ? 'Low' : risk.overall <= 60 ? 'Med' : 'High', showGrade: true },
    { label: 'Deployment', score: deployment.overall, grade: deployment.grade, showGrade: true },
    { label: 'Business Impact', score: businessImpact.overall, showGrade: false },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {rings.map((ring) => (
          <Card key={ring.label} className="card-hover">
            <CardContent className="flex items-center justify-center p-4">
              <ScoreRing
                score={ring.score}
                size={100}
                strokeWidth={7}
                label={ring.label}
                grade={ring.grade}
                showGrade={ring.showGrade}
              />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="card-hover">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Governance Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <GovernanceBreakdownChart governance={governanceScore} />
        </CardContent>
      </Card>
    </div>
  );
}
