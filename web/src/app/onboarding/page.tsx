'use client';
import { useOnboarding } from '@/context/onboarding';

import { Step1BasicInfo } from './_components/Step1BasicInfo';
import { Step2ActivityLevel } from './_components/Step2ActivityLevel';
import { Step3Goal } from './_components/Step3Goal';
import { Step4Diet } from './_components/Step4Diet';
import { Step5ProteinLevel } from './_components/Step5ProteinLevel';
import { Step6CaloriesPreview } from './_components/Step6CaloriesPreview';
import { Step7Account } from './_components/Step7Account';

export default function OnboardingPage() {
  const { step } = useOnboarding();

  return (
    <div className='h-full w-full'>
      {step === 1 && <Step1BasicInfo />}
      {step === 2 && <Step2ActivityLevel />}
      {step === 3 && <Step3Goal />}
      {step === 4 && <Step4Diet />}
      {step === 5 && <Step5ProteinLevel />}
      {step === 6 && <Step6CaloriesPreview />}
      {step === 7 && <Step7Account />}
    </div>
  );
}
