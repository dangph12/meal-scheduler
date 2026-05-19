'use client';
import { RateOfChangeKgPerWeekOptions } from '@app/shared/constant/rate-of-change-kg-per-week';
import { Controller, useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useOnboarding } from '@/context/onboarding';

export const Step3Goal = () => {
  const {
    register,
    trigger,
    control,
    formState: { errors }
  } = useFormContext();
  const { setStep } = useOnboarding();

  const handleNext = async () => {
    const isStepValid = await trigger([
      'targetWeightKg',
      'rateOfChangeKgPerWeek'
    ]);
    if (isStepValid) setStep(4);
  };

  return (
    <div className='space-y-4'>
      <h2>Goal</h2>
      <Field>
        <FieldLabel>Target Weight (kg)</FieldLabel>
        <Input
          type='number'
          {...register('targetWeightKg', { valueAsNumber: true })}
        />
        <FieldError errors={[errors.targetWeightKg]} />
      </Field>
      <Field>
        <FieldLabel>Rate of Change (kg/week)</FieldLabel>
        <Controller
          control={control}
          name='rateOfChangeKgPerWeek'
          render={({ field }) => (
            <Select
              value={field.value !== undefined ? String(field.value) : ''}
              onValueChange={value => field.onChange(Number(value))}
              onOpenChange={open => !open && field.onBlur()}
            >
              <SelectTrigger>
                <SelectValue placeholder='Chọn tốc độ' />
              </SelectTrigger>
              <SelectContent>
                {RateOfChangeKgPerWeekOptions.map(option => (
                  <SelectItem key={option.value} value={String(option.value)}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <FieldError errors={[errors.rateOfChangeKgPerWeek]} />
      </Field>
      <Button onClick={() => setStep(2)}>Back</Button>
      <Button onClick={handleNext}>Next</Button>
    </div>
  );
};
