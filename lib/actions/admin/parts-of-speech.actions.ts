'use server';

import { prisma } from '@/db/prisma';
import { upsertPartsOfSpeechSchema } from '../../validator';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { formatError } from '../../utils';

export const upsertPartsOfSpeech = async (
  data: z.infer<typeof upsertPartsOfSpeechSchema>
) => {
  const parsed = upsertPartsOfSpeechSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: 'Invalid part of speech data',
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { id, name, languageId } = parsed.data;

  try {
    let partOfSpeech;

    // Upsert the part of speech
    if (id) {
      partOfSpeech = await prisma.partOfSpeech.upsert({
        where: { id },
        update: { name, languageId },
        create: { name, languageId },
      });
    } else {
      partOfSpeech = await prisma.partOfSpeech.create({
        data: { name, languageId },
      });
    }

    return {
      success: true,
      message: id
        ? 'Parts of speech updated successfully'
        : 'Parts of speech created successfully',
      data: partOfSpeech,
    };
  } catch (error) {
    console.error('Upsert parts of speech error:', error);
    return {
      success: false,
      message: 'Failed to upsert parts of speech',
    };
  }
};

export const checkIfPartsOfSpeechExists = async (
  name: string,
  languageId: string
) => {
  try {
    const existing = await prisma.partOfSpeech.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
        languageId,
      },
    });

    return !!existing;
  } catch (error) {
    console.error('Error checking for existing part of speech:', error);
    return false;
  }
};

export const getAllPartsOfSpeech = async (
  page: number = 1,
  pageSize: number = 10
) => {
  try {
    const [partsOfSpeech, total] = await Promise.all([
      prisma.partOfSpeech.findMany({
        orderBy: { name: 'asc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.partOfSpeech.count(),
    ]);

    return {
      success: true,
      data: partsOfSpeech,
      total,
    };
  } catch (error) {
    console.error('Error fetching word parts of speech:', error);
    return {
      success: false,
      message: 'Failed to fetch word parts of speech',
    };
  }
};

export const getPartsOfSpeechById = async (id: string) => {
  try {
    const partOfSpeech = await prisma.partOfSpeech.findFirst({
      where: { id },
    });

    if (!partOfSpeech) {
      return {
        success: false,
        message: 'Part of speech not found',
      };
    }

    return {
      success: true,
      data: partOfSpeech,
    };
  } catch (error) {
    console.error('Error fetching part of speech:', error);
    return {
      success: false,
      message: 'Failed to fetch part of speech',
    };
  }
};

export async function deletePartsOfSpeech(id: string) {
  try {
    const partOfSpeechExists = await prisma.partOfSpeech.findFirst({
      where: { id },
    });

    if (!partOfSpeechExists) throw new Error('Part of speech not found');

    await prisma.partOfSpeech.delete({ where: { id } });

    revalidatePath('/admin/parts-of-speech');

    return {
      success: true,
      message: 'Parts of speech deleted successfully',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export const getTotalPartsOfSpeech = async () => {
  try {
    const total = await prisma.partOfSpeech.count();
    return { success: true, total };
  } catch (error) {
    console.error('Error calculating total parts of speech:', error);
    return { success: false, message: 'Failed to count parts of speech' };
  }
};
