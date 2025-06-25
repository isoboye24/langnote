'use server';

import { prisma } from '@/db/prisma';
import { upsertCasesSchema } from '../../validator';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { formatError } from '@/lib/utils';

export const upsertWordCase = async (
  data: z.infer<typeof upsertCasesSchema>
) => {
  const parsed = upsertCasesSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: 'Invalid case data',
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { id, caseName, languageId } = parsed.data;

  try {
    let cases;

    // Upsert the cases
    if (id) {
      cases = await prisma.wordCase.upsert({
        where: { id },
        update: { caseName, languageId },
        create: { caseName, languageId },
      });
    } else {
      const caseExists = await prisma.wordCase.findFirst({
        where: {
          caseName: {
            equals: caseName.trim(),
            mode: 'insensitive',
          },
          languageId: languageId,
        },
      });

      if (caseExists) {
        const getLanguage = await prisma.language.findFirst({
          where: { id: caseExists.languageId },
        });
        return {
          success: false,
          message: `This case ${caseExists.caseName} already exists in ${getLanguage?.languageName}.`,
        };
      } else {
        cases = await prisma.wordCase.create({
          data: { caseName, languageId },
        });
      }
    }

    return {
      success: true,
      message: id
        ? 'Word case updated successfully'
        : 'Word case created successfully',
      data: cases,
    };
  } catch (error) {
    console.error('Upsert parts of speech error:', error);
    return {
      success: false,
      message: 'Failed to upsert word case',
    };
  }
};

export const checkIfWordCaseExists = async (
  caseName: string,
  languageId: string
) => {
  try {
    const existing = await prisma.wordCase.findFirst({
      where: {
        caseName: {
          equals: caseName,
          mode: 'insensitive',
        },
        languageId,
      },
    });

    return !!existing;
  } catch (error) {
    console.error('Error checking for existing word case:', error);
    return false;
  }
};

export const getAllWordCases = async (
  page: number = 1,
  pageSize: number = 10
) => {
  try {
    const [cases, total] = await Promise.all([
      prisma.wordCase.findMany({
        orderBy: { caseName: 'asc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.wordCase.count(),
    ]);

    return {
      success: true,
      data: cases,
      total,
    };
  } catch (error) {
    console.error('Error fetching word cases:', error);
    return {
      success: false,
      message: 'Failed to fetch word cases',
    };
  }
};

export const getWordCaseById = async (id: string) => {
  try {
    const wordCase = await prisma.wordCase.findFirst({
      where: { id },
    });

    if (!wordCase) {
      return {
        success: false,
        message: 'Word case not found',
      };
    }

    return {
      success: true,
      data: wordCase,
    };
  } catch (error) {
    console.error('Error fetching word case:', error);
    return {
      success: false,
      message: 'Failed to fetch word case',
    };
  }
};

export async function deleteWordCase(id: string) {
  try {
    const wordCaseExists = await prisma.wordCase.findFirst({
      where: { id },
    });

    if (!wordCaseExists) throw new Error('Part of speech not found');

    await prisma.wordCase.delete({ where: { id } });

    revalidatePath('/admin/cases');

    return {
      success: true,
      message: 'Word case deleted successfully',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// This total can be called when I need just the total alone.
export const getTotalWordCase = async () => {
  try {
    const total = await prisma.wordCase.count();
    return { success: true, data: total };
  } catch (error) {
    console.error('Error calculating total word case:', error);
    return { success: false, message: 'Failed to count word case' };
  }
};

export const getAllWordCasesToSelect = async () => {
  try {
    const [cases, total] = await Promise.all([
      prisma.wordCase.findMany({
        orderBy: { caseName: 'asc' },
      }),
      prisma.wordCase.count(),
    ]);

    return {
      success: true,
      data: cases,
      total,
    };
  } catch (error) {
    console.error('Error fetching word cases:', error);
    return {
      success: false,
      message: 'Failed to fetch word cases',
    };
  }
};
