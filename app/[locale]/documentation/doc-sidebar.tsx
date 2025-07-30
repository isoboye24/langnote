'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface DocSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function DocSidebar({ isOpen }: DocSidebarProps) {
  const { t } = useTranslation();
  const [openLinkLabel, setOpenLinkLabel] = useState<string | null>(null);

  const mainLinks = [
    {
      label: t('Get Started'),
      href: '/documentation',
    },
    {
      label: t('Book'),
      href: 'documentation/book-section',
      children: [
        {
          label: t('How to create book'),
          href: 'documentation/book-section#how_to_create_book',
        },
        {
          label: t('How to update & delete book'),
          href: 'documentation/book-section#how_to_update_book',
        },
      ],
    },
    {
      label: t('Group'),
      href: 'documentation/section-group',
      children: [
        {
          label: t('How to create group'),
          href: 'documentation/section-group#how_to_create_group',
        },
        {
          label: t('How to update & delete group'),
          href: 'documentation/section-group#how_to_update_group',
        },
      ],
    },
    { label: t('Word'), href: 'documentation/section-word' },
    { label: t('Review'), href: 'documentation/section-review' },
  ];

  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const locale = segments[0] ?? 'en';
  const activePath = segments.slice(1, 3).join('/');

  if (!isOpen) return null; // Completely hide sidebar when closed

  const toggleLink = (label: string) => {
    setOpenLinkLabel((prev) => (prev === label ? null : label));
  };

  return (
    <div>
      <aside
        className={clsx(
          'h-screen w-50 xl:w-64 bg-gray-200 dark:bg-slate-900 text-slate-950 dark:text-gray-200 p-4 flex flex-col border-r border-gray-100 dark:border-slate-950 transition-all duration-300 ease-in-out mt-5'
        )}
      >
        <nav className="flex-1 space-y-2">
          <div className="text-green-600 text-center text-2xl font-bold mt-0 mb-10">
            LangNote
          </div>

          {mainLinks.map(({ href, label, children }) => {
            const isActive = href === activePath;
            const isOpenGroup = openLinkLabel === label;
            return (
              <div className="" key={href}>
                <div className="" onClick={() => toggleLink(label)}>
                  <Link
                    href={`/${locale}/${href}`}
                    className={clsx(
                      'flex items-center p-2 rounded transition-all duration-300 relative hover:bg-gray-300 dark:hover:bg-slate-800',
                      isActive ? 'bg-slate-300 pl-2 dark:bg-slate-800' : 'pl-3',
                      'space-x-3'
                    )}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-0 h-full w-1 bg-green-500 animate-pulse rounded-r" />
                    )}
                    <div className="grid grid-cols-[1fr_10px] w-50">
                      <div className="">{label}</div>
                      <div className="">
                        {Array.isArray(children) &&
                          children.length > 0 &&
                          (isActive ? (
                            <ChevronDown size={16} />
                          ) : (
                            <ChevronRight size={16} />
                          ))}
                      </div>
                    </div>
                  </Link>
                </div>
                {isOpenGroup &&
                  Array.isArray(children) &&
                  children.length > 0 && (
                    <div className="ml-6 mt-1 space-y-1">
                      {children.map((sub) => {
                        const subHref = `/${locale}/${sub.href}`;
                        const subIsActive = activePath === subHref;

                        return (
                          <Link
                            key={sub.href}
                            href={subHref}
                            className={clsx(
                              'flex items-center p-2 rounded transition-all duration-300 relative hover:bg-gray-300 dark:hover:bg-slate-700 text-sm',
                              subIsActive
                                ? 'bg-slate-300 dark:bg-slate-700 font-medium'
                                : 'pl-4'
                            )}
                          >
                            {subIsActive && (
                              <span className="absolute left-0 top-0 h-full w-1 bg-green-400 rounded-r" />
                            )}
                            <span>{sub.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
              </div>
            );
          })}
        </nav>
      </aside>
    </div>
  );
}
