'use client';
import { ActivityLevelOptions } from '@app/shared/constant/activity-level';
import { ExerciseFrequencyOptions } from '@app/shared/constant/exercise-frequency';
import { Controller, useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useOnboarding } from '@/context/onboarding';

export const Step2ActivityLevel = () => {
  const {
    trigger,
    control,
    formState: { errors }
  } = useFormContext();
  const { setStep } = useOnboarding();

  const handleNext = async () => {
    const isStepValid = await trigger(['activityLevel', 'exerciseFrequency']);
    if (isStepValid) setStep(3);
  };

  return (
    <div className='space-y-4'>
      <h2>Mức độ vận động</h2>
      <Field>
        <FieldLabel>Mức độ vận động</FieldLabel>
        <Controller
          control={control}
          name='activityLevel'
          render={({ field }) => (
            <Select
              value={field.value !== undefined ? String(field.value) : ''}
              onValueChange={value => field.onChange(Number(value))}
              onOpenChange={open => !open && field.onBlur()}
            >
              <SelectTrigger>
                <SelectValue placeholder='Chọn mức độ' />
              </SelectTrigger>
              <SelectContent>
                {ActivityLevelOptions.map(option => (
                  <SelectItem key={option.value} value={String(option.value)}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <FieldError errors={[errors.activityLevel]} />
      </Field>
      <Field>
        <FieldLabel>Số buổi tập thể dục</FieldLabel>
        <Controller
          control={control}
          name='exerciseFrequency'
          render={({ field }) => (
            <Select
              value={field.value !== undefined ? String(field.value) : ''}
              onValueChange={value => field.onChange(Number(value))}
              onOpenChange={open => !open && field.onBlur()}
            >
              <SelectTrigger>
                <SelectValue placeholder='Chọn tần suất' />
              </SelectTrigger>
              <SelectContent>
                {ExerciseFrequencyOptions.map(option => (
                  <SelectItem key={option.value} value={String(option.value)}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <FieldError errors={[errors.exerciseFrequency]} />
      </Field>
      <Button onClick={() => setStep(1)}>Quay trở lại</Button>
      <Button onClick={handleNext}>Tiếp tục</Button>
    </div>
  );
};
