import { z } from 'zod';
import { PASSWORD_REGEX } from '../utils/password-regex';

export const formSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must contain at least 2 characters'),

  age: z.coerce
    .number()
    .min(18, 'Minimum age is 18')
    .max(99, 'Maximum age is 99'),

  email: z.email('Invalid email'),

  gender: z.string().min(1, 'Select gender'),

  country: z.string().min(1, 'Select country'),

  password: z
    .string()
    .regex(
      PASSWORD_REGEX,
      'Password must contain uppercase, lowercase and number'
    ),

  image: z.any(),

termsAccepted: z.boolean().refine((value) => value, {
  message: 'Terms must be accepted',
}),
});