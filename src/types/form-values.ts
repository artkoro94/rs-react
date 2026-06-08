import type { z } from 'zod';
import { formSchema } from '../schemas/form-schema';

export type FormValues = z.infer<typeof formSchema>;