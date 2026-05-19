'use client';
import { DietOptions } from '@app/shared/constant/diet';
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

export const Step4Schedule = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useFormContext();
  const { setStep } = useOnboarding();

  const onSubmit = (data: any) => {
    console.log('Submitting onboarding data:', data);
    alert('Finished! Check console.');
  };

  return (
    <div className='space-y-4'>
      <h2>Schedule Setting</h2>
      <Field>
        <FieldLabel>Diet</FieldLabel>
        <Controller
          control={control}
          name='diet'
          render={({ field }) => (
            <Select
              value={field.value || ''}
              onValueChange={field.onChange}
              onOpenChange={open => !open && field.onBlur()}
            >
              <SelectTrigger>
                <SelectValue placeholder='Chọn chế độ' />
              </SelectTrigger>
              <SelectContent>
                {DietOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <FieldError errors={[errors.diet]} />
      </Field>
      <Field>
        <FieldLabel>Protein Intake (g)</FieldLabel>
        <Input
          type='number'
          {...register('proteinIntake', { valueAsNumber: true })}
        />
        <FieldError errors={[errors.proteinIntake]} />
      </Field>
      <Button onClick={() => setStep(3)}>Back</Button>
      <Button onClick={handleSubmit(onSubmit)}>Finish</Button>
    </div>
  );
};
