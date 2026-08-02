'use client';

import { FileText } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

interface ExecutiveSummaryProps {
  summary: string;
  repositoryUrl: string;
}

export function ExecutiveSummary({ summary, repositoryUrl }: ExecutiveSummaryProps) {
  const paragraphs = summary.split('\n').filter((p) => p.trim().length > 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Executive Summary
        </CardTitle>
      </CardHeader>
      <div className="px-6 pb-6">
        {paragraphs.map((paragraph, index) => (
          <p
            key={index}
            className="text-sm text-muted-foreground leading-relaxed mb-3 last:mb-0"
          >
            {paragraph.trim()}
          </p>
        ))}
      </div>
    </Card>
  );
}
