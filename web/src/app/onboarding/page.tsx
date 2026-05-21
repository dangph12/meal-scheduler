'use client';
import { useOnboarding } from '@/context/onboarding';

import { Step1BasicInfo } from './_components/Step1BasicInfo';
import { Step2ActivityLevel } from './_components/Step2ActivityLevel';
import { Step3Goal } from './_components/Step3Goal';
import { Step4Schedule } from './_components/Step4Schedule';
import { Step5Account } from './_components/Step5Account';

export default function OnboardingPage() {
  const { step } = useOnboarding();

  return (
    <div>
      {step === 1 && <Step1BasicInfo />}
      {step === 2 && <Step2ActivityLevel />}
      {step === 3 && <Step3Goal />}
      {step === 4 && <Step4Schedule />}
      {step === 5 && <Step5Account />}
    </div>
  );
}
