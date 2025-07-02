'use client';

import { useState } from 'react';

interface FAQQuestionItem {
  id: string;
  title: string;
  content: string;
}

interface FAQQuestionProps {
  items: FAQQuestionItem[];
}

const FAQQuestion = ({ items }: FAQQuestionProps) => {
  const [openItemId, setOpenItemId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenItemId(openItemId === id ? null : id);
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="border border-orange-200 dark:border-slate-700 rounded-lg overflow-hidden shadow-sm"
        >
          <button
            onClick={() => toggleItem(item.id)}
            className="w-full flex justify-between items-center px-4 py-3 text-left bg-orange-100 hover:bg-orange-200 font-medium dark:bg-slate-800 dark:hover:bg-slate-900"
          >
            <span>{item.title}</span>
            <svg
              className={`w-5 h-5 transition-transform ${
                openItemId === item.id ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {openItemId === item.id && (
            <div className="px-4 py-3 bg-orange-50 text-gray-700 border-t border-orange-100 dark:bg-slate-800 dark:border-slate-900 dark:text-gray-200">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQQuestion;
