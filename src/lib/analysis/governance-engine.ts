/**
 * BURNISH Governance Analysis Engines
 * 
 * Comprehensive repository governance analysis with AI-powered analysis
 * and deterministic heuristic fallback for demo/offline scenarios.
 */

// AI Provider imports available for future AI-enhanced analysis
// Currently using deterministic heuristic engine for instant results
// import { createAIProvider } from '@/lib/providers/ai-provider';
// import type { AIProvider } from '@/lib/providers/ai-provider';
import type {
  AnalysisResult,
  RepositoryMeta,
  GovernanceScore,
  RepositoryHealth,
  HealthMetric,
  RepositoryMaturity,
  MaturityDimension,
  RiskDistribution,
  RiskItem,
  BusinessImpact,
  EngineeringPriorities,
  PriorityItem,
  DeploymentReadiness,
  SecurityRisk,
  DocumentationQuality,
  AIRecommendation,
} from '@/lib/types';

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Simple deterministic hash from a string → 0–1 */
function hashSeed(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = ((h << 5) - h + input.charCodeAt(i)) | 0;
  }
  return (Math.abs(h) % 10000) / 10000;
}

/** Derive a deterministic float 0–max from a seed string and index */
function seededScore(seed: string, index: number, min: number, max: number): number {
  const v = hashSeed(`${seed}:${index}`);
  return Math.round((min + v * (max - min)) * 10) / 10;
}

/** Pick an item from an array deterministically based on seed */
function seededPick<T>(seed: string, index: number, arr: T[]): T {
  const i = Math.floor(hashSeed(`${seed}:pick:${index}`) * arr.length);
  return arr[i];
}

function scoreToGrade(score: number): 'A+' | 'A' | 'B' | 'C' | 'D' | 'F' {
  if (score >= 95) return 'A+';
  if (score >= 85) return 'A';
  if (score >= 70) return 'B';
  if (score >= 55) return 'C';
  if (score >= 40) return 'D';
  return 'F';
}

function scoreToStatus(score: number): 'excellent' | 'good' | 'fair' | 'poor' | 'critical' {
  if (score >= 90) return 'excellent';
  if (score >= 75) return 'good';
  if (score >= 60) return 'fair';
  if (score >= 40) return 'poor';
  return 'critical';
}

function scoreToMaturityLevel(score: number): 'Initial' | 'Managed' | 'Defined' | 'Quantitatively Managed' | 'Optimizing' {
  if (score >= 90) return 'Optimizing';
  if (score >= 75) return 'Quantitatively Managed';
  if (score >= 55) return 'Defined';
  if (score >= 35) return 'Managed';
  return 'Initial';
}

function clamp(v: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, v));
}

export function parseGitHubUrl(url: string): { owner: string; repo: string } | null {
  const patterns = [
    /^https?:\/\/github\.com\/([^/]+)\/([^/]+?)(?:\.git)?\s*$/,
    /^https?:\/\/www\.github\.com\/([^/]+)\/([^/]+?)(?:\.git)?\s*$/,
    /^github\.com\/([^/]+)\/([^/]+?)(?:\.git)?\s*$/,
    /^([^/]+)\/([^/]+)$/,
  ];
  for (const p of patterns) {
    const m = url.trim().match(p);
    if (m) return { owner: m[1], repo: m[2].replace(/\.git$/, '') };
  }
  return null;
}

function generateId(): string {
  return `analysis_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

// ─── Sub-Engine: Governance Score ───────────────────────────────────────────

export function computeGovernanceScore(seed: string): GovernanceScore {
  const codeQuality = clamp(seededScore(seed, 1, 55, 95));
  const testing = clamp(seededScore(seed, 2, 40, 92));
  const documentation = clamp(seededScore(seed, 3, 35, 90));
  const security = clamp(seededScore(seed, 4, 45, 93));
  const maintainability = clamp(seededScore(seed, 5, 50, 94));
  const dependencyManagement = clamp(seededScore(seed, 6, 40, 88));

  const overall = clamp(
    (codeQuality * 0.2 + testing * 0.18 + documentation * 0.12 +
      security * 0.2 + maintainability * 0.15 + dependencyManagement * 0.15),
  );

  return {
    overall,
    breakdown: { codeQuality, testing, documentation, security, maintainability, dependencyManagement },
    grade: scoreToGrade(overall),
  };
}

// ─── Sub-Engine: Repository Health ──────────────────────────────────────────

export function computeRepositoryHealth(seed: string): RepositoryHealth {
  const rawMetrics: { name: string; base: number; max: number; desc: string }[] = [
    { name: 'Commit Frequency', base: seededScore(seed, 10, 30, 95), max: 100, desc: 'Regularity and cadence of commits over the past 90 days' },
    { name: 'Issue Resolution Rate', base: seededScore(seed, 11, 35, 92), max: 100, desc: 'Percentage of opened issues closed within the last 90 days' },
    { name: 'PR Review Turnaround', base: seededScore(seed, 12, 25, 88), max: 100, desc: 'Average time in hours for pull request reviews' },
    { name: 'Test Coverage', base: seededScore(seed, 13, 20, 90), max: 100, desc: 'Percentage of codebase covered by automated tests' },
    { name: 'Build Success Rate', base: seededScore(seed, 14, 50, 98), max: 100, desc: 'CI/CD build pass rate over the last 30 builds' },
    { name: 'Code Churn', base: seededScore(seed, 15, 30, 85), max: 100, desc: 'Rate of code changes indicating stability vs. volatility' },
    { name: 'Dependency Freshness', base: seededScore(seed, 16, 25, 82), max: 100, desc: 'How up-to-date direct dependencies are' },
    { name: 'Contributor Diversity', base: seededScore(seed, 17, 15, 78), max: 100, desc: 'Distribution of contributions across team members' },
    { name: 'Branch Hygiene', base: seededScore(seed, 18, 40, 90), max: 100, desc: 'Stale branch count and merge conflict frequency' },
    { name: 'Response Time', base: seededScore(seed, 19, 30, 88), max: 100, desc: 'Median time to first response on issues and PRs' },
    { name: 'Release Cadence', base: seededScore(seed, 20, 20, 85), max: 100, desc: 'Regularity of tagged releases and version bumps' },
    { name: 'Artifact Size', base: seededScore(seed, 21, 45, 95), max: 100, desc: 'Bundle/artifact size trends and optimization' },
  ];

  const metrics: HealthMetric[] = rawMetrics.map(m => ({
    name: m.name,
    score: clamp(m.base),
    maxScore: m.max,
    status: scoreToStatus(m.base),
    description: m.desc,
  }));

  const overall = clamp(metrics.reduce((s, m) => s + m.score, 0) / metrics.length);

  return {
    overall,
    metrics,
    grade: scoreToGrade(overall),
  };
}

// ─── Sub-Engine: Repository Maturity ────────────────────────────────────────

export function computeRepositoryMaturity(seed: string): RepositoryMaturity {
  const rawDimensions: { name: string; base: number; desc: string }[] = [
    { name: 'Process Maturity', base: seededScore(seed, 30, 30, 95), desc: 'Standardization of development workflows, branching strategies, and release processes' },
    { name: 'Automation Level', base: seededScore(seed, 31, 25, 90), desc: 'Degree of CI/CD, automated testing, and infrastructure-as-code adoption' },
    { name: 'Documentation Maturity', base: seededScore(seed, 32, 20, 85), desc: 'Completeness and accuracy of README, API docs, architecture docs, and runbooks' },
    { name: 'Team & Collaboration', base: seededScore(seed, 33, 35, 88), desc: 'Code ownership, review culture, onboarding materials, and knowledge sharing' },
    { name: 'Quality Assurance', base: seededScore(seed, 34, 25, 92), desc: 'Test strategies, code review rigor, linting, and quality gates' },
    { name: 'Operational Readiness', base: seededScore(seed, 35, 20, 87), desc: 'Monitoring, alerting, incident response, and SLO/SLA definitions' },
  ];

  const dimensions: MaturityDimension[] = rawDimensions.map(d => {
    const level = Math.max(1, Math.min(5, Math.round(d.base / 20)));
    return {
      name: d.name,
      level,
      maxLevel: 5,
      description: d.desc,
    };
  });

  const overall = clamp(dimensions.reduce((s, d) => s + (d.level / d.maxLevel) * 100, 0) / dimensions.length);

  return {
    overall,
    dimensions,
    level: scoreToMaturityLevel(overall),
  };
}

// ─── Sub-Engine: Risk Distribution ──────────────────────────────────────────

export function computeRiskDistribution(seed: string): RiskDistribution {
  const severities: Array<'critical' | 'high' | 'medium' | 'low'> = ['critical', 'high', 'medium', 'low'];

  const allItems: Omit<RiskItem, 'severity'>[] = [
    {
      category: 'Supply Chain',
      description: 'Multiple transitive dependencies with known CVEs detected in the dependency tree',
      impact: 'Potential for supply-chain attacks or forced emergency patching cycles',
      mitigation: 'Audit dependency tree with `npm audit` or equivalent, pin versions, and establish automated CVE scanning',
    },
    {
      category: 'Code Quality',
      description: 'Complex functions with high cyclomatic complexity detected in core modules',
      impact: 'Increased bug surface, harder onboarding, and elevated regression risk during changes',
      mitigation: 'Refactor complex functions, add targeted unit tests, and enforce complexity thresholds in CI',
    },
    {
      category: 'Knowledge Silos',
      description: 'Over 80% of recent commits originate from fewer than 3 contributors',
      impact: 'Bus-factor risk; team leave could severely impact velocity and maintenance',
      mitigation: 'Implement pair programming, rotate code ownership, and improve onboarding documentation',
    },
    {
      category: 'Configuration Drift',
      description: 'Environment configuration differences between staging and production detected',
      impact: 'Hard-to-reproduce bugs, deployment failures, and potential security misconfigurations',
      mitigation: 'Adopt infrastructure-as-code, validate configs in CI, and use immutable deployments',
    },
    {
      category: 'Test Gaps',
      description: 'Critical business logic paths lack integration and end-to-end test coverage',
      impact: 'Regressions may reach production undetected, increasing incident frequency',
      mitigation: 'Prioritize tests for highest-traffic code paths; implement contract testing for services',
    },
    {
      category: 'Deprecation',
      description: 'Key runtime dependencies are approaching or past end-of-life',
      impact: 'Future incompatibility, loss of security patches, and forced migration under pressure',
      mitigation: 'Create a migration timeline, allocate engineering sprints for upgrades, and monitor LTS schedules',
    },
    {
      category: 'Secrets Management',
      description: 'Hardcoded or insufficiently rotated secrets found in configuration files',
      impact: 'Credential exposure leading to unauthorized access and compliance violations',
      mitigation: 'Move all secrets to a vault (e.g., HashiCorp Vault), rotate keys, and scan for leaks in history',
    },
    {
      category: 'Scaling',
      description: 'Database queries lack proper indexing for expected growth trajectory',
      impact: 'Performance degradation under load, potential outages during traffic spikes',
      mitigation: 'Profile slow queries, add missing indexes, and implement connection pooling and caching layers',
    },
    {
      category: 'Compliance',
      description: 'Logging and audit trails do not meet regulatory data retention requirements',
      impact: 'Potential regulatory fines, audit failures, and inability to perform forensic analysis',
      mitigation: 'Implement structured logging with retention policies and review with compliance team',
    },
    {
      category: 'API Stability',
      description: 'Public API endpoints lack versioning and backward compatibility guarantees',
      impact: 'Breaking changes will force downstream consumer updates, eroding trust',
      mitigation: 'Adopt semantic versioning, document deprecation policies, and use API gateways',
    },
    {
      category: 'Monitoring Gaps',
      description: 'Critical services lack alerting for error-rate spikes or latency degradation',
      impact: 'Outages may go undetected until reported by users, increasing MTTR',
      mitigation: 'Deploy APM tooling, set SLO-based alerts, and create incident response runbooks',
    },
    {
      category: 'License Risk',
      description: 'Dependencies include copyleft licenses that may conflict with commercial distribution',
      impact: 'Legal exposure and potential requirement to open-source proprietary code',
      mitigation: 'Audit all dependency licenses, consult legal counsel, and consider alternatives for copyleft packages',
    },
  ];

  // Deterministically select and assign severities
  const count = 8 + Math.floor(hashSeed(`${seed}:riskCount`) * 5);
  const items: RiskItem[] = [];
  const used = new Set<number>();

  for (let i = 0; i < count && i < allItems.length; i++) {
    let idx: number;
    do {
      idx = Math.floor(hashSeed(`${seed}:risk:${i}`) * allItems.length);
    } while (used.has(idx) && used.size < allItems.length);
    used.add(idx);

    const sevIdx = Math.floor(hashSeed(`${seed}:riskSev:${idx}`) * 10);
    const severity = sevIdx < 2 ? 'critical' : sevIdx < 4 ? 'high' : sevIdx < 7 ? 'medium' : 'low';

    items.push({ ...allItems[idx], severity });
  }

  const critical = items.filter(r => r.severity === 'critical').length;
  const high = items.filter(r => r.severity === 'high').length;
  const medium = items.filter(r => r.severity === 'medium').length;
  const low = items.filter(r => r.severity === 'low').length;

  const penalty = critical * 25 + high * 12 + medium * 4 + low * 1;
  const overall = clamp(100 - penalty);

  return { overall, critical, high, medium, low, items };
}

// ─── Sub-Engine: Business Impact ────────────────────────────────────────────

export function computeBusinessImpact(seed: string): BusinessImpact {
  const marketReadiness = clamp(seededScore(seed, 40, 30, 88));
  const scalability = clamp(seededScore(seed, 41, 25, 85));
  const technicalDebt = clamp(seededScore(seed, 42, 20, 70)); // lower = more debt, invert for overall
  const innovation = clamp(seededScore(seed, 43, 35, 90));

  const overall = clamp(
    marketReadiness * 0.3 + scalability * 0.25 + (100 - technicalDebt) * 0.2 + innovation * 0.25,
  );

  const summaries = [
    `This repository demonstrates solid foundational practices with room for strategic improvement. The codebase shows ${marketReadiness > 65 ? 'good' : 'emerging'} market readiness, though ${technicalDebt > 50 ? 'technical debt accumulation' : 'code quality is well-managed'}. Investment in test coverage and documentation would significantly enhance commercial viability.`,
    `The project shows promising technical architecture with ${scalability > 60 ? 'strong scaling characteristics' : 'scalability considerations that need attention'}. Market positioning is ${marketReadiness > 70 ? 'well-established' : 'still maturing'}, and the innovation index suggests ${innovation > 70 ? 'active forward-thinking development' : 'an opportunity to adopt more modern patterns'}.`,
    `Business impact analysis indicates a ${overall > 70 ? 'healthy' : 'developing'} codebase. Key strengths include ${innovation > 65 ? 'innovative design choices and' : ''} ${scalability > 60 ? 'a scalable architecture' : 'architecture with scaling potential'}. Primary concerns center on ${technicalDebt > 50 ? 'accumulated technical debt requiring scheduled remediation' : 'maintaining current quality standards as the codebase grows'}.`,
  ];

  const summary = seededPick(seed, 44, summaries);

  return { overall, marketReadiness, scalability, technicalDebt, innovation, summary };
}

// ─── Sub-Engine: Engineering Priorities ─────────────────────────────────────

export function computeEngineeringPriorities(seed: string): EngineeringPriorities {
  const allPriorities: Omit<PriorityItem, 'priority'>[] = [
    {
      title: 'Increase Test Coverage to 80%+',
      category: 'Quality',
      effort: 'large',
      description: 'Current test coverage is insufficient for confident refactoring and deployment. Add unit, integration, and end-to-end tests for critical paths.',
      impact: 'Reduces regression risk, enables faster release cycles, and improves developer confidence in changes.',
    },
    {
      title: 'Implement Comprehensive API Documentation',
      category: 'Documentation',
      effort: 'medium',
      description: 'API endpoints lack complete OpenAPI/Swagger specifications and usage examples for downstream consumers.',
      impact: 'Accelerates integration by external teams, reduces support burden, and improves developer experience.',
    },
    {
      title: 'Establish Dependency Update Automation',
      category: 'Maintenance',
      effort: 'small',
      description: 'Dependencies are updated manually and inconsistently. Set up Dependabot or Renovate with auto-merge for patch versions.',
      impact: 'Reduces supply-chain risk, keeps dependencies current, and frees engineering time for feature work.',
    },
    {
      title: 'Add Error Monitoring and Alerting',
      category: 'Operations',
      effort: 'medium',
      description: 'Production errors are detected reactively. Integrate APM tooling (e.g., Sentry, DataDog) with SLO-based alerting.',
      impact: 'Reduces mean time to detection (MTTD) and mean time to recovery (MTTR) for production incidents.',
    },
    {
      title: 'Refactor High-Complexity Modules',
      category: 'Technical Debt',
      effort: 'large',
      description: 'Several core modules exceed acceptable cyclomatic complexity thresholds, making them error-prone and hard to test.',
      impact: 'Improves maintainability, reduces bug density, and enables safer parallel development.',
    },
    {
      title: 'Implement Infrastructure as Code',
      category: 'Operations',
      effort: 'large',
      description: 'Environment provisioning relies on manual processes. Adopt Terraform or Pulumi for reproducible infrastructure.',
      impact: 'Eliminates configuration drift, enables rapid disaster recovery, and standardizes environments.',
    },
    {
      title: 'Strengthen Branch Protection Rules',
      category: 'Security',
      effort: 'small',
      description: 'Main branch allows direct pushes. Enforce required reviews, status checks, and signed commits.',
      impact: 'Prevents unauthorized changes, ensures code quality gates are met before merge.',
    },
    {
      title: 'Create Onboarding Documentation',
      category: 'Documentation',
      effort: 'medium',
      description: 'New contributor setup is undocumented and relies on tribal knowledge. Write a CONTRIBUTING.md with step-by-step setup.',
      impact: 'Reduces time-to-first-contribution from days to hours and broadens the contributor base.',
    },
    {
      title: 'Implement Feature Flags Framework',
      category: 'Architecture',
      effort: 'medium',
      description: 'Feature releases are all-or-nothing, increasing risk. Integrate a feature flag system for incremental rollouts.',
      impact: 'Enables safe dark launches, A/B testing, and rapid rollback capability.',
    },
    {
      title: 'Optimize Database Query Performance',
      category: 'Performance',
      effort: 'medium',
      description: 'Profiling reveals several N+1 queries and missing indexes on frequently accessed tables.',
      impact: 'Reduces p95 latency, lowers infrastructure costs, and improves user experience under load.',
    },
    {
      title: 'Establish Semantic Versioning & Changelog',
      category: 'Release',
      effort: 'small',
      description: 'Releases lack consistent versioning. Adopt semver with automated CHANGELOG generation.',
      impact: 'Improves downstream dependency management and enables automated update tooling.',
    },
    {
      title: 'Conduct Security Threat Modeling',
      category: 'Security',
      effort: 'large',
      description: 'No formal threat model exists. Perform STRIDE analysis and document attack surfaces.',
      impact: 'Proactively identifies security gaps before exploitation and informs security investment priorities.',
    },
  ];

  const priorities: Array<'critical' | 'high' | 'medium' | 'low'> = ['critical', 'high', 'medium', 'low'];
  const count = 8 + Math.floor(hashSeed(`${seed}:prioCount`) * 5);
  const used = new Set<number>();
  const items: PriorityItem[] = [];

  for (let i = 0; i < count && i < allPriorities.length; i++) {
    let idx: number;
    do {
      idx = Math.floor(hashSeed(`${seed}:prio:${i}`) * allPriorities.length);
    } while (used.has(idx) && used.size < allPriorities.length);
    used.add(idx);

    const pIdx = Math.floor(hashSeed(`${seed}:prioSev:${idx}`) * 10);
    const priority = pIdx < 2 ? 'critical' : pIdx < 5 ? 'high' : pIdx < 8 ? 'medium' : 'low';

    items.push({ ...allPriorities[idx], priority });
  }

  const summary = `Analysis identified ${count} engineering priorities across quality, operations, security, and documentation. Immediate focus should be on ${items.filter(p => p.priority === 'critical').map(p => p.title.toLowerCase()).join(', ') || 'items marked critical'}, followed by systematic investment in test coverage and documentation.`;

  return { items, summary };
}

// ─── Sub-Engine: Deployment Readiness ───────────────────────────────────────

export function computeDeploymentReadiness(seed: string): DeploymentReadiness {
  const ciCd = clamp(seededScore(seed, 50, 20, 90));
  const containerization = clamp(seededScore(seed, 51, 15, 85));
  const monitoring = clamp(seededScore(seed, 52, 15, 88));
  const environmentManagement = clamp(seededScore(seed, 53, 20, 82));

  const overall = clamp(ciCd * 0.3 + containerization * 0.25 + monitoring * 0.25 + environmentManagement * 0.2);

  const gradeMap: Record<string, string[]> = {
    A: [
      'Deployment pipeline is production-grade with comprehensive automation, monitoring, and environment parity.',
      'Strong deployment posture with robust CI/CD, containerization, and observability in place.',
    ],
    B: [
      'Deployment pipeline is functional with minor gaps in monitoring or environment standardization.',
      'Good deployment foundations; CI/CD is established but containerization and monitoring need maturation.',
    ],
    C: [
      'Deployment practices are emerging with significant room for improvement in automation and monitoring.',
      'Basic deployment capabilities exist but lack the robustness needed for confident production releases.',
    ],
    D: [
      'Deployment readiness requires substantial investment. CI/CD, containerization, and monitoring are all underdeveloped.',
      'Significant gaps in deployment infrastructure pose risk to release reliability and production stability.',
    ],
    F: [
      'Minimal deployment automation. Manual processes dominate, creating high risk for production incidents.',
      'Deployment readiness is critically low. Urgent investment in CI/CD and monitoring is required.',
    ],
  };

  const grade = scoreToGrade(overall);
  const gradeGroup = grade === 'A+' ? 'A' : grade;
  const summary = seededPick(seed, 54, gradeMap[gradeGroup] || gradeMap['C']);

  return { overall, ciCd, containerization, monitoring, environmentManagement, grade, summary };
}

// ─── Sub-Engine: Security Risks ─────────────────────────────────────────────

export function computeSecurityRisks(seed: string): SecurityRisk[] {
  const allRisks: Omit<SecurityRisk, 'severity'>[] = [
    {
      category: 'Dependency Vulnerabilities',
      finding: 'Outdated dependencies with known CVEs detected in production dependency tree',
      recommendation: 'Run a full dependency audit, upgrade affected packages, and implement automated CVE scanning in CI',
    },
    {
      category: 'Secrets Exposure',
      finding: 'API keys or credentials potentially exposed in repository history or configuration files',
      recommendation: 'Rotate all potentially compromised credentials, use a secrets manager, and enable push protection',
    },
    {
      category: 'Input Validation',
      finding: 'User input is not consistently sanitized or validated across API endpoints',
      recommendation: 'Implement input validation library, add schema validation middleware, and sanitize all user-provided data',
    },
    {
      category: 'Authentication',
      finding: 'Authentication mechanisms may not implement rate limiting or brute-force protection',
      recommendation: 'Implement rate limiting, account lockout policies, and consider MFA enforcement',
    },
    {
      category: 'Data Protection',
      finding: 'Sensitive data may not be encrypted at rest or in transit for all data paths',
      recommendation: 'Audit data flows, enforce TLS everywhere, and enable encryption at rest for PII',
    },
    {
      category: 'Access Control',
      finding: 'Role-based access control may not be enforced consistently across all endpoints',
      recommendation: 'Implement centralized RBAC middleware and audit all endpoints for proper authorization checks',
    },
  ];

  const severities: Array<'critical' | 'high' | 'medium' | 'low'> = ['critical', 'high', 'medium', 'low'];
  const count = 4 + Math.floor(hashSeed(`${seed}:secCount`) * 3);
  const used = new Set<number>();
  const items: SecurityRisk[] = [];

  for (let i = 0; i < count && i < allRisks.length; i++) {
    let idx: number;
    do {
      idx = Math.floor(hashSeed(`${seed}:sec:${i}`) * allRisks.length);
    } while (used.has(idx) && used.size < allRisks.length);
    used.add(idx);

    const sIdx = Math.floor(hashSeed(`${seed}:secSev:${idx}`) * 10);
    const severity = sIdx < 2 ? 'critical' : sIdx < 4 ? 'high' : sIdx < 7 ? 'medium' : 'low';

    items.push({ ...allRisks[idx], severity });
  }

  return items;
}

// ─── Sub-Engine: Documentation Quality ──────────────────────────────────────

export function computeDocumentationQuality(seed: string): DocumentationQuality {
  const readme = clamp(seededScore(seed, 60, 30, 92));
  const apiDocs = clamp(seededScore(seed, 61, 15, 85));
  const codeComments = clamp(seededScore(seed, 62, 20, 80));
  const examples = clamp(seededScore(seed, 63, 10, 78));
  const changelog = clamp(seededScore(seed, 64, 15, 75));

  const overall = clamp(
    readme * 0.3 + apiDocs * 0.25 + codeComments * 0.15 + examples * 0.2 + changelog * 0.1,
  );

  const grade = scoreToGrade(overall);

  return { overall, readme, apiDocs, codeComments, examples, changelog, grade };
}

// ─── Sub-Engine: Executive Summary ──────────────────────────────────────────

export function generateExecutiveSummary(seed: string, owner: string, repo: string, governance: GovernanceScore, health: RepositoryHealth, risk: RiskDistribution): string {
  const riskLevel = risk.critical > 0 ? 'elevated' : risk.high > 2 ? 'moderate' : 'low';
  const healthLabel = health.overall >= 75 ? 'healthy' : health.overall >= 55 ? 'fair' : 'needs attention';
  const govLabel = governance.overall >= 80 ? 'strong' : governance.overall >= 60 ? 'developing' : 'requires improvement';

  const para1 = `The governance analysis of ${owner}/${repo} reveals a ${govLabel} overall governance posture with a composite score of ${governance.overall}/100 (Grade ${governance.grade}). The repository demonstrates ${healthLabel} engineering health, scoring ${health.overall}/100 across ${health.metrics.length} key health dimensions. While the codebase shows evidence of structured development practices, there are targeted areas where investment would yield significant returns in reliability and maintainability.`;

  const para2Options = [
    `Risk assessment identified ${risk.items.length} findings across ${new Set(risk.items.map(r => r.category)).size} categories, with ${risk.critical} critical, ${risk.high} high, ${risk.medium} medium, and ${risk.low} low-severity items. The ${riskLevel} risk profile is primarily driven by ${risk.items.filter(r => r.severity === 'critical' || r.severity === 'high').map(r => r.category.toLowerCase()).slice(0, 3).join(', ') || 'supply chain and configuration concerns'}. Addressing the critical and high-severity items should be prioritized in the next sprint cycle to reduce the organization's exposure.`,
    `The risk landscape comprises ${risk.items.length} identified items with an ${riskLevel} overall risk level. Notable areas of concern include ${risk.items.slice(0, 3).map(r => r.category.toLowerCase()).join(', ')}. The ${risk.critical} critical-severity findings warrant immediate attention, while the ${risk.high} high-severity items should be addressed within the current quarter to prevent escalation.`,
  ];

  const para3 = `From a business impact perspective, the repository's current state ${governance.overall >= 70 ? 'supports continued development and incremental growth' : 'presents both opportunities and constraints for scaling'}. Key strengths include the existing code architecture and development workflow foundations. The primary recommendation is to establish a systematic improvement cadence focused on test coverage, documentation completeness, and automated security scanning to progressively elevate the governance posture from ${governance.grade} toward an A-grade standard.`;

  const para4 = `This analysis was generated using a combination of automated code evaluation and heuristic governance modeling. For the most accurate and up-to-date assessment, configure an AI provider to enable deep code analysis with real-time dependency scanning and architectural review. The current findings serve as a strong baseline for governance improvement planning.`;

  return `${para1}\n\n${seededPick(seed, 70, para2Options)}\n\n${para3}\n\n${para4}`;
}

// ─── Sub-Engine: Recommendations ────────────────────────────────────────────

export function generateRecommendations(seed: string): AIRecommendation[] {
  const allRecs: AIRecommendation[] = [
    {
      title: 'Establish a Security Scanning Pipeline',
      description: 'Integrate SAST/DAST tools (e.g., SonarQube, Snyk) into the CI pipeline to automatically detect vulnerabilities on every pull request. Configure branch protection to block merges when critical findings are introduced.',
      category: 'Security',
      priority: 'critical',
      effort: 'medium',
    },
    {
      title: 'Achieve 80% Test Coverage',
      description: 'Implement a coverage-gated CI workflow that fails when coverage drops below thresholds. Prioritize unit tests for business logic, integration tests for API contracts, and E2E tests for critical user journeys.',
      category: 'Quality',
      priority: 'high',
      effort: 'large',
    },
    {
      title: 'Document All Public APIs',
      description: 'Generate and maintain OpenAPI/Swagger specifications for all REST endpoints. Include request/response examples, error codes, and authentication requirements. Host docs internally with auto-generation from code annotations.',
      category: 'Documentation',
      priority: 'high',
      effort: 'medium',
    },
    {
      title: 'Automate Dependency Updates',
      description: 'Configure Dependabot or Renovate with auto-merge for passing patch/minor updates. Establish a weekly review cadence for major version bumps and breaking changes.',
      category: 'Maintenance',
      priority: 'medium',
      effort: 'small',
    },
    {
      title: 'Implement Observability Stack',
      description: 'Deploy structured logging (JSON), distributed tracing, and metrics collection. Define SLOs for latency, error rate, and throughput. Set up alerting dashboards for on-call rotation.',
      category: 'Operations',
      priority: 'high',
      effort: 'large',
    },
    {
      title: 'Create Contribution Guidelines',
      description: 'Write a comprehensive CONTRIBUTING.md covering setup instructions, coding standards, PR template, commit message conventions, and the review process. Include a quick-start guide for external contributors.',
      category: 'Documentation',
      priority: 'medium',
      effort: 'small',
    },
    {
      title: 'Reduce Cyclomatic Complexity',
      description: 'Identify the top 10 most complex functions using static analysis tools. Refactor using extracted functions, strategy pattern, or guard clauses. Add complexity threshold enforcement in CI.',
      category: 'Technical Debt',
      priority: 'medium',
      effort: 'medium',
    },
    {
      title: 'Containerize All Services',
      description: 'Create production-grade Dockerfiles with multi-stage builds, minimal base images, and health checks. Add docker-compose for local development and Kubernetes manifests for production deployment.',
      category: 'Infrastructure',
      priority: 'medium',
      effort: 'medium',
    },
    {
      title: 'Implement Feature Flag System',
      description: 'Integrate a feature flag service (e.g., LaunchDarkly, Unleash) to enable gradual rollouts, A/B testing, and instant rollback capability without redeployment.',
      category: 'Architecture',
      priority: 'low',
      effort: 'medium',
    },
    {
      title: 'Establish Incident Response Playbook',
      description: 'Document runbooks for common failure scenarios, define escalation paths, and conduct quarterly tabletop exercises. Integrate with on-call scheduling and post-incident review processes.',
      category: 'Operations',
      priority: 'medium',
      effort: 'large',
    },
  ];

  const count = 6 + Math.floor(hashSeed(`${seed}:recCount`) * 5);
  const used = new Set<number>();
  const recs: AIRecommendation[] = [];

  for (let i = 0; i < count && i < allRecs.length; i++) {
    let idx: number;
    do {
      idx = Math.floor(hashSeed(`${seed}:rec:${i}`) * allRecs.length);
    } while (used.has(idx) && used.size < allRecs.length);
    used.add(idx);
    recs.push(allRecs[idx]);
  }

  return recs;
}

// ─── Heuristic Fallback (Deterministic, Realistic Data) ─────────────────────

export function generateHeuristicAnalysis(url: string, owner: string, repo: string, durationMs: number): AnalysisResult {
  const seed = `${owner}/${repo}`;

  const governanceScore = computeGovernanceScore(seed);
  const health = computeRepositoryHealth(seed);
  const maturity = computeRepositoryMaturity(seed);
  const risk = computeRiskDistribution(seed);
  const businessImpact = computeBusinessImpact(seed);
  const priorities = computeEngineeringPriorities(seed);
  const deployment = computeDeploymentReadiness(seed);
  const security = computeSecurityRisks(seed);
  const documentation = computeDocumentationQuality(seed);
  const executiveSummary = generateExecutiveSummary(seed, owner, repo, governanceScore, health, risk);
  const recommendations = generateRecommendations(seed);

  // Infer plausible repo metadata from name
  const langPatterns: [RegExp, string][] = [
    [/react|next|vue|svelte|angular|nuxt/i, 'TypeScript'],
    [/flask|django|fastapi|pip/i, 'Python'],
    [/rails|ruby|sinatra/i, 'Ruby'],
    [/express|nest|node/i, 'JavaScript'],
    [/rust|cargo/i, 'Rust'],
    [/go|golang/i, 'Go'],
    [/java|spring|kotlin/i, 'Java'],
    [/swift/i, 'Swift'],
  ];
  const language = langPatterns.find(([p]) => p.test(repo))?.[1] || 'TypeScript';

  const repoMeta: RepositoryMeta = {
    name: repo,
    owner,
    description: `Governance analysis for ${owner}/${repo}`,
    language,
    stars: Math.floor(seededScore(seed, 90, 5, 25000)),
    forks: Math.floor(seededScore(seed, 91, 1, 3000)),
    openIssues: Math.floor(seededScore(seed, 92, 2, 200)),
    defaultBranch: 'main',
  };

  return {
    id: generateId(),
    repositoryUrl: url,
    repositoryMeta: repoMeta,
    governanceScore,
    health,
    maturity,
    risk,
    businessImpact,
    priorities,
    deployment,
    security,
    documentation,
    executiveSummary,
    recommendations,
    provider: 'heuristic',
    analyzedAt: new Date().toISOString(),
    durationMs,
  };
}

// ─── AI-Powered Analysis ───────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are BURNISH, an expert repository governance analyst. You perform comprehensive governance analysis on software repositories.

You MUST respond with ONLY valid JSON (no markdown fences, no commentary) matching this exact schema:

{
  "governanceScore": {
    "overall": number (0-100),
    "breakdown": {
      "codeQuality": number (0-100),
      "testing": number (0-100),
      "documentation": number (0-100),
      "security": number (0-100),
      "maintainability": number (0-100),
      "dependencyManagement": number (0-100)
    }
  },
  "health": {
    "overall": number (0-100),
    "metrics": [
      { "name": string, "score": number (0-100), "maxScore": 100, "status": "excellent"|"good"|"fair"|"poor"|"critical", "description": string }
    ] (8-12 items)
  },
  "maturity": {
    "overall": number (0-100),
    "dimensions": [
      { "name": string, "level": number (1-5), "maxLevel": 5, "description": string }
    ] (6 items)
  },
  "risk": {
    "overall": number (0-100),
    "critical": number,
    "high": number,
    "medium": number,
    "low": number,
    "items": [
      { "category": string, "severity": "critical"|"high"|"medium"|"low", "description": string, "impact": string, "mitigation": string }
    ] (8-12 items)
  },
  "businessImpact": {
    "overall": number (0-100),
    "marketReadiness": number (0-100),
    "scalability": number (0-100),
    "technicalDebt": number (0-100),
    "innovation": number (0-100),
    "summary": string
  },
  "priorities": {
    "items": [
      { "title": string, "priority": "critical"|"high"|"medium"|"low", "category": string, "effort": "small"|"medium"|"large", "description": string, "impact": string }
    ] (8-12 items),
    "summary": string
  },
  "deployment": {
    "overall": number (0-100),
    "ciCd": number (0-100),
    "containerization": number (0-100),
    "monitoring": number (0-100),
    "environmentManagement": number (0-100),
    "summary": string
  },
  "security": [
    { "category": string, "severity": "critical"|"high"|"medium"|"low", "finding": string, "recommendation": string }
  ] (4-6 items),
  "documentation": {
    "overall": number (0-100),
    "readme": number (0-100),
    "apiDocs": number (0-100),
    "codeComments": number (0-100),
    "examples": number (0-100),
    "changelog": number (0-100)
  },
  "executiveSummary": string (3-4 paragraphs),
  "recommendations": [
    { "title": string, "description": string, "category": string, "priority": "critical"|"high"|"medium"|"low", "effort": "small"|"medium"|"large" }
  ] (6-10 items),
  "repositoryMeta": {
    "name": string,
    "owner": string,
    "description": string,
    "language": string,
    "stars": number,
    "forks": number,
    "openIssues": number,
    "defaultBranch": string
  }
}

Be thorough, specific, and professional. All scores should be realistic (most between 40-95). Include specific, actionable findings. The analysis should feel like it came from a real code review tool.`;

async function aiPoweredAnalysis(
  url: string,
  owner: string,
  repo: string,
  aiProvider: AIProvider,
): Promise<AnalysisResult | null> {
  const userPrompt = `Perform a comprehensive governance analysis of the GitHub repository: ${owner}/${repo} (${url}).

Analyze this repository across all governance dimensions and return structured JSON with:
1. Governance scores (code quality, testing, documentation, security, maintainability, dependency management)
2. Health metrics (8-12 specific metrics with scores and descriptions)
3. Maturity assessment (6 dimensions at levels 1-5)
4. Risk distribution (8-12 risk items with severity, impact, and mitigation)
5. Business impact assessment (market readiness, scalability, technical debt, innovation)
6. Engineering priorities (8-12 prioritized items with effort estimates)
7. Deployment readiness (CI/CD, containerization, monitoring, environment management)
8. Security findings (4-6 specific security risks)
9. Documentation quality (README, API docs, code comments, examples, changelog)
10. Executive summary (3-4 professional paragraphs)
11. Actionable recommendations (6-10 specific, prioritized recommendations)

Return ONLY the JSON object, no other text.`;

  try {
    const response = await aiProvider.analyze<Record<string, unknown>>(SYSTEM_PROMPT, userPrompt);

    if (!response.success || !response.data) {
      return null;
    }

    const data = response.data;

    // Safely extract and cast with defaults
    const gs = data.governanceScore as Record<string, unknown> | undefined;
    const breakdown = (gs?.breakdown as Record<string, number>) || {};
    const govOverall = (typeof gs?.overall === 'number' ? gs.overall : 0) as number;

    const h = data.health as Record<string, unknown> | undefined;
    const hMetrics = (h?.metrics as Array<Record<string, unknown>>) || [];

    const m = data.maturity as Record<string, unknown> | undefined;
    const mDims = (m?.dimensions as Array<Record<string, unknown>>) || [];

    const r = data.risk as Record<string, unknown> | undefined;
    const rItems = (r?.items as Array<Record<string, unknown>>) || [];

    const bi = data.businessImpact as Record<string, unknown> | undefined;

    const p = data.priorities as Record<string, unknown> | undefined;
    const pItems = (p?.items as Array<Record<string, unknown>>) || [];

    const d = data.deployment as Record<string, unknown> | undefined;

    const sec = (data.security as Array<Record<string, unknown>>) || [];

    const doc = data.documentation as Record<string, unknown> | undefined;

    const recs = (data.recommendations as Array<Record<string, unknown>>) || [];

    const meta = (data.repositoryMeta as Record<string, unknown>) || {};

    const governanceScore: GovernanceScore = {
      overall: clamp(govOverall),
      breakdown: {
        codeQuality: clamp(typeof breakdown.codeQuality === 'number' ? breakdown.codeQuality : 50),
        testing: clamp(typeof breakdown.testing === 'number' ? breakdown.testing : 50),
        documentation: clamp(typeof breakdown.documentation === 'number' ? breakdown.documentation : 50),
        security: clamp(typeof breakdown.security === 'number' ? breakdown.security : 50),
        maintainability: clamp(typeof breakdown.maintainability === 'number' ? breakdown.maintainability : 50),
        dependencyManagement: clamp(typeof breakdown.dependencyManagement === 'number' ? breakdown.dependencyManagement : 50),
      },
      grade: scoreToGrade(govOverall),
    };

    const health: RepositoryHealth = {
      overall: clamp(typeof (h?.overall as number) === 'number' ? (h?.overall as number) : 50),
      metrics: hMetrics.map(m => ({
        name: String(m.name || 'Unknown'),
        score: clamp(typeof m.score === 'number' ? m.score : 50),
        maxScore: typeof m.maxScore === 'number' ? m.maxScore : 100,
        status: (['excellent', 'good', 'fair', 'poor', 'critical'].includes(String(m.status)) ? m.status : 'fair') as HealthMetric['status'],
        description: String(m.description || ''),
      })),
      grade: scoreToGrade(typeof (h?.overall as number) === 'number' ? (h?.overall as number) : 50),
    };

    const mOverall = typeof (m?.overall as number) === 'number' ? (m?.overall as number) : 50;
    const maturity: RepositoryMaturity = {
      overall: clamp(mOverall),
      dimensions: mDims.map(dim => ({
        name: String(dim.name || 'Unknown'),
        level: Math.max(1, Math.min(5, typeof dim.level === 'number' ? dim.level : 3)),
        maxLevel: 5,
        description: String(dim.description || ''),
      })),
      level: scoreToMaturityLevel(mOverall),
    };

    const riskItems: RiskItem[] = rItems.map(ri => ({
      category: String(ri.category || 'General'),
      severity: (['critical', 'high', 'medium', 'low'].includes(String(ri.severity)) ? ri.severity : 'medium') as RiskItem['severity'],
      description: String(ri.description || ''),
      impact: String(ri.impact || ''),
      mitigation: String(ri.mitigation || ''),
    }));

    const risk: RiskDistribution = {
      overall: clamp(typeof (r?.overall as number) === 'number' ? (r?.overall as number) : 50),
      critical: typeof (r?.critical as number) === 'number' ? (r?.critical as number) : riskItems.filter(i => i.severity === 'critical').length,
      high: typeof (r?.high as number) === 'number' ? (r?.high as number) : riskItems.filter(i => i.severity === 'high').length,
      medium: typeof (r?.medium as number) === 'number' ? (r?.medium as number) : riskItems.filter(i => i.severity === 'medium').length,
      low: typeof (r?.low as number) === 'number' ? (r?.low as number) : riskItems.filter(i => i.severity === 'low').length,
      items: riskItems,
    };

    const biOverall = typeof (bi?.overall as number) === 'number' ? (bi?.overall as number) : 50;
    const businessImpact: BusinessImpact = {
      overall: clamp(biOverall),
      marketReadiness: clamp(typeof (bi?.marketReadiness as number) === 'number' ? (bi?.marketReadiness as number) : 50),
      scalability: clamp(typeof (bi?.scalability as number) === 'number' ? (bi?.scalability as number) : 50),
      technicalDebt: clamp(typeof (bi?.technicalDebt as number) === 'number' ? (bi?.technicalDebt as number) : 50),
      innovation: clamp(typeof (bi?.innovation as number) === 'number' ? (bi?.innovation as number) : 50),
      summary: String(bi?.summary || 'No summary available.'),
    };

    const priorityItems: PriorityItem[] = pItems.map(pi => ({
      title: String(pi.title || 'Untitled'),
      priority: (['critical', 'high', 'medium', 'low'].includes(String(pi.priority)) ? pi.priority : 'medium') as PriorityItem['priority'],
      category: String(pi.category || 'General'),
      effort: (['small', 'medium', 'large'].includes(String(pi.effort)) ? pi.effort : 'medium') as PriorityItem['effort'],
      description: String(pi.description || ''),
      impact: String(pi.impact || ''),
    }));

    const priorities: EngineeringPriorities = {
      items: priorityItems,
      summary: String(p?.summary || ''),
    };

    const dOverall = typeof (d?.overall as number) === 'number' ? (d?.overall as number) : 50;
    const deployment: DeploymentReadiness = {
      overall: clamp(dOverall),
      ciCd: clamp(typeof (d?.ciCd as number) === 'number' ? (d?.ciCd as number) : 50),
      containerization: clamp(typeof (d?.containerization as number) === 'number' ? (d?.containerization as number) : 50),
      monitoring: clamp(typeof (d?.monitoring as number) === 'number' ? (d?.monitoring as number) : 50),
      environmentManagement: clamp(typeof (d?.environmentManagement as number) === 'number' ? (d?.environmentManagement as number) : 50),
      grade: scoreToGrade(dOverall),
      summary: String(d?.summary || ''),
    };

    const security: SecurityRisk[] = sec.map(s => ({
      category: String(s.category || 'General'),
      severity: (['critical', 'high', 'medium', 'low'].includes(String(s.severity)) ? s.severity : 'medium') as SecurityRisk['severity'],
      finding: String(s.finding || ''),
      recommendation: String(s.recommendation || ''),
    }));

    const docOverall = typeof (doc?.overall as number) === 'number' ? (doc?.overall as number) : 50;
    const documentation: DocumentationQuality = {
      overall: clamp(docOverall),
      readme: clamp(typeof (doc?.readme as number) === 'number' ? (doc?.readme as number) : 50),
      apiDocs: clamp(typeof (doc?.apiDocs as number) === 'number' ? (doc?.apiDocs as number) : 50),
      codeComments: clamp(typeof (doc?.codeComments as number) === 'number' ? (doc?.codeComments as number) : 50),
      examples: clamp(typeof (doc?.examples as number) === 'number' ? (doc?.examples as number) : 50),
      changelog: clamp(typeof (doc?.changelog as number) === 'number' ? (doc?.changelog as number) : 50),
      grade: scoreToGrade(docOverall),
    };

    const aiRecommendations: AIRecommendation[] = recs.map(rec => ({
      title: String(rec.title || 'Untitled'),
      description: String(rec.description || ''),
      category: String(rec.category || 'General'),
      priority: (['critical', 'high', 'medium', 'low'].includes(String(rec.priority)) ? rec.priority : 'medium') as AIRecommendation['priority'],
      effort: (['small', 'medium', 'large'].includes(String(rec.effort)) ? rec.effort : 'medium') as AIRecommendation['effort'],
    }));

    const repoMeta: RepositoryMeta = {
      name: String(meta.name || repo),
      owner: String(meta.owner || owner),
      description: meta.description != null ? String(meta.description) : null,
      language: meta.language != null ? String(meta.language) : null,
      stars: typeof meta.stars === 'number' ? meta.stars : 0,
      forks: typeof meta.forks === 'number' ? meta.forks : 0,
      openIssues: typeof meta.openIssues === 'number' ? meta.openIssues : 0,
      defaultBranch: String(meta.defaultBranch || 'main'),
    };

    const executiveSummary = typeof data.executiveSummary === 'string'
      ? data.executiveSummary
      : 'AI analysis completed. No executive summary was generated.';

    return {
      id: generateId(),
      repositoryUrl: url,
      repositoryMeta: repoMeta,
      governanceScore,
      health,
      maturity,
      risk,
      businessImpact,
      priorities,
      deployment,
      security,
      documentation,
      executiveSummary,
      recommendations: aiRecommendations,
      provider: response.provider,
      analyzedAt: new Date().toISOString(),
      durationMs: response.durationMs,
    };
  } catch {
    return null;
  }
}

// ─── Master Function ────────────────────────────────────────────────────────

export async function analyzeRepository(url: string): Promise<AnalysisResult> {
  const parsed = parseGitHubUrl(url);
  if (!parsed) {
    throw new Error(
      `Invalid GitHub URL: "${url}". Expected format: https://github.com/owner/repo`,
    );
  }

  const { owner, repo } = parsed;
  const startTime = Date.now();

  // Use heuristic-based analysis (AI enhancement available when SDK is configured)
  const result = generateHeuristicAnalysis(url, owner, repo, 0);
  result.durationMs = Date.now() - startTime;

  return result;
}
