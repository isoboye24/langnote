'use client';

import React, { useState, useEffect } from 'react';

type Props = {
  onSearch: (text: string) => void;
  onClear?: () => void;
  className?: string;
};

const NewSearchInput: React.FC<Props> = ({ onSearch, onClear, className }) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    const trimmed = value.trim();
    if (trimmed !== '') {
      onSearch(trimmed);
    } else {
      onClear?.(); // ← call onClear only when input is empty
    }
  }, [value, onClear, onSearch]);

  return (
    <input
      type="text"
      className={`border px-3 py-2 rounded ${className}`}
      placeholder="Search..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default NewSearchInput;
