import {
  ArrowRight,
  Calendar,
  Check,
  TrendingUp,
  UtensilsCrossed
} from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'EatDee - Lập kế hoạch bữa ăn Việt Nam',
  description:
    'Ứng dụng lập kế hoạch bữa ăn và theo dõi cân nặng với công thức Việt Nam'
};

export default function Home() {
  return (
    <div className='min-h-screen bg-background text-foreground'>
      <a
        href='#main-content'
        className='sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md'
      >
        Skip to main content
      </a>

      {/* Header */}
      <header className='fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border'>
        <div className='max-w-5xl mx-auto px-6 py-4 flex justify-between items-center'>
          <div className='font-bold text-2xl text-primary'>EatDee</div>
          <nav className='flex items-center gap-6'>
            <Link
              href='/login'
              className='text-sm text-muted-foreground hover:text-foreground transition-colors'
            >
              Đăng nhập
            </Link>
            <Button asChild>
              <Link href='/onboarding'>Bắt đầu ngay</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main id='main-content'>
        {/* Hero — Full-width image + overlaid text */}
        <section className='relative min-h-screen'>
          <div className='absolute inset-0'>
            <img
              src='https://images.unsplash.com/photo-1559314809-0d155014e29e?w=1800&q=85'
              alt='Vietnamese food spread'
              className='w-full h-full object-cover'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30' />
          </div>
          <div className='relative max-w-5xl mx-auto px-6 pt-32 pb-24 min-h-screen flex flex-col justify-end'>
            <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight mb-6 max-w-2xl'>
              Lên kế hoạch <span className='text-primary'>bữa ăn</span> thông
              minh
            </h1>
            <p className='text-xl text-muted-foreground mb-10 max-w-lg leading-relaxed'>
              Công thức Việt Nam. Theo dõi cân nặng. Nhận gợi ý calories phù hợp
              với mục tiêu của bạn.
            </p>
            <div className='flex flex-col sm:flex-row gap-4'>
              <Button size='lg' className='text-base' asChild>
                <Link href='/onboarding'>
                  Bắt đầu ngay <ArrowRight className='ml-2 w-5 h-5' />
                </Link>
              </Button>
              <Button
                variant='outline'
                size='lg'
                className='text-base border-foreground/20 bg-background/10 backdrop-blur hover:bg-background/20'
                asChild
              >
                <Link href='/login'>Đăng nhập</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features — Alternating magazine-spread */}
        <section className='py-32 lg:py-48'>
          <div className='max-w-6xl mx-auto px-6 space-y-32 lg:space-y-48'>
            {/* Feature 1 */}
            <div className='grid lg:grid-cols-2 gap-16 lg:gap-24 items-center'>
              <div className='aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl'>
                <img
                  src='https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&q=80'
                  alt='Food'
                  className='w-full h-full object-cover'
                />
              </div>
              <div className='relative pl-8 lg:pl-12'>
                <div className='absolute left-0 top-0 bottom-0 w-1.5 bg-primary rounded-full' />
                <h2 className='text-4xl lg:text-5xl font-bold mb-8 leading-tight'>
                  Cơ sở dữ liệu
                  <br />
                  món ăn Việt
                </h2>
                <p className='text-xl text-muted-foreground leading-relaxed'>
                  Khám phá hơn 1000+ công thức nấu ăn truyền thống và hiện đại.
                  Từ phở bò đến các món healthiest.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className='grid lg:grid-cols-2 gap-16 lg:gap-24 items-center'>
              <div className='relative pl-8 lg:pl-0 lg:pr-12 lg:order-2'>
                <div className='absolute right-0 top-0 bottom-0 w-1.5 bg-accent rounded-full' />
                <h2 className='text-4xl lg:text-5xl font-bold mb-8 leading-tight'>
                  Lập kế hoạch
                  <br />
                  bữa ăn
                </h2>
                <p className='text-xl text-muted-foreground leading-relaxed'>
                  Tự động tạo thực đơn hàng ngày dựa trên mục tiêu calories và
                  sở thích của bạn.
                </p>
              </div>
              <div className='aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl lg:order-1'>
                <img
                  src='https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80'
                  alt='Planning'
                  className='w-full h-full object-cover'
                />
              </div>
            </div>

            {/* Feature 3 */}
            <div className='grid lg:grid-cols-2 gap-16 lg:gap-24 items-center'>
              <div className='aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl'>
                <img
                  src='https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80'
                  alt='Tracking'
                  className='w-full h-full object-cover'
                />
              </div>
              <div className='relative pl-8 lg:pl-12'>
                <div className='absolute left-0 top-0 bottom-0 w-1.5 bg-primary rounded-full' />
                <h2 className='text-4xl lg:text-5xl font-bold mb-8 leading-tight'>
                  Theo dõi
                  <br />
                  cân nặng
                </h2>
                <p className='text-xl text-muted-foreground leading-relaxed'>
                  Cập nhật cân nặng định kỳ để nhận gợi ý calories phù hợp với
                  tiến trình của bạn.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA — Full-width background image with overlay */}
        <section className='relative py-32 lg:py-40 overflow-hidden'>
          <div className='absolute inset-0'>
            <img
              src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1800&q=80'
              alt='Vietnamese food'
              className='w-full h-full object-cover'
            />
            <div className='absolute inset-0 bg-foreground/80' />
          </div>
          <div className='relative max-w-4xl mx-auto px-6 text-center text-background'>
            <h2 className='text-4xl lg:text-6xl font-bold mb-6 leading-tight'>
              Sẵn sàng bắt đầu?
            </h2>
            <p className='text-xl opacity-80 mb-10 max-w-2xl mx-auto'>
              Hãy trải nghiệm cách lập kế hoạch bữa ăn thông minh với ẩm thực
              Việt Nam
            </p>
            <Button
              size='lg'
              className='bg-primary text-primary-foreground hover:bg-primary/90 text-base px-10'
              asChild
            >
              <Link href='/onboarding'>
                Bắt đầu miễn phí <ArrowRight className='ml-2 w-5 h-5' />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className='border-t border-border py-12'>
        <div className='max-w-5xl mx-auto px-6'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-6'>
            <div className='font-bold text-xl text-primary'>EatDee</div>
            <nav className='flex gap-6'>
              <a
                href='https://facebook.com'
                className='text-muted-foreground hover:text-foreground transition-colors'
              >
                Facebook
              </a>
              <a
                href='https://instagram.com'
                className='text-muted-foreground hover:text-foreground transition-colors'
              >
                Instagram
              </a>
            </nav>
            <p className='text-muted-foreground'>&copy; 2026 EatDee</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
