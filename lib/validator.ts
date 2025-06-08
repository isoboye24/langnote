import { z } from 'zod';

export const upsertLanguageSchema = z.object({
  id: z
    .string()
    .min(1, 'If provided, category id is should be at least 1 character')
    .optional(),
  languageName: z.string().min(1, 'Language name is required'),
});
