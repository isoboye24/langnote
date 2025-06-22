import { prisma } from '@/db/prisma';

export const getTotalWordGroup = async ({ bookId }: { bookId: string }) => {
  try {
    const total = await prisma.wordGroup.count({
      where: { bookId: bookId },
    });
    return { success: true, data: total };
  } catch (error) {
    console.error('Error calculating total book:', error);
    return { success: false, message: 'Failed to count book' };
  }
};
