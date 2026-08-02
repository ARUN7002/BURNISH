'use client';

interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  grade?: string;
  showGrade?: boolean;
  color?: string;
}

export default function ScoreRing({
  score,
  size = 140,
  strokeWidth = 10,
  label,
  grade,
  showGrade = true,
  color,
}: ScoreRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = () => {
    if (color) return color;
    if (score >= 85) return 'oklch(0.7 0.18 150)';
    if (score >= 70) return 'oklch(0.8 0.18 90)';
    if (score >= 50) return 'oklch(0.85 0.18 70)';
    return 'oklch(0.7 0.2 25)';
  };

  const strokeColor = getColor();

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="oklch(1 0 0 / 8%)"
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
            className="animate-score-fill"
            style={{
              filter: `drop-shadow(0 0 6px ${strokeColor})`,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold tabular-nums">
            {Math.round(score)}
          </span>
          {showGrade && grade && (
            <span
              className="text-xs font-semibold mt-0.5 px-1.5 py-0.5 rounded"
              style={{
                backgroundColor: `${strokeColor}20`,
                color: strokeColor,
              }}
            >
              {grade}
            </span>
          )}
        </div>
      </div>
      {label && (
        <span className="text-sm text-muted-foreground font-medium">{label}</span>
      )}
    </div>
  );
}
