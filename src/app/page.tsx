'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/burnish/navbar';
import Hero from '@/components/burnish/hero';
import GovernanceDashboard from '@/components/burnish/governance-dashboard';
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
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Github,
  Clock,
  Cpu,
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const { result, isLoading, error, recentAnalyses, analyze, fetchRecent, reset } = useAnalysis();
  const showDashboard = result !== null;
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    fetchRecent();
  }, [fetchRecent]);

  useEffect(() => {
    if (result) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [result]);

  const handleAnalyze = (url: string) => {
    if (!url.startsWith('http')) {
      url = `https://${url}`;
    }
    analyze(url);
  };

  const toggleSection = (id: string) => {
    setActiveSection((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {!showDashboard ? (
          <>
            <Hero onAnalyze={handleAnalyze} isLoading={isLoading} />

            {/* Error */}
            {error && (
              <div className="max-w-2xl mx-auto px-6 -mt-4 mb-8">
                <Card className="border-destructive/50 bg-destructive/5">
                  <CardContent className="p-4 text-sm text-destructive">
                    {error}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Loading skeleton */}
            {isLoading && (
              <div className="max-w-6xl mx-auto px-6 pb-16">
                <div className="flex items-center gap-3 mb-6">
                  <Skeleton className="h-6 w-40" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Card key={i} className="bg-card/50">
                      <CardContent className="p-4 flex flex-col items-center gap-3">
                        <Skeleton className="h-20 w-20 rounded-full" />
                        <Skeleton className="h-3 w-16" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <Skeleton className="h-72 rounded-xl" />
                  <Skeleton className="h-72 rounded-xl" />
                </div>
              </div>
            )}

            {/* Recent Analyses */}
            {recentAnalyses.length > 0 && !isLoading && (
              <section className="max-w-4xl mx-auto px-6 pb-20">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <h3 className="text-sm font-medium text-muted-foreground">Recent Analyses</h3>
                </div>
                <div className="space-y-2">
                  {recentAnalyses.slice(0, 5).map((a) => (
                    <Card
                      key={a.id}
                      className="bg-card/50 border-border/50 card-hover cursor-pointer"
                      onClick={() => handleAnalyze(a.repository.url)}
                    >
                      <CardContent className="p-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Github className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <span className="text-sm font-medium">
                              {a.repository.owner}/{a.repository.name}
                            </span>
                            {a.repository.language && (
                              <Badge variant="outline" className="ml-2 text-[10px] border-border/50">
                                {a.repository.language}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {a.governanceScore !== null && (
                            <span className="text-sm font-semibold text-primary">
                              {Math.round(a.governanceScore)}
                            </span>
                          )}
                          <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </>
        ) : (
          result && (
            <div className="pt-20 pb-16 px-6">
              <div className="max-w-7xl mx-auto">
                {/* Repo header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Github className="h-5 w-5 text-muted-foreground" />
                      <h2 className="text-xl font-bold">
                        {result.repositoryMeta.owner}/{result.repositoryMeta.name}
                      </h2>
                      {result.repositoryMeta.language && (
                        <Badge variant="outline" className="border-border/50">
                          {result.repositoryMeta.language}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Cpu className="h-3 w-3" />
                        {result.provider}
                      </span>
                      <span>{result.durationMs}ms</span>
                      <span>{new Date(result.analyzedAt).toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-border/50"
                      onClick={() => {
                        reset();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      New Analysis
                    </Button>
                  </div>
                </div>

                {/* Executive Summary - Full Width */}
                <ExecutiveSummary
                  summary={result.executiveSummary}
                  repositoryUrl={result.repositoryUrl}
                />

                {/* Governance Dashboard - Full Width */}
                <div className="mt-6">
                  <GovernanceDashboard data={result} />
                </div>

                {/* Middle Section: Charts Grid */}
                <div className="grid lg:grid-cols-2 gap-6 mt-6">
                  <RiskDistributionChart risk={result.risk} />
                  <HealthMetricsChart health={result.health} />
                </div>

                <div className="grid lg:grid-cols-2 gap-6 mt-6">
                  <MaturityRadarChart maturity={result.maturity} />
                  <DeploymentReadinessChart deployment={result.deployment} />
                </div>

                <div className="mt-6">
                  <BusinessImpactChart business={result.businessImpact} />
                </div>

                {/* Collapsible Sections */}
                <div className="mt-6 space-y-3">
                  {/* Security Findings */}
                  <CollapsibleSection
                    id="security"
                    title="Security Findings"
                    count={result.security.length}
                    activeSection={activeSection}
                    onToggle={toggleSection}
                  >
                    <SecurityFindings security={result.security} />
                  </CollapsibleSection>

                  {/* Engineering Priorities */}
                  <CollapsibleSection
                    id="priorities"
                    title="Engineering Priorities"
                    count={result.priorities.items.length}
                    activeSection={activeSection}
                    onToggle={toggleSection}
                  >
                    <PrioritiesList priorities={result.priorities} />
                  </CollapsibleSection>

                  {/* Documentation Quality */}
                  <CollapsibleSection
                    id="docs"
                    title="Documentation Quality"
                    count={null}
                    activeSection={activeSection}
                    onToggle={toggleSection}
                  >
                    <DocumentationQualityChart doc={result.documentation} />
                  </CollapsibleSection>

                  {/* AI Recommendations */}
                  <CollapsibleSection
                    id="recommendations"
                    title="AI Recommendations"
                    count={result.recommendations.length}
                    activeSection={activeSection}
                    onToggle={toggleSection}
                  >
                    <AIRecommendations recommendations={result.recommendations} />
                  </CollapsibleSection>

                  {/* Report Export */}
                  <CollapsibleSection
                    id="export"
                    title="Export Report"
                    count={null}
                    activeSection={activeSection}
                    onToggle={toggleSection}
                  >
                    <ReportExport data={result} />
                  </CollapsibleSection>
                </div>
              </div>
            </div>
          )
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-6 px-6 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground/60">BURNISH</span>
            <span>AI Repository Governance Platform</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Enterprise-grade analysis in minutes</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* Collapsible section wrapper */
function CollapsibleSection({
  id,
  title,
  count,
  activeSection,
  onToggle,
  children,
}: {
  id: string;
  title: string;
  count: number | null;
  activeSection: string | null;
  onToggle: (id: string) => void;
  children: React.ReactNode;
}) {
  const isOpen = activeSection === id;

  return (
    <div className="rounded-xl border border-border/50 bg-card/50 overflow-hidden">
      <button
        onClick={() => onToggle(id)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-accent/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold">{title}</span>
          {count !== null && (
            <Badge variant="outline" className="text-[10px] border-primary/30 bg-primary/5 text-primary">
              {count}
            </Badge>
          )}
        </div>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>
      {isOpen && <div className="px-6 pb-6">{children}</div>}
    </div>
  );
}