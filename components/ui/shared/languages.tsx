'use client';

import { useState } from 'react';
import { useRouter, usePathname, useParams } from 'next/navigation';
import Flag from 'react-world-flags';
import Image from 'next/image';

const languages = [
  { code: 'en', country: 'us', label: 'English' },
  { code: 'de', country: 'de', label: 'German' },
  { code: 'ru', country: 'ru', label: 'Russian' },
];

export default function LanguageDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams(); // for current locale

  const [open, setOpen] = useState(false);

  const selected = (params?.locale as string) || 'en';
  const selectedLang = languages.find((lang) => lang.code === selected);

  const changeLanguage = (lang: string) => {
    const segments = pathname.split('/');
    segments[1] = lang; // update the locale part
    const newPath = segments.join('/');
    router.push(newPath);
    setOpen(false);
  };

  console.log('selectedLang:', selectedLang);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center justify-between w-16 px-2 py-2 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 hover:dark:bg-gray-800 focus:outline-none"
        title={selectedLang?.label}
      >
        {selectedLang?.country && (
          <Image
            src={`https://flagcdn.com/w40/${selectedLang.country.toLowerCase()}.png`}
            alt={selectedLang.label}
            width={18}
            height={18}
            style={{
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
        )}
        <svg
          className="w-4 h-4 ml-1 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.354a.75.75 0 111.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute z-[9999] w-10 mt-2 origin-top-right bg-white rounded-lg shadow-lg ring-1 ring-gray-100 ring-opacity-5">
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className="block w-full px-2 py-2 text-center hover:bg-gray-100"
                title={lang.label}
              >
                <Flag
                  src={lang?.country}
                  alt={lang.label}
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
