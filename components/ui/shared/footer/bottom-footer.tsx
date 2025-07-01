import React from 'react';
import { APP_NAME } from '@/lib/constants';

const BottomFooter = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <div className="border-t p-4 text-sm text-gray-500">
        <div className="text-center">
          {currentYear} {APP_NAME}. All Rights reserved.
        </div>
      </div>
    </>
  );
};

export default BottomFooter;
