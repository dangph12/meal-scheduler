'use client';
import { OnboardingProvider, useOnboarding } from '@/context/onboarding';

const ProgressBar = () => {
  const { step } = useOnboarding();
  const progress = (step / 4) * 100;
  return (
    <div style={{ width: `${progress}%`, height: '5px', background: 'blue' }} />
  );
};

export default function OnboardingLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <OnboardingProvider>
      <ProgressBar />
      {children}
    </OnboardingProvider>
  );
}
