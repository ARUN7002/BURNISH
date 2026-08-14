import { useState, useCallback } from 'react';
import { analyzeRepository, fetchRecentAnalyses, type RecentAnalysisItem } from '@/lib/api';
import type { AnalysisResult } from '@/lib/types';

type UseAnalysisReturn = {
  result: AnalysisResult | null;
  isLoading: boolean;
  error: string | null;
  recentAnalyses: RecentAnalysisItem[];
  analyze: (url: string) => Promise<void>;
  fetchRecent: () => Promise<void>;
  reset: () => void;
};

export function useAnalysis(): UseAnalysisReturn {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recentAnalyses, setRecentAnalyses] = useState<RecentAnalysisItem[]>([]);

  const analyze = useCallback(async (url: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await analyzeRepository(url);
      setResult(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Analysis failed';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchRecent = useCallback(async () => {
    try {
      const data = await fetchRecentAnalyses();
      setRecentAnalyses(data);
    } catch {
      // silently fail for recent analyses
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return { result, isLoading, error, recentAnalyses, analyze, fetchRecent, reset };
}
