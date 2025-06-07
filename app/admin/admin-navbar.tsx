'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Moon, Sun, X } from 'lucide-react';
import Image from 'next/image';
import { APP_NAME } from '@/lib/constants';
import LanguageDropdown from '@/components/ui/shared/languages';
import UserButton from '@/components/ui/shared/user-button';

type MainAdminNavProps = {
  toggleSidebar: () => void;
  toggleDarkMode: () => void;
};

export default function AdminNavbar({
  toggleDarkMode,
  toggleSidebar,
}: MainAdminNavProps) {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const locale = segments[0] ?? 'en';

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow-md z-50">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="md:hidden p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <Menu className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          </button>

          <a
            href="https://div-mu.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3 className="text-green-500">Site</h3>
          </a>
        </div>
        <Link
          href={`/${locale}/`}
          className="text-xl font-bold text-blue-600 flex"
        >
          <Image
            priority
            src="/images/logo.png"
            width={30}
            height={30}
            alt={`${APP_NAME} logo`}
          />
          <span className="hidden lg:block font-bold text-2xl ml-3">
            {APP_NAME}
          </span>
        </Link>

        <div className="flex items-center gap-4 px-5">
          <LanguageDropdown />
          <button
            onClick={toggleDarkMode}
            className="p-1 rounded hover:bg-gray-100 hover:text-gray-800 dark:hover:text-gray-200 transition"
          >
            <Sun className="w-5 h-5 text-gray-800 dark:hidden" />
            <Moon className="w-5 h-5 text-gray-200 hidden dark:block" />
          </button>
          <UserButton />
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-gray-700" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
}
