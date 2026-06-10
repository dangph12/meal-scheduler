'use client';

import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/shadcn';

import { type Meal, MealCard, MealCardSkeleton } from './MealCard';

interface MealSectionProps {
  title: string;
  meals: Meal[];
  onAdd?: () => void;
  onRemove?: (id: string) => void;
  isLoading?: boolean;
  className?: string;
}

function EmptyMealState({
  onAdd,
  className
}: {
  onAdd?: () => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-8 px-4 rounded-lg border border-dashed border-border bg-muted/30',
        className
      )}
    >
      <p className='text-sm text-muted-foreground mb-3'>No meals planned yet</p>
      {onAdd && (
        <Button variant='outline' size='sm' onClick={onAdd}>
          <Plus size={16} className='mr-1' />
          Add meal
        </Button>
      )}
    </div>
  );
}

function MealSection({
  title,
  meals,
  onAdd,
  onRemove,
  isLoading = false,
  className
}: MealSectionProps) {
  return (
    <div className={cn('space-y-3', className)}>
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-semibold text-foreground'>{title}</h3>
        {onAdd && (
          <Button variant='ghost' size='sm' onClick={onAdd}>
            <Plus size={16} className='mr-1' />
            Add
          </Button>
        )}
      </div>

      <div className='space-y-2'>
        {isLoading ? (
          <>
            <MealCardSkeleton />
            <MealCardSkeleton />
          </>
        ) : meals.length > 0 ? (
          meals.map(meal => (
            <MealCard key={meal.id} meal={meal} onRemove={onRemove} />
          ))
        ) : (
          <EmptyMealState onAdd={onAdd} />
        )}
      </div>
    </div>
  );
}

export { EmptyMealState, MealSection };
