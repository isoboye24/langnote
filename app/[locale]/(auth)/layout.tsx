import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
  params: {
    locale: string;
  };
}

export default async function AuthLayout({
  children,
  params,
}: AuthLayoutProps) {
  const { locale } = params;

  return (
    <div className="flex-center min-h-screen w-full">
      <p className="absolute top-4 right-4 text-sm text-gray-500">
        Locale: {locale}
      </p>
      {children}
    </div>
  );
}
