'use client';

import { useState, useEffect } from 'react';
import AdminSidebar from './admin-sidebar';
import AdminNavbar from './admin-navbar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  return (
    <div className="flex h-screen overflow-y-hidden">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'block' : 'hidden'} md:block`}>
        <AdminSidebar />
      </div>

      {/* Right side */}
      <div className="flex-1 flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
        <AdminNavbar
          toggleSidebar={toggleSidebar}
          toggleDarkMode={toggleDarkMode}
        />
        <main className="overflow-auto flex-1 text-gray-900 dark:text-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
