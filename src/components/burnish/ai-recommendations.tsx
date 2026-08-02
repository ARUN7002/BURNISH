'use client';

import { Sparkles } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { AIRecommendation } from '@/lib/types';

const priorityColorMap: Record<string, string> = {
  critical: 'border-red-500 text-red-600 bg-red-50 dark:bg-red-950 dark:text-red-400',
  high: 'border-orange-500 text-orange-600 bg-orange-50 dark:bg-orange-950 dark:text-orange-400',
  medium: 'border-yellow-500 text-yellow-600 bg-yellow-50 dark:bg-yellow-950 dark:text-yellow-400',
  low: 'border-green-500 text-green-600 bg-green-50 dark:bg-green-950 dark:text-green-400',
};

const effortColorMap: Record<string, string> = {
  small: 'border-emerald-500 text-emerald-600 bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-400',
  medium: 'border-amber-500 text-amber-600 bg-amber-50 dark:bg-amber-950 dark:text-amber-400',
  large: 'border-rose-500 text-rose-600 bg-rose-50 dark:bg-rose-950 dark:text-rose-400',
};

interface AIRecommendationsProps {
  recommendations: AIRecommendation[];
}

export function AIRecommendations({ recommendations }: AIRecommendationsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          AI Recommendations
        </CardTitle>
      </CardHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-6 pb-6">
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className="rounded-lg border p-4 space-y-3"
          >
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className={priorityColorMap[rec.priority]}>
                {rec.priority}
              </Badge>
              <Badge variant="outline" className={effortColorMap[rec.effort]}>
                {rec.effort}
              </Badge>
              <Badge variant="outline">{rec.category}</Badge>
            </div>
            <h4 className="font-medium text-sm">{rec.title}</h4>
            <p className="text-xs text-muted-foreground">{rec.description}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
