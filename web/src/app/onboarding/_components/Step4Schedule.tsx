'use client';
import { Diet, DietOptions } from '@app/shared/constant/diet';
import {
  ProteinIntakeGPerKg,
  ProteinIntakeGPerKgOptions
} from '@app/shared/constant/protein-intake-g-per-kg';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
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
    } else console.log('Validation errors:', errors);
  };

  return (
    <div className='space-y-4'>
      <h2>Thiết lập bữa ăn</h2>
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
          { label: Diet.LowFat, value: Diet.LowFat, description: 'Ít chất béo' }
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
      <Button onClick={() => setStep(3)}>Quay trở lại</Button>
      <Button onClick={handleNext}>Tiếp tục</Button>
    </div>
  );
};
