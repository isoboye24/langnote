import Footer from '@/components/ui/shared/footer';
import Header from '@/components/ui/shared/header';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  return (
    <html lang={locale}>
      <Header />
      <main className="wrapper">{children}</main>
      <Footer />
    </html>
  );
}
