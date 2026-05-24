'use client';
import { RateOfChangeKgPerWeek } from '@app/shared/constant/rate-of-change-kg-per-week';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { RadioList } from '@/components/ui/radio-list';
import { useOnboarding } from '@/context/onboarding';

export const Step3Goal = () => {
  const {
    register,
    trigger,
    watch,
    setValue,
    formState: { errors }
  } = useFormContext();
  const { setStep } = useOnboarding();

  const rateOfChangeKgPerWeek = watch('rateOfChangeKgPerWeek');

  const handleNext = async () => {
    const isStepValid = await trigger([
      'targetWeightKg',
      'rateOfChangeKgPerWeek'
    ]);
    if (isStepValid) setStep(4);
  };

  return (
    <div className='space-y-4'>
      <h2>Mục tiêu</h2>
      <Field>
        <FieldLabel>Cân nặng mục tiêu (kg)</FieldLabel>
        <Input
          type='number'
          {...register('targetWeightKg', { valueAsNumber: true })}
        />
        <FieldError errors={[errors.targetWeightKg]} />
      </Field>
      <RadioList
        label='Tốc độ thay đổi'
        options={[
          { label: '0 kg/tuần', value: RateOfChangeKgPerWeek.Zero },
          {
            label: '0.25 kg/tuần',
            value: RateOfChangeKgPerWeek.Quarter
          },
          { label: '0.5 kg/tuần', value: RateOfChangeKgPerWeek.Half },
          {
            label: '0.75 kg/tuần',
            value: RateOfChangeKgPerWeek.ThreeQuarter
          },
          { label: '1 kg/tuần', value: RateOfChangeKgPerWeek.One }
        ]}
        value={rateOfChangeKgPerWeek}
        onChange={val => setValue('rateOfChangeKgPerWeek', val)}
        error={errors.rateOfChangeKgPerWeek?.message as string}
      />
      <Button onClick={() => setStep(2)}>Quay trở lại</Button>
      <Button onClick={handleNext}>Tiếp tục</Button>
    </div>
  );
};
