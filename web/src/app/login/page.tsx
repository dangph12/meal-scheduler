'use client';
import type { ApiResponseType } from '@app/shared/api-response';
import {
  type LoginRequest,
  loginRequestSchema,
  type LoginResponse
} from '@app/shared/dto/auth';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';

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
    formState: { errors, isSubmitting }
  } = useForm<LoginRequest>({
    resolver: standardSchemaResolver(loginRequestSchema),
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
      setAccessToken(res.data!.accessToken);
      router.push('/');
    } catch (error) {
      setError('root', { message: 'Login failed. Check your credentials.' });
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
                  type='email'
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
        {errors.root && <FieldError errors={[errors.root]} />}
        <Button type='submit' disabled={isSubmitting}>
          {isSubmitting ? 'Logging in…' : 'Login'}
        </Button>
      </FieldSet>
    </form>
  );
}
