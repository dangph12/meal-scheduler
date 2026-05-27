'use client';
import { Diet, DietOptions } from '@app/shared/constant/diet';
import {
  ProteinIntakeGPerKg,
  ProteinIntakeGPerKgOptions
} from '@app/shared/constant/protein-intake-g-per-kg';
import { Utensils } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { OnboardingButtonGroup } from '@/components/onboarding-button-group';
import { RadioList } from '@/components/ui/radio-list';
import { useOnboarding } from '@/context/onboarding';

export const Step4Schedule = () => {
  const {
    trigger,
    watch,
    setValue,
    formState: { errors }
  } = useFormContext();
  const { setStep } = useOnboarding();

  const diet = watch('diet');
  const proteinIntakeGPerKg = watch('proteinIntakeGPerKg');

  const handleNext = async () => {
    const isValid = await trigger(['diet', 'proteinIntakeGPerKg']);
    if (isValid) {
      setStep(5);
    }
  };

  return (
    <div className='space-y-6'>
      <h3 className='text-3xl font-bold'>Thiết lập bữa ăn</h3>
      <p className='text-muted-foreground'>
        Chọn chế độ ăn và mục tiêu đạm phù hợp với nhu cầu cơ thể.
      </p>

      <div className='grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 items-center'>
        <div className='hidden lg:flex justify-end'>
          <Utensils size={240} strokeWidth={1} className='text-primary' />
        </div>

        <div className='w-full max-w-lg mx-auto flex flex-col h-auto lg:h-[500px] px-2'>
          <div className='space-y-2 flex-1'>
            <RadioList
              label='Chế độ ăn'
              options={[
                {
                  label: Diet.Balanced,
                  value: Diet.Balanced,
                  description: 'Cân bằng dinh dưỡng'
                },
                {
                  label: Diet.LowCarb,
                  value: Diet.LowCarb,
                  description: 'Ít tinh bột'
                },
                {
                  label: Diet.LowFat,
                  value: Diet.LowFat,
                  description: 'Ít chất béo'
                }
              ]}
              value={diet}
              onChange={val => setValue('diet', val)}
              error={errors.diet?.message as string}
            />
            <RadioList
              label='Mức độ chất đạm'
              options={[
                {
                  label: 'Thấp (1.6g/kg)',
                  value: ProteinIntakeGPerKg.Low,
                  description: 'Phù hợp người mới bắt đầu'
                },
                {
                  label: 'Trung bình (1.8g/kg)',
                  value: ProteinIntakeGPerKg.Medium,
                  description: 'Phù hợp tập luyện 3-4 lần/tuần'
                },
                {
                  label: 'Cao (2.2g/kg)',
                  value: ProteinIntakeGPerKg.High,
                  description: 'Phù hợp tập luyện thường xuyên'
                }
              ]}
              value={proteinIntakeGPerKg}
              onChange={val => setValue('proteinIntakeGPerKg', val)}
              error={errors.proteinIntakeGPerKg?.message as string}
            />
          </div>
          <div className='pt-8 mt-auto'>
            <OnboardingButtonGroup
              onBack={() => setStep(3)}
              onNext={handleNext}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
