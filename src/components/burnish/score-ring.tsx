import { cn } from '@/lib/utils';

type ScoreRingProps = {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  grade?: string;
  showGrade?: boolean;
  color?: string;
};

function getScoreColor(score: number): string {
  if (score >= 85) return 'oklch(0.7 0.18 150)';
  if (score >= 70) return 'oklch(0.8 0.18 90)';
  if (score >= 50) return 'oklch(0.85 0.18 70)';
  return 'oklch(0.7 0.2 25)';
}

export default function ScoreRing({
  score,
  size = 120,
  strokeWidth = 8,
  label,
  grade,
  showGrade = false,
  color,
}: ScoreRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const strokeColor = color || getScoreColor(score);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="oklch(1 0 0 / 10%)"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={cn('animate-score-fill')}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold" style={{ color: strokeColor }}>
            {Math.round(score)}
          </span>
          {showGrade && grade && (
            <span className="text-xs text-muted-foreground">{grade}</span>
          )}
        </div>
      </div>
      {label && <span className="text-sm font-medium text-muted-foreground">{label}</span>}
    </div>
  );
}
