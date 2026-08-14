import { useState } from 'react';
import { Search, Sparkles, Loader2, Shield, AlertTriangle, Activity, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type HeroProps = {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
};

const features = [
  {
    icon: Shield,
    title: 'Governance Score',
    description: 'Comprehensive scoring across 6 dimensions including code quality, security, and documentation.',
  },
  {
    icon: AlertTriangle,
    title: 'Risk Analysis',
    description: 'Identify and categorize risks by severity with actionable mitigation strategies.',
  },
  {
    icon: Activity,
    title: 'Health Metrics',
    description: 'Monitor repository health with real-time metrics covering code, tests, and dependencies.',
  },
  {
    icon: FileText,
    title: 'Executive Reports',
    description: 'Generate AI-powered executive summaries and export in multiple formats.',
  },
];

export function Hero({ onAnalyze, isLoading }: HeroProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onAnalyze(url.trim());
    }
  };

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 pt-16">
      <div className="mx-auto max-w-3xl text-center">
        <Badge variant="secondary" className="mb-6 gap-1.5 px-3 py-1">
          <Sparkles className="h-3.5 w-3.5" />
          AI-Powered Analysis
        </Badge>

        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Governance Intelligence
          <br />
          <span className="gradient-text">for Every Repository</span>
        </h1>

        <p className="mx-auto mb-8 max-w-xl text-lg text-muted-foreground">
          Analyze any open-source repository in seconds. Get comprehensive governance scores,
          risk assessments, and AI-driven recommendations.
        </p>

        <form onSubmit={handleSubmit} className="mx-auto mb-12 flex max-w-lg gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://github.com/owner/repo"
              className="pl-9 h-11"
              disabled={isLoading}
            />
          </div>
          <Button type="submit" size="lg" disabled={isLoading || !url.trim()} className="h-11 px-6">
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Analyze
              </>
            )}
          </Button>
        </form>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="card-hover bg-card/50">
              <CardContent className="p-5">
                <feature.icon className="mb-3 h-8 w-8 text-primary" />
                <h3 className="mb-1.5 font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
