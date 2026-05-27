'use client';
import { OnboardingProvider, useOnboarding } from '@/context/onboarding';

const TOTAL_STEPS = 6;

const ProgressBar = () => {
  const { step } = useOnboarding();
  const progressPercentage = ((step - 1) / (TOTAL_STEPS - 1)) * 100;

  return (
    <div className='mx-auto max-w-2xl px-6 pt-8 mb-4 w-full'>
      <div className='relative h-4 w-full'>
        <div className='absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-muted rounded-full' />
        <div
          className='absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary rounded-full transition-all duration-500 ease-out'
          style={{ width: `${progressPercentage}%` }}
        />

        <div className='absolute inset-0'>
          {Array.from({ length: TOTAL_STEPS }).map((_, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber <= step;

            return (
              <div
                key={index}
                className='absolute'
                style={{
                  left: `${((stepNumber - 1) / (TOTAL_STEPS - 1)) * 100}%`,
                  top: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div
                  className={`size-4 rounded-full border-2 transition-colors duration-300 ${
                    isActive
                      ? 'bg-primary border-primary'
                      : 'bg-background border-muted-foreground'
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
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
      <main className='mx-auto px-4 py-6 md:py-10'>{children}</main>
    </OnboardingProvider>
  );
}
