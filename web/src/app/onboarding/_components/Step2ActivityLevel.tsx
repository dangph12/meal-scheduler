'use client';
import {
  ActivityLevel,
  ActivityLevelOptions
} from '@app/shared/constant/activity-level';
import {
  ExerciseFrequency,
  ExerciseFrequencyOptions
} from '@app/shared/constant/exercise-frequency';
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
    <div className='space-y-4'>
      <h2>Mức độ vận động</h2>
      <RadioList
        label='Mức độ vận động'
        options={ActivityLevelOptions}
        value={activityLevel}
        onChange={val => setValue('activityLevel', val)}
        error={errors.activityLevel?.message as string}
      />
      <RadioList
        label='Số buổi tập thể dục'
        options={ExerciseFrequencyOptions}
        value={exerciseFrequency}
        onChange={val => setValue('exerciseFrequency', val)}
        error={errors.exerciseFrequency?.message as string}
      />
      <OnboardingButtonGroup onBack={() => setStep(1)} onNext={handleNext} />
    </div>
  );
};
