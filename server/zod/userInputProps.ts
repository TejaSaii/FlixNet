import { z } from 'zod';

export const userInputProps = z.object({
  email: z.string().email().min(8),
  password: z.string().min(4),
  age: z.number().int().positive().min(1).max(150),
})