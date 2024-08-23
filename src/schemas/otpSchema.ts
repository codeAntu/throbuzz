import { z } from 'zod'

export const otpSchema = z.object({
  otp: z.string().regex(/^\d{6}$/, 'OTP must be a 6 digit number'),
})
