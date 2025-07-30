'use client';

import { useState } from 'react';
import DocSidebar from './doc-sidebar';
import Header from '@/components/ui/shared/header';
import { Menu } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="transition-all duration-500 ease-in-out">
        <DocSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Top section with avatar + toggle */}
        <div className="flex justify-end items-center mt-20 ">
          {isSidebarOpen ? (
            <button
              onClick={toggleSidebar}
              className="fixed top-20 left-50 md:left-64 z-50 text-orange-950 dark:text-gray-400 rounded-r-full w-8 h-16 flex items-center justify-center shadow-md transition ease-in-out duration-500 cursor-pointer"
            >
              <Menu size={24} />
            </button>
          ) : (
            <button
              onClick={toggleSidebar}
              className="fixed top-20 left-0 z-50 text-orange-950 dark:text-gray-400 rounded-r-full w-8 h-16 flex items-center justify-center shadow-md transition ease-in-out duration-500 cursor-pointer"
            >
              <Menu size={24} />
            </button>
          )}
        </div>
      </div>

      {/* Right side */}
      <div className="flex-1 flex flex-col mt-[-16px] dark:bg-gray-900">
        <Header />
        <main className="overflow-auto flex-1 bg-gray-100 dark:bg-slate-950 text-gray-900 dark:text-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
