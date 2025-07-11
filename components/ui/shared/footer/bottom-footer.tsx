import React from 'react';
import { APP_NAME } from '@/lib/constants';
import Link from 'next/link';

const BottomFooter = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <div className="border-t p-4 text-sm text-gray-500">
        <div className="text-center">
          {currentYear} {APP_NAME}. All Rights reserved.{' '}
          <Link
            href={'https://div-mu.vercel.app/'}
            className="font-semibold text-sm text-orange-200 hover:text-orange-500"
            target="_blank"
          >
            By Isoboye Vincent Dan-Obu
          </Link>
        </div>
      </div>
    </>
  );
};

export default BottomFooter;
