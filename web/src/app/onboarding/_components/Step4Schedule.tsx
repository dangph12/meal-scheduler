'use client';
import { DietOptions } from '@app/shared/constant/diet';
import { ProteinIntakeGPerKgOptions } from '@app/shared/constant/protein-intake-g-per-kg';
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

export const Step4Schedule = () => {
  const {
    control,
    trigger,
    formState: { errors }
  } = useFormContext();
  const { setStep } = useOnboarding();

  const handleNext = async () => {
    const isValid = await trigger(['diet', 'proteinIntakeGPerKg']);
    if (isValid) {
      setStep(5);
    } else console.log('Validation errors:', errors);
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
              value={field.value ?? ''}
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
        <FieldLabel>Mức độ Protein</FieldLabel>
        <Controller
          control={control}
          name='proteinIntakeGPerKg'
          render={({ field }) => (
            <Select
              value={field.value !== undefined ? String(field.value) : ''}
              onValueChange={value => field.onChange(Number(value))}
              onOpenChange={open => !open && field.onBlur()}
            >
              <SelectTrigger>
                <SelectValue placeholder='Chọn mức độ protein' />
              </SelectTrigger>
              <SelectContent>
                {ProteinIntakeGPerKgOptions.map(option => (
                  <SelectItem key={option.value} value={String(option.value)}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <FieldError errors={[errors.proteinIntakeLevel]} />
      </Field>
      <Button onClick={() => setStep(3)}>Back</Button>
      <Button onClick={handleNext}>Next</Button>
    </div>
  );
};
