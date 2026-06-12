'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/context/auth';
import { cn } from '@/lib/shadcn';

import { ProfileNav } from './_components/ProfileNav';

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(w => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default function ProfileLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { name } = useAuthContext();

  return (
    <div className='min-h-screen bg-background'>
      <div className='max-w-6xl mx-auto px-4 py-8'>
        <div className='lg:grid lg:grid-cols-[280px_1fr] lg:gap-10'>
          {/* Sidebar */}
          <aside className='mb-8 lg:mb-0'>
            {/* Avatar - always visible */}
            <div className='flex items-center gap-3 mb-6 px-2'>
              <div className='size-12 rounded-full flex items-center justify-center text-sm font-bold text-primary-foreground select-none overflow-hidden shrink-0 bg-primary'>
                {getInitials(name?.trim() ? name : '?')}
              </div>
              <div className='min-w-0'>
                <p className='font-semibold text-foreground truncate'>
                  {name?.trim() ? name : 'Người dùng'}
                </p>
                <p className='text-xs text-muted-foreground'>
                  Tài khoản cá nhân
                </p>
              </div>
            </div>

            {/* Mobile hamburger */}
            <div className='lg:hidden mb-4'>
              <Button
                variant='outline'
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className='w-full justify-between'
              >
                <span>Menu</span>
                {sidebarOpen ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </Button>
            </div>

            {/* Nav links */}
            <div className={cn('lg:block', sidebarOpen ? 'block' : 'hidden')}>
              <ProfileNav />
            </div>
          </aside>

          {/* Main content */}
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
