'use server';

import { prisma } from '@/db/prisma';
import { upsertLanguageSchema } from './../../validator';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { formatError } from './../../utils';

export const upsertLanguage = async (
  data: z.infer<typeof upsertLanguageSchema>
) => {
  const parsed = upsertLanguageSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: 'Invalid language data',
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { id, languageName } = parsed.data;

  try {
    let language;

    // Upsert the language
    if (id) {
      language = await prisma.language.upsert({
        where: { id },
        update: { languageName },
        create: { languageName },
      });
    } else {
      const languageExists = await prisma.language.findFirst({
        where: {
          languageName: {
            equals: languageName.trim(),
            mode: 'insensitive',
          },
        },
      });

      if (languageExists) {
        return {
          success: false,
          message: `This case ${languageExists.languageName} already exists.`,
        };
      } else {
        language = await prisma.language.create({ data: { languageName } });
      }
    }

    return {
      success: true,
      message: id
        ? 'Language updated successfully'
        : 'Language created successfully',
      data: language,
    };
  } catch (error) {
    console.error('Upsert language error:', error);
    return {
      success: false,
      message: 'Failed to upsert language',
    };
  }
};

export const checkIfLanguageExists = async (language: string) => {
  try {
    const existing = await prisma.language.findFirst({
      where: {
        languageName: {
          equals: language,
          mode: 'insensitive',
        },
      },
    });

    return !!existing;
  } catch (error) {
    console.error('Error checking for existing language:', error);
    return false;
  }
};

export const getAllLanguages = async (
  page: number = 1,
  pageSize: number = 10
) => {
  try {
    const [languages, total] = await Promise.all([
      prisma.language.findMany({
        orderBy: { languageName: 'asc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.language.count(),
    ]);

    return {
      success: true,
      data: languages,
      total,
    };
  } catch (error) {
    console.error('Error fetching word languages:', error);
    return {
      success: false,
      message: 'Failed to fetch word languages',
    };
  }
};

export const getLanguageById = async (id: string) => {
  try {
    const language = await prisma.language.findFirst({
      where: { id },
    });

    if (!language) {
      return {
        success: false,
        message: 'Language not found',
      };
    }

    return {
      success: true,
      data: language,
    };
  } catch (error) {
    console.error('Error fetching language:', error);
    return {
      success: false,
      message: 'Failed to fetch language',
    };
  }
};

export async function deleteLanguage(id: string) {
  try {
    const languageExists = await prisma.language.findFirst({
      where: { id },
    });

    if (!languageExists) throw new Error('Language not found');

    await prisma.language.delete({ where: { id } });

    revalidatePath('/admin/languages');

    return {
      success: true,
      message: 'Language deleted successfully',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export const getTotalLanguages = async () => {
  try {
    const total = await prisma.language.count();
    return { success: true, total };
  } catch (error) {
    console.error('Error calculating total languages:', error);
    return { success: false, message: 'Failed to count languages' };
  }
};

export const getAllLanguagesToSelect = async () => {
  try {
    const [languages, total] = await Promise.all([
      prisma.language.findMany({
        orderBy: { languageName: 'asc' },
      }),
      prisma.language.count(),
    ]);

    return {
      success: true,
      data: languages,
      total,
    };
  } catch (error) {
    console.error('Error fetching word languages:', error);
    return {
      success: false,
      message: 'Failed to fetch word languages',
    };
  }
};
