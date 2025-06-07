import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;
const locales = ['en', 'de', 'ru'];
const defaultLocale = 'en';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip public files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Already includes a locale — do nothing
  const pathnameHasLocale = locales.some((locale) =>
    pathname.startsWith(`/${locale}`)
  );

  if (!pathnameHasLocale) {
    // Redirect to default locale
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Enable middleware for all routes
export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - API routes
     * - static files
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
