import { requireUserAndAdmin } from '@/lib/auth.guard';
import React from 'react';

const UserDashboard = async () => {
  await requireUserAndAdmin();
  return <div>UserDashboard</div>;
};

export default UserDashboard;
