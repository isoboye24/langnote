import React from 'react';
import PopularList from './popular-list';

const PopularLists = () => {
  return (
    <div className="bg-blue-50 dark:bg-gray-900 p-10 rounded-md">
      <div className="text-center text-3xl mb-10 font-bold">Popular Lists</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="">
          <PopularList />
        </div>
        <div className="">
          <PopularList />
        </div>
        <div className="">
          <PopularList />
        </div>
        <div className="">
          <PopularList />
        </div>
      </div>
    </div>
  );
};

export default PopularLists;
