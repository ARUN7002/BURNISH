import { Download, FileJson, FileText, FileCode, File } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { AnalysisResult, ReportFormat } from '@/lib/types';

function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function generateMarkdown(result: AnalysisResult): string {
  const { repositoryMeta: meta, governanceScore, health, maturity, risk, deployment, businessImpact } = result;
  let md = `# BURNISH Governance Report\n\n`;
  md += `**Repository:** ${meta.owner}/${meta.name}  
`;
  md += `**Analyzed:** ${new Date(result.analyzedAt).toLocaleDateString()}  
`;
  md += `**Provider:** ${result.provider}  
\n`;

  md += `## Governance Score: ${governanceScore.overall}/100 (${governanceScore.grade})\n\n`;
  md += `| Dimension | Score |\n|-----------|-------|\n`;
  md += `| Code Quality | ${governanceScore.breakdown.codeQuality} |\n`;
  md += `| Testing | ${governanceScore.breakdown.testing} |\n`;
  md += `| Documentation | ${governanceScore.breakdown.documentation} |\n`;
  md += `| Security | ${governanceScore.breakdown.security} |\n`;
  md += `| Maintainability | ${governanceScore.breakdown.maintainability} |\n`;
  md += `| Dependency Mgmt | ${governanceScore.breakdown.dependencyManagement} |\n\n`;

  md += `## Health: ${health.overall}/100 (${health.grade})\n\n`;
  health.metrics.forEach((m) => {
    md += `- **${m.name}**: ${m.score}/${m.maxScore} (${m.status})\n`;
  });
  md += `\n`;

  md += `## Maturity: ${maturity.overall}/100 (${maturity.level})\n\n`;
  maturity.dimensions.forEach((d) => {
    md += `- **${d.name}**: ${d.level}/${d.maxLevel} – ${d.description}\n`;
  });
  md += `\n`;

  md += `## Risk: ${risk.overall}/100\n\n`;
  md += `Critical: ${risk.critical} | High: ${risk.high} | Medium: ${risk.medium} | Low: ${risk.low}\n\n`;
  risk.items.forEach((r) => {
    md += `- **[${r.severity.toUpperCase()}]** ${r.category}: ${r.description}\n  Mitigation: ${r.mitigation}\n`;
  });
  md += `\n`;

  md += `## Deployment Readiness: ${deployment.overall}/100 (${deployment.grade})\n\n`;
  md += `- CI/CD: ${deployment.ciCd}\n`;
  md += `- Containerization: ${deployment.containerization}\n`;
  md += `- Monitoring: ${deployment.monitoring}\n`;
  md += `- Environment Mgmt: ${deployment.environmentManagement}\n\n`;

  md += `## Business Impact: ${businessImpact.overall}/100\n\n`;
  md += `- Market Readiness: ${businessImpact.marketReadiness}\n`;
  md += `- Scalability: ${businessImpact.scalability}\n`;
  md += `- Technical Debt: ${businessImpact.technicalDebt}\n`;
  md += `- Innovation: ${businessImpact.innovation}\n\n`;

  md += `## Executive Summary\n\n${result.executiveSummary}\n\n`;

  md += `## AI Recommendations\n\n`;
  result.recommendations.forEach((r) => {
    md += `- **[${r.priority}]** ${r.title} (${r.category}, ${r.effort} effort): ${r.description}\n`;
  });

  return md;
}

function generateHtml(result: AnalysisResult): string {
  const md = generateMarkdown(result);
  const body = md
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/^(?!<[hluo])((?!<).+)$/gm, '<p>$1</p>')
    .replace(/\n{2,}/g, '<br/><br/>')
    .replace(/\|(.+)\|/g, (match) => {
      const cells = match.split('|').filter(Boolean).map((c) => c.trim());
      if (cells.every((c) => /^-+$/.test(c))) return '';
      const tag = match.includes('---') ? '' : '<tr>' + cells.map((c) => `<td>${c}</td>`).join('') + '</tr>';
      return tag;
    });

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>BURNISH Report – ${result.repositoryMeta.owner}/${result.repositoryMeta.name}</title>
<style>
body{font-family:system-ui,sans-serif;max-width:800px;margin:2rem auto;padding:0 1rem;background:#111;color:#eee;}
h1{color:#a78bfa;} h2{color:#ccc;border-bottom:1px solid #333;padding-bottom:.25rem;}
li{margin:.25rem 0;} td,th{padding:.35rem .75rem;border:1px solid #333;}
tr:nth-child(even){background:#1a1a1a;}
</style>
</head>
<body>${body}</body>
</html>`;
}

function generateJson(result: AnalysisResult): string {
  return JSON.stringify(result, null, 2);
}

function generatePdfContent(result: AnalysisResult): string {
  const md = generateMarkdown(result);
  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"/>
<style>body{font-family:system-ui,sans-serif;max-width:700px;margin:1rem;padding:1rem;font-size:11pt;color:#111;}
h1{font-size:18pt;color:#333;}h2{font-size:14pt;color:#444;border-bottom:1px solid #ddd;}
table{border-collapse:collapse;width:100%;}td,th{border:1px solid #ddd;padding:4px 8px;}</style>
</head><body>${md.replace(/\n/g, '<br/>').replace(/^# (.+)$/gm, '<h1>$1</h1>').replace(/^## (.+)$/gm, '<h2>$1</h2>').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')}</body></html>`;
  return html;
}

type ReportExportProps = {
  result: AnalysisResult;
};

export default function ReportExport({ result }: ReportExportProps) {
  const repoName = `${result.repositoryMeta.owner}-${result.repositoryMeta.name}`;

  function handleExport(format: ReportFormat) {
    try {
      switch (format) {
        case 'json': {
          downloadFile(generateJson(result), `${repoName}-report.json`, 'application/json');
          break;
        }
        case 'markdown': {
          downloadFile(generateMarkdown(result), `${repoName}-report.md`, 'text/markdown');
          break;
        }
        case 'html': {
          downloadFile(generateHtml(result), `${repoName}-report.html`, 'text/html');
          break;
        }
        case 'pdf': {
          const html = generatePdfContent(result);
          const blob = new Blob([html], { type: 'text/html' });
          const url = URL.createObjectURL(blob);
          window.open(url, '_blank');
          URL.revokeObjectURL(url);
          break;
        }
      }
      toast.success(`Report exported as ${format.toUpperCase()}`);
    } catch {
      toast.error('Failed to export report');
    }
  }

  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Export Report</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Download className="h-3.5 w-3.5" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Export Format</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleExport('json')} className="gap-2">
                <FileJson className="h-4 w-4" />
                JSON
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('markdown')} className="gap-2">
                <FileText className="h-4 w-4" />
                Markdown
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('html')} className="gap-2">
                <FileCode className="h-4 w-4" />
                HTML
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('pdf')} className="gap-2">
                <File className="h-4 w-4" />
                PDF (Print)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Export the full governance analysis report in your preferred format.
          JSON includes raw data; Markdown and HTML include formatted summaries.
          PDF opens a print-ready view.
        </p>
      </CardContent>
    </Card>
  );
}
