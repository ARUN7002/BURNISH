'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Sparkles, Zap, Shield, BarChart3, FileText } from 'lucide-react';

interface HeroProps {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
}

export default function Hero({ onAnalyze, isLoading }: HeroProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onAnalyze(url.trim());
    }
  };

  const features = [
    { icon: Shield, label: 'Governance Score', desc: 'Comprehensive scoring across 6 dimensions' },
    { icon: Zap, label: 'Risk Analysis', desc: 'Identify critical, high, medium, and low risks' },
    { icon: BarChart3, label: 'Health Metrics', desc: '12 repository health indicators' },
    { icon: FileText, label: 'Executive Reports', desc: 'AI-generated governance reports' },
  ];

  return (
    <section className="relative pt-32 pb-16 px-6">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Badge */}
        <Badge variant="outline" className="mb-6 px-4 py-1.5 text-xs border-primary/30 bg-primary/5">
          <Sparkles className="h-3 w-3 mr-1.5 text-primary" />
          AI-Powered Repository Intelligence
        </Badge>

        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          <span className="gradient-text">Governance Intelligence</span>
          <br />
          <span className="text-foreground">for Every Repository</span>
        </h2>

        {/* Subtitle */}
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Analyze any GitHub repository in minutes. Get governance scores, risk assessments,
          deployment readiness, and AI-generated executive reports — all in one platform.
        </p>

        {/* Search input */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-12">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-blue-500/50 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center gap-2 bg-card border border-border rounded-xl p-2">
              <Search className="h-5 w-5 text-muted-foreground ml-3 shrink-0" />
              <Input
                type="url"
                placeholder="Paste a GitHub repository URL (e.g., github.com/owner/repo)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={isLoading}
                className="flex-1 border-0 bg-transparent focus-visible:ring-0 h-12 text-base placeholder:text-muted-foreground/60"
              />
              <Button
                type="submit"
                disabled={isLoading || !url.trim()}
                className="h-10 px-6 bg-primary hover:bg-primary/90 shrink-0"
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Analyze
                  </>
                )}
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Supports any public GitHub repository. Analysis typically completes in 10-30 seconds.
          </p>
        </form>

        {/* Feature cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {features.map((f) => (
            <Card key={f.label} className="bg-card/50 border-border/50 card-hover">
              <CardContent className="p-4 text-center">
                <f.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium mb-1">{f.label}</p>
                <p className="text-xs text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
