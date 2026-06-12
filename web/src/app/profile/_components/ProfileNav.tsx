'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/shadcn';

const navItems = [
  { href: '/profile', label: 'Hồ sơ' },
  { href: '/profile/activity', label: 'Hoạt động' },
  { href: '/profile/measurements', label: 'Chỉ số' },
  { href: '/profile/nutrition', label: 'Dinh dưỡng' }
] as const;

function ProfileNav() {
  const pathname = usePathname();

  return (
    <nav className='sticky top-24'>
      <ul className='space-y-1'>
        {navItems.map(item => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'block px-4 py-2.5 rounded-md transition-colors',
                  'hover:bg-muted',
                  isActive
                    ? 'bg-muted text-primary border-l-2 border-primary font-medium'
                    : 'text-muted-foreground'
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export { ProfileNav };
