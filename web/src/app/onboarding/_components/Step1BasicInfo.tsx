'use client';
import { SexOptions } from '@app/shared/constant/sex';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Calendar, User } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';

import { OnboardingButtonGroup } from '@/components/onboarding-button-group';
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
    <div className='flex flex-col h-full max-w-6xl mx-auto px-4 pb-6 lg:pb-10 w-full'>
      <div className='flex-shrink-0 space-y-2 mb-6'>
        <h3 className='text-3xl font-bold'>Thông tin cá nhân</h3>
        <p className='text-muted-foreground'>
          Cung cấp thông tin cơ bản để chúng tôi cá nhân hóa lộ trình cho bạn.
        </p>
      </div>

      <div className='flex-1 min-h-0 overflow-y-auto pr-2'>
        <div className='grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 items-center h-full'>
          <div className='hidden lg:flex justify-end'>
            <User size={240} strokeWidth={1} className='text-primary' />
          </div>

          <div className='w-full max-w-lg mx-auto flex flex-col space-y-2'>
            <Field>
              <FieldLabel>Giới tính</FieldLabel>
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
              <div className='h-4'>
                <FieldError errors={[errors.sex]} />
              </div>
            </Field>
            <Field>
              <FieldLabel>Ngày tháng năm sinh</FieldLabel>
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
                          format(new Date(field.value), 'dd/MM/yyyy', {
                            locale: vi
                          })
                        ) : (
                          <span>Chọn ngày sinh</span>
                        )}
                        <Calendar size={16} />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='end'>
                      <CalendarComponent
                        mode='single'
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
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
              <div className='h-4'>
                <FieldError errors={[errors.dob]} />
              </div>
            </Field>
            <Field>
              <FieldLabel>Chiều cao (cm)</FieldLabel>
              <Input
                type='number'
                {...register('heightCm', { valueAsNumber: true })}
              />
              <div className='h-4'>
                <FieldError errors={[errors.heightCm]} />
              </div>
            </Field>
            <Field>
              <FieldLabel>Cân nặng hiện tại (kg)</FieldLabel>
              <Input
                type='number'
                {...register('weightKg', { valueAsNumber: true })}
              />
              <div className='h-4'>
                <FieldError errors={[errors.weightKg]} />
              </div>
            </Field>
          </div>
        </div>
      </div>

      <div className='flex-shrink-0 pt-4 mt-4 bg-background z-10'>
        <div className='grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12'>
          <div className='hidden lg:block' />
          <div className='w-full max-w-lg mx-auto'>
            <OnboardingButtonGroup
              onBack={() => setStep(0)}
              onNext={handleNext}
              isFirstStep
            />
          </div>
        </div>
      </div>
    </div>
  );
};
