import { z } from 'zod';
import { Sex } from '../constant';
import { ActivityLevel } from '../constant/activity-level';
import { ExerciseFrequency } from '../constant/exercise-frequency';
import { RateOfChangeKgPerWeek } from '../constant/rate-of-change-kg-per-week';
import { Diet } from '../constant/diet';
import { ProteinIntakeGPerKg } from '../constant/protein-intake-g-per-kg';

/**
 * Validates name: letters and spaces only.
 * Supports Vietnamese alphabet: A-Z, a-z, À-ỹ
 */
const nameRegex = /^[a-zA-ZÀ-ỹ\s]+$/;

export const userProfileSchema = z.object({
  sex: z.enum(Sex, 'Giới tính là bắt buộc'),
  dob: z
    .string()
    .min(1, 'Ngày sinh là bắt buộc')
    .refine(val => !isNaN(Date.parse(val)), 'Ngày sinh không hợp lệ')
    .refine(val => new Date(val) < new Date(), 'Ngày sinh phải trong quá khứ')
    .refine(val => calculateAge(val) >= 13, 'Bạn phải từ 13 tuổi trở lên'),
  heightCm: z
    .number('Chiều cao là bắt buộc')
    // Source: CDC NHANES Anthropometric Reference Data (2021-2023) — 5th-95th percentile for adults
    .min(130, 'Chiều cao phải từ 130 cm trở lên')
    .max(250, 'Chiều cao phải từ 250 cm trở xuống'),
  weightKg: z
    .number('Cân nặng là bắt buộc')
    // Source: WHO/CDC BMI categories (underweight <18.5) + ASMBS bariatric surgery guidelines
    .min(30, 'Cân nặng phải từ 30 kg trở lên')
    .max(250, 'Cân nặng phải từ 250 kg trở xuống'),
  activityLevel: z.enum(ActivityLevel, 'Mức độ hoạt động là bắt buộc'),
  exerciseFrequency: z.enum(
    ExerciseFrequency,
    'Tần suất tập luyện là bắt buộc'
  ),
  targetWeightKg: z
    .number('Cân nặng mục tiêu là bắt buộc')
    // Source: WHO/CDC BMI categories (underweight <18.5) + ASMBS bariatric surgery guidelines
    .min(30, 'Cân nặng mục tiêu phải từ 30 kg trở lên')
    .max(250, 'Cân nặng mục tiêu phải từ 250 kg trở xuống'),
  rateOfChangeKgPerWeek: z.enum(
    RateOfChangeKgPerWeek,
    'Tốc độ thay đổi cân nặng là bắt buộc'
  ),
  diet: z.enum(Diet, 'Chế độ ăn là bắt buộc'),
  proteinIntakeGPerKg: z.enum(
    ProteinIntakeGPerKg,
    'Mức độ nạp protein là bắt buộc'
  )
});

export type UserProfileRequest = z.infer<typeof userProfileSchema>;

export const onboardSchema = userProfileSchema.extend({
  name: z
    .string()
    .min(1, 'Tên là bắt buộc')
    .min(2, 'Tên phải có ít nhất 2 ký tự')
    .max(50, 'Tên không được vượt quá 50 ký tự')
    .regex(nameRegex, 'Tên không được chứa số hoặc ký tự đặc biệt')
    .trim(),
  email: z.email('Email không hợp lệ').min(1, 'Email là bắt buộc').trim(),
  password: z
    .string('Mật khẩu là bắt buộc')
    .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
    .refine(val => !/\s/.test(val), 'Mật khẩu không được chứa khoảng trắng')
    .regex(/[A-Z]/, 'Mật khẩu phải chứa ít nhất một chữ cái viết hoa')
    .regex(/[a-z]/, 'Mật khẩu phải chứa ít nhất một chữ cái viết thường')
    .regex(/[0-9]/, 'Mật khẩu phải chứa ít nhất một chữ số')
    .regex(
      /[@$!%*?&]/,
      'Mật khẩu phải chứa ít nhất một ký tự đặc biệt (@$!%*?&)'
    ),
  confirmPassword: z.string('Xác nhận mật khẩu là bắt buộc'),
  caloriesIntake: z.number('Lượng calo mục tiêu là bắt buộc')
});

export type OnboardRequest = z.infer<typeof onboardSchema>;

export const updateProfileSchema = userProfileSchema;

export type UpdateProfileRequest = z.infer<typeof updateProfileSchema>;

export const updateCaloriesIntakeSchema = z.object({
  caloriesIntake: z.number('Lượng calo mục tiêu là bắt buộc')
});

export type UpdateCaloriesIntakeRequest = z.infer<
  typeof updateCaloriesIntakeSchema
>;

export type CreateUserRequest = OnboardRequest;

export interface OnboardResponse {
  accessToken: string;
}

export interface PreviewCaloriesIntakeResponse {
  tdee: number;
  suggestedCaloriesIntake: number;
}

export interface WeightEntry {
  id: string;
  date: string;
  weightKg: number;
}

export interface WeightHistoryResponse {
  data: WeightEntry[];
  total: number;
  page: number;
  pageSize: number;
}

export interface AvatarUploadResponse {
  avatarUrl: string;
}

export interface UserProfileResponse {
  name: string;
  email: string;
  avatarUrl: string | null;
  sex: string;
  dob: string;
  heightCm: number;
  weightKg: number;
  activityLevel: string;
  exerciseFrequency: string;
  targetWeightKg: number;
  rateOfChangeKgPerWeek: string;
  diet: string;
  proteinIntakeGPerKg: string;
  caloriesIntake: number;
}

export interface CalorieDayEntry {
  date: string;
  consumedKcal: number;
  targetKcal: number;
}

export interface CalorieHistoryResponse {
  data: CalorieDayEntry[];
  total: number;
}

const calculateAge = (dob: string): number => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};
