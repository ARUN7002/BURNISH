import axios from 'axios';
import type { AnalysisResult } from '@/lib/types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 120000,
  headers: { 'Content-Type': 'application/json' },
});

export interface RecentAnalysisItem {
  id: string;
  repository: { name: string; owner: string; url: string; language: string | null; stars: number };
  governanceScore: number | null; healthScore: number | null; maturityScore: number | null;
  deploymentScore: number | null; status: string; provider: string; durationMs: number | null; createdAt: string;
}

export async function analyzeRepository(url: string): Promise<AnalysisResult> {
  const res = await api.post<{ success: boolean; data: AnalysisResult; error?: string }>('/analyze', { url });
  if (!res.data.success) throw new Error(res.data.error || 'Analysis failed');
  return res.data.data;
}

export async function fetchRecentAnalyses(): Promise<RecentAnalysisItem[]> {
  const res = await api.get<{ success: boolean; data: RecentAnalysisItem[] }>('/analysis');
  return res.data.success ? res.data.data : [];
}

export default api;
