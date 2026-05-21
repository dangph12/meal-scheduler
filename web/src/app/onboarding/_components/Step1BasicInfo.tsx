'use client';
import { SexOptions } from '@app/shared/constant/sex';
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

export const Step1BasicInfo = () => {
  const {
    register,
    trigger,
    control,
    formState: { errors }
  } = useFormContext();
  const { setStep } = useOnboarding();

  const handleNext = async () => {
    const isStepValid = await trigger(['sex', 'dob', 'heightCm', 'weightKg']);
    if (isStepValid) setStep(2);
  };

  return (
    <div className='space-y-4'>
      <h2>Basic Info</h2>
      <Field>
        <FieldLabel>Sex</FieldLabel>
        <Controller
          control={control}
          name='sex'
          render={({ field }) => (
            <Select
              value={field.value ?? ''}
              onValueChange={field.onChange}
              onOpenChange={open => !open && field.onBlur()}
            >
              <SelectTrigger>
                <SelectValue placeholder='Chọn giới tính' />
              </SelectTrigger>
              <SelectContent>
                {SexOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <FieldError errors={[errors.sex]} />
      </Field>
      <Field>
        <FieldLabel>Date of Birth</FieldLabel>
        <Input type='date' {...register('dob')} />
        <FieldError errors={[errors.dob]} />
      </Field>
      <Field>
        <FieldLabel>Height (cm)</FieldLabel>
        <Input
          type='number'
          {...register('heightCm', { valueAsNumber: true })}
        />
        <FieldError errors={[errors.heightCm]} />
      </Field>
      <Field>
        <FieldLabel>Weight (kg)</FieldLabel>
        <Input
          type='number'
          {...register('weightKg', { valueAsNumber: true })}
        />
        <FieldError errors={[errors.weightKg]} />
      </Field>
      <Button onClick={handleNext}>Next</Button>
    </div>
  );
};
