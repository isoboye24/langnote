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
        where: { bookId: bookId, wordGroupId: groupId, userId: currentUserId },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
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
