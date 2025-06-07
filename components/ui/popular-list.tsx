import React from 'react';

const PopularList = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 grid grid-cols-[1fr_3fr] gap-4 rounded-xl">
      <div className="flex items-center justify-center bg-amber-400">
        <div className="">Icon</div>
      </div>
      <div className="grid grid-rows-2">
        <div className="">The first 20 words</div>
        <div className="">description</div>
      </div>
    </div>
  );
};

export default PopularList;
