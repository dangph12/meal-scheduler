'use client';

import type {
  CalorieHistoryResponse,
  UserProfileResponse,
  WeightHistoryResponse
} from '@app/shared/dto/user';
import { useEffect, useState } from 'react';

import { useAuthContext } from '@/context/auth';
import { api, ApiError } from '@/lib/api';

import { AvatarCard } from './_components/AvatarCard';
import { CaloriesChart } from './_components/CaloriesChart';
import { ProfileForm } from './_components/ProfileForm';
import { WeightChart } from './_components/WeightChart';

function ProfilePage() {
  const { name, accessToken } = useAuthContext();

  const [profile, setProfile] = useState<UserProfileResponse | null>(null);
  const [weightHistory, setWeightHistory] = useState<
    WeightHistoryResponse | undefined
  >(undefined);
  const [calorieHistory, setCalorieHistory] = useState<
    CalorieHistoryResponse | undefined
  >(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!accessToken) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [profileRes, weightRes, calorieRes] = await Promise.all([
          api.get<UserProfileResponse>('/v1/users/profile'),
          api.get<WeightHistoryResponse>(
            '/v1/users/weight-history?page=1&pageSize=500'
          ),
          api.get<CalorieHistoryResponse>('/v1/users/calorie-history?days=30')
        ]);

        if (profileRes) setProfile(profileRes);
        if (weightRes) setWeightHistory(weightRes);
        if (calorieRes) setCalorieHistory(calorieRes);
      } catch (err) {
        let message = 'Không thể tải thông tin hồ sơ';
        if (err instanceof ApiError) {
          message = err.message;
        }
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [accessToken]);

  const handleAvatarUpdate = (avatarUrl: string) => {
    setProfile(prev => (prev ? { ...prev, avatarUrl } : prev));
  };

  if (!accessToken) {
    return (
      <div className='min-h-screen bg-background pt-20 flex items-center justify-center'>
        <p className='text-muted-foreground'>Vui lòng đăng nhập để xem hồ sơ</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className='min-h-screen bg-background pt-20 flex items-center justify-center'>
        <div className='size-8 border-2 border-primary border-t-transparent rounded-full animate-spin' />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className='min-h-screen bg-background pt-20 flex items-center justify-center'>
        <p className='text-destructive'>{error ?? 'Không tìm thấy dữ liệu'}</p>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-background pt-20'>
      <div className='max-w-6xl mx-auto px-4 py-8'>
        <div className='lg:grid lg:grid-cols-[280px_1fr] lg:gap-10'>
          {/* Sidebar */}
          <aside className='space-y-6 mb-8 lg:mb-0'>
            <AvatarCard
              name={name ?? profile.name}
              avatarUrl={profile.avatarUrl}
              onAvatarUpdate={handleAvatarUpdate}
            />

            <WeightChart
              data={weightHistory?.data ?? []}
              targetWeightKg={profile.targetWeightKg}
              loading={loading}
            />

            <CaloriesChart
              data={calorieHistory?.data ?? []}
              targetKcal={profile.caloriesIntake}
              loading={loading}
            />
          </aside>

          {/* Main content */}
          <main>
            <h1 className='text-2xl font-bold text-foreground font-heading mb-8'>
              Thông tin hồ sơ
            </h1>
            <ProfileForm profile={profile} onProfileUpdate={setProfile} />
          </main>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
