'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import { APP_NAME } from '@/lib/constants';

const links = [
  { href: '/user/dashboard', label: 'Dashboard' },
  { href: '/user/books', label: 'Books' },
];

export default function UserNavbarPageLinks() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="px-4 relative">
      {/* Toggle Button (hamburger) */}
      <div className="flex justify-end md:hidden">
        <button
          onClick={() => setIsOpen(true)}
          className="text-gray-800 dark:text-white z-50"
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Slide-In Menu from Left */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 left-0 h-full w-3/4 bg-gray-200 dark:bg-gray-900 shadow-lg z-50 flex flex-col p-6 space-y-4 md:hidden"
          >
            {/* Close Button */}
            <div className="flex flex-between ">
              <div className="justify-start  ml-2">
                <Link
                  href={`https://langnote-three.vercel.app/en`}
                  className="text-xl font-bold text-blue-600 flex md:hidden"
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
              </div>
              <div className="justify-end">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-800 dark:text-white"
                >
                  <X size={28} />
                </button>
              </div>
            </div>

            {/* Nav Links */}
            {links.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative px-2 py-1 flex items-center ${
                    isActive
                      ? 'text-blue-600'
                      : 'text-gray-800 dark:text-gray-200'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
                    {label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-4 items-center">
        {links.map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`relative px-2 py-1 flex items-center ${
                isActive ? 'text-blue-600' : 'text-gray-800 dark:text-gray-200'
              }`}
            >
              <span className="text-base font-medium">{label}</span>
              {isActive && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                  layoutId="underline"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
