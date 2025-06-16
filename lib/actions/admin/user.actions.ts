import { signInFormSchema, signUpFormSchema } from '@/lib/validator';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { signIn, signOut } from 'next-auth/react';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { formatError } from '@/lib/utils';
import { prisma } from '@/db/prisma';
import { hashSync } from 'bcryptjs';

export const createUser = async (data: z.infer<typeof signUpFormSchema>) => {
  const parsed = signUpFormSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: 'Validation failed',
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { userName, firstName, lastName, email, password, role } = parsed.data;
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
      },
    });

    revalidatePath('/sign-in');
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
