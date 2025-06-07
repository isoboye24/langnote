'use client';

import Link from 'next/link';
import { Home, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';

export default function UserSidebar() {
  const { t } = useTranslation();

  const links = [
    {
      label: t('Dashboard'),
      href: '/user/dashboard',
      icon: <Home size={20} />,
    },
    { label: t('Group'), href: '/user/group', icon: <Users size={20} /> },
  ];

  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const locale = segments[0] ?? 'en';

  return (
    <aside className="h-screen w-55 md:w-64 bg-teal-900 text-white p-4 flex flex-col border-r border-teal-800">
      <Link
        href={`/${locale}/admin/dashboard`}
        className="text-4xl text-center font-bold mb-6 text-amber-500"
      >
        LN
      </Link>

      <nav className="flex-1 space-y-2">
        {links.map(({ href, label, icon }) => (
          <Link
            key={href}
            href={`/${locale}/${href}`}
            className="flex items-center space-x-3 p-2 rounded hover:bg-teal-800 transition"
          >
            {icon}
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
