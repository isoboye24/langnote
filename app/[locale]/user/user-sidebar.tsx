'use client';

import Link from 'next/link';
import { Book, Home } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function UserSidebar() {
  const { t } = useTranslation();

  const links = [
    {
      label: t('Dashboard'),
      href: 'user/dashboard',
      icon: <Home size={20} />,
    },
    { label: t('Books'), href: 'user/books', icon: <Book size={20} /> },
  ];

  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const locale = segments[0] ?? 'en';
  const activePath = segments.slice(1, 3).join('/');

  return (
    <aside className="h-screen w-55 md:w-64 bg-teal-900 text-white p-4 flex flex-col border-r border-teal-800">
      <Link
        href={`/${locale}/user/dashboard`}
        className="text-4xl text-center font-bold mb-6 text-amber-500"
      >
        LN
      </Link>

      <nav className="flex-1 space-y-2">
        {links.map(({ href, label, icon }) => {
          const isActive = href === activePath;

          return (
            <Link
              key={href}
              href={`/${locale}/${href}`}
              className={clsx(
                'flex items-center space-x-3 p-2 rounded transition-all duration-300',
                'relative',
                'hover:bg-teal-800',
                isActive ? 'bg-teal-800 pl-2' : 'pl-4'
              )}
            >
              {isActive && (
                <span className="absolute left-0 top-0 h-full w-1 bg-amber-500 animate-pulse rounded-r" />
              )}
              {icon}
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
