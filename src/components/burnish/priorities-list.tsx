'use client';

import { ListOrdered } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { EngineeringPriorities } from '@/lib/types';

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

interface PrioritiesListProps {
  priorities: EngineeringPriorities;
}

export function PrioritiesList({ priorities }: PrioritiesListProps) {
  const items = priorities.items.slice(0, 10);
  const remaining = priorities.items.length - 10;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ListOrdered className="h-5 w-5" />
          Engineering Priorities
        </CardTitle>
      </CardHeader>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Priority</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="w-[120px]">Category</TableHead>
            <TableHead className="w-[80px]">Effort</TableHead>
            <TableHead className="w-[200px]">Impact</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <Badge variant="outline" className={priorityColorMap[item.priority]}>
                  {item.priority}
                </Badge>
              </TableCell>
              <TableCell className="font-medium">{item.title}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>
                <Badge variant="outline" className={effortColorMap[item.effort]}>
                  {item.effort}
                </Badge>
              </TableCell>
              <TableCell>
                <span className="text-sm text-muted-foreground line-clamp-2">
                  {item.impact}
                </span>
              </TableCell>
            </TableRow>
          ))}
          {remaining > 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-sm text-muted-foreground">
                and {remaining} more...
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
