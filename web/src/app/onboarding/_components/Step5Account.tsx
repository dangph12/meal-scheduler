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
import { api } from '@/lib/api';
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

  const handleBack = () => setStep(4);

  const handleFinish = async () => {
    const { password, confirmPassword } = control._formValues;

    if (password !== confirmPassword) {
      setError('confirmPassword', {
        message: 'Mật khẩu không khớp'
      });
      return;
    }

    const isValid = await trigger([
      'name',
      'email',
      'password',
      'confirmPassword'
    ]);
    if (isValid) {
      try {
        const res = await api.post<ApiResponseType<OnboardResponse>>(
          '/v1/users/onboard',
          control._formValues
        );

        if (!res || !res.data?.accessToken) {
          console.error('Invalid response from server:', res);
          return;
        }

        const accessToken = res.data.accessToken;

        setAccessToken(accessToken);
        router.push('/');
      } catch (error) {
        let message = 'Đăng ký thất bại';
        if (typeof error === 'object' && error !== null && 'message' in error) {
          message = String(error.message);
        }
        toast.error(message);
      }
    }
  };

  return (
    <div className='space-y-4'>
      <h2>Account Info</h2>
      <Field>
        <FieldLabel>Name</FieldLabel>
        <Input {...register('name')} />
        <FieldError errors={[errors.name]} />
      </Field>
      <Field>
        <FieldLabel>Email</FieldLabel>
        <Input type='email' {...register('email')} />
        <FieldError errors={[errors.email]} />
      </Field>
      <Field>
        <FieldLabel>Password</FieldLabel>
        <Input type='password' {...register('password')} />
        <FieldError errors={[errors.password]} />
      </Field>
      <Field>
        <FieldLabel>Confirm Password</FieldLabel>
        <Input type='password' {...register('confirmPassword')} />
        <FieldError errors={[errors.confirmPassword]} />
      </Field>
      <Button onClick={handleBack}>Back</Button>
      <Button onClick={handleFinish}>Finish</Button>
    </div>
  );
};
