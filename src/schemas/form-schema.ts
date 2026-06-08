import { z } from 'zod';
import { PASSWORD_REGEX } from '../utils/password-regex';
import { COUNTRIES } from '../constants/countries';

export const formSchema = z.object({
name: z
  .string()
  .min(2, 'Name must contain at least 2 characters')
  .refine(
    (value) =>
      value.length > 0 &&
      value[0] === value[0].toUpperCase(),
    {
      message:
        'Name must start with uppercase letter',
    }
  ),

  age: z.coerce
    .number()
    .min(18, 'Minimum age is 18')
    .max(99, 'Maximum age is 99'),

  email: z.email('Invalid email'),

  gender: z.string().min(1, 'Select gender'),

  country: z
  .string()
  .refine(
    (value) => COUNTRIES.includes(value),
    {
      message: 'Select valid country',
    }
  ),

  password: z
    .string()
    .regex(
      PASSWORD_REGEX,
      'Password must contain uppercase, lowercase and number'
    ),
confirmPassword: z.string(),

  image: z.string().optional(),

termsAccepted: z.boolean().refine((value) => value, {
  message: 'Terms must be accepted',
}),
})
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    }
  );