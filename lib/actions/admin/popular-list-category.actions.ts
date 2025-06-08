'use server';

import { prisma } from '@/db/prisma';
import { upsertPopularListCategorySchema } from '../../validator';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { formatError } from '../../utils';

export const upsertPopularCategory = async (
  data: z.infer<typeof upsertPopularListCategorySchema>
) => {
  const parsed = upsertPopularListCategorySchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: 'Invalid category data',
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { id, popularCategory, languageId } = parsed.data;

  try {
    let category;

    // Upsert the category
    if (id) {
      category = await prisma.popularListCategory.upsert({
        where: { id },
        update: { popularCategory, languageId },
        create: { popularCategory, languageId },
      });
    } else {
      category = await prisma.popularListCategory.create({
        data: { popularCategory, languageId },
      });
    }

    return {
      success: true,
      message: id
        ? 'Category updated successfully'
        : 'Category created successfully',
      data: category,
    };
  } catch (error) {
    console.error('Upsert category error:', error);
    return {
      success: false,
      message: 'Failed to upsert category',
    };
  }
};
export const checkIfPopularCategoryExists = async (
  category: string,
  languageId: string
) => {
  try {
    const existing = await prisma.popularListCategory.findFirst({
      where: {
        popularCategory: {
          equals: category,
          mode: 'insensitive',
        },
        languageId,
      },
    });

    return !!existing;
  } catch (error) {
    console.error('Error checking for existing category:', error);
    return false;
  }
};

export const getAllPopularCategory = async () => {
  try {
    const category = await prisma.popularListCategory.findMany({
      orderBy: {
        popularCategory: 'asc',
      },
    });

    return {
      success: true,
      data: category,
    };
  } catch (error) {
    console.error('Error fetching categories:', error);
    return {
      success: false,
      message: 'Failed to fetch categories',
    };
  }
};

export const getPopularCategoryById = async (id: string) => {
  try {
    const category = await prisma.popularListCategory.findFirst({
      where: { id },
    });

    if (!category) {
      return {
        success: false,
        message: 'Category not found',
      };
    }

    return {
      success: true,
      data: category,
    };
  } catch (error) {
    console.error('Error fetching category:', error);
    return {
      success: false,
      message: 'Failed to fetch category',
    };
  }
};

export async function deletePopularCategory(id: string) {
  try {
    const categoryExists = await prisma.popularListCategory.findFirst({
      where: { id },
    });

    if (!categoryExists) throw new Error('Popular Category not found');

    await prisma.popularListCategory.delete({ where: { id } });

    revalidatePath('/admin/popular-lists-categories');

    return {
      success: true,
      message: 'Category deleted successfully',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export const getTotalPopularCategory = async () => {
  try {
    const total = await prisma.popularListCategory.count();
    return { success: true, total };
  } catch (error) {
    console.error('Error calculating total categories:', error);
    return { success: false, message: 'Failed to count categories' };
  }
};
