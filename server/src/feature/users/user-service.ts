import { Sex } from '@app/shared/constant/sex';
import { CreateUserRequest } from '@app/shared/dto/user';
import { HTTPException } from 'hono/http-exception';
import { sign } from 'hono/jwt';

import { UserModel } from '@/database/models/user';
import { WeightRecordModel } from '@/database/models/weight-record';
import { PasswordUtils } from '@/util/password';

interface UserBodyMetrics {
  sex: Sex;
  dob: Date;
  heightCm: number;
  weightKg: number;
  exerciseFrequency: number;
  activityLevel: number;
}

interface ProteinIntakeInput {
  weightKg: number;
  proteinIntakeGPerKg: number;
}

export const UserService = {
  async onboardUser(data: CreateUserRequest, jwtSecret: string) {
    const { confirmPassword, ...userData } = data;
    const hashedPassword = await PasswordUtils.hash(userData.password);

    const existingUser = await UserModel.findOne({ email: userData.email });

    if (existingUser) {
      throw new HTTPException(409, {
        message: 'Email đã tồn tại'
      });
    }

    const dob = new Date(userData.dob);
    const tdee = calculateTDEE({
      sex: userData.sex,
      dob,
      heightCm: userData.heightCm,
      weightKg: userData.weightKg,
      exerciseFrequency: Number(userData.exerciseFrequency),
      activityLevel: Number(userData.activityLevel)
    });

    const targetIntake = calculateTargetIntake({
      weightKg: userData.weightKg,
      tdee,
      targetWeightKg: userData.targetWeightKg,
      rateOfChangeKgPerWeek: Number(userData.rateOfChangeKgPerWeek)
    });

    const user = await UserModel.create({
      email: userData.email,
      name: userData.name,
      password: hashedPassword,
      sex: userData.sex,
      dob,
      heightCm: userData.heightCm,
      activityLevel: Number(userData.activityLevel),
      exerciseFrequency: Number(userData.exerciseFrequency),
      targetWeightKg: userData.targetWeightKg,
      rateOfChangeKgPerWeek: Number(userData.rateOfChangeKgPerWeek),
      diet: userData.diet,
      proteinIntakeGPerKg: userData.proteinIntakeGPerKg,
      tdee,
      targetIntake
    });

    await WeightRecordModel.create({
      userId: user._id,
      weightKg: userData.weightKg
    });

    const expiredInMinutes = 15;

    const accessToken = await sign(
      {
        sub: user._id.toString(),
        exp: Math.floor(Date.now() / 1000) + expiredInMinutes * 60
      },
      jwtSecret
    );

    return accessToken;
  }
};

const calculateTDEE = (user: UserBodyMetrics): number => {
  if (user.weightKg <= 0 || user.heightCm <= 0) {
    throw new Error('Cân nặng và chiều cao phải là số dương');
  }

  const age = Math.floor(
    (Date.now() - user.dob.getTime()) / (1000 * 60 * 60 * 24 * 365.25)
  );

  const bmr =
    129.6 * Math.pow(user.weightKg, 0.55) +
    0.011 * Math.pow(user.heightCm, 2) -
    (age <= 60 ? 1.96 : 4.9) * age -
    213.8 * (user.sex === Sex.Male ? 0 : 1);

  const tdde = bmr * (user.exerciseFrequency + user.activityLevel);

  return Math.round(tdde / 10) * 10;
};

const calculateTargetIntake = (user: {
  weightKg: number;
  tdee: number;
  targetWeightKg: number;
  rateOfChangeKgPerWeek: number;
}): number => {
  if (user.weightKg <= 0) {
    throw new Error('Cân nặng phải là số dương');
  }

  const weightChangePercent =
    ((user.targetWeightKg - user.weightKg) / user.weightKg) * 100;

  let goalModifier = 0;
  if (weightChangePercent < -5) {
    goalModifier = -1;
  } else if (weightChangePercent > 5) {
    goalModifier = 1;
  }

  const dailyEnergyOffset =
    (goalModifier * Math.abs(user.rateOfChangeKgPerWeek) * 7700) / 7;

  const targetDailyIntake = user.tdee + dailyEnergyOffset;

  return Math.round(targetDailyIntake / 10) * 10;
};

const calculateProteinIntake = (user: ProteinIntakeInput): number => {
  const proteinGrams = user.weightKg * user.proteinIntakeGPerKg;
  return Math.round(proteinGrams);
};
