// app/(actions)/create-user.ts
'use server';

import { signInFormSchema, signUpFormSchema } from '@/lib/validator';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { formatError } from '@/lib/utils';
import { prisma } from '@/db/prisma';
import { hashSync } from 'bcryptjs';
import { signIn, signOut } from '@/auth';
import { isRedirectError } from 'next/dist/client/components/redirect-error';

export const createUser = async (
  data: z.infer<typeof signUpFormSchema>,
  locale: string
) => {
  const parsed = signUpFormSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: 'Validation failed',
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const {
    userName,
    firstName,
    lastName,
    email,
    password,
    role,
    firstLanguage,
  } = parsed.data;
  const hashedPassword = hashSync(password, 8);

  try {
    const user = await prisma.user.create({
      data: {
        userName,
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
        firstLanguage,
      },
    });

    revalidatePath(`/${locale}/sign-in`);

    return { success: true, message: 'User created', data: user };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
};

export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const email = formData.get('email')?.toString() || '';
    const password = formData.get('password')?.toString() || '';

    const user = signInFormSchema.parse({ email, password });

    await signIn('credentials', user);

    return { success: true, message: 'Signed in successfully' };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    console.error('Sign-in error:', error);

    return { success: false, message: 'Invalid email or password' };
  }
}

export async function SignOutUser() {
  await signOut();
}

export const updateUser = async (
  id: string,
  data: z.infer<typeof signUpFormSchema>
) => {
  const parsed = signUpFormSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: 'Validation failed',
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const updateData = { ...parsed.data };

  if (updateData.password) {
    updateData.password = hashSync(updateData.password, 8);
  }

  try {
    const user = await prisma.user.update({
      where: { id },
      data: updateData,
    });

    return { success: true, message: 'User updated', data: user };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
};

export const checkIfUserExists = async (emailEntered: string) => {
  try {
    const existing = await prisma.user.findFirst({
      where: {
        email: {
          equals: emailEntered,
        },
      },
    });

    return !!existing;
  } catch (error) {
    console.error('Error checking for existing skill:', error);
    return false;
  }
};

export const getAllUsers = async (page: number = 1, pageSize: number = 10) => {
  try {
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        orderBy: [{ createdAt: 'desc' }, { userName: 'asc' }],
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.user.count(),
    ]);

    return {
      success: true,
      data: users,
      total,
    };
  } catch (error) {
    console.error('Error fetching user:', error);
    return {
      success: false,
      message: 'Failed to fetch user.',
    };
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: { id },
    });

    if (!user) {
      return {
        success: false,
        message: 'user not found',
      };
    }

    return {
      success: true,
      data: user,
    };
  } catch (error) {
    console.error('Error fetching user:', error);
    return {
      success: false,
      message: 'Failed to fetch user',
    };
  }
};

export async function deleteUser(id: string) {
  try {
    const wordExists = await prisma.user.findFirst({
      where: { id },
    });

    if (!wordExists) throw new Error('Popular user not found');

    await prisma.user.delete({ where: { id } });

    revalidatePath('/admin/users');

    return {
      success: true,
      message: 'user deleted successfully',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export const getTotalUsers = async () => {
  try {
    const total = await prisma.user.count();
    return { success: true, total };
  } catch (error) {
    console.error('Error calculating total users:', error);
    return { success: false, message: 'Failed to count users' };
  }
};
