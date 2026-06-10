'use client';

import { X } from 'lucide-react';
import Image from 'next/image';

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/shadcn';

export interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  imageUrl?: string;
}

interface MealCardProps {
  meal: Meal;
  onRemove?: (id: string) => void;
  className?: string;
}

function MealCard({ meal, onRemove, className }: MealCardProps) {
  return (
    <div
      className={cn(
        'group relative flex items-center gap-3 p-3 bg-card rounded-lg border border-border hover:border-primary/50 transition-colors',
        className
      )}
    >
      <div className='relative size-16 flex-shrink-0 overflow-hidden rounded-md border border-border p-1'>
        {meal.imageUrl ? (
          <Image
            src={meal.imageUrl}
            alt={meal.name}
            className='size-full object-cover rounded-sm'
            fill
            sizes='64px'
          />
        ) : (
          <div className='size-full flex items-center justify-center bg-muted text-muted-foreground text-xs'>
            No img
          </div>
        )}
      </div>

      <div className='flex-1 min-w-0'>
        <h3 className='font-medium text-foreground truncate font-heading'>
          {meal.name}
        </h3>
        <p className='text-sm text-muted-foreground'>{meal.calories} kcal</p>
        <div className='flex gap-2 mt-1'>
          <span className='text-xs px-1.5 py-0.5 rounded bg-primary/10 text-primary'>
            P: {meal.protein}g
          </span>
          <span className='text-xs px-1.5 py-0.5 rounded bg-accent/10 text-accent'>
            C: {meal.carbs}g
          </span>
          <span className='text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground'>
            F: {meal.fat}g
          </span>
        </div>
      </div>

      {onRemove && (
        <button
          type='button'
          onClick={() => onRemove(meal.id)}
          className='absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive'
          aria-label={`Remove ${meal.name}`}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

function MealCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 p-3 bg-card rounded-lg border border-border',
        className
      )}
    >
      <Skeleton className='size-16 flex-shrink-0 rounded-md' />
      <div className='flex-1 space-y-2'>
        <Skeleton className='h-4 w-3/4' />
        <Skeleton className='h-3 w-1/2' />
        <div className='flex gap-2'>
          <Skeleton className='h-5 w-12 rounded' />
          <Skeleton className='h-5 w-12 rounded' />
          <Skeleton className='h-5 w-12 rounded' />
        </div>
      </div>
    </div>
  );
}

export { MealCard, MealCardSkeleton };
