'use client';
import { ActivityLevelOptions } from '@app/shared/constant/activity-level';
import { ExerciseFrequencyOptions } from '@app/shared/constant/exercise-frequency';
import { Activity } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { OnboardingButtonGroup } from '@/components/onboarding-button-group';
import { RadioList } from '@/components/ui/radio-list';
import { useOnboarding } from '@/context/onboarding';

export const Step2ActivityLevel = () => {
  const {
    trigger,
    watch,
    setValue,
    formState: { errors }
  } = useFormContext();
  const { setStep } = useOnboarding();

  const activityLevel = watch('activityLevel');
  const exerciseFrequency = watch('exerciseFrequency');

  const handleNext = async () => {
    const isStepValid = await trigger(['activityLevel', 'exerciseFrequency']);
    if (isStepValid) setStep(3);
  };

  return (
    <div className='space-y-6'>
      <h3 className='text-3xl font-bold'>Mức độ vận động</h3>
      <p className='text-muted-foreground'>
        Cung cấp thông tin để chúng tôi tính toán năng lượng tiêu hao hàng ngày.
      </p>

      <div className='grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 items-center'>
        <div className='hidden lg:flex justify-end'>
          <Activity size={240} strokeWidth={1} className='text-primary' />
        </div>

        <div className='w-full max-w-lg mx-auto flex flex-col h-auto lg:h-[500px] px-2'>
          <div className='space-y-2 flex-1'>
            <RadioList
              label='Mức độ vận động hàng ngày'
              options={ActivityLevelOptions}
              value={activityLevel}
              onChange={val => setValue('activityLevel', val)}
              error={errors.activityLevel?.message as string}
            />
            <RadioList
              label='Số buổi tập thể dục mỗi tuần'
              options={ExerciseFrequencyOptions}
              value={exerciseFrequency}
              onChange={val => setValue('exerciseFrequency', val)}
              error={errors.exerciseFrequency?.message as string}
            />
          </div>
          <div className='pt-8 mt-auto'>
            <OnboardingButtonGroup
              onBack={() => setStep(1)}
              onNext={handleNext}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
