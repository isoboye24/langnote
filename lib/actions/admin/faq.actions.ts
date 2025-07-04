// 'use server';

// import { prisma } from '@/db/prisma';
// import { upsertFAQSchema } from '../../validator';
// import { revalidatePath } from 'next/cache';
// import { z } from 'zod';
// import { formatError } from '../../utils';

// export const upsertFAQ = async (data: z.infer<typeof upsertFAQSchema>) => {
//   const parsed = upsertFAQSchema.safeParse(data);

//   if (!parsed.success) {
//     return {
//       success: false,
//       message: 'Invalid FAQ data',
//       errors: parsed.error.flatten().fieldErrors,
//     };
//   }

//   const { id, page, question, answer, publish, rate } = parsed.data;

//   try {
//     let faq;

//     // Upsert the faq
//     if (id) {
//       faq = await prisma.faq.upsert({
//         where: { id },
//         update: { page, question, answer, publish, rate },
//         create: { page, question, answer, publish, rate },
//       });
//     } else {
//       const faqExists = await prisma.faq.findFirst({
//         where: {
//           question: {
//             equals: question.trim(),
//             mode: 'insensitive',
//           },
//         },
//       });

//       if (faqExists) {
//         return {
//           success: false,
//           message: `This FAQ already exists.`,
//         };
//       } else {
//         faq = await prisma.faq.create({
//           data: { page, question, answer, publish, rate },
//         });
//       }
//     }

//     return {
//       success: true,
//       message: id ? 'FAQ updated successfully' : 'FAQ created successfully',
//       data: faq,
//     };
//   } catch (error) {
//     console.error('Upsert FAQ error:', error);
//     return {
//       success: false,
//       message: 'Failed to upsert FAQ',
//     };
//   }
// };

// export const checkIfFAQExists = async (language: string) => {
//   try {
//     const existing = await prisma.language.findFirst({
//       where: {
//         languageName: {
//           equals: language,
//           mode: 'insensitive',
//         },
//       },
//     });

//     return !!existing;
//   } catch (error) {
//     console.error('Error checking for existing language:', error);
//     return false;
//   }
// };

// export const getAllFAQs = async (page: number = 1, pageSize: number = 10) => {
//   try {
//     const [languages, total] = await Promise.all([
//       prisma.language.findMany({
//         orderBy: { languageName: 'asc' },
//         skip: (page - 1) * pageSize,
//         take: pageSize,
//       }),
//       prisma.language.count(),
//     ]);

//     return {
//       success: true,
//       data: languages,
//       total,
//     };
//   } catch (error) {
//     console.error('Error fetching word languages:', error);
//     return {
//       success: false,
//       message: 'Failed to fetch word languages',
//     };
//   }
// };

// export const getFAQById = async (id: string) => {
//   try {
//     const language = await prisma.language.findFirst({
//       where: { id },
//     });

//     if (!language) {
//       return {
//         success: false,
//         message: 'Language not found',
//       };
//     }

//     return {
//       success: true,
//       data: language,
//     };
//   } catch (error) {
//     console.error('Error fetching language:', error);
//     return {
//       success: false,
//       message: 'Failed to fetch language',
//     };
//   }
// };

// export async function deleteFAQ(id: string) {
//   try {
//     const languageExists = await prisma.language.findFirst({
//       where: { id },
//     });

//     if (!languageExists) throw new Error('Language not found');

//     await prisma.language.delete({ where: { id } });

//     revalidatePath('/admin/languages');

//     return {
//       success: true,
//       message: 'Language deleted successfully',
//     };
//   } catch (error) {
//     return { success: false, message: formatError(error) };
//   }
// }

// export const getAllFAQToSelect = async () => {
//   try {
//     const [languages, total] = await Promise.all([
//       prisma.language.findMany({
//         orderBy: { languageName: 'asc' },
//       }),
//       prisma.language.count(),
//     ]);

//     return {
//       success: true,
//       data: languages,
//       total,
//     };
//   } catch (error) {
//     console.error('Error fetching word languages:', error);
//     return {
//       success: false,
//       message: 'Failed to fetch word languages',
//     };
//   }
// };
