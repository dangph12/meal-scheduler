import { ArrowRight } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';
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

      <header className='fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border dark:bg-background/60'>
        <div className='max-w-6xl mx-auto px-6 py-4 flex justify-between items-center'>
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
        {/* Hero */}
        <section className='relative min-h-screen'>
          <div className='absolute inset-0'>
            <Image
              src='https://images.unsplash.com/photo-1559314809-0d155014e29e?w=1800&q=85'
              alt='Một bàn ăn Việt Nam với nhiều món ăn truyền thống'
              fill
              className='object-cover'
              priority
              sizes='100vw'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20 dark:from-foreground dark:via-foreground/80 dark:to-foreground/30' />
          </div>
          <div className='relative max-w-6xl mx-auto px-6 pt-32 pb-24 min-h-screen flex flex-col justify-end'>
            <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1] tracking-tight mb-6 max-w-3xl'>
              Lên kế hoạch{' '}
              <span className=' whitespace-nowrap'>
                <span className='text-primary'>bữa ăn</span> thông minh
              </span>
            </h1>
            <p className='text-lg sm:text-xl text-muted-foreground mb-10 max-w-lg leading-relaxed'>
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
                className='text-base border-foreground/20 bg-background/10 backdrop-blur hover:bg-background/20 dark:border-background/20 dark:bg-foreground/10'
                asChild
              >
                <Link href='/login'>Đăng nhập</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className='py-24 lg:py-32'>
          <div className='max-w-6xl mx-auto px-6 space-y-20 lg:space-y-28'>
            {/* Feature 1 */}
            <div className='grid lg:grid-cols-2 gap-12 lg:gap-20 items-center'>
              <div className='relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg'>
                <Image
                  src='https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&q=80'
                  alt='Bát phở bò với thịt bò tái, hành tây và rau mầm'
                  fill
                  className='object-cover'
                  sizes='(max-width: 1024px) 100vw, 50vw'
                />
              </div>
              <div className='relative pl-6 lg:pl-10'>
                <div className='absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-full' />
                <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 leading-tight text-wrap:balance'>
                  Cơ sở dữ liệu
                  <br />
                  món ăn Việt
                </h2>
                <p className='text-base sm:text-lg text-muted-foreground leading-relaxed'>
                  Khám phá hơn 1000+ công thức nấu ăn truyền thống và hiện đại.
                  Từ phở bò đến các món healthiest.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className='grid lg:grid-cols-2 gap-12 lg:gap-20 items-center'>
              <div className='relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg order-1'>
                <Image
                  src='https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80'
                  alt='Sổ tay kế hoạch bữa ăn với danh sách thực phẩm'
                  fill
                  className='object-cover'
                  sizes='(max-width: 1024px) 100vw, 50vw'
                />
              </div>
              <div className='relative pl-6 lg:pl-10 order-2'>
                <div className='absolute left-0 top-0 bottom-0 w-1 bg-accent rounded-full' />
                <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 leading-tight text-wrap:balance'>
                  Lập kế hoạch
                  <br />
                  bữa ăn
                </h2>
                <p className='text-base sm:text-lg text-muted-foreground leading-relaxed'>
                  Tự động tạo thực đơn hàng ngày dựa trên mục tiêu calories và
                  sở thích của bạn.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className='grid lg:grid-cols-2 gap-12 lg:gap-20 items-center'>
              <div className='relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg'>
                <Image
                  src='https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80'
                  alt='Biểu đồ theo dõi cân nặng với đường xu hướng'
                  fill
                  className='object-cover'
                  sizes='(max-width: 1024px) 100vw, 50vw'
                />
              </div>
              <div className='relative pl-6 lg:pl-10'>
                <div className='absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-full' />
                <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 leading-tight text-wrap:balance'>
                  Theo dõi
                  <br />
                  cân nặng
                </h2>
                <p className='text-base sm:text-lg text-muted-foreground leading-relaxed'>
                  Cập nhật cân nặng định kỳ để nhận gợi ý calories phù hợp với
                  tiến trình của bạn.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className='relative py-24 lg:py-32 overflow-hidden'>
          <div className='absolute inset-0'>
            <Image
              src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1800&q=80'
              alt='Đồ ăn Việt Nam được bày trí đẹp mắt'
              fill
              className='object-cover'
              sizes='100vw'
            />
            <div className='absolute inset-0 bg-foreground/85 dark:bg-foreground/90' />
          </div>
          <div className='relative max-w-4xl mx-auto px-6 text-center text-background'>
            <h2 className='text-3xl lg:text-5xl font-bold mb-6 leading-tight text-wrap:balance'>
              Sẵn sàng bắt đầu?
            </h2>
            <p className='text-lg sm:text-xl opacity-90 mb-10 max-w-2xl mx-auto'>
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

      <footer className='border-t border-border py-12 dark:border-border'>
        <div className='max-w-6xl mx-auto px-6'>
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
