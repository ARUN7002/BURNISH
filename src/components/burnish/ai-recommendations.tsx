import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { AIRecommendation } from '@/lib/types';
import { cn } from '@/lib/utils';

function priorityColor(priority: string): string {
  switch (priority) {
    case 'critical':
      return 'bg-red-500/15 text-red-400 border-red-500/30';
    case 'high':
      return 'bg-orange-500/15 text-orange-400 border-orange-500/30';
    case 'medium':
      return 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30';
    default:
      return 'bg-green-500/15 text-green-400 border-green-500/30';
  }
}

function effortColor(effort: string): string {
  switch (effort) {
    case 'large':
      return 'bg-red-500/10 text-red-400 border-red-500/20';
    case 'medium':
      return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
    default:
      return 'bg-green-500/10 text-green-400 border-green-500/20';
  }
}

function categoryColor(category: string): string {
  const lower = category.toLowerCase();
  if (lower.includes('security')) return 'bg-red-500/10 text-red-400 border-red-500/20';
  if (lower.includes('test')) return 'bg-green-500/10 text-green-400 border-green-500/20';
  if (lower.includes('doc')) return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
  if (lower.includes('perf')) return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
  return 'bg-secondary text-muted-foreground border-border';
}

function RecCard({ rec }: { rec: AIRecommendation }) {
  return (
    <div className="rounded-lg border border-border bg-background/50 p-4 space-y-2">
      <div className="flex flex-wrap items-center gap-1.5">
        <Badge variant="outline" className={cn('text-[10px] px-1.5 py-0', priorityColor(rec.priority))}>
          {rec.priority}
        </Badge>
        <Badge variant="outline" className={cn('text-[10px] px-1.5 py-0', effortColor(rec.effort))}>
          {rec.effort}
        </Badge>
        <Badge variant="outline" className={cn('text-[10px] px-1.5 py-0', categoryColor(rec.category))}>
          {rec.category}
        </Badge>
      </div>
      <h4 className="text-sm font-semibold">{rec.title}</h4>
      <p className="text-xs text-muted-foreground leading-relaxed">{rec.description}</p>
    </div>
  );
}

export function AIRecommendations({ recommendations }: { recommendations: AIRecommendation[] }) {
  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">AI Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((rec, i) => (
            <RecCard key={i} rec={rec} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
