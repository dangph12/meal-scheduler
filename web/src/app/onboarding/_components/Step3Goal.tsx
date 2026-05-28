'use client';
import { RateOfChangeKgPerWeek } from '@app/shared/constant/rate-of-change-kg-per-week';
import { Target } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { OnboardingButtonGroup } from '@/components/onboarding-button-group';
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
  const targetWeightKg = watch('targetWeightKg');
  const rateOfChangeKgPerWeek = watch('rateOfChangeKgPerWeek');

  const isTargetSameAsCurrent =
    weightKg &&
    targetWeightKg !== undefined &&
    Math.abs(targetWeightKg - weightKg) < 0.01;

  useEffect(() => {
    if (
      isTargetSameAsCurrent &&
      rateOfChangeKgPerWeek !== RateOfChangeKgPerWeek.Zero
    ) {
      setValue('rateOfChangeKgPerWeek', RateOfChangeKgPerWeek.Zero);
    }
    if (
      !isTargetSameAsCurrent &&
      rateOfChangeKgPerWeek === RateOfChangeKgPerWeek.Zero
    ) {
      setValue('rateOfChangeKgPerWeek', RateOfChangeKgPerWeek.Quarter);
    }
  }, [isTargetSameAsCurrent, rateOfChangeKgPerWeek, setValue]);

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
    <div className='flex flex-col h-full max-w-6xl mx-auto px-4 pb-6 lg:pb-10 w-full'>
      <div className='flex-shrink-0 space-y-2 mb-6'>
        <h3 className='text-3xl font-bold'>Mục tiêu</h3>
        <p className='text-muted-foreground'>
          Thiết lập mục tiêu cân nặng và tốc độ thay đổi mong muốn của bạn.
        </p>
      </div>

      <div className='flex-1 min-h-0 overflow-y-auto pr-2'>
        <div className='grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-0 lg:gap-12 items-center h-full'>
          <div className='hidden lg:flex justify-start'>
            <Target size={240} strokeWidth={1} className='text-primary' />
          </div>

          <div className='w-full max-w-lg mx-auto flex flex-col space-y-2'>
            <Field>
              <FieldLabel>
                Cân nặng mục tiêu (kg)
                {minTarget !== null && maxTarget !== null && (
                  <span className='text-sm text-muted-foreground ml-2'>
                    ({minTarget.toFixed(0)}-{maxTarget.toFixed(0)} kg)
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
                      return `Mục tiêu trong khoảng ${minTarget.toFixed(
                        1
                      )}-${maxTarget.toFixed(1)} kg`;
                    }
                    return true;
                  }
                })}
              />
              <div className='h-4'>
                <FieldError errors={[errors.targetWeightKg]} />
              </div>
            </Field>
            <RadioList
              label='Tốc độ thay đổi'
              options={[
                {
                  label: '0 kg/tuần',
                  value: RateOfChangeKgPerWeek.Zero,
                  disabled: !isTargetSameAsCurrent
                },
                {
                  label: '0.25 kg/tuần',
                  value: RateOfChangeKgPerWeek.Quarter,
                  disabled: isTargetSameAsCurrent
                },
                {
                  label: '0.5 kg/tuần',
                  value: RateOfChangeKgPerWeek.Half,
                  disabled: isTargetSameAsCurrent
                },
                {
                  label: '0.75 kg/tuần',
                  value: RateOfChangeKgPerWeek.ThreeQuarter,
                  disabled: isTargetSameAsCurrent
                },
                {
                  label: '1 kg/tuần',
                  value: RateOfChangeKgPerWeek.One,
                  disabled: isTargetSameAsCurrent
                }
              ]}
              value={rateOfChangeKgPerWeek}
              onChange={val => setValue('rateOfChangeKgPerWeek', val)}
              error={errors.rateOfChangeKgPerWeek?.message as string}
            />
          </div>
        </div>
      </div>

      <div className='flex-shrink-0 pt-6 mt-4 bg-background z-10'>
        <div className='grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-0 lg:gap-12'>
          <div className='hidden lg:block' />
          <div className='w-full max-w-lg mx-auto'>
            <OnboardingButtonGroup
              onBack={() => setStep(2)}
              onNext={handleNext}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
