'use client';

import {
  RateOfChangeKgPerWeek,
  RateOfChangeKgPerWeekOptions
} from '@app/shared/constant/rate-of-change-kg-per-week';
import type { UserProfileResponse } from '@app/shared/dto/user';
import { Save } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { RadioList } from '@/components/ui/radio-list';
import { api, ApiError } from '@/lib/api';

import { WeightChart } from './WeightChart';

interface MeasurementsSectionProps {
  profile?: UserProfileResponse;
  weightHistory?: { date: string; weightKg: number }[];
  onProfileUpdate?: (profile: UserProfileResponse) => void;
}

const defaultProfile: UserProfileResponse = {
  name: '',
  email: '',
  avatarUrl: null,
  sex: 'MALE',
  dob: '',
  heightCm: 0,
  weightKg: 0,
  activityLevel: '1',
  exerciseFrequency: '1',
  targetWeightKg: 0,
  rateOfChangeKgPerWeek: '0.5',
  diet: 'BALANCED',
  proteinIntakeGPerKg: '1.2',
  caloriesIntake: 0
};

function MeasurementsSection({
  profile = defaultProfile,
  weightHistory = [],
  onProfileUpdate = () => {}
}: MeasurementsSectionProps) {
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      heightCm: profile.heightCm,
      weightKg: profile.weightKg,
      targetWeightKg: profile.targetWeightKg,
      rateOfChangeKgPerWeek:
        profile.rateOfChangeKgPerWeek as unknown as RateOfChangeKgPerWeek
    }
  });

  const currentWeight = watch('weightKg');
  const targetWeight = watch('targetWeightKg');
  const rate = watch('rateOfChangeKgPerWeek');

  const isTargetSameAsCurrent =
    !!currentWeight &&
    targetWeight !== undefined &&
    Math.abs(targetWeight - currentWeight) < 0.01;

  const onSubmit = async (data: {
    heightCm: number;
    weightKg: number;
    targetWeightKg: number;
    rateOfChangeKgPerWeek: RateOfChangeKgPerWeek;
  }) => {
    try {
      const res = await api.put<UserProfileResponse>('/v1/users/profile', data);
      toast.success('Đã cập nhật chỉ số');
      if (res) {
        onProfileUpdate(res);
      }
    } catch (error) {
      let message = 'Không thể cập nhật chỉ số';
      if (error instanceof ApiError) {
        message = error.message;
      }
      toast.error(message);
    }
  };

  return (
    <div className='rounded-lg border bg-card p-6'>
      <h2 className='text-xl font-bold text-foreground mb-6'>Chỉ số</h2>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        {/* Height */}
        <Field>
          <FieldLabel>Chiều cao (cm)</FieldLabel>
          <Controller
            control={control}
            name='heightCm'
            render={({ field }) => (
              <Input
                type='number'
                value={field.value || ''}
                onChange={e => field.onChange(Number(e.target.value))}
                onBlur={field.onBlur}
                placeholder='Nhập chiều cao'
              />
            )}
          />
          {errors.heightCm && (
            <FieldError>{errors.heightCm.message}</FieldError>
          )}
        </Field>

        {/* Weight */}
        <Field>
          <FieldLabel>Cân nặng hiện tại (kg)</FieldLabel>
          <Controller
            control={control}
            name='weightKg'
            render={({ field }) => (
              <Input
                type='number'
                step='0.1'
                value={field.value || ''}
                onChange={e => field.onChange(Number(e.target.value))}
                onBlur={field.onBlur}
                placeholder='Nhập cân nặng'
              />
            )}
          />
          {errors.weightKg && (
            <FieldError>{errors.weightKg.message}</FieldError>
          )}
        </Field>

        {/* Target Weight */}
        <Field>
          <FieldLabel>Cân nặng mục tiêu (kg)</FieldLabel>
          <Controller
            control={control}
            name='targetWeightKg'
            render={({ field }) => (
              <Input
                type='number'
                step='0.1'
                value={field.value || ''}
                onChange={e => field.onChange(Number(e.target.value))}
                onBlur={field.onBlur}
                placeholder='Nhập cân nặng mục tiêu'
              />
            )}
          />
          {errors.targetWeightKg && (
            <FieldError>{errors.targetWeightKg.message}</FieldError>
          )}
        </Field>

        {/* Rate of Change */}
        <Field>
          <RadioList
            label='Tốc độ thay đổi'
            options={RateOfChangeKgPerWeekOptions.map(opt => ({
              label: opt.label,
              value: opt.value,
              disabled:
                opt.value === RateOfChangeKgPerWeek.Zero
                  ? !isTargetSameAsCurrent
                  : isTargetSameAsCurrent
            }))}
            value={rate}
            onChange={val =>
              setValue('rateOfChangeKgPerWeek', val as RateOfChangeKgPerWeek)
            }
            error={errors.rateOfChangeKgPerWeek?.message}
          />
        </Field>

        {/* Weight Chart */}
        <WeightChart
          data={weightHistory}
          targetWeightKg={watch('targetWeightKg') || 0}
        />

        {/* Save Button */}
        <Button type='submit' disabled={isSubmitting}>
          <Save size={16} className='mr-2' />
          {isSubmitting ? 'Đang lưu...' : 'Lưu'}
        </Button>
      </form>
    </div>
  );
}

export { MeasurementsSection };
