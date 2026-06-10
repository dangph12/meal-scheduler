'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

interface FormData {
  weight: number;
}

interface WeightInputModalProps {
  trigger?: React.ReactNode;
  onSubmit?: (weight: number) => void;
}

function WeightInputModal({ trigger, onSubmit }: WeightInputModalProps) {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm<FormData>();

  const onFormSubmit = (data: FormData) => {
    onSubmit?.(data.weight);
    toast.success(`Weight logged: ${data.weight} kg`);
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Log Weight</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onFormSubmit)} className='space-y-4'>
          <div className='space-y-2'>
            <label htmlFor='weight' className='text-sm font-medium'>
              Current weight (kg)
            </label>
            <Input
              id='weight'
              type='number'
              step='0.1'
              placeholder='70.0'
              {...register('weight', { valueAsNumber: true })}
            />
          </div>
          <div className='flex justify-end gap-2'>
            <Button
              type='button'
              variant='outline'
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type='submit'>Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export { WeightInputModal };
