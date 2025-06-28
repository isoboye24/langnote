import DashboardCard from '@/components/ui/shared/dashboard-card';
import { BookA, Boxes, Notebook } from 'lucide-react';
import React from 'react';

const Cards = () => {
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
  );
};

export default Cards;
