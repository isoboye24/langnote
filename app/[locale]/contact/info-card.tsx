import React from 'react';

const InfoCard = ({
  url,
  path,
  subPath,
  title,
  subtitle1,
  subtitle2,
}: {
  url: string;
  path: string;
  subPath?: string;
  title: string;
  subtitle1: string;
  subtitle2: string;
}) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="bg-teal-500 text-white rounded-full p-4 mb-4">
        <svg
          xmlns={url}
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={path}
          />

          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={subPath}
          />
        </svg>
      </div>
      <h3 className="font-bold text-lg mb-2">{title.toUpperCase()}</h3>
      <p className="text-sm dark:text-gray-400">{subtitle1}</p>
      <p className="text-sm dark:text-gray-400">{subtitle2}</p>
    </div>
  );
};

export default InfoCard;
