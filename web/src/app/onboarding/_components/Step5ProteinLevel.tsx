'use client';
import { ProteinIntakeGPerKg } from '@app/shared/constant/protein-intake-g-per-kg';
import { Drumstick } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { OnboardingButtonGroup } from '@/components/onboarding-button-group';
import { RadioList } from '@/components/ui/radio-list';
import { useOnboarding } from '@/context/onboarding';

export const Step5ProteinLevel = () => {
  const {
    trigger,
    watch,
    setValue,
    formState: { errors }
  } = useFormContext();
  const { setStep } = useOnboarding();

  const proteinIntakeGPerKg = watch('proteinIntakeGPerKg');

  const handleNext = async () => {
    const isValid = await trigger(['proteinIntakeGPerKg']);
    if (isValid) {
      setStep(6);
    }
  };

  return (
    <div className='flex flex-col h-full max-w-6xl mx-auto px-4 pb-6 lg:pb-10 w-full'>
      <div className='flex-shrink-0 space-y-2 mb-6'>
        <h3 className='text-3xl font-bold'>Mức độ chất đạm</h3>
        <p className='text-muted-foreground'>
          Chọn lượng đạm phù hợp với cường độ tập luyện của bạn.
        </p>
      </div>

      <div className='flex-1 min-h-0 overflow-y-auto pr-2'>
        <div className='grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 items-center h-full'>
          <div className='hidden lg:flex justify-end'>
            <Drumstick size={240} strokeWidth={1} className='text-primary' />
          </div>

          <div className='w-full max-w-lg mx-auto flex flex-col space-y-2'>
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
        </div>
      </div>

      <div className='flex-shrink-0 pt-4 mt-4 bg-background z-10'>
        <div className='grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12'>
          <div className='hidden lg:block' />
          <div className='w-full max-w-lg mx-auto'>
            <OnboardingButtonGroup
              onBack={() => setStep(4)}
              onNext={handleNext}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
