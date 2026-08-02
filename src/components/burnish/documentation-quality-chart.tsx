'use client';

import { FileText } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { DocumentationQuality } from '@/lib/types';

interface DocBar {
  label: string;
  score: number;
  color: string;
}

function getBarColor(score: number): string {
  if (score >= 80) return 'bg-green-500';
  if (score >= 60) return 'bg-blue-500';
  if (score >= 40) return 'bg-yellow-500';
  return 'bg-red-500';
}

interface DocumentationQualityChartProps {
  doc: DocumentationQuality;
}

export function DocumentationQualityChart({ doc }: DocumentationQualityChartProps) {
  const bars: DocBar[] = [
    { label: 'README', score: doc.readme, color: getBarColor(doc.readme) },
    { label: 'API Docs', score: doc.apiDocs, color: getBarColor(doc.apiDocs) },
    { label: 'Code Comments', score: doc.codeComments, color: getBarColor(doc.codeComments) },
    { label: 'Examples', score: doc.examples, color: getBarColor(doc.examples) },
    { label: 'Changelog', score: doc.changelog, color: getBarColor(doc.changelog) },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Documentation Quality
        </CardTitle>
      </CardHeader>
      <div className="space-y-4 px-6 pb-6">
        {bars.map((bar) => (
          <div key={bar.label} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{bar.label}</span>
              <span className="text-sm font-medium tabular-nums">{bar.score}%</span>
            </div>
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-primary/20">
              <div
                className={`h-full rounded-full transition-all ${bar.color}`}
                style={{ width: `${bar.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
