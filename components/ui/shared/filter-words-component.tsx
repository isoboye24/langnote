'use client';

import React, { useState } from 'react';

type Option = { key: number; value: string };

interface SearchDropdownProps {
  options1: Option[];
  options2: number[];
  label1?: string;
  label2?: string;
  onSubmit: (selected1: string, selected2: string) => void;
}

export default function FilterWordsComponent({
  options1,
  options2,
  label1 = 'Select Option 1',
  label2 = 'Select Option 2',
  onSubmit,
}: SearchDropdownProps) {
  const [selected1, setSelected1] = useState('');
  const [selected2, setSelected2] = useState('');

  //   const filteredOptions1 = options1.filter((opt) =>
  //     opt.toLowerCase().includes(search1.toLowerCase())
  //   );
  const handleSubmit = () => {
    onSubmit(selected1, selected2);
  };

  return (
    <div className="p-3 mx-auto bg-transparent rounded-2xl shadow-lg space-y-1 mt-5">
      <div className="flex gap-5 justify-center items-center">
        {/* Dropdown 1 */}
        <div>
          <select
            className="w-full p-2 border rounded"
            value={selected1}
            onChange={(e) => setSelected1(e.target.value)}
          >
            <option value="">{label1}</option>
            {options1.map((option) => (
              <option key={option.key} value={option.value}>
                {option.value}
              </option>
            ))}
          </select>
        </div>

        {/* Dropdown 2 */}
        <div>
          <select
            className="w-full p-2 border rounded"
            value={selected2}
            onChange={(e) => setSelected2(e.target.value)}
          >
            <option value="">{label2}</option>
            {options2.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center items-center">
          <button
            className="w-full bg-orange-800 hover:bg-orange-700 text-white font-semibold py-1 px-2 rounded-md cursor-pointer transition ease-in-out duration-500"
            onClick={handleSubmit}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
