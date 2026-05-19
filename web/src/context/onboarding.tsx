'use client';
import { CreateUserRequest, createUserSchema } from '@app/shared/dto/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { createContext, ReactNode, useContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const OnboardingContext = createContext<
  { step: number; setStep: (s: number) => void } | undefined
>(undefined);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [step, setStep] = useState(1);
  const form = useForm<CreateUserRequest>({
    resolver: zodResolver(createUserSchema),
    mode: 'onChange'
  });

  return (
    <FormProvider {...form}>
      <OnboardingContext.Provider value={{ step, setStep }}>
        {children}
      </OnboardingContext.Provider>
    </FormProvider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context)
    throw new Error('useOnboarding must be used within OnboardingProvider');
  return context;
};
