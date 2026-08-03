'use client';

import { useState, useCallback } from 'react';
import type { AnalysisResult } from '@/lib/types';

interface UseAnalysisReturn {
  result: AnalysisResult | null;
  isLoading: boolean;
  error: string | null;
  recentAnalyses: RecentAnalysis[];
  analyze: (url: string) => Promise<void>;
  fetchRecent: () => Promise<void>;
  reset: () => void;
}

interface RecentAnalysis {
  id: string;
  repository: { name: string; owner: string; url: string; language: string | null; stars: number };
  governanceScore: number | null;
  healthScore: number | null;
  maturityScore: number | null;
  deploymentScore: number | null;
  status: string;
  provider: string;
  durationMs: number | null;
  createdAt: string;
}

export function useAnalysis(): UseAnalysisReturn {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recentAnalyses, setRecentAnalyses] = useState<RecentAnalysis[]>([]);

  const analyze = useCallback(async (url: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Analysis failed');
      }

      setResult(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchRecent = useCallback(async () => {
    try {
      const response = await fetch('/api/analysis');
      const data = await response.json();
      if (data.success) {
        setRecentAnalyses(data.data);
      }
    } catch {
      // Silently fail for recent analyses
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { result, isLoading, error, recentAnalyses, analyze, fetchRecent, reset };
}
