import { compareSync } from 'bcryptjs';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/db/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { authConfig } from './auth.config';

export const config = {
  pages: {
    signIn: '/${defaultLocale}/sign-in',
    error: '/${defaultLocale}/sign-in',
  },
  session: {
    strategy: 'jwt' as const,
    maxAge: 30 * 24 * 60 * 60,
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        if (credentials == null) return null;

        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email as string,
          },
        });

        if (user && user.password) {
          const isMatch = compareSync(
            credentials.password as string,
            user.password
          );

          if (isMatch) {
            return {
              id: user.id,
              userName: user.userName,
              lastName: user.lastName,
              firstName: user.firstName,
              email: user.email,
              role: user.role,
            };
          }
        }

        return null;
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, user, trigger, token }: any) {
      session.user = {
        ...session.user,
        id: token.id ?? null, // <-- use token.id here, NOT token.sub
        role: token.role ?? 'user',
        name: token.name ?? '',
      };

      if (trigger === 'update') {
        session.user.name = user.name;
      }

      return session;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, user, trigger, session }: any) {
      if (user) {
        token.role = user.role;
        token.id = user.id;

        if (user.name === 'NO_NAME') {
          token.name = user.email!.split('@')[0];

          await prisma.user.update({
            where: { id: user.id },
            data: {
              userName: user.userName,
              lastName: user.lastName,
              firstName: user.firstName,
              email: user.email,
              role: user.role,
            },
          });
        }
      }

      if (session?.user.name && trigger === 'update') {
        token.name = `${user.firstName} ${user.lastName}`;
        token.id = session.user.id;
      }

      return token;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
