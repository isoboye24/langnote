'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Moon, Sun, X } from 'lucide-react';
import Image from 'next/image';
import { APP_NAME } from '@/lib/constants';
// import LanguageDropdown from './languages';
import UserButton from './user-button';
import { useTranslation } from 'react-i18next';

type MainAdminNavProps = {
  toggleDarkMode: () => void;
};

export default function Navbar({ toggleDarkMode }: MainAdminNavProps) {
  const { t } = useTranslation();

  const links = [
    { name: t('Home'), href: '/' },
    { name: t('About'), href: '/about' },
    { name: t('Contact'), href: '/contact' },
  ];
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const locale = segments[0] ?? 'en';

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow-md z-50">
      <div className="flex justify-between px-6 py-4 max-w-7xl mx-auto">
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

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8">
          {links.map((link) => {
            return (
              <Link
                key={t(link.name)}
                href={`/${locale}/${link.href}`}
                locale={locale}
                className={`hover:text-teal-600 dark:hover:text-teal-600 transition-colors ${
                  pathname === `/${locale}${link.href}`
                    ? 'font-semibold text-teal-600 underline'
                    : ''
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        <div className="flex gap-3">
          <div className="flex items-center gap-4 ">
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

          {/* Mobile Toggle */}
          <button className="md:hidden text-gray-700" onClick={toggleMenu}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-white dark:bg-gray-900 shadow-md"
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col px-6 pb-4 gap-4">
              {links.map((link) => {
                return (
                  <Link
                    key={t(link.name)}
                    href={`/${locale}${link.href}`}
                    locale={locale}
                    className={`hover:text-teal-600 dark:hover:text-teal-600 transition-colors ${
                      pathname === `/${locale}${link.href}`
                        ? 'font-semibold text-teal-600 underline'
                        : ''
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
