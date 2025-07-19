'use client';

import Link from 'next/link';
import {
  Bell,
  Book,
  ChartNoAxesCombined,
  LayoutDashboard,
  Menu,
  UserRoundPen,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Image from 'next/image';
import PictureLight from '@/public/images/avatar.jpg';
import PictureDark from '@/public/images/avatarDark.png';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { User } from '@prisma/client';
import { getUserById } from '@/lib/actions/admin/user.actions';

interface UserSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function UserSidebar({
  isOpen,
  toggleSidebar,
}: UserSidebarProps) {
  const { t } = useTranslation();
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [currentUser, setCurrentUser] = useState<User>();

  const links = [
    {
      label: t('Dashboard'),
      href: 'user/dashboard',
      icon: <LayoutDashboard size={20} />,
    },
    { label: t('Books'), href: 'user/books', icon: <Book size={20} /> },
    {
      label: t('Notification'),
      href: 'user/notification',
      icon: <Bell size={20} />,
    },
    {
      label: t('Graphs'),
      href: 'user/graphs',
      icon: <ChartNoAxesCombined size={20} />,
    },
    {
      label: t('Profile'),
      href: 'user/profile',
      icon: <UserRoundPen size={20} />,
    },
  ];

  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const locale = segments[0] ?? 'en';
  const activePath = segments.slice(1, 3).join('/');

  useEffect(() => {
    if (!userId) return;

    const fetchBooks = async () => {
      const response = await getUserById(userId);

      if (response.success) {
        setCurrentUser(response.data);
      }
    };

    fetchBooks();
  }, [userId]);

  return (
    <aside
      className={clsx(
        'h-screen bg-orange-950 dark:bg-slate-900 text-white p-4 flex flex-col border-r transition-all ease-in-out border-orange-950 duration-300',
        isOpen ? 'w-64' : 'w-20'
      )}
    >
      {/* Top section with avatar + toggle */}
      <div className="flex justify-between items-center mb-6 ">
        {isOpen && (
          <div className="flex flex-col gap-4 justify-center items-center  w-48 ">
            <div className="">
              <Image
                src={PictureLight}
                alt="user Image"
                className="w-15 h-15 md:w-30 md:h-30 rounded-full block dark:hidden"
              />
              <Image
                src={PictureDark}
                alt="user Image"
                className="w-15 h-15 md:w-30 md:h-30 rounded-full hidden dark:block"
              />
            </div>
            <div className="flex flex-col gap-1 text-center">
              <div className="text-lg">{currentUser?.userName}</div>
              <div className="text-sm text-orange-500 dark:text-slate-600">
                {currentUser?.email}
              </div>
            </div>
          </div>
        )}
        {isOpen && (
          <button onClick={toggleSidebar} className="text-white">
            <Menu size={24} />
          </button>
        )}
        {!isOpen && (
          <button onClick={toggleSidebar} className="text-white mx-auto">
            <Menu size={24} />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-4">
        {links.map(({ href, label, icon }) => {
          const isActive = href === activePath;

          return (
            <Link
              key={href}
              href={`/${locale}/${href}`}
              className={clsx(
                'flex items-center p-2 rounded transition-all duration-300 relative hover:bg-orange-800',
                isActive ? 'bg-orange-800 pl-2' : 'pl-3',
                isOpen ? 'space-x-3' : 'justify-center'
              )}
            >
              {isActive && isOpen && (
                <span className="absolute left-0 top-0 h-full w-1 bg-amber-500 animate-pulse rounded-r" />
              )}
              <div className="relative group">
                {icon}
                {!isOpen && (
                  <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 whitespace-nowrap bg-orange-950 dark:bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    {label}
                  </span>
                )}
              </div>
              {isOpen && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
