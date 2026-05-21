import './globals.css';

import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter } from 'next/font/google';

import { AuthProvider } from '@/context/auth';
import { cn } from '@/lib/shadcn';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'Meal Scheduler',
  description: 'Schedule the meals'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={cn(
        'h-full',
        'antialiased',
        geistSans.variable,
        geistMono.variable,
        'font-sans',
        inter.variable
      )}
    >
      <AuthProvider>
        <body className='min-h-full flex flex-col'>{children}</body>
      </AuthProvider>
    </html>
  );
}
