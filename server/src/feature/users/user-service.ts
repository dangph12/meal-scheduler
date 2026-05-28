import { Sex } from '@app/shared/constant/sex';
import { OnboardRequest, UserProfileRequest } from '@app/shared/dto/user';
import { HTTPException } from 'hono/http-exception';
import { sign } from 'hono/jwt';
import mongoose from 'mongoose';

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

export const UserService = {
  async previewCaloriesIntake(data: UserProfileRequest) {
    const dob = new Date(data.dob);

    const tdee = calculateTDEE({
      sex: data.sex,
      dob,
      heightCm: data.heightCm,
      weightKg: data.weightKg,
      exerciseFrequency: Number(data.exerciseFrequency),
      activityLevel: Number(data.activityLevel)
    });

    const suggestedCaloriesIntake = calculateCaloriesIntake({
      weightKg: data.weightKg,
      tdee,
      targetWeightKg: data.targetWeightKg,
      rateOfChangeKgPerWeek: Number(data.rateOfChangeKgPerWeek)
    });

    return { tdee, suggestedCaloriesIntake };
  },

  async onboardUser(data: OnboardRequest, jwtSecret: string) {
    const { confirmPassword, ...userData } = data;

    const existingUser = await UserModel.findOne({ email: userData.email });

    if (existingUser) {
      throw new HTTPException(409, {
        message: 'Email đã tồn tại'
      });
    }

    const hashedPassword = await PasswordUtils.hash(userData.password);

    const dob = new Date(userData.dob);
    const tdee = calculateTDEE({
      sex: userData.sex,
      dob,
      heightCm: userData.heightCm,
      weightKg: userData.weightKg,
      exerciseFrequency: Number(userData.exerciseFrequency),
      activityLevel: Number(userData.activityLevel)
    });

    const caloriesIntake = calculateCaloriesIntake({
      weightKg: userData.weightKg,
      tdee,
      targetWeightKg: userData.targetWeightKg,
      rateOfChangeKgPerWeek: Number(userData.rateOfChangeKgPerWeek)
    });

    const session = await mongoose.startSession();

    session.startTransaction();

    let user: any;
    try {
      user = await UserModel.create({
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
        caloriesIntake
      });

      await WeightRecordModel.create({
        userId: user._id,
        weightKg: userData.weightKg
      });

      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw new HTTPException(400, {
        message: 'Đăng ký thất bại. Vui lòng thử lại.'
      });
    } finally {
      await session.endSession();
    }

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

const calculateCaloriesIntake = (user: {
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
