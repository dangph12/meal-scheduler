import { z } from 'zod';
import { Sex } from '../constant';
import { ActivityLevel } from '../constant/activity-level';
import { ExerciseFrequency } from '../constant/exercise-frequency';
import { RateOfChangeKgPerWeek } from '../constant/rate-of-change-kg-per-week';
import { Diet } from '../constant/diet';
import { ProteinIntakeGPerKg } from '../constant/protein-intake-g-per-kg';

/**
 * Steps 1-4: Profile data
 * Used by: onboard preview, profile edit
 */
export const userProfileSchema = z.object({
  // step 1: basic info
  sex: z.enum(Sex, 'Giới tính là bắt buộc'),
  dob: z.string().min(1, 'Ngày sinh là bắt buộc'),
  heightCm: z
    .number('Chiều cao là bắt buộc')
    .min(1, 'Chiều cao phải lớn hơn 0'),
  weightKg: z.number('Cân nặng là bắt buộc').min(1, 'Cân nặng phải lớn hơn 0'),
  // step 2: activity level
  activityLevel: z.enum(ActivityLevel, 'Mức độ hoạt động là bắt buộc'),
  exerciseFrequency: z.enum(
    ExerciseFrequency,
    'Tần suất tập luyện là bắt buộc'
  ),
  // step 3: goal
  targetWeightKg: z
    .number('Cân nặng mục tiêu là bắt buộc')
    .min(1, 'Cân nặng mục tiêu phải lớn hơn 0'),
  rateOfChangeKgPerWeek: z.enum(
    RateOfChangeKgPerWeek,
    'Tốc độ thay đổi cân nặng là bắt buộc'
  ),
  // step 4: schedule setting
  diet: z.enum(Diet, 'Chế độ ăn là bắt buộc'),
  proteinIntakeGPerKg: z.enum(
    ProteinIntakeGPerKg,
    'Mức độ nạp protein là bắt buộc'
  )
});

export type UserProfileRequest = z.infer<typeof userProfileSchema>;

/**
 * Onboard final submit: profile + target intake + account credentials (step 5)
 * Used by: POST /onboard (final submit after step 4)
 */
export const onboardSchema = userProfileSchema.extend({
  // step 5: account credentials
  name: z.string().min(1, 'Tên là bắt buộc'),
  email: z.email('Email không hợp lệ').min(1, 'Email là bắt buộc'),
  password: z
    .string('Mật khẩu là bắt buộc')
    .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
    .regex(/[A-Z]/, 'Mật khẩu phải chứa ít nhất một chữ cái viết hoa')
    .regex(/[a-z]/, 'Mật khẩu phải chứa ít nhất một chữ cái viết thường')
    .regex(/[0-9]/, 'Mật khẩu phải chứa ít nhất một chữ số')
    .regex(
      /[@$!%*?&]/,
      'Mật khẩu phải chứa ít nhất một ký tự đặc biệt (@$!%*?&)'
    ),
  confirmPassword: z.string('Xác nhận mật khẩu là bắt buộc'),
  // step 5: calories adjustment
  caloriesIntake: z.number('Lượng calo mục tiêu là bắt buộc')
});

export type OnboardRequest = z.infer<typeof onboardSchema>;

/**
 * Update profile: user edits profile data post-onboarding
 * Used by: PATCH /profile
 */
export const updateProfileSchema = userProfileSchema;

export type UpdateProfileRequest = z.infer<typeof updateProfileSchema>;

/**
 * Update target intake: user adjusts intake post-onboarding
 * Used by: PATCH /profile/intake
 */
export const updateCaloriesIntakeSchema = z.object({
  caloriesIntake: z.number('Lượng calo mục tiêu là bắt buộc')
});

export type UpdateCaloriesIntakeRequest = z.infer<
  typeof updateCaloriesIntakeSchema
>;

// Legacy alias — remove after updating all consumers
/** @deprecated Use onboardSchema instead */
export const createUserSchema = onboardSchema;
/** @deprecated Use OnboardRequest instead */
export type CreateUserRequest = OnboardRequest;

export interface OnboardResponse {
  accessToken: string;
}

export interface PreviewCaloriesIntakeResponse {
  tdee: number;
  suggestedCaloriesIntake: number;
}
