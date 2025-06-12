'use server';

import { prisma } from '@/db/prisma';
import { upsertPopularListWordSchema } from '../../validator';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { formatError } from '../../utils';

export const upsertPopularListsWord = async (
  data: z.infer<typeof upsertPopularListWordSchema>
) => {
  const parsed = upsertPopularListWordSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: 'Invalid popular word',
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const {
    id,
    word,
    known,
    favorite,
    wordCaseId,
    partOfSpeechId,
    synonym,
    antonym,
    meaning,
    popularCategoryId,
    languageId,
    genderId,
  } = parsed.data;

  try {
    let popularWord;

    // Upsert the popular word
    if (id) {
      popularWord = await prisma.popularListWord.upsert({
        where: { id },
        update: {
          word,
          known,
          favorite,
          wordCaseId,
          partOfSpeechId,
          synonym,
          antonym,
          meaning,
          popularCategoryId,
          languageId,
          genderId,
        },
        create: {
          word,
          known,
          favorite,
          wordCaseId,
          partOfSpeechId,
          synonym,
          antonym,
          meaning,
          popularCategoryId,
          languageId,
          genderId,
        },
      });
    } else {
      popularWord = await prisma.popularListWord.create({
        data: {
          word,
          known,
          favorite,
          wordCaseId,
          partOfSpeechId,
          synonym,
          antonym,
          meaning,
          popularCategoryId,
          languageId,
          genderId,
        },
      });
    }

    return {
      success: true,
      message: id ? 'Word updated successfully' : 'Word created successfully',
      data: popularWord,
    };
  } catch (error) {
    console.error('Upsert word error:', error);
    return {
      success: false,
      message: 'Failed to upsert word',
    };
  }
};

export const checkIfPopularListsWordExists = async (
  word: string,
  languageId: string
) => {
  try {
    const existing = await prisma.popularListWord.findFirst({
      where: {
        word: {
          equals: word,
          mode: 'insensitive',
        },
        languageId,
      },
    });

    return !!existing;
  } catch (error) {
    console.error('Error checking for existing word:', error);
    return false;
  }
};

export const getAllPopularListWords = async (
  page: number = 1,
  pageSize: number = 10
) => {
  try {
    const [words, total] = await Promise.all([
      prisma.popularListWord.findMany({
        orderBy: [{ createdAt: 'desc' }, { word: 'asc' }],
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.popularListWord.count(),
    ]);

    return {
      success: true,
      data: words,
      total,
    };
  } catch (error) {
    console.error('Error fetching words:', error);
    return {
      success: false,
      message: 'Failed to fetch words.',
    };
  }
};

export const getPopularListWordById = async (id: string) => {
  try {
    const word = await prisma.popularListWord.findFirst({
      where: { id },
    });

    if (!word) {
      return {
        success: false,
        message: 'Word not found',
      };
    }

    return {
      success: true,
      data: word,
    };
  } catch (error) {
    console.error('Error fetching word:', error);
    return {
      success: false,
      message: 'Failed to fetch word',
    };
  }
};

export async function deletePopularListWord(id: string) {
  try {
    const wordExists = await prisma.popularListWord.findFirst({
      where: { id },
    });

    if (!wordExists) throw new Error('Popular word not found');

    await prisma.popularListWord.delete({ where: { id } });

    revalidatePath('/admin/popular-words');

    return {
      success: true,
      message: 'Word deleted successfully',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export const getTotalPopularListWord = async () => {
  try {
    const total = await prisma.popularListWord.count();
    return { success: true, total };
  } catch (error) {
    console.error('Error calculating total words:', error);
    return { success: false, message: 'Failed to count words' };
  }
};

export const getAllPopularListWordsToSelect = async () => {
  try {
    const [words, total] = await Promise.all([
      prisma.popularListWord.findMany({
        orderBy: [{ createdAt: 'desc' }, { word: 'asc' }],
      }),
      prisma.popularListWord.count(),
    ]);

    return {
      success: true,
      data: words,
      total,
    };
  } catch (error) {
    console.error('Error fetching words:', error);
    return {
      success: false,
      message: 'Failed to fetch words.',
    };
  }
};

export const getGroupOfPopularListWords = async () => {
  try {
    const words = await prisma.popularListWord.findMany({
      include: {
        popularCategory: true,
      },
      orderBy: [{ word: 'asc' }],
    });

    // Group words by category name
    const grouped = words.reduce((acc, word) => {
      const categoryName = word.popularCategory.popularCategory;
      if (!acc[categoryName]) {
        acc[categoryName] = [];
      }
      acc[categoryName].push(word);
      return acc;
    }, {} as Record<string, typeof words>);

    const groupTotals = await prisma.popularListWord.groupBy({
      by: ['popularCategoryId'],
      _count: {
        _all: true,
      },
      orderBy: {
        popularCategoryId: 'asc',
      },
    });

    return {
      success: true,
      data: grouped,
      totals: groupTotals.map((group) => ({
        popularCategoryId: group.popularCategoryId,
        count: group._count._all,
      })),
    };
  } catch (error) {
    console.error('Error fetching grouped word data:', error);
    return {
      success: false,
      message: 'Failed to fetch grouped word data.',
    };
  }
};
