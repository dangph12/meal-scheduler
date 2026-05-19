export enum ExerciseFrequency {
  None = 0,
  Low = 0.1,
  Medium = 0.2,
  High = 0.3
}

export const ExerciseFrequencyOptions = [
  {
    label: '0 Buổi/tuần',
    value: ExerciseFrequency.None
  },
  {
    label: '1-3 Buổi/tuần',
    value: ExerciseFrequency.Low
  },
  {
    label: '4-6 Buổi/tuần',
    value: ExerciseFrequency.Medium
  },
  {
    label: '7+ Buổi/tuần',
    value: ExerciseFrequency.High
  }
];
