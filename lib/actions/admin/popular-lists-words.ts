'use server';

import { prisma } from '@/db/prisma';
import { upsertPopularListWordSchema } from '../../validator';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { formatError } from '../../utils';

// export const upsertPopularListsWord = async (
//   data: z.infer<typeof upsertPopularListWordSchema>
// ) => {
//   const parsed = upsertPopularListWordSchema.safeParse(data);

//   if (!parsed.success) {
//     return {
//       success: false,
//       message: 'Invalid popular word',
//       errors: parsed.error.flatten().fieldErrors,
//     };
//   }

//   const {
//     id,
//     word,
//     known,
//     favorite,
//     wordCaseId,
//     partOfSpeechId,
//     synonym,
//     antonym,
//     meaning,
//     popularCategoryId,
//     languageId,
//     genderId,
//   } = parsed.data;

//   try {
//     let popularWord;

//     // Upsert the popular word
//     if (id) {
//       popularWord = await prisma.popularListWord.upsert({
//         where: { id },
//         update: {
//           word,
//           known,
//           favorite,
//           wordCaseId,
//           partOfSpeechId,
//           synonym,
//           antonym,
//           meaning,
//           popularCategoryId,
//           languageId,
//           genderId,
//         },
//         create: {
//           word,
//           known,
//           favorite,
//           wordCaseId,
//           partOfSpeechId,
//           synonym,
//           antonym,
//           meaning,
//           popularCategoryId,
//           languageId,
//           genderId,
//         },
//       });
//     } else {
//       const getLanguage = await prisma.language.findFirst({
//         where: { id: languageId },
//       });

//       const wordExists = await prisma.popularListWord.findFirst({
//         where: { languageId: getLanguage?.id },
//       });

//       if (wordExists?.word.length === 0) {
//         const getCategory = await prisma.popularListCategory.findFirst({
//           where: { id: wordExists?.popularCategoryId },
//         });
//         return `This word was saved on ${wordExists.createdAt} in ${getCategory?.popularCategory} category`;
//       } else {
//         popularWord = await prisma.popularListWord.create({
//           data: {
//             word,
//             known,
//             favorite,
//             wordCaseId,
//             partOfSpeechId,
//             synonym,
//             antonym,
//             meaning,
//             popularCategoryId,
//             languageId,
//             genderId,
//           },
//         });
//       }
//     }

//     return {
//       success: true,
//       message: id ? 'Word updated successfully' : 'Word created successfully',
//       data: popularWord,
//     };
//   } catch (error) {
//     console.error('Upsert word error:', error);
//     return {
//       success: false,
//       message: 'Failed to upsert word',
//     };
//   }
// };

export const createPopularListsWord = async (
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
    const wordExists = await prisma.popularListWord.findFirst({
      where: {
        word: {
          equals: word.trim(),
          mode: 'insensitive',
        },
        languageId: languageId,
      },
    });

    if (wordExists) {
      const category = await prisma.popularListCategory.findFirst({
        where: { id: wordExists.popularCategoryId },
      });

      return {
        success: false,
        message: `This word already exists (saved on ${wordExists.createdAt}) in the '${category?.popularCategory}' category.`,
      };
    } else {
      const trimmedWord = word.trim();
      const newWord = await prisma.popularListWord.create({
        data: {
          word: trimmedWord,
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

      return {
        success: true,
        message: 'Word created successfully',
        data: newWord,
      };
    }
  } catch (error) {
    console.error('Create word error:', error);
    return {
      success: false,
      message: 'Failed to create word',
    };
  }
};

export const updatePopularListsWord = async (
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

  if (!id) {
    return {
      success: false,
      message: 'Word ID is required for update',
    };
  }

  try {
    const updatedWord = await prisma.popularListWord.update({
      where: { id },
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

    return {
      success: true,
      message: 'Word updated successfully',
      data: updatedWord,
    };
  } catch (error) {
    console.error('Update word error:', error);
    return {
      success: false,
      message: 'Failed to update word',
    };
  }
};

export const upsertPopularListsWord = async (
  data: z.infer<typeof upsertPopularListWordSchema>
) => {
  return data.id ? updatePopularListsWord(data) : createPopularListsWord(data);
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

export const getGroupOfPopularListWords = async (
  page: number = 1,
  pageSize: number = 10
) => {
  try {
    // Step 1: Get all categories
    const categories = await prisma.popularListCategory.findMany();

    // Step 2: For each category, fetch paginated words
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const grouped: Record<string, any[]> = {};

    for (const category of categories) {
      const words = await prisma.popularListWord.findMany({
        where: {
          popularCategoryId: category.id,
        },
        orderBy: [{ word: 'asc' }],
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          popularCategory: true,
        },
      });

      grouped[category.popularCategory] = words;
    }

    // Step 3: Total word count per category
    const totals = await prisma.popularListWord.groupBy({
      by: ['popularCategoryId'],
      _count: {
        _all: true,
      },
    });

    return {
      success: true,
      data: grouped,
      totals: totals.map((group) => ({
        popularCategoryId: group.popularCategoryId,
        count: group._count._all,
      })),
    };
  } catch (error) {
    console.error('Error fetching grouped and paginated word data:', error);
    return {
      success: false,
      message: 'Failed to fetch grouped word data.',
    };
  }
};

export const getSearchAllPopularWords = async (word: string) => {
  try {
    const words = prisma.popularListWord.findMany({
      where: {
        word,
      },
      orderBy: [{ word: 'asc' }],
    });

    return {
      success: true,
      data: words,
    };
  } catch (error) {
    console.error('Error fetching words:', error);
    return {
      success: false,
      message: 'Failed to fetch words.',
    };
  }
};

// export const getAllSearchedPopularWord = async (
//   // page: number = 1,
//   // pageSize: number = 10,
//   categoryId: string
// ) => {
//   try {
//     const [words, total] = await Promise.all([
//       prisma.popularListWord.findMany({
//         where: { popularCategoryId: categoryId },
//         orderBy: [{ createdAt: 'desc' }, { word: 'asc' }],
//         // skip: (page - 1) * pageSize,
//         // take: pageSize,
//       }),
//       prisma.popularListWord.count({
//         where: { popularCategoryId: categoryId },
//       }),
//     ]);

//     return {
//       success: true,
//       data: words,
//       total,
//     };
//   } catch (error) {
//     console.error('Error fetching words:', error);
//     return {
//       success: false,
//       message: 'Failed to fetch words.',
//     };
//   }
// };
