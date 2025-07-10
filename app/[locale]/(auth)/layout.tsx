import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function AuthLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  return (
    <div className="flex-center min-h-screen w-full">
      <p className="absolute top-4 right-4 text-sm text-gray-500">
        Locale: {locale}
      </p>
      {children}
    </div>
  );
}
