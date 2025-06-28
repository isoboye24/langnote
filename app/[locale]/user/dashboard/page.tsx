import DashboardCard from '@/components/ui/shared/dashboard-card';
import { requireUserAndAdmin } from '@/lib/auth.guard';
import { BookA, Boxes, Notebook } from 'lucide-react';
import React from 'react';

const UserDashboard = async () => {
  await requireUserAndAdmin();
  return (
    <div className="">
      <div className="wrapper ">
        <h1 className="font-bold text-2xl text-center mb-10">User Dashboard</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="">
            <DashboardCard icon={Notebook} amount={0} title="Total Books" />
          </div>
          <div className="">
            <DashboardCard icon={Boxes} amount={0} title="Total Groups" />
          </div>
          <div className="">
            <DashboardCard icon={BookA} amount={0} title="Total Words" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
