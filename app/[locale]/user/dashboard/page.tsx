import { requireUserAndAdmin } from '@/lib/auth.guard';
import React from 'react';
import Cards from './cards';
import SmallCircles from './small-circles';

const UserDashboard = async () => {
  await requireUserAndAdmin();
  return (
    <div className="">
      <div className="wrapper ">
        <h1 className="font-bold text-2xl text-center mb-10">User Dashboard</h1>
        <div className="">
          <Cards />
        </div>
        <div className="mt-10 justify-items-center">
          <SmallCircles />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
