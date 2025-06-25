'use server';

import { prisma } from '@/db/prisma';
import { upsertWordGroupSchema } from '../../validator';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { formatError } from '../../utils';

export const upsertWordGroup = async (
  data: z.infer<typeof upsertWordGroupSchema>
) => {
  const parsed = upsertWordGroupSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: 'Invalid word group data',
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { id, groupName, bookId, color } = parsed.data;

  try {
    let group;

    // Upsert the book
    if (id) {
      const existing = await prisma.wordGroup.findUnique({ where: { id } });
      if (!existing) {
        return {
          success: false,
          message: 'Group not found for update',
        };
      }

      group = await prisma.wordGroup.upsert({
        where: { id },
        update: { groupName, bookId, color },
        create: { groupName, bookId, color },
      });
    } else {
      const existing = await prisma.wordGroup.findFirst({
        where: {
          groupName: {
            equals: groupName,
            mode: 'insensitive',
          },
          bookId,
        },
      });

      if (!existing) {
        group = await prisma.wordGroup.create({
          data: { groupName, bookId, color },
        });
      } else {
        return {
          success: false,
          message: 'Group with the same name',
        };
      }
    }

    return {
      success: true,
      message: id ? 'Group updated successfully' : 'Group created successfully',
      data: group,
    };
  } catch (error) {
    console.error('Upsert group error:', error);
    return {
      success: false,
      message: 'Failed to upsert group',
    };
  }
};

export const checkIfWordGroupExists = async (
  bookId: string,
  groupName: string
) => {
  try {
    const existing = await prisma.wordGroup.findFirst({
      where: {
        groupName: {
          equals: groupName,
          mode: 'insensitive',
        },
        bookId: {
          equals: bookId,
        },
      },
    });

    return !!existing;
  } catch (error) {
    console.error('Error checking for existing group:', error);
    return false;
  }
};

export const getAllWordGroups = async (
  page: number = 1,
  pageSize: number = 10,
  bookId: string
) => {
  try {
    const [groups, total] = await Promise.all([
      prisma.wordGroup.findMany({
        where: { bookId },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.wordGroup.count({ where: { bookId } }),
    ]);

    return {
      success: true,
      data: groups,
      total,
    };
  } catch (error) {
    console.error('Error fetching groups:', error);
    return {
      success: false,
      message: 'Failed to fetch groups',
    };
  }
};

export const getWordGroupById = async (id: string) => {
  try {
    const group = await prisma.wordGroup.findFirst({
      where: { id },
    });

    if (!group) {
      return {
        success: false,
        message: 'Group not found',
      };
    }

    return {
      success: true,
      data: group,
    };
  } catch (error) {
    console.error('Error fetching group:', error);
    return {
      success: false,
      message: 'Failed to fetch group',
    };
  }
};

export async function deleteWordGroup(id: string, bookId: string) {
  try {
    const groupExists = await prisma.wordGroup.findFirst({
      where: { id },
    });

    if (!groupExists) throw new Error('Group not found');

    await prisma.wordGroup.delete({ where: { id } });

    revalidatePath(`/user/books/${bookId}`);

    return {
      success: true,
      message: 'Group deleted successfully',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export const getTotalWordGroup = async (bookId: string) => {
  try {
    const total = await prisma.wordGroup.count({ where: { bookId } });
    if (total > 0) {
      return total;
    } else {
      return 0;
    }
  } catch (error) {
    console.error('Error calculating total group:', error);
    return { success: false, message: 'Failed to count group' };
  }
};
