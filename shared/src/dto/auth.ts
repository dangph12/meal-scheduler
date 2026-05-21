import { z } from 'zod';

export const loginRequestSchema = z.object({
  email: z.email('Email không hợp lệ'),
  password: z.string('Mật khẩu là bắt buộc').min(1, 'Mật khẩu là bắt buộc')
});

export type LoginRequest = z.infer<typeof loginRequestSchema>;

export interface LoginResponse {
  accessToken: string;
}
