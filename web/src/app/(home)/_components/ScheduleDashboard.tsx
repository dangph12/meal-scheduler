'use client';

import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Scale } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { CalorieSummary } from './CalorieSummary';
import type { Meal } from './MealCard';
import { MealSection } from './MealSection';
import { WeightInputModal } from './WeightInputModal';

const MOCK_MEALS: Meal[] = [
  {
    id: '1',
    name: 'Phở Bò Tái',
    calories: 450,
    protein: 25,
    carbs: 55,
    fat: 12,
    imageUrl:
      'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=200&q=80'
  },
  {
    id: '2',
    name: 'Bánh Mì Thịt',
    calories: 350,
    protein: 15,
    carbs: 40,
    fat: 14
  },
  {
    id: '3',
    name: 'Cơm Tấm Sườn Bì Chả',
    calories: 650,
    protein: 35,
    carbs: 70,
    fat: 22,
    imageUrl:
      'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=200&q=80'
  },
  {
    id: '4',
    name: 'Bún Bò Huế',
    calories: 550,
    protein: 30,
    carbs: 60,
    fat: 18
  },
  {
    id: '5',
    name: 'Gỏi Cuốn Tôm Thịt',
    calories: 180,
    protein: 12,
    carbs: 20,
    fat: 5
  },
  {
    id: '6',
    name: 'Cà Phê Sữa Đá',
    calories: 120,
    protein: 3,
    carbs: 15,
    fat: 4
  }
];

function ScheduleDashboard() {
  const [meals] = useState<Meal[]>(MOCK_MEALS);

  const today = format(new Date(), 'EEEE, dd MMMM yyyy', { locale: vi });

  const breakfastMeals = meals.slice(0, 2);
  const lunchMeals = meals.slice(2, 4);
  const dinnerMeals = meals.slice(4, 6);

  const totalConsumed = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const totalProtein = meals.reduce((sum, meal) => sum + meal.protein, 0);
  const totalCarbs = meals.reduce((sum, meal) => sum + meal.carbs, 0);
  const totalFat = meals.reduce((sum, meal) => sum + meal.fat, 0);

  const handleLogWeight = (_weight: number) => {
    // TODO: Submit to API
  };

  return (
    <div className='min-h-screen bg-background'>
      <header className='sticky top-0 z-10 bg-background border-b border-border px-4 py-4'>
        <div className='max-w-6xl mx-auto flex items-center justify-between'>
          <div>
            <p className='text-sm text-muted-foreground'>Today</p>
            <h1 className='text-xl font-semibold text-foreground capitalize'>
              {today}
            </h1>
          </div>
          <WeightInputModal
            trigger={
              <Button variant='outline' size='sm'>
                <Scale size={16} className='mr-2' />
                Log Weight
              </Button>
            }
            onSubmit={handleLogWeight}
          />
        </div>
      </header>

      <main className='max-w-6xl mx-auto px-4 py-6'>
        <div className='lg:hidden sticky top-[calc(4rem+1rem)] z-10 pb-4 bg-background'>
          <CalorieSummary
            consumed={totalConsumed}
            goal={2000}
            protein={totalProtein}
            proteinGoal={150}
            carbs={totalCarbs}
            carbsGoal={250}
            fat={totalFat}
            fatGoal={65}
            compact
          />
        </div>

        <div className='lg:grid lg:grid-cols-[1fr_320px] lg:gap-6'>
          <div className='space-y-6 lg:order-1'>
            <MealSection title='Breakfast' meals={breakfastMeals} />
            <MealSection title='Lunch' meals={lunchMeals} />
            <MealSection title='Dinner' meals={dinnerMeals} />
            <MealSection title='Snacks' meals={[]} />
          </div>

          <div className='hidden lg:block lg:order-2'>
            <div className='sticky top-24'>
              <CalorieSummary
                consumed={totalConsumed}
                goal={2000}
                protein={totalProtein}
                proteinGoal={150}
                carbs={totalCarbs}
                carbsGoal={250}
                fat={totalFat}
                fatGoal={65}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export { ScheduleDashboard };
