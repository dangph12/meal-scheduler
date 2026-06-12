'use client';

import { Apple, Ruler, User, Zap } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/shadcn';

const navItems = [
  { href: '/profile', label: 'Hồ sơ', icon: User },
  { href: '/profile/activity', label: 'Hoạt động', icon: Zap },
  { href: '/profile/measurements', label: 'Chỉ số', icon: Ruler },
  { href: '/profile/nutrition', label: 'Dinh dưỡng', icon: Apple }
] as const;

function ProfileNav() {
  const pathname = usePathname();

  return (
    <nav className='sticky top-24'>
      {/* Nav Links */}
      <ul className='space-y-1'>
        {navItems.map(item => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-2.5 rounded-md transition-colors',
                  'hover:bg-muted',
                  isActive
                    ? 'bg-muted text-primary border-l-2 border-primary font-medium'
                    : 'text-muted-foreground'
                )}
              >
                <Icon size={16} />
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
