'use client';
import type { ApiResponseType } from '@app/shared/api-response';
import type { OnboardRequest } from '@app/shared/dto/user';
import type { PreviewCaloriesIntakeResponse } from '@app/shared/dto/user';
import { useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useOnboarding } from '@/context/onboarding';
import { api, ApiError } from '@/lib/api';

export const Step5CaloriesPreview = () => {
  const { setStep } = useOnboarding();
  const { setValue, control } = useFormContext<Partial<OnboardRequest>>();

  const [loading, setLoading] = useState(true);
  const [suggestedCalories, setSuggestedCalories] = useState(0);
  const [tdee, setTdee] = useState(0);

  // Slider value in kcal
  const [adjustedCalories, setAdjustedCalories] = useState(0);

  const profileData = useWatch({ control });

  const minCalories = Math.round(suggestedCalories * 0.95);
  const maxCalories = Math.round(suggestedCalories * 1.05);

  useEffect(() => {
    const fetchPreview = async () => {
      setLoading(true);
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
    setStep(6);
  };

  return (
    <div className='space-y-6'>
      <h2 className='text-xl font-semibold'>Lượng calo mục tiêu</h2>

      {loading ? (
        <p>Đang tính toán...</p>
      ) : (
        <>
          <div className='space-y-4'>
            <p className='text-sm text-muted-foreground'>
              TDEE (nhu cầu năng lượng hàng ngày):{' '}
              <span className='font-medium'>{tdee.toLocaleString()} kcal</span>
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
          </div>
        </>
      )}

      <div className='flex gap-2'>
        <Button onClick={() => setStep(4)} variant='outline'>
          Quay trở lại
        </Button>
        <Button onClick={handleNext} disabled={loading}>
          Tiếp tục
        </Button>
      </div>
    </div>
  );
};
