'use server';

import { prisma } from '@/db/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { formatError } from '@/lib/utils';
import { upsertContactSchema } from '@/lib/validator';

export const upsertContactMessage = async (
  data: z.infer<typeof upsertContactSchema>
) => {
  const parsed = upsertContactSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: 'Invalid contact message data',
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { id, senderName, senderEmail, subject, messageText } = parsed.data;

  try {
    let contactMessageData;

    // Upsert the message
    if (id) {
      contactMessageData = await prisma.contact.upsert({
        where: { id },
        update: { senderName, senderEmail, subject, messageText },
        create: { senderName, senderEmail, subject, messageText },
      });
    } else {
      contactMessageData = await prisma.contact.create({
        data: { senderName, senderEmail, subject, messageText },
      });
    }

    return {
      success: true,
      clientMessage: id
        ? 'Contact message updated successfully'
        : 'Message sent successfully',
      data: contactMessageData,
    };
  } catch (error) {
    console.error('Upsert contact message error:', error);
    return {
      success: false,
      message: 'Failed to upsert contact message',
    };
  }
};

export const getAllContactMessages = async () => {
  try {
    const contactMessageData = await prisma.contact.findMany({
      orderBy: {
        senderName: 'desc',
      },
    });

    return {
      success: true,
      data: contactMessageData,
    };
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    return {
      success: false,
      message: 'Failed to fetch contact messages',
    };
  }
};

export const getSomeContactMessages = async () => {
  const takeCount = 6;
  try {
    const contactMessageData = await prisma.contact.findMany({
      orderBy: {
        date: 'desc',
      },
      take: takeCount,
    });

    return {
      success: true,
      data: contactMessageData,
    };
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    return {
      success: false,
      message: 'Failed to fetch contact messages',
    };
  }
};

export const getContactMessageById = async (id: string) => {
  try {
    const contactMessageData = await prisma.contact.findFirst({
      where: { id },
    });

    if (!contactMessageData) {
      return {
        success: false,
        message: 'Contact message not found',
      };
    }

    return {
      success: true,
      data: contactMessageData,
    };
  } catch (error) {
    console.error('Error fetching contact message:', error);
    return {
      success: false,
      message: 'Failed to fetch contact message',
    };
  }
};

export async function deleteContactMessage(id: string) {
  try {
    const contactMessageData = await prisma.contact.findFirst({
      where: { id },
    });

    if (!contactMessageData) throw new Error('Contact message not found');

    await prisma.contact.delete({ where: { id } });

    revalidatePath('/admin/messages');

    return {
      success: true,
      message: 'Contact message deleted successfully',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export const getTotalContactMessages = async () => {
  try {
    const total = await prisma.contact.count();
    return { success: true, total };
  } catch (error) {
    console.error('Error calculating total contact messages:', error);
    return { success: false, message: 'Failed to count contact messages' };
  }
};
