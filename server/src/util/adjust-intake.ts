import { linearRegression, mean } from 'simple-statistics';

interface DailyLog {
  dayIndex: number;
  weightKg: number | null;
  intakeKcal: number | null;
}

interface TdeeResult {
  trueTdee: number;
  weightChangeKgPerDay: number;
  averageIntake: number;
}

/**
 * THE ENGINE: Purely biological calculation.
 * Observes what the user did and how their body reacted to find their true metabolism.
 * Completely blind to user goals.
 */
export function adjustTdee(logs: DailyLog[]): TdeeResult {
  const weightPoints = logs
    .filter(
      log =>
        log.weightKg !== null &&
        Number.isFinite(log.weightKg) &&
        log.weightKg > 0
    )
    .map(log => [log.dayIndex, log.weightKg] as [number, number]);

  const intakePoints = logs
    .filter(
      log =>
        log.intakeKcal !== null &&
        Number.isFinite(log.intakeKcal) &&
        log.intakeKcal > 0
    )
    .map(log => log.intakeKcal as number);

  if (weightPoints.length < 2 || intakePoints.length === 0) {
    throw new Error('Insufficient data to run the adaptive engine.');
  }

  const distinctDayIndexes = new Set(
    weightPoints.map(([dayIndex]) => dayIndex)
  );
  if (distinctDayIndexes.size < 2) {
    throw new Error('At least two distinct dayIndex values are required.');
  }

  const regressionResult = linearRegression(weightPoints);
  const weightSlopeKgPerDay = regressionResult.m;
  const averageDailyIntake = mean(intakePoints);

  const biologicalOffset = weightSlopeKgPerDay * 7700;
  const trueTdee = Math.round(averageDailyIntake - biologicalOffset);
  return {
    trueTdee,
    weightChangeKgPerDay: Number(weightSlopeKgPerDay.toFixed(4)),
    averageIntake: Math.round(averageDailyIntake)
  };
}

/**
 * THE COACH: Goal-oriented calculation.
 * Takes the biologically verified TDEE and applies the user's specific weight goals.
 */
export function adjustIntake(
  trueTdee: number,
  currentWeightKg: number,
  targetWeightKg: number,
  rateOfChangeKgPerWeek: number
): number {
  if (currentWeightKg <= 0) {
    throw new Error('currentWeightKg must be positive');
  }

  const weightChangePercent =
    ((targetWeightKg - currentWeightKg) / currentWeightKg) * 100;

  // Determine direction - use rate to infer intent when change is small
  const direction =
    Math.sign(targetWeightKg - currentWeightKg) ||
    Math.sign(rateOfChangeKgPerWeek);

  // Cap rate at 1kg/week for safety
  const safeRate =
    Math.min(Math.abs(rateOfChangeKgPerWeek), 1) *
    Math.sign(rateOfChangeKgPerWeek);

  const targetDailyEnergyOffset = (direction * Math.abs(safeRate) * 7700) / 7;

  return Math.round(trueTdee + targetDailyEnergyOffset);
}
