'use client';
import { useRouter } from 'next/navigation';
import { SubmitEvent } from 'react';

import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useAuthContext } from '@/context/auth';
import { api } from '@/lib/api';

export default function Page() {
  const router = useRouter();

  const { setAccessToken } = useAuthContext();

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const data = await api.post<{ data: { accessToken: string } }>(
        '/v1/auth/login',
        { email, password }
      );
      setAccessToken(data.data.accessToken);
      router.push('/');
    } catch (error) {
      console.error('Login failed', error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col items-center justify-center gap-4'
    >
      <FieldSet className='w-full max-w-xs'>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor='email'>Email</FieldLabel>
            <Input
              id='email'
              name='email'
              type='email'
              placeholder='alice@mail.com'
              autoComplete='email'
            />
          </Field>
          <Field>
            <FieldLabel htmlFor='password'>Password</FieldLabel>
            <Input
              id='password'
              name='password'
              type='password'
              placeholder='********'
              autoComplete='current-password'
            />
          </Field>
        </FieldGroup>
      </FieldSet>
      <Button type='submit'>Login</Button>
    </form>
  );
}
