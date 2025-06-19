'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps {
  placeholder?: string;
  onSearch: (value: string) => void;
  delay?: number; // debounce delay in ms
  className?: string;
}

export default function SearchInput({
  placeholder = 'Search...',
  onSearch,
  delay = 300,
  className = '',
}: SearchInputProps) {
  const [value, setValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  return (
    <div
      className={`flex items-center w-full max-w-md px-3 py-2 border rounded-2xl shadow-sm bg-white border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 ${className}`}
    >
      <Search className="w-5 h-5 text-gray-400 mr-2" />
      <input
        type="text"
        className="flex-1 bg-transparent outline-none placeholder-gray-400 text-gray-900"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
