'use client';

import { Menu, Moon, Sun } from 'lucide-react';
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
  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-sm px-6 py-4  flex justify-between items-center">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="md:hidden p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <Menu className="w-6 h-6 text-gray-700 dark:text-gray-200" />
        </button>

        <a
          href="https://langnote-three.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h3 className="text-green-500">Site</h3>
        </a>
      </div>
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
    </header>
  );
}
