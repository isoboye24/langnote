'use server';

import { prisma } from '@/db/prisma';
import { upsertBookSchema } from '../../validator';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { formatError } from '../../utils';
import { auth } from '@/auth';

export const upsertBook = async (data: z.infer<typeof upsertBookSchema>) => {
  const parsed = upsertBookSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: 'Invalid book data',
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { id, title, userId, languageId, color1, color2 } = parsed.data;

  try {
    let book;

    // Upsert the book
    if (id) {
      const existing = await prisma.book.findUnique({ where: { id } });
      if (!existing) {
        return {
          success: false,
          message: 'Book not found for update',
        };
      }

      book = await prisma.book.upsert({
        where: { id },
        update: { title, userId, languageId, color1, color2 },
        create: { title, userId, languageId, color1, color2 },
      });
    } else {
      const existing = await prisma.book.findFirst({
        where: {
          title: {
            equals: title,
            mode: 'insensitive',
          },
          languageId: languageId,
          userId,
        },
      });
      const getLanguage = await prisma.language.findFirst({
        where: { id: existing?.languageId },
      });

      if (!existing) {
        book = await prisma.book.create({
          data: { title, userId, languageId, color1, color2 },
        });

        return {
          success: true,
          message: 'Book created successfully',
          data: book,
        };
      } else {
        return {
          success: false,
          message: `The book '${existing.title}' already exists in '${
            getLanguage?.languageName
          }'. It was created on ${existing.createdAt.getDay()}.${existing.createdAt.getMonth()}.${existing.createdAt.getFullYear()}.`,
        };
      }
    }
    return {
      success: true,
      message: id ? 'Book updated successfully' : '',
      data: book,
    };
  } catch (error) {
    console.error('Upsert book error:', error);
    return {
      success: false,
      message: 'Failed to upsert book',
    };
  }
};

export const checkIfBookExists = async (
  userId: string,
  languageId: string,
  title: string
) => {
  try {
    const existing = await prisma.book.findFirst({
      where: {
        title: {
          equals: title,
          mode: 'insensitive',
        },
        languageId: {
          equals: languageId,
        },
        userId: {
          equals: userId,
        },
      },
    });

    return !!existing;
  } catch (error) {
    console.error('Error checking for existing book:', error);
    return false;
  }
};

export const getAllBooks = async (
  page: number = 1,
  pageSize: number = 10,
  userId: string
) => {
  try {
    const [books, total] = await Promise.all([
      prisma.book.findMany({
        where: { userId: userId },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.book.count({
        where: { userId: userId },
      }),
    ]);

    return {
      success: true,
      data: books,
      total,
    };
  } catch (error) {
    console.error('Error fetching books:', error);
    return {
      success: false,
      message: 'Failed to fetch books',
    };
  }
};

export const getBookById = async (id: string) => {
  try {
    const book = await prisma.book.findFirst({
      where: { id },
    });

    if (!book) {
      return {
        success: false,
        message: 'Book not found',
      };
    }

    return {
      success: true,
      data: book,
    };
  } catch (error) {
    console.error('Error fetching book:', error);
    return {
      success: false,
      message: 'Failed to fetch book',
    };
  }
};

export async function deleteBook(id: string) {
  try {
    const bookExists = await prisma.book.findFirst({
      where: { id },
    });

    if (!bookExists) throw new Error('Book not found');

    await prisma.book.delete({ where: { id } });

    revalidatePath('/user/books');

    return {
      success: true,
      message: 'Book deleted successfully',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export const getTotalUserBooks = async (userId: string) => {
  try {
    const total = await prisma.book.count({
      where: { userId: userId },
    });
    if (total > 0) {
      return total;
    } else {
      return 0;
    }
  } catch (error) {
    console.error('Error calculating total book:', error);
    return 0;
  }
};

export const getAllBooksToSelect = async (id: string, userId: string) => {
  try {
    const [books, total] = await Promise.all([
      prisma.book.findMany({
        where: { id, userId: userId },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.book.count({ where: { userId: userId } }),
    ]);

    return {
      success: true,
      data: books,
      total,
    };
  } catch (error) {
    console.error('Error fetching books:', error);
    return {
      success: false,
      message: 'Failed to fetch books',
    };
  }
};

export const getBookWithMostWords = async () => {
  const session = await auth();
  const currentUserId = session?.user?.id;

  const book = await prisma.book.findFirst({
    where: { userId: currentUserId },
    orderBy: {
      Word: {
        _count: 'desc',
      },
    },
    include: {
      _count: {
        select: { Word: true },
      },
    },
  });

  return book ?? null;
};
