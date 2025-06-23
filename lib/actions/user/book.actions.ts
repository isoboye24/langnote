'use server';

import { prisma } from '@/db/prisma';
import { upsertBookSchema } from '../../validator';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { formatError } from '../../utils';

export const upsertBook = async (data: z.infer<typeof upsertBookSchema>) => {
  const parsed = upsertBookSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: 'Invalid book data',
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { id, title, userId, language, color1, color2 } = parsed.data;

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
        update: { title, userId, language, color1, color2 },
        create: { title, userId, language, color1, color2 },
      });
    } else {
      const existing = await prisma.book.findFirst({
        where: {
          title: {
            equals: title,
            mode: 'insensitive',
          },
          language: {
            equals: language,
            mode: 'insensitive',
          },
          userId,
        },
      });

      if (!existing) {
        book = await prisma.book.create({
          data: { title, userId, language, color1, color2 },
        });
      } else {
        return {
          success: false,
          message: 'Book with the same title and language exists',
        };
      }
    }

    return {
      success: true,
      message: id ? 'Book updated successfully' : 'Book created successfully',
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
  language: string,
  title: string
) => {
  try {
    const existing = await prisma.book.findFirst({
      where: {
        title: {
          equals: title,
          mode: 'insensitive',
        },
        language: {
          equals: language,
          mode: 'insensitive',
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

export const getAllBooks = async (page: number = 1, pageSize: number = 10) => {
  try {
    const [books, total] = await Promise.all([
      prisma.book.findMany({
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.book.count(),
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

export const getTotalBooks = async () => {
  try {
    const total = await prisma.book.count();
    return { success: true, data: total };
  } catch (error) {
    console.error('Error calculating total book:', error);
    return { success: false, message: 'Failed to count book' };
  }
};

export const getAllBooksToSelect = async (id: string) => {
  try {
    const [books, total] = await Promise.all([
      prisma.book.findMany({
        where: { id },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.book.count(),
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
