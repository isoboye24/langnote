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
  genderId: z.string(),
});

export const upsertGendersSchema = z.object({
  id: z
    .string()
    .min(1, 'If provided, Gender id is should be at least 1 character')
    .optional(),
  genderName: z.string().min(1, 'Gender is required'),
  languageId: z.string().min(1, 'Language is required'),
});

export const signUpFormSchema = z
  .object({
    id: z
      .string()
      .min(1, 'If provided, word id is should be at least 1 character')
      .optional(),
    userName: z.string().min(1, 'Username is required'),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().min(3, 'Email is required'),
    firstLanguage: z.string().min(3, 'First Language is required'),
    password: z.string().min(8, 'Password is required'),
    role: z.string(),
    confirmPassword: z
      .string()
      .min(3, 'Confirm password must be at least 3 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const signInFormSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .min(3, 'Email must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const upsertBookSchema = z.object({
  id: z
    .string()
    .min(1, 'If provided, Book id is should be at least 1 character')
    .optional(),
  title: z
    .string()
    .min(1, 'title is required')
    .max(24, 'title must not be longer than 24 characters.'),
  userId: z.string().min(1, 'User is required'),
  language: z.string().min(1, 'Language is required'),
  color1: z.string().min(1, 'color1 is required'),
  color2: z.string().min(1, 'color2 is required'),
});

export const upsertWordGroupSchema = z.object({
  id: z
    .string()
    .min(1, 'If provided, group id is should be at least 1 character')
    .optional(),
  groupName: z
    .string()
    .min(1, 'group is required')
    .max(60, 'group must not be longer than 60 characters.'),
  bookId: z.string().min(1, 'User is required'),
  color: z.string().min(1, 'color is required'),
});
