'use client';

import {
  ActivityLevel,
  ActivityLevelOptions
} from '@app/shared/constant/activity-level';
import {
  ExerciseFrequency,
  ExerciseFrequencyOptions
} from '@app/shared/constant/exercise-frequency';
import type { UserProfileResponse } from '@app/shared/dto/user';
import { Save } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { api, ApiError } from '@/lib/api';

interface ActivitySectionProps {
  profile?: UserProfileResponse;
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

function ActivitySection({
  profile = defaultProfile,
  onProfileUpdate = () => {}
}: ActivitySectionProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      activityLevel: profile.activityLevel as unknown as ActivityLevel,
      exerciseFrequency:
        profile.exerciseFrequency as unknown as ExerciseFrequency
    }
  });

  const onSubmit = async (data: {
    activityLevel: ActivityLevel;
    exerciseFrequency: ExerciseFrequency;
  }) => {
    try {
      const res = await api.put<UserProfileResponse>('/v1/users/profile', data);
      toast.success('Đã cập nhật thông tin hoạt động');
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
      <h2 className='text-xl font-bold text-foreground mb-6'>Hoạt động</h2>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        {/* Activity Level */}
        <Field>
          <FieldLabel>Mức độ hoạt động</FieldLabel>
          <Controller
            control={control}
            name='activityLevel'
            render={({ field }) => (
              <Select
                value={field.value?.toString() ?? ''}
                onValueChange={field.onChange}
                onOpenChange={open => !open && field.onBlur()}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Chọn mức độ hoạt động' />
                </SelectTrigger>
                <SelectContent>
                  {ActivityLevelOptions.map(option => (
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
          {errors.activityLevel && (
            <FieldError>{errors.activityLevel.message}</FieldError>
          )}
        </Field>

        {/* Exercise Frequency */}
        <Field>
          <FieldLabel>Tần suất tập luyện</FieldLabel>
          <Controller
            control={control}
            name='exerciseFrequency'
            render={({ field }) => (
              <Select
                value={field.value?.toString() ?? ''}
                onValueChange={field.onChange}
                onOpenChange={open => !open && field.onBlur()}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Chọn tần suất tập luyện' />
                </SelectTrigger>
                <SelectContent>
                  {ExerciseFrequencyOptions.map(option => (
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
          {errors.exerciseFrequency && (
            <FieldError>{errors.exerciseFrequency.message}</FieldError>
          )}
        </Field>

        {/* Save Button */}
        <Button type='submit' disabled={isSubmitting}>
          <Save size={16} className='mr-2' />
          {isSubmitting ? 'Đang lưu...' : 'Lưu'}
        </Button>
      </form>
    </div>
  );
}

export { ActivitySection };
