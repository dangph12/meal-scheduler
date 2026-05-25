'use client';
import { RateOfChangeKgPerWeek } from '@app/shared/constant/rate-of-change-kg-per-week';
import { use, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { RadioList } from '@/components/ui/radio-list';
import { useOnboarding } from '@/context/onboarding';

/** Maximum timeframe for target weight goal (6 months = 26 weeks) */
const TARGET_GOAL_WEEKS = 26;

export const Step3Goal = () => {
  const {
    register,
    trigger,
    watch,
    setValue,
    formState: { errors }
  } = useFormContext();
  const { setStep } = useOnboarding();

  const weightKg = watch('weightKg');
  const rateOfChangeKgPerWeek = watch('rateOfChangeKgPerWeek');

  const { minTarget, maxTarget } = useMemo(() => {
    if (!weightKg || !rateOfChangeKgPerWeek) {
      return { minTarget: null, maxTarget: null };
    }
    const maxChange = rateOfChangeKgPerWeek * TARGET_GOAL_WEEKS;
    return {
      minTarget: weightKg - maxChange,
      maxTarget: weightKg + maxChange
    };
  }, [weightKg, rateOfChangeKgPerWeek]);

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
        <FieldLabel>
          Cân nặng mục tiêu (kg)
          {minTarget !== null && maxTarget !== null && (
            <span className='text-sm text-muted-foreground ml-2'>
              (cho phép: {minTarget.toFixed(1)}-{maxTarget.toFixed(1)} kg)
            </span>
          )}
        </FieldLabel>
        <Input
          type='number'
          {...register('targetWeightKg', {
            valueAsNumber: true,
            validate: value => {
              if (
                minTarget !== null &&
                maxTarget !== null &&
                (value < minTarget || value > maxTarget)
              ) {
                return `Cân nặng mục tiêu phải trong khoảng ${minTarget.toFixed(
                  1
                )}-${maxTarget.toFixed(1)} kg`;
              }
              return true;
            }
          })}
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
