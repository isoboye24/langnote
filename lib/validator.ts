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
  lightImageIcon: z.string().min(1, 'light image icon is required'),
  darkImageIcon: z.string().min(1, 'dark image icon is required'),
  languageId: z.string().min(1, 'Language is required'),
});

export const upsertPartsOfSpeechSchema = z.object({
  id: z
    .string()
    .min(1, 'If provided, part of speech id is should be at least 1 character')
    .optional(),
  name: z.string().min(1, 'Parts of Speech is required'),
  languageId: z.string().min(1, 'Language is required'),
});

export const upsertCasesSchema = z.object({
  id: z
    .string()
    .min(1, 'If provided, cases id is should be at least 1 character')
    .optional(),
  caseName: z.string().min(1, 'Case is required'),
  languageId: z.string().min(1, 'Language is required'),
});

export const upsertPopularListWordSchema = z.object({
  id: z
    .string()
    .min(1, 'If provided, word id is should be at least 1 character')
    .optional(),
  word: z.string().min(1, 'Case is required'),
  known: z.boolean(),
  favorite: z.boolean(),
  wordCaseId: z.string(),
  partOfSpeechId: z.string(),
  synonym: z.string().optional().or(z.literal('')),
  antonym: z.string().optional().or(z.literal('')),
  meaning: z.string().optional().or(z.literal('')),
  popularCategoryId: z.string(),
  languageId: z.string(),
});

export const upsertGendersSchema = z.object({
  id: z
    .string()
    .min(1, 'If provided, Gender id is should be at least 1 character')
    .optional(),
  genderName: z.string().min(1, 'Gender is required'),
  languageId: z.string().min(1, 'Language is required'),
});
