import { useEffect, useState } from 'react';
import { ChevronDown, ArrowLeft } from 'lucide-react';
import { GithubIcon } from '@/components/ui/github-icon';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

import { Navbar } from '@/components/burnish/navbar';
import { Hero } from '@/components/burnish/hero';
import { GovernanceDashboard } from '@/components/burnish/governance-dashboard';
import RiskDistributionChart from '@/components/burnish/risk-distribution-chart';
import HealthMetricsChart from '@/components/burnish/health-metrics-chart';
import { MaturityRadarChart } from '@/components/burnish/maturity-radar-chart';
import { DeploymentReadinessChart } from '@/components/burnish/deployment-readiness-chart';
import { BusinessImpactChart } from '@/components/burnish/business-impact-chart';
import { PrioritiesList } from '@/components/burnish/priorities-list';
import { SecurityFindings } from '@/components/burnish/security-findings';
import { DocumentationQualityChart } from '@/components/burnish/documentation-quality-chart';
import { ExecutiveSummary } from '@/components/burnish/executive-summary';
import { AIRecommendations } from '@/components/burnish/ai-recommendations';
import ReportExport from '@/components/burnish/report-export';
import { useAnalysis } from '@/hooks/use-analysis';
import { cn } from '@/lib/utils';

type CollapsibleSectionProps = {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
};

function CollapsibleSection({ title, defaultOpen = false, children }: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="space-y-3">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm font-semibold transition-colors hover:text-primary"
      >
        <ChevronDown
          className={cn('h-4 w-4 transition-transform', open && 'rotate-180')}
        />
        {title}
      </button>
      {open && <div className="space-y-4">{children}</div>}
    </div>
  );
}

export default function App() {
  const { result, isLoading, error, analyze, reset, fetchRecent, recentAnalyses } = useAnalysis();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    fetchRecent();
  }, [fetchRecent]);

  function handleAnalyze(url: string) {
    analyze(url);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-16">
        {!result ? (
          <Hero onAnalyze={handleAnalyze} isLoading={isLoading} />
        ) : (
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
            {/* Repo header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold">
                  {result.repositoryMeta.owner}/{result.repositoryMeta.name}
                </h1>
                {result.repositoryMeta.description && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {result.repositoryMeta.description}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={reset} className="gap-1.5">
                  <ArrowLeft className="h-3.5 w-3.5" />
                  New Analysis
                </Button>
              </div>
            </div>

            {/* Executive Summary */}
            <ExecutiveSummary summary={result.executiveSummary} />

            {/* Governance Dashboard - 6 rings + breakdown chart */}
            <GovernanceDashboard result={result} />

            {/* Maturity & Business Impact side by side */}
            <div className="grid gap-6 lg:grid-cols-2">
              <MaturityRadarChart maturity={result.maturity} />
              <BusinessImpactChart businessImpact={result.businessImpact} />
            </div>

            {/* Health & Deployment */}
            <div className="grid gap-6 lg:grid-cols-2">
              <HealthMetricsChart health={result.health} />
              <DeploymentReadinessChart deployment={result.deployment} />
            </div>

            {/* Risk Distribution */}
            <RiskDistributionChart risk={result.risk} />

            {/* Collapsible sections */}
            <CollapsibleSection title="Security Findings" defaultOpen={true}>
              <SecurityFindings findings={result.security} />
            </CollapsibleSection>

            <CollapsibleSection title="Engineering Priorities">
              <PrioritiesList priorities={result.priorities} />
            </CollapsibleSection>

            <CollapsibleSection title="Documentation Quality">
              <DocumentationQualityChart documentation={result.documentation} />
            </CollapsibleSection>

            <CollapsibleSection title="AI Recommendations">
              <AIRecommendations recommendations={result.recommendations} />
            </CollapsibleSection>

            <CollapsibleSection title="Export Report">
              <ReportExport result={result} />
            </CollapsibleSection>
          </div>
        )}
      </main>

      <footer className="mt-auto border-t border-border py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} BURNISH. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <a href="https://github.com/burnish" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-muted-foreground">
                <GithubIcon className="h-4 w-4" />
                GitHub
              </a>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
