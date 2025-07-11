import NextLink from 'next/link';
import React from 'react';

const QuickLink = ({
  linkText,
  url,
}: {
  linkText: string;
  underline?: string | '';
  url?: string | '';
}) => {
  return (
    <>
      <NextLink
        href={url || ''}
        className="group relative text-gray-200 text-xs hover:text-orange-300 transition duration-500 ease-in-out"
      >
        {linkText}
        <span className="absolute left-0 bottom-0 h-[1px] w-0 bg-orange-300 transition-all duration-500 ease-in-out group-hover:w-full group-hover:right-0"></span>
      </NextLink>
    </>
  );
};

export default QuickLink;
