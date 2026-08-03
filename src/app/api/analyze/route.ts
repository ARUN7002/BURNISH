import { NextRequest, NextResponse } from 'next/server';
import { generateHeuristicAnalysis, parseGitHubUrl } from '@/lib/analysis/governance-engine';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ success: false, error: 'URL required' }, { status: 400 });
    }

    const githubPattern = /^https?:\/\/(www\.)?github\.com\/[^/]+\/[^/]+/;
    if (!githubPattern.test(url)) {
      return NextResponse.json({ success: false, error: 'Invalid GitHub URL' }, { status: 400 });
    }

    const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!match) {
      return NextResponse.json({ success: false, error: 'Could not parse' }, { status: 400 });
    }

    const owner = match[1];
    const repoName = match[2].replace(/\.git$/, '').split('/')[0];

    // Parse and run analysis
    const parsed = parseGitHubUrl(url);
    if (!parsed) {
      return NextResponse.json({ success: false, error: 'Parse failed' }, { status: 400 });
    }

    console.log('[analyze] Calling generateHeuristicAnalysis...');
    const result = generateHeuristicAnalysis(url, parsed.owner, parsed.repo, 0);
    console.log('[analyze] Done. Keys:', Object.keys(result));

    // Store in DB (non-blocking)
    db.repository.upsert({
      where: { url },
      update: {},
      create: {
        url, name: repoName, owner,
        description: result.repositoryMeta.description,
        language: result.repositoryMeta.language,
        stars: result.repositoryMeta.stars,
        forks: result.repositoryMeta.forks,
        openIssues: result.repositoryMeta.openIssues,
        analyses: {
          create: {
            governanceScore: result.governanceScore.overall,
            healthScore: result.health.overall,
            maturityScore: result.maturity.overall,
            deploymentScore: result.deployment.overall,
            overallRisk: result.risk.overall,
            governanceDetail: JSON.stringify(result),
            status: 'completed',
            durationMs: result.durationMs,
            provider: result.provider,
          },
        },
      },
    }).catch((e) => console.error('[analyze] DB error:', e));

    return NextResponse.json({ success: true, cached: false, data: result });
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed' },
      { status: 500 }
    );
  }
}
