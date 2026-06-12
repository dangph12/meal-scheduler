import { ProfileNav } from './_components/ProfileNav';

export default function ProfileLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='min-h-screen bg-background pt-20'>
      <div className='max-w-6xl mx-auto px-4 py-8'>
        <div className='lg:grid lg:grid-cols-[280px_1fr] lg:gap-10'>
          {/* Sidebar */}
          <aside className='mb-8 lg:mb-0'>
            <ProfileNav />
          </aside>

          {/* Main content */}
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
