'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/shadcn';

const navItems = [
  { label: 'Giới thiệu', href: '#about' },
  { label: 'Tính năng', href: '#features' },
  { label: 'Công thức', href: '#recipes' }
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <header className='fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border dark:bg-background/60'>
      <div className='max-w-6xl mx-auto px-6 py-4 flex items-center justify-between'>
        {/* Logo */}
        <Link href='/' className='font-bold text-2xl text-primary'>
          EatDee
        </Link>

        {/* Desktop nav */}
        <nav className='hidden md:flex items-center gap-6'>
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className='hidden md:flex items-center gap-3'>
          <Button variant='ghost' size='sm' asChild>
            <Link href='/login'>Đăng nhập</Link>
          </Button>
          <Button size='sm' asChild>
            <Link href='/onboarding'>Bắt đầu ngay</Link>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <div className='md:hidden relative'>
          <Button
            variant='ghost'
            size='icon'
            aria-label={mobileOpen ? 'Đóng menu' : 'Mở menu'}
            aria-expanded={mobileOpen}
            aria-controls='mobile-nav-menu'
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className='h-5 w-5' />
            ) : (
              <Menu className='h-5 w-5' />
            )}
          </Button>

          {/* Inline dropdown — not a drawer */}
          {mobileOpen && (
            <>
              <div
                className='fixed inset-0 top-[65px] bg-black/20'
                onClick={() => setMobileOpen(false)}
              />
              <div className='absolute right-0 top-full mt-2 w-52 bg-card rounded-xl border shadow-lg py-2'>
                <nav className='flex flex-col'>
                  {navItems.map(item => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className='px-4 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors'
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className='border-t mt-2 pt-2 px-3 flex flex-col gap-2'>
                    <Button
                      variant='outline'
                      size='sm'
                      className='w-full justify-center'
                      asChild
                      onClick={() => setMobileOpen(false)}
                    >
                      <Link href='/login'>Đăng nhập</Link>
                    </Button>
                    <Button
                      size='sm'
                      className='w-full justify-center'
                      asChild
                      onClick={() => setMobileOpen(false)}
                    >
                      <Link href='/onboarding'>Bắt đầu ngay</Link>
                    </Button>
                  </div>
                </nav>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
