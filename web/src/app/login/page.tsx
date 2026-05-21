'use client';
import type { ApiResponseType } from '@app/shared/api-response';
import {
  type LoginRequest,
  loginRequestSchema,
  type LoginResponse
} from '@app/shared/dto/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useAuthContext } from '@/context/auth';
import { api } from '@/lib/api';

export default function Page() {
  const router = useRouter();
  const { setAccessToken } = useAuthContext();

  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting }
  } = useForm<LoginRequest>({
    resolver: zodResolver(loginRequestSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  async function onSubmit(data: LoginRequest) {
    try {
      const res = await api.post<ApiResponseType<LoginResponse>>(
        '/v1/auth/login',
        data
      );

      if (!res || !res.data?.accessToken) {
        console.error('Invalid response from server:', res);
        return;
      }

      setAccessToken(res.data.accessToken);
      router.push('/');
    } catch (error) {
      let message = 'Đăng nhập thất bại';
      if (typeof error === 'object' && error !== null && 'message' in error) {
        message = String(error.message);
      }
      toast.error(message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col items-center justify-center gap-4'
    >
      <FieldSet className='w-full max-w-xs'>
        <FieldGroup>
          <Controller
            name='email'
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='email'>Email</FieldLabel>
                <Input
                  {...field}
                  id='email'
                  type='text'
                  placeholder='alice@mail.com'
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name='password'
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='password'>Password</FieldLabel>
                <Input
                  {...field}
                  id='password'
                  type='password'
                  placeholder='••••••••'
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <Button type='submit' disabled={isSubmitting}>
          {isSubmitting ? 'Logging in…' : 'Login'}
        </Button>
      </FieldSet>
    </form>
  );
}
