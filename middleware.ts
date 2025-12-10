import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;
const locales = ['en', 'de', 'ru'];
const defaultLocale = 'en';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static and API routes
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

  // Support all possible NextAuth session cookies
  const sessionCookie =
    request.cookies.get('__Secure-authjs.session-token')?.value ||
    request.cookies.get('authjs.session-token')?.value ||
    request.cookies.get('__Host-authjs.session-token')?.value;

  // Protected routes
  const protectedPaths = [
    /^\/(en|de|ru)\/user(\/.*)?$/,
    /^\/(en|de|ru)\/admin(\/.*)?$/,
  ];

  const isProtected = protectedPaths.some((regex) => regex.test(pathname));

  if (!sessionCookie && isProtected) {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}/login`, request.url)
    );
  }

  // Cart cookie
  const response = NextResponse.next();

  if (!request.cookies.has('sessionCartId')) {
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
