import { Sex } from '@app/shared/constant';

interface UserBodyMetrics {
  sex: Sex;
  dob: Date;
  heightCm: number;
  weightKg: number;
  exerciseFrequencyFactor: number; // 0, 0.1,0.2, 0.3
  activityLevelFactor: number; // 1.2, 1.4, 1.6
}

interface UserIntake {
  weightKg: number;
  tdee: number;
  targetWeightKg: number;
  rateOfChangeKgPerWeek: number; // Absolute positive number (e.g., 0.5)
}

const calculateTDEE = (user: UserBodyMetrics): number => {
  const age = Math.floor(
    (Date.now() - user.dob.getTime()) / (1000 * 60 * 60 * 24 * 365.25)
  );

  const bmr =
    129.6 * Math.pow(user.weightKg, 0.55) +
    0.011 * Math.pow(user.heightCm, 2) -
    (age <= 60 ? 1.96 : 4.9) * age -
    213.8 * (user.sex === Sex.MALE ? 0 : 1);

  const tdde = bmr * (user.exerciseFrequencyFactor + user.activityLevelFactor);

  return Math.round(tdde / 10) * 10;
};

const calculateTargetIntake = (user: UserIntake): number => {
  // If target weight is within +-5% of current weight, consider weight stable
  const weightChangePercent =
    ((user.targetWeightKg - user.weightKg) / user.weightKg) * 100;

  let goalModifier = 0;
  if (weightChangePercent < -5) {
    goalModifier = -1;
  } else if (weightChangePercent > 5) {
    goalModifier = 1;
  }

  // Note: rateOfChangeKgPerWeek should be an absolute positive number (e.g., 0.5)
  const dailyEnergyOffset =
    (goalModifier * user.rateOfChangeKgPerWeek * 7700) / 7;

  const targetDailyIntake = user.tdee + dailyEnergyOffset;

  return Math.round(targetDailyIntake / 10) * 10;
};
