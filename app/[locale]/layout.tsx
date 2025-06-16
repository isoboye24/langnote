// [locale]/layout.tsx
'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/ui/shared/header';
import Footer from '@/components/ui/shared/footer';

export default function LocaleLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Hide layout for admin and account routes
  const hideLayout =
    pathname?.startsWith(`/${pathname.split('/')[1]}/admin`) ||
    pathname?.startsWith(`/${pathname.split('/')[1]}/user`) ||
    pathname?.startsWith(`/${pathname.split('/')[1]}/(auth)`);

  return (
    <>
      {!hideLayout && <Header />}
      <main>{children}</main>
      {!hideLayout && <Footer />}
    </>
  );
}
