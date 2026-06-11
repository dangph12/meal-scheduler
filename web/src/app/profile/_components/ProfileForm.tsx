'use client';

import {
  ActivityLevel,
  ActivityLevelOptions
} from '@app/shared/constant/activity-level';
import { Diet, DietOptions } from '@app/shared/constant/diet';
import {
  ExerciseFrequency,
  ExerciseFrequencyOptions
} from '@app/shared/constant/exercise-frequency';
import {
  ProteinIntakeGPerKg,
  ProteinIntakeGPerKgOptions
} from '@app/shared/constant/protein-intake-g-per-kg';
import {
  RateOfChangeKgPerWeek,
  RateOfChangeKgPerWeekOptions
} from '@app/shared/constant/rate-of-change-kg-per-week';
import { Sex, SexOptions } from '@app/shared/constant/sex';
import type {
  UpdateProfileRequest,
  UserProfileResponse
} from '@app/shared/dto/user';
import { updateProfileSchema } from '@app/shared/dto/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Calendar, Save } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { RadioList } from '@/components/ui/radio-list';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { api, ApiError } from '@/lib/api';

interface ProfileFormProps {
  profile: UserProfileResponse;
  onProfileUpdate: (profile: UserProfileResponse) => void;
}

function mapToFormDefaults(profile: UserProfileResponse): UpdateProfileRequest {
  return {
    sex: profile.sex as Sex,
    dob: profile.dob,
    heightCm: profile.heightCm,
    weightKg: profile.weightKg,
    activityLevel: Number(profile.activityLevel) as ActivityLevel,
    exerciseFrequency: Number(profile.exerciseFrequency) as ExerciseFrequency,
    targetWeightKg: profile.targetWeightKg,
    rateOfChangeKgPerWeek: Number(
      profile.rateOfChangeKgPerWeek
    ) as RateOfChangeKgPerWeek,
    diet: profile.diet as Diet,
    proteinIntakeGPerKg: Number(
      profile.proteinIntakeGPerKg
    ) as ProteinIntakeGPerKg
  };
}

function ProfileForm({ profile, onProfileUpdate }: ProfileFormProps) {
  const [caloriesIntake, setCaloriesIntake] = useState(profile.caloriesIntake);
  const [savingCalories, setSavingCalories] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty, isSubmitting }
  } = useForm<UpdateProfileRequest>({
    resolver: zodResolver(updateProfileSchema),
    mode: 'onBlur',
    defaultValues: mapToFormDefaults(profile)
  });

  const currentWeight = watch('weightKg');
  const targetWeight = watch('targetWeightKg');
  const rate = watch('rateOfChangeKgPerWeek');

  const isTargetSameAsCurrent =
    !!currentWeight &&
    targetWeight !== undefined &&
    Math.abs(targetWeight - currentWeight) < 0.01;

  const onSubmit = async (data: UpdateProfileRequest) => {
    try {
      const res = await api.put<UserProfileResponse>('/v1/users/profile', data);
      toast.success('Đã cập nhật thông tin');
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

  const handleSaveCalories = async () => {
    setSavingCalories(true);
    try {
      await api.put('/v1/users/calories-intake', {
        caloriesIntake
      });
      toast.success('Đã cập nhật lượng calo mục tiêu');
    } catch (error) {
      let message = 'Không thể cập nhật lượng calo';
      if (error instanceof ApiError) {
        message = error.message;
      }
      toast.error(message);
    } finally {
      setSavingCalories(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
      {/* Personal */}
      <div className='space-y-4'>
        <h2 className='text-lg font-semibold text-foreground font-heading'>
          Cá nhân
        </h2>

        <Field>
          <FieldLabel>Giới tính</FieldLabel>
          <Controller
            control={control}
            name='sex'
            render={({ field }) => (
              <Select
                value={field.value ?? ''}
                onValueChange={field.onChange}
                onOpenChange={open => !open && field.onBlur()}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Chọn giới tính' />
                </SelectTrigger>
                <SelectContent>
                  {SexOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <FieldError errors={[errors.sex]} />
        </Field>

        <Field>
          <FieldLabel>Ngày tháng năm sinh</FieldLabel>
          <Controller
            control={control}
            name='dob'
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    className='w-full justify-between text-left font-normal'
                  >
                    {field.value ? (
                      format(new Date(field.value), 'dd/MM/yyyy', {
                        locale: vi
                      })
                    ) : (
                      <span>Chọn ngày sinh</span>
                    )}
                    <Calendar size={16} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='end'>
                  <CalendarComponent
                    mode='single'
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={date => field.onChange(date?.toISOString())}
                    captionLayout='dropdown'
                    startMonth={new Date(1900, 0, 1)}
                    endMonth={new Date()}
                    disabled={date => date > new Date()}
                    locale={vi}
                  />
                </PopoverContent>
              </Popover>
            )}
          />
          <FieldError errors={[errors.dob]} />
        </Field>

        <Field>
          <FieldLabel>Chiều cao (cm)</FieldLabel>
          <Input
            type='number'
            {...register('heightCm', { valueAsNumber: true })}
          />
          <FieldError errors={[errors.heightCm]} />
        </Field>

        <Field>
          <FieldLabel>Cân nặng hiện tại (kg)</FieldLabel>
          <Input
            type='number'
            step='0.1'
            {...register('weightKg', { valueAsNumber: true })}
          />
          <FieldError errors={[errors.weightKg]} />
        </Field>
      </div>

      <Separator />

      {/* Activity */}
      <div className='space-y-4'>
        <h2 className='text-lg font-semibold text-foreground font-heading'>
          Hoạt động
        </h2>

        <Field>
          <FieldLabel>Mức độ hoạt động</FieldLabel>
          <Controller
            control={control}
            name='activityLevel'
            render={({ field }) => (
              <Select
                value={field.value?.toString() ?? ''}
                onValueChange={val => field.onChange(Number(val))}
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
          <FieldError errors={[errors.activityLevel]} />
        </Field>

        <Field>
          <FieldLabel>Tần suất tập luyện</FieldLabel>
          <Controller
            control={control}
            name='exerciseFrequency'
            render={({ field }) => (
              <Select
                value={field.value?.toString() ?? ''}
                onValueChange={val => field.onChange(Number(val))}
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
          <FieldError errors={[errors.exerciseFrequency]} />
        </Field>
      </div>

      <Separator />

      {/* Goals */}
      <div className='space-y-4'>
        <h2 className='text-lg font-semibold text-foreground font-heading'>
          Mục tiêu
        </h2>

        <Field>
          <FieldLabel>Cân nặng mục tiêu (kg)</FieldLabel>
          <Input
            type='number'
            step='0.1'
            {...register('targetWeightKg', { valueAsNumber: true })}
          />
          <FieldError errors={[errors.targetWeightKg]} />
        </Field>

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
          onChange={val => setValue('rateOfChangeKgPerWeek', Number(val))}
          error={errors.rateOfChangeKgPerWeek?.message as string}
        />
      </div>

      <Separator />

      {/* Nutrition */}
      <div className='space-y-4'>
        <h2 className='text-lg font-semibold text-foreground font-heading'>
          Dinh dưỡng
        </h2>

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
          <FieldError errors={[errors.diet]} />
        </Field>

        <Field>
          <FieldLabel>Mức nạp protein</FieldLabel>
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
                  <SelectValue placeholder='Chọn mức nạp protein' />
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
          <FieldError errors={[errors.proteinIntakeGPerKg]} />
        </Field>

        <Field>
          <FieldLabel>Lượng calo mục tiêu (kcal/ngày)</FieldLabel>
          <div className='flex gap-2'>
            <div className='flex-1'>
              <Input
                type='number'
                value={caloriesIntake}
                onChange={e => setCaloriesIntake(Number(e.target.value))}
              />
            </div>
            <Button
              type='button'
              variant='outline'
              size='sm'
              onClick={handleSaveCalories}
              disabled={savingCalories}
            >
              {savingCalories ? (
                <div className='size-4 border-2 border-primary border-t-transparent rounded-full animate-spin' />
              ) : (
                'Cập nhật'
              )}
            </Button>
          </div>
        </Field>
      </div>

      <div className='pt-2'>
        <Button type='submit' disabled={!isDirty || isSubmitting}>
          {isSubmitting ? (
            <div className='size-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2' />
          ) : (
            <Save size={16} className='mr-2' />
          )}
          Lưu thay đổi
        </Button>
      </div>
    </form>
  );
}

export { ProfileForm };
