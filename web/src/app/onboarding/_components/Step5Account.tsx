'use client';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useOnboarding } from '@/context/onboarding';

export const Step5Account = () => {
  const {
    control,
    register,
    trigger,
    formState: { errors }
  } = useFormContext();
  const { setStep } = useOnboarding();

  const handleBack = () => setStep(4);

  const handleFinish = async () => {
    const isValid = await trigger([
      'name',
      'email',
      'password',
      'confirmPassword'
    ]);
    if (isValid) {
      console.log('Form Data:', control._formValues);
      alert('Submitted! Check console for data');
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
