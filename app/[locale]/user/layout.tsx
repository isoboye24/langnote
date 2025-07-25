'use client';

import { useState, useEffect } from 'react';
import UserNavbar from './user-navbar';
import UserSidebar from './user-sidebar';
import { ChevronLeft } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const closeSidebar = () => setIsVisible(!isVisible);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="transition-all duration-300">
        {isVisible && (
          <UserSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        )}

        {!isSidebarOpen ? (
          isVisible ? (
            <button
              onClick={closeSidebar}
              className="fixed top-40 left-20 z-50 bg-orange-900 rounded-r-full w-8 h-16 flex items-center justify-center shadow-md hover:bg-orange-800 transition ease-in-out duration-500 cursor-pointer"
            >
              <ChevronLeft className="text-white" size={18} />
            </button>
          ) : (
            <button
              onClick={closeSidebar}
              className="fixed top-40 left-0 z-50 bg-orange-900 rounded-r-full w-8 h-16 flex items-center justify-center shadow-md hover:bg-orange-800 transition ease-in-out duration-500 cursor-pointer"
            >
              <ChevronLeft className="text-white" size={18} />
            </button>
          )
        ) : (
          ''
        )}
      </div>

      {/* Right side */}
      <div className="flex-1 flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
        <UserNavbar
          toggleSidebar={toggleSidebar}
          toggleDarkMode={toggleDarkMode}
        />
        <main className="overflow-auto flex-1 bg-orange-100 dark:bg-slate-950 text-gray-900 dark:text-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
