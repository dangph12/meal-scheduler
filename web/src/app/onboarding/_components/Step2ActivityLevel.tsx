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
    <div className='flex flex-col h-full max-w-6xl mx-auto px-4 pb-6 lg:pb-10 w-full'>
      <div className='flex-shrink-0 space-y-2 mb-6'>
        <h3 className='text-3xl font-bold'>Mức độ vận động</h3>
        <p className='text-muted-foreground'>
          Cung cấp thông tin để chúng tôi tính toán năng lượng tiêu hao hàng
          ngày.
        </p>
      </div>

      <div className='flex-1 min-h-0 overflow-y-auto pr-2'>
        <div className='grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-0 lg:gap-12 items-center h-full'>
          <div className='hidden lg:flex justify-start'>
            <Activity size={240} strokeWidth={1} className='text-primary' />
          </div>

          <div className='w-full max-w-lg mx-auto flex flex-col space-y-2'>
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
        </div>
      </div>

      <div className='flex-shrink-0 pt-6 mt-4 bg-background z-10'>
        <div className='grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-0 lg:gap-12'>
          <div className='hidden lg:block' />
          <div className='w-full max-w-lg mx-auto'>
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
