'use client';

import { FieldError, FieldLabel } from '@/components/ui/field';
import { cn } from '@/lib/shadcn';

interface RadioListProps {
  label: string;
  options: {
    label: string;
    value: string | number;
    description?: string;
    disabled?: boolean;
  }[];
  value: string | number;
  onChange: (value: unknown) => void;
  error?: string;
}

export function RadioList({
  label,
  options,
  value,
  onChange,
  error
}: RadioListProps) {
  return (
    <div className='space-y-2'>
      <FieldLabel>{label}</FieldLabel>
      <div className='flex flex-col gap-2'>
        {options.map(option => {
          const isSelected = value === option.value;
          const isDisabled = option.disabled;

          return (
            <div
              key={String(option.value)}
              className={cn(
                'relative flex items-center gap-3 rounded-lg border p-3 transition-all',
                !isDisabled &&
                  'cursor-pointer hover:border-border/50 hover:bg-muted/50',
                isDisabled && 'cursor-not-allowed opacity-50',
                isSelected && !isDisabled
                  ? 'border-primary bg-primary/5'
                  : 'border-transparent bg-muted/30'
              )}
              onClick={() => !isDisabled && onChange(option.value)}
            >
              <div
                className={cn(
                  'h-4 w-4 rounded-full border flex items-center justify-center flex-shrink-0',
                  isSelected ? 'border-primary' : 'border-muted-foreground'
                )}
              >
                {isSelected && (
                  <div className='h-2 w-2 rounded-full bg-primary' />
                )}
              </div>
              <div className='min-w-0 flex-1'>
                <span className='font-medium'>{option.label}</span>
                {option.description && (
                  <p className='text-sm text-muted-foreground'>
                    {option.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {error && <FieldError errors={[{ message: String(error) }]} />}
    </div>
  );
}
