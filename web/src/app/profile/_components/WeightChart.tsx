'use client';

import { format, subMonths } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Scale } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip, YAxis } from 'recharts';

import { cn } from '@/lib/shadcn';

interface WeightDataPoint {
  date: string;
  weightKg: number;
}

interface WeightChartProps {
  data: WeightDataPoint[];
  targetWeightKg: number;
  loading?: boolean;
}

const RANGES = [
  { key: '1M', label: '1T', months: 1 },
  { key: '3M', label: '3T', months: 3 },
  { key: '6M', label: '6T', months: 6 },
  { key: '1Y', label: '1N', months: 12 },
  { key: 'ALL', label: 'Tất cả', months: Infinity }
] as const;

type RangeKey = (typeof RANGES)[number]['key'];

function filterByRange(
  data: WeightDataPoint[],
  range: RangeKey
): WeightDataPoint[] {
  if (range === 'ALL') return data;
  const rangeDef = RANGES.find(r => r.key === range);
  if (!rangeDef) return data;
  const cutoff = subMonths(new Date(), rangeDef.months);
  return data.filter(d => new Date(d.date) >= cutoff);
}

function WeightChart({ data, targetWeightKg, loading }: WeightChartProps) {
  const [range, setRange] = useState<RangeKey>('3M');

  const filteredData = useMemo(() => filterByRange(data, range), [data, range]);

  const chartData = useMemo(
    () =>
      filteredData.map(d => ({
        ...d,
        targetWeight: targetWeightKg
      })),
    [filteredData, targetWeightKg]
  );

  return (
    <div className='bg-card rounded-lg border border-border p-4 space-y-3'>
      <div className='flex items-center justify-between'>
        <h3 className='text-sm font-medium text-foreground font-heading'>
          Cân nặng
        </h3>
        <Scale size={14} className='text-muted-foreground' />
      </div>

      {loading ? (
        <div className='h-32 flex items-center justify-center'>
          <div className='size-5 border-2 border-primary border-t-transparent rounded-full animate-spin' />
        </div>
      ) : data.length === 0 ? (
        <div className='h-32 flex flex-col items-center justify-center text-center text-muted-foreground gap-2'>
          <Scale size={24} />
          <p className='text-xs'>Ghi cân nặng đầu tiên để xem xu hướng</p>
        </div>
      ) : (
        <>
          <div className='h-32 w-full'>
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
              >
                <YAxis hide domain={['dataMin - 2', 'dataMax + 2']} />
                <Tooltip
                  contentStyle={{
                    borderRadius: '6px',
                    border: '1px solid var(--border)',
                    background: 'var(--card)',
                    fontSize: '12px',
                    padding: '6px 10px'
                  }}
                  labelFormatter={label =>
                    format(new Date(label), 'dd/MM/yyyy', { locale: vi })
                  }
                  formatter={(value, name) => [
                    `${Number(value).toFixed(1)} kg`,
                    name === 'weightKg' ? 'Thực tế' : 'Mục tiêu'
                  ]}
                />
                <Line
                  type='monotone'
                  dataKey='weightKg'
                  stroke='var(--primary)'
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
                <Line
                  type='monotone'
                  dataKey='targetWeight'
                  stroke='var(--accent)'
                  strokeWidth={2}
                  strokeDasharray='6 3'
                  dot={false}
                  activeDot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className='flex gap-1 justify-center'>
            {RANGES.map(r => (
              <button
                key={r.key}
                onClick={() => setRange(r.key)}
                className={cn(
                  'px-2 py-1 text-xs rounded-md transition-colors',
                  range === r.key
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

export { WeightChart };
export type { WeightDataPoint };
