import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const analyses = await db.analysis.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
      include: { repository: true },
    });

    return NextResponse.json({
      success: true,
      data: analyses.map(a => ({
        id: a.id,
        repository: {
          name: a.repository.name,
          owner: a.repository.owner,
          url: a.repository.url,
          language: a.repository.language,
          stars: a.repository.stars,
        },
        governanceScore: a.governanceScore,
        healthScore: a.healthScore,
        maturityScore: a.maturityScore,
        deploymentScore: a.deploymentScore,
        status: a.status,
        provider: a.provider,
        durationMs: a.durationMs,
        createdAt: a.createdAt,
      })),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analyses' },
      { status: 500 }
    );
  }
}
