'use client';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/context/auth';

export default function Page() {
  const router = useRouter();

  const { name } = useAuthContext();

  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <h1>{name}</h1>
      <Button onClick={() => router.push('/login')}>Navigate to login</Button>
    </div>
  );
}
