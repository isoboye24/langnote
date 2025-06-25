'use server';

import { prisma } from '@/db/prisma';
import { upsertGendersSchema } from '../../validator';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { formatError } from '../../utils';

export const upsertGender = async (
  data: z.infer<typeof upsertGendersSchema>
) => {
  const parsed = upsertGendersSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: 'Invalid gender data',
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { id, genderName, languageId } = parsed.data;

  try {
    let gender;

    // Upsert the genders
    if (id) {
      gender = await prisma.gender.upsert({
        where: { id },
        update: { genderName, languageId },
        create: { genderName, languageId },
      });
    } else {
      const genderExists = await prisma.gender.findFirst({
        where: {
          genderName: {
            equals: genderName.trim(),
            mode: 'insensitive',
          },
          languageId: languageId,
        },
      });

      if (genderExists) {
        const getLanguage = await prisma.language.findFirst({
          where: { id: genderExists.languageId },
        });
        return {
          success: false,
          message: `This gender ${genderExists.genderName} already exists in ${getLanguage?.languageName}.`,
        };
      } else {
        gender = await prisma.gender.create({
          data: { genderName, languageId },
        });
      }
    }

    return {
      success: true,
      message: id
        ? 'Gender updated successfully'
        : 'Gender created successfully',
      data: gender,
    };
  } catch (error) {
    console.error('Upsert gender error:', error);
    return {
      success: false,
      message: 'Failed to upsert gender',
    };
  }
};

export const checkIfGenderExists = async (
  genderName: string,
  languageId: string
) => {
  try {
    const existing = await prisma.gender.findFirst({
      where: {
        genderName: {
          equals: genderName,
          mode: 'insensitive',
        },
        languageId,
      },
    });

    return !!existing;
  } catch (error) {
    console.error('Error checking for existing gender:', error);
    return false;
  }
};

export const getAllGenders = async (
  page: number = 1,
  pageSize: number = 10
) => {
  try {
    const [genders, total] = await Promise.all([
      prisma.gender.findMany({
        orderBy: { genderName: 'asc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.gender.count(),
    ]);

    return {
      success: true,
      data: genders,
      total,
    };
  } catch (error) {
    console.error('Error fetching genders:', error);
    return {
      success: false,
      message: 'Failed to fetch genders',
    };
  }
};

export const getGenderById = async (id: string) => {
  try {
    const gender = await prisma.gender.findFirst({
      where: { id },
    });

    if (!gender) {
      return {
        success: false,
        message: 'Gender not found',
      };
    }

    return {
      success: true,
      data: gender,
    };
  } catch (error) {
    console.error('Error fetching gender:', error);
    return {
      success: false,
      message: 'Failed to fetch gender',
    };
  }
};

export async function deleteGender(id: string) {
  try {
    const genderExists = await prisma.gender.findFirst({
      where: { id },
    });

    if (!genderExists) throw new Error('Gender not found');

    await prisma.gender.delete({ where: { id } });

    revalidatePath('/admin/genders');

    return {
      success: true,
      message: 'Gender deleted successfully',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export const getTotalGender = async () => {
  try {
    const total = await prisma.gender.count();
    return { success: true, data: total };
  } catch (error) {
    console.error('Error calculating total gender:', error);
    return { success: false, message: 'Failed to count gender' };
  }
};

export const getAllGendersToSelect = async () => {
  try {
    const [genders, total] = await Promise.all([
      prisma.gender.findMany({
        orderBy: { genderName: 'asc' },
      }),
      prisma.gender.count(),
    ]);

    return {
      success: true,
      data: genders,
      total,
    };
  } catch (error) {
    console.error('Error fetching genders:', error);
    return {
      success: false,
      message: 'Failed to fetch genders',
    };
  }
};
