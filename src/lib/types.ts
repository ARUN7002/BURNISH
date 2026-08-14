export interface RepositoryMeta {
  name: string; owner: string; description: string | null; language: string | null;
  stars: number; forks: number; openIssues: number; defaultBranch: string;
}
export interface GovernanceScore {
  overall: number; grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  breakdown: { codeQuality: number; testing: number; documentation: number; security: number; maintainability: number; dependencyManagement: number; };
}
export interface HealthMetric { name: string; score: number; maxScore: number; status: 'excellent' | 'good' | 'fair' | 'poor' | 'critical'; description: string; }
export interface RepositoryHealth { overall: number; metrics: HealthMetric[]; grade: string; }
export interface MaturityDimension { name: string; level: number; maxLevel: number; description: string; }
export interface RepositoryMaturity { overall: number; dimensions: MaturityDimension[]; level: 'Initial' | 'Managed' | 'Defined' | 'Quantitatively Managed' | 'Optimizing'; }
export interface RiskItem { category: string; severity: 'critical' | 'high' | 'medium' | 'low'; description: string; impact: string; mitigation: string; }
export interface RiskDistribution { overall: number; critical: number; high: number; medium: number; low: number; items: RiskItem[]; }
export interface BusinessImpact { overall: number; marketReadiness: number; scalability: number; technicalDebt: number; innovation: number; summary: string; }
export interface PriorityItem { title: string; priority: 'critical' | 'high' | 'medium' | 'low'; category: string; effort: 'small' | 'medium' | 'large'; description: string; impact: string; }
export interface EngineeringPriorities { items: PriorityItem[]; summary: string; }
export interface DeploymentReadiness { overall: number; ciCd: number; containerization: number; monitoring: number; environmentManagement: number; grade: string; summary: string; }
export interface SecurityRisk { category: string; severity: 'critical' | 'high' | 'medium' | 'low'; finding: string; recommendation: string; }
export interface DocumentationQuality { overall: number; readme: number; apiDocs: number; codeComments: number; examples: number; changelog: number; grade: string; }
export interface AIRecommendation { title: string; description: string; category: string; priority: 'critical' | 'high' | 'medium' | 'low'; effort: 'small' | 'medium' | 'large'; }
export interface AnalysisResult {
  id: string; repositoryUrl: string; repositoryMeta: RepositoryMeta; governanceScore: GovernanceScore;
  health: RepositoryHealth; maturity: RepositoryMaturity; risk: RiskDistribution; businessImpact: BusinessImpact;
  priorities: EngineeringPriorities; deployment: DeploymentReadiness; security: SecurityRisk[];
  documentation: DocumentationQuality; executiveSummary: string; recommendations: AIRecommendation[];
  provider: string; analyzedAt: string; durationMs: number;
}
export type ReportFormat = 'pdf' | 'json' | 'markdown' | 'html';
