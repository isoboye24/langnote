import { NextRequest, NextResponse } from 'next/server';
import { auth } from './auth';

const PUBLIC_FILE = /\.(.*)$/;
const locales = ['en', 'de', 'ru'];
const defaultLocale = 'en';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static assets and API
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Locale redirect
  const hasLocale = locales.some((locale) => pathname.startsWith(`/${locale}`));
  if (!hasLocale) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  // Auth protection
  const session = await auth(); // this uses authConfig
  const protectedPaths = [
    /^\/(en|de|ru)\/user(\/.*)?$/,
    /^\/(en|de|ru)\/admin(\/.*)?$/,
  ];

  if (!session && protectedPaths.some((regex) => regex.test(pathname))) {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}/login`, request.url)
    );
  }

  // Cookie handling
  const response = NextResponse.next();
  const hasCartCookie = request.cookies.has('sessionCartId');

  if (!hasCartCookie) {
    response.cookies.set('sessionCartId', crypto.randomUUID(), {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
