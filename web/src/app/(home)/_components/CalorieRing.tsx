'use client';

import { cn } from '@/lib/shadcn';

interface CalorieRingProps {
  consumed: number;
  goal: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

function CalorieRing({
  consumed,
  goal,
  size = 160,
  strokeWidth = 12,
  className
}: CalorieRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const percentage = Math.min((consumed / goal) * 100, 100);
  const offset = circumference - (percentage / 100) * circumference;

  const remaining = goal - consumed;
  const isOver = remaining < 0;

  const getColor = () => {
    if (isOver) return 'var(--destructive)';
    if (percentage >= 90) return 'var(--accent)';
    return 'var(--primary)';
  };

  return (
    <div className={cn('relative inline-flex', className)}>
      <svg width={size} height={size} className='-rotate-90'>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill='none'
          stroke='currentColor'
          strokeWidth={strokeWidth}
          className='text-muted'
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill='none'
          stroke={getColor()}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap='round'
          className='transition-[stroke-dashoffset] duration-500 ease-out'
        />
      </svg>
      <div className='absolute inset-0 flex flex-col items-center justify-center'>
        {/* max-w-[70%] forces the text to stay within the safe inner area of the circle */}
        <div className='flex flex-col items-center justify-center max-w-[70%] text-center'>
          <span
            className={cn(
              'font-bold text-foreground leading-none tracking-tighter',
              size <= 80 ? 'text-sm' : 'text-3xl'
            )}
          >
            {consumed.toLocaleString()}
          </span>
          <span
            className={cn(
              'text-muted-foreground mt-0.5 leading-tight',
              size <= 80 ? 'text-[9px]' : 'text-xs font-medium'
            )}
          >
            / {goal.toLocaleString()} kcal
          </span>
        </div>
      </div>
    </div>
  );
}

interface MacroRingProps {
  label: string;
  current: number;
  goal: number;
  color: string;
  size?: number;
  strokeWidth?: number;
}

function MacroRing({
  label,
  current,
  goal,
  color,
  size = 48,
  strokeWidth = 4
}: MacroRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const percentage = Math.min((current / goal) * 100, 100);
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className='flex flex-col items-center gap-1'>
      <div className='relative'>
        <svg width={size} height={size} className='-rotate-90'>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill='none'
            stroke='currentColor'
            strokeWidth={strokeWidth}
            className='text-muted/30'
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill='none'
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap='round'
            className='transition-[stroke-dashoffset] duration-500 ease-out'
          />
        </svg>
      </div>
      <span className='text-xs font-medium text-foreground'>{label}</span>
      <span className='text-xs text-muted-foreground'>{current}g</span>
    </div>
  );
}

export { CalorieRing, MacroRing };
