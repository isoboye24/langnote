import Footer from '@/components/ui/shared/footer';
import Header from '@/components/ui/shared/header';
import { ReactNode } from 'react';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={params.locale}>
      <Header />
      <main className="wrapper">{children}</main>
      <Footer />
    </html>
  );
}
