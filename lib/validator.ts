import { z } from 'zod';

export const upsertLanguageSchema = z.object({
  id: z
    .string()
    .min(1, 'If provided, category id is should be at least 1 character')
    .optional(),
  languageName: z.string().min(1, 'Language name is required'),
});

export const upsertPopularListCategorySchema = z.object({
  id: z
    .string()
    .min(1, 'If provided, category id is should be at least 1 character')
    .optional(),
  popularCategory: z.string().min(1, 'Category name is required'),
  languageId: z.string().min(1, 'Language is required'),
});

export const upsertPartsOfSpeechSchema = z.object({
  id: z
    .string()
    .min(1, 'If provided, category id is should be at least 1 character')
    .optional(),
  name: z.string().min(1, 'Parts of Speech is required'),
  languageId: z.string().min(1, 'Language is required'),
});
