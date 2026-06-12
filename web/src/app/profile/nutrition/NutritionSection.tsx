'use client';

import { Diet, DietOptions } from '@app/shared/constant/diet';
import {
  ProteinIntakeGPerKg,
  ProteinIntakeGPerKgOptions
} from '@app/shared/constant/protein-intake-g-per-kg';
import type { UserProfileResponse } from '@app/shared/dto/user';
import { Save } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { api, ApiError } from '@/lib/api';

import { defaultProfile } from '../_constants/defaultProfile';
import { CaloriesChart } from './CaloriesChart';

interface NutritionSectionProps {
  profile?: UserProfileResponse;
  calorieHistory?: { date: string; consumedKcal: number; targetKcal: number }[];
  onProfileUpdate?: (profile: UserProfileResponse) => void;
}

function NutritionSection({
  profile = defaultProfile,
  calorieHistory = [],
  onProfileUpdate = () => {}
}: NutritionSectionProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      diet: profile.diet as unknown as Diet,
      proteinIntakeGPerKg:
        profile.proteinIntakeGPerKg as unknown as ProteinIntakeGPerKg,
      caloriesIntake: profile.caloriesIntake
    }
  });

  const onSubmit = async (data: {
    diet: Diet;
    proteinIntakeGPerKg: ProteinIntakeGPerKg;
    caloriesIntake: number;
  }) => {
    try {
      const res = await api.put<UserProfileResponse>('/v1/users/profile', data);
      toast.success('Đã cập nhật thông tin dinh dưỡng');
      if (res) {
        onProfileUpdate(res);
      }
    } catch (error) {
      let message = 'Không thể cập nhật thông tin';
      if (error instanceof ApiError) {
        message = error.message;
      }
      toast.error(message);
    }
  };

  return (
    <div className='rounded-lg border bg-card p-6'>
      <h2 className='text-xl font-bold text-foreground mb-6'>Dinh dưỡng</h2>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        {/* Diet */}
        <Field>
          <FieldLabel>Chế độ ăn</FieldLabel>
          <Controller
            control={control}
            name='diet'
            render={({ field }) => (
              <Select
                value={field.value ?? ''}
                onValueChange={field.onChange}
                onOpenChange={open => !open && field.onBlur()}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Chọn chế độ ăn' />
                </SelectTrigger>
                <SelectContent>
                  {DietOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.diet && <FieldError>{errors.diet.message}</FieldError>}
        </Field>

        {/* Protein Intake */}
        <Field>
          <FieldLabel>Mức độ nạp protein</FieldLabel>
          <Controller
            control={control}
            name='proteinIntakeGPerKg'
            render={({ field }) => (
              <Select
                value={field.value?.toString() ?? ''}
                onValueChange={val => field.onChange(Number(val))}
                onOpenChange={open => !open && field.onBlur()}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Chọn mức độ nạp protein' />
                </SelectTrigger>
                <SelectContent>
                  {ProteinIntakeGPerKgOptions.map(option => (
                    <SelectItem
                      key={option.value}
                      value={option.value.toString()}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.proteinIntakeGPerKg && (
            <FieldError>{errors.proteinIntakeGPerKg.message}</FieldError>
          )}
        </Field>

        {/* Calories Target */}
        <Field>
          <FieldLabel>Lượng calo mục tiêu (kcal)</FieldLabel>
          <Controller
            control={control}
            name='caloriesIntake'
            render={({ field }) => (
              <Input
                type='number'
                value={field.value ?? ''}
                onChange={e => field.onChange(Number(e.target.value))}
                onBlur={field.onBlur}
                placeholder='Nhập lượng calo mục tiêu'
              />
            )}
          />
          {errors.caloriesIntake && (
            <FieldError>{errors.caloriesIntake.message}</FieldError>
          )}
        </Field>

        {/* Calories Chart */}
        <CaloriesChart
          data={calorieHistory}
          targetKcal={profile.caloriesIntake}
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

export { NutritionSection };
