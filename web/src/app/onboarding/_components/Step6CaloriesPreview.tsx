'use client';
import type { ApiResponseType } from '@app/shared/api-response';
import type { OnboardRequest } from '@app/shared/dto/user';
import type { PreviewCaloriesIntakeResponse } from '@app/shared/dto/user';
import { Flame } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { toast } from 'sonner';

import { OnboardingButtonGroup } from '@/components/onboarding-button-group';
import { Slider } from '@/components/ui/slider';
import { useOnboarding } from '@/context/onboarding';
import { api, ApiError } from '@/lib/api';

export const Step6CaloriesPreview = () => {
  const { setStep } = useOnboarding();
  const { setValue, control } = useFormContext<Partial<OnboardRequest>>();

  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [suggestedCalories, setSuggestedCalories] = useState(0);
  const [tdee, setTdee] = useState(0);
  const [adjustedCalories, setAdjustedCalories] = useState(0);

  const profileData = useWatch({ control });

  const minCalories = Math.round(suggestedCalories * 0.95);
  const maxCalories = Math.round(suggestedCalories * 1.05);

  useEffect(() => {
    const fetchPreview = async () => {
      setLoading(true);
      setHasError(false);
      try {
        const payload = {
          sex: profileData.sex,
          dob: profileData.dob,
          heightCm: profileData.heightCm,
          weightKg: profileData.weightKg,
          activityLevel: profileData.activityLevel,
          exerciseFrequency: profileData.exerciseFrequency,
          targetWeightKg: profileData.targetWeightKg,
          rateOfChangeKgPerWeek: profileData.rateOfChangeKgPerWeek,
          diet: profileData.diet,
          proteinIntakeGPerKg: profileData.proteinIntakeGPerKg
        };

        const res = await api.post<
          ApiResponseType<PreviewCaloriesIntakeResponse>
        >('/v1/users/onboard/preview', payload);

        if (res?.data) {
          setTdee(res.data.tdee);
          setSuggestedCalories(res.data.suggestedCaloriesIntake);
          setAdjustedCalories(res.data.suggestedCaloriesIntake);
        }
      } catch (error) {
        setHasError(true);
        let message = 'Không thể tính lượng calo. Vui lòng thử lại.';
        if (error instanceof ApiError) {
          message = error.message;
        }
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchPreview();
  }, []);

  const handleNext = () => {
    setValue('caloriesIntake', adjustedCalories);
    setStep(7);
  };

  return (
    <div className='flex flex-col h-full max-w-6xl mx-auto px-4 pb-6 lg:pb-10 w-full'>
      <div className='flex-shrink-0 space-y-2 mb-6'>
        <h3 className='text-3xl font-bold'>Lượng calo mục tiêu</h3>
        <p className='text-muted-foreground'>
          Điều chỉnh lượng calo phù hợp với mục tiêu của bạn.
        </p>
      </div>

      <div className='flex-1 min-h-0 overflow-y-auto pr-2'>
        <div className='grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 items-center h-full'>
          <div className='hidden lg:flex justify-end'>
            <Flame size={240} strokeWidth={1} className='text-primary' />
          </div>

          <div className='w-full max-w-lg mx-auto flex flex-col space-y-4'>
            {loading ? (
              <p className='text-muted-foreground'>Đang tính toán...</p>
            ) : (
              <>
                <p className='text-sm text-muted-foreground'>
                  TDEE (nhu cầu năng lượng hàng ngày):{' '}
                  <span className='font-medium'>
                    {tdee.toLocaleString()} kcal
                  </span>
                </p>

                <div className='rounded-lg border border-border bg-muted/30 p-6 text-center'>
                  <p className='text-sm text-muted-foreground'>
                    Lượng calo mục tiêu
                  </p>
                  <p className='text-4xl font-bold text-primary'>
                    {adjustedCalories.toLocaleString()}
                  </p>
                  <p className='text-sm text-muted-foreground'>kcal/ngày</p>
                </div>

                <Slider
                  value={[adjustedCalories]}
                  onValueChange={([val]) => setAdjustedCalories(val)}
                  min={minCalories}
                  max={maxCalories}
                  step={1}
                />

                <div className='flex justify-between text-xs text-muted-foreground'>
                  <span>{minCalories.toLocaleString()} kcal</span>
                  <span>{maxCalories.toLocaleString()} kcal</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className='flex-shrink-0 pt-4 mt-4 bg-background z-10'>
        <div className='grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12'>
          <div className='hidden lg:block' />
          <div className='w-full max-w-lg mx-auto'>
            <OnboardingButtonGroup
              onBack={() => setStep(5)}
              onNext={handleNext}
              isNextDisabled={loading || hasError}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
