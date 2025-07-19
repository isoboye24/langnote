'use client';

import { Home, Moon, Sun } from 'lucide-react';
// import LanguageDropdown from '@/components/ui/shared/languages';
import UserButton from '@/components/ui/shared/user-button';
import Link from 'next/link';

type MainAdminNavProps = {
  toggleSidebar: () => void;
  toggleDarkMode: () => void;
};

export default function UserNavbar({ toggleDarkMode }: MainAdminNavProps) {
  return (
    <header className="w-full bg-orange-900 dark:bg-gray-800 shadow-sm px-6 py-4 md:px-10 lg:20 flex-between">
      <Link
        href={`https://langnote-three.vercel.app/en`}
        target="_blank"
        className="text-base md:text-xl font-bold flex hover:bg-gray-100 dark:hover:bg-slate-600 hover:text-gray-800 dark:hover:text-slate-800 transition ease-in-out duration-500 p-1 rounded-sm text-slate-200 dark:text-slate-500"
      >
        <Home className="" />
      </Link>

      <div className=" flex-1 flex justify-end items-end gap-4 px-5">
        {/* <LanguageDropdown /> */}
        <button
          onClick={toggleDarkMode}
          className=" hover:bg-gray-100 dark:hover:bg-slate-600 hover:text-gray-800 dark:hover:text-slate-800 transition ease-in-out duration-500 p-1 rounded-sm text-slate-200 dark:text-slate-500"
        >
          <Sun className="w-5 h-5 dark:hidden " />
          <Moon className="w-5 h-5  hidden dark:block " />
        </button>
        <UserButton />
      </div>
    </header>
  );
}
