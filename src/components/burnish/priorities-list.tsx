import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { EngineeringPriorities } from '@/lib/types';
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

export function PrioritiesList({ priorities }: { priorities: EngineeringPriorities }) {
  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Engineering Priorities</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Priority</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="w-[110px]">Category</TableHead>
              <TableHead className="w-[70px]">Effort</TableHead>
              <TableHead className="hidden sm:table-cell">Impact</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {priorities.items.map((item, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Badge variant="outline" className={cn('text-[10px] px-1.5 py-0', priorityColor(item.priority))}>
                    {item.priority}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell className="text-muted-foreground text-xs">{item.category}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn('text-[10px] px-1.5 py-0', effortColor(item.effort))}>
                    {item.effort}
                  </Badge>
                </TableCell>
                <TableCell className="hidden max-w-[200px] truncate text-muted-foreground text-xs sm:table-cell">
                  {item.impact}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
