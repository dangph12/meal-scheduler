'use client';

import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/shadcn';

import { CalorieRing, MacroRing } from './CalorieRing';

interface CalorieSummaryProps {
  consumed?: number;
  goal?: number;
  protein?: number;
  proteinGoal?: number;
  carbs?: number;
  carbsGoal?: number;
  fat?: number;
  fatGoal?: number;
  className?: string;
  compact?: boolean;
}

function CalorieSummary({
  consumed = 0,
  goal = 2000,
  protein = 0,
  proteinGoal = 150,
  carbs = 0,
  carbsGoal = 250,
  fat = 0,
  fatGoal = 65,
  className,
  compact = false
}: CalorieSummaryProps) {
  const remaining = goal - consumed;
  const isOver = remaining < 0;

  const proteinPercentage = Math.min((protein / proteinGoal) * 100, 100);
  const carbsPercentage = Math.min((carbs / carbsGoal) * 100, 100);
  const fatPercentage = Math.min((fat / fatGoal) * 100, 100);

  if (compact) {
    return (
      <div
        className={cn(
          'bg-card rounded-lg border border-border px-4 py-3 flex items-center gap-4',
          className
        )}
      >
        <CalorieRing
          consumed={consumed}
          goal={goal}
          size={80}
          strokeWidth={8}
        />

        <div className='flex-1'>
          <div className='flex justify-between items-baseline'>
            <span className='text-2xl font-bold text-foreground'>
              {consumed.toLocaleString()}
            </span>
            <span className='text-sm text-muted-foreground'>
              / {goal.toLocaleString()} kcal
            </span>
          </div>
          {isOver ? (
            <p className='text-sm text-destructive font-medium'>
              {Math.abs(remaining).toLocaleString()} kcal over
            </p>
          ) : (
            <p className='text-sm text-muted-foreground'>
              <span className='font-semibold text-foreground'>
                {remaining.toLocaleString()}
              </span>{' '}
              kcal left
            </p>
          )}
          <div className='flex gap-3 mt-2 text-xs text-muted-foreground'>
            <span>P: {protein}g</span>
            <span>C: {carbs}g</span>
            <span>F: {fat}g</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'bg-card rounded-lg border border-border p-6 flex flex-col gap-6',
        className
      )}
    >
      <div className='flex flex-col items-center gap-4'>
        <CalorieRing consumed={consumed} goal={goal} />

        <div className='text-center space-y-1'>
          {isOver ? (
            <p className='text-sm text-destructive font-medium'>
              {Math.abs(remaining).toLocaleString()} kcal over target
            </p>
          ) : (
            <p className='text-sm text-muted-foreground'>
              <span className='font-semibold text-foreground'>
                {remaining.toLocaleString()}
              </span>{' '}
              kcal remaining
            </p>
          )}
        </div>
      </div>

      <div className='space-y-3'>
        <h3 className='text-sm font-medium text-foreground font-heading'>
          Macros
        </h3>

        <div className='space-y-3'>
          <div className='space-y-1.5'>
            <div className='flex justify-between text-xs'>
              <span className='text-foreground font-medium'>Protein</span>
              <span className='text-muted-foreground'>
                {protein}g / {proteinGoal}g
              </span>
            </div>
            <Progress
              value={proteinPercentage}
              className='h-2'
              color='bg-primary'
            />
          </div>

          <div className='space-y-1.5'>
            <div className='flex justify-between text-xs'>
              <span className='text-foreground font-medium'>Carbs</span>
              <span className='text-muted-foreground'>
                {carbs}g / {carbsGoal}g
              </span>
            </div>
            <Progress value={carbsPercentage} className='h-2' />
          </div>

          <div className='space-y-1.5'>
            <div className='flex justify-between text-xs'>
              <span className='text-foreground font-medium'>Fat</span>
              <span className='text-muted-foreground'>
                {fat}g / {fatGoal}g
              </span>
            </div>
            <Progress value={fatPercentage} className='h-2' />
          </div>
        </div>
      </div>

      <div className='flex justify-around pt-2 border-t border-border'>
        <MacroRing
          label='P'
          current={protein}
          goal={proteinGoal}
          color='var(--primary)'
        />
        <MacroRing
          label='C'
          current={carbs}
          goal={carbsGoal}
          color='var(--accent)'
        />
        <MacroRing
          label='F'
          current={fat}
          goal={fatGoal}
          color='var(--muted-foreground)'
        />
      </div>
    </div>
  );
}

export { CalorieSummary };
