'use client';

import Link from 'next/link';
import {
  Home,
  Users,
  LayoutDashboard,
  ChevronDown,
  ChevronRight,
  UserPen,
} from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';

export default function AdminSidebar() {
  const { t } = useTranslation();

  const links = [
    {
      label: t('Dashboard'),
      href: '/admin/dashboard',
      icon: <Home size={20} />,
    },
    { label: t('Users'), href: '/admin/user', icon: <Users size={20} /> },
  ];

  const categoriesLinks = [
    {
      label: t('General Cat'),
      href: '/admin/general-category',
      icon: <UserPen size={20} />,
    },
    {
      label: t('popular Cat'),
      href: '/admin/popular-lists-category',
      icon: <UserPen size={20} />,
    },
  ];

  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const locale = segments[0] ?? 'en';

  const [isFrontendOpen, setIsFrontendOpen] = useState(false);
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
        <div className="border my-5 border-amber-500"></div>
        {/* Categories */}
        <div>
          <button
            onClick={() => setIsFrontendOpen(!isFrontendOpen)}
            className="flex w-full items-center justify-between p-2 rounded hover:bg-teal-800 transition"
          >
            <div className="flex items-center space-x-3">
              <LayoutDashboard size={20} />
              <span>Categories</span>
            </div>
            {isFrontendOpen ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </button>

          <div
            className={`ml-8 mt-1 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
              isFrontendOpen ? 'max-h-40' : 'max-h-0'
            }`}
          >
            {categoriesLinks.map(({ href, label, icon }) => (
              <Link
                key={href}
                href={`/${locale}/${href}`}
                className="flex items-center space-x-3 p-2 rounded hover:bg-teal-800 transition"
              >
                {icon}
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
}
