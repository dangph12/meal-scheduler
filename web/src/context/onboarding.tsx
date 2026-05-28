'use client';
import { ActivityLevel } from '@app/shared/constant/activity-level';
import { Diet } from '@app/shared/constant/diet';
import { ExerciseFrequency } from '@app/shared/constant/exercise-frequency';
import { ProteinIntakeGPerKg } from '@app/shared/constant/protein-intake-g-per-kg';
import { RateOfChangeKgPerWeek } from '@app/shared/constant/rate-of-change-kg-per-week';
import { Sex } from '@app/shared/constant/sex';
import { OnboardRequest, onboardSchema } from '@app/shared/dto/user';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import { FieldPath, FormProvider, useForm } from 'react-hook-form';

const defaultValues: Partial<OnboardRequest> = {
  sex: Sex.Male,
  dob: '',
  heightCm: 0,
  weightKg: 0,
  activityLevel: ActivityLevel.MostlySedentary,
  exerciseFrequency: ExerciseFrequency.None,
  targetWeightKg: 0,
  rateOfChangeKgPerWeek: RateOfChangeKgPerWeek.Zero,
  diet: Diet.Balanced,
  proteinIntakeGPerKg: ProteinIntakeGPerKg.Low,
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
};

interface OnboardingContextValue {
  step: number;
  setStep: (s: number) => void;
}

const OnboardingContext = createContext<OnboardingContextValue | undefined>(
  undefined
);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [step, setStepState] = useState(1);

  const form = useForm<OnboardRequest>({
    resolver: zodResolver(onboardSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues
  });

  const clearErrorsRef = useRef(form.clearErrors);
  clearErrorsRef.current = form.clearErrors;

  useEffect(() => {
    const subscription = form.watch((_, { name }) => {
      if (name) {
        clearErrorsRef.current(name as FieldPath<OnboardRequest>);
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  const setStep = (newStep: number) => {
    setStepState(newStep);
  };

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
