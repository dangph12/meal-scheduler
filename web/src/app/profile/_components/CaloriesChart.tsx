'use client';

import { format, subDays } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Flame } from 'lucide-react';
import { useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  YAxis
} from 'recharts';

import { cn } from '@/lib/shadcn';

interface CalorieDataPoint {
  date: string;
  consumedKcal: number;
  targetKcal: number;
}

interface CaloriesChartProps {
  data: CalorieDataPoint[];
  targetKcal: number;
  loading?: boolean;
}

const DAY_RANGES = [
  { key: 7, label: '7N' },
  { key: 14, label: '14N' },
  { key: 30, label: '30N' }
] as const;

function CaloriesChart({ data, targetKcal, loading }: CaloriesChartProps) {
  const [days, setDays] = useState<number>(7);

  const chartData = useMemo(() => {
    const cutoff = subDays(new Date(), days);
    const recent = data.filter(d => new Date(d.date) >= cutoff);

    const dateMap = new Map<string, CalorieDataPoint>();
    for (let i = days - 1; i >= 0; i--) {
      const d = subDays(new Date(), i);
      const key = format(d, 'yyyy-MM-dd');
      const existing = data.find(e => e.date === key);
      dateMap.set(key, {
        date: key,
        consumedKcal: existing?.consumedKcal ?? 0,
        targetKcal: existing?.targetKcal ?? targetKcal
      });
    }

    return Array.from(dateMap.values());
  }, [data, days, targetKcal]);

  return (
    <div className='bg-card rounded-lg border border-border p-4 space-y-3'>
      <div className='flex items-center justify-between'>
        <h3 className='text-sm font-medium text-foreground font-heading'>
          Calo nạp vào
        </h3>
        <Flame size={14} className='text-muted-foreground' />
      </div>

      {loading ? (
        <div className='h-32 flex items-center justify-center'>
          <div className='size-5 border-2 border-primary border-t-transparent rounded-full animate-spin' />
        </div>
      ) : data.length === 0 ? (
        <div className='h-32 flex flex-col items-center justify-center text-center text-muted-foreground gap-2'>
          <Flame size={24} />
          <p className='text-xs'>Chưa có dữ liệu bữa ăn</p>
        </div>
      ) : (
        <>
          <div className='h-32 w-full'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart
                data={chartData}
                margin={{ top: 5, right: 0, bottom: 5, left: 0 }}
              >
                <YAxis hide domain={[0, 'dataMax + 200']} />
                <Tooltip
                  contentStyle={{
                    borderRadius: '6px',
                    border: '1px solid var(--border)',
                    background: 'var(--card)',
                    fontSize: '12px',
                    padding: '6px 10px'
                  }}
                  labelFormatter={label =>
                    format(new Date(label), 'EEEE, dd/MM', { locale: vi })
                  }
                  formatter={(value, name) => [
                    `${Number(value).toLocaleString()} kcal`,
                    name === 'consumedKcal' ? 'Đã nạp' : 'Mục tiêu'
                  ]}
                />
                <Bar
                  dataKey='consumedKcal'
                  fill='var(--primary)'
                  radius={[2, 2, 0, 0]}
                  maxBarSize={20}
                />
                <ReferenceLine
                  y={targetKcal}
                  stroke='var(--accent)'
                  strokeDasharray='6 3'
                  strokeWidth={2}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className='flex gap-1 justify-center'>
            {DAY_RANGES.map(r => (
              <button
                key={r.key}
                onClick={() => setDays(r.key)}
                className={cn(
                  'px-2 py-1 text-xs rounded-md transition-colors',
                  days === r.key
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted'
                )}
              >
                {r.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export { CaloriesChart };
export type { CalorieDataPoint };
