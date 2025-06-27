'use client';

import { Moon, Sun } from 'lucide-react';
// import LanguageDropdown from '@/components/ui/shared/languages';
import UserButton from '@/components/ui/shared/user-button';
import UserNavbarPageLinks from '@/components/ui/shared/user-navbar-page-links-component';

type MainAdminNavProps = {
  toggleSidebar: () => void;
  toggleDarkMode: () => void;
};

export default function UserNavbar({ toggleDarkMode }: MainAdminNavProps) {
  return (
    <header className="w-full bg-gray-200 dark:bg-gray-800 shadow-sm px-6 py-4 grid grid-cols-[1fr_150px] ">
      <div className=" flex flex-1 md:justify-center md:items-center gap-4">
        <UserNavbarPageLinks />
      </div>
      <div className=" flex-1 flex justify-end items-end gap-4 px-5">
        {/* <LanguageDropdown /> */}
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
