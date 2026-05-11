'use client';
import { useRouter } from 'next/navigation';
import { SubmitEvent } from 'react';

import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useAuthContext } from '@/context/auth';

export default function Page() {
  const router = useRouter();

  const { setAccessToken } = useAuthContext();

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/login`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      }
    );

    if (response.ok) {
      const data = await response.json();
      setAccessToken(data.data.accessToken);
      router.push('/');
    } else {
      console.error('Login failed');
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
              name='email'
              type='email'
              placeholder='alice@mail.com'
              autoComplete='email'
            />
          </Field>
          <Field>
            <FieldLabel htmlFor='password'>Password</FieldLabel>
            <Input
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
