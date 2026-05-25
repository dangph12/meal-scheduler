'use client';
import type { ApiResponseType } from '@app/shared/api-response';
import { type OnboardResponse } from '@app/shared/dto/user';
import { useRouter } from 'next/navigation';
import { useFormContext } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useAuthContext } from '@/context/auth';
import { useOnboarding } from '@/context/onboarding';
import { api, ApiError } from '@/lib/api';
export const Step5Account = () => {
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
    <div className='space-y-4'>
      <h2>Tạo tài khoản</h2>
      <Field>
        <FieldLabel>Tên</FieldLabel>
        <Input {...register('name')} />
        <FieldError errors={[errors.name]} />
      </Field>
      <Field>
        <FieldLabel>Email</FieldLabel>
        <Input type='email' {...register('email')} />
        <FieldError errors={[errors.email]} />
      </Field>
      <Field>
        <FieldLabel>Mật khẩu</FieldLabel>
        <Input type='password' {...register('password')} />
        <FieldError errors={[errors.password]} />
      </Field>
      <Field>
        <FieldLabel>Nhập lại mật khẩu</FieldLabel>
        <Input type='password' {...register('confirmPassword')} />
        <FieldError errors={[errors.confirmPassword]} />
      </Field>
      <Button onClick={handleBack}>Quay trở lại</Button>
      <Button onClick={handleFinish}>Hoàn thành</Button>
    </div>
  );
};
