'use server';

import { prisma } from '@/db/prisma';
import { upsertUserWordSchema } from '../../validator';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { formatError } from '../../utils';
import { auth } from '@/auth';

type WordCountResult =
  | { success: true; count: number }
  | { success: false; message: string };

export const upsertUserWord = async (
  data: z.infer<typeof upsertUserWordSchema>
) => {
  const session = await auth();
  const currentUserId = session?.user?.id;
  const parsed = upsertUserWordSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: 'Invalid word data',
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
    wordGroupId,
    genderId,
    bookId,
    userId,
  } = parsed.data;

  try {
    let userWord;

    // Upsert the word
    if (id) {
      const existing = await prisma.word.findUnique({ where: { id } });
      if (!existing) {
        return {
          success: false,
          message: 'Word not found for update',
        };
      }

      userWord = await prisma.word.upsert({
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
          wordGroupId,
          genderId,
          bookId,
          userId,
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
          wordGroupId,
          genderId,
          bookId,
          userId,
        },
      });
    } else {
      const existing = await prisma.word.findFirst({
        where: {
          word: {
            equals: word,
            mode: 'insensitive',
          },
          bookId: {
            equals: bookId,
          },
        },
      });

      if (!existing) {
        userWord = await prisma.word.create({
          data: {
            word,
            known,
            favorite,
            wordCaseId,
            partOfSpeechId,
            synonym,
            antonym,
            meaning,
            wordGroupId,
            genderId,
            bookId,
            userId,
          },
        });
        return {
          success: true,
          message: id
            ? 'Word updated successfully'
            : 'Word created successfully',
          data: userWord,
        };
      } else {
        const existingWordData = await prisma.word.findFirst({
          where: {
            word: existing.word,
            userId: currentUserId,
          },
        });

        const getGroup = await prisma.wordGroup.findFirst({
          where: { id: existingWordData?.wordGroupId },
        });
        return {
          success: false,
          message: `${existingWordData?.word} exists in ${
            getGroup?.groupName
          }. It was created on ${existingWordData?.createdAt.getDay()}.${existingWordData?.createdAt.getMonth()}.${existingWordData?.createdAt.getFullYear()}.`,
        };
      }
    }
  } catch (error) {
    console.error('Upsert word error:', error);
    return {
      success: false,
      message: 'Failed to upsert word',
    };
  }
};

export const checkIfUserWordExists = async (word: string, bookId: string) => {
  const session = await auth();
  const currentUserId = session?.user?.id;
  try {
    const existing = await prisma.word.findFirst({
      where: {
        word: {
          equals: word,
          mode: 'insensitive',
        },
        bookId: {
          equals: bookId,
        },
        userId: currentUserId,
      },
    });

    return !!existing;
  } catch (error) {
    console.error('Error checking for existing group:', error);
    return false;
  }
};

export const getAllUserWords = async (
  page: number = 1,
  pageSize: number = 10,
  bookId: string,
  groupId: string
) => {
  const session = await auth();
  const currentUserId = session?.user?.id;
  try {
    const [words, total] = await Promise.all([
      prisma.word.findMany({
        where: {
          bookId: bookId,
          wordGroupId: groupId,
          userId: currentUserId,
          known: false,
          favorite: false,
        },
        orderBy: { word: 'asc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.word.count({
        where: {
          bookId: bookId,
          wordGroupId: groupId,
          userId: currentUserId,
          known: false,
        },
      }),
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
      message: 'Failed to fetch words',
    };
  }
};

export const getUserWordById = async (id: string) => {
  try {
    const word = await prisma.word.findFirst({
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

export async function deleteUserWord(id: string) {
  try {
    const wordExists = await prisma.word.findFirst({
      where: { id },
    });

    if (!wordExists) throw new Error('Word not found');

    const deletedWord = wordExists;

    await prisma.word.delete({ where: { id } });

    revalidatePath(
      `/user/books/${deletedWord.bookId}/${deletedWord.wordGroupId}`
    );

    return {
      success: true,
      message: 'word deleted successfully',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export const getTotalUserWord = async (bookId: string, groupId: string) => {
  const session = await auth();
  const currentUserId = session?.user?.id;
  try {
    const total = await prisma.word.count({
      where: { bookId: bookId, wordGroupId: groupId, userId: currentUserId },
    });
    if (total > 0) {
      return total;
    } else {
      return 0;
    }
  } catch (error) {
    console.error('Error calculating total word:', error);
    return { success: false, message: 'Failed to count word' };
  }
};

export const getTotalUserWordForUser = async (
  currentUserId: string
): Promise<WordCountResult> => {
  try {
    const total = await prisma.word.count({
      where: { userId: currentUserId },
    });

    return { success: true, count: total };
  } catch (error) {
    console.error('Error calculating total word:', error);
    return { success: false, message: 'Failed to count word' };
  }
};

export const getAllUserWordsCompletely = async (
  bookId: string,
  groupId: string
) => {
  const session = await auth();
  const currentUserId = session?.user?.id;
  try {
    const [words, total] = await Promise.all([
      prisma.word.findMany({
        where: { bookId: bookId, wordGroupId: groupId, userId: currentUserId },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.word.count({
        where: { bookId: bookId, wordGroupId: groupId, userId: currentUserId },
      }),
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
      message: 'Failed to fetch words',
    };
  }
};

export const getAllTotalUserWord = async () => {
  const session = await auth();
  const currentUserId = session?.user?.id;
  try {
    const total = await prisma.word.count({
      where: { userId: currentUserId },
    });
    if (total > 0) {
      return total;
    } else {
      return 0;
    }
  } catch (error) {
    console.error('Error calculating total word:', error);
    return 0;
  }
};

export const getAllPartOfSpeechNamesInGroup = async ({
  bookId,
  groupId,
}: {
  bookId: string;
  groupId: string;
}) => {
  const session = await auth();
  const currentUserId = session?.user?.id;

  if (!currentUserId) throw new Error('Unauthorized');

  const words = await prisma.word.findMany({
    where: {
      bookId,
      wordGroupId: groupId,
      userId: currentUserId,
      known: false,
      favorite: false,
    },
    select: {
      partOfSpeech: {
        select: { name: true },
      },
    },
  });

  const uniqueNames = Array.from(
    new Set(
      words
        .map((w) => w.partOfSpeech?.name)
        .filter((n): n is string => Boolean(n))
    )
  );

  return uniqueNames.map((name) => ({ name }));
};

export const getAllFilteredUserWords = async ({
  activeType,
  bookId,
  groupId,
  page = 1,
  pageSize = 10,
}: {
  activeType: string;
  bookId: string;
  groupId: string;
  page: number;
  pageSize: number;
}) => {
  const session = await auth();
  const currentUserId = session?.user?.id;

  const currentBook = await prisma.book.findFirst({ where: { id: bookId } });
  if (!currentBook) {
    throw new Error('Book not found');
  }

  const wordsWithPartOfSpeech = await prisma.word.findMany({
    where: {
      bookId,
      wordGroupId: groupId,
      userId: currentUserId,
      known: false,
      favorite: false,
    },
    select: {
      partOfSpeech: {
        select: { name: true },
      },
    },
  });

  // Extract unique partOfSpeech names
  const partOfSpeechNames = Array.from(
    new Set(
      wordsWithPartOfSpeech
        .map((entry) => entry.partOfSpeech?.name)
        .filter(Boolean)
    )
  );

  const whereCondition = {
    partOfSpeech: {
      name:
        activeType === 'All'
          ? { in: partOfSpeechNames }
          : { equals: activeType },
    },
    bookId: bookId,
    wordGroupId: groupId,
    userId: currentUserId,
    known: false,
    favorite: false,
  };

  const allFilteredWords = await prisma.word.findMany({
    where: whereCondition,
    include: {
      partOfSpeech: true,
    },
    orderBy: [{ word: 'asc' }],
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return {
    success: true,
    data: allFilteredWords,
    total: await prisma.word.count({ where: whereCondition }),
  };
};

export const getAllFilteredUserLastWeeksWords = async ({
  activeType,
  bookId,
  groupId,
  page = 1,
  pageSize = 10,
}: {
  activeType: string;
  bookId: string;
  groupId: string;
  page: number;
  pageSize: number;
}) => {
  const session = await auth();
  const currentUserId = session?.user?.id;

  const currentBook = await prisma.book.findFirst({ where: { id: bookId } });
  if (!currentBook) {
    throw new Error('Book not found');
  }

  const wordsWithPartOfSpeech = await prisma.word.findMany({
    where: {
      bookId,
      wordGroupId: groupId,
      userId: currentUserId,
      known: false,
      favorite: false,
    },
    select: {
      partOfSpeech: {
        select: { name: true },
      },
    },
  });

  const partOfSpeechNames = Array.from(
    new Set(
      wordsWithPartOfSpeech
        .map((entry) => entry.partOfSpeech?.name)
        .filter(Boolean)
    )
  );

  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 7);

  const whereCondition = {
    partOfSpeech: {
      name:
        activeType === 'All'
          ? { in: partOfSpeechNames }
          : { equals: activeType },
    },
    bookId,
    wordGroupId: groupId,
    userId: currentUserId,
    known: false,
    favorite: false,
    createdAt: {
      gte: twoWeeksAgo,
    },
  };

  const allFilteredWords = await prisma.word.findMany({
    where: whereCondition,
    include: {
      partOfSpeech: true,
    },
    orderBy: [{ word: 'asc' }],
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return {
    success: true,
    data: allFilteredWords,
    total: await prisma.word.count({ where: whereCondition }),
  };
};

export const getAllFilteredUserLastTwoWeeksWords = async ({
  activeType,
  bookId,
  groupId,
  page = 1,
  pageSize = 10,
}: {
  activeType: string;
  bookId: string;
  groupId: string;
  page: number;
  pageSize: number;
}) => {
  const session = await auth();
  const currentUserId = session?.user?.id;

  const currentBook = await prisma.book.findFirst({ where: { id: bookId } });
  if (!currentBook) {
    throw new Error('Book not found');
  }

  const wordsWithPartOfSpeech = await prisma.word.findMany({
    where: {
      bookId,
      wordGroupId: groupId,
      userId: currentUserId,
      known: false,
      favorite: false,
    },
    select: {
      partOfSpeech: {
        select: { name: true },
      },
    },
  });

  const partOfSpeechNames = Array.from(
    new Set(
      wordsWithPartOfSpeech
        .map((entry) => entry.partOfSpeech?.name)
        .filter(Boolean)
    )
  );

  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

  const whereCondition = {
    partOfSpeech: {
      name:
        activeType === 'All'
          ? { in: partOfSpeechNames }
          : { equals: activeType },
    },
    bookId,
    wordGroupId: groupId,
    userId: currentUserId,
    known: false,
    favorite: false,
    createdAt: {
      gte: twoWeeksAgo,
    },
  };

  const allFilteredWords = await prisma.word.findMany({
    where: whereCondition,
    include: {
      partOfSpeech: true,
    },
    orderBy: [{ word: 'asc' }],
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return {
    success: true,
    data: allFilteredWords,
    total: await prisma.word.count({ where: whereCondition }),
  };
};

export const getAllFilteredUserLastMonthWords = async ({
  activeType,
  bookId,
  groupId,
  page = 1,
  pageSize = 10,
}: {
  activeType: string;
  bookId: string;
  groupId: string;
  page: number;
  pageSize: number;
}) => {
  const session = await auth();
  const currentUserId = session?.user?.id;

  const currentBook = await prisma.book.findFirst({ where: { id: bookId } });
  if (!currentBook) {
    throw new Error('Book not found');
  }

  const wordsWithPartOfSpeech = await prisma.word.findMany({
    where: {
      bookId,
      wordGroupId: groupId,
      userId: currentUserId,
      known: false,
      favorite: false,
    },
    select: {
      partOfSpeech: {
        select: { name: true },
      },
    },
  });

  const partOfSpeechNames = Array.from(
    new Set(
      wordsWithPartOfSpeech
        .map((entry) => entry.partOfSpeech?.name)
        .filter(Boolean)
    )
  );

  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);

  const whereCondition = {
    partOfSpeech: {
      name:
        activeType === 'All'
          ? { in: partOfSpeechNames }
          : { equals: activeType },
    },
    bookId,
    wordGroupId: groupId,
    userId: currentUserId,
    known: false,
    favorite: false,
    createdAt: {
      gte: lastMonth,
    },
  };

  const allFilteredWords = await prisma.word.findMany({
    where: whereCondition,
    include: {
      partOfSpeech: true,
    },
    orderBy: [{ word: 'asc' }],
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return {
    success: true,
    data: allFilteredWords,
    total: await prisma.word.count({ where: whereCondition }),
  };
};

export const getAllFilteredUserLastThreeMonthsWords = async ({
  activeType,
  bookId,
  groupId,
  page = 1,
  pageSize = 10,
}: {
  activeType: string;
  bookId: string;
  groupId: string;
  page: number;
  pageSize: number;
}) => {
  const session = await auth();
  const currentUserId = session?.user?.id;

  const currentBook = await prisma.book.findFirst({ where: { id: bookId } });
  if (!currentBook) {
    throw new Error('Book not found');
  }

  const wordsWithPartOfSpeech = await prisma.word.findMany({
    where: {
      bookId,
      wordGroupId: groupId,
      userId: currentUserId,
      known: false,
      favorite: false,
    },
    select: {
      partOfSpeech: {
        select: { name: true },
      },
    },
  });

  const partOfSpeechNames = Array.from(
    new Set(
      wordsWithPartOfSpeech
        .map((entry) => entry.partOfSpeech?.name)
        .filter(Boolean)
    )
  );

  const last3Month = new Date();
  last3Month.setMonth(last3Month.getMonth() - 3);

  const whereCondition = {
    partOfSpeech: {
      name:
        activeType === 'All'
          ? { in: partOfSpeechNames }
          : { equals: activeType },
    },
    bookId,
    wordGroupId: groupId,
    userId: currentUserId,
    known: false,
    favorite: false,
    createdAt: {
      gte: last3Month,
    },
  };

  const allFilteredWords = await prisma.word.findMany({
    where: whereCondition,
    include: {
      partOfSpeech: true,
    },
    orderBy: [{ word: 'asc' }],
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return {
    success: true,
    data: allFilteredWords,
    total: await prisma.word.count({ where: whereCondition }),
  };
};

export const getAllFilteredUserFavoriteWords = async ({
  activeType,
  bookId,
  groupId,
  page = 1,
  pageSize = 10,
}: {
  activeType: string;
  bookId: string;
  groupId: string;
  page: number;
  pageSize: number;
}) => {
  const session = await auth();
  const currentUserId = session?.user?.id;

  const currentBook = await prisma.book.findFirst({ where: { id: bookId } });
  if (!currentBook) {
    throw new Error('Book not found');
  }

  const wordsWithPartOfSpeech = await prisma.word.findMany({
    where: {
      bookId,
      wordGroupId: groupId,
      userId: currentUserId,
      known: false,
      favorite: false,
    },
    select: {
      partOfSpeech: {
        select: { name: true },
      },
    },
  });

  const partOfSpeechNames = Array.from(
    new Set(
      wordsWithPartOfSpeech
        .map((entry) => entry.partOfSpeech?.name)
        .filter(Boolean)
    )
  );

  const whereCondition = {
    partOfSpeech: {
      name:
        activeType === 'All'
          ? { in: partOfSpeechNames }
          : { equals: activeType },
    },
    bookId,
    wordGroupId: groupId,
    userId: currentUserId,
    favorite: true,
  };

  const allFilteredWords = await prisma.word.findMany({
    where: whereCondition,
    include: {
      partOfSpeech: true,
    },
    orderBy: [{ word: 'asc' }],
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return {
    success: true,
    data: allFilteredWords,
    total: await prisma.word.count({ where: whereCondition }),
  };
};

export const getAllFilteredUserKnownWords = async ({
  activeType,
  bookId,
  groupId,
  page = 1,
  pageSize = 10,
}: {
  activeType: string;
  bookId: string;
  groupId: string;
  page: number;
  pageSize: number;
}) => {
  const session = await auth();
  const currentUserId = session?.user?.id;

  const currentBook = await prisma.book.findFirst({ where: { id: bookId } });
  if (!currentBook) {
    throw new Error('Book not found');
  }

  const wordsWithPartOfSpeech = await prisma.word.findMany({
    where: {
      bookId,
      wordGroupId: groupId,
      userId: currentUserId,
      known: false,
      favorite: false,
    },
    select: {
      partOfSpeech: {
        select: { name: true },
      },
    },
  });

  const partOfSpeechNames = Array.from(
    new Set(
      wordsWithPartOfSpeech
        .map((entry) => entry.partOfSpeech?.name)
        .filter(Boolean)
    )
  );

  const whereCondition = {
    partOfSpeech: {
      name:
        activeType === 'All'
          ? { in: partOfSpeechNames }
          : { equals: activeType },
    },
    bookId,
    wordGroupId: groupId,
    userId: currentUserId,
    known: true,
  };

  const allFilteredWords = await prisma.word.findMany({
    where: whereCondition,
    include: {
      partOfSpeech: true,
    },
    orderBy: [{ word: 'asc' }],
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return {
    success: true,
    data: allFilteredWords,
    total: await prisma.word.count({ where: whereCondition }),
  };
};

export const getAllFilteredUserByMonthsAndYearWords = async ({
  activeType,
  bookId,
  groupId,
  page = 1,
  pageSize = 10,
  month,
  year,
}: {
  activeType: string;
  bookId: string;
  groupId: string;
  page: number;
  pageSize: number;
  month: number;
  year: number;
}) => {
  const session = await auth();
  const currentUserId = session?.user?.id;

  const currentBook = await prisma.book.findFirst({ where: { id: bookId } });
  if (!currentBook) {
    throw new Error('Book not found');
  }

  const wordsWithPartOfSpeech = await prisma.word.findMany({
    where: {
      bookId,
      wordGroupId: groupId,
      userId: currentUserId,
      known: false,
      favorite: false,
    },
    select: {
      partOfSpeech: {
        select: { name: true },
      },
    },
  });

  const partOfSpeechNames = Array.from(
    new Set(
      wordsWithPartOfSpeech
        .map((entry) => entry.partOfSpeech?.name)
        .filter(Boolean)
    )
  );

  const chosenDate = new Date();
  chosenDate.setMonth(month - 1);
  chosenDate.setFullYear(year);

  const whereCondition = {
    partOfSpeech: {
      name:
        activeType === 'All'
          ? { in: partOfSpeechNames }
          : { equals: activeType },
    },
    bookId,
    wordGroupId: groupId,
    userId: currentUserId,
    known: false,
    favorite: false,
    createdAt: chosenDate,
  };

  const allFilteredWords = await prisma.word.findMany({
    where: whereCondition,
    include: {
      partOfSpeech: true,
    },
    orderBy: [{ word: 'asc' }],
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return {
    success: true,
    data: allFilteredWords,
    total: await prisma.word.count({ where: whereCondition }),
  };
};

export const toggleFavoriteWord = async (wordId: string) => {
  try {
    const existing = await prisma.word.findUnique({
      where: { id: wordId },
      select: { favorite: true },
    });

    if (!existing) throw new Error('Word not found');

    const updated = await prisma.word.update({
      where: { id: wordId },
      data: {
        favorite: !existing.favorite,
      },
    });

    return { success: true, data: updated };
  } catch (error) {
    console.error('Error toggling favorite word:', error);
    return { success: false, error: 'Failed to toggle favorite' };
  }
};

export const getAllTotalUserFavoriteWordCount = async () => {
  const session = await auth();
  const currentUserId = session?.user?.id;
  try {
    const total = await prisma.word.count({
      where: { userId: currentUserId, favorite: true },
    });
    if (total > 0) {
      return total;
    } else {
      return 0;
    }
  } catch (error) {
    console.error('Error calculating total word:', error);
    return 0;
  }
};

export const getAllTotalUserKnownWordCount = async () => {
  const session = await auth();
  const currentUserId = session?.user?.id;
  try {
    const total = await prisma.word.count({
      where: { userId: currentUserId, known: true },
    });
    if (total > 0) {
      return total;
    } else {
      return 0;
    }
  } catch (error) {
    console.error('Error calculating total word:', error);
    return 0;
  }
};

export async function getAllUserWordsWithoutPagination({
  bookId,
  groupId,
  activeType,
}: {
  bookId: string;
  groupId: string;
  activeType?: string;
}) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filters: any = {
      bookId,
      wordGroupId: groupId,
    };

    if (activeType && activeType !== 'All') {
      filters.partOfSpeech = activeType;
    }

    const words = await prisma.word.findMany({
      where: filters,
      orderBy: { word: 'asc' },
    });

    return { success: true, data: words };
  } catch (error) {
    console.error('Error fetching all words for search:', error);
    return { success: false, error };
  }
}
export const getAllFilteredUserWordBySearch = async ({
  word,
  activeType,
  bookId,
  groupId,
}: {
  word: string;
  activeType: string;
  bookId: string;
  groupId: string;
}) => {
  const session = await auth();
  const currentUserId = session?.user?.id;

  if (!currentUserId) {
    throw new Error('Unauthorized');
  }

  const currentBook = await prisma.book.findUnique({ where: { id: bookId } });
  if (!currentBook) {
    throw new Error('Book not found');
  }

  // Get available partOfSpeech names (if needed)
  let partOfSpeechFilter;
  if (activeType === 'All') {
    const wordsWithPartOfSpeech = await prisma.word.findMany({
      where: {
        bookId,
        wordGroupId: groupId,
        userId: currentUserId,
        word,
      },
      select: {
        partOfSpeech: {
          select: { name: true },
        },
      },
    });

    const partOfSpeechNames = Array.from(
      new Set(
        wordsWithPartOfSpeech
          .map((entry) => entry.partOfSpeech?.name)
          .filter(Boolean)
      )
    );

    partOfSpeechFilter = {
      partOfSpeech: {
        name: {
          in: partOfSpeechNames,
        },
      },
    };
  } else {
    partOfSpeechFilter = {
      partOfSpeech: {
        name: {
          equals: activeType,
        },
      },
    };
  }

  // Final query condition
  const whereCondition = {
    ...partOfSpeechFilter,
    bookId,
    wordGroupId: groupId,
    userId: currentUserId,
    OR: [
      { word: { contains: word } },
      { synonym: { contains: word } },
      { antonym: { contains: word } },
      { meaning: { contains: word } },
    ],
  };

  const [allFilteredWords, total] = await Promise.all([
    prisma.word.findMany({
      where: whereCondition,
      include: {
        partOfSpeech: true,
      },
      orderBy: [{ word: 'asc' }],
    }),
    prisma.word.count({ where: whereCondition }),
  ]);

  return {
    success: true,
    data: allFilteredWords,
    total,
  };
};

export const getUniqueWordYears = async ({
  bookId,
  groupId,
}: {
  bookId: string;
  groupId: string;
}) => {
  const words = await prisma.word.findMany({
    where: { bookId: bookId, wordGroupId: groupId },
    select: {
      createdAt: true,
    },
  });

  // Extract years and remove duplicates
  const uniqueYears = [
    ...new Set(words.map((word) => word.createdAt.getFullYear())),
  ];

  return uniqueYears.sort((a, b) => b - a);
};

export const getMonthlyFilteredUserWord = async ({
  activeType,
  bookId,
  groupId,
  month,
  year,
  page = 1,
  pageSize = 10,
}: {
  activeType: string;
  bookId: string;
  groupId: string;
  month: number;
  year: number;
  page: number;
  pageSize: number;
}) => {
  const session = await auth();
  const currentUserId = session?.user?.id;

  if (!currentUserId) {
    throw new Error('Unauthorized');
  }

  const currentBook = await prisma.book.findUnique({ where: { id: bookId } });
  if (!currentBook) {
    throw new Error('Book not found');
  }

  // Get available partOfSpeech names (if needed)
  let partOfSpeechFilter;
  if (activeType === 'All') {
    const wordsWithPartOfSpeech = await prisma.word.findMany({
      where: {
        bookId,
        wordGroupId: groupId,
        userId: currentUserId,
        known: false,
        favorite: false,
        createdAt: {
          gte: new Date(year, month - 1, 1), // start of the month
          lt: new Date(year, month, 1), // start of next month
        },
      },
      select: {
        partOfSpeech: {
          select: { name: true },
        },
      },
    });

    const partOfSpeechNames = Array.from(
      new Set(
        wordsWithPartOfSpeech
          .map((entry) => entry.partOfSpeech?.name)
          .filter(Boolean)
      )
    );

    partOfSpeechFilter = {
      partOfSpeech: {
        name: {
          in: partOfSpeechNames,
        },
      },
    };
  } else {
    partOfSpeechFilter = {
      partOfSpeech: {
        name: {
          equals: activeType,
        },
      },
    };
  }

  // Final query condition
  const whereCondition = {
    ...partOfSpeechFilter,
    bookId,
    wordGroupId: groupId,
    userId: currentUserId,
    known: false,
    favorite: false,
    createdAt: {
      gte: new Date(year, month - 1, 1), // start of the month
      lt: new Date(year, month, 1), // start of next month
    },
  };

  const [allFilteredWords, total] = await Promise.all([
    prisma.word.findMany({
      where: whereCondition,
      include: {
        partOfSpeech: true,
      },
      orderBy: [{ word: 'asc' }],
      skip: (page - 1) * pageSize, // <-- NEW
      take: pageSize,
    }),
    prisma.word.count({ where: whereCondition }),
  ]);

  return {
    success: true,
    data: allFilteredWords,
    total,
  };
};
