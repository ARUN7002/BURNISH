import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { DocumentationQuality } from '@/lib/types';
import { cn } from '@/lib/utils';

function getDocColor(score: number): string {
  if (score >= 85) return 'oklch(0.7 0.18 150)';
  if (score >= 70) return 'oklch(0.8 0.18 90)';
  if (score >= 50) return 'oklch(0.85 0.18 70)';
  return 'oklch(0.7 0.2 25)';
}

type DocBarProps = {
  label: string;
  score: number;
};

function DocBar({ label, score }: DocBarProps) {
  const color = getDocColor(score);
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span>{label}</span>
        <span className="font-semibold tabular-nums">{score}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className={cn('h-full rounded-full transition-all duration-700')}
          style={{ width: `${score}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

export function DocumentationQualityChart({ documentation }: { documentation: DocumentationQuality }) {
  const bars: DocBarProps[] = [
    { label: 'README', score: documentation.readme },
    { label: 'API Docs', score: documentation.apiDocs },
    { label: 'Code Comments', score: documentation.codeComments },
    { label: 'Examples', score: documentation.examples },
    { label: 'Changelog', score: documentation.changelog },
  ];

  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Documentation Quality</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {bars.map((bar) => (
          <DocBar key={bar.label} label={bar.label} score={bar.score} />
        ))}
      </CardContent>
    </Card>
  );
}
