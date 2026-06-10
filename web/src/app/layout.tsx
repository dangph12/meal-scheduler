import './globals.css';

import type { Metadata } from 'next';
import { Be_Vietnam_Pro, Manrope } from 'next/font/google';
import { ThemeProvider } from 'next-themes';

import { Navbar } from '@/components/navbar';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/context/auth';
import { cn } from '@/lib/shadcn';

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-be-vietnam-pro'
});

const manrope = Manrope({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-manrope'
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
      suppressHydrationWarning
      className={cn(
        'h-full',
        'antialiased',
        beVietnamPro.variable,
        manrope.variable
      )}
    >
      <body className='min-h-full flex flex-col'>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <Navbar />
            <div className='flex-1 pt-16'>{children}</div>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
