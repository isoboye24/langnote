import { requireAdmin } from '@/lib/auth.guard';
import React from 'react';

const Dashboard = async () => {
  await requireAdmin();
  return <div>Dashboard</div>;
};

export default Dashboard;
