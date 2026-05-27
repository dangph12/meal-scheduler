'use client';
import type { ApiResponseType } from '@app/shared/api-response';
import { type OnboardResponse } from '@app/shared/dto/user';
import { ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useFormContext } from 'react-hook-form';
import { toast } from 'sonner';

import { OnboardingButtonGroup } from '@/components/onboarding-button-group';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useAuthContext } from '@/context/auth';
import { useOnboarding } from '@/context/onboarding';
import { api, ApiError } from '@/lib/api';

export const Step6Account = () => {
  const router = useRouter();
  const { setAccessToken } = useAuthContext();

  const {
    control,
    register,
    trigger,
    setError,
    formState: { errors }
  } = useFormContext();
  const { setStep } = useOnboarding();

  const handleBack = () => setStep(5);

  const handleFinish = async () => {
    const isValid = await trigger([
      'name',
      'email',
      'password',
      'confirmPassword'
    ]);
    if (!isValid) return;

    const { password, confirmPassword } = control._formValues;
    if (password !== confirmPassword) {
      setError('confirmPassword', { message: 'Mật khẩu không khớp' });
      return;
    }

    try {
      const res = await api.post<ApiResponseType<OnboardResponse>>(
        '/v1/users/onboard',
        control._formValues
      );
      if (!res?.data?.accessToken) return;

      toast.success(res.message || 'Đăng ký thành công');

      setAccessToken(res.data.accessToken);
      router.push('/');
    } catch (error) {
      let message = 'Đăng kí thất bại';
      if (error instanceof ApiError) {
        message = error.message;
      }
      toast.error(message);
    }
  };

  return (
    <div className='space-y-6'>
      <h3 className='text-3xl font-bold'>Tạo tài khoản</h3>
      <p className='text-muted-foreground'>
        Hoàn tất đăng ký để bắt đầu hành trình dinh dưỡng của bạn.
      </p>

      <div className='grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 items-center'>
        <div className='hidden lg:flex justify-end'>
          <ShieldCheck size={240} strokeWidth={1} className='text-primary' />
        </div>

        <div className='w-full max-w-lg mx-auto flex flex-col h-auto lg:h-[500px] px-2'>
          <div className='space-y-2 flex-1'>
            <Field>
              <FieldLabel>Tên</FieldLabel>
              <Input {...register('name')} />
              <div className='h-4'>
                <FieldError errors={[errors.name]} />
              </div>
            </Field>
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input type='email' {...register('email')} />
              <div className='h-4'>
                <FieldError errors={[errors.email]} />
              </div>
            </Field>
            <Field>
              <FieldLabel>Mật khẩu</FieldLabel>
              <Input type='password' {...register('password')} />
              <div className='h-4'>
                <FieldError errors={[errors.password]} />
              </div>
            </Field>
            <Field>
              <FieldLabel>Nhập lại mật khẩu</FieldLabel>
              <Input type='password' {...register('confirmPassword')} />
              <div className='h-4'>
                <FieldError errors={[errors.confirmPassword]} />
              </div>
            </Field>
          </div>
          <div className='pt-8 mt-auto'>
            <OnboardingButtonGroup
              onBack={handleBack}
              onNext={handleFinish}
              isLastStep
            />
          </div>
        </div>
      </div>
    </div>
  );
};
