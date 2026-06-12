import type { UserProfileResponse } from '@app/shared/dto/user';

export const defaultProfile: UserProfileResponse = {
  name: '',
  email: '',
  avatarUrl: null,
  sex: 'MALE',
  dob: '',
  heightCm: 0,
  weightKg: 0,
  activityLevel: '1',
  exerciseFrequency: '1',
  targetWeightKg: 0,
  rateOfChangeKgPerWeek: '0.5',
  diet: 'BALANCED',
  proteinIntakeGPerKg: '1.2',
  caloriesIntake: 0
};
