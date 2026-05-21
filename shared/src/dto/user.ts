import { z } from 'zod';
import { Sex } from '../constant';
import { ActivityLevel } from '../constant/activity-level';
import { ExerciseFrequency } from '../constant/exercise-frequency';
import { RateOfChangeKgPerWeek } from '../constant/rate-of-change-kg-per-week';
import { Diet } from '../constant/diet';
import { ProteinIntakeGPerKg } from '../constant/protein-intake-g-per-kg';

export const createUserSchema = z
  .object({
    // step 1: basic info
    sex: z.enum(Sex, 'Giới tính là bắt buộc'),
    dob: z.string().min(1, 'Ngày sinh là bắt buộc'),
    heightCm: z
      .number('Chiều cao là bắt buộc')
      .min(1, 'Chiều cao phải lớn hơn 0'),
    weightKg: z
      .number('Cân nặng là bắt buộc')
      .min(1, 'Cân nặng phải lớn hơn 0'),
    // step 2: activity level
    // step 2-1
    activityLevel: z.enum(ActivityLevel, 'Mức độ hoạt động là bắt buộc'),
    // step 2-2
    exerciseFrequency: z.enum(
      ExerciseFrequency,
      'Tần suất tập luyện là bắt buộc'
    ),
    // step 3: goal
    targetWeightKg: z.number('Cân nặng mục tiêu là bắt buộc'),
    rateOfChangeKgPerWeek: z.enum(
      RateOfChangeKgPerWeek,
      'Tốc độ thay đổi cân nặng là bắt buộc'
    ),
    // step 4: schedule setting
    // diet: balanced, low-carb, low-fat
    diet: z.enum(Diet, 'Chế độ ăn là bắt buộc'),
    // protein intake:
    proteinIntakeGPerKg: z.enum(
      ProteinIntakeGPerKg,
      'Mức độ nạp protein là bắt buộc'
    ),
    // step 5: create account
    name: z.string().min(1, 'Tên là bắt buộc'),
    email: z.email('Email không hợp lệ').min(1, 'Email là bắt buộc'),
    password: z
      .string('Mật khẩu là bắt buộc')
      .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
        'Mật khẩu phải gồm chữ thường, chữ hoa, số và ký tự đặc biệt'
      ),
    confirmPassword: z.string('Xác nhận mật khẩu là bắt buộc')
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Mật khẩu không khớp',
    path: ['confirmPassword']
  });

export type CreateUserRequest = z.infer<typeof createUserSchema>;
