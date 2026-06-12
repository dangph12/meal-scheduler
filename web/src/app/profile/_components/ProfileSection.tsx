'use client';

import { Sex, SexOptions } from '@app/shared/constant/sex';
import type { UserProfileResponse } from '@app/shared/dto/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Calendar, Camera, Save } from 'lucide-react';
import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { api, ApiError } from '@/lib/api';
import { cn } from '@/lib/shadcn';

const profileSchema = z.object({
  name: z
    .string()
    .min(1, 'Tên là bắt buộc')
    .min(2, 'Tên phải có ít nhất 2 ký tự')
    .max(50, 'Tên không được vượt quá 50 ký tự'),
  sex: z.enum(Sex, 'Giới tính là bắt buộc'),
  dob: z
    .string()
    .min(1, 'Ngày sinh là bắt buộc')
    .refine(val => !isNaN(Date.parse(val)), 'Ngày sinh không hợp lệ')
    .refine(val => new Date(val) < new Date(), 'Ngày sinh phải trong quá khứ')
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileSectionProps {
  profile?: UserProfileResponse;
  onProfileUpdate?: (profile: UserProfileResponse) => void;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(w => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
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

function ProfileSection({
  profile = defaultProfile,
  onProfileUpdate = () => {}
}: ProfileSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl);
  const [uploading, setUploading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: 'onBlur',
    defaultValues: {
      name: profile.name,
      sex: profile.sex as Sex,
      dob: profile.dob
    }
  });

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await api.post<{ avatarUrl: string }>(
        '/v1/users/avatar',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      if (res?.avatarUrl) {
        setAvatarUrl(res.avatarUrl);
        toast.success('Đã cập nhật ảnh đại diện');
      }
    } catch (error) {
      let message = 'Không thể tải ảnh lên';
      if (error instanceof ApiError) {
        message = error.message;
      }
      toast.error(message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const res = await api.put<UserProfileResponse>('/v1/users/profile', data);
      toast.success('Đã cập nhật hồ sơ');
      if (res) {
        onProfileUpdate(res);
      }
    } catch (error) {
      let message = 'Không thể cập nhật hồ sơ';
      if (error instanceof ApiError) {
        message = error.message;
      }
      toast.error(message);
    }
  };

  return (
    <div className='rounded-lg border bg-card p-6'>
      <h2 className='text-xl font-bold text-foreground mb-6'>Hồ sơ</h2>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        {/* Avatar */}
        <div className='flex items-center gap-4'>
          <div
            className='relative group cursor-pointer'
            onClick={() => fileInputRef.current?.click()}
          >
            <div
              className={cn(
                'size-20 rounded-full flex items-center justify-center text-xl font-bold text-primary-foreground select-none overflow-hidden',
                avatarUrl ? '' : 'bg-primary',
                uploading && 'opacity-60'
              )}
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={profile.name}
                  className='size-full object-cover'
                />
              ) : (
                getInitials(profile.name || '?')
              )}
            </div>
            <div className='absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
              <Camera size={20} className='text-white' />
            </div>
            {uploading && (
              <div className='absolute inset-0 rounded-full bg-black/40 flex items-center justify-center'>
                <div className='size-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type='file'
            accept='image/*'
            className='hidden'
            onChange={handleAvatarUpload}
          />
          <p className='text-sm text-muted-foreground'>Nhấn để thay đổi ảnh</p>
        </div>

        {/* Name */}
        <Field>
          <FieldLabel>Tên</FieldLabel>
          <Input {...register('name')} placeholder='Nhập tên' />
          {errors.name && <FieldError>{errors.name.message}</FieldError>}
        </Field>

        {/* Sex */}
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
          {errors.sex && <FieldError>{errors.sex.message}</FieldError>}
        </Field>

        {/* Date of Birth */}
        <Field>
          <FieldLabel>Ngày sinh</FieldLabel>
          <Controller
            control={control}
            name='dob'
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !field.value && 'text-muted-foreground'
                    )}
                  >
                    <Calendar size={16} className='mr-2' />
                    {field.value
                      ? format(new Date(field.value), 'dd/MM/yyyy', {
                          locale: vi
                        })
                      : 'Chọn ngày sinh'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <CalendarComponent
                    mode='single'
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={date => {
                      field.onChange(date ? date.toISOString() : '');
                      field.onBlur();
                    }}
                    disabled={date => date >= new Date()}
                  />
                </PopoverContent>
              </Popover>
            )}
          />
          {errors.dob && <FieldError>{errors.dob.message}</FieldError>}
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

export { ProfileSection };
