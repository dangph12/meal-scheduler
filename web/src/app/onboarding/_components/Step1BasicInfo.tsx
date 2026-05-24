'use client';
import { SexOptions } from '@app/shared/constant/sex';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Calendar } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
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
        <Controller
          control={control}
          name='dob'
          render={({ field }) => (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  className='w-full justify-between text-left font-normal'
                >
                  {field.value ? (
                    format(new Date(field.value), 'dd/MM/yyyy', { locale: vi })
                  ) : (
                    <span>Chọn ngày sinh</span>
                  )}
                  <Calendar />
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0' align='end'>
                <CalendarComponent
                  mode='single'
                  selected={field.value ? new Date(field.value) : undefined}
                  onSelect={date => field.onChange(date?.toISOString())}
                  captionLayout='dropdown'
                  startMonth={new Date(1900, 0, 1)}
                  endMonth={new Date()}
                  disabled={date => date > new Date()}
                  locale={vi}
                />
              </PopoverContent>
            </Popover>
          )}
        />
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
